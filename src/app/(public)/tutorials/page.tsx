import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Sparkles,
  Users,
  Video,
  Clock,
  ArrowRight,
  Search,
  Play,
  BarChart,
  Share2,
} from "lucide-react";

export default function TutorialesPage() {
  const tutoriales = [
    {
      categoria: "Primeros pasos",
      icono: <BookOpen className="size-5" />,
      color: "blue",
      tutoriales: [
        {
          id: "inicio-rapido",
          titulo: "Inicio rápido en Sotai Docs",
          descripcion:
            "Configura tu cuenta y crea tu primer documento en menos de 5 minutos",
          duracion: "5 minutos",
          nivel: "Principiante",
          imagen: "/tutorial-1.jpg",
        },
        {
          id: "navegacion",
          titulo: "Navegación por la plataforma",
          descripcion:
            "Aprende a moverte por las diferentes secciones y encontrar lo que necesitas",
          duracion: "3 minutos",
          nivel: "Principiante",
          imagen: "/tutorial-2.jpg",
        },
        {
          id: "configuracion-perfil",
          titulo: "Configuración de tu perfil",
          descripcion:
            "Personaliza tu cuenta y establece tus preferencias de notificación",
          duracion: "4 minutos",
          nivel: "Principiante",
          imagen: "/tutorial-3.jpg",
        },
      ],
    },
    {
      categoria: "Creación de documentos",
      icono: <FileText className="size-5" />,
      color: "indigo",
      tutoriales: [
        {
          id: "documento-desde-cero",
          titulo: "Crear un documento desde cero",
          descripcion:
            "Cómo crear y formatear un documento legal completo paso a paso",
          duracion: "8 minutos",
          nivel: "Intermedio",
          imagen: "/tutorial-4.jpg",
        },
        {
          id: "usar-plantillas",
          titulo: "Usar plantillas predefinidas",
          descripcion:
            "Aprende a utilizar y personalizar las plantillas de nuestra biblioteca",
          duracion: "6 minutos",
          nivel: "Principiante",
          imagen: "/tutorial-5.jpg",
        },
        {
          id: "generacion-ia",
          titulo: "Generación de documentos con IA",
          descripcion:
            "Cómo describir tus necesidades para que la IA genere el documento perfecto",
          duracion: "10 minutos",
          nivel: "Intermedio",
          imagen: "/tutorial-6.jpg",
        },
      ],
    },
    {
      categoria: "Colaboración",
      icono: <Users className="size-5" />,
      color: "green",
      tutoriales: [
        {
          id: "compartir-documentos",
          titulo: "Compartir documentos con otros usuarios",
          descripcion:
            "Gestiona permisos y comparte tus documentos de forma segura",
          duracion: "7 minutos",
          nivel: "Intermedio",
          imagen: "/tutorial-7.jpg",
        },
        {
          id: "comentarios",
          titulo: "Comentarios y sugerencias",
          descripcion:
            "Cómo usar el sistema de comentarios para colaborar eficientemente",
          duracion: "5 minutos",
          nivel: "Intermedio",
          imagen: "/tutorial-8.jpg",
        },
        {
          id: "control-versiones",
          titulo: "Control de versiones colaborativo",
          descripcion:
            "Gestiona los cambios cuando múltiples usuarios editan un documento",
          duracion: "9 minutos",
          nivel: "Avanzado",
          imagen: "/tutorial-9.jpg",
        },
      ],
    },
    {
      categoria: "Funciones avanzadas",
      icono: <Sparkles className="size-5" />,
      color: "purple",
      tutoriales: [
        {
          id: "analisis-ia",
          titulo: "Análisis de documentos con IA",
          descripcion:
            "Cómo utilizar la IA para analizar riesgos y puntos clave en documentos",
          duracion: "12 minutos",
          nivel: "Avanzado",
          imagen: "/tutorial-10.jpg",
        },
        {
          id: "exportacion-avanzada",
          titulo: "Opciones avanzadas de exportación",
          descripcion:
            "Formatos personalizados, marcas de agua y opciones de seguridad",
          duracion: "8 minutos",
          nivel: "Intermedio",
          imagen: "/tutorial-11.jpg",
        },
        {
          id: "plantillas-personalizadas",
          titulo: "Creación de plantillas personalizadas",
          descripcion:
            "Crea tus propias plantillas reutilizables para futuros documentos",
          duracion: "15 minutos",
          nivel: "Avanzado",
          imagen: "/tutorial-12.jpg",
        },
      ],
    },
  ];

  // Función para obtener el color de fondo según la categoría
  const getCategoryColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      indigo:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
      green:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Función para obtener el color de la etiqueta de nivel
  const getLevelColor = (level: string) => {
    const colors = {
      Principiante:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Intermedio:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      Avanzado:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    };
    return colors[level as keyof typeof colors] || colors["Principiante"];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tutoriales de Sotai Docs
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-indigo-100">
              Aprende a utilizar todas las funciones de nuestra plataforma con
              tutoriales paso a paso
            </p>
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-indigo-300" />
              <input
                type="text"
                placeholder="Buscar tutoriales..."
                className="w-full py-3 pl-10 pr-4 rounded-full bg-white/10 backdrop-blur-sm border border-indigo-400/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-indigo-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" className="rounded-full">
              Todos los tutoriales
            </Button>
            <Button variant="outline" className="rounded-full">
              Principiante
            </Button>
            <Button variant="outline" className="rounded-full">
              Intermedio
            </Button>
            <Button variant="outline" className="rounded-full">
              Avanzado
            </Button>
            <Button variant="outline" className="rounded-full">
              Videos
            </Button>
            <Button variant="outline" className="rounded-full">
              Guías paso a paso
            </Button>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950 flex-grow">
        <div className="container mx-auto px-4 max-w-7xl">
          {tutoriales.map((categoria, index) => (
            <div key={index} className={`${index > 0 ? "mt-20" : ""}`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${getCategoryColor(
                    categoria.color
                  )}`}
                >
                  {categoria.icono}
                </div>
                <h2 className="text-2xl font-bold">{categoria.categoria}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoria.tutoriales.map((tutorial, tutorialIndex) => (
                  <Link href={`/tutoriales/${tutorial.id}`} key={tutorialIndex}>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 overflow-hidden h-full flex flex-col group">
                      <div className="relative h-48 bg-gray-100 dark:bg-zinc-700 overflow-hidden">
                        {/* Aquí iría la imagen real, pero uso un placeholder por ahora */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="size-8 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${getLevelColor(
                              tutorial.nivel
                            )}`}
                          >
                            {tutorial.nivel}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="size-3 mr-1" />
                            {tutorial.duracion}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tutorial.titulo}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-4">
                          {tutorial.descripcion}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center">
                            Ver tutorial
                            <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Mantente actualizado
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete para recibir notificaciones cuando publiquemos nuevos
            tutoriales y guías
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
            />
            <Button>Suscribirme</Button>
          </div>
        </div>
      </section>

      {/* Tutoriales destacados */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tutoriales destacados
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Los recursos más populares y útiles para sacar el máximo provecho
              de Sotai Docs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Video className="size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Curso completo de Sotai Docs
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Una guía exhaustiva que cubre todas las funcionalidades de la
                plataforma
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Video className="size-4" />
                  <span>12 videos</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="size-4" />
                  <span>2 horas</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Ver curso
              </Button>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-6">
                <BarChart className="size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Domina el análisis con IA
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Aprende a utilizar todas las capacidades de análisis inteligente
                en tus documentos
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Video className="size-4" />
                  <span>5 videos</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="size-4" />
                  <span>45 minutos</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Ver curso
              </Button>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-6">
                <Share2 className="size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Colaboración efectiva</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Estrategias y mejores prácticas para trabajar en equipo con
                documentos legales
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Video className="size-4" />
                  <span>7 videos</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="size-4" />
                  <span>1 hora</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Ver curso
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Si necesitas ayuda con algo específico, nuestro equipo está listo
            para asistirte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
              Contactar a soporte
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Ver preguntas frecuentes
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
