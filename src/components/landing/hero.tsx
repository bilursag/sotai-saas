import React from "react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { Clock, Sparkles } from "lucide-react";

const Hero = () => {
  return (
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
  );
};

export default Hero;
