const API_URL = "http://127.0.0.1:8000/api";

// ---------------------- Helpers sencillos ----------------------
// Obtener token guardado
function getToken() {
  return localStorage.getItem('token');
}

async function apiRequest(path,
   method = 'GET', 
   data = null) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_URL}${path}`, options);
  return res; 
}


const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
  btnLogin.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await apiRequest('/login', 'POST', { email, password });
      if (!res.ok) {
        alert('Login falló: ' + res.status);
        return;
      }
      const body = await res.json();
      localStorage.setItem('token', body.token);

      window.location.href = 'crud.html';
    } catch (err) {
      console.error('Error login:', err);
      alert('Error al iniciar sesión');
    }
  });
}


async function listarPersonas() {
  try {
    const res = await apiRequest('/personas');
    if (!res.ok) throw new Error('Error al obtener personas');
    const personas = await res.json();

    // Construir tabla simple
    let html = '<h2>Listado de personas</h2>';
    html += '<table border="1"><thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>CI</th><th>Tel</th><th>Email</th><th>Acciones</th></tr></thead><tbody>';
    personas.forEach(p => {
      html += `<tr>` +
        `<td>${p.id}</td>` +
        `<td>${p.nombre}</td>` +
        `<td>${p.apellido}</td>` +
        `<td>${p.ci}</td>` +
        `<td>${p.telefono}</td>` +
        `<td>${p.email}</td>` +
        `<td>` +
          `<button onclick="mostrarFormularioEditar(${p.id})">Editar</button>` +
          ` <button onclick="eliminarPersona(${p.id})">Eliminar</button>` +
        `</td>` +
      `</tr>`;
    });
    html += '</tbody></table>';

    document.getElementById('container').innerHTML = html;
  } catch (err) {
    console.error(err);
    alert('No se pudo cargar la lista');
  }
}

const btnCargar = document.getElementById('btnCargar');
if (btnCargar) btnCargar.addEventListener('click', listarPersonas);

function formCrear() {
  const html = `
    <h2>Crear persona</h2>
    <form id="formPersona">
      <label>Nombre: <input id="nombre" required></label><br>
      <label>Apellido: <input id="apellido" required></label><br>
      <label>CI: <input id="ci" required></label><br>
      <label>Teléfono: <input id="telefono"></label><br>
      <label>Email: <input id="email" type="email"></label><br>
      <button type="submit">Crear</button>
      <button type="button" id="btnCancelar">Cancelar</button>
    </form>
  `;
  document.getElementById('container').innerHTML = html;

  document.getElementById('formPersona').addEventListener('submit', async (e) => {
    e.preventDefault();
    const persona = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      ci: document.getElementById('ci').value,
      telefono: document.getElementById('telefono').value,
      email: document.getElementById('email').value,
    };

    try {
      const res = await apiRequest('/personas', 'POST', persona);
      if (!res.ok) {
        const err = await res.json().catch(()=>null);
        alert('Error crear: ' + (err?.message || res.status));
        return;
      }
      alert('Creado');
      listarPersonas();
    } catch (err) {
      console.error(err);
      alert('Error al crear');
    }
  });

  document.getElementById('btnCancelar').addEventListener('click', () => {
    document.getElementById('container').innerHTML = '';
  });
}

const btnCrear = document.getElementById('btnCrear');
if (btnCrear) btnCrear.addEventListener('click', formCrear);

async function mostrarFormularioEditar(id) {
  try {
    const res = await apiRequest(`/personas/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('No se pudo cargar la persona');
    const p = await res.json();

    const html = `
      <h2>Editar persona</h2>
      <form id="formEditar">
        <input type="hidden" id="edit_id" value="${p.id}">
        <label>Nombre: <input id="edit_nombre" value="${p.nombre }" required></label><br>
        <label>Apellido: <input id="edit_apellido" value="${p.apellido }" required></label><br>
        <label>CI: <input id="edit_ci" value="${p.ci }" required></label><br>
        <label>Teléfono: <input id="edit_telefono" value="${p.telefono }"></label><br>
        <label>Email: <input id="edit_email" type="email" value="${p.email }"></label><br>
        <button type="submit">Guardar</button>
        <button type="button" id="btnCancelarEditar">Cancelar</button>
      </form>
    `;

    document.getElementById('container').innerHTML = html;

    document.getElementById('formEditar').addEventListener('submit', actualizarPersona);
    document.getElementById('btnCancelarEditar').addEventListener('click', () => {
      document.getElementById('container').innerHTML = '';
    });
  } catch (err) {
    console.error(err);
    alert('No se pudo cargar la persona para editar');
  }
}

async function actualizarPersona(e) {
  e.preventDefault();
  const id = document.getElementById('edit_id').value;
  const persona = {
    nombre: document.getElementById('edit_nombre').value,
    apellido: document.getElementById('edit_apellido').value,
    ci: document.getElementById('edit_ci').value,
    telefono: document.getElementById('edit_telefono').value,
    email: document.getElementById('edit_email').value,
  };

  try {
    const res = await apiRequest(`/personas/${encodeURIComponent(id)}`, 'PUT', persona);
    if (!res.ok) {
      const err = await res.json().catch(()=>null);
      alert('Error actualizar: ' + (err?.message || res.status));
      return;
    }
    alert('Actualizado');
    listarPersonas();
  } catch (err) {
    console.error(err);
    alert('Error al actualizar');
  }
}

async function eliminarPersona(id) {
  if (!confirm('Eliminar esta persona?')) return;
  try {
    const res = await apiRequest(`/personas/${encodeURIComponent(id)}`, 'DELETE');
    if (!res.ok) {
      const err = await res.json().catch(()=>null);
      alert('Error eliminar: ' + (err?.message || res.status));
      return;
    }
    alert('Eliminado');
    listarPersonas();
  } catch (err) {
    console.error(err);
    alert('Error al eliminar');
  }
}
window.mostrarFormularioEditar = mostrarFormularioEditar;
window.eliminarPersona = eliminarPersona;
