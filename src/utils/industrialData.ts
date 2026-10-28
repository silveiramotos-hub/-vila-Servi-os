export type ServiceCategory =
  | 'todos'
  | 'usinagem'
  | 'caldeiraria'
  | 'manutencao'
  | 'projetos';

export interface IndustrialService {
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceCategory, 'todos'>;
  categoryLabel: string;
  featured?: boolean;
  summary: string;
  toleranceOrSpec: string;
  normCompliance: string;
  capabilities: string[];
  deliverables: string[];
  blueprintType: 'lathe' | 'boiler' | 'maintenance' | 'structure' | 'piping' | 'cad';
}

export interface CaseStudy {
  id: string;
  sector: string;
  location: string;
  title: string;
  metricValue: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface AlloyMaterial {
  id: string;
  name: string;
  code: string;
  densityGcm3: number;
  typicalUse: string;
}

export const COMPANY_INFO = {
  name: 'ÁVILA SERVIÇOS INDUSTRIAIS E USINAGEM LTDA',
  shortName: 'ÁVILA SERVIÇOS',
  cnpj: '21.718.381/0001-19',
  yearsInMarket: 12,
  address: 'Rodovia Governador Mário Covas (BR-101), S/N',
  district: 'Bairro Coqueiral',
  city: 'Alagoinhas',
  state: 'BA',
  cep: '48010-611',
  phoneLandline: '(75) 3422-1126',
  phoneLandlineRaw: '7534221126',
  whatsappDisplay: '(75) 99915-0344',
  whatsappRaw: '5575999150344',
  email: 'contato@avilaservicos.com.br',
  hoursSummary: 'Seg a Qui: 07h às 17h · Sex: 07h às 16h',
  googleMapsCidUrl: 'https://maps.google.com/?cid=6488732851439661792',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=-12.1072627,-38.382277&t=&z=16&ie=UTF8&iwloc=&output=embed',
  coordinates: {
    lat: -12.1072627,
    lng: -38.382277,
  },
};

export const INDUSTRIAL_SERVICES: IndustrialService[] = [
  {
    id: 'usinagem-precisao',
    number: '01',
    title: 'Usinagem Mecânica de Precisão',
    category: 'usinagem',
    categoryLabel: 'Usinagem de Precisão',
    featured: true,
    summary:
      'Operação em tornos mecânicos, fresadoras, mandrilhadoras e centros de usinagem para fabricação seriada ou unitária de eixos, buchas, polias, engrenagens, flanges e roletes sob desenho técnico ou amostra física.',
    toleranceOrSpec: 'Tolerância ISO IT6/IT7 (±0,01 mm)',
    normCompliance: 'ABNT NBR ISO 2768 · DIN',
    capabilities: [
      'Recuperação dimensional de eixos, pontas de eixo e alojamentos de mancais',
      'Usinagem em aço carbono (SAE 1020/1045), ligas (4140/4340), inox (304/316), bronze e polímeros de engenharia',
      'Abertura de roscas especiais (trapezoidal, métrica, UNC/UNF, NPT/BSP) e rasgos de chaveta',
    ],
    deliverables: [
      'Relatório de inspeção dimensional',
      'Certificado de rastreabilidade de matéria-prima',
    ],
    blueprintType: 'lathe',
  },
  {
    id: 'caldeiraria-pesada',
    number: '02',
    title: 'Caldeiraria Média e Pesada',
    category: 'caldeiraria',
    categoryLabel: 'Caldeiraria & Solda',
    featured: true,
    summary:
      'Conformação, calandragem, corte e dobra de chapas metálicas estruturais e de processo. Fabricação de tanques atmosféricos, silos, tremonhas, ciclones, moegas, dutos e carcaças industriais.',
    toleranceOrSpec: 'Soldagem Qualificada AWS D1.1 / ASME IX',
    normCompliance: 'ASME Seção VIII · NR-13 · AWS D1.1',
    capabilities: [
      'Processos de soldagem TIG (GTAW), MIG/MAG (GMAW) e Eletrodo Revestido (SMAW)',
      'Calandragem de chapas em aço carbono (ASTM A36 / A283) e aço inoxidável (AISI 304 / 316L)',
      'Ensaios não destrutivos por líquido penetrante (LP) e estanqueidade',
    ],
    deliverables: [
      'Data Book de soldagem e qualificação (EPS/RQPS)',
      'Laudo de inspeção visual e dimensional',
    ],
    blueprintType: 'boiler',
  },
  {
    id: 'manutencao-industrial',
    number: '03',
    title: 'Manutenção Mecânica de Plantas e Paradas',
    category: 'manutencao',
    categoryLabel: 'Manutenção & Paradas',
    featured: false,
    summary:
      'Intervenções preventivas, corretivas e preditivas em plantas de processo contínuo. Revisão de transportadores, redutores de velocidade, bombas centrífugas, moinhos, britadores e válvulas industriais.',
    toleranceOrSpec: 'Atendimento a Cronogramas de Parada',
    normCompliance: 'NR-12 · NR-33 · NR-35',
    capabilities: [
      'Equipes de mecânicos montadores, soldadores e caldeireiros dedicados para paradas programadas',
      'Alinhamento de conjuntos rotativos, nivelamento de bases e troca de rolamentos pesados',
      'Documentação completa de SMS (ASO, APR, PT e treinamentos normativos vigentes)',
    ],
    deliverables: [
      'Relatório técnico fotográfico de intervenção',
      'Checklist de comissionamento mecânico',
    ],
    blueprintType: 'maintenance',
  },
  {
    id: 'estruturas-metalicas',
    number: '04',
    title: 'Estruturas Metálicas e Pipe-Racks',
    category: 'caldeiraria',
    categoryLabel: 'Caldeiraria & Solda',
    featured: false,
    summary:
      'Fabricação e montagem de galpões industriais, pipe-racks para sustentação de linhas de processo, mezaninos técnicos, plataformas de operação, escadas marinheiro e guarda-corpos normatizados.',
    toleranceOrSpec: 'Perfis W, U, Cantoneiras e Tubulares',
    normCompliance: 'ABNT NBR 8800 · NR-12 · NR-35',
    capabilities: [
      'Jateamento abrasivo e aplicação de esquemas de pintura industrial epóxi/poliuretano',
      'Montagem em campo com rigoroso cumprimento das normas de trabalho em altura (NR-35)',
      'Adequação de guarda-corpos, escadas e acessos industriais à norma NR-12',
    ],
    deliverables: [
      'Controle de camada de pintura (película seca)',
      'ART de fabricação e montagem estrutural',
    ],
    blueprintType: 'structure',
  },
  {
    id: 'tubulacoes-spools',
    number: '05',
    title: 'Tubulações Industriais e Spools',
    category: 'projetos',
    categoryLabel: 'Projetos & Spools',
    featured: false,
    summary:
      'Pré-fabricação em oficina e montagem de spools de tubulação industrial para condução de vapor, água gelada, ar comprimido, óleo térmico, efluentes e fluidos químicos em aço carbono (SCH 40/80) e inox OD/Schedule.',
    toleranceOrSpec: 'Teste Hidrostático e Rastreabilidade',
    normCompliance: 'ASME B31.1 · ASME B31.3',
    capabilities: [
      'Soldagem de raiz em TIG com purga de argônio para linhas sanitárias e de processo',
      'Montagem de linhas flangeadas, roscadas e soldadas de topo ou encaixe',
      'Execução de testes hidrostáticos e emissão de certificados de estanqueidade',
    ],
    deliverables: [
      'Isométricos marcados com mapa de soldas',
      'Certificado de teste hidrostático',
    ],
    blueprintType: 'piping',
  },
  {
    id: 'engenharia-reversa',
    number: '06',
    title: 'Engenharia Reversa e Nacionalização de Peças',
    category: 'projetos',
    categoryLabel: 'Projetos & Spools',
    featured: false,
    summary:
      'Levantamento dimensional em campo ou bancada para nacionalização de componentes importados fora de linha, modelagem CAD 2D/3D, especificação metalúrgica e melhorias em dispositivos mecânicos.',
    toleranceOrSpec: 'Modelagem CAD 3D & Detalhamento Técnico',
    normCompliance: 'ABNT NBR 10067 · ISO GPS',
    capabilities: [
      'Redução de lead time e eliminação de dependência de importação de peças críticas',
      'Determinação de dureza e especificação de tratamentos térmicos (têmpera, cementação, nitretação)',
      'Entrega de pacote técnico com desenhos de fabricação e peça pronta instalada',
    ],
    deliverables: [
      'Desenho técnico executivo em PDF/DWG',
      'Peça nacionalizada com garantia dimensional',
    ],
    blueprintType: 'cad',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-cervejaria',
    sector: 'Polo de Bebidas & Envase',
    location: 'Alagoinhas · BA',
    title: 'Nacionalização de Eixos Acionadores e Buchas de Linha de Envase',
    metricValue: '-42% Lead Time',
    metricLabel: 'Redução no prazo de reposição frente a componentes importados',
    challenge:
      'Desgaste prematuro em eixos estriados importados com prazo de importação superior a 60 dias, ameaçando a disponibilidade da linha de envase.',
    solution:
      'Engenharia reversa em bancada, usinagem em aço liga SAE 4140 beneficiado com tratamento térmico e retífica cilíndrica nas tolerâncias H7/g6.',
    outcome:
      'Lote de 8 conjuntos entregue em 11 dias úteis com vida útil estendida em 30% em operação contínua.',
  },
  {
    id: 'case-petroquimica',
    sector: 'Química & Petroquímica',
    location: 'Região Metropolitana & BR-101 · BA',
    title: 'Pré-Fabricação de Spools em Aço Inox 316L e Pipe-Rack Modular',
    metricValue: '100% no Prazo',
    metricLabel: 'Janela de parada programada de 72 horas cumprida sem retrabalho',
    challenge:
      'Substituição de linha de transferência corrosiva durante parada curta de planta, exigindo pré-fabricação milimétrica antes do bloqueio operacional.',
    solution:
      'Levantamento isométrico prévio, fabricação de 24 spools em oficina com solda TIG purgada, teste hidrostático prévio e montagem noturna dedicada.',
    outcome:
      'Partida de planta realizada 4 horas antes do limite da janela de manutenção com zero vazamentos no teste de pressão.',
  },
  {
    id: 'case-agroindustria',
    sector: 'Celulose, Cerâmica & Agroindústria',
    location: 'Litoral Norte & Agreste · BA',
    title: 'Reforma de Rotores, Moegas de Alimentação e Tambores Transportadores',
    metricValue: '99,4% Precisão',
    metricLabel: 'Conformidade dimensional em inspeções de recebimento B2B',
    challenge:
      'Abrasão severa em moegas de recepção e desalinhamento de tambores motrizes de correias transportadoras de alta tonelagem.',
    solution:
      'Caldeiraria pesada com revestimento antidesgaste, troca de pontas de eixo por interferência térmica e balanceamento do conjunto.',
    outcome:
      'Eliminação de paradas corretivas não planejadas no setor de movimentação de granéis durante toda a safra.',
  },
];

export const ALLOY_MATERIALS: AlloyMaterial[] = [
  {
    id: 'sae-1045',
    name: 'Aço Carbono SAE 1020 / 1045',
    code: 'SAE 1045',
    densityGcm3: 7.85,
    typicalUse: 'Eixos, engrenagens, pinos, flanges e estruturas mecânicas',
  },
  {
    id: 'aisi-304',
    name: 'Aço Inoxidável AISI 304 / 316L',
    code: 'AISI 304/316',
    densityGcm3: 7.98,
    typicalUse: 'Indústria alimentícia, cervejeira, química e spools sanitários',
  },
  {
    id: 'sae-4140',
    name: 'Aço Liga Beneficiado SAE 4140',
    code: 'SAE 4140',
    densityGcm3: 7.85,
    typicalUse: 'Eixos de alta solicitação, roletes pesados e acoplamentos',
  },
  {
    id: 'bronze-tm23',
    name: 'Bronze Industrial TM-23 / SAE 660',
    code: 'Bronze TM-23',
    densityGcm3: 8.8,
    typicalUse: 'Buchas autolubrificantes, coroas de redutores e anéis de desgaste',
  },
  {
    id: 'nylon-6',
    name: 'Nylon 6.0 / Poliacetal (POM) Técnico',
    code: 'Nylon Técnico',
    densityGcm3: 1.15,
    typicalUse: 'Roldanas, estrelas de envase, guias deslizantes e buchas leves',
  },
];
