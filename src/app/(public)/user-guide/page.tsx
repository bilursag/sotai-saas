// src/app/(public)/guia-usuario/page.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  Coffee,
  Zap,
  Users,
  Copy,
  Eye,
  Edit,
  Download,
  History,
  MessageSquare,
  Search,
  Sparkles,
  ChevronRight,
  Share2,
  Clock,
} from "lucide-react";

export default function GuiaUsuarioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Guía del Usuario - Sotai Docs
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-blue-100">
              Todo lo que necesitas saber para aprovechar al máximo nuestra
              plataforma de documentos legales inteligentes
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Download className="mr-2 size-4" />
                Descargar PDF
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Search className="mr-2 size-4" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 space-y-2">
                <h3 className="font-bold text-lg mb-4">Contenidos</h3>

                <Link
                  href="#introduccion"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Coffee className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Introducción</span>
                </Link>

                <Link
                  href="#primeros-pasos"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Zap className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Primeros pasos</span>
                </Link>

                <Link
                  href="#documentos"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <FileText className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Gestión de documentos</span>
                </Link>

                <Link
                  href="#compartir"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Users className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Compartir y colaborar</span>
                </Link>

                <Link
                  href="#ia"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Sparkles className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Funciones de IA</span>
                </Link>

                <Link
                  href="#plantillas"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Copy className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Plantillas</span>
                </Link>

                <Link
                  href="#exportacion"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Download className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Exportación e impresión</span>
                </Link>

                <Link
                  href="#soporte"
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <MessageSquare className="size-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Soporte y ayuda</span>
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="prose dark:prose-invert max-w-none">
                {/* Introducción */}
                <div id="introduccion" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <Coffee className="size-6 mr-2 text-blue-600 dark:text-blue-400" />
                    Introducción
                  </h2>

                  <p className="text-lg">
                    Bienvenido a <strong>Sotai Docs</strong>, la plataforma que
                    revoluciona la forma de crear, gestionar y compartir
                    documentos legales mediante el poder de la inteligencia
                    artificial. Diseñada para profesionales del derecho,
                    empresas y particulares, Sotai Docs automatiza la redacción
                    de documentos legales, ahorrándote tiempo y minimizando
                    errores.
                  </p>

                  <p>
                    Esta guía te ayudará a aprovechar al máximo todas las
                    funcionalidades de nuestra plataforma, desde la creación de
                    documentos con asistencia de IA hasta la colaboración con
                    otros usuarios.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl my-8 border border-blue-100 dark:border-blue-900">
                    <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">
                      ¿Por qué usar Sotai Docs?
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Ahorro de tiempo:</strong> Crea documentos
                          legales completos en minutos, no en horas.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Precisión legal:</strong> Documentos basados
                          en la legislación chilena actual.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Colaboración sencilla:</strong> Comparte y
                          trabaja en documentos con colegas y clientes.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Análisis inteligente:</strong> Identifica
                          riesgos y aspectos clave en tus documentos.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Primeros Pasos */}
                <div id="primeros-pasos" className="mt-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <Zap className="size-6 mr-2 text-blue-600 dark:text-blue-400" />
                    Primeros pasos
                  </h2>

                  <h3 className="text-xl font-bold mb-4">
                    Registro e inicio de sesión
                  </h3>

                  <ol className="space-y-6">
                    <li className="flex items-start">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 size-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="font-medium">Crear una cuenta</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Visita nuestra página principal y haz clic en
                          &quot;Registrarse&quot;. Completa el formulario con tu
                          información y sigue las instrucciones para verificar
                          tu cuenta.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 size-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="font-medium">Iniciar sesión</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Una vez registrado, utiliza el botón &quot;Iniciar sesión&quot;
                          e introduce tus credenciales. Al autenticarte
                          correctamente, serás redirigido automáticamente al
                          Dashboard.
                        </p>
                      </div>
                    </li>
                  </ol>

                  <h3 className="text-xl font-bold mt-8 mb-4">
                    Navegación principal
                  </h3>

                  <p>
                    Después de iniciar sesión, accederás al Dashboard que
                    contiene:
                  </p>

                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-3 flex-shrink-0">
                        <FileText className="size-5" />
                      </span>
                      <div>
                        <p className="font-medium">Barra lateral</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Menú de navegación para acceder a las diferentes
                          secciones de la plataforma.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-3 flex-shrink-0">
                        <Edit className="size-5" />
                      </span>
                      <div>
                        <p className="font-medium">Dashboard</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Resumen de tus actividades y documentos recientes.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-3 flex-shrink-0">
                        <FileText className="size-5" />
                      </span>
                      <div>
                        <p className="font-medium">Mis Documentos</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Lista completa de tus documentos.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-3 flex-shrink-0">
                        <Share2 className="size-5" />
                      </span>
                      <div>
                        <p className="font-medium">Compartidos</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Documentos que otros usuarios han compartido contigo.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-3 flex-shrink-0">
                        <Copy className="size-5" />
                      </span>
                      <div>
                        <p className="font-medium">Plantillas</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Biblioteca de plantillas para diferentes tipos de
                          documentos.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Gestión de documentos */}
                <div id="documentos" className="mt-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <FileText className="size-6 mr-2 text-blue-600 dark:text-blue-400" />
                    Gestión de documentos
                  </h2>

                  <h3 className="text-xl font-bold mb-4">
                    Crear un nuevo documento
                  </h3>

                  <p>Tienes tres formas de crear documentos:</p>

                  <div className="bg-white dark:bg-zinc-800 shadow-sm rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-700 mt-6 mb-8">
                    <div className="p-6 border-b border-gray-100 dark:border-zinc-700">
                      <h4 className="text-lg font-bold mb-2 flex items-center">
                        <FileText className="size-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Desde cero
                      </h4>
                      <ol className="space-y-1 ml-6 list-decimal text-gray-600 dark:text-gray-300">
                        <li>
                          Haz clic en &quot;Nuevo documento&quot; en el Dashboard o en la
                          sección &quot;Mis Documentos&quot;.
                        </li>
                        <li>
                          Rellena los campos del formulario (título, tipo,
                          descripción, etc.).
                        </li>
                        <li>
                          Escribe o pega el contenido del documento en el
                          editor.
                        </li>
                        <li>Haz clic en &quot;Crear documento&quot; para guardar.</li>
                      </ol>
                    </div>

                    <div className="p-6 border-b border-gray-100 dark:border-zinc-700">
                      <h4 className="text-lg font-bold mb-2 flex items-center">
                        <Copy className="size-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Desde una plantilla
                      </h4>
                      <ol className="space-y-1 ml-6 list-decimal text-gray-600 dark:text-gray-300">
                        <li>Navega a la sección &quot;Plantillas&quot;.</li>
                        <li>
                          Selecciona la plantilla adecuada para tu necesidad.
                        </li>
                        <li>Haz clic en &quot;Usar plantilla&quot;.</li>
                        <li>Personaliza el contenido según sea necesario.</li>
                        <li>Guarda el documento.</li>
                      </ol>
                    </div>

                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2 flex items-center">
                        <Sparkles className="size-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Con asistencia de IA
                      </h4>
                      <ol className="space-y-1 ml-6 list-decimal text-gray-600 dark:text-gray-300">
                        <li>
                          Al crear un nuevo documento, haz clic en &quot;Generar con
                          IA&quot;.
                        </li>
                        <li>
                          Describe el documento que necesitas (tipo, partes
                          involucradas, términos específicos, etc.).
                        </li>
                        <li>
                          La IA generará un borrador completo basado en tu
                          descripción.
                        </li>
                        <li>
                          Revisa y edita el contenido según sea necesario antes
                          de guardar.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mt-10 mb-4">
                    Editar documentos
                  </h3>

                  <ol className="space-y-2 ml-6 list-decimal">
                    <li>
                      Busca el documento en &quot;Mis Documentos&quot; o en el Dashboard.
                    </li>
                    <li>Haz clic en el botón &quot;Editar&quot;.</li>
                    <li>
                      Realiza los cambios necesarios en el contenido, metadatos
                      o etiquetas.
                    </li>
                    <li>Haz clic en &quot;Guardar cambios&quot;.</li>
                  </ol>

                  <p className="mt-4">
                    Cada vez que editas un documento, se crea automáticamente
                    una nueva versión que puedes consultar en el historial.
                  </p>

                  <h3 className="text-xl font-bold mt-10 mb-4">
                    Control de versiones
                  </h3>

                  <p>El sistema de versiones te permite:</p>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                      <div className="flex items-center gap-2 mb-3">
                        <History className="size-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-bold">Ver el historial completo</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Accede a la pestaña &quot;Historial de versiones&quot; dentro de
                        un documento.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="size-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-bold">Comparar versiones</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Selecciona dos versiones diferentes para ver los cambios
                        entre ellas.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="size-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-bold">Restaurar versiones</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Vuelve a una versión anterior si es necesario.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mt-10 mb-4">
                    Etiquetar documentos
                  </h3>

                  <p>Las etiquetas ayudan a organizar tus documentos:</p>

                  <ol className="space-y-2 ml-6 list-decimal mt-4">
                    <li>
                      Al crear o editar un documento, añade etiquetas en el
                      campo correspondiente.
                    </li>
                    <li>
                      Puedes escribir etiquetas manualmente o usar la función
                      &quot;Sugerir&quot; para que el sistema proponga etiquetas basadas
                      en el contenido.
                    </li>
                    <li>
                      Utiliza las etiquetas para filtrar y buscar documentos más
                      fácilmente.
                    </li>
                  </ol>
                </div>

                <div className="fixed bottom-8 right-8">
                  <Link href="#introduccion">
                    <Button
                      className="rounded-full size-12"
                      aria-label="Volver arriba"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </Button>
                  </Link>
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
