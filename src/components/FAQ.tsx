import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Что входит в услугу 3D-визуализации?",
    answer:
      "Мы создаём фотореалистичные изображения интерьеров и экстерьеров: дневные и вечерние сцены, крупные планы материалов, виды с улицы. Итоговые файлы предоставляются в высоком разрешении (от 4K) без потери качества — идеально для презентаций, согласований и маркетинга.",
  },
  {
    question: "Сколько времени занимает создание 3D-рендера?",
    answer:
      "Один рендер интерьера — от 3 до 7 рабочих дней в зависимости от сложности сцены. Пакет из 5–10 видов для жилого объекта занимает 2–3 недели. Возможно ускоренное выполнение при срочных запросах — уточняйте при обращении.",
  },
  {
    question: "Можете ли вы визуализировать объект по чертежам другого архитектора?",
    answer:
      "Да, мы работаем с готовыми чертежами и техническим заданием. Нам достаточно планов, фасадов и пожеланий по стилистике — остальное берём на себя. Если документации нет, поможем разработать концепцию с нуля.",
  },
  {
    question: "В каких форматах вы работаете?",
    answer:
      "Принимаем файлы в AutoCAD (DWG), Revit, SketchUp, PDF и даже эскизы от руки. Результат предоставляем в JPEG, PNG, TIFF. По запросу — анимационные ролики и интерактивные 3D-туры.",
  },
  {
    question: "Как выглядит процесс работы?",
    answer:
      "1. Бриф и загрузка материалов. 2. Создание чернового рендера для согласования ракурсов. 3. Работа с деталями: материалы, освещение, обстановка. 4. Итоговые изображения в высоком разрешении. На каждом этапе вы видите промежуточный результат и вносите правки.",
  },
  {
    question: "Как начать работу?",
    answer:
      "Заполните форму на сайте или напишите нам в мессенджер. Опишите задачу, приложите имеющиеся материалы — и мы свяжемся с вами в течение одного рабочего дня с предварительной оценкой сроков и стоимости.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}