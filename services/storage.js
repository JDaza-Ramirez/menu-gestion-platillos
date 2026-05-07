const storageKey = "platillos";

export function guardarPlatillo(dataCompleta) {
  localStorage.setItem(storageKey, JSON.stringify(dataCompleta));
}

export function obtenerPlatillos() {
  let platillosGuardados = localStorage.getItem(storageKey);

  return platillosGuardados ? JSON.parse(platillosGuardados) : [];
}
