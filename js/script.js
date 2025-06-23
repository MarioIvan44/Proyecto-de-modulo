const API_URL = "https://https://6859bebd9f6ef96111541cc4.mockapi.io/Natalie/donas.dev/msEo4e/expo"

async function  ObtenerDonas(){
    const res = await fetch(API_URL);
    const data = await res.json(); 

    CrearTabla(data); 
}

function CrearTabla(datos){ 
    const tabla = document.querySelector("#tabla tbody");

    tabla.innerHTML = ""; 

    datos.forEach(dona =>{
        tabla.innerHTML += `
            <tr>
                 <td>${dona.id}</td>
                 <td>${dona.nombre}</td>
                 <td>${dona.apellido}</td>
                 <td>${dona.edad}</td>
                 <td>${dona.correo}</td>
                 <td>
                 <button>Editar</button>
                 <button>Eliminar</button>
                 </td>
             </tr>
        `
    });

}
//Se llama obtene personas
ObtenerDonas();