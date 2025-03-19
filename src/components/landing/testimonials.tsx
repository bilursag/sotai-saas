import React from "react";

const Testimonials = () => {
  return (
    <>
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
                &quot;Sotai Docs ha transformado mi práctica legal. Puedo
                generar contratos de alta calidad en minutos, lo que me permite
                dedicar más tiempo a mis clientes.&quot;
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
    </>
  );
};

export default Testimonials;
