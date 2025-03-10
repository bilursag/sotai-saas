"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Gestión Centralizada de Suscripciones",
    description:
      "Administra todas tus suscripciones en un solo lugar. Obtén una visión clara de los pagos, vencimientos y renovaciones para evitar cargos inesperados y optimizar tu presupuesto. Con nuestra plataforma, mantén el control total sobre tus gastos recurrentes.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Gestión de Suscripciones
      </div>
    ),
  },
  {
    title: "Automatización de Pagos y Facturación",
    description:
      "Evita preocupaciones con la automatización de pagos y generación de facturas. Nuestro sistema se encarga de los recordatorios, cobros y emisión de documentos, asegurando transparencia y cumplimiento sin esfuerzo.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/billing.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Automatización de Facturación"
        />
      </div>
    ),
  },
  {
    title: "Control de Usuarios y Permisos",
    description:
      "Define roles y permisos para cada miembro de tu equipo. Nuestra plataforma te permite gestionar accesos y mantener la seguridad de la información, asegurando que cada usuario tenga solo las funciones que necesita.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Control de Usuarios
      </div>
    ),
  },
  {
    title: "Generación Automática de Documentos",
    description:
      "Crea contratos y documentos legales personalizados en minutos. Con nuestra herramienta de automatización, puedes generar y firmar digitalmente documentos sin complicaciones, agilizando procesos y reduciendo errores.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Documentos Automáticos
      </div>
    ),
  },
];

export function StickyContent() {
  return (
    <div className="py-20">
      <StickyScroll content={content} />
    </div>
  );
}
