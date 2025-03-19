import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FileSearch,
  ArrowRight,
  Home,
  FileText,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 lg:py-24 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                Error 404
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Página no encontrada
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Lo sentimos, la página que estás buscando no existe o ha sido
                movida a otra ubicación.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/">
                  <Button size="lg" className="font-medium">
                    <Home className="mr-2 size-4" />
                    Volver al inicio
                  </Button>
                </Link>
                <Link href="/coming-soon">
                  <Button size="lg" variant="outline">
                    <FileText className="mr-2 size-4" />
                    Explorar mejores prácticas
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <div className="relative max-w-md">
                {/* Círculo decorativo */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-xl"></div>

                {/* Ilustración */}
                <div className="relative bg-white dark:bg-zinc-800 p-8 md:p-10 rounded-2xl shadow-xl">
                  <div className="flex flex-col items-center">
                    <div className="size-32 mb-6 text-indigo-500 dark:text-indigo-400">
                      <FileSearch className="w-full h-full" />
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-center">
                      ¿Buscas algo específico?
                    </h3>

                    <div className="relative w-full max-w-sm mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar documentos, plantillas, guías..."
                        className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                    </div>

                    <div className="w-full space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
                        <span className="text-sm font-medium">
                          Contratos de trabajo
                        </span>
                        <ArrowRight className="size-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
                        <span className="text-sm font-medium">
                          Tutoriales recientes
                        </span>
                        <ArrowRight className="size-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
                        <span className="text-sm font-medium">
                          Centro de ayuda
                        </span>
                        <ArrowRight className="size-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Enlaces que podrían interesarte
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/user-guide">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Guía del usuario
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Aprende a usar todas las funciones de Sotai Docs
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Ver guía</span>
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/coming-soon">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Mejores prácticas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Optimiza tu experiencia con nuestra plataforma
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Explorar</span>
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/coming-soon">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Tutoriales
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Videos y guías paso a paso para aprender Sotai Docs
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Ver tutoriales</span>
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/#">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Contacto
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    ¿Necesitas ayuda? Nuestro equipo está listo para asistirte
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Contactar</span>
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
