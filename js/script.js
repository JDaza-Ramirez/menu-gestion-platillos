let platillos = [
    { id: 1, nombre: "Lomo al vino", precio: 45000, categoria: "carnes", disponible: true },
    { id: 2, nombre: "Salmón a la plancha", precio: 58000, categoria: "pescados", disponible: true },
    { id: 3, nombre: "Pasta carbonara", precio: 28000, categoria: "pastas", disponible: false },
    { id: 4, nombre: "Tiramisú", precio: 18000, categoria: "postres", disponible: true },
    { id: 5, nombre: "Costillas BBQ", precio: 52000, categoria: "carnes", disponible: true },
    { id: 6, nombre: "Ensalada César", precio: 22000, categoria: "ensaladas", disponible: true }
];

// -------------------- SELECTORES -------------------- 

const form = document.getElementById('formulario');
const nombre = document.getElementById('input-nombre');
const precio = document.getElementById('input-precio');
const selectCategoria = document.getElementById('input-categoria');
const storageKey = 'platillos';
const filtrosContainer = document.getElementById('filtros');
const categorias = platillos.map((categoria) => categoria.categoria);
const categoriasFiltrada = categorias.filter((platillo, item) => categorias.indexOf(platillo) === item);
const categoriasConTodos = ['todos', ...categoriasFiltrada];
const menuContainer = document.getElementById('menu');




// -------------------- VALIDACIONES --------------------

// Validación del nombre del platillo
function validateName() {

    const reglas = /^[a-zA-ZÁ-ÿ\s]+$/;

    if (nombre.value.length < 4) {
        console.log('Nombre debe tener minimo 4 caracteres');
        return false;
    }

    if (nombre.value.length > 40) {
        console('Maximo 40 caracteres para el nombre');
        return false;
    }

    if (!reglas.test(nombre.value)) {
        console.log('nombre solo puede tener letras');
        return false;
    }
    return true;
};

// Validación del precio del platillo
function validatePrecio() {
    const reglas = /^[0-9]+$/;

    if (!reglas.test(precio.value)) {
        console.log('El precio solo debe tener numeros');
        return false;
    };

    if (precio.value < 8000) {
        console.log('El platillo debe costar minimo 8000');
        return false;
    };

    return true;
};

// Renderizado de las opciones del select
function renderizarOpcionesCategoria() {
    categoriasFiltrada.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria.toUpperCase();
        selectCategoria.append(option);
    });
}

// Validadcion para que se eliga una categoria
function validateCategoria() {
    if (selectCategoria.value === "") {
        console.log('Elige una categoria');
        return false;
    };

    return true;
};

function platilloGenerado(nombreValor, precioValor, categoriaValor) {
    const maxId = platillos.length > 0 ? Math.max(...platillos.map(p => p.id)) : 0;
    const nuevoId = maxId + 1;
    const nuevoPlatillo = { id: nuevoId, nombre: nombreValor, precio: parseInt(precioValor), categoria: categoriaValor, disponible: true };
    return nuevoPlatillo;
};

function guardarPlatillo() {
    localStorage.setItem(storageKey, JSON.stringify(platillos));
};

// Creación de de los botones filtro de las categorias
function crearBotones(elemento) {
    const button = document.createElement('button');
    button.dataset.categoria = elemento;
    button.textContent = elemento;

    return button;
};

// Renderizado de los botones filtro
function renderizarBotones(lista) {
    filtrosContainer.innerHTML = '';
    lista.forEach(categoria => filtrosContainer.appendChild(crearBotones(categoria)));
};

// Agregar y quitar clase .activo de los botones filto
function claseCtrl(elemento) {
    const SelectBotones = filtrosContainer.querySelectorAll('button');
    SelectBotones.forEach(e => e.classList.remove('activo'));
    elemento.classList.add('activo');
};

// Creación de las tarjetas del menu
function crearTarjeta(platillo) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');
    tarjeta.dataset.categoria = platillo.categoria; // esto te va a servir para el filtro
    tarjeta.dataset.id = platillo.id;

    if (!platillo.disponible) tarjeta.classList.add('agotado');

    const titulo = document.createElement('h3');
    titulo.textContent = platillo.nombre;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.textContent = 'Precio: $' + platillo.precio.toLocaleString('es-CO');

    const categoria = document.createElement('p');
    categoria.classList.add('categoria');
    categoria.textContent = platillo.categoria;

    const badge = document.createElement('span');
    badge.classList.add('badge');
    badge.textContent = platillo.disponible ? 'Disponible' : 'Agotado';

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('quitar');
    buttonDelete.textContent = 'x';

    tarjeta.append(buttonDelete, titulo, precio, categoria, badge);
    return tarjeta;
};

// Renderizado de las tarjeta del menu
function renderizarPlatillos(lista) {
    menuContainer.innerHTML = '';
    lista.forEach(platillo => menuContainer.appendChild(crearTarjeta(platillo)));
};

// Seleccionar tarjetas por categoria
function selectTarjeta(elemento) {
    const categoria = elemento.dataset.categoria;
    if (categoria === 'todos') {
        renderizarPlatillos(platillos);
    } else {
        renderizarPlatillos(platillos.filter(p => p.categoria === categoria));
    }
};

// Renderizar todos los elementos
function renderizadoCtrl() {
    let platillosGuardados = localStorage.getItem(storageKey);

    if (platillosGuardados) {
        platillos = JSON.parse(platillosGuardados);
    };

    renderizarOpcionesCategoria();
    renderizarBotones(categoriasConTodos);
    renderizarPlatillos(platillos);
};

// -------------------- EVENTOS --------------------

// Boton de agregar
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreValido = validateName();
    const precioValido = validatePrecio();
    const categoriaValida = validateCategoria();

    if (nombreValido && precioValido && categoriaValida) {
        const nuevoPlatillo = platilloGenerado(nombre.value, precio.value, selectCategoria.value);
        console.log('Formulario enviado');
        platillos.push(nuevoPlatillo);
        guardarPlatillo();
        renderizarPlatillos(platillos);
        e.target.reset();
    };
});

// Input nombre del platillo
nombre.addEventListener('input', () => {
    validateName();
});

// Input precio del platillo
precio.addEventListener('input', () => {
    validatePrecio();
});

// Boton seleccionar categoria
filtrosContainer.addEventListener('click', (e => {
    e.preventDefault();
    if (e.target && e.target.tagName === 'BUTTON') {
        selectTarjeta(e.target);
        claseCtrl(e.target);
    };
}));

// Boton cerrar tarjetas
menuContainer.addEventListener('click', (e => {
    e.preventDefault();

    if (e.target && e.target.classList.contains('quitar')) {
        const id = parseInt(e.target.parentElement.dataset.id);
        platillos = platillos.filter(p => p.id !== id);
        guardarPlatillo();
        renderizarPlatillos(platillos);
    };
}));


// -------------------- RENDERIZADO --------------------

document.addEventListener('DOMContentLoaded', renderizadoCtrl);