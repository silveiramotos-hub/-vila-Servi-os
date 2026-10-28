import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import {
  CASE_STUDIES,
  COMPANY_INFO,
  IndustrialService,
  ServiceCategory,
} from './utils/industrialData';
import {
  createQuoteRecord,
  filterIndustrialServices,
  getPlantOperatingStatus,
  QuoteFormInput,
  QuoteValidationErrors,
  SubmittedQuoteRecord,
  validateQuoteForm,
} from './utils/engineeringCalc';
import {
  FacilityCapabilitiesGraphic,
  HeroMachiningBlueprint,
} from './components/EngineeringVisuals';
import { WeightCalculatorPanel } from './components/WeightCalculatorPanel';
import { HostgatorModal } from './components/HostgatorModal';

const SERVICE_OPTIONS = [
  'Usinagem Mecânica de Precisão',
  'Caldeiraria Média e Pesada',
  'Manutenção em Parada de Fábrica',
  'Estruturas Metálicas e Plataformas',
  'Spools e Tubulações Industriais',
  'Engenharia Reversa e Desenhos',
  'Outro Serviço sob Demanda',
];

const URGENCY_OPTIONS = [
  'Normal (Planejamento)',
  'Urgente (Parada em breve)',
  'Emergencial (Linha parada)',
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>('todos');
  const [serviceSearch, setServiceSearch] = useState('');
  const [hostgatorModalOpen, setHostgatorModalOpen] = useState(false);

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState<QuoteFormInput>({
    service: SERVICE_OPTIONS[0],
    urgency: URGENCY_OPTIONS[0],
    company: '',
    contactName: '',
    city: '',
    phone: '',
    email: '',
    details: '',
  });
  const [formErrors, setFormErrors] = useState<QuoteValidationErrors>({});
  const [submittedQuotes, setSubmittedQuotes] = useState<
    SubmittedQuoteRecord[]
  >([]);
  const [latestQuote, setLatestQuote] = useState<SubmittedQuoteRecord | null>(
    null
  );

  const filteredServices = filterIndustrialServices(
    selectedCategory,
    serviceSearch
  );
  const plantStatus = getPlantOperatingStatus();

  const handleSelectServiceForQuote = (srv: IndustrialService) => {
    const matchedOption =
      SERVICE_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(srv.title.split(' ')[0].toLowerCase())
      ) || SERVICE_OPTIONS[0];

    setQuoteForm((prev) => ({
      ...prev,
      service: matchedOption,
      details: prev.details
        ? prev.details
        : `Solicitação de orçamento para ${srv.title} (${srv.toleranceOrSpec}). `,
    }));

    const el = document.getElementById('orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppendCalculatedPart = (
    specLine: string,
    suggestedService: string
  ) => {
    setQuoteForm((prev) => ({
      ...prev,
      service: suggestedService,
      details: prev.details
        ? `${prev.details.trim()}\n${specLine}`
        : specLine,
    }));
    const el = document.getElementById('orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateQuoteForm(quoteForm);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    const nextSequence = submittedQuotes.length + 1;
    const record = createQuoteRecord(quoteForm, nextSequence);
    setSubmittedQuotes((prev) => [record, ...prev]);
    setLatestQuote(record);
  };

  const handleDownloadQuoteTxt = (record: SubmittedQuoteRecord) => {
    const content = [
      `=============================================================`,
      `RESUMO DE SOLICITAÇÃO DE COTAÇÃO TÉCNICA (RFQ)`,
      `${COMPANY_INFO.name}`,
      `CNPJ: ${COMPANY_INFO.cnpj} · ${COMPANY_INFO.city}/${COMPANY_INFO.state}`,
      `=============================================================`,
      `Protocolo: ${record.protocol}`,
      `Data/Hora: ${record.createdAtFormatted}`,
      `Empresa Solicitante: ${record.company}`,
      `Responsável Técnico/Comercial: ${record.contactName}`,
      `Cidade / Planta: ${record.city}`,
      `Telefone / WhatsApp: ${record.phone}`,
      `E-mail: ${record.email || 'Não informado'}`,
      `Segmento do Serviço: ${record.service}`,
      `Prioridade / Prazo: ${record.urgency}`,
      `-------------------------------------------------------------`,
      `ESCOPO TÉCNICO E MATERIAIS:`,
      record.details,
      `-------------------------------------------------------------`,
      `Canais Oficiais Ávila Serviços:`,
      `Central: ${COMPANY_INFO.phoneLandline} · WhatsApp: ${COMPANY_INFO.whatsappDisplay}`,
      `E-mail: ${COMPANY_INFO.email}`,
      `Endereço: ${COMPANY_INFO.address}, ${COMPANY_INFO.district}, ${COMPANY_INFO.city}-${COMPANY_INFO.state}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.protocol}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#060a11] text-slate-100 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#060a11]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#inicio"
            className="text-xl font-display font-bold uppercase tracking-wider text-white whitespace-nowrap shrink-0"
          >
            ÁVILA SERVIÇOS
          </a>

          {/* Zone 2: 5 Single-line Nav Links */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
          >
            <a
              href="#inicio"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Início
            </a>
            <a
              href="#servicos"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Serviços Técnicos
            </a>
            <a
              href="#casos"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Casos & Qualidade
            </a>
            <a
              href="#empresa"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              A Empresa
            </a>
            <a
              href="#contato"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Localização
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action (+ Mobile Hamburger) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#orcamento"
              className="px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Solicitar Cotação
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu Mobile"
            className="md:hidden bg-[#0b131f] border-b border-slate-800 px-4 py-4 space-y-2 text-sm"
          >
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-white border-b border-slate-800/60"
            >
              Início
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-white border-b border-slate-800/60"
            >
              Serviços Técnicos
            </a>
            <a
              href="#casos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-white border-b border-slate-800/60"
            >
              Casos & Qualidade
            </a>
            <a
              href="#empresa"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-white border-b border-slate-800/60"
            >
              A Empresa
            </a>
            <a
              href="#orcamento"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-white border-b border-slate-800/60"
            >
              Solicitar Cotação Industrial
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-white"
            >
              Localização e Contato
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="inicio"
          className="relative py-16 lg:py-24 border-b border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Quiet Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-sky-400">
                    <span>Alagoinhas, BA</span>
                    <span aria-hidden="true">·</span>
                    <span>Rodovia BR-101</span>
                    <span aria-hidden="true">·</span>
                    <span>+12 Anos de Operação</span>
                    <span aria-hidden="true">·</span>
                    <span>CNPJ {COMPANY_INFO.cnpj}</span>
                  </div>

                  <h1
                    className="text-4xl sm:text-5xl lg:text-[54px] font-display font-bold uppercase tracking-tight text-white leading-[1.08] max-w-2xl"
                    style={{ textWrap: 'balance' }}
                  >
                    Soluções de Alta Precisão em{' '}
                    <span className="text-sky-400">
                      Usinagem, Caldeiraria e Manutenção
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                    Parceira estratégica de indústrias petroquímicas, cervejeiras,
                    de celulose, cerâmicas e agroindustriais na Bahia. Fabricação
                    de peças sob desenho técnico, reforma de conjuntos mecânicos
                    e atendimento rigoroso a janelas de parada programada.
                  </p>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="pt-2 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#orcamento"
                      className="px-5 py-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Solicitar Cotação Técnica</span>
                    </a>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20proposta%20t%C3%A9cnica%20com%20a%20%C3%80vila%20Servi%C3%A7os%20Industriais`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-[#0b131f] hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>WhatsApp {COMPANY_INFO.whatsappDisplay}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setHostgatorModalOpen(true)}
                      className="px-4 py-3 rounded-xl bg-[#0b131f] hover:bg-slate-800 text-amber-400 border border-slate-800 font-mono text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar ZIP HostGator</span>
                    </button>
                  </div>

                  {/* Direct Contact Bar */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>Central Fixa: {COMPANY_INFO.phoneLandline}</span>
                    <span aria-hidden="true">·</span>
                    <span>E-mail: {COMPANY_INFO.email}</span>
                    <span aria-hidden="true">·</span>
                    <span>{COMPANY_INFO.hoursSummary}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Precision Blueprint Showcase */}
              <div className="lg:col-span-5 flex">
                <HeroMachiningBlueprint />
              </div>
            </div>

            {/* Full-Width 4-Column Operational Metrics Strip */}
            <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  +12 Anos
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Histórico sólido no mercado industrial da Bahia
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-sky-400 tabular-nums">
                  ISO IT6/IT7
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Controle dimensional em usinagem de precisão
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  BR-101 · KM
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Logística estratégica em Alagoinhas para polos B2B
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-amber-400 tabular-nums">
                  NR-12 & NR-35
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Conformidade normativa em fabricação e montagem
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities / Services Section */}
        <section
          id="servicos"
          className="py-20 bg-[#0b131f] border-b border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header & Interactive Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="text-xs font-mono text-sky-400 mb-2">
                  CAPACIDADE FABRIL E DE CAMPO
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white tracking-tight">
                  Serviços Técnicos Especializados
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                  Atendimento integral desde a usinagem de peças sobressalentes
                  até caldeiraria pesada e manutenção mecânica em paradas de
                  planta.
                </p>
              </div>

              {/* Search & Segmented Category Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    placeholder="Buscar eixo, inox, spool..."
                    aria-label="Buscar serviço ou especificação técnica"
                    className="w-full sm:w-52 pl-9 pr-3 py-2 rounded-lg bg-[#060a11] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div
                  className="flex items-center gap-1 p-1 bg-[#060a11] border border-slate-800 rounded-lg overflow-x-auto"
                  role="group"
                  aria-label="Filtrar serviços por especialidade"
                >
                  {(
                    [
                      { id: 'todos', label: 'Todos (6)' },
                      { id: 'usinagem', label: 'Usinagem' },
                      { id: 'caldeiraria', label: 'Caldeiraria' },
                      { id: 'manutencao', label: 'Manutenção' },
                      { id: 'projetos', label: 'Spools & CAD' },
                    ] as Array<{ id: ServiceCategory; label: string }>
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        selectedCategory === tab.id
                          ? 'bg-[#0284c7] text-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Asymmetric Bento Grid of Services */}
            {filteredServices.length === 0 ? (
              <div className="rounded-xl bg-[#060a11] border border-slate-800 p-8 text-center">
                <p className="text-sm text-slate-300">
                  Nenhum serviço encontrado para o filtro selecionado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('todos');
                    setServiceSearch('');
                  }}
                  className="mt-3 px-4 py-2 rounded-lg bg-[#0284c7] text-white text-xs font-semibold"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((srv, idx) => {
                  const isWide =
                    selectedCategory === 'todos' &&
                    !serviceSearch &&
                    (idx === 0 || idx === 3 || idx === 5);
                  return (
                    <article
                      key={srv.id}
                      className={`rounded-2xl bg-[#060a11] border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors ${
                        isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                      }`}
                    >
                      <div>
                        {/* Quiet Unboxed Kicker */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                          <span className="text-sky-400 font-semibold">
                            {srv.number}. {srv.categoryLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{srv.toleranceOrSpec}</span>
                          <span aria-hidden="true">·</span>
                          <span>{srv.normCompliance}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wide mb-3">
                          {srv.number}. {srv.title}
                        </h3>

                        <p className="text-sm text-slate-300 leading-relaxed mb-5">
                          {srv.summary}
                        </p>

                        <ul className="space-y-2 border-t border-slate-800/80 pt-4 mb-6 text-xs text-slate-300">
                          {srv.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className="text-sky-400 font-mono shrink-0"
                                aria-hidden="true"
                              >
                                +
                              </span>
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                        <div className="text-xs text-slate-400">
                          <span className="text-slate-300 font-medium">
                            Entregáveis:
                          </span>{' '}
                          {srv.deliverables.join(' · ')}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectServiceForQuote(srv)}
                          className="px-3.5 py-2 rounded-lg bg-[#0b131f] hover:bg-[#0284c7] text-sky-400 hover:text-white border border-slate-700 hover:border-transparent text-xs font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                        >
                          <span>Cotar {srv.title.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Interactive Material Weight Calculator */}
            <WeightCalculatorPanel
              onAppendToQuote={handleAppendCalculatedPart}
            />
          </div>
        </section>

        {/* Proof of Impact / Case Studies Section (Adjacent to Capabilities) */}
        <section
          id="casos"
          className="py-20 bg-[#060a11] border-b border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono text-sky-400 mb-2">
                RESULTADOS COMPROVADOS EM PLANTA
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white tracking-tight">
                Desempenho Operacional e Casos B2B
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Exemplos reais de redução de tempo de parada, nacionalização de
                componentes críticos e pré-fabricação de tubulações na Bahia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CASE_STUDIES.map((cs, index) => (
                <article
                  key={cs.id}
                  className="rounded-2xl bg-[#0b131f] border border-slate-800 p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                      <span>0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-sky-400">{cs.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.location}</span>
                    </div>

                    <div className="pb-4 mb-4 border-b border-slate-800">
                      <div className="text-3xl font-display font-bold text-amber-400 tabular-nums">
                        {cs.metricValue}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        {cs.metricLabel}
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold uppercase text-white mb-3">
                      {cs.title}
                    </h3>

                    <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                      <p>
                        <strong className="text-white">Desafio:</strong>{' '}
                        {cs.challenge}
                      </p>
                      <p>
                        <strong className="text-white">Solução Ávila:</strong>{' '}
                        {cs.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 text-xs text-sky-300">
                    <strong className="text-white">Resultado:</strong>{' '}
                    {cs.outcome}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About & Normative Compliance Section */}
        <section
          id="empresa"
          className="py-20 bg-[#0b131f] border-b border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-mono text-sky-400">
                  SOBRE A ÁVILA SERVIÇOS INDUSTRIAIS E USINAGEM
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white tracking-tight">
                  Solidez, Tecnologia e Pontualidade para a Indústria Baiana
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Com sede própria às margens da{' '}
                  <strong>Rodovia BR-101 em Alagoinhas - BA</strong>, a{' '}
                  <strong>{COMPANY_INFO.name}</strong> (CNPJ{' '}
                  {COMPANY_INFO.cnpj}) atua há mais de 12 anos fornecendo
                  soluções de engenharia mecânica aplicada, usinagem leve e
                  pesada, caldeiraria industrial e manutenção preventiva e
                  corretiva.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Investimos continuamente na modernização do nosso parque de
                  máquinas-ferramenta e na qualificação de torneiros,
                  fresadores, caldeireiros, soldadores e mecânicos montadores,
                  garantindo rastreabilidade, segurança operacional e respeito
                  absoluto aos cronogramas de paradas de fábrica.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#060a11] border border-slate-800">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Segurança & Normas</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">
                      Equipe com ASO, APR, EPIs homologados e treinamentos em
                      NR-12, NR-13, NR-33 e NR-35.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#060a11] border border-slate-800">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Atendimento B2B Flexível</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">
                      Contratos de manutenção continuada, pacotes de parada
                      programada e demandas emergenciais spot.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <FacilityCapabilitiesGraphic />
              </div>
            </div>
          </div>
        </section>

        {/* B2B Quote Form Section */}
        <section
          id="orcamento"
          className="py-20 bg-[#060a11] border-b border-slate-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="text-xs font-mono text-sky-400 mb-2">
                CANAL DIRETO DE ENGENHARIA E ORÇAMENTOS
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white tracking-tight">
                Solicite sua Cotação Industrial B2B
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Preencha os parâmetros técnicos do seu projeto ou peça para
                gerar o protocolo de atendimento e enviar ao nosso setor de
                engenharia.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0b131f] border border-slate-800 p-6 sm:p-10">
              <form
                onSubmit={handleQuoteSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="quote-service"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Segmento do Serviço
                    </label>
                    <select
                      id="quote-service"
                      value={quoteForm.service}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-urgency"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Prazo / Prioridade Operacional
                    </label>
                    <select
                      id="quote-urgency"
                      value={quoteForm.urgency}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          urgency: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                    >
                      {URGENCY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="quote-company"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Empresa / Razão Social *
                    </label>
                    <input
                      id="quote-company"
                      type="text"
                      required
                      value={quoteForm.company}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Ex: Cervejaria, Petroquímica, Usina..."
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {formErrors.company && (
                      <p
                        className="text-xs text-amber-400 mt-1.5"
                        role="alert"
                      >
                        {formErrors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-contact"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Seu Nome e Cargo *
                    </label>
                    <input
                      id="quote-contact"
                      type="text"
                      required
                      value={quoteForm.contactName}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          contactName: e.target.value,
                        }))
                      }
                      placeholder="Ex: Roberto Silva - Eng. de Manutenção"
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {formErrors.contactName && (
                      <p
                        className="text-xs text-amber-400 mt-1.5"
                        role="alert"
                      >
                        {formErrors.contactName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="quote-city"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Cidade da Planta *
                    </label>
                    <input
                      id="quote-city"
                      type="text"
                      required
                      value={quoteForm.city}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      placeholder="Ex: Alagoinhas - BA, Camaçari..."
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {formErrors.city && (
                      <p
                        className="text-xs text-amber-400 mt-1.5"
                        role="alert"
                      >
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Ex: (75) 99915-0344"
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {formErrors.phone && (
                      <p
                        className="text-xs text-amber-400 mt-1.5"
                        role="alert"
                      >
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      E-mail Corporativo (Opcional)
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="engenharia@empresa.com.br"
                      className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {formErrors.email && (
                      <p
                        className="text-xs text-amber-400 mt-1.5"
                        role="alert"
                      >
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-details"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Descrição dos Materiais / Escopo Técnico *
                  </label>
                  <textarea
                    id="quote-details"
                    rows={4}
                    required
                    value={quoteForm.details}
                    onChange={(e) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        details: e.target.value,
                      }))
                    }
                    placeholder="Ex: Fabricação de 4 eixos em aço SAE 1045 conforme desenho técnico, com ajuste para rolamento..."
                    className="w-full px-4 py-3 rounded-xl bg-[#060a11] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  {formErrors.details && (
                    <p className="text-xs text-amber-400 mt-1.5" role="alert">
                      {formErrors.details}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-4 px-6 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-display font-bold text-base uppercase tracking-wider transition-colors flex items-center justify-center gap-2.5"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Gerar Protocolo de Cotação e Enviar</span>
                  </button>

                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=Solicitacao%20de%20Cotacao%20Industrial%20-%20Avila%20Servicos`}
                    className="py-4 px-6 rounded-xl bg-[#060a11] hover:bg-slate-800 text-slate-200 border border-slate-700 font-display font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>E-mail Direto</span>
                  </a>
                </div>
              </form>

              {/* Confirmation & Generated Protocol State */}
              {latestQuote && (
                <div
                  className="mt-8 rounded-xl bg-[#060a11] border border-sky-500/40 p-6 space-y-4"
                  role="region"
                  aria-label="Protocolo de cotação gerado"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        Solicitação Registrada — Protocolo{' '}
                        <strong className="font-mono text-white">
                          {latestQuote.protocol}
                        </strong>
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {latestQuote.createdAtFormatted}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div>
                      <strong>Empresa:</strong> {latestQuote.company} ·{' '}
                      <strong>Responsável:</strong> {latestQuote.contactName} (
                      {latestQuote.city})
                    </div>
                    <div>
                      <strong>Serviço:</strong> {latestQuote.service} ·{' '}
                      <strong>Prioridade:</strong> {latestQuote.urgency}
                    </div>
                    <div className="text-slate-400 font-mono pt-1">
                      {latestQuote.details}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={latestQuote.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        Transmitir Agora no WhatsApp{' '}
                        {COMPANY_INFO.whatsappDisplay}
                      </span>
                    </a>

                    <a
                      href={latestQuote.mailtoUrl}
                      className="px-4 py-2.5 rounded-lg bg-[#0b131f] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-sky-400" />
                      <span>Transmitir por E-mail</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDownloadQuoteTxt(latestQuote)}
                      className="px-4 py-2.5 rounded-lg bg-[#0b131f] hover:bg-slate-800 text-amber-400 border border-slate-700 text-xs font-mono font-semibold inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar RFQ ({latestQuote.protocol}.txt)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Session History Table if quotes exist */}
              {submittedQuotes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="text-xs font-mono text-slate-400 mb-3">
                    HISTÓRICO DE COTAÇÕES NESTA SESSÃO ({submittedQuotes.length}
                    )
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono">
                          <th className="py-2 pr-4">Protocolo</th>
                          <th className="py-2 pr-4">Empresa</th>
                          <th className="py-2 pr-4">Serviço</th>
                          <th className="py-2 pr-4">Prioridade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300 tabular-nums">
                        {submittedQuotes.map((q) => (
                          <tr key={q.protocol}>
                            <td className="py-2 pr-4 font-mono text-sky-400">
                              {q.protocol}
                            </td>
                            <td className="py-2 pr-4">{q.company}</td>
                            <td className="py-2 pr-4">{q.service}</td>
                            <td className="py-2 pr-4">{q.urgency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section id="contato" className="py-20 bg-[#0b131f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              {/* Contact Information */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono text-sky-400 mb-2">
                    INFRAESTRUTURA FABRIL · ALAGOINHAS - BA
                  </div>
                  <h2 className="text-3xl font-display font-bold uppercase text-white tracking-tight">
                    Localização e Canais Diretos
                  </h2>
                  <p className="text-slate-400 text-sm mt-2">
                    Visite nossa planta industrial na BR-101 ou contate nosso
                    departamento de engenharia.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#060a11] border border-slate-800 flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">
                        Telefones Oficiais
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5 tabular-nums">
                        <a
                          href={`tel:${COMPANY_INFO.phoneLandlineRaw}`}
                          className="hover:text-sky-400 transition-colors"
                        >
                          {COMPANY_INFO.phoneLandline}
                        </a>
                        {' · '}
                        <a
                          href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          {COMPANY_INFO.whatsappDisplay} (WhatsApp)
                        </a>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Atendimento comercial, compras e engenharia
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#060a11] border border-slate-800 flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">
                        E-mail Corporativo
                      </div>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-sm font-bold text-white hover:text-sky-400 transition-colors block mt-0.5"
                      >
                        {COMPANY_INFO.email}
                      </a>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Recebimento de desenhos técnicos em PDF, DWG, STEP e
                        IGES
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#060a11] border border-slate-800 flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">
                        Endereço da Planta
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {COMPANY_INFO.address}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {COMPANY_INFO.district}, {COMPANY_INFO.city} -{' '}
                        {COMPANY_INFO.state}, CEP {COMPANY_INFO.cep}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#060a11] border border-slate-800 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">
                        Expediente Industrial
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        Segunda a Quinta: 07:00 às 17:00 · Sexta: 07:00 às 16:00
                      </div>
                      <p className="text-xs text-sky-400 mt-0.5">
                        {plantStatus.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="rounded-2xl overflow-hidden border border-slate-800 h-full min-h-[420px] flex flex-col bg-[#060a11]">
                  <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                    <span className="font-mono">
                      ÁVILA SERVIÇOS INDUSTRIAIS · RODOVIA BR-101, ALAGOINHAS/BA
                    </span>
                    <a
                      href={COMPANY_INFO.googleMapsCidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Abrir no Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="relative flex-1 w-full min-h-[370px]">
                    <iframe
                      title="Mapa de Localização Ávila Serviços Industriais na BR-101 em Alagoinhas Bahia"
                      src={COMPANY_INFO.googleMapsEmbedUrl}
                      className="absolute inset-0 w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#060a11] border-t border-slate-800 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-white font-display uppercase tracking-wider font-bold text-sm">
                {COMPANY_INFO.name}
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400">
                CNPJ: {COMPANY_INFO.cnpj} · {COMPANY_INFO.address},{' '}
                {COMPANY_INFO.district}, {COMPANY_INFO.city}/
                {COMPANY_INFO.state} · CEP {COMPANY_INFO.cep}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <a href="#inicio" className="hover:text-white transition-colors">
                Início
              </a>
              <a
                href="#servicos"
                className="hover:text-white transition-colors"
              >
                Serviços
              </a>
              <a href="#casos" className="hover:text-white transition-colors">
                Casos Reais
              </a>
              <a href="#empresa" className="hover:text-white transition-colors">
                A Empresa
              </a>
              <a
                href="#orcamento"
                className="hover:text-white transition-colors"
              >
                Cotação B2B
              </a>
              <button
                type="button"
                onClick={() => setHostgatorModalOpen(true)}
                className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar ZIP HostGator</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
            <span>
              &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Todos os
              direitos reservados.
            </span>
            <span>
              Usinagem mecânica, caldeiraria pesada e manutenção industrial em
              Alagoinhas e toda a Bahia.
            </span>
          </div>
        </div>
      </footer>

      {/* HostGator ZIP Package Modal */}
      <HostgatorModal
        isOpen={hostgatorModalOpen}
        onClose={() => setHostgatorModalOpen(false)}
      />
    </div>
  );
}
