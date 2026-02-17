import { useState } from 'react';
import OverviewTab from './OverviewTab';
import VerficationTab from './VerficationTab';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import PropertiesTab from './PropertiesTab';
import ReportsTab from './ReportsTab';

const tabs = {
  overview: {
    barStyle: 'bottom-0 left-2 w-15',
    rank: 1,
  },
  verfication: {
    label: 'Verfication and Documents',
    barStyle: 'bottom-0 left-29.5 w-41',
    rank: 2,
  },
  properties: {
    barStyle: 'bottom-0 left-82 w-17.5',
    rank: 3,
  },
  reports: {
    barStyle: 'bottom-0 left-111.5 w-13.5',
    rank: 4,
  },
};
const triggerStyle =
  'text-primary/80 shadow-none border-0 pb-4 hover:text-primary w-fit flex-none border-b-none text-sm font-medium whitespace-nowrap transition-all data-[state=active]:text-primary data-[state=active]:border-none group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none';

function UserDetailTabs() {
  const [activeTab, setActiveTab] = useState({
    current: 'overview',
    previous: 'overview',
  });

  // Tabs - Start
  const { Component, rank } = tabs[activeTab.current];
  const previousRank = tabs[activeTab.previous]?.rank || 0;
  const animationClass = rank > previousRank ? 'slide-in-from-right' : 'slide-in-from-left';
  // Tabs - End

  return (
    <div className="col-span-12 space-y-4 lg:col-span-8 xl:col-span-9">
      <Tabs
        defaultValue="overview"
        className="relative"
        onValueChange={(value) =>
          setActiveTab((prev) => ({
            current: value,
            previous: prev.current,
          }))
        }
      >
        <TabsList className="border-primary/10 relative mb-4 w-full justify-start gap-8 rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="overview" className={triggerStyle}>
            Overview
          </TabsTrigger>

          <TabsTrigger value="verfication" className={triggerStyle}>
            Verfication & Documents
          </TabsTrigger>

          <TabsTrigger value="properties" className={triggerStyle}>
            Properties
          </TabsTrigger>

          <TabsTrigger value="reports" className={triggerStyle}>
            Reports
          </TabsTrigger>
          <div
            className={cn(
              'bg-primary absolute bottom-0 left-0 h-0.5 w-3 transition-all duration-300',
              tabs[activeTab.current].barStyle,
            )}
          />
        </TabsList>

        <TabsContent value="overview">
          <div className={cn('absolute w-full', animationClass)}>
            <OverviewTab />
          </div>
        </TabsContent>

        <TabsContent value="verfication">
          <div className={cn('absolute w-full', animationClass)}>
            <VerficationTab />
          </div>
        </TabsContent>

        <TabsContent value="properties">
          <div className={cn('absolute w-full', animationClass)}>
            <PropertiesTab />
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className={cn('absolute w-full', animationClass)}>
            <ReportsTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserDetailTabs;
