"use client";

import { useState, useEffect } from "react";
import { Users, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { getDocumentSharedUsers } from "@/services/document-share-service";

interface SharedDocumentIndicatorProps {
  documentId: string;
  onOpenShareDialog: () => void;
}

interface SharedUser {
  id: string;
  email: string;
  name?: string;
  permission: string;
  shareId: string;
}

export function SharedDocumentIndicator({
  documentId,
  onOpenShareDialog,
}: SharedDocumentIndicatorProps) {
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const users = await getDocumentSharedUsers(documentId);
        setSharedUsers(users);
      } catch (err) {
        console.error("Error al cargar usuarios compartidos:", err);
        setError("Error al cargar colaboradores");
      } finally {
        setIsLoading(false);
      }
    };

    if (documentId) {
      loadSharedUsers();
    }
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        <span className="text-xs">Cargando colaboradores...</span>
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (sharedUsers.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 h-8"
        onClick={onOpenShareDialog}
      >
        <Users className="size-4" />
        <span>Compartir</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="flex items-center gap-1 px-2 py-1 h-8 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
      >
        <Users className="size-3 mr-1" />
        <span>Compartido con {sharedUsers.length}</span>
      </Badge>

      <div className="flex -space-x-2">
        <TooltipProvider>
          {sharedUsers.slice(0, 3).map((user) => (
            <Tooltip key={user.id}>
              <TooltipTrigger asChild>
                <Avatar className="size-8 border-2 border-background">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user.name
                      ? `${user.name.split(" ")[0][0]}${
                          user.name.split(" ")[1]?.[0] || ""
                        }`
                      : user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  <p className="font-medium">{user.name || "Usuario"}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-muted-foreground">
                    Permiso:{" "}
                    {user.permission === "edit" ? "Edición" : "Lectura"}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>

        {sharedUsers.length > 3 && (
          <Avatar className="size-8 border-2 border-background">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
              +{sharedUsers.length - 3}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        onClick={onOpenShareDialog}
      >
        <Users className="size-4" />
      </Button>
    </div>
  );
}
