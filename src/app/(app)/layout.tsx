import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardNavbar from "@/components/dashboard/navbar";
import { SyncUser } from "@/components/auth/sync-user";

export const metadata = {
  title: "Sotai - Documentos legales con IA",
  description:
    "Plataforma para generar y gestionar documentos legales con inteligencia artificial",
};

export default async function AppLayout({
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
          <DashboardNavbar />
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </div>
    </SyncUser>
  );
}
