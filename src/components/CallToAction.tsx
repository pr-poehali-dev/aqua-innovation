import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import { SITE_CONFIG } from "@/lib/config"

const SEND_CONTACT_URL = "https://functions.poehali.dev/37274e5e-5e1e-413e-ad44-cb6b5fa1bc6c"

const SERVICES = [
  "3D-визуализация",
  "Архитектурное проектирование",
  "Дизайн интерьера",
  "Авторский надзор",
  "Другое",
]

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", phone: "", email: "", service: "", message: "" })
      } else {
        setError("Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую.")
      }
    } catch {
      setError("Ошибка отправки. Проверьте соединение с интернетом.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 px-4 py-3 text-sm focus:outline-none focus:border-primary-foreground/60 transition-colors duration-200"

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — heading */}
          <div>
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Обсудить проект</p>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
              Давайте создадим
              <br />
              нечто <HighlightedText>выдающееся</HighlightedText>
            </h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed mb-10">
              Расскажите о вашем объекте — мы подготовим предложение и покажем, как он будет выглядеть в фотореалистичных рендерах.
            </p>

            <div className="space-y-4 text-sm text-primary-foreground/50">
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-primary-foreground/30 flex-shrink-0" />
                Ответим в течение 1 рабочего дня
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-primary-foreground/30 flex-shrink-0" />
                Первичная консультация бесплатно
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-primary-foreground/30 flex-shrink-0" />
                Работаем по всей России
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-primary-foreground/10">
              <p className="text-primary-foreground/40 text-xs tracking-widest uppercase mb-3">Или напишите напрямую</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm mb-1">
                {SITE_CONFIG.email}
              </a>
              <a href={SITE_CONFIG.phoneHref} className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                <CheckCircle className="w-16 h-16 text-orange-300" strokeWidth={1} />
                <div>
                  <h3 className="text-2xl font-medium mb-2">Заявка отправлена!</h3>
                  <p className="text-primary-foreground/60">Мы свяжемся с вами в течение одного рабочего дня.</p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors underline underline-offset-4"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ваше имя *"
                    className={inputClass}
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Телефон *"
                    type="tel"
                    className={inputClass}
                  />
                </div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (необязательно)"
                  type="email"
                  className={inputClass}
                />
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={`${inputClass} ${!form.service ? "text-primary-foreground/30" : "text-primary-foreground"} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>Выберите услугу</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="text-foreground bg-white">{s}</option>
                  ))}
                </select>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Расскажите о вашем проекте (необязательно)"
                  rows={4}
                  className={`${inputClass} resize-none`}
                />

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Отправляем..." : "Отправить заявку"}
                  {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>

                <p className="text-primary-foreground/30 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}