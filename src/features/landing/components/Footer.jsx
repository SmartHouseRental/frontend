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
    <footer className="bg-foreground text-background border-t border-white/5 px-2 md:px-4 lg:px-5 pt-20 pb-10">
      <div className="mx-auto">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="text-white mb-4 text-xl font-extrabold">Bet-Connect</h2>
            <p className="text-white/50 text-sm leading-relaxed">
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
            <h4 className="text-white mb-6 text-xs font-bold tracking-widest uppercase">
              {t('landing.footer.newsletter.title')}
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder={t('landing.footer.newsletter.emailPlaceholder')}
                className="bg-background/10 text-background placeholder:text-background/30 border-white/20"
              />
              <Button className="font-bold">{t('landing.footer.newsletter.join')}</Button>
            </div>
          </div>
        </div>

        <div className="border-background/10 text-background/40 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row">
          <p>{t('landing.footer.copyright')}</p>
          <div className="flex gap-6">
            <span className="hover:text-background cursor-pointer transition-colors">
              {t('landing.footer.legal.privacyPolicy')}
            </span>
            <span className="hover:text-background cursor-pointer transition-colors">
              {t('landing.footer.legal.termsOfService')}
            </span>
            <span className="hover:text-background cursor-pointer transition-colors">
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
      <h4 className="text-white mb-6 text-xs font-bold tracking-widest uppercase">{title}</h4>
      <ul className="text-white/50 space-y-4 text-sm">
        {items.map((item, i) => (
          <li key={i}>
            <Link to={item.path} className="hover:text-white cursor-pointer transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
