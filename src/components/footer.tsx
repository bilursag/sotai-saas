import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

const navigation = {
  soluciones: [
    { name: "Generación de Documentos", href: "#" },
    { name: "Firma Digital", href: "#" },
    { name: "Automatización Legal", href: "#" },
    { name: "Almacenamiento Seguro", href: "#" },
    { name: "Integraciones", href: "#" },
  ],
  soporte: [
    { name: "Centro de Ayuda", href: "#" },
    { name: "Documentación", href: "/user-guide" },
    { name: "Tutoriales", href: "/coming-soon" },
    { name: "Mejores Prácticas", href: "/coming-soon" },
    { name: "Preguntas Frecuentes", href: "#" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Carreras", href: "#" },
    { name: "Prensa", href: "#" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Aviso Legal", href: "#" },
  ],
};

const social = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 md:mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:max-w-md">
              <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mantente actualizado
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Suscríbete para recibir novedades, artículos y recursos sobre
                documentos legales inteligentes.
              </p>
            </div>
            <div className="flex-grow max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Tu correo electrónico" />
                <Button>Suscribirse</Button>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Respetamos tu privacidad. Puedes darte de baja en cualquier
                momento.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                SD
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sotai Docs
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Plataforma líder para generar y gestionar documentos legales con
              inteligencia artificial, adaptada a la legislación chilena.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <PhoneCall className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  +56 2 2234 5678
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  contacto@sotaidocs.cl
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-gray-600 dark:text-gray-300"
                  aria-label={item.name}
                >
                  <item.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900 dark:text-white">
              Soluciones
            </h3>
            <ul className="space-y-3">
              {navigation.soluciones.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900 dark:text-white">
              Soporte
            </h3>
            <ul className="space-y-3">
              {navigation.soporte.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900 dark:text-white">
              Empresa
            </h3>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold mt-8 mb-4 uppercase tracking-wider text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Sotai Docs. Todos los derechos
              reservados.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/sotai-docs"
                className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="size-4" />
                <span>GitHub</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="size-4" />
                <span>API</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="size-4" />
                <span>Estatus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
