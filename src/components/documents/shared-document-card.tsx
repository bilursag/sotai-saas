"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, Eye, Wand2, UserCircle } from "lucide-react";

interface SharedDocumentCardProps {
  document: {
    id: string;
    title: string;
    type: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    aiGenerated?: boolean;
    tags: { id: string; name: string }[];
    permission: "view" | "edit";
    sharedBy: {
      id: string;
      name?: string;
      email: string;
    };
  };
  onView: () => void;
  onEdit: () => void;
}

export function SharedDocumentCard({
  document,
  onView,
  onEdit,
}: SharedDocumentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "en_revision":
      case "en revisión":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "borrador":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{document.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <UserCircle className="size-3" />
              <span>
                Compartido por:{" "}
                {document.sharedBy.name || document.sharedBy.email}
              </span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(document.status)}>
            {document.status.charAt(0).toUpperCase() +
              document.status.slice(1).replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>Actualizado: {formatDate(document.updatedAt)}</span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-muted/40">
              {document.type}
            </Badge>

            <Badge
              variant="outline"
              className={
                document.permission === "edit"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
              }
            >
              {document.permission === "edit" ? (
                <div className="flex items-center gap-1">
                  <Edit className="size-3" />
                  <span>Edición</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Eye className="size-3" />
                  <span>Lectura</span>
                </div>
              )}
            </Badge>

            {document.aiGenerated && (
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              >
                <Wand2 className="size-3 mr-1" />
                <span>IA</span>
              </Badge>
            )}
          </div>

          {document.tags && document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {document.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{document.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2 border-t">
        <Button variant="outline" size="sm" className="flex-1" onClick={onView}>
          <Eye className="size-4 mr-2" />
          Ver
        </Button>

        {document.permission === "edit" && (
          <Button size="sm" className="flex-1" onClick={onEdit}>
            <Edit className="size-4 mr-2" />
            Editar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
