import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Clock,
  CalendarClock,
  Bell,
  Mail,
  Send,
  ChevronRight,
  Rocket,
  Construction,
  CircleAlert,
} from "lucide-react";

export default function ComingSoonPage() {
  // Características que estarán disponibles próximamente
  const proximasCaracteristicas = [
    {
      titulo: "Análisis avanzado con IA",
      descripcion:
        "Análisis predictivo y detección de riesgos automático en contratos y documentos legales",
      icono: <Rocket className="size-5" />,
      fecha: "Septiembre 2025",
    },
    {
      titulo: "Colaboración en tiempo real",
      descripcion:
        "Edición simultánea de documentos con múltiples colaboradores y chat integrado",
      icono: <Construction className="size-5" />,
      fecha: "Julio 2025",
    },
    {
      titulo: "Plantillas personalizables",
      descripcion:
        "Crea y guarda tus propias plantillas adaptadas a tus necesidades específicas",
      icono: <CircleAlert className="size-5" />,
      fecha: "Agosto 2025",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
              <Clock className="size-4 mr-2" />
              <span>En desarrollo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Próximamente en Sotai Docs
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-indigo-100">
              Estamos trabajando para ofrecerte más funcionalidades y recursos
              que mejorarán tu experiencia legal
            </p>
            <Link href="/">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contador */}
      <section className="py-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Lanzamiento de nuevas características
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
              <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  23
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Días
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  14
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Horas
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  56
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Minutos
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  09
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Segundos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas características */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que estamos construyendo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Estas son algunas de las características en las que estamos
              trabajando actualmente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {proximasCaracteristicas.map((caracteristica, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                  {caracteristica.icono}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-4">
                  <CalendarClock className="size-3 mr-1" />
                  <span>{caracteristica.fecha}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {caracteristica.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {caracteristica.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suscripción para notificaciones */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="size-8 text-white" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Quieres ser el primero en enterarte?
              </h2>
              <p className="text-lg mb-8 text-blue-100">
                Suscríbete para recibir notificaciones cuando lancemos nuevas
                funcionalidades
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full py-3 pl-10 pr-4 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Send className="size-4 mr-2" />
                  Suscribirse
                </Button>
              </div>

              <p className="text-sm text-blue-100 mt-4">
                Te notificaremos cuando las nuevas características estén
                disponibles. No enviamos spam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Respuestas a algunas preguntas comunes sobre nuestras próximas
              actualizaciones
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
              <h3 className="text-xl font-bold mb-3">
                ¿Cuándo estarán disponibles estas nuevas características?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tenemos un calendario de lanzamiento progresivo durante los
                próximos meses. Las fechas exactas pueden variar, pero
                mantendremos a todos nuestros usuarios informados a través de
                correo electrónico y notificaciones en la plataforma.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
              <h3 className="text-xl font-bold mb-3">
                ¿Las nuevas funciones tendrán costo adicional?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                La mayoría de las nuevas características estarán incluidas en
                los planes actuales. Algunas funcionalidades avanzadas podrían
                estar disponibles exclusivamente en planes específicos.
                Comunicaremos claramente cualquier cambio en nuestra estructura
                de precios.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
              <h3 className="text-xl font-bold mb-3">
                ¿Puedo probar las funciones antes de su lanzamiento oficial?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sí, tendremos un programa de acceso anticipado para usuarios
                seleccionados. Si estás interesado en ser beta tester, puedes
                inscribirte a través de tu perfil en la sección &quot;Programa de
                acceso anticipado&quot;.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
              <h3 className="text-xl font-bold mb-3">
                ¿Habrá tutoriales sobre las nuevas funcionalidades?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutamente. Para cada nueva característica, publicaremos
                guías detalladas, tutoriales en video y realizaremos webinars de
                formación para asegurarnos de que todos los usuarios puedan
                aprovecharlas al máximo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos actuales */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mientras tanto, explora lo que ya tenemos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre las funcionalidades actuales de Sotai Docs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Funcionalidades principales
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Conoce las herramientas básicas que ya están disponibles en
                  nuestra plataforma
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Explorar funcionalidades
                  <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href="/user-guide">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Guía del usuario
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Aprende a utilizar todas las funciones disponibles actualmente
                  en Sotai Docs
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Ver guía
                  <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href="/#pricing">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Planes disponibles
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Consulta nuestros planes actuales y elige el que mejor se
                  adapte a tus necesidades
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Ver planes
                  <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Sugerencias para futuras características?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Nos encantaría escuchar tus ideas sobre qué características te
            gustaría ver en Sotai Docs
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            Enviar sugerencia
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
