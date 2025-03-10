import { Check } from 'lucide-react'
import { Button } from './ui/button'

const tiers = [
  {
    name: 'Básico',
    id: 'tier-basic',
    href: '#',
    priceMonthly: '$19',
    description: 'Para profesionales y freelancers que necesitan documentos legales esenciales.',
    features: [
      'Generación de hasta 10 documentos al mes',
      'Plantillas legales básicas',
      'Firma digital incluida',
      'Soporte por correo en 48 horas',
    ],
    mostPopular: false,
  },
  {
    name: 'Profesional',
    id: 'tier-professional',
    href: '#',
    priceMonthly: '$49',
    description: 'Ideal para pymes y emprendedores que necesitan automatizar su gestión legal.',
    features: [
      'Generación ilimitada de documentos',
      'Plantillas avanzadas y personalizadas',
      'Firma digital avanzada',
      'Automatización de contratos',
      'Soporte prioritario en 24 horas',
    ],
    mostPopular: true,
  },
  {
    name: 'Empresarial',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Para empresas con alto volumen de documentos y necesidades legales avanzadas.',
    features: [
      'Generación ilimitada de documentos',
      'Automatización completa de procesos legales',
      'Firma digital con auditoría',
      'Gestión de equipos y roles',
      'Soporte dedicado en 1 hora',
    ],
    mostPopular: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PriceSection() {
  return (
    <div className="bg-white dark:bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-black dark:text-white">Planes</h2>
          <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            Un plan para cada necesidad
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-black dark:text-white sm:text-xl/8">
          Elige el plan que mejor se adapte a tu negocio y optimiza la gestión de tus documentos legales con IA.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-950 p-8 ring-1 ring-gray-200 dark:ring-zinc-900 xl:p-10',
              )}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? 'text-black dark:text-white' : 'text-black dark:text-white',
                      'text-lg/8 font-semibold',
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 dark:bg-zinc-600 px-2.5 py-1 text-xs/5 font-semibold text-black dark:text-white">
                      Más popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm/6 text-black dark:text-white">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-semibold tracking-tight text-black dark:text-white">{tier.priceMonthly}</span>
                  <span className="text-sm/6 font-semibold text-black dark:text-white">/mes</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm/6 text-black dark:text-white">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check aria-hidden="true" className="h-6 w-5 flex-none text-black dark:text-white" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button>Comenzar</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
