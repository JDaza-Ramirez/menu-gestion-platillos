// -------------------- SELECTORES --------------------
const selectCategoria = document.getElementById("input-categoria");
const form = document.getElementById("formulario");
const menuContainer = document.getElementById("menu");
const filtrosContainer = document.getElementById("filtros");

// Renderizado de las opciones del select
export function renderizarOpcionesCategoria(categorias = []) {
  // Limpiamos cada vez que se llama la funcion
  selectCategoria.innerHTML = "";
  selectCategoria.innerHTML =
    '<option value="">seleccione una Categoría</option>';

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria.toUpperCase();
    selectCategoria.append(option);
  });
}

// Creación de de los botones filtro de las categorias
function crearBotones(elemento) {
  const button = document.createElement("button");
  button.dataset.categoria = elemento;
  button.textContent = elemento;

  return button;
}

// Renderizado de los botones filtro
export function renderizarBotones(lista) {
  // Limpiamos cada vez que se llama la funcion
  filtrosContainer.innerHTML = "";

  lista.forEach((categoria) =>
    filtrosContainer.append(crearBotones(categoria)),
  );
}

// Agregar y quitar clase .activo de los botones filto
export function claseCtrl(boton) {
  const SelectBotones = filtrosContainer.querySelectorAll("button");
  SelectBotones.forEach((selectBoton) =>
    selectBoton.classList.remove("activo"),
  );
  boton.classList.add("activo");
}

// Creación de las tarjetas del menu
function crearTarjeta(platillo) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");
  tarjeta.dataset.categoria = platillo.categoria;
  tarjeta.dataset.id = platillo.id;

  if (!platillo.disponible) tarjeta.classList.add("agotado");

  const titulo = document.createElement("h3");
  titulo.textContent = platillo.nombre;

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.textContent = "Precio: $" + platillo.precio.toLocaleString("es-CO");

  const categoria = document.createElement("p");
  categoria.classList.add("categoria");
  categoria.textContent = platillo.categoria;

  const badge = document.createElement("span");
  badge.classList.add("badge");
  badge.textContent = platillo.disponible ? "Disponible" : "Agotado";

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("quitar");
  buttonDelete.textContent = "x";

  tarjeta.append(buttonDelete, titulo, precio, categoria, badge);
  return tarjeta;
}

// Renderizado de las tarjeta del menu
export function renderizarPlatillos(lista = []) {
  // Limpiamos cada vez que se llama la funcion
  menuContainer.innerHTML = "";

  lista.forEach((platillo) => menuContainer.append(crearTarjeta(platillo)));
}

export function initUI({ onAdd, onDelete, onFilter }) {
  form.addEventListener("submit", (e) => {
    try {
      e.preventDefault();

      const nombre = document.getElementById("input-nombre").value;
      const precio = document.getElementById("input-precio").value;
      const categoria = document.getElementById("input-categoria").value;

      const ok = onAdd({ nombre, precio, categoria });

      e.target.reset();
    } catch (error) {
      console.log(error.message);
    }
  });

  menuContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("quitar")) {
      const id = e.target.parentElement.dataset.id;
      onDelete(id);
    }
  });

  filtrosContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const categoria = e.target.dataset.categoria;
      claseCtrl(e.target);
      onFilter(categoria);
    }
  });
}
