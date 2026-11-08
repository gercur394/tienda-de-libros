// Convierte un texto en una versión apta para URL.
export const slugify = (text) =>
  text
    .toLowerCase()                    // todo en minúsculas
    .normalize("NFD")                 // separa cada letra de su tilde ("ó" → "o" + tilde)
    .replace(/[\u0300-\u036f]/g, "")  // elimina esas tildes sueltas
    .trim()                           // saca espacios sobrantes en los bordes
    .replace(/\s+/g, "-")             // reemplaza los espacios por guiones