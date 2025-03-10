"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export function CTASection() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-4xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        La forma más rápida y fácil de generar {" "}
        <Highlight className="text-black dark:text-white">
          documentos legales con IA.
        </Highlight>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Desde contratos hasta acuerdos personalizados, nuestra plataforma con IA automatiza la redacción, revisión y firma de documentos legales sin esfuerzo.
        </p>
      </motion.h1>
    </HeroHighlight>
  );
}
