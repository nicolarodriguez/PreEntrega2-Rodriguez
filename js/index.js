
const ARRAY_PRODUCTOS = [
    {
        id: 1, 
        name: "Remera",
        price: 450,
    },
    {
        id: 2,
        name: "Pantalon",
        price: 1250,
    },
    {
        id: 3,
        name: "Championes",
        price: 1550,
    },
    {
        id: 4,
        name: "Chancletas",
        price: 750,
    },
    {
        id: 5,
        name: "Gorra",
        price: 500,
    },
    {
        id: 6,
        name: "Campera",
        price: 2300,
    },
];

let CarritoDeCompras = [];

function mostrarProductos() {
    console.log("Productos:\n");
    ARRAY_PRODUCTOS.forEach((producto) => {
        console.log(`${producto.id}: ${producto.name} - ${producto.price}$\n`);
    });
}

mostrarProductos();

function AgregarProductosAlCarrito(productId){
    const producto = ARRAY_PRODUCTOS.find(product => product.id === productId);
    CarritoDeCompras.push(producto);
    console.log(`${producto.name} se ha agregado al carrito.`);
}

function SacarProductosDelCarrito(productId){
    const productoSacar = CarritoDeCompras.findIndex(product => product.id === productId);
    const productoBorrado = CarritoDeCompras.splice(productoSacar, 1)[0];
    console.log(`Se ha eliminado ${productoBorrado.name} del carrito`)
}

function SumaDePrecios(){
    const total = CarritoDeCompras.reduce((acumulador, product)=> acumulador + product.price, 0);
    return total;
}

function mostrarCarrito(){
    console.log("Carrito de compras:\n")
    if(CarritoDeCompras.length === 0){
        console.log("El carrito de compras esta vacio")
    } else {
    CarritoDeCompras.forEach(producto => {
        console.log(`${producto.name} - ${producto.price}$`)
        const totalCarrito = SumaDePrecios();
        console.log(`El total es: ${totalCarrito}$`)
    })};
}