import { useState } from 'react';
import OverviewTab from './OverviewTab';
import VerficationTab from './VerficationTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertiesTab from './PropertiesTab';
import ReportsTab from './ReportsTab';

const triggerStyle =
  'text-primary/80 shadow-none border-0 pb-4 hover:text-primary w-fit flex-none border-b-none text-sm font-medium whitespace-nowrap transition-all data-[state=active]:text-primary data-[state=active]:border-none group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none';

function UserDetailTabs({ user, t }) {
  const isOwner = user?.role === 'owner';
  const isRenter = user?.role === 'renter';

  const tabConfig = isRenter
    ? [{ value: 'overview', label: t('adminUserDetail.tabs.overview') }]
    : isOwner
      ? [
          { value: 'overview', label: t('adminUserDetail.tabs.overview') },
          { value: 'reports', label: t('adminUserDetail.tabs.reports') },
          { value: 'verfication', label: t('adminUserDetail.tabs.verificationDocuments') },
          { value: 'properties', label: t('adminUserDetail.tabs.properties') },
        ]
      : [{ value: 'overview', label: t('adminUserDetail.tabs.overview') }];

  const [activeTab, setActiveTab] = useState(tabConfig[0].value);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="relative">
      <TabsList className="border-primary/10 relative mb-4 w-full justify-start gap-8 rounded-none border-b bg-transparent p-0">
        {tabConfig.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className={triggerStyle}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab user={user} />
      </TabsContent>

      {isOwner && (
        <>
          <TabsContent value="reports">
            <ReportsTab user={user} />
          </TabsContent>
          <TabsContent value="verfication">
            <VerficationTab user={user} />
          </TabsContent>
          <TabsContent value="properties">
            <PropertiesTab user={user} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}

export default UserDetailTabs;
