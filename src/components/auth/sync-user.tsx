"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface SyncUserProps {
  children: React.ReactNode;
}

export function SyncUser({ children }: SyncUserProps) {
  const { user, isLoaded } = useUser();
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncUserWithDatabase = async () => {
      if (isLoaded && user && !isSynced) {
        try {
          const response = await fetch("/api/users/sync", {
            method: "POST",
          });

          if (response.ok) {
            setIsSynced(true);
          }
        } catch (error) {
          console.error("Error al sincronizar usuario:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (isLoaded && !user) {
        setIsLoading(false);
      }
    };

    syncUserWithDatabase();
  }, [user, isLoaded, isSynced]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
