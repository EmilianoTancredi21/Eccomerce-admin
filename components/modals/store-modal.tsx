"use client";

import * as z from "zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Define el esquema de validación del formulario utilizando Zod
const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "El nombre debe tener al menos 5 caracteres." }), // El campo "name" debe ser una cadena de al menos 5 caracteres
});

// Componente funcional que representa el modal para crear una tienda
export const StoreModal = () => {
  const storeModal = useStoreModal(); // Obtiene el estado y las funciones del modal desde el hook useStoreModal

  const [loading, setLoading] = useState(false); // Inicializa el estado local "loading" con el valor inicial de "false"

  // Crea un formulario controlado utilizando el hook useForm de react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Utiliza el resolver zod para la validación del formulario
    defaultValues: {
      name: "", // Establece el valor inicial del campo "name" como una cadena vacía
    },
  });

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true); // Establece el estado de "loading" como "true"

      // Realiza una solicitud POST a "/api/stores" utilizando Axios con los valores del formulario
      const response = await axios.post("/api/stores", values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Algo salió mal..."); // Muestra un mensaje de error utilizando la librería toast
    } finally {
      setLoading(false); // Restablece el estado de "loading" a "false"
    }
  };

  // Renderiza el componente Modal que muestra un formulario para crear una tienda
  return (
    <Modal
      title="Crear tienda"
      description="Agregar una nueva tienda"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={storeModal.onClose}
                >
                  Cancelar
                </Button>
                <Button disabled={loading} type="submit">
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
