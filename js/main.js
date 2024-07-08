                                ///////////ADMINISTRAR PRODUCTOS DE LA TIENDA///////////
//Declaracion de productos y lista de productos
class Producto {
    constructor(id,nombre,precio,detalles,stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.detalles = detalles;
        this.stock = stock;
    }
    //modificar propiedades
    nombreSetter(nombre) {
        this.nombre = nombre;
    }
    precioSetter(precio) {
        this.precio = precio;
    }
    detallesSetter(detalles) {
        this.detalles = detalles;
    }
    stockSetter(stock) {
        this.stock = stock;
    }
}

class ListaProductos {
    constructor(productos) {
        this.productos = productos;
    }
    //metodos
    agregarProductos(producto) {
        this.productos.push(producto);
    }
    obtenerProductos() {
        return this.productos;
    }
    buscarProducto(id) {
        return this.productos.find(producto => producto.id == id);
    }
    generadorIdProducto() {
        let ultimoProd = this.productos.length - 1;
        return this.productos[ultimoProd] ? this.productos[ultimoProd].id + 1 : 1;
    }
    venderUnidad(id) {
        if (listaProductos.buscarProducto(id) != undefined){
            this.productos.forEach(producto => {
                if (producto.id == id) {
                    if (producto.stock > 0) {
                        producto.stock -= 1;
                        return alert('Producto vendido!');
                    }else{
                        return alert('No hay stock!');
                    }
                }
            });
        } else {
            return alert('El producto no existe!');
        }
    }
    obtenerListaProductos() {
        console.log('Lista de Productos:');
        this.productos.map((producto)=> 
            console.log(
            'Producto: ' + producto.nombre + 
            '\nPrecio: ' + producto.precio +
            '\nDetalles: ' + producto.detalles +
            '\nStock: ' + producto.stock + 
            '\nid: ' + producto.id
            )
        )
    }
    eliminarProducto(id) {
        let productoEliminar = this.buscarProducto(id);
        this.productos = this.productos.filter((producto)=> producto.id != id);
        return console.log('Producto eliminado: ' + productoEliminar.nombre);
    }
}

let listaProductos = new ListaProductos([]);

//Funcion validar entradas
function validarEntradas(tipo) {
    switch (tipo) {
        case 'numerica':
            let precio;
            do {
                precio = parseFloat(prompt('Ingrese el precio del producto (solo numeros):'));
            } while (isNaN(precio) || precio <= 0);
            return precio;
    
        case 'string':
            let string;
            do {
                string = prompt('Ingrese el nombre del producto:');
            } while (string.length == 0);
            return string;

        case 'stock':
            let stock;
            do {
                stock = parseInt(prompt('Ingrese el stock del producto (solo numeros):'));
            } while (isNaN(stock) || stock < 0);
            return stock;

        default:
            let entrada;
            entrada = prompt('Ingrese ' + tipo + ' del producto:');
            return entrada;
    }
}

//Funcion para agregar productos
function agregarProducto() {
    let productoNombre = validarEntradas('string');
    let productoPrecio = validarEntradas('numerica');
    let productoStock = validarEntradas('stock');
    let productoDetalles = validarEntradas('detalles');
    let productoId = listaProductos.generadorIdProducto();

    let productoNuevo = new Producto(productoId,productoNombre,productoPrecio,productoDetalles,productoStock);
    listaProductos.agregarProductos(productoNuevo);
    
    return alert('Producto agregado!');
}

//Funcion para vender productos
function venderProducto() {
    let productoVender = validarEntradas('el id');
    listaProductos.venderUnidad(parseInt(productoVender));
}

//Funcion para borrar productos
function borrarProducto() {
    let producto;
    do {
        producto = prompt('Ingrese el id del producto a eliminar:');
    } while (isNaN(producto) || producto <= 0);
    if (listaProductos.buscarProducto(producto) != undefined) {
        listaProductos.eliminarProducto(producto);
        alert('Producto eliminado!');        
    }else{
        alert('El producto no existe!');
    }
}

//Menu de operaciones
function menuOperaciones(opcion) {
    switch (opcion) {
        case 1:
            agregarProducto();
            break;

        case 2:
            borrarProducto();
            break; 

        case 3:
            venderProducto();
            break;

        case 4:
            listaProductos.obtenerListaProductos();
            break;

        default:
            break;
    }
    consultaOp();
}

//Consultar operacion
let consultaOp = () => {
    let op;
    do {
        op = prompt('Que desea hacer?' + '\n1-Ingresar un producto:' + '\n2-Eliminar un producto:' + '\n3-Vender un producto:' + '\n4-Lista de productos' + '\n5-Salir');
    } while (isNaN(op));
    if (parseInt(op) != 5) {
        menuOperaciones(parseInt(op));
    } else {
        alert('Adios!');
    }
};

//Flujo principal
consultaOp();