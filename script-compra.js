// Array para almacenar los precios de los productos
let precios = [];

// Función para volver al inicio
function volverAlInicio() {
    window.location.href = "index.html";
}

// Función para iniciar la compra
function iniciarCompra() {
    const cantidad = parseInt(document.getElementById('cantidadProductos').value);
    
    // Validar que se ingresó un número válido
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 50) {
        alert("Por favor, ingresa un número válido entre 1 y 50");
        return;
    }

    // Limpiar array de precios
    precios = [];
    
    // Generar inputs para cada producto
    const inputsPrecios = document.getElementById('inputsPrecios');
    inputsPrecios.innerHTML = '';
    
    for (let i = 1; i <= cantidad; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'form-group';
        inputGroup.innerHTML = `
            <label for="producto${i}">Precio del producto ${i}:</label>
            <input type="number" id="producto${i}" step="0.01" min="0.01" placeholder="0.00" onchange="actualizarListaProductos()">
        `;
        inputsPrecios.appendChild(inputGroup);
    }

    // Mostrar sección de precios
    document.getElementById('seccionPrecios').style.display = 'block';
    document.getElementById('productosLista').style.display = 'block';
    
    // Ocultar resultado anterior
    document.getElementById('resultadoCompra').classList.remove('active');
}

// Función para actualizar la lista de productos en tiempo real
function actualizarListaProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    
    const cantidad = parseInt(document.getElementById('cantidadProductos').value);
    precios = [];
    
    for (let i = 1; i <= cantidad; i++) {
        const precioInput = document.getElementById(`producto${i}`);
        const precio = parseFloat(precioInput.value);
        
        if (!isNaN(precio) && precio > 0) {
            precios.push(precio);
            
            const productoItem = document.createElement('div');
            productoItem.className = 'producto-item';
            productoItem.innerHTML = `
                <div class="producto-info">
                    <div class="producto-numero">${i}</div>
                    <span>Producto ${i}</span>
                </div>
                <strong>$${precio.toFixed(2)}</strong>
            `;
            listaProductos.appendChild(productoItem);
        }
    }
}

// Función para calcular el total
function calcularTotal() {
    // Recolectar precios
    const cantidad = parseInt(document.getElementById('cantidadProductos').value);
    precios = [];
    
    for (let i = 1; i <= cantidad; i++) {
        const precioInput = document.getElementById(`producto${i}`);
        const precio = parseFloat(precioInput.value);
        
        if (!isNaN(precio) && precio > 0) {
            precios.push(precio);
        }
    }

    // Validar que se ingresaron todos los precios
    if (precios.length !== cantidad) {
        alert("Por favor, ingresa el precio para todos los productos");
        return;
    }

    // Calcular total
    const total = precios.reduce((sum, precio) => sum + precio, 0);
    
    // Mostrar resultado
    document.getElementById('totalPagar').textContent = `$${total.toFixed(2)}`;
    document.getElementById('resultadoCompra').classList.add('active');
    
    // Desplazarse al resultado
    document.getElementById('resultadoCompra').scrollIntoView({ behavior: 'smooth' });
}

// Función para reiniciar la aplicación
function reiniciar() {
    document.getElementById('cantidadProductos').value = '';
    document.getElementById('inputsPrecios').innerHTML = '';
    document.getElementById('listaProductos').innerHTML = '';
    document.getElementById('seccionPrecios').style.display = 'none';
    document.getElementById('productosLista').style.display = 'none';
    document.getElementById('resultadoCompra').classList.remove('active');
    precios = [];
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicación de Supermercado cargada correctamente");
    
    // Agregar funcionalidad para calcular con la tecla Enter
    document.getElementById('cantidadProductos').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            iniciarCompra();
        }
    });
});