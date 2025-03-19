// src/app/(public)/mejores-practicas/page.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Sparkles,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  Search,
  Shield,
  Layers,
  Star,
  Lightbulb,
  AlertCircle,
  Library,
  Scale,
  Repeat,
  LucideIcon,
} from "lucide-react";

type PracticaCategoria = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: LucideIcon;
  color: string;
  practicas: Practica[];
};

type Practica = {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: "Básico" | "Intermedio" | "Avanzado";
  tiempo: string;
};

export default function MejoresPracticasPage() {
  const categorias: PracticaCategoria[] = [
    {
      id: "redaccion",
      nombre: "Redacción eficiente",
      descripcion: "Consejos para crear documentos claros, precisos y efectivos",
      icono: FileText,
      color: "blue",
      practicas: [
        {
          id: "estructura-clara",
          titulo: "Mantén una estructura clara",
          descripcion: "Organiza tus documentos con secciones bien definidas y utiliza encabezados descriptivos para mejorar la legibilidad",
          nivel: "Básico",
          tiempo: "Lectura de 4 min",
        },
        {
          id: "lenguaje-preciso",
          titulo: "Utiliza lenguaje preciso y consistente",
          descripcion: "Evita ambigüedades empleando términos específicos y manteniendo coherencia en la terminología a lo largo del documento",
          nivel: "Intermedio",
          tiempo: "Lectura de 5 min",
        },
        {
          id: "revision-sistematica",
          titulo: "Establece un proceso de revisión sistemático",
          descripcion: "Implementa un protocolo de revisión para verificar la exactitud legal, gramática y coherencia antes de finalizar cualquier documento",
          nivel: "Avanzado",
          tiempo: "Lectura de 8 min",
        },
      ],
    },
    {
      id: "ia-prompts",
      nombre: "Uso efectivo de la IA",
      descripcion: "Cómo formular instrucciones claras para obtener los mejores resultados",
      icono: Sparkles,
      color: "purple",
      practicas: [
        {
          id: "prompts-especificos",
          titulo: "Crea instrucciones específicas",
          descripcion: "Formula instrucciones detalladas incluyendo todos los elementos clave que debe contener el documento legal",
          nivel: "Básico",
          tiempo: "Lectura de 3 min",
        },
        {
          id: "iteracion-refinamiento",
          titulo: "Itera y refina progresivamente",
          descripcion: "Mejora tus resultados refinando gradualmente las instrucciones basándote en los documentos generados",
          nivel: "Intermedio",
          tiempo: "Lectura de 6 min",
        },
        {
          id: "contexto-legal",
          titulo: "Proporciona contexto legal relevante",
          descripcion: "Incluye en tus instrucciones referencias a leyes, normativas o jurisprudencia específica que deban ser consideradas",
          nivel: "Avanzado",
          tiempo: "Lectura de 7 min",
        },
      ],
    },
    {
      id: "colaboracion",
      nombre: "Colaboración efectiva",
      descripcion: "Estrategias para trabajar en equipo con documentos legales",
      icono: Users,
      color: "green",
      practicas: [
        {
          id: "roles-claros",
          titulo: "Define roles y responsabilidades",
          descripcion: "Establece claramente quién es responsable de cada parte del documento y del proceso de revisión",
          nivel: "Básico",
          tiempo: "Lectura de 4 min",
        },
        {
          id: "comentarios-constructivos",
          titulo: "Utiliza comentarios constructivos",
          descripcion: "Proporciona feedback específico y orientado a soluciones cuando revises documentos de otros colaboradores",
          nivel: "Intermedio",
          tiempo: "Lectura de 5 min",
        },
        {
          id: "versionado-estrategico",
          titulo: "Implementa un versionado estratégico",
          descripcion: "Establece convenciones de nomenclatura claras y documentación de cambios para mantener el control de versiones",
          nivel: "Avanzado",
          tiempo: "Lectura de 6 min",
        },
      ],
    },
    {
      id: "seguridad",
      nombre: "Seguridad y privacidad",
      descripcion: "Protección de la información confidencial en tus documentos",
      icono: Shield,
      color: "red",
      practicas: [
        {
          id: "clasificacion-documentos",
          titulo: "Clasifica tus documentos por sensibilidad",
          descripcion: "Categoriza los documentos según su nivel de confidencialidad para aplicar medidas de seguridad apropiadas",
          nivel: "Básico",
          tiempo: "Lectura de 3 min",
        },
        {
          id: "permisos-acceso",
          titulo: "Gestiona permisos de acceso granulares",
          descripcion: "Configura permisos específicos para cada colaborador según su rol y necesidad de acceso a la información",
          nivel: "Intermedio",
          tiempo: "Lectura de 6 min",
        },
        {
          id: "auditoria-accesos",
          titulo: "Implementa auditorías periódicas de acceso",
          descripcion: "Revisa regularmente quién ha accedido a documentos sensibles y rastrea cualquier actividad sospechosa",
          nivel: "Avanzado",
          tiempo: "Lectura de 5 min",
        },
      ],
    },
    {
      id: "organizacion",
      nombre: "Organización y gestión",
      descripcion: "Sistemas para mantener tus documentos ordenados y accesibles",
      icono: Layers,
      color: "amber",
      practicas: [
        {
          id: "taxonomia-consistente",
          titulo: "Crea una taxonomía consistente",
          descripcion: "Desarrolla un sistema de categorización y etiquetado coherente para todos tus documentos",
          nivel: "Básico",
          tiempo: "Lectura de 4 min",
        },
        {
          id: "plantillas-personalizadas",
          titulo: "Personaliza plantillas para casos recurrentes",
          descripcion: "Adapta las plantillas básicas a tus necesidades específicas para agilizar la creación de documentos frecuentes",
          nivel: "Intermedio",
          tiempo: "Lectura de 7 min",
        },
        {
          id: "automatizacion-flujos",
          titulo: "Automatiza flujos de trabajo documentales",
          descripcion: "Configura procesos automatizados para la creación, revisión y aprobación de documentos frecuentes",
          nivel: "Avanzado",
          tiempo: "Lectura de 9 min",
        },
      ],
    },
    {
      id: "cumplimiento",
      nombre: "Cumplimiento normativo",
      descripcion: "Asegura que tus documentos cumplan con la legislación vigente",
      icono: Scale,
      color: "indigo",
      practicas: [
        {
          id: "actualizacion-normativa",
          titulo: "Mantén un registro de actualización normativa",
          descripcion: "Documenta cuándo y cómo se han incorporado cambios legislativos a tus plantillas y documentos",
          nivel: "Básico",
          tiempo: "Lectura de 5 min",
        },
        {
          id: "revision-legal-periodica",
          titulo: "Programa revisiones legales periódicas",
          descripcion: "Establece un calendario de revisiones para asegurar que tus documentos cumplen con la normativa actual",
          nivel: "Intermedio",
          tiempo: "Lectura de 6 min",
        },
        {
          id: "adaptacion-sectorial",
          titulo: "Adapta documentos a regulaciones sectoriales",
          descripcion: "Personaliza tus documentos considerando las normativas específicas de cada industria o sector",
          nivel: "Avanzado",
          tiempo: "Lectura de 8 min",
        },
      ],
    },
  ];

  // Función para obtener el color de fondo según la categoría
  const getCategoryColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Función para obtener el color de la etiqueta de nivel
  const getLevelColor = (level: string) => {
    const colors = {
      Básico: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Intermedio: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      Avanzado: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    };
    return colors[level as keyof typeof colors] || colors["Básico"];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mejores Prácticas en Sotai Docs
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-indigo-100">
              Optimiza tu experiencia con nuestra plataforma y mejora la calidad de tus documentos legales
            </p>
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-indigo-300" />
              <input
                type="text"
                placeholder="Buscar prácticas recomendadas..."
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
              Todas las prácticas
            </Button>
            <Button variant="outline" className="rounded-full">
              Nivel básico
            </Button>
            <Button variant="outline" className="rounded-full">
              Nivel intermedio
            </Button>
            <Button variant="outline" className="rounded-full">
              Nivel avanzado
            </Button>
            <Button variant="outline" className="rounded-full">
              Redacción
            </Button>
            <Button variant="outline" className="rounded-full">
              Uso de IA
            </Button>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-8 md:p-10 border border-gray-100 dark:border-zinc-700">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  ¿Por qué son importantes las mejores prácticas?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Implementar mejores prácticas en la creación y gestión de documentos legales no solo mejora 
                  la eficiencia de tu trabajo, sino que también reduce errores, aumenta la seguridad y garantiza 
                  el cumplimiento normativo.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Hemos recopilado estrategias probadas por profesionales del derecho para ayudarte a maximizar 
                  el valor de Sotai Docs en tu práctica diaria, desde técnicas de redacción hasta métodos 
                  avanzados de colaboración.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-200">Mayor precisión legal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-200">Ahorro de tiempo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="size-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-200">Seguridad mejorada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-200">Mejor colaboración</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-60 h-60">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lightbulb className="size-24 text-indigo-500 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal - Categorías */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950 flex-grow">
        <div className="container mx-auto px-4 max-w-7xl">
          {categorias.map((categoria, index) => (
            <div key={index} className={`${index > 0 ? "mt-20" : ""}`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${getCategoryColor(
                    categoria.color
                  )}`}
                >
                  <categoria.icono className="size-5" />
                </div>
                <h2 className="text-2xl font-bold">{categoria.nombre}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
                {categoria.descripcion}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoria.practicas.map((practica, practIndex) => (
                  <Link href={`/mejores-practicas/${practica.id}`} key={practIndex}>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 overflow-hidden h-full flex flex-col group">
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${getLevelColor(
                              practica.nivel
                            )}`}
                          >
                            {practica.nivel}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="size-3 mr-1" />
                            {practica.tiempo}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {practica.titulo}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-4">
                          {practica.descripcion}
                        </p>

                        <div className="flex items-center mt-auto">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                            Leer más
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

      {/* Mejores Prácticas Destacadas */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prácticas destacadas por la comunidad
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Las estrategias mejor valoradas por profesionales que utilizan Sotai Docs diariamente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-medium text-blue-600 dark:text-blue-400">
                    RV
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Roberto Valenzuela</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Abogado Corporativo
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Sistemas de plantillas anidadas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                &quot;Creé un sistema de plantillas modulares que se pueden combinar entre sí. Esto me permite ensamblar documentos complejos rápidamente sin duplicar contenido.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center font-medium text-purple-600 dark:text-purple-400">
                    MC
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">María Contreras</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Asesora Legal
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Biblioteca de cláusulas inteligentes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                &quot;Mantengo una biblioteca de cláusulas clasificadas por tipo, riesgo y aplicabilidad. Al generar documentos con IA, incluyo instrucciones específicas para usar estas cláusulas.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-5 fill-current ${i > 3 ? "opacity-40" : ""}`} />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-medium text-green-600 dark:text-green-400">
                    JM
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Javier Mendoza</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notaría
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Flujos de trabajo automatizados
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                &quot;Configuré un proceso completo donde la generación, revisión y aprobación de documentos está automatizada. Redujo nuestros tiempos de gestión en un 60%.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-5 fill-current`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Adicionales */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Recursos adicionales
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complementa tu conocimiento con estos materiales especializados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/guias/redaccion-legal">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Guía de redacción legal
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Técnicas avanzadas para redactar documentos legales claros y precisos
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Ver guía
                  <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href="/plantillas/premium">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4">
                  <Library className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Plantillas premium
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Colección de plantillas avanzadas creadas por expertos en derecho chileno
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Explorar plantillas
                  <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href="/webinars">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                  <Repeat className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Webinars grabados
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Sesiones formativas con demostraciones prácticas y casos de uso reales
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Ver webinars
                  <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href="/preguntas-frecuentes">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-700 h-full flex flex-col group">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Preguntas frecuentes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  Respuestas detalladas a las dudas más comunes sobre mejores prácticas y optimización de flujos de trabajo
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Ver preguntas
                  <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}