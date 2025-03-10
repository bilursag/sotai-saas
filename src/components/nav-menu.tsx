/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Inicio",
    href: "/",
    description: "Explora nuestra plataforma y descubre cómo generar documentos legales con IA de forma rápida y segura.",
  },
  {
    title: "Generador de Documentos",
    href: "/docs/generador",
    description: "Crea documentos legales personalizados en minutos mediante un flujo guiado e intuitivo.",
  },
  {
    title: "Plantillas",
    href: "/docs/plantillas",
    description: "Accede a una colección de plantillas legales optimizadas para distintos usos y personalízalas según tus necesidades.",
  },
  {
    title: "Firma Digital",
    href: "/docs/firma-digital",
    description: "Firma electrónicamente tus documentos o envíalos para su firma de manera segura y legal.",
  },
  {
    title: "Historial y Versiones",
    href: "/docs/historial",
    description: "Consulta versiones anteriores de tus documentos y restaura cambios fácilmente.",
  },
  {
    title: "Soporte",
    href: "/docs/soporte",
    description: "Encuentra respuestas a tus preguntas o contacta con nuestro equipo de asistencia.",
  },
];

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Comenzar</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Sotai Docs</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Plataforma para generar documentos legales con IA de forma rápida y segura.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introducción">
                Aprende cómo funciona la plataforma y qué puedes hacer con ella.
              </ListItem>
              <ListItem href="/docs/installation" title="Primeros Pasos">
                Configura tu cuenta y empieza a generar documentos legales en minutos.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Plantillas Disponibles">
                Explora y personaliza plantillas legales listas para usar.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explorar</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentación
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
