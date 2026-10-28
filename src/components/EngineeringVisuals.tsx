import React from 'react';

export function HeroMachiningBlueprint() {
  return (
    <div className="relative w-full h-full min-h-[380px] rounded-2xl bg-[#0b131f] border border-slate-800 overflow-hidden flex flex-col justify-between p-6">
      {/* Subtle Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Technical Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 pb-4 text-xs font-mono text-slate-400">
        <span>CAD-AVL-1045 · EIXO ESCALONADO</span>
        <span className="text-sky-400">ISO 2768-mK</span>
      </div>

      {/* Central Precision Shaft & Flange Assembly SVG */}
      <div className="relative z-10 my-4 flex items-center justify-center">
        <svg
          viewBox="0 0 600 260"
          className="w-full max-w-[540px] h-auto"
          role="img"
          aria-label="Desenho técnico de eixo escalonado e flange usinado com tolerâncias milimétricas"
        >
          <defs>
            <linearGradient id="steelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="35%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="85%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="accentBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Centerline (Linha de Simetria) */}
          <line
            x1="20"
            y1="130"
            x2="580"
            y2="130"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="12 4 2 4"
            opacity="0.7"
          />

          {/* Left Flange Section */}
          <rect
            x="60"
            y="50"
            width="45"
            height="160"
            rx="2"
            fill="url(#steelGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Flange Bolt Holes */}
          <line x1="55" y1="72" x2="110" y2="72" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="55" y1="188" x2="110" y2="188" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />

          {/* Main Bearing Journal Step 1 */}
          <rect
            x="105"
            y="78"
            width="135"
            height="104"
            fill="url(#steelGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />

          {/* Keyway Slot (Rasgo de Chaveta) */}
          <rect
            x="130"
            y="92"
            width="85"
            height="16"
            rx="8"
            fill="#0b131f"
            stroke="#fbbf24"
            strokeWidth="1.2"
          />

          {/* Central Collar */}
          <rect
            x="240"
            y="64"
            width="36"
            height="132"
            fill="url(#accentBlue)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />

          {/* Step 2 Splined / Machined Body */}
          <rect
            x="276"
            y="84"
            width="164"
            height="92"
            fill="url(#steelGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Spline grooves */}
          <line x1="295" y1="98" x2="420" y2="98" stroke="#64748b" strokeWidth="1" />
          <line x1="295" y1="112" x2="420" y2="112" stroke="#64748b" strokeWidth="1" />
          <line x1="295" y1="148" x2="420" y2="148" stroke="#64748b" strokeWidth="1" />
          <line x1="295" y1="162" x2="420" y2="162" stroke="#64748b" strokeWidth="1" />

          {/* Right Threaded End */}
          <rect
            x="440"
            y="98"
            width="85"
            height="64"
            fill="url(#steelGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Thread Hatching */}
          <line x1="440" y1="103" x2="525" y2="103" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="440" y1="157" x2="525" y2="157" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Dimension Lines - Overall Length */}
          <line x1="60" y1="215" x2="60" y2="242" stroke="#64748b" strokeWidth="1" />
          <line x1="525" y1="165" x2="525" y2="242" stroke="#64748b" strokeWidth="1" />
          <line x1="60" y1="234" x2="525" y2="234" stroke="#38bdf8" strokeWidth="1" />
          <text
            x="292"
            y="228"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            L = 1.450,00 ±0,05 mm
          </text>

          {/* Dimension Line - Bearing Journal Diameter */}
          <line x1="172" y1="30" x2="172" y2="78" stroke="#fbbf24" strokeWidth="1" />
          <text
            x="172"
            y="24"
            textAnchor="middle"
            fill="#fbbf24"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            Ø 120,00 H7/k6 · Ra 0,8
          </text>

          {/* Dimension Line - Thread End */}
          <line x1="482" y1="45" x2="482" y2="98" stroke="#38bdf8" strokeWidth="1" />
          <text
            x="482"
            y="38"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            M64 x 4,0 - 6g
          </text>
        </svg>
      </div>

      {/* Bottom Operational Capabilities Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-slate-800/90 pt-4 text-xs">
        <div>
          <div className="text-slate-400">Planta Fabril</div>
          <div className="font-semibold text-white mt-0.5 tabular-nums whitespace-nowrap">Alagoinhas · BR-101</div>
        </div>
        <div>
          <div className="text-slate-400">Processos</div>
          <div className="font-semibold text-white mt-0.5 whitespace-nowrap">Torno · Fresa · TIG</div>
        </div>
        <div>
          <div className="text-slate-400">Engenharia B2B</div>
          <div className="font-semibold text-sky-400 mt-0.5 tabular-nums whitespace-nowrap">(75) 99915-0344</div>
        </div>
      </div>
    </div>
  );
}

export function FacilityCapabilitiesGraphic() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card 1: Usinagem */}
      <div className="rounded-xl bg-[#0b131f] border border-slate-800 p-5 flex flex-col justify-between min-h-[210px]">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SETOR 01 · USINAGEM</span>
          <span className="text-sky-400">ISO IT6</span>
        </div>
        <svg viewBox="0 0 240 90" className="w-full h-24 my-2" aria-hidden="true">
          <circle cx="65" cy="45" r="32" fill="none" stroke="#0284c7" strokeWidth="2" />
          <circle cx="65" cy="45" r="14" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="25" y1="45" x2="105" y2="45" stroke="#475569" strokeWidth="1" />
          <line x1="65" y1="5" x2="65" y2="85" stroke="#475569" strokeWidth="1" />
          <rect x="125" y="25" width="90" height="40" rx="2" fill="#152336" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="125" y1="45" x2="215" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 3" />
        </svg>
        <div>
          <div className="text-sm font-semibold text-white">Tornos, Fresadoras & Mandrilhadoras</div>
          <div className="text-xs text-slate-400 mt-0.5">Eixos, buchas, engrenagens e roletes sob desenho</div>
        </div>
      </div>

      {/* Card 2: Caldeiraria */}
      <div className="rounded-xl bg-[#0b131f] border border-slate-800 p-5 flex flex-col justify-between min-h-[210px]">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SETOR 02 · CALDEIRARIA</span>
          <span className="text-amber-400">ASME IX</span>
        </div>
        <svg viewBox="0 0 240 90" className="w-full h-24 my-2" aria-hidden="true">
          <path
            d="M40 20 L120 20 L120 55 L95 80 L65 80 L40 55 Z"
            fill="#152336"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />
          <line x1="40" y1="55" x2="120" y2="55" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="145" y="18" width="60" height="62" rx="4" fill="#152336" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="145" y1="38" x2="205" y2="38" stroke="#475569" strokeWidth="1" />
          <line x1="145" y1="58" x2="205" y2="58" stroke="#475569" strokeWidth="1" />
        </svg>
        <div>
          <div className="text-sm font-semibold text-white">Caldeiraria Pesada & Solda TIG/MIG</div>
          <div className="text-xs text-slate-400 mt-0.5">Silos, moegas, tanques, ciclones e dutos</div>
        </div>
      </div>

      {/* Card 3: Tubulações e Spools */}
      <div className="rounded-xl bg-[#0b131f] border border-slate-800 p-5 flex flex-col justify-between min-h-[210px]">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SETOR 03 · TUBULAÇÕES</span>
          <span className="text-sky-400">ASME B31.3</span>
        </div>
        <svg viewBox="0 0 240 90" className="w-full h-24 my-2" aria-hidden="true">
          <path
            d="M30 65 L110 65 L140 30 L210 30"
            fill="none"
            stroke="#0284c7"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 65 L110 65 L140 30 L210 30"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <rect x="24" y="53" width="8" height="24" fill="#fbbf24" />
          <rect x="206" y="18" width="8" height="24" fill="#fbbf24" />
        </svg>
        <div>
          <div className="text-sm font-semibold text-white">Spools & Linhas de Processo</div>
          <div className="text-xs text-slate-400 mt-0.5">Aço carbono SCH 40/80 e inox sanitário/industrial</div>
        </div>
      </div>

      {/* Card 4: Paradas de Planta */}
      <div className="rounded-xl bg-[#0b131f] border border-slate-800 p-5 flex flex-col justify-between min-h-[210px]">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SETOR 04 · CAMPO & PARADAS</span>
          <span className="text-amber-400">NR-12 / NR-35</span>
        </div>
        <svg viewBox="0 0 240 90" className="w-full h-24 my-2" aria-hidden="true">
          <rect x="30" y="58" width="180" height="12" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="65" cy="40" r="16" fill="#152336" stroke="#38bdf8" strokeWidth="1.8" />
          <circle cx="175" cy="40" r="16" fill="#152336" stroke="#fbbf24" strokeWidth="1.8" />
          <line x1="65" y1="40" x2="175" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
        <div>
          <div className="text-sm font-semibold text-white">Manutenção & Alinhamento em Planta</div>
          <div className="text-xs text-slate-400 mt-0.5">Equipes mobilizadas para paradas programadas</div>
        </div>
      </div>
    </div>
  );
}
