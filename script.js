const API_URL = "http://127.0.0.1:8000/api";

// ---------------------- Helpers sencillos ----------------------
// Obtener token guardado
function getToken() {
  return localStorage.getItem("token");
}

async function apiRequest(path, method = "GET", data = null) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_URL}${path}`, options);
  return res;
}

const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await apiRequest("/login", "POST", { email, password });
      if (!res.ok) {
        alert("Login falló: " + res.status);
        return;
      }
      const body = await res.json();
      localStorage.setItem("token", body.token);

      window.location.href = "crud.html";
    } catch (err) {
      console.error("Error login:", err);
      alert("Error al iniciar sesión");
    }
  });
}

async function listarPersonas() {
  try {
    const res = await apiRequest("/personas");
    if (!res.ok) throw new Error("Error al obtener personas");
    const personas = await res.json();

    let html = `
  <h2 class="text-xl font-semibold mb-4">Listado de Personas</h2>
  <table class="w-full bg-white border border-gray-300 rounded-lg text-sm shadow-sm">
    <thead class="bg-gray-100">
      <tr>
        <th class="border border-gray-400 p-2">ID</th>
        <th class="border border-gray-400 p-2">Nombre</th>
        <th class="border border-gray-400 p-2">Apellido</th>
        <th class="border border-gray-400 p-2">CI</th>
        <th class="border border-gray-400 p-2">Direccion</th>
        <th class="border border-gray-400 p-2">Telf</th>
        <th class="border border-gray-400 p-2">Email</th>
        <th class="border border-gray-400 p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
`;

    personas.forEach((p) => {
      html += `
    <tr class="">
      <td class="border border-gray-200 p-2 text-center">${p.id}</td>
      <td class="border border-gray-200 p-2">${p.nombre}</td>
      <td class="border border-gray-200 p-2">${p.apellido}</td>
      <td class="border border-gray-200 p-2 text-center">${p.ci}</td>
      <td class="border border-gray-200 p-2">${p.direccion}</td>
      <td class="border border-gray-200 p-2">${p.telefono}</td>
      <td class="border border-gray-200 p-2">${p.email}</td>
      <td class="border border-gray-200 p-2 text-center">
        <button class="bg-indigo-200 text-white py-1 px-3 rounded hover:bg-indigo-500" onclick="mostrarFormularioEditar(${p.id})">Editar</button>
        <button class="bg-red-200 text-white py-1 px-3 rounded hover:bg-red-600 ml-2" onclick="eliminarPersona(${p.id})">Eliminar</button>
      </td>
    </tr>
  `;
    });

    html += `
    </tbody>
  </table>
`;

    document.getElementById("container").innerHTML = html;
  } catch (err) {
    console.error(err);
    alert("No se pudo cargar la lista");
  }
}

const btnCargar = document.getElementById("btnCargar");
if (btnCargar) btnCargar.addEventListener("click", listarPersonas);

function formCrear() {
  const html = `
<div class="flex justify-center h-screen">
    <div>
      <h2 class="text-xl font-semibold mb-4 text-center">Crear persona</h2>
      <form id="formPersona" class="bg-white rounded-md p-6 flex flex-col gap-3 w-80 shadow-md">
        <input id="nombre" class="border rounded-md p-2" placeholder="Nombre" required>
        <input id="apellido" class="border rounded-md p-2" placeholder="Apellido" required>
        <input id="ci" type="number" class="border rounded-md p-2" placeholder="CI" required>
        <input id="direccion" class="border rounded-md p-2" placeholder="Direccion">
        <input id="telefono" class="border rounded-md p-2" placeholder="Telfono">
        <input id="email" type="email" class="border rounded p-2" placeholder="Correo">

        <div class="flex justify-between ">
          <button type="submit" class="bg-indigo-300 text-black p-2 rounded hover:text-white hover:bg-indigo-500">Crear</button>
          <button type="button" id="btnCancelar" class="bg-gray-300 p-2 rounded hover:text-white  hover:bg-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
`;
  document.getElementById("container").innerHTML = html;

  document
    .getElementById("formPersona")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const persona = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        ci: document.getElementById("ci").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
      };

      try {
        const res = await apiRequest("/personas", "POST", persona);
        if (!res.ok) {
          const err = await res.json();
          alert("Error crear: " + (err?.message || res.status));
          return;
        }
        alert("Creado");
        listarPersonas();
      } catch (err) {
        console.error(err);
        alert("Error al crear");
      }
    });

  document.getElementById("btnCancelar").addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
  });
}

const btnCrear = document.getElementById("btnCrear");
if (btnCrear) btnCrear.addEventListener("click", formCrear);

async function mostrarFormularioEditar(id) {
  try {
    const res = await apiRequest(`/personas/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error("No se pudo cargar la persona");
    const p = await res.json();

    const html = `
<div class="flex justify-center ">
  <h2 class="text-xl font-semibold mb-4 text-center">Editar persona</h2>
  <form id="formEditar" class="bg-white rounded-md p-6 flex flex-col gap-3 w-80 shadow-md">

    <input type="hidden" id="edit_id" value="${p.id}">

    <input id="edit_nombre" class="border rounded p-2" placeholder="Nombre" value="${p.nombre}" required>
    <input id="edit_apellido" class="border rounded p-2" placeholder="Apellido" value="${p.apellido}" required>
    <input id="edit_ci" type="number" class="border rounded p-2" placeholder="CI" value="${p.ci}" required>
    <input id="edit_direc" class="border rounded p-2" placeholder="Dirección" value="${p.direccion}">
    <input id="edit_telefono" class="border rounded p-2" placeholder="Teléfono" value="${p.telefono}">
    <input id="edit_email" type="email" class="border rounded p-2" placeholder="Email" value="${p.email}">

    <div class="flex justify-between mt-4">
      <button type="submit" class="bg-indigo-300 text-black p-2 rounded hover:text-white hover:bg-indigo-500">Guardar</button>
      <button type="button" id="btnCancelarEditar" class="bg-gray-300 p-2 rounded hover:text-white  hover:bg-gray-400">Cancelar</button>
    </div>

  </form>
  </div>
`;
    document.getElementById("container").innerHTML = html;

    document
      .getElementById("formEditar")
      .addEventListener("submit", actualizarPersona);
    document
      .getElementById("btnCancelarEditar")
      .addEventListener("click", () => {
        document.getElementById("container").innerHTML = "";
      });
  } catch (err) {
    console.error(err);
    alert("No se pudo cargar la persona para editar");
  }
}

async function actualizarPersona(e) {
  e.preventDefault();
  const id = document.getElementById("edit_id").value;
  const persona = {
    nombre: document.getElementById("edit_nombre").value,
    apellido: document.getElementById("edit_apellido").value,
    ci: document.getElementById("edit_ci").value,
    direccion: document.getElementById("edit_direc").value,
    telefono: document.getElementById("edit_telefono").value,
    email: document.getElementById("edit_email").value,
  };

  try {
    const res = await apiRequest(
      `/personas/${encodeURIComponent(id)}`,
      "PUT",
      persona
    );
    if (!res.ok) {
      const err = await res.json();
      alert("Error actualizar: " + (err?.message || res.status));
      return;
    }
    alert("Actualizado");
    listarPersonas();
  } catch (err) {
    console.error(err);
    alert("Error al actualizar");
  }
}

async function eliminarPersona(id) {
  if (!confirm("Eliminar esta persona?")) return;
  try {
    const res = await apiRequest(
      `/personas/${encodeURIComponent(id)}`,
      "DELETE"
    );
    if (!res.ok) {
      const err = await res.json();
      alert("Error eliminar: " + (err?.message || res.status));
      return;
    }
    alert("Eliminado");
    listarPersonas();
  } catch (err) {
    console.error(err);
    alert("Error al eliminar");
  }
}
window.mostrarFormularioEditar = mostrarFormularioEditar;
window.eliminarPersona = eliminarPersona;
