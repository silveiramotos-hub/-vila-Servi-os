import {
  ALLOY_MATERIALS,
  COMPANY_INFO,
  INDUSTRIAL_SERVICES,
  IndustrialService,
  ServiceCategory,
} from './industrialData';

export type PartGeometry = 'cylinder' | 'tube' | 'plate';

export interface WeightCalculationInput {
  geometry: PartGeometry;
  alloyId: string;
  outerDiameterMm?: number;
  innerDiameterMm?: number;
  widthMm?: number;
  thicknessMm?: number;
  lengthMm: number;
  quantity: number;
}

export interface WeightCalculationResult {
  valid: boolean;
  error?: string;
  unitWeightKg: number;
  totalWeightKg: number;
  volumeCm3: number;
  alloyName: string;
  specLine: string;
}

export interface QuoteFormInput {
  service: string;
  urgency: string;
  company: string;
  contactName: string;
  city: string;
  phone: string;
  email?: string;
  details: string;
}

export interface QuoteValidationErrors {
  company?: string;
  contactName?: string;
  city?: string;
  phone?: string;
  email?: string;
  details?: string;
}

export interface SubmittedQuoteRecord extends QuoteFormInput {
  protocol: string;
  createdAtIso: string;
  createdAtFormatted: string;
  whatsappUrl: string;
  mailtoUrl: string;
}

export function filterIndustrialServices(
  category: ServiceCategory,
  searchQuery = ''
): IndustrialService[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return INDUSTRIAL_SERVICES.filter((srv) => {
    const matchesCategory = category === 'todos' || srv.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      srv.title,
      srv.summary,
      srv.toleranceOrSpec,
      srv.normCompliance,
      ...srv.capabilities,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function calculatePartWeight(
  input: WeightCalculationInput
): WeightCalculationResult {
  const alloy =
    ALLOY_MATERIALS.find((a) => a.id === input.alloyId) || ALLOY_MATERIALS[0];

  const lengthMm = Number(input.lengthMm);
  const quantity = Math.floor(Number(input.quantity));

  if (!Number.isFinite(lengthMm) || lengthMm <= 0) {
    return {
      valid: false,
      error: 'Informe um comprimento válido em milímetros (> 0 mm).',
      unitWeightKg: 0,
      totalWeightKg: 0,
      volumeCm3: 0,
      alloyName: alloy.name,
      specLine: '',
    };
  }

  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10000) {
    return {
      valid: false,
      error: 'A quantidade deve estar entre 1 e 10.000 peças.',
      unitWeightKg: 0,
      totalWeightKg: 0,
      volumeCm3: 0,
      alloyName: alloy.name,
      specLine: '',
    };
  }

  let volumeMm3 = 0;
  let dimensionDescription = '';

  if (input.geometry === 'cylinder') {
    const d = Number(input.outerDiameterMm);
    if (!Number.isFinite(d) || d <= 0) {
      return {
        valid: false,
        error: 'Informe um diâmetro externo válido (> 0 mm).',
        unitWeightKg: 0,
        totalWeightKg: 0,
        volumeCm3: 0,
        alloyName: alloy.name,
        specLine: '',
      };
    }
    const radius = d / 2;
    volumeMm3 = Math.PI * radius * radius * lengthMm;
    dimensionDescription = `Eixo/Tarugo Ø ${d} mm x ${lengthMm} mm`;
  } else if (input.geometry === 'tube') {
    const od = Number(input.outerDiameterMm);
    const id = Number(input.innerDiameterMm);
    if (!Number.isFinite(od) || od <= 0 || !Number.isFinite(id) || id < 0) {
      return {
        valid: false,
        error: 'Informe diâmetros externo e interno válidos.',
        unitWeightKg: 0,
        totalWeightKg: 0,
        volumeCm3: 0,
        alloyName: alloy.name,
        specLine: '',
      };
    }
    if (id >= od) {
      return {
        valid: false,
        error: 'O diâmetro interno deve ser menor que o diâmetro externo.',
        unitWeightKg: 0,
        totalWeightKg: 0,
        volumeCm3: 0,
        alloyName: alloy.name,
        specLine: '',
      };
    }
    const rOut = od / 2;
    const rIn = id / 2;
    volumeMm3 = Math.PI * (rOut * rOut - rIn * rIn) * lengthMm;
    dimensionDescription = `Bucha/Tubo Ø Ext ${od} mm x Ø Int ${id} mm x ${lengthMm} mm`;
  } else {
    const w = Number(input.widthMm);
    const t = Number(input.thicknessMm);
    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(t) || t <= 0) {
      return {
        valid: false,
        error: 'Informe largura e espessura válidas em milímetros.',
        unitWeightKg: 0,
        totalWeightKg: 0,
        volumeCm3: 0,
        alloyName: alloy.name,
        specLine: '',
      };
    }
    volumeMm3 = w * t * lengthMm;
    dimensionDescription = `Chapa/Barramento ${t} mm (esp.) x ${w} mm x ${lengthMm} mm`;
  }

  // 1 cm3 = 1000 mm3; mass (kg) = volumeCm3 * density (g/cm3) / 1000
  const volumeCm3 = volumeMm3 / 1000;
  const unitWeightKg = Number(((volumeCm3 * alloy.densityGcm3) / 1000).toFixed(2));
  const totalWeightKg = Number((unitWeightKg * quantity).toFixed(2));

  const specLine = `[Item Calculado: ${quantity} un · ${dimensionDescription} · Material: ${alloy.code} · Massa Est.: ${totalWeightKg.toFixed(2)} kg (${unitWeightKg.toFixed(2)} kg/un)]`;

  return {
    valid: true,
    unitWeightKg,
    totalWeightKg,
    volumeCm3: Number(volumeCm3.toFixed(2)),
    alloyName: alloy.name,
    specLine,
  };
}

export function validateQuoteForm(input: QuoteFormInput): {
  isValid: boolean;
  errors: QuoteValidationErrors;
} {
  const errors: QuoteValidationErrors = {};

  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Informe a razão social ou nome da empresa.';
  }

  if (!input.contactName || input.contactName.trim().length < 2) {
    errors.contactName = 'Informe seu nome e cargo para contato técnico.';
  }

  if (!input.city || input.city.trim().length < 2) {
    errors.city = 'Informe a cidade ou localização da planta industrial.';
  }

  const digitsOnly = (input.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    errors.phone = 'Informe um telefone ou WhatsApp válido com DDD (mín. 10 dígitos).';
  }

  if (input.email && input.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.email = 'Formato de e-mail corporativo inválido.';
    }
  }

  if (!input.details || input.details.trim().length < 8) {
    errors.details =
      'Descreva brevemente o escopo técnico, medidas ou peças (mín. 8 caracteres).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateQuoteProtocol(company: string, sequence: number): string {
  const cleanPrefix =
    company
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 3) || 'IND';
  const paddedSeq = String(sequence).padStart(4, '0');
  return `AVL-2026-${cleanPrefix}-${paddedSeq}`;
}

export function buildWhatsAppQuoteUrl(
  input: QuoteFormInput,
  protocol: string
): string {
  const lines = [
    `*SOLICITAÇÃO DE COTAÇÃO - ÁVILA SERVIÇOS INDUSTRIAIS*`,
    `Protocolo Técnico: ${protocol}`,
    ``,
    `*Empresa:* ${input.company.trim()}`,
    `*Contato:* ${input.contactName.trim()}`,
    `*Telefone:* ${input.phone.trim()}`,
    input.email?.trim() ? `*E-mail:* ${input.email.trim()}` : '',
    `*Localização da Planta:* ${input.city.trim()}`,
    `*Segmento:* ${input.service}`,
    `*Prioridade:* ${input.urgency}`,
    `*Escopo Técnico:* ${input.details.trim()}`,
    ``,
    `Gostaria de agendar avaliação técnica ou receber proposta comercial.`,
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`;
}

export function buildMailtoQuoteUrl(
  input: QuoteFormInput,
  protocol: string
): string {
  const subject = encodeURIComponent(
    `[${protocol}] Cotação Industrial - ${input.company.trim()} (${input.service})`
  );
  const body = encodeURIComponent(
    [
      `SOLICITAÇÃO DE COTAÇÃO B2B - ÁVILA SERVIÇOS INDUSTRIAIS`,
      `Protocolo: ${protocol}`,
      `--------------------------------------------------`,
      `Empresa / Razão Social: ${input.company.trim()}`,
      `Responsável / Cargo: ${input.contactName.trim()}`,
      `Telefone / WhatsApp: ${input.phone.trim()}`,
      `E-mail: ${input.email?.trim() || 'Não informado'}`,
      `Cidade / Planta: ${input.city.trim()}`,
      `Segmento: ${input.service}`,
      `Prazo / Prioridade: ${input.urgency}`,
      ``,
      `Descrição Técnica / Escopo:`,
      input.details.trim(),
    ].join('\n')
  );
  return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
}

export function createQuoteRecord(
  input: QuoteFormInput,
  sequence: number,
  now = new Date()
): SubmittedQuoteRecord {
  const protocol = generateQuoteProtocol(input.company, sequence);
  return {
    ...input,
    company: input.company.trim(),
    contactName: input.contactName.trim(),
    city: input.city.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || '',
    details: input.details.trim(),
    protocol,
    createdAtIso: now.toISOString(),
    createdAtFormatted: now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    whatsappUrl: buildWhatsAppQuoteUrl(input, protocol),
    mailtoUrl: buildMailtoQuoteUrl(input, protocol),
  };
}

export function getPlantOperatingStatus(date = new Date()): {
  isOpen: boolean;
  label: string;
  scheduleDetail: string;
} {
  // Day of week: 0 = Sunday, 1..4 = Mon..Thu, 5 = Friday, 6 = Saturday
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 4) {
    if (hour >= 7 && hour < 17) {
      return {
        isOpen: true,
        label: 'Expediente Fabril em Operação (07h às 17h)',
        scheduleDetail: 'Segunda a Quinta: 07:00 às 17:00 · Sexta: 07:00 às 16:00',
      };
    }
  } else if (day === 5) {
    if (hour >= 7 && hour < 16) {
      return {
        isOpen: true,
        label: 'Expediente Fabril em Operação (Sexta 07h às 16h)',
        scheduleDetail: 'Segunda a Quinta: 07:00 às 17:00 · Sexta: 07:00 às 16:00',
      };
    }
  }

  return {
    isOpen: false,
    label: 'Plantão Comercial via WhatsApp · Fábrica reabre às 07:00',
    scheduleDetail: 'Segunda a Quinta: 07:00 às 17:00 · Sexta: 07:00 às 16:00',
  };
}
