import React, { useState } from 'react';
import { Calculator, Check, PlusCircle } from 'lucide-react';
import { ALLOY_MATERIALS } from '../utils/industrialData';
import {
  calculatePartWeight,
  PartGeometry,
} from '../utils/engineeringCalc';

interface WeightCalculatorPanelProps {
  onAppendToQuote: (specLine: string, suggestedService: string) => void;
}

export function WeightCalculatorPanel({
  onAppendToQuote,
}: WeightCalculatorPanelProps) {
  const [geometry, setGeometry] = useState<PartGeometry>('cylinder');
  const [alloyId, setAlloyId] = useState<string>('sae-1045');
  const [outerDiameterMm, setOuterDiameterMm] = useState<string>('120');
  const [innerDiameterMm, setInnerDiameterMm] = useState<string>('60');
  const [widthMm, setWidthMm] = useState<string>('500');
  const [thicknessMm, setThicknessMm] = useState<string>('12.7');
  const [lengthMm, setLengthMm] = useState<string>('1000');
  const [quantity, setQuantity] = useState<string>('2');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const calculation = calculatePartWeight({
    geometry,
    alloyId,
    outerDiameterMm: Number(outerDiameterMm),
    innerDiameterMm: Number(innerDiameterMm),
    widthMm: Number(widthMm),
    thicknessMm: Number(thicknessMm),
    lengthMm: Number(lengthMm),
    quantity: Number(quantity),
  });

  const handleAdd = () => {
    if (!calculation.valid) return;
    const suggestedService =
      geometry === 'plate'
        ? 'Caldeiraria Média e Pesada'
        : 'Usinagem Mecânica de Precisão';
    onAppendToQuote(calculation.specLine, suggestedService);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 3000);
  };

  return (
    <div className="rounded-2xl bg-[#060a11] border border-slate-800 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="text-xs font-mono text-sky-400 mb-1">
            FERRAMENTA DE ENGENHARIA · DIMENSIONAMENTO B2B
          </div>
          <h3 className="text-2xl font-display font-bold uppercase text-white tracking-tight flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-sky-400 shrink-0" />
            <span>Calculadora de Massa Bruta para Usinagem e Caldeiraria</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Estime o peso teórico de tarugos, buchas vazadas ou chapas metálicas e anexe diretamente ao escopo da sua cotação.
          </p>
        </div>

        {/* Geometry Segmented Control */}
        <div
          className="flex items-center gap-1 p-1 bg-[#0b131f] border border-slate-800 rounded-lg self-start"
          role="group"
          aria-label="Geometria da peça"
        >
          <button
            type="button"
            onClick={() => setGeometry('cylinder')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              geometry === 'cylinder'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Eixo / Tarugo
          </button>
          <button
            type="button"
            onClick={() => setGeometry('tube')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              geometry === 'tube'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Bucha / Tubo
          </button>
          <button
            type="button"
            onClick={() => setGeometry('plate')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              geometry === 'plate'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Chapa / Placa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="sm:col-span-2 lg:col-span-3">
            <label
              htmlFor="calc-alloy"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Liga Metálica / Polímero de Engenharia
            </label>
            <select
              id="calc-alloy"
              value={alloyId}
              onChange={(e) => setAlloyId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
            >
              {ALLOY_MATERIALS.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name} ({mat.densityGcm3} g/cm³) — {mat.typicalUse}
                </option>
              ))}
            </select>
          </div>

          {(geometry === 'cylinder' || geometry === 'tube') && (
            <div>
              <label
                htmlFor="calc-od"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Diâmetro Externo Ø (mm)
              </label>
              <input
                id="calc-od"
                type="number"
                min="1"
                step="0.5"
                value={outerDiameterMm}
                onChange={(e) => setOuterDiameterMm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          )}

          {geometry === 'tube' && (
            <div>
              <label
                htmlFor="calc-id"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Diâmetro Interno Ø (mm)
              </label>
              <input
                id="calc-id"
                type="number"
                min="0"
                step="0.5"
                value={innerDiameterMm}
                onChange={(e) => setInnerDiameterMm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          )}

          {geometry === 'plate' && (
            <>
              <div>
                <label
                  htmlFor="calc-thickness"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Espessura da Chapa (mm)
                </label>
                <input
                  id="calc-thickness"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={thicknessMm}
                  onChange={(e) => setThicknessMm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label
                  htmlFor="calc-width"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Largura (mm)
                </label>
                <input
                  id="calc-width"
                  type="number"
                  min="1"
                  step="1"
                  value={widthMm}
                  onChange={(e) => setWidthMm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="calc-length"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Comprimento Total (mm)
            </label>
            <input
              id="calc-length"
              type="number"
              min="1"
              step="1"
              value={lengthMm}
              onChange={(e) => setLengthMm(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="calc-qty"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Quantidade de Peças
            </label>
            <input
              id="calc-qty"
              type="number"
              min="1"
              max="10000"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b131f] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Result Box */}
        <div className="lg:col-span-4 rounded-xl bg-[#0b131f] border border-slate-800 p-5 flex flex-col justify-between">
          {calculation.valid ? (
            <>
              <div>
                <div className="text-xs font-mono text-slate-400">
                  RESULTADO DO DIMENSIONAMENTO
                </div>
                <div className="mt-3 flex items-baseline justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-300">Massa Total do Lote:</span>
                  <span
                    className="text-2xl font-mono font-bold text-amber-400 tabular-nums"
                    data-testid="calc-total-weight"
                  >
                    {calculation.totalWeightKg.toFixed(2)} kg
                  </span>
                </div>
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-300 font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Massa Unitária:</span>
                    <span>{calculation.unitWeightKg.toFixed(2)} kg/un</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume Unitário:</span>
                    <span>{calculation.volumeCm3.toFixed(1)} cm³</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="mt-5 w-full py-2.5 px-4 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>Item Anexado ao Orçamento!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Anexar ao Escopo da Cotação</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="text-xs text-amber-400 py-4" role="alert">
              {calculation.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
