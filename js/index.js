
const ARRAY_PRODUCTOS = [
    {
        id: 1, 
        name: "Remera",
        price: 450,
        image:"./assets/rmera.jpg",
    },
    {
        id: 2,
        name: "Pantalon",
        price: 1250,
        image:"./assets/plom.jpg",
    },
    {
        id: 3,
        name: "Championes",
        price: 1550,
        image:"./assets/sho.jpg",
    },
    {
        id: 4,
        name: "Chancletas",
        price: 750,
        image:"./assets/ch.jpg",
    },
    {
        id: 5,
        name: "Gorra",
        price: 500,
        image:"./assets/gor.jpg",
    },
    {
        id: 6,
        name: "Campera",
        price: 2300,
        image:"./assets/cam.jpg",
    },
];

let CarritoDeCompras = [];

function carritoGuardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(CarritoDeCompras));
}

function cargarCarritoGuardadoStorage(){
    const carritoGuardadoEnElStorage = localStorage.getItem('carrito');
    CarritoDeCompras = JSON.parse(carritoGuardadoEnElStorage);
}

function mostrarProductos() {
    const section_products = document.getElementById('productos');
    ARRAY_PRODUCTOS.forEach(producto =>{
        const CARD_DIV = document.createElement('div');
        CARD_DIV.className = 'card-container'
        CARD_DIV.innerHTML = 
        `
        <img src="${producto.image}" alt ="${producto.name}">
        <h3>${producto.name}</h3>
        <p>${producto.price} $</p>
        <button onclick="AgregarProductosAlCarrito(${producto.id})">Agregar al carrito</button>
        `
        section_products.appendChild(CARD_DIV)
    })
}


function mostrarCarrito(){
    const section_cart = document.getElementById('carrito');
    section_cart.innerHTML = "";
    if (CarritoDeCompras.length === 0){
        section_cart.innerHTML = '';
    }else{
        const productosUnicos = Array.from(new Set(CarritoDeCompras)); 
        productosUnicos.forEach(producto => {
            const cantidad = CarritoDeCompras.filter(item => item.id === producto.id).length;
            const CART_DIV = document.createElement('div');
            CART_DIV.className = 'cart-container';
            CART_DIV.innerHTML = `
                <h3>${producto.name}</h3>
                <p>Precio: ${producto.price}</p>
                <p>Cantidad: ${cantidad}</p>
                <button onclick="SacarProductosDelCarrito(${producto.id})">Sacar del carrito</button>
            `;
            section_cart.appendChild(CART_DIV);
        });
        const FinalizarCompraButton = document.createElement('button');
        FinalizarCompraButton.innerText = "Finalizar compra";
        FinalizarCompraButton.onclick = FinalizarCompra;
        section_cart.appendChild(FinalizarCompraButton)
    }

    const carritoSection = document.getElementById('section-carrito');
    carritoSection.style.display = CarritoDeCompras.length > 0 ? 'block' : 'none';
    
};

function AgregarProductosAlCarrito(productId){
    const producto = ARRAY_PRODUCTOS.find(prod => prod.id === productId);
    if(producto){
        CarritoDeCompras.push(producto);
        mostrarCarrito();
        carritoGuardarStorage();
    }

}

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
        alert(`Compra realizada con exito. Total: $${total}`);
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
    return CarritoDeCompras.reduce((acumulador, product)=> acumulador + product.price, 0);
}
mostrarProductos();
