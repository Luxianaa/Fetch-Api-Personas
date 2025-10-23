export function formCrearHTML() {
  return `
    <h2 class="text-xl font-semibold mb-4">Crear Persona</h2>
    <form id="formPersona" class="flex flex-col gap-3">
      <input id="nombre" class="border rounded p-2" placeholder="Nombre" required />
      <input id="apellido" class="border rounded p-2" placeholder="Apellido" required />
      <input id="ci" type="number" class="border rounded p-2" placeholder="CI" required />
      <input id="direccion" class="border rounded p-2" placeholder="Dirección" />
      <input id="telefono" class="border rounded p-2" placeholder="Teléfono" />
      <input id="email" type="email" class="border rounded p-2" placeholder="Email" />
      <div class="flex justify-between mt-4">
        <button class="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600" type="submit">Crear</button>
        <button class="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400" type="button" id="btnCancelar">Cancelar</button>
      </div>
    </form>
  `;
}
