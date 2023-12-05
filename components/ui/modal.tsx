"use client"; // Directiva para el entorno de ejecución.

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"; // Importa los componentes necesarios para construir el modal desde un directorio específico.

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
} // Define las propiedades que se esperan para el componente Modal.

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }; // Define una función onChange que se ejecutará cuando cambie el estado del modal.

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  ); // Devuelve la estructura del modal con el título, la descripción y el contenido que se le pasa como children.
};
