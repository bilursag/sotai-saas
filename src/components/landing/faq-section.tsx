import React from "react";

const FaqSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Respuestas a las dudas más comunes sobre Sotai Docs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-3">
              ¿Los documentos generados son legalmente válidos en Chile?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sí, todos nuestros documentos están diseñados conforme a la
              legislación chilena vigente. Sin embargo, para asuntos legales
              complejos, siempre recomendamos la revisión de un profesional.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">
              ¿Cómo funciona la asistencia con IA?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nuestra IA está entrenada con miles de documentos legales
              chilenos. Solo describe lo que necesitas en lenguaje natural, y
              ella generará un documento profesional adaptado a tus
              requerimientos.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">
              ¿Puedo personalizar las plantillas?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Absolutamente. Todas nuestras plantillas son completamente
              editables y puedes adaptarlas a tus necesidades específicas antes
              de guardarlas o compartirlas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">
              ¿Es segura mi información?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tu privacidad es nuestra prioridad. Utilizamos cifrado de nivel
              bancario y cumplimos con todas las normativas chilenas de
              protección de datos. Nunca compartimos tu información con
              terceros.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">
              ¿Puedo cancelar mi suscripción en cualquier momento?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sí, puedes cancelar tu suscripción cuando quieras. No hay
              contratos de permanencia ni cargos ocultos.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">
              ¿Ofrecen algún tipo de soporte?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Todos nuestros planes incluyen soporte por correo electrónico. Los
              planes Profesional y Empresarial cuentan con soporte prioritario y
              asistencia personalizada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
