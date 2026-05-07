# Sistema de Gestión de Platillos - Barnea

Aplicación construida con _Vanilla JavaScript_ bajo el paradigma de _Programación Orientada a Objetos_ (POO). Permite la gestión completa de un menú gastronómico con validaciones avanzadas, persistencia en localStorage de datos y filtrado dinámico.

- Arquitectura Modular: Separación de responsabilidades en modelos, servicios y UI.
- POO con Encapsulamiento: Uso de clases con _propiedades privadas_ (#) y _métodos Accessors_(getters/setters).
- Validaciones con Regex: Control estricto de entrada de datos (nombres, precios y categorías).
- Interfaz Dinámica: Filtrado por categorías en tiempo real y renderizado eficiente del DOM.
- Persistencia Local: Sincronización automática con LocalStorage.
- Diseño responsive con CSS _Grid/Flexbox_.

### Tecnologías Utilizadas:

- **JavaScript (ES6+):** Clases, Módulos (import/export), Array Methods, Async/Await.

- **HTML5 & CSS3:** Layouts basados en CSS Grid y Flexbox con diseño responsive.

- **Git & GitHub:** Control de versiones siguiendo convenciones de Conventional Commits.

### 📂 Estructura del Proyecto

```
.
├── 📁 data
│   └── platillos.js       # Datos iniciales y constantes
├── 📁 models
│   └── platillo.js        # Clase Platillo (Lógica de negocio y POO)
├── 📁 services
│   └── storage.js         # Gestión de persistencia en LocalStorage
├── 📁 styles
│   └── main.css           # Estilo principal del sitio
├── 📁 ui
│   └── render.js          # Controladores de interfaz y eventos
├── 📄 main.js            # Punto de entrada y orquestador
│
└── 📄 index.html
```

## Instalación y Uso

1. Clona el repositorio:
   `git clone https://github.com/tu-usuario/tu-repo.git`
2. Abre el archivo `index.html` en tu navegador (puedes usar la extensión **Live Server** en VS Code).
