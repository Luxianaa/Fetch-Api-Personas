using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace ClientePersonas
{
    public partial class CrearPersonaForm : Form
    {
        private readonly string _token;
        private static readonly HttpClient client = new HttpClient();

        public CrearPersonaForm(string token)
        {
            InitializeComponent();
            _token = token;
        }

        private async void btnGuardar_Click(object sender, EventArgs e)
        {
            
            var nuevaPersona = new
            {
                nombre = txtNombre.Text.Trim(),
                apellido = txtApellido.Text.Trim(),
                ci = txtCi.Text.Trim(),
                direccion = txtDireccion.Text.Trim(),
                telefono = txtTelefono.Text.Trim(),
                email = txtEmail.Text.Trim()
            };

        
            if (string.IsNullOrEmpty(nuevaPersona.nombre) || string.IsNullOrEmpty(nuevaPersona.apellido))
            {
                MessageBox.Show("Por favor completa al menos el nombre y apellido.", "Campos incompletos", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
            
                var contenido = new StringContent(
                    JsonConvert.SerializeObject(nuevaPersona),
                    Encoding.UTF8,
                    "application/json"
                );

               
                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _token);

                var resp = await client.PostAsync("http://127.0.0.1:8000/api/personas", contenido);

                if (resp.IsSuccessStatusCode)
                {
                    MessageBox.Show("Persona creada  ", "Correcto", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    this.DialogResult = DialogResult.OK; 
                    this.Close();
                }
                else
                {
                    var error = await resp.Content.ReadAsStringAsync();
                    MessageBox.Show("Error no se pudo crear " + error, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error al conectar \n" + ex.Message, "+", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }

        private void CrearPersonaForm_Load(object sender, EventArgs e)
        {

        }
    }
}
