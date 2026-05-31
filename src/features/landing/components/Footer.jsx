import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const platformItems = [
    { label: t('landing.footer.platform.findHouse'), path: '/explore' },
    { label: t('landing.footer.platform.listProperty'), path: '/owner/properties/new' },
    { label: t('landing.footer.platform.howItWorks'), path: '/#how-it-works' },
  ];

  const companyItems = [
    { label: t('landing.footer.company.aboutUs'), path: '/about' },
    { label: t('landing.footer.company.contact'), path: '/contact' },
    { label: t('landing.footer.company.support'), path: '/contact' },
  ];

  return (
    <footer className="border-t border-border bg-foreground px-2 pt-20 pb-10 text-background md:px-4 lg:px-5 dark:bg-secondary dark:text-foreground">
      <div className="mx-auto">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="mb-4 text-xl font-extrabold">Bet-Connect</h2>
            <p className="text-sm leading-relaxed opacity-60">
              {t('landing.footer.brandDescription')}
            </p>
          </div>

          <FooterCol
            title={t('landing.footer.platform.title')}
            items={platformItems}
          />

          <FooterCol
            title={t('landing.footer.company.title')}
            items={companyItems}
          />

          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest uppercase opacity-80">
              {t('landing.footer.newsletter.title')}
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder={t('landing.footer.newsletter.emailPlaceholder')}
                className="border-border/30 bg-background/10 text-background placeholder:text-background/30 dark:bg-muted dark:text-foreground dark:placeholder:text-muted-foreground"
              />
              <Button className="font-bold">{t('landing.footer.newsletter.join')}</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 text-xs opacity-60 md:flex-row">
          <p>{t('landing.footer.copyright')}</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:opacity-100">
              {t('landing.footer.legal.privacyPolicy')}
            </span>
            <span className="cursor-pointer transition-colors hover:opacity-100">
              {t('landing.footer.legal.termsOfService')}
            </span>
            <span className="cursor-pointer transition-colors hover:opacity-100">
              {t('landing.footer.legal.cookiePolicy')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="mb-6 text-xs font-bold tracking-widest uppercase opacity-80">{title}</h4>
      <ul className="space-y-4 text-sm opacity-60">
        {items.map((item, i) => (
          <li key={i}>
            <Link to={item.path} className="cursor-pointer transition-colors hover:opacity-100">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
