import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  pageUrl: string
}

export default function FAQAccordion({ items, pageUrl }: FAQAccordionProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-8">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-neutral-200 rounded-xl px-6 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="font-sans text-[17px] font-semibold text-neutral-800 text-left py-5 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-base text-neutral-600 leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
