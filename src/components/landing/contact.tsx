import React from "react";
import { Award, Shield, Users } from "lucide-react";
import { Button } from "../ui/button";

const Contact = () => {
  return (
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
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-transparent"
                    placeholder="tu@correoelectronico.com"
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
  );
};

export default Contact;
