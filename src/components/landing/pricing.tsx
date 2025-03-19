import React from "react";
import { SignUpButton } from "@clerk/nextjs";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

const Pricing = () => {
  return (
    <>
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
                <span className="text-4xl font-bold">$19.990</span>
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
                <span className="text-4xl font-bold">$49.990</span>
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
    </>
  );
};

export default Pricing;
