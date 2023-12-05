import { create } from "zustand"; // Importa la función create de la librería "zustand" para crear un store personalizado.

interface useStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
} // Define la interfaz para el store del modal, que incluye un booleano isOpen y dos funciones onOpen y onClose.

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }), // Define la función onOpen que actualiza el estado isOpen a true.
  onClose: () => set({ isOpen: false }), // Define la función onClose que actualiza el estado isOpen a false.
}));
