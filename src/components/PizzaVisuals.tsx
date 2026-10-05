import React from 'react';

export const PizzaUnitIcon: React.FC<{
  variant?: 'base' | 'added' | 'surplus' | 'muted';
  size?: number;
  className?: string;
}> = ({ variant = 'base', size = 18, className = '' }) => {
  const colors = {
    base: {
      crust: '#D97706',
      cheese: '#FDE68A',
      sliceLine: '#B45309',
      dot: '#DC2626',
    },
    added: {
      crust: '#0284C7',
      cheese: '#BAE6FD',
      sliceLine: '#0369A1',
      dot: '#0284C7',
    },
    surplus: {
      crust: '#059669',
      cheese: '#A7F3D0',
      sliceLine: '#047857',
      dot: '#059669',
    },
    muted: {
      crust: '#94A3B8',
      cheese: '#E2E8F0',
      sliceLine: '#CBD5E1',
      dot: '#94A3B8',
    },
  }[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill={colors.cheese} stroke={colors.crust} strokeWidth="2.2" />
      <line x1="12" y1="2" x2="12" y2="22" stroke={colors.sliceLine} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={colors.sliceLine} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke={colors.sliceLine} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" stroke={colors.sliceLine} strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="8.5" cy="8.5" r="1.3" fill={colors.dot} />
      <circle cx="15.5" cy="8.5" r="1.3" fill={colors.dot} />
      <circle cx="8.5" cy="15.5" r="1.3" fill={colors.dot} />
      <circle cx="15.5" cy="15.5" r="1.3" fill={colors.dot} />
    </svg>
  );
};

export const PersonUnitIcon: React.FC<{
  variant?: 'base' | 'added' | 'deficit' | 'muted';
  size?: number;
  className?: string;
}> = ({ variant = 'base', size = 18, className = '' }) => {
  const colors = {
    base: {
      fill: '#334155',
      stroke: '#1E293B',
    },
    added: {
      fill: '#0284C7',
      stroke: '#0369A1',
    },
    deficit: {
      fill: '#DC2626',
      stroke: '#991B1B',
    },
    muted: {
      fill: '#94A3B8',
      stroke: '#64748B',
    },
  }[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="7.5" r="4.2" fill={colors.fill} />
      <path
        d="M4.5 20.2C4.5 16.2 7.8 13.5 12 13.5C16.2 13.5 19.5 16.2 19.5 20.2"
        stroke={colors.fill}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

interface UnitGridComparisonProps {
  pizzasCount: number;
  peopleCount: number;
  baseCount?: number;
  highlightSurplusOrDeficit?: boolean;
  isMysteryPeople?: boolean;
}

export const UnitGridComparison: React.FC<UnitGridComparisonProps> = ({
  pizzasCount,
  peopleCount,
  baseCount = 100,
  highlightSurplusOrDeficit = false,
  isMysteryPeople = false,
}) => {
  const addedPizzas = Math.max(0, pizzasCount - baseCount);
  const addedPeople = Math.max(0, peopleCount - baseCount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT: TOTAL PIZZA (GDP) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between border-b border-[#E2E8F0] pb-3 mb-4">
            <div>
              <p className="text-xs font-semibold text-[#64748B] tracking-wide">
                Total Pizza = Total GDP
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-mono font-semibold tabular-nums text-[#0F172A]">
                  {pizzasCount}
                </span>
                <span className="text-sm text-[#475569]">pizzas</span>
              </div>
            </div>
            {addedPizzas > 0 ? (
              <span className="text-sm font-mono font-semibold tabular-nums text-[#0284C7]">
                +{addedPizzas} pizzas (+{addedPizzas}%)
              </span>
            ) : (
              <span className="text-xs font-mono text-[#64748B] tabular-nums">
                Base 100 units
              </span>
            )}
          </div>

          {/* Original 100 Pizzas (Numbers Only) */}
          <div className="mb-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]/80 flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Original pizzas</span>
            <span className="text-sm font-mono font-semibold tabular-nums text-[#0F172A]">
              {baseCount} pizzas
            </span>
          </div>

          {/* Added Pizzas Row (Numbers Only) */}
          <div className="flex flex-col justify-center">
            {addedPizzas > 0 ? (
              <div className="p-3 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] space-y-1.5">
                <div className="text-xs font-medium text-[#0369A1] flex items-center justify-between">
                  <span>Extra pizzas added (+{addedPizzas}%)</span>
                  <span className="font-mono font-semibold tabular-nums">
                    +{addedPizzas} pizzas
                  </span>
                </div>
                {highlightSurplusOrDeficit && pizzasCount > peopleCount && (
                  <div className="text-xs font-medium text-[#047857] pt-1.5 border-t border-[#BAE6FD]/60 flex items-center justify-between">
                    <span>Unmatched extra pizza</span>
                    <span className="font-mono font-semibold tabular-nums">
                      +{pizzasCount - peopleCount} pizzas
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-dashed border-[#CBD5E1] text-center text-xs text-[#64748B]">
                No extra pizzas added yet (Before state)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: PEOPLE SHARING (POPULATION) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between border-b border-[#E2E8F0] pb-3 mb-4">
            <div>
              <p className="text-xs font-semibold text-[#64748B] tracking-wide">
                People Sharing = Population
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-mono font-semibold tabular-nums text-[#0F172A]">
                  {isMysteryPeople ? '?' : peopleCount}
                </span>
                <span className="text-sm text-[#475569]">people</span>
              </div>
            </div>
            {isMysteryPeople ? (
              <span className="text-sm font-mono font-semibold text-[#D97706]">
                What happened to population?
              </span>
            ) : addedPeople > 0 ? (
              <span
                className={`text-sm font-mono font-semibold tabular-nums ${
                  highlightSurplusOrDeficit && peopleCount > pizzasCount
                    ? 'text-[#DC2626]'
                    : 'text-[#0284C7]'
                }`}
              >
                +{addedPeople} people (+{addedPeople}%)
              </span>
            ) : (
              <span className="text-xs font-mono text-[#64748B] tabular-nums">
                Base 100 people
              </span>
            )}
          </div>

          {/* Original 100 People (Numbers Only) */}
          <div className="mb-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]/80 flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Original people</span>
            <span className="text-sm font-mono font-semibold tabular-nums text-[#0F172A]">
              {baseCount} people
            </span>
          </div>

          {/* Added People Row (Numbers Only) */}
          <div className="flex flex-col justify-center">
            {isMysteryPeople ? (
              <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-center">
                <p className="text-xs font-medium text-[#B45309]">
                  Answer the question below to reveal how many extra people joined!
                </p>
              </div>
            ) : addedPeople > 0 ? (
              <div
                className={`p-3 rounded-lg border space-y-1.5 ${
                  highlightSurplusOrDeficit && peopleCount > pizzasCount
                    ? 'bg-[#FEF2F2] border-[#FECACA]'
                    : 'bg-[#F0F9FF] border-[#BAE6FD]'
                }`}
              >
                <div
                  className={`text-xs font-medium flex items-center justify-between ${
                    highlightSurplusOrDeficit && peopleCount > pizzasCount
                      ? 'text-[#B91C1C]'
                      : 'text-[#0369A1]'
                  }`}
                >
                  <span>Additional people sharing (+{addedPeople}%)</span>
                  <span className="font-mono font-semibold tabular-nums">
                    +{addedPeople} people
                  </span>
                </div>
                {highlightSurplusOrDeficit && peopleCount > pizzasCount && (
                  <div className="text-xs font-medium text-[#B91C1C] pt-1.5 border-t border-[#FECACA]/60 flex items-center justify-between">
                    <span>Extra people beyond pizza growth</span>
                    <span className="font-mono font-semibold tabular-nums">
                      +{peopleCount - pizzasCount} people
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-dashed border-[#CBD5E1] text-center text-xs text-[#64748B]">
                No additional people added yet (Before state)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Visualizes the Per-Capita GDP (Pizza per person) for a single representative person
 */
export const PizzaPerPersonVisual: React.FC<{
  status: 'unchanged' | 'increased' | 'decreased' | 'hidden';
  label: string;
  sublabel?: string;
}> = ({ status, label, sublabel }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        {/* Representative Person + Pizza Share Illustration */}
        <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3">
          <div className="flex flex-col items-center">
            <PersonUnitIcon variant="base" size={38} />
            <span className="text-[11px] font-medium text-[#64748B] mt-1">1 Person</span>
          </div>

          <span className="text-lg font-mono text-[#94A3B8] font-semibold">→</span>

          {status === 'hidden' ? (
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#94A3B8] flex items-center justify-center bg-white">
              <span className="text-xl font-mono font-semibold text-[#64748B]">?</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Main Pizza */}
              <div className="relative flex flex-col items-center">
                {status === 'decreased' ? (
                  /* Pizza with a missing wedge */
                  <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                    {/* Full dashed outline showing what 1 whole pizza was */}
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="#FEF2F2"
                      stroke="#DC2626"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    {/* Remaining ~95% pizza arc */}
                    <path
                      d="M32 32 L32 6 A26 26 0 1 0 52 15.5 Z"
                      fill="#FDE68A"
                      stroke="#D97706"
                      strokeWidth="3"
                    />
                    <circle cx="24" cy="24" r="3" fill="#DC2626" />
                    <circle cx="22" cy="40" r="3" fill="#DC2626" />
                    <circle cx="38" cy="42" r="3" fill="#DC2626" />
                    <circle cx="44" cy="28" r="3" fill="#DC2626" />
                  </svg>
                ) : (
                  <PizzaUnitIcon variant="base" size={50} />
                )}
                <span className="text-[11px] font-mono text-[#64748B] mt-1">
                  {status === 'decreased' ? 'Smaller share' : '1 full pizza'}
                </span>
              </div>

              {/* Extra slice for 'increased' */}
              {status === 'increased' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-mono font-semibold text-[#059669]">+</span>
                  <div className="flex flex-col items-center">
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                      <path
                        d="M24 24 L24 4 A20 20 0 0 1 41.3 14 Z"
                        fill="#A7F3D0"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <span className="text-[11px] font-mono font-semibold text-[#059669]">
                      Extra slice
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-[#64748B] tracking-wide">
            Pizza Per Person = Per-Capita GDP
          </p>
          <p className="text-lg font-semibold text-[#0F172A] mt-0.5">{label}</p>
          {sublabel && <p className="text-sm text-[#475569] mt-0.5">{sublabel}</p>}
        </div>
      </div>

      {/* Status Indicator with explicit icon + text (Never color-only) */}
      <div className="shrink-0">
        {status === 'unchanged' && (
          <div className="text-right">
            <span className="text-xs text-[#64748B] block">Change in Per-Capita GDP</span>
            <span className="text-base font-mono font-semibold tabular-nums text-[#334155]">
              ● 0% (Unchanged)
            </span>
          </div>
        )}
        {status === 'increased' && (
          <div className="text-right">
            <span className="text-xs text-[#64748B] block">Change in Per-Capita GDP</span>
            <span className="text-base font-mono font-semibold tabular-nums text-[#059669]">
              ▲ Approximately +5% (Increases)
            </span>
          </div>
        )}
        {status === 'decreased' && (
          <div className="text-right">
            <span className="text-xs text-[#64748B] block">Change in Per-Capita GDP</span>
            <span className="text-base font-mono font-semibold tabular-nums text-[#DC2626]">
              ▼ Approximately -5% (Decreases)
            </span>
          </div>
        )}
        {status === 'hidden' && (
          <div className="text-right">
            <span className="text-xs text-[#64748B] block">Change in Per-Capita GDP</span>
            <span className="text-base font-mono font-semibold text-[#D97706]">
              ? Answer question below
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
