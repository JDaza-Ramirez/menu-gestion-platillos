import { CATEGORIAS_VALIDAS } from "../data/platillos.js";

export default class Platillo {
  #id;
  #nombre;
  #precio = 0;
  #categoria;
  #disponible;

  constructor(id, nombre, precio, categoria, disponible = true) {
    this.#id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.#disponible = disponible;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nuevoNombre) {
    const reglas = /^[a-zA-ZÁ-ÿ\s]+$/;

    if (nuevoNombre.length < 4) {
      throw new Error("Nombre debe tener minimo 4 caracteres");
    }

    if (nuevoNombre.length > 40) {
      throw new Error("Maximo 40 caracteres para el nombre");
    }

    if (!reglas.test(nuevoNombre)) {
      throw new Error("nombre solo puede tener letras");
    }

    this.#nombre = nuevoNombre;
  }

  get precio() {
    return this.#precio;
  }

  set precio(nuevoPrecio) {
    const reglas = /^[0-9]+$/;

    nuevoPrecio = nuevoPrecio.toString().replaceAll(".", "");

    if (!reglas.test(nuevoPrecio)) {
      throw new Error(
        "El precio solo debe tener numeros sin letras ni caracteres especiales (,+-$*_)",
      );
    }

    nuevoPrecio = parseInt(nuevoPrecio, 10);

    if (nuevoPrecio < 8000) {
      throw new Error("El platillo debe costar minimo 8000");
    }

    this.#precio = nuevoPrecio;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(nuevaCategoria = "") {
    const categoriaFormat = nuevaCategoria.toLocaleLowerCase().trim();

    if (!CATEGORIAS_VALIDAS.includes(categoriaFormat)) {
      throw new Error(
        `Categoria elegida invalida. Categorias disponibles: ${CATEGORIAS_VALIDAS.join("-")}`,
      );
    }

    this.#categoria = categoriaFormat;
  }

  get disponible() {
    return this.#disponible;
  }

  toObject() {
    return {
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
      categoria: this.categoria,
      disponible: this.disponible,
    };
  }
}
