"use client";

import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MoreVertical, 
  Clock, 
  Edit, 
  Eye, 
  Download, 
  Copy, 
  Trash2,
  Sparkles 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  tags: string[];
  aiGenerated: boolean;
}

interface DocumentCardProps {
  document: Document;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function DocumentCard({ document, onView, onEdit, onDelete }: DocumentCardProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completado": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "En revisión": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Borrador": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {document.type}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mt-1 -mr-2">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="size-4 mr-2" />
                <span>Ver documento</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="size-4 mr-2" />
                <span>Editar documento</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="size-4 mr-2" />
                <span>Descargar PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4 mr-2" />
                <span>Duplicar documento</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="size-4 mr-2" />
                <span>Eliminar documento</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="line-clamp-2">{document.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Clock className="size-3" />
          <span>Actualizado: {formatDate(document.updatedAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <FileText className="size-4" />
          <span>{document.pages} páginas</span>
          {document.aiGenerated && (
            <Badge variant="secondary" className="flex items-center gap-1 ml-auto">
              <Sparkles className="size-3" />
              <span>IA</span>
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {document.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-muted/40">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-3 border-t">
        <Badge className={getStatusColor(document.status)}>
          {document.status}
        </Badge>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={onView}>
            Ver
          </Button>
          <Button size="sm" onClick={onEdit}>
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}