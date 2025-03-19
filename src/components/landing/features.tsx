import React from "react";
import {
  Clock,
  FileText,
  LineChart,
  LockKeyhole,
  Users,
  Zap,
} from "lucide-react";

const Features = () => {
  return (
    <>
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
    </>
  );
};

export default Features;
