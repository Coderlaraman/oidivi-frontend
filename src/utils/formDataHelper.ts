/**
 * Crear un objeto FormData combinando datos y archivos.
 *
 * @param data Datos básicos a enviar.
 * @param files Archivos a incluir en el FormData.
 * @returns FormData listo para enviar.
 */
export const createFormData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  files: Record<string, File | null>
): FormData => {
  const formData = new FormData();

  // Agregar datos básicos
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Agregar archivos
  Object.entries(files).forEach(([key, file]) => {
    if (file) {
      formData.append(key, file);
    }
  });

  return formData;
};
