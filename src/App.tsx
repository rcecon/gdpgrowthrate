/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CaseView, CaseId } from './components/CaseView';
import { SummaryView } from './components/SummaryView';
import { PizzaUnitIcon, PersonUnitIcon } from './components/PizzaVisuals';

type PageId = 'case1' | 'case2' | 'case3' | 'case4' | 'summary';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('case1');

  const navItems: { id: PageId; label: string }[] = [
    { id: 'case1', label: 'Case 1' },
    { id: 'case2', label: 'Case 2' },
    { id: 'case3', label: 'Case 3' },
    { id: 'case4', label: 'Case 4' },
    { id: 'summary', label: 'Summary' },
  ];

  const handleNextPage = () => {
    const order: PageId[] = ['case1', 'case2', 'case3', 'case4', 'summary'];
    const currentIndex = order.indexOf(activePage);
    if (currentIndex < order.length - 1) {
      setActivePage(order[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('case1');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    const order: PageId[] = ['case1', 'case2', 'case3', 'case4', 'summary'];
    const currentIndex = order.indexOf(activePage);
    if (currentIndex > 0) {
      setActivePage(order[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Bar Contract: 3 Zones (Brand title, 5 nav links, 1 primary action) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0] px-6 py-3.5">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('case1');
            }}
            className="text-lg font-display font-semibold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
          >
            HKDSE Econ: GDP &amp; Population
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Lesson sections"
            className="flex items-center gap-4 sm:gap-7 text-sm font-medium text-[#475569] overflow-x-auto"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActivePage(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#0284C7] text-[#0F172A] font-semibold'
                      : 'border-transparent hover:text-[#0F172A] hover:border-[#CBD5E1]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center shrink-0">
            <button
              type="button"
              onClick={handleNextPage}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {activePage === 'summary' ? 'Start Over' : 'Next Section →'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1160px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Recurring Visual Analogy Legend Bar */}
        <section
          aria-label="Core Pizza Analogy"
          className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3"
        >
          <div className="text-xs font-semibold text-[#64748B]">
            The Pizza Analogy
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            <span className="flex items-center gap-2">
              <PizzaUnitIcon variant="base" size={16} />
              <span className="font-semibold text-[#0F172A]">Total Pizza</span>
              <span className="text-[#64748B]">=</span>
              <span className="font-mono font-semibold text-[#0284C7]">GDP</span>
            </span>

            <span className="text-[#CBD5E1] hidden sm:inline" aria-hidden="true">
              ·
            </span>

            <span className="flex items-center gap-2">
              <PersonUnitIcon variant="base" size={16} />
              <span className="font-semibold text-[#0F172A]">
                People Sharing the Pizza
              </span>
              <span className="text-[#64748B]">=</span>
              <span className="font-mono font-semibold text-[#0F172A]">
                Population
              </span>
            </span>

            <span className="text-[#CBD5E1] hidden sm:inline" aria-hidden="true">
              ·
            </span>

            <span className="flex items-center gap-2">
              <span className="font-semibold text-[#0F172A]">
                Pizza per Person
              </span>
              <span className="text-[#64748B]">=</span>
              <span className="font-mono font-semibold text-[#059669]">
                Per-capita GDP
              </span>
            </span>
          </div>
        </section>

        {/* Active Section Content */}
        {activePage === 'case1' && (
          <CaseView caseId={1} onNext={handleNextPage} />
        )}
        {activePage === 'case2' && (
          <CaseView
            caseId={2}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
        {activePage === 'case3' && (
          <CaseView
            caseId={3}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
        {activePage === 'case4' && (
          <CaseView
            caseId={4}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
        {activePage === 'summary' && (
          <SummaryView
            onSelectCase={(caseId: CaseId) => {
              const map: Record<CaseId, PageId> = {
                1: 'case1',
                2: 'case2',
                3: 'case3',
                4: 'case4',
              };
              setActivePage(map[caseId]);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestart={() => {
              setActivePage('case1');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-4 px-6 mt-12">
        <div className="max-w-[1160px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Hong Kong Form 4 Economics · Interactive Concept Module</span>
          <span>Topic: Total GDP · Population · Per-Capita GDP</span>
        </div>
      </footer>
    </div>
  );
}
