const API_URL = "https://6859bebd9f6ef96111541cc4.mockapi.io/Natalie/donas";

const IMG_API_URL = "https://api.imgbb.com/1/upload?key=d5cf2634a3549236d105102e1fb74c5a";

const form = document.getElementById("dona-form"); //Formulario principal
const imageFile = document.getElementById("imagen-file"); // Input de archivo (imagen)
const imagenUrlEl = document.getElementById("imagen-url"); // Campo oculto con URL de la imagen
const idDona = document.getElementById("dona-id"); // Campo oculto con ID de la persona
const nombre = document.getElementById("nombre"); // Campo para el nombre
const tipoDona = document.getElementById("tipoDona"); // Campo para el tipo de dona
const precio = document.getElementById("precio"); //Campo para el precio
const cancelBtn = document.getElementById("btn-cancel"); // Botón para cancelar edición
const submitBtn = document.getElementById("btn-submit"); // Botón para agregar/actualizar
const tbody = document.getElementById("donas-tbody"); // Cuerpo de la tabla de registros

async function CargarDonas() {
  const res = await fetch(API_URL);
  const data = await res.json();
  CargarTabla(data);
}

function CargarTabla(donas) {
  tbody.innerHTML = "";
  donas.forEach((dona) => {
    tbody.innerHTML += `
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
        `;
  });
}

//Carga inicial
window.addEventListener("DOMContentLoaded", CargarDonas);

//Método HTTP Delete
async function BorrarDona(id) {
  const confirmacion = confirm("¿Está seguro que desea eliminar esta dona?");

  if (confirmacion) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    CargarDonas();
    alert("El registro fue eliminado");
  } else {
    alert("Se canceló la acción");
    return;
  }
}

async function CargarParaEditar(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const p = await res.json();

  nombre.value = p.nombre;
  precio.value = p.precio;
  imagenUrlEl.value = p.imagen;
  tipoDona.value = p.tipo;
  imageFile.value = "";
  idDona.value = p.id;

  submitBtn.textContent = "Actualizar";
  cancelBtn.hidden = false;
}

cancelBtn.addEventListener("click", async (e) => {
  form.reset();
  idDona.value = "";
  submitBtn.textContent = "Agregar";
  cancelBtn.hidden = true;
});

async function subirImagen(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(IMG_API_URL, { method: "POST", body: fd });
  const obj = await res.json();
  return obj.data.url;
}

//Método HTTP PUT Y POST
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let imageUrl = imagenUrlEl.value;
  if (imageFile.files.length > 0) {
    imageUrl = await subirImagen(imageFile.files[0]);
  }

  const payload = {
    nombre: nombre.value,
    tipo: tipoDona.value,
    precio: precio.value,
    imagen: imageUrl,
  };

  if (idDona.value) {
    await fetch(`${API_URL}/${idDona.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Registro actualizado correctamente 😎");
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Registro agregado 😌");
  } 

  form.reset();
  cancelBtn.hidden = true;
  submitBtn.textContent = "Agregar";
  CargarDonas();
});
