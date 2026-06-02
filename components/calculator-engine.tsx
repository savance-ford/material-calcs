'use client';

import { useState } from 'react';
import { getCalculatorBySlug } from '../lib/calculator-configs';

interface CalculatorEngineProps {
  slug: string;
}

export default function CalculatorEngine({ slug }: CalculatorEngineProps) {
  const config = getCalculatorBySlug(slug);

  // Default values need to be evaluated gracefully
  const defaultValues = config?.inputs.reduce((acc, input) => {
    acc[input.id] = input.defaultValue;
    return acc;
  }, {} as Record<string, any>) || {};

  const [inputs, setInputs] = useState<Record<string, any>>(defaultValues);
  const [copied, setCopied] = useState(false);

  if (!config) return null;

  // Calculate results synchronously during render based on current inputs
  const results = config.calculate(inputs);

  const handleInputChange = (id: string, value: any, type: string) => {
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (type === 'checkbox') {
      parsedValue = value === true; // boolean
    }
    setInputs(prev => ({ ...prev, [id]: parsedValue }));
  };

  const handleCopy = () => {
    const textToCopy = config.outputs.map((out) => {
      const val = results[out.id];
      if (val === null || val === undefined) return null;
      if (out.type === 'warning' || out.type === 'note') return null;
      return `${out.label}: ${out.type === 'cost' ? '$' + val : val} ${out.unit && out.type !== 'cost' ? out.unit : ''}`;
    }).filter(Boolean).join('\n');
    
    navigator.clipboard.writeText(`--- ${config.title} Material List ---\nFor this project, buy or order approximately:\n` + textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Calculator Form */}
      <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-stone-200 p-6 sm:p-8">
        <div className="space-y-6">
          {config.inputs.filter((input) => !input.showIf || input.showIf(inputs)).map((input) => (
            <div key={input.id} className="space-y-2">
              <label htmlFor={input.id} className="text-sm font-bold text-stone-700 block">
                {input.label}
              </label>
              
              {input.type === 'select' ? (
                <div className="relative">
                  <select
                    id={input.id}
                    value={inputs[input.id]}
                    onChange={(e) => handleInputChange(input.id, e.target.value, input.type)}
                    className="w-full pl-4 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none appearance-none hover:border-stone-300 transition-colors"
                  >
                    {input.options?.map((opt) => (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-4 text-stone-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              ) : input.type === 'checkbox' ? (
                <div className="flex items-center gap-3 mt-2">
                  <input 
                    type="checkbox"
                    id={input.id}
                    checked={!!inputs[input.id]}
                    onChange={(e) => handleInputChange(input.id, e.target.checked, input.type)}
                    className="w-5 h-5 text-emerald-600 rounded border-stone-300 flex-shrink-0"
                  />
                  <label htmlFor={input.id} className="text-sm text-stone-700 cursor-pointer font-medium">
                    {(input.helpText || input.helperText) ? (
                      <span className="flex flex-col">
                        <span>Enable</span>
                        <span className="text-xs text-stone-500 font-normal">{input.helpText || input.helperText}</span>
                      </span>
                    ) : 'Enable'}
                  </label>
                </div>
              ) : input.type === 'radio' ? (
                <div className="flex flex-wrap gap-4 mt-2">
                  {input.options?.map((opt) => (
                    <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl hover:border-stone-300 transition-colors">
                      <input 
                        type="radio"
                        name={input.id}
                        value={String(opt.value)}
                        checked={String(inputs[input.id]) === String(opt.value)}
                        onChange={(e) => handleInputChange(input.id, e.target.value, input.type)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-600 border-stone-300"
                      />
                      <span className="text-sm text-stone-700 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              ) : input.type === 'unitToggle' ? (
                <div className="flex bg-stone-100 p-1.5 rounded-xl w-fit mt-2">
                  {input.options?.map((opt) => (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => handleInputChange(input.id, opt.value, input.type)}
                      className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                        String(inputs[input.id]) === String(opt.value) 
                          ? 'bg-white text-emerald-700 shadow-sm' 
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="number"
                    id={input.id}
                    value={inputs[input.id]}
                    onChange={(e) => handleInputChange(input.id, e.target.value, input.type)}
                    placeholder={input.placeholder}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    className="w-full pl-4 pr-16 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none hover:border-stone-300 transition-colors font-medium text-stone-900 placeholder-stone-400"
                  />
                  {input.unit && (
                    <span className="absolute right-4 top-3.5 text-stone-500 text-sm pointer-events-none font-semibold">
                      {input.unit}
                    </span>
                  )}
                </div>
              )}
              {input.type !== 'checkbox' && (input.helpText || input.helperText) && <p className="mt-1.5 text-xs text-stone-500">{input.helpText || input.helperText}</p>}
            </div>
          ))}
          
          <div className="pt-6 space-y-3">
            <p className="text-sm text-stone-500 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              Results update automatically as you enter measurements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={() => setInputs(defaultValues)}
                className="flex-1 px-8 py-4 border-2 border-stone-200 rounded-xl text-stone-600 font-bold hover:bg-stone-50 hover:border-stone-300 transition-all text-lg"
              >
                Reset
              </button>
              <button 
                type="button"
                onClick={handlePrint}
                className="flex-1 px-8 py-4 bg-emerald-700 text-white rounded-xl font-bold text-lg hover:bg-emerald-800 shadow-lg shadow-emerald-700/20 transition-all"
              >
                Print Estimate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Material List Panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Your Material List</p>
              <h3 className="text-2xl font-extrabold text-white">For this project, buy or order approximately</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-300">
                Use these quantities as a shopping list, supplier note, quote check, or quick jobsite material estimate.
              </p>
            </div>
            <button 
              onClick={handleCopy}
              className="w-fit text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                  Copy Material List
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-5 flex-1">
            {config.outputs.map((output, idx) => {
              const val = results[output.id];
              if (val === null || val === undefined) return null;

              if (output.type === 'warning' && val) {
                return (
                  <div key={output.id} className="mt-6 p-4 bg-amber-900/40 border border-amber-500/50 rounded-xl text-sm text-amber-100">
                    <strong className="text-amber-400 block mb-1">Notice:</strong> {val}
                  </div>
                );
              }

              if (output.type === 'note' && val) {
                return (
                  <div key={output.id} className="mt-6 p-4 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-sm text-emerald-100">
                    <strong className="text-emerald-400 block mb-1">Note:</strong> {val}
                  </div>
                );
              }

              return (
                <div key={output.id} className={idx !== config.outputs.length - 1 ? 'border-b border-stone-800 pb-5' : ''}>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-stone-300 font-medium">{output.label}</span>
                    <div className="text-right">
                      <span className={`${output.type === 'primary' || output.type === 'material' ? 'text-3xl' : 'text-2xl'} font-extrabold text-white`}>
                        {output.type === 'cost' ? `$${val}` : val}
                      </span>
                      {output.unit && output.type !== 'cost' && (
                        <span className="text-stone-400 text-sm ml-1.5 font-medium">{output.unit}</span>
                      )}
                    </div>
                  </div>
                  {output.description && (
                    <p className="mt-1 text-xs text-stone-500 text-right">{output.description}</p>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-stone-800 text-xs text-stone-400 leading-relaxed">
            <strong className="text-stone-300 mr-1">Estimate note:</strong> Actual needs vary due to compaction, grading, cuts, bag yield, and supplier differences. Confirm requirements before purchasing.
          </div>
        </div>
      </div>
    </div>
  );
}
