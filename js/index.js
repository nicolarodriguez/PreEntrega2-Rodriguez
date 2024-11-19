
const API_URL = "https://fakestoreapi.com/products";

let ARRAY_PRODUCTOS = [];

let CarritoDeCompras = [];


function obtenerProductos() {
    fetch(API_URL)
      .then(res => res.json())
      .then(productos => {
        console.log("Productos obtenidos:", productos);
        ARRAY_PRODUCTOS = productos;
        mostrarProductos(productos);
      })
      .catch(error => console.error("Error al obtener productos:", error));
  }

  document.addEventListener("DOMContentLoaded", () => {
    let CarritoDeCompras = [];
    limpiarCarrito();
    obtenerProductos();
    cargarCarritoGuardadoStorage();
});

function limpiarCarrito(){
    CarritoDeCompras = [];
    localStorage.removeItem("carrito");
    console.log(CarritoDeCompras);
    mostrarCarrito();
}

function carritoGuardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(CarritoDeCompras));
}

function cargarCarritoGuardadoStorage() {
    const carritoGuardadoEnElStorage = localStorage.getItem('carrito');
    if (carritoGuardadoEnElStorage) {
        try {
            CarritoDeCompras = JSON.parse(carritoGuardadoEnElStorage);
            console.log("Carrito cargado desde el localStorage:", CarritoDeCompras);
        } catch (error) {
            console.error("Error al cargar el carrito desde el localStorage:", error);
            CarritoDeCompras = [];
        }
    } else {
        CarritoDeCompras = [];
    }
}


function mostrarProductos() {
    const section_products = document.getElementById('productos');
    section_products.innerHTML = '';

        ARRAY_PRODUCTOS.forEach(producto =>{
        const CARD_DIV = document.createElement('div');
        CARD_DIV.className = 'card-container'
        CARD_DIV.innerHTML = 
        `
        <img src="${producto.image}" alt ="${producto.title}">
        <h3>${producto.title}</h3>
        <p>${producto.price} $</p>
        <button onclick="AgregarProductosAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        section_products.appendChild(CARD_DIV)
    });
}


function mostrarCarrito(){
    const section_cart = document.getElementById('carrito');
    section_cart.innerHTML = '';

    if (CarritoDeCompras.length === 0){
        section_cart.innerHTML = '<p> El carrito esta vacio</p>';
    }else{ 
        CarritoDeCompras.forEach(producto => {
            const CART_DIV = document.createElement('div');
            CART_DIV.className = 'cart-container';
            CART_DIV.innerHTML = `
            <img src="${producto.image}" alt ="${producto.title}">
            <h3>${producto.title}</h3>
            <p>Precio: ${producto.price}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="SacarProductosDelCarrito(${producto.id})">Sacar del carrito</button>
            `;
            section_cart.appendChild(CART_DIV);
        });
        const FinalizarCompraButton = document.createElement('button');
        FinalizarCompraButton.className = 'finalizar-compra';
        FinalizarCompraButton.innerText = "Finalizar compra";
        FinalizarCompraButton.onclick = FinalizarCompra;
        section_cart.appendChild(FinalizarCompraButton)
    }

    const carritoSection = document.getElementById('section-carrito');
    carritoSection.style.display = CarritoDeCompras.length > 0 ? 'block' : 'block';
    
};

function AgregarProductosAlCarrito(productId){
    const producto = ARRAY_PRODUCTOS.find(prod => prod.id === productId);
    if(producto){
        const productoExistente = CarritoDeCompras.find(item => item.id === productId);
        if(productoExistente){
            productoExistente.cantidad += 1;
        }else{
            CarritoDeCompras.push({ ...producto, cantidad: 1 });
        }
        console.log(`Producto agregado con id: ${productId}`);
        console.log('Carrito actualizado:', CarritoDeCompras);
        carritoGuardarStorage();
        mostrarCarrito();
    }else{
        console.error('producto no encontrado')
    }
};

function SacarProductosDelCarrito(productId){
    const productoSacar = CarritoDeCompras.findIndex(product => product.id === productId);
    if (productoSacar > -1){
    const productoBorrado = CarritoDeCompras.splice(productoSacar, 1)[0];
    console.log(`Se ha eliminado ${productoBorrado.name} del carrito`);
    mostrarCarrito();
    carritoGuardarStorage();
    }
}

function agregarStorage(){
    localStorage.setItem('productos', JSON.stringify(producto));
}

function FinalizarCompra(){
    if(CarritoDeCompras.length > 0){
        const total = SumaDePrecios();
        
        Swal.fire({
            title: "Deseas finalizar la compra?",
            text: `Total: $${total}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Finalizar compra",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Compra Realizada!",
                text: "Tu compra a sido realizada con exito.",
                icon: "success"
              });
            }
          });
        CarritoDeCompras = [];
        carritoGuardarStorage();
        mostrarCarrito();

        const sectionCarrito = document.getElementById('section-carrito');
        sectionCarrito.style.display = 'none';
    }else {
        alert('El carrito esta vacio')
    }
}

function SumaDePrecios(){
    return CarritoDeCompras.reduce((acumulador, producto)=> {
        return acumulador + (producto.price * producto.cantidad);
    }, 0);
}
mostrarProductos(productos);
