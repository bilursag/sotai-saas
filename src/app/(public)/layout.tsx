import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Sotai - Documentos legales inteligentes",
  description:
    "Plataforma líder para generar y gestionar documentos legales con inteligencia artificial",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>{children}</main>
    </ThemeProvider>
  );
}
