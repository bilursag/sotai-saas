import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import {
  FileText,
  Shield,
  Zap,
  Users,
  Award,
  Check,
  Clock,
  ArrowRight,
  LineChart,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none opacity-40" />
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Documentos Legales Inteligentes con{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent">
                  IA
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Crea, gestiona y comparte documentos legales profesionales en
                minutos con nuestra plataforma impulsada por inteligencia
                artificial, adaptada a la legislación chilena.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <SignUpButton mode="modal">
                  <Button size="lg" className="font-medium">
                    Comenzar gratis
                  </Button>
                </SignUpButton>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Explorar funciones
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white font-medium text-sm bg-gradient-to-br ${
                        [
                          "from-blue-500 to-indigo-600",
                          "from-indigo-500 to-purple-600",
                          "from-purple-500 to-pink-600",
                          "from-pink-500 to-red-600",
                        ][i % 4]
                      }`}
                    >
                      {["CC", "MV", "LP", "JR"][i % 4]}
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">+2,500</span> profesionales
                  chilenos confían en nosotros
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-xl"></div>
                <div className="relative bg-white dark:bg-zinc-800 p-6 sm:p-8 rounded-xl shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      Contrato.sotai
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Contrato de Prestación de Servicios
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      En{" "}
                      <span className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                        Santiago de Chile
                      </span>
                      , a{" "}
                      <span className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                        18 de marzo de 2025
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">COMPARECEN</span>
                    </p>
                    <p>
                      De una parte,{" "}
                      <span className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                        Empresa ABC SpA
                      </span>
                      , con RUT{" "}
                      <span className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                        76.123.456-7
                      </span>
                      , y domicilio en...
                    </p>
                    <p>
                      Y de otra parte,{" "}
                      <span className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                        Consultor XYZ
                      </span>
                      , con RUT{" "}
                      <span className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                        12.345.678-9
                      </span>
                      , y domicilio en...
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="size-4" />
                      <span>Creado con IA en 30 segundos</span>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1 ml-auto">
                      <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Redacción legal nunca fue tan sencilla
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nuestra plataforma combina inteligencia artificial avanzada con
              conocimiento jurídico chileno para crear documentos legales
              profesionales en minutos, no en horas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-blue-600 dark:text-blue-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Generación con IA</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Crea documentos legales completos y personalizados en segundos
                utilizando prompts en lenguaje natural.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6">
                <FileText className="text-indigo-600 dark:text-indigo-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Plantillas profesionales
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accede a una biblioteca de plantillas legales verificadas por
                expertos para diferentes tipos de documentos.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-purple-600 dark:text-purple-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Colaboración segura</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comparte documentos con clientes o colegas, estableciendo
                permisos específicos de visualización o edición.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                <LineChart className="text-green-600 dark:text-green-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Análisis inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Obtén resúmenes, puntos clave y detección de riesgos en tus
                documentos mediante análisis con IA.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-6">
                <Clock className="text-red-600 dark:text-red-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Control de versiones</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mantén un historial completo de cambios, compara versiones y
                restaura versiones anteriores cuando lo necesites.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-6">
                <LockKeyhole className="text-amber-600 dark:text-amber-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seguridad avanzada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tus documentos están protegidos con cifrado de nivel empresarial
                y controles de acceso estrictos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Un proceso simple y eficiente para crear documentos legales
              profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Describe tus necesidades
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simplemente cuéntanos qué documento necesitas o selecciona una
                plantilla de nuestra biblioteca.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                La IA genera el documento
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestra IA crea un documento personalizado basado en tus
                especificaciones y en normativas legales chilenas actualizadas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Revisa y finaliza</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Edita, comparte o exporta tu documento. Todo listo para ser
                utilizado en cuestión de minutos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planes diseñados para todos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Desde profesionales independientes hasta grandes despachos,
              tenemos el plan perfecto para ti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-zinc-700">
              <h3 className="text-xl font-bold mb-2">Personal</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Para uso individual y proyectos pequeños
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Gratis</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hasta 5 documentos al mes</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Acceso a plantillas básicas</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Generación con IA (límite de 3 por mes)</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Exportación a PDF</span>
                </li>
              </ul>
              <SignUpButton mode="modal">
                <Button className="w-full">Comenzar gratis</Button>
              </SignUpButton>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-blue-500 dark:border-blue-400 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Profesional</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ideal para abogados y profesionales independientes
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29.990</span>
                <span className="text-gray-500 dark:text-gray-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Documentos ilimitados</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Todas las plantillas profesionales</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Generación con IA ilimitada</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Análisis de documentos con IA</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Colaboración con hasta 5 personas</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Historial de versiones completo</span>
                </li>
              </ul>
              <SignUpButton mode="modal">
                <Button className="w-full" variant="default">
                  Prueba gratuita de 14 días
                </Button>
              </SignUpButton>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-zinc-700">
              <h3 className="text-xl font-bold mb-2">Empresarial</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Para despachos y equipos jurídicos
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$89.990</span>
                <span className="text-gray-500 dark:text-gray-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Todo lo del plan Profesional</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Usuarios ilimitados</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Plantillas personalizables</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>API para integraciones</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Soporte prioritario</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Factura exenta de IVA</span>
                </li>
              </ul>
              <SignUpButton mode="modal">
                <Button className="w-full" variant="outline">
                  Contactar ventas
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Profesionales de todo Chile confían en Sotai Docs para sus
              necesidades legales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-medium text-indigo-600 dark:text-indigo-400">
                    CC
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Carolina Contreras</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Abogada Independiente, Santiago
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                &quot;Sotai Docs ha transformado mi práctica legal. Puedo generar
                contratos de alta calidad en minutos, lo que me permite dedicar
                más tiempo a mis clientes.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-medium text-blue-600 dark:text-blue-400">
                    MV
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Matías Vega</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estudio Jurídico, Valparaíso
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                &quot;La función de análisis de documentos nos ha ayudado a
                identificar riesgos que de otro modo habríamos pasado por alto.
                Una herramienta indispensable para nuestro despacho.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-medium text-green-600 dark:text-green-400">
                    LP
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Laura Parra</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notaría, Concepción
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                &quot;La plataforma nos permite ofrecer un servicio más rápido y
                preciso a nuestros clientes. Las plantillas adaptadas a la
                legislación chilena son excepcionales.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-5 ${i > 3 ? "opacity-40" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comienza a crear documentos legales inteligentes hoy mismo
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Únete a miles de profesionales chilenos que están optimizando su
            trabajo legal con Sotai Docs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="font-medium bg-white text-blue-600 hover:bg-gray-100"
              >
                Comenzar gratis
              </Button>
            </SignUpButton>
            <Link href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Ver planes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Respuestas a las dudas más comunes sobre Sotai Docs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-3">
                ¿Los documentos generados son legalmente válidos en Chile?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sí, todos nuestros documentos están diseñados conforme a la
                legislación chilena vigente. Sin embargo, para asuntos legales
                complejos, siempre recomendamos la revisión de un profesional.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">
                ¿Cómo funciona la asistencia con IA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestra IA está entrenada con miles de documentos legales
                chilenos. Solo describe lo que necesitas en lenguaje natural, y
                ella generará un documento profesional adaptado a tus
                requerimientos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">
                ¿Puedo personalizar las plantillas?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutamente. Todas nuestras plantillas son completamente
                editables y puedes adaptarlas a tus necesidades específicas
                antes de guardarlas o compartirlas.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">
                ¿Es segura mi información?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tu privacidad es nuestra prioridad. Utilizamos cifrado de nivel
                bancario y cumplimos con todas las normativas chilenas de
                protección de datos. Nunca compartimos tu información con
                terceros.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">
                ¿Puedo cancelar mi suscripción en cualquier momento?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sí, puedes cancelar tu suscripción cuando quieras. No hay
                contratos de permanencia ni cargos ocultos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">
                ¿Ofrecen algún tipo de soporte?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Todos nuestros planes incluyen soporte por correo electrónico.
                Los planes Profesional y Empresarial cuentan con soporte
                prioritario y asistencia personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Documentación y recursos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Todo lo que necesitas para aprovechar al máximo nuestra plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <FileText className="text-blue-600 dark:text-blue-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guía del usuario</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Aprende a utilizar todas las funcionalidades de Sotai Docs con
                nuestra guía completa.
              </p>
              <Link href="/user-guide">
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight className="text-green-600 dark:text-green-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tutoriales</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Aprende paso a paso con nuestros tutoriales detallados sobre
                funciones específicas.
              </p>
              <Link href="/tutorials">
                <Button variant="outline" className="w-full">
                  Ver tutoriales
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-purple-600 dark:text-purple-400 size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mejores prácticas</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Consejos y técnicas para sacar el máximo provecho a nuestra
                plataforma.
              </p>
              <Link href="/mejores-practicas">
                <Button variant="outline" className="w-full">
                  Ver consejos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  ¿Necesitas más información?
                </h3>
                <p className="mb-6 text-blue-100">
                  Nuestro equipo está disponible para resolver todas tus dudas y
                  ayudarte a elegir el plan perfecto para tus necesidades.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="size-5" />
                  <span>Asistencia personalizada</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="size-5" />
                  <span>Demos personalizadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="size-5" />
                  <span>Planes a la medida para tu organización</span>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mensaje
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md h-24 bg-transparent"
                      placeholder="¿En qué podemos ayudarte?"
                    ></textarea>
                  </div>
                  <Button className="w-full">Enviar mensaje</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}