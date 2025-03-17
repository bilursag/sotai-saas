/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Users,
  UserPlus,
  Edit,
  Eye,
  Loader2,
  Trash2,
  AlertCircle,
  Mail,
  Check,
} from "lucide-react";

import {
  shareDocumentWithUser,
  getDocumentSharedUsers,
  updateDocumentSharePermission,
  revokeDocumentShare,
} from "@/services/document-share-service";

interface DocumentShareDialogProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface SharedUser {
  id: string;
  email: string;
  name?: string;
  permission: string;
  shareId: string;
}

export function DocumentShareDialog({
  documentId,
  isOpen,
  onClose,
}: DocumentShareDialogProps) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shareIdBeingModified, setShareIdBeingModified] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (isOpen && documentId) {
      loadSharedUsers();
    }
  }, [isOpen, documentId]);

  const loadSharedUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await getDocumentSharedUsers(documentId);
      setSharedUsers(users);
    } catch (err) {
      console.error("Error al cargar usuarios compartidos:", err);
      setError("No se pudieron cargar los usuarios con acceso al documento");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!email.trim()) {
      setError("Por favor, ingresa un correo electrónico");
      return;
    }

    try {
      setIsSharing(true);
      setError(null);
      setSuccess(null);

      await shareDocumentWithUser(documentId, { email, permission });

      setSuccess(`Documento compartido con ${email} exitosamente`);
      setEmail("");

      await loadSharedUsers();
    } catch (err: any) {
      console.error("Error al compartir documento:", err);
      setError(err.message || "Error al compartir documento");
    } finally {
      setIsSharing(false);
    }
  };

  const handleUpdatePermission = async (
    shareId: string,
    newPermission: "view" | "edit"
  ) => {
    try {
      setShareIdBeingModified(shareId);
      await updateDocumentSharePermission(documentId, shareId, newPermission);

      setSharedUsers((prev) =>
        prev.map((user) =>
          user.shareId === shareId
            ? { ...user, permission: newPermission }
            : user
        )
      );
    } catch (err: any) {
      console.error("Error al actualizar permisos:", err);
      setError(err.message || "Error al actualizar permisos");
    } finally {
      setShareIdBeingModified(null);
    }
  };

  const handleRevokeAccess = async (shareId: string) => {
    try {
      setShareIdBeingModified(shareId);
      await revokeDocumentShare(documentId, shareId);

      setSharedUsers((prev) => prev.filter((user) => user.shareId !== shareId));
    } catch (err: any) {
      console.error("Error al revocar acceso:", err);
      setError(err.message || "Error al revocar acceso");
    } finally {
      setShareIdBeingModified(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Compartir documento
          </DialogTitle>
          <DialogDescription>
            Comparte este documento con otros usuarios para colaborar
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <Check className="size-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-600 dark:text-green-400">
              Éxito
            </AlertTitle>
            <AlertDescription className="text-green-600 dark:text-green-400">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <Input
              placeholder="Correo electrónico del usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-span-3">
            <Select
              value={permission}
              onValueChange={(value: "view" | "edit") => setPermission(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Permiso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">Solo lectura</SelectItem>
                <SelectItem value="edit">Editar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Button
              onClick={handleShare}
              disabled={isSharing || !email.trim()}
              className="w-full"
            >
              {isSharing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <UserPlus className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">Usuarios con acceso</h3>
          {isLoading ? (
            <div className="text-center py-4">
              <Loader2 className="size-8 mx-auto animate-spin mb-2" />
              <p className="text-sm text-muted-foreground">
                Cargando usuarios...
              </p>
            </div>
          ) : sharedUsers.length === 0 ? (
            <div className="text-center py-4 bg-muted/20 rounded-md">
              <Users className="size-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Este documento no ha sido compartido con nadie aún
              </p>
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Permisos</TableHead>
                    <TableHead className="w-20 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedUsers.map((user) => (
                    <TableRow key={user.shareId}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {user.name || "Usuario"}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="size-3" />
                            {user.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {shareIdBeingModified === user.shareId ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Select
                            value={user.permission}
                            onValueChange={(value: "view" | "edit") =>
                              handleUpdatePermission(user.shareId, value)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue>
                                {user.permission === "view" ? (
                                  <div className="flex items-center gap-1">
                                    <Eye className="size-3" />
                                    <span>Solo lectura</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <Edit className="size-3" />
                                    <span>Editar</span>
                                  </div>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view">
                                <div className="flex items-center gap-1">
                                  <Eye className="size-4" />
                                  <span>Solo lectura</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="edit">
                                <div className="flex items-center gap-1">
                                  <Edit className="size-4" />
                                  <span>Editar</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell className="w-20 text-right">
                        {shareIdBeingModified === user.shareId ? (
                          <Loader2 className="size-4 animate-spin ml-auto" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRevokeAccess(user.shareId)}
                            className="ml-auto size-8 text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
