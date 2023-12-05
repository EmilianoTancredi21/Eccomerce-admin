"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false); // Declara un estado local llamado isMounted y una función para actualizarlo llamada setIsMounted, inicializado en false.

  useEffect(() => {
    setIsMounted(true); // Utiliza useEffect para cambiar el estado de isMounted a true cuando el componente se monta.
  }, []); // El segundo argumento de useEffect es un array vacío, lo que significa que el efecto se ejecutará solo una vez, cuando el componente se monte.

  if (!isMounted) {
    return null; // Si el componente no se ha montado todavía, devuelve null, lo que significa que el componente no renderizará nada.
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
