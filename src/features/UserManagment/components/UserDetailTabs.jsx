import { useState } from 'react';
import { cn } from '@/lib/utils';
import OverviewTab from './OverviewTab';
import VerficationTab from './VerficationTab';

const tabs = {
  overview: {
    barStyle: 'bottom-0 left-0 w-15',
    rank: 1,
    Component: OverviewTab,
  },
  verfication: {
    label: 'Verfication and Documents',
    barStyle: 'bottom-0 left-23 w-44',
    rank: 2,
    Component: VerficationTab,
  },
  properties: {
    barStyle: 'bottom-0 left-74.5 w-17.5',
    rank: 3,
  },
  reports: {
    barStyle: 'bottom-0 left-99.5 w-13.5',
    rank: 4,
  },
};

function UserDetailTabs() {
  const [activeTab, setActiveTab] = useState({
    current: 'overview',
    previous: 'overview',
  });

  const { Component, rank } = tabs[activeTab.current];
  const previousRank = tabs[activeTab.previous]?.rank || 0;

  const animationClass = rank > previousRank ? 'slide-in-from-right' : 'slide-in-from-left';

  return (
    <div className="col-span-12 space-y-4 lg:col-span-8 xl:col-span-9">
      <div className="border-primary/10 border-b">
        <div className="scrollbar-hide relative flex gap-8 overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <button
              onClick={() =>
                setActiveTab((act) => ({
                  current: key,
                  previous: act.current,
                }))
              }
              key={key}
              className={cn(
                'text-primary/80 hover:text-primary border-b-2 border-transparent pb-4 text-sm font-medium whitespace-nowrap transition-all',
                key === activeTab.current && 'text-primary',
              )}
            >
              {value['label'] || key.charAt(0).toUpperCase().concat(key.slice(1))}
            </button>
          ))}

          <div
            className={cn(
              'bg-primary absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out',
              tabs[activeTab.current].barStyle,
            )}
          />
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            'border-border/30 absolute top-0 w-full rounded-2xl border px-4 py-4',
            animationClass,
          )}
        >
          {Component && <Component />}
        </div>
      </div>
    </div>
  );
}

export default UserDetailTabs;
