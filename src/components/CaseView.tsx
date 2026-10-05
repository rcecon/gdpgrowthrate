import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { UnitGridComparison, PizzaPerPersonVisual, PizzaUnitIcon, PersonUnitIcon } from './PizzaVisuals';

export type CaseId = 1 | 2 | 3 | 4;

interface CaseViewProps {
  caseId: CaseId;
  onNext: () => void;
  onPrev?: () => void;
}

export const CaseView: React.FC<CaseViewProps> = ({ caseId, onNext, onPrev }) => {
  // Stage state for Cases 1-3: 'before' -> 'after_question' -> 'completed'
  // For Case 4: starts directly at question ('after_question') -> 'completed'
  const [stage, setStage] = useState<'before' | 'after_question' | 'completed'>(
    caseId === 4 ? 'after_question' : 'before'
  );
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showExactCalc, setShowExactCalc] = useState<boolean>(false);
  const [visualStateToggle, setVisualStateToggle] = useState<'before' | 'after'>('before');

  // Reset internal state when switching cases
  useEffect(() => {
    if (caseId === 4) {
      setStage('after_question');
      setVisualStateToggle('after');
    } else {
      setStage('before');
      setVisualStateToggle('before');
    }
    setSelectedChoice(null);
    setShowExactCalc(false);
  }, [caseId]);

  const handleRevealSituation = () => {
    setStage('after_question');
    setVisualStateToggle('after');
  };

  const handleSelectChoice = (choiceId: string, isCorrect: boolean) => {
    setSelectedChoice(choiceId);
    if (isCorrect) {
      setStage('completed');
      setVisualStateToggle('after');
    }
  };

  // Case configurations matching the exact prompt instructions
  const caseConfigs = {
    1: {
      kicker: 'Case 1 of 4 · Equal Growth Rates',
      title: 'Case 1 — The pizza gets bigger, but there are also more people',
      afterPizzas: 110,
      afterPeople: 110,
      gdpChangeText: 'GDP increases by 10%',
      popChangeText: 'Population increases by 10%',
      question: 'How much pizza does each person get now?',
      choices: [
        { id: 'less', label: 'Less than 1 pizza per person', isCorrect: false, feedback: 'Look closely: both pizzas and people increased by 10 (from 100 to 110).' },
        { id: 'same', label: '1 pizza per person', isCorrect: true, feedback: 'Correct! 110 pizzas shared equally among 110 people is still 1 pizza per person.' },
        { id: 'more', label: 'More than 1 pizza per person', isCorrect: false, feedback: 'Although there are 10 extra pizzas, there are also 10 extra people sharing them.' },
      ],
      answerSummary: '1 pizza per person',
      gdpBadge: '+10%',
      popBadge: '+10%',
      perCapitaBadge: '0%',
      explanation:
        'The whole pizza becomes 10% larger, but there are also 10% more people sharing it. The extra pizza is exactly matched by the extra people, so each person still gets the same amount.',
      takeaway: 'More GDP does NOT necessarily mean more GDP per person.',
      status: 'unchanged' as const,
    },
    2: {
      kicker: 'Case 2 of 4 · Faster GDP Growth',
      title: 'Case 2 — The pizza gets bigger faster than the number of people',
      afterPizzas: 110,
      afterPeople: 105,
      gdpChangeText: 'GDP increases by 10%',
      popChangeText: 'Population increases by 5%',
      question:
        'The pizza became 10% bigger, but the number of people only increased by 5%. So does each person get more, less, or the same amount of pizza?',
      choices: [
        { id: 'more', label: 'More', isCorrect: true, feedback: 'Correct! There are 110 pizzas for 105 people, so each person gets more than 1 pizza.' },
        { id: 'same', label: 'The same amount', isCorrect: false, feedback: 'Compare the increases: +10 pizzas were added, and only +5 new people joined.' },
        { id: 'less', label: 'Less', isCorrect: false, feedback: 'The total pizza grew faster (+10%) than the number of people (+5%).' },
      ],
      answerSummary: 'More.',
      gdpBadge: '+10%',
      popBadge: '+5%',
      perCapitaBadge: 'approximately +5%',
      explanation:
        'Part of the 10% increase in GDP is used to provide for the additional 5% population. The remaining increase benefits GDP per person.',
      exactCalcTitle: '110 ÷ 105 ≈ 1.048',
      exactCalcText:
        'Per-capita GDP increases by approximately 4.8%, which can be treated as approximately 5% for the percentage-change relationship being taught.',
      takeaway: 'If GDP grows faster than population, per-capita GDP increases.',
      status: 'increased' as const,
    },
    3: {
      kicker: 'Case 3 of 4 · Faster Population Growth',
      title: 'Case 3 — More people, but the pizza does not grow fast enough',
      afterPizzas: 110,
      afterPeople: 115,
      gdpChangeText: 'GDP increases by 10%',
      popChangeText: 'Population increases by 15%',
      question:
        'The pizza became 10% bigger, but the number of people increased by 15%. What happens to the amount of pizza per person?',
      choices: [
        { id: 'increases', label: 'It increases', isCorrect: false, feedback: 'Notice that 15 extra people joined, while only 10 extra pizzas were added.' },
        { id: 'unchanged', label: 'It stays the same', isCorrect: false, feedback: '110 pizzas shared among 115 people is not enough for 1 whole pizza each.' },
        { id: 'decreases', label: 'It decreases', isCorrect: true, feedback: 'Correct! 110 pizzas shared among 115 people means each person gets less than 1 pizza.' },
      ],
      answerSummary: 'It decreases.',
      gdpBadge: '+10%',
      popBadge: '+15%',
      perCapitaBadge: 'approximately -5%',
      explanation:
        'This time, the number of people grows faster than the total pizza. The extra pizza is not enough to maintain the original amount per person, so each person gets a smaller share.',
      exactCalcTitle: '110 ÷ 115 ≈ 0.957',
      exactCalcText:
        'Per-capita GDP decreases by approximately 4.3%, which can be treated as approximately -5% for the percentage-change relationship being taught.',
      takeaway: 'If population grows faster than GDP, per-capita GDP decreases.',
      status: 'decreased' as const,
    },
    4: {
      kicker: 'Case 4 of 4 · Working Backwards',
      title: 'Case 4 — Can we work backwards?',
      afterPizzas: 105,
      afterPeople: 105,
      gdpChangeText: 'GDP increases by 5%',
      popChangeText: 'Per-capita GDP remains unchanged',
      question:
        'If the whole pizza becomes 5% bigger, but the amount of pizza per person stays exactly the same, what must have happened to the number of people sharing the pizza?',
      choices: [
        { id: 'A', label: 'A. Population increased by 10%', isCorrect: false, feedback: 'If population increased by 10% while pizza only increased by 5%, each person would get less pizza.' },
        { id: 'B', label: 'B. Population increased by 5%', isCorrect: true, feedback: 'Correct! B. Population increased by 5%.' },
        { id: 'C', label: 'C. Population decreased by 5%', isCorrect: false, feedback: 'If population decreased while pizza increased, each person would get more pizza.' },
      ],
      answerSummary: 'B. Population increased by 5%',
      gdpBadge: '+5%',
      popBadge: '+5%',
      perCapitaBadge: '0%',
      explanation:
        'The total pizza increased by 5%, but each person still gets exactly the same amount. Therefore, the number of people must also have increased by 5%.',
      takeaway: 'Population growth ≈ GDP growth − Per-capita GDP growth',
      status: 'unchanged' as const,
    },
  };

  const currentConfig = caseConfigs[caseId];

  // Determine what numbers to show on the visual grid right now
  const displayedPizzas =
    visualStateToggle === 'before' ? 100 : currentConfig.afterPizzas;
  const displayedPeople =
    visualStateToggle === 'before' ? 100 : currentConfig.afterPeople;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="border-b border-[#E2E8F0] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-[#64748B] mb-1.5">
            {currentConfig.kicker}
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] tracking-tight">
            {currentConfig.title}
          </h1>
        </div>

        {/* Before / After State Switcher (for Cases 1-3 once revealed, or Case 4 once completed) */}
        {(stage !== 'before' && (caseId !== 4 || stage === 'completed')) && (
          <div className="flex items-center gap-1 p-1 bg-[#E2E8F0]/70 rounded-lg self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setVisualStateToggle('before')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                visualStateToggle === 'before'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Before (100 units)
            </button>
            <button
              type="button"
              onClick={() => setVisualStateToggle('after')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                visualStateToggle === 'after'
                  ? 'bg-white text-[#0284C7] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              After ({currentConfig.afterPizzas} pizzas / {currentConfig.afterPeople} people)
            </button>
          </div>
        )}
      </div>

      {/* CASE 1-3: Initial "Before" Metrics Bar & Situation Reveal */}
      {caseId !== 4 && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Before State Summary */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-[#64748B] tracking-wide">
                Starting Point (Before)
              </div>
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <div className="text-xs text-[#64748B]">GDP</div>
                  <div className="text-lg font-mono font-semibold tabular-nums text-[#0F172A]">
                    100
                  </div>
                  <div className="text-xs text-[#64748B]">100 pizzas</div>
                </div>
                <div>
                  <div className="text-xs text-[#64748B]">Population</div>
                  <div className="text-lg font-mono font-semibold tabular-nums text-[#0F172A]">
                    100
                  </div>
                  <div className="text-xs text-[#64748B]">100 people</div>
                </div>
                <div>
                  <div className="text-xs text-[#64748B]">GDP per capita</div>
                  <div className="text-lg font-mono font-semibold tabular-nums text-[#0F172A]">
                    1
                  </div>
                  <div className="text-xs text-[#64748B]">pizza / person</div>
                </div>
              </div>
            </div>

            {/* Arrow Divider */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7]">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Situation / Action to Reveal After */}
            <div className="lg:col-span-5">
              {stage === 'before' ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-4">
                  <div>
                    <div className="text-xs font-semibold text-[#0369A1]">
                      Step 1: Observe the Before State
                    </div>
                    <p className="text-sm text-[#0F172A] mt-0.5">
                      100 people share 100 pizzas equally (1 pizza per person).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRevealSituation}
                    className="px-4 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>See What Changes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
                  <div className="text-xs font-semibold text-[#0284C7] tracking-wide mb-1.5">
                    New Situation (After)
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#0F172A]">
                    <span className="flex items-center gap-2">
                      <PizzaUnitIcon variant="added" size={16} />
                      <span>{currentConfig.gdpChangeText}</span>
                      <span className="font-mono text-xs text-[#475569] tabular-nums">
                        (110 pizzas)
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <PersonUnitIcon
                        variant={caseId === 3 ? 'deficit' : 'added'}
                        size={16}
                      />
                      <span>{currentConfig.popChangeText}</span>
                      <span className="font-mono text-xs text-[#475569] tabular-nums">
                        ({currentConfig.afterPeople} people)
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CASE 4 SPECIAL HEADER: Given Clue */}
      {caseId === 4 && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
          <div className="text-xs font-semibold text-[#0284C7] tracking-wide mb-3">
            Given Clues
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-between">
              <div>
                <div className="text-xs text-[#0369A1] font-medium">Total Pizza (GDP)</div>
                <div className="text-lg font-semibold text-[#0F172A] mt-0.5">
                  GDP increases by 5%
                </div>
              </div>
              <span className="text-xl font-mono font-semibold tabular-nums text-[#0284C7]">
                +5%
              </span>
            </div>
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
              <div>
                <div className="text-xs text-[#475569] font-medium">
                  Pizza Per Person (Per-capita GDP)
                </div>
                <div className="text-lg font-semibold text-[#0F172A] mt-0.5">
                  Per-capita GDP remains unchanged
                </div>
              </div>
              <span className="text-xl font-mono font-semibold tabular-nums text-[#334155]">
                0%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VISUAL STAGE: 100-Unit Grids (Shown immediately for Cases 1-3, and for Case 4 after answering or with mystery people) */}
      <div className="space-y-4">
        <UnitGridComparison
          pizzasCount={caseId === 4 && stage !== 'completed' ? 105 : displayedPizzas}
          peopleCount={displayedPeople}
          baseCount={100}
          highlightSurplusOrDeficit={stage !== 'before'}
          isMysteryPeople={caseId === 4 && stage !== 'completed'}
        />

        {/* Per-Capita Pizza Visual Summary Bar */}
        <PizzaPerPersonVisual
          status={
            stage === 'before'
              ? 'unchanged'
              : stage === 'after_question' && caseId !== 4
              ? 'hidden'
              : currentConfig.status
          }
          label={
            stage === 'before'
              ? 'GDP per capita = 1 pizza per person'
              : stage === 'after_question' && caseId !== 4
              ? 'How much pizza does each person get now?'
              : caseId === 1 || caseId === 4
              ? '1 pizza per person (Unchanged)'
              : caseId === 2
              ? 'More than 1 pizza per person'
              : 'Less than 1 pizza per person'
          }
          sublabel={
            stage === 'before'
              ? '100 pizzas ÷ 100 people = 1 pizza per person'
              : stage === 'completed'
              ? `${currentConfig.afterPizzas} pizzas shared among ${currentConfig.afterPeople} people`
              : undefined
          }
        />
      </div>

      {/* INTERACTIVE QUESTION PANEL (Shown when in 'after_question' or 'completed') */}
      {stage !== 'before' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-5">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#0284C7] tracking-wide">
                Think About It
              </div>
              <h2 className="text-lg font-semibold text-[#0F172A] leading-snug">
                {currentConfig.question}
              </h2>
            </div>
          </div>

          {/* Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentConfig.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id;
              const isAnsweredCorrectly = stage === 'completed' && choice.isCorrect;
              const isWrongSelection = isSelected && !choice.isCorrect;

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelectChoice(choice.id, choice.isCorrect)}
                  className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isAnsweredCorrectly
                      ? 'bg-[#ECFDF5] border-[#059669] text-[#065F46] font-semibold'
                      : isWrongSelection
                      ? 'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B]'
                      : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] font-medium'
                  }`}
                >
                  <span className="text-sm">{choice.label}</span>
                  {isAnsweredCorrectly && (
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback for wrong choice */}
          {selectedChoice &&
            stage !== 'completed' &&
            currentConfig.choices.find((c) => c.id === selectedChoice) && (
              <div className="p-3.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
                <span className="font-semibold">Hint: </span>
                {currentConfig.choices.find((c) => c.id === selectedChoice)?.feedback}
              </div>
            )}
        </div>
      )}

      {/* COMPLETED EXPLANATION & TAKEAWAY */}
      {stage === 'completed' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-6">
          {/* Answer Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
              <span className="text-sm font-semibold text-[#065F46]">
                Answer: {currentConfig.answerSummary}
              </span>
            </div>
            <span className="text-xs font-mono text-[#64748B] tabular-nums">
              Before: 100 pizzas / 100 people → After: {currentConfig.afterPizzas} pizzas /{' '}
              {currentConfig.afterPeople} people
            </span>
          </div>

          {/* Case 4 Before -> After Comparison Box as specified in prompt */}
          {caseId === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
              <div>
                <div className="text-xs font-semibold text-[#64748B] mb-1">Before</div>
                <div className="text-sm text-[#0F172A] font-mono tabular-nums space-y-0.5">
                  <div>100 people</div>
                  <div>100 pizzas</div>
                  <div className="font-semibold text-[#0284C7]">1 pizza per person</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0284C7] mb-1">After (+5%)</div>
                <div className="text-sm text-[#0F172A] font-mono tabular-nums space-y-0.5">
                  <div>105 people</div>
                  <div>105 pizzas</div>
                  <div className="font-semibold text-[#0284C7]">1 pizza per person</div>
                </div>
              </div>
            </div>
          )}

          {/* Conceptual Explanation */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#64748B] tracking-wide">
              Why Does This Happen?
            </div>
            <p className="text-base text-[#0F172A] leading-relaxed max-w-3xl">
              “{currentConfig.explanation}”
            </p>
          </div>

          {/* Explicit Percentage Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs text-[#64748B]">GDP (Total Pizza)</div>
              <div className="text-xl font-mono font-semibold tabular-nums text-[#0284C7] mt-1">
                GDP: {currentConfig.gdpBadge}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs text-[#64748B]">Population (People)</div>
              <div className="text-xl font-mono font-semibold tabular-nums text-[#0F172A] mt-1">
                Population: {currentConfig.popBadge}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs text-[#64748B]">Per-capita GDP (Pizza / Person)</div>
              <div
                className={`text-xl font-mono font-semibold tabular-nums mt-1 ${
                  currentConfig.status === 'increased'
                    ? 'text-[#059669]'
                    : currentConfig.status === 'decreased'
                    ? 'text-[#DC2626]'
                    : 'text-[#334155]'
                }`}
              >
                Per-capita GDP: {currentConfig.perCapitaBadge}
              </div>
            </div>
          </div>

          {/* Case-Specific Visual Emphasis Block */}
          {caseId === 1 && (
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] flex flex-wrap items-center justify-center gap-4 text-sm font-mono font-semibold text-[#0F172A]">
              <span>GDP ↑ 10%</span>
              <span className="text-[#94A3B8]">·</span>
              <span>Population ↑ 10%</span>
              <span className="text-[#0284C7]">→</span>
              <span>Per-capita GDP unchanged (0%)</span>
            </div>
          )}

          {caseId === 2 && (
            <div className="p-4 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] space-y-2">
              <div className="text-xs font-semibold text-[#0369A1]">
                Emerging Pattern to Notice
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-mono font-semibold text-[#0F172A]">
                <span>GDP growth (+10%)</span>
                <span>−</span>
                <span>Population growth (+5%)</span>
                <span>≈</span>
                <span className="text-[#059669]">Per-capita GDP growth (+5%)</span>
              </div>
            </div>
          )}

          {caseId === 4 && (
            <div className="p-5 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] space-y-3">
              <div className="text-xs font-semibold text-[#0369A1]">
                Working Backwards with the Relationship
              </div>
              <div className="text-lg font-mono font-semibold tabular-nums text-[#0F172A]">
                0% ≈ 5% − 5%
              </div>
              <div className="text-sm font-mono font-semibold text-[#0369A1] pt-1 border-t border-[#BAE6FD]/60">
                Therefore: Population growth ≈ GDP growth − Per-capita GDP growth
              </div>
            </div>
          )}

          {/* Optional Exact Calculation Accordion for Cases 2 & 3 */}
          {(caseId === 2 || caseId === 3) && (
            <div className="border-t border-[#E2E8F0] pt-4">
              <button
                type="button"
                onClick={() => setShowExactCalc(!showExactCalc)}
                className="flex items-center gap-2 text-xs font-semibold text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                {showExactCalc ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>
                  {showExactCalc
                    ? 'Hide optional exact calculation'
                    : 'Show optional exact calculation (Why is it "approximately" 5%?)'}
                </span>
              </button>
              {showExactCalc && (
                <div className="mt-3 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                  <div className="font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                    {currentConfig.exactCalcTitle}
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {currentConfig.exactCalcText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Takeaway Callout */}
          <div className="p-4 rounded-lg bg-[#0F172A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-[#94A3B8] tracking-wider">
                Key Takeaway
              </div>
              <div className="text-base font-semibold mt-0.5">
                “{currentConfig.takeaway}”
              </div>
            </div>
            <button
              type="button"
              onClick={onNext}
              className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <span>{caseId === 4 ? 'Go to Summary' : `Next: Case ${caseId + 1}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
        <div>
          {onPrev ? (
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 text-xs font-semibold text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] rounded-lg bg-white hover:bg-[#F8FAFC] transition-colors cursor-pointer whitespace-nowrap"
            >
              ← Previous Case
            </button>
          ) : (
            <span className="text-xs text-[#64748B]">
              Step through all 4 cases to discover the pattern
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {stage !== 'before' && caseId !== 4 && (
            <button
              type="button"
              onClick={() => {
                setStage('before');
                setVisualStateToggle('before');
                setSelectedChoice(null);
              }}
              className="px-3 py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Case</span>
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>{caseId === 4 ? 'Next: Summary' : `Next: Case ${caseId + 1}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
