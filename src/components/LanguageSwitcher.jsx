import { Check, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LANGUAGE_OPTIONS = [
  { value: 'en', labelKey: 'language.english' },
  { value: 'am', labelKey: 'language.amharic' },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const activeLanguage = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="text-muted-foreground hover:text-primary rounded-full"
          aria-label={t('language.select')}
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LANGUAGE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="cursor-pointer font-medium"
            onClick={() => i18n.changeLanguage(option.value)}
          >
            <span className="flex flex-1 items-center justify-between gap-3">
              {t(option.labelKey)}
              {activeLanguage === option.value && <Check className="h-4 w-4 text-primary shrink-0" />}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
