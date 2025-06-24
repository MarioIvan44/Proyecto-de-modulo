const API_URL = 'https://6859bebd9f6ef96111541cc4.mockapi.io/Natalie/donas'; 

const container = document.getElementById('cards-container');

async function CargarDonas() {
  try {
    const res  = await fetch(API_URL);
    const data = await res.json();
    CargarTarjetas(data);
  } catch (err) {
    console.error('Error al cargar datos:', err);
    container.innerHTML = '<p>Error al cargar las donas.</p>';
  }
}

function CargarTarjetas(donas) {
  container.innerHTML = '';
  if (!donas.length) {
    container.innerHTML = '<p>No hay donas registradas.</p>';
    return;
  }

  donas.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.imagen}" alt="Foto de ${p.nombre}">
      <h2>${p.nombre}</h2>
      <h3>${p.tipo}</h3>
      <p>${p.precio}</p>
    `;
    container.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', CargarDonas);
