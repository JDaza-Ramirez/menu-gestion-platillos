import { platillos, CATEGORIAS_VALIDAS } from "./data/platillos.js";
import Platillo from "./models/platillo.js";
import { guardarPlatillo, obtenerPlatillos } from "./services/storage.js";
import {
  renderizarOpcionesCategoria,
  renderizarBotones,
  renderizarPlatillos,
  initUI,
  claseCtrl,
} from "./ui/render.js";

// -------------------- ESTADO --------------------
let estadoPlatillos = [];
let categoriaActiva = "todos";

// -------------------- SELECTORES --------------------
const categoriasConTodos = ["todos", ...CATEGORIAS_VALIDAS];

// -------------------- FILTRO --------------------
function filtrarPorCategoria(categoria) {
  if (categoria === "todos") return estadoPlatillos;

  return estadoPlatillos.filter((p) => p.categoria === categoria);
}

// -------------------- INIT --------------------
function init() {
  const data = obtenerPlatillos();
  const source = data.length > 0 ? data : platillos;

  estadoPlatillos = source.map(
    (p) => new Platillo(p.id, p.nombre, p.precio, p.categoria, p.disponible),
  );

  renderizarOpcionesCategoria(CATEGORIAS_VALIDAS);
  renderizarBotones(categoriasConTodos);

  renderizarPlatillos(estadoPlatillos);
  categoriaActiva = "todos";
  const btnActivo = document.querySelector('[data-categoria="todos"]');
  if (btnActivo) claseCtrl(btnActivo);
}

// -------------------- UI EVENTS --------------------
initUI({
  onAdd: ({ nombre, precio, categoria }) => {
    const nuevo = new Platillo(crypto.randomUUID(), nombre, precio, categoria);

    estadoPlatillos.push(nuevo);

    guardarPlatillo(estadoPlatillos.map((p) => p.toObject()));

    renderizarPlatillos(filtrarPorCategoria(categoriaActiva));
  },

  onDelete: (id) => {
    estadoPlatillos = estadoPlatillos.filter((p) => p.id !== id);

    guardarPlatillo(estadoPlatillos.map((p) => p.toObject()));

    renderizarPlatillos(filtrarPorCategoria(categoriaActiva));
  },

  onFilter: (categoria) => {
    categoriaActiva = categoria;
    renderizarPlatillos(filtrarPorCategoria(categoria));
  },
});

// -------------------- START --------------------
document.addEventListener("DOMContentLoaded", init);
