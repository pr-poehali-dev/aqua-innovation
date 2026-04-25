import { SITE_CONFIG as CONTACT } from "@/lib/config"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <img src="/images/hously-logo.svg" alt={CONTACT.studioName} width={120} height={32} className="w-auto h-6" />
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Архитектурное бюро полного цикла. 3D-визуализация, проектирование и авторский надзор — воплощаем идеи в пространство.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4">Навигация</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4">Связаться</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-foreground transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {CONTACT.year} {CONTACT.studioName}. Все права защищены.</p>
          <div className="flex gap-6">
            <a href={CONTACT.privacyUrl} className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href={CONTACT.termsUrl} className="hover:text-foreground transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}