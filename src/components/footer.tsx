const navigation = {
  soluciones: [
    { name: 'Generación de Documentos', href: '#' },
    { name: 'Firma Digital', href: '#' },
    { name: 'Automatización Legal', href: '#' },
    { name: 'Almacenamiento Seguro', href: '#' },
    { name: 'Integraciones', href: '#' },
  ],
  soporte: [
    { name: 'Centro de Ayuda', href: '#' },
    { name: 'Documentación', href: '#' },
    { name: 'Preguntas Frecuentes', href: '#' },
  ],
  empresa: [
    { name: 'Sobre Nosotros', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Carreras', href: '#' },
    { name: 'Prensa', href: '#' },
  ],
  legal: [
    { name: 'Términos y Condiciones', href: '#' },
    { name: 'Política de Privacidad', href: '#' },
    { name: 'Aviso Legal', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="mt-4 border-t border-gray-900/10 pt-12 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="h-9">
            <h1 className="text-2xl font-semibold">Sotai Docs</h1>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-black dark:text-white">Soluciones</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.soluciones.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-black dark:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-black dark:text-white">Soporte</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.soporte.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-black dark:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-black dark:text-white">Empresa</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.empresa.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-black dark:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-black dark:text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-black dark:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-xs text-black dark:text-white md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Sotai Docs. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
