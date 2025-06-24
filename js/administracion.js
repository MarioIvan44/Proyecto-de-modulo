const API_URL = "https://6859bebd9f6ef96111541cc4.mockapi.io/Natalie/donas"

const form = document.getElementById('dona-form'); //Formulario principal
const imageFile = document.getElementById('image-file') // Input de archivo (imagen)
const imagenUrlEl = document.getElementById('imagen-url'); // Campo oculto con URL de la imagen
const idDona = document.getElementById('dona-id') // Campo oculto con ID de la persona
const nombre = document.getElementById('nombre') // Campo para el nombre
const tipoDona = document.getElementById('tipoDona') // Campo para el tipo de dona
const precio = document.getElementById('precio') //Campo para el precio
const cancelBtn = document.getElementById('btn-cancel'); // Botón para cancelar edición
const submitBtn = document.getElementById('btn-submit'); // Botón para agregar/actualizar
const tbody = document.getElementById('personas-tbody'); // Cuerpo de la tabla de registros

async function CargarDonas(){
    const res = await fetch(API_URL);
    const data = await res.json(); 
    CargarTabla(data); 
}

function CargarTabla(donas){
    tbody.innerHTML = ""; 
    donas.forEach(dona => {
        tabla.innerHTML += `
            <tr>
                 <td><img src="${dona.imagen}" alt="Foto de ${dona.nombre}" /></td>
                 <td>${dona.nombre}</td>
                 <td>${dona.tipo}</td>
                 <td>${dona.precio}</td>
                 <td>
                    <button onclick="CargarParaEditar('${dona.id}')">Editar</button>
                    <button onclick="BorrarDona('${dona.id}')">Eliminar</button>
                 </td>
            </tr>
        `
    });

}

//Carga inicial
window.addEventListener('DOMContentLoaded', CargarDonas);

async function BorrarDona(id) {
    const confirmacion = confirm('¿Está seguro que desea eliminar esta dona?');

    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        CargarDonas();
        alert("El registro fue eliminado")
    }
    else{
        alert("Se canceló la acción");
        return;
    }
}

CargarDonas();