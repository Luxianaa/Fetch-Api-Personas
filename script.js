const API_URL = "http://127.0.0.1:8000/api";

document.getElementById("btnLogin")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const token = await res.json();
    if (res.ok) {
      localStorage.setItem("token", token.token);
      window.location.href = "crud.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function listarPersonas() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_URL}/personas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error con listar las personas");
    const personas = await res.json();
    let html = `
      <h2> Listado de todas las personas</h2>
      <table border=1>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Carnet</th>
            <th>Direccion</th>
            <th>Telf</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
      `;
    personas.forEach((persona) => {
      html += `
          <tr>
          <td>${persona.id}</td>
          <td>${persona.nombre} </td>
          <td>${persona.apellido}</td>
          <td>${persona.ci} </td>
          <td>${persona.direccion} </td>
          <td>${persona.telefono}</td>
          <td>${persona.email}</td>
          <td>
            <button class="btn btn-warning" onclick="mostrarFormularioEditar(${persona.id})">Editar</button>
            <button class="btn btn-danger" onclick="eliminarPersona(${persona.id})   ">Eliminar</button>
            </td>
          </tr>
        `;
    });

    html += `
    </tbody>
        </table>
        `;
    document.getElementById("container").innerHTML = html;
  } catch (error) {
    console.error("Error:", error);
    alert("No se puede cargar personas");
  }
}
document.getElementById("btnCargar")?.addEventListener("click", listarPersonas);
document.getElementById("btnCrear")?.addEventListener("click", () => {
  formCrear();
});
function formCrear() {
  const html = `
  <h2>Nueva Persona</h2>
  <form id="formPersona" style="display: flex; flex-direction: column; gap: 10px; max-width: 400px; margin: auto;">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre">
    <label for="apellido">Apellido:</label>
    <input type="text" id="apellido">
    <label for="ci">Carnet:</label>
    <input type="text" id="ci">
    <label for="direccion">Direccion:</label>
    <input type="text" id="direccion">
    <label for="telefono">Telefono:</label>
    <input type="text" id="telefono">
    <label for="email">Email:</label>
    <input type="email" id="email">
    <div>
        <button type="submit">Crear</button>
        <button type="button" id="btnCancelar">Cancelar</button>
    </div>
</form>
  `;
  document.getElementById("container").innerHTML = html;
  document
    .getElementById("formPersona")
    .addEventListener("submit", crearPersona);
  document.getElementById("btnCancelar").addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
  });
}
// Función para crear persona
async function crearPersona(event) {
  event.preventDefault();

  const token = localStorage.getItem("token");
  const persona = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    ci: document.getElementById("ci").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
  };

  try {
    const res = await fetch(`${API_URL}/personas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(persona),
    });

    const data = await res.json(); // Obtener la respuesta
    console.log("Respuesta de la API:", data); // Ver qué devuelve
    console.log("Status:", res.status);

    if (!res.ok) throw new Error("Error al crear la persona");

    alert("Persona creada exitosamente");
    listarPersonas(); // Recarga la lista de personas
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo crear la persona");
  }
}
// ...existing code...

async function eliminarPersona(id) {
  if (!confirm("¿Está seguro de eliminar esta persona?")) {
    return;
  }

  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_URL}/personas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      throw new Error("No se pudo eliminar a persona");
    }

    // Verificar si hay contenido antes de parsear JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      console.log("api respuesta", data);
    }

    alert("Persona eliminada exitosamente");
    listarPersonas();
  } catch (error) {
    console.error("Error", error);
    alert("No se pudo eliminar: " + error.message);
  }
}
