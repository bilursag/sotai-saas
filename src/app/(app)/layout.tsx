import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ThemeProvider } from "@/components/theme-provider";
import { AppLayout } from "@/components/layout/app-layout";
import { SyncUser } from "@/components/auth/sync-user";

export const metadata = {
  title: "Sotai - Documentos legales con IA",
  description:
    "Plataforma para generar y gestionar documentos legales con inteligencia artificial",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <SyncUser>
      <div className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </div>
    </SyncUser>
  );
}
