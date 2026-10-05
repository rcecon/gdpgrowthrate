import React, { useState } from 'react';
import { Eye, RotateCcw } from 'lucide-react';
import { PizzaUnitIcon, PersonUnitIcon } from './PizzaVisuals';
import { CaseId } from './CaseView';

interface SummaryViewProps {
  onSelectCase: (caseId: CaseId) => void;
  onRestart: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  onSelectCase,
  onRestart,
}) => {
  const [relationshipRevealed, setRelationshipRevealed] = useState(false);

  const summaryRows = [
    {
      id: 1 as CaseId,
      name: 'Case 1',
      subtitle: 'Equal growth (110 pizzas / 110 people)',
      gdp: '+10%',
      pop: '+10%',
      perCapita: '0%',
      status: 'unchanged' as const,
      exampleMath: '10% − 10% ≈ 0%',
      pizzasAfter: 110,
      peopleAfter: 110,
    },
    {
      id: 2 as CaseId,
      name: 'Case 2',
      subtitle: 'Faster GDP growth (110 pizzas / 105 people)',
      gdp: '+10%',
      pop: '+5%',
      perCapita: 'approximately +5%',
      status: 'increased' as const,
      exampleMath: '10% − 5% ≈ +5%',
      pizzasAfter: 110,
      peopleAfter: 105,
    },
    {
      id: 3 as CaseId,
      name: 'Case 3',
      subtitle: 'Faster population growth (110 pizzas / 115 people)',
      gdp: '+10%',
      pop: '+15%',
      perCapita: 'approximately -5%',
      status: 'decreased' as const,
      exampleMath: '10% − 15% ≈ -5%',
      pizzasAfter: 110,
      peopleAfter: 115,
    },
    {
      id: 4 as CaseId,
      name: 'Case 4',
      subtitle: 'Working backwards (105 pizzas / 105 people)',
      gdp: '+5%',
      pop: '+5%',
      perCapita: '0%',
      status: 'unchanged' as const,
      exampleMath: '5% − 5% ≈ 0%',
      pizzasAfter: 105,
      peopleAfter: 105,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-[#64748B] mb-1.5">
            Final Synthesis · Connecting All 4 Cases
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] tracking-tight">
            Summary — What happens to GDP per person?
          </h1>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="px-3.5 py-2 text-xs font-semibold text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] rounded-lg bg-white hover:bg-[#F8FAFC] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Review from Case 1</span>
        </button>
      </div>

      {/* Summary Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0F172A]">
            Comparison of All Four Cases
          </h2>
          <span className="text-xs text-[#64748B]">
            Click any case row to revisit its interactive view
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-semibold text-[#475569]">
                <th className="py-3.5 px-6">Case</th>
                <th className="py-3.5 px-6">GDP growth</th>
                <th className="py-3.5 px-6">Population growth</th>
                <th className="py-3.5 px-6">Per-capita GDP growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-sm">
              {summaryRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelectCase(row.id)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6 font-semibold text-[#0F172A]">
                    <div>{row.name}</div>
                    <div className="text-xs font-normal text-[#64748B]">
                      {row.subtitle}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono font-semibold tabular-nums text-[#0284C7]">
                    {row.gdp}
                  </td>
                  <td className="py-4 px-6 font-mono font-semibold tabular-nums text-[#0F172A]">
                    {row.pop}
                  </td>
                  <td className="py-4 px-6 font-mono font-semibold tabular-nums">
                    <span
                      className={
                        row.status === 'increased'
                          ? 'text-[#059669]'
                          : row.status === 'decreased'
                          ? 'text-[#DC2626]'
                          : 'text-[#334155]'
                      }
                    >
                      {row.perCapita}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Four Side-by-Side Visual Summaries under the Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryRows.map((row) => (
          <div
            key={row.id}
            onClick={() => onSelectCase(row.id)}
            className="bg-white border border-[#E2E8F0] hover:border-[#94A3B8] rounded-xl p-4 flex flex-col justify-between transition-colors cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5 mb-3">
                <span className="text-sm font-semibold text-[#0F172A]">
                  {row.name}
                </span>
                <span className="text-xs font-mono text-[#64748B] tabular-nums">
                  {row.pizzasAfter} ÷ {row.peopleAfter}
                </span>
              </div>

              {/* Mini Visual Illustration */}
              <div className="space-y-2.5 my-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#475569]">
                    <PizzaUnitIcon variant="base" size={16} />
                    <span>Total Pizza</span>
                  </span>
                  <span className="font-mono font-semibold tabular-nums text-[#0284C7]">
                    {row.gdp}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#475569]">
                    <PersonUnitIcon variant="base" size={16} />
                    <span>People</span>
                  </span>
                  <span className="font-mono font-semibold tabular-nums text-[#0F172A]">
                    {row.pop}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#E2E8F0]">
              <div className="text-[11px] text-[#64748B]">Pizza per person:</div>
              <div
                className={`text-xs font-mono font-semibold tabular-nums mt-0.5 ${
                  row.status === 'increased'
                    ? 'text-[#059669]'
                    : row.status === 'decreased'
                    ? 'text-[#DC2626]'
                    : 'text-[#334155]'
                }`}
              >
                {row.status === 'increased' && '▲ '}
                {row.status === 'decreased' && '▼ '}
                {row.status === 'unchanged' && '● '}
                {row.perCapita}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discovery Prompt: "What pattern can you see?" */}
      {!relationshipRevealed ? (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 text-center space-y-4">
          <div className="text-xs font-semibold text-[#0284C7] tracking-wide">
            Discover the Formula
          </div>
          <h2 className="text-2xl font-semibold text-[#0F172A]">
            What pattern can you see?
          </h2>
          <p className="text-sm text-[#475569] max-w-xl mx-auto">
            Look at the three columns in the table above: GDP growth, Population
            growth, and Per-capita GDP growth. How are the numbers connected?
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setRelationshipRevealed(true)}
              className="px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Show relationship</span>
            </button>
          </div>
        </div>
      ) : (
        /* Revealed Formal Relationship & 3 Rules */
        <div className="space-y-8">
          {/* Main Formula Reveal Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="text-xs font-semibold text-[#0284C7] tracking-wide">
                The Core Economic Relationship
              </div>
              <p className="text-sm text-[#475569]">
                Think of GDP as the whole pizza and per-capita GDP as the pizza per person.
              </p>
            </div>

            {/* Stacked & Exact Formula Display */}
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-6 text-center space-y-4">
              <div className="font-mono text-lg sm:text-xl font-semibold text-[#0F172A] space-y-1">
                <div className="text-[#059669]">% change in per-capita GDP</div>
                <div className="text-[#64748B]">≈</div>
                <div className="text-[#0284C7]">% change in GDP</div>
                <div className="text-[#64748B]">−</div>
                <div className="text-[#0F172A]">% change in population</div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] text-xs sm:text-sm font-mono font-semibold text-[#334155]">
                % change in per-capita GDP ≈ % change in GDP − % change in population
              </div>
            </div>

            {/* Visual Shorthand & 4 Case Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-5 bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-5 space-y-2 text-center">
                <div className="text-xs font-semibold text-[#0369A1]">
                  In Short
                </div>
                <div className="font-mono text-base font-semibold text-[#0F172A] space-y-1">
                  <div>GDP growth</div>
                  <div className="text-[#0284C7]">−</div>
                  <div>Population growth</div>
                  <div className="text-[#0284C7]">≈</div>
                  <div className="text-[#0369A1]">Per-capita GDP growth</div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-semibold text-[#64748B] tracking-wide">
                  Examples from the Four Cases
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs text-[#64748B] font-medium">Case 1</span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#0F172A]">
                      10% − 10% ≈ 0%
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs text-[#64748B] font-medium">Case 2</span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#059669]">
                      10% − 5% ≈ +5%
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs text-[#64748B] font-medium">Case 3</span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#DC2626]">
                      10% − 15% ≈ -5%
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs text-[#64748B] font-medium">Case 4</span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#0F172A]">
                      5% − 5% ≈ 0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Simple Rules */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#0F172A]">
              Three Simple Rules to Remember
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-mono font-semibold text-[#059669]">
                  Rule 1 · ▲ Increases
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  1. GDP grows faster than population
                </p>
                <p className="text-sm text-[#059669] font-medium">
                  → per-capita GDP increases.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-mono font-semibold text-[#334155]">
                  Rule 2 · ● Unchanged
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  2. GDP and population grow at the same rate
                </p>
                <p className="text-sm text-[#334155] font-medium">
                  → per-capita GDP remains approximately unchanged.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-mono font-semibold text-[#DC2626]">
                  Rule 3 · ▼ Decreases
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  3. Population grows faster than GDP
                </p>
                <p className="text-sm text-[#DC2626] font-medium">
                  → per-capita GDP decreases.
                </p>
              </div>
            </div>
          </div>

          {/* Final Conceptual Synthesis */}
          <div className="bg-[#0F172A] text-white rounded-xl p-6 space-y-4">
            <div className="text-xs font-mono text-[#94A3B8] tracking-wider">
              Core Economic Intuition
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="text-sm sm:text-base leading-relaxed border-l-2 border-[#0284C7] pl-4">
                “Per-capita GDP is not just another GDP number. It tells us how
                much of the total GDP there is per person.”
              </blockquote>
              <blockquote className="text-sm sm:text-base leading-relaxed border-l-2 border-[#059669] pl-4">
                “When GDP increases, I need to consider whether the population
                also increased. More people may be sharing the larger GDP.”
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
