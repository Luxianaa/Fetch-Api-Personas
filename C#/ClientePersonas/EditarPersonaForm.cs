using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ClientePersonas
{
    public partial class EditarPersonaForm : Form
    {
        private readonly string _token;
        private readonly int _idPersona;
        private static readonly HttpClient client = new HttpClient();

        public EditarPersonaForm(string token, Persona persona)
        {
            InitializeComponent();
    
            _token = token;
            _idPersona = persona.id;

            txtNombre.Text = persona.nombre;
            txtApellido.Text = persona.apellido;
            txtCi.Text = persona.ci;
            txtDireccion.Text = persona.direccion;
            txtTelefono.Text = persona.telefono;
            txtEmail.Text = persona.email;
        }
        private async void btnGuardar_Click(object sender, EventArgs e)
        {
            var personaEditada = new
            {
                nombre = txtNombre.Text.Trim(),
                apellido = txtApellido.Text.Trim(),
                ci = txtCi.Text.Trim(),
                direccion = txtDireccion.Text.Trim(),
                telefono = txtTelefono.Text.Trim(),
                email = txtEmail.Text.Trim()
            };


            try
            {
                var contenido = new StringContent(
                    JsonConvert.SerializeObject(personaEditada),
                    Encoding.UTF8,
                    "application/json"
                );

                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _token);

                var resp = await client.PutAsync($"http://127.0.0.1:8000/api/personas/{_idPersona}", contenido);

                if (resp.IsSuccessStatusCode)
                {
                    MessageBox.Show("Persona actualizada ", "exito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    this.DialogResult = DialogResult.OK;
                    this.Close();
                }
                else
                {
                    var error = await resp.Content.ReadAsStringAsync();
                    MessageBox.Show("No se puede actualizar: " + error, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("No hay conexion con la API:\n" + ex.Message, "Error al conectar ", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }
 
        private void EditarPersonaForm_Load(object sender, EventArgs e)
        {

        }
    }
}
