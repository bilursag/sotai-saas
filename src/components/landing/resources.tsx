import React from "react";
import { ArrowRight, Award, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Resources = () => {
  return (
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
            <Link href="/coming-soon">
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
            <Link href="/coming-soon">
              <Button variant="outline" className="w-full">
                Ver consejos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
