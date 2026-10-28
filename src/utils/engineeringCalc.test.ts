import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePartWeight,
  createQuoteRecord,
  filterIndustrialServices,
  getPlantOperatingStatus,
  validateQuoteForm,
} from './engineeringCalc';
import { createZipArchive, getHostgatorPackageFiles } from './hostgatorPackage';

test('filterIndustrialServices filters by category and search query accurately', () => {
  const all = filterIndustrialServices('todos');
  assert.equal(all.length, 6);

  const usinagem = filterIndustrialServices('usinagem');
  assert.equal(usinagem.length, 1);
  assert.equal(usinagem[0].id, 'usinagem-precisao');

  const caldeiraria = filterIndustrialServices('caldeiraria');
  assert.equal(caldeiraria.length, 2);

  const searchResult = filterIndustrialServices('todos', 'spools');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'tubulacoes-spools');
});

test('calculatePartWeight computes cylinder, tube, and plate mass accurately', () => {
  // Cylinder: SAE 1045 (7.85 g/cm3), D=100mm (R=5cm), L=1000mm (100cm)
  // Volume = pi * 25 * 100 = 7853.98 cm3 -> Weight ~ 61.65 kg
  const cyl = calculatePartWeight({
    geometry: 'cylinder',
    alloyId: 'sae-1045',
    outerDiameterMm: 100,
    lengthMm: 1000,
    quantity: 2,
  });
  assert.equal(cyl.valid, true);
  assert.equal(cyl.unitWeightKg, 61.65);
  assert.equal(cyl.totalWeightKg, 123.3);
  assert.ok(cyl.specLine.includes('2 un'));

  // Tube with invalid innerDiameter >= outerDiameter should fail validation
  const badTube = calculatePartWeight({
    geometry: 'tube',
    alloyId: 'aisi-304',
    outerDiameterMm: 80,
    innerDiameterMm: 85,
    lengthMm: 500,
    quantity: 1,
  });
  assert.equal(badTube.valid, false);
  assert.ok(badTube.error?.includes('menor que o diâmetro externo'));

  // Plate: 10mm thick x 500mm wide x 1000mm long = 5000 cm3 * 7.85 = 39.25 kg
  const plate = calculatePartWeight({
    geometry: 'plate',
    alloyId: 'sae-1045',
    thicknessMm: 10,
    widthMm: 500,
    lengthMm: 1000,
    quantity: 1,
  });
  assert.equal(plate.valid, true);
  assert.equal(plate.unitWeightKg, 39.25);
});

test('validateQuoteForm enforces required B2B fields and phone format', () => {
  const emptyCheck = validateQuoteForm({
    service: 'Usinagem Mecânica de Precisão',
    urgency: 'Normal (Planejamento)',
    company: '',
    contactName: '',
    city: '',
    phone: '123',
    details: 'curto',
  });
  assert.equal(emptyCheck.isValid, false);
  assert.ok(emptyCheck.errors.company);
  assert.ok(emptyCheck.errors.contactName);
  assert.ok(emptyCheck.errors.city);
  assert.ok(emptyCheck.errors.phone);
  assert.ok(emptyCheck.errors.details);

  const validCheck = validateQuoteForm({
    service: 'Usinagem Mecânica de Precisão',
    urgency: 'Urgente (Parada em breve)',
    company: 'Petroquímica Bahia S/A',
    contactName: 'Eng. Marcos Almeida',
    city: 'Alagoinhas - BA',
    phone: '(75) 99915-0344',
    email: 'marcos@petrobahia.com.br',
    details: 'Fabricação de 4 eixos em aço SAE 4140 conforme desenho técnico.',
  });
  assert.equal(validCheck.isValid, true);
  assert.equal(Object.keys(validCheck.errors).length, 0);
});

test('createQuoteRecord generates deterministic protocol and WhatsApp URL', () => {
  const record = createQuoteRecord(
    {
      service: 'Caldeiraria Média e Pesada',
      urgency: 'Normal (Planejamento)',
      company: 'Cervejaria Alagoinhas',
      contactName: 'Roberto Silva',
      city: 'Alagoinhas - BA',
      phone: '(75) 99915-0344',
      details: 'Reforma de moega em aço inox AISI 304.',
    },
    1,
    new Date('2026-10-27T14:00:00Z')
  );

  assert.equal(record.protocol, 'AVL-2026-CER-0001');
  assert.ok(record.whatsappUrl.startsWith('https://wa.me/5575999150344?text='));
  assert.ok(record.mailtoUrl.startsWith('mailto:contato@avilaservicos.com.br'));
});

test('getPlantOperatingStatus evaluates weekday working hours correctly', () => {
  // Wednesday at 10:00 local
  const wedOpen = new Date(2026, 9, 28, 10, 0, 0);
  assert.equal(getPlantOperatingStatus(wedOpen).isOpen, true);

  // Sunday at 10:00 local
  const sunClosed = new Date(2026, 9, 25, 10, 0, 0);
  assert.equal(getPlantOperatingStatus(sunClosed).isOpen, false);
});

test('HostGator ZIP generator produces valid PKZIP archive with all 4 deployment files', () => {
  const files = getHostgatorPackageFiles();
  assert.equal(files.length, 4);
  assert.deepEqual(
    files.map((f) => f.filename),
    ['index.html', '.htaccess', 'robots.txt', 'INSTRUCOES-HOSTGATOR.txt']
  );

  const zipBytes = createZipArchive(files);
  assert.ok(zipBytes.length > 1000);
  // Verify PK\x03\x04 local file header signature
  assert.equal(zipBytes[0], 0x50);
  assert.equal(zipBytes[1], 0x4b);
  assert.equal(zipBytes[2], 0x03);
  assert.equal(zipBytes[3], 0x04);
});
