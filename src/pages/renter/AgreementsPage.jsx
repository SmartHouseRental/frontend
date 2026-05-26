import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgreementList from '@/features/renter/components/AgreementList';
import RenterPaymentsList from '@/features/renter/components/RenterPaymentsList';

export default function AgreementsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') === 'payments' ? 'payments' : 'agreements';

  const setTab = (value) => {
    if (value === 'payments') {
      setSearchParams({ tab: 'payments' });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('renter.agreements.title')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('renter.agreements.subtitle')}
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="agreements">{t('renter.agreements.tabs.agreements')}</TabsTrigger>
          <TabsTrigger value="payments">{t('renter.agreements.tabs.payments')}</TabsTrigger>
        </TabsList>
        <TabsContent value="agreements" className="mt-6">
          <AgreementList />
        </TabsContent>
        <TabsContent value="payments" className="mt-6">
          <RenterPaymentsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
