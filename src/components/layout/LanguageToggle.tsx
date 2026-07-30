import { Switch } from '@/components/ui/switch'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { language, toggleLanguage, dictionary } = useI18n()
  const isEnglish = language === 'en'

  return (
    <div className="flex items-center gap-2 text-current">
      <span
        aria-hidden="true"
        className={cn(
          'text-sm font-medium',
          isEnglish ? 'opacity-60' : 'opacity-100',
        )}
      >
        PT
      </span>
      <Switch
        checked={isEnglish}
        onCheckedChange={toggleLanguage}
        aria-label={dictionary.nav.languageToggleLabel}
      />
      <span
        aria-hidden="true"
        className={cn(
          'text-sm font-medium',
          isEnglish ? 'opacity-100' : 'opacity-60',
        )}
      >
        EN
      </span>
    </div>
  )
}
