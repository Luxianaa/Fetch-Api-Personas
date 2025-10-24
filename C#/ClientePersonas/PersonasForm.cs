using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace ClientePersonas
{
    public partial class PersonasForm : Form
    {
        private readonly string _token;
        private static readonly HttpClient client = new HttpClient();

        public PersonasForm(string token)
        {
            InitializeComponent();
            _token = token;
        }

        private async void PersonasForm_Load(object sender, EventArgs e)    
        {
            await CargarPersonas();
        }

        private async Task CargarPersonas()
        {
            try
            {
                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _token);

                var response = await client.GetAsync("http://127.0.0.1:8000/api/personas");
                var json = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var personas = JsonConvert.DeserializeObject<List<Persona>>(json);
                    dataGridView1.DataSource = personas;
                }
                else
                {
                    MessageBox.Show("Error al cargar personas " + json);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error de conexion " + ex.Message);
            }
        }

        private async void btnCargar_Click(object sender, EventArgs e) => await CargarPersonas();

        private async void btnAgregar_Click(object sender, EventArgs e)
        {
            var form = new CrearPersonaForm(_token);
            if (form.ShowDialog() == DialogResult.OK)
            {
                await CargarPersonas();
            }
        }

        private async void btnEditar_Click(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count == 0)
            {
                MessageBox.Show("Selecciona una persona para editar");
                return;
            }

            var personaSeleccionada = (Persona)dataGridView1.SelectedRows[0].DataBoundItem;

            var form = new EditarPersonaForm(_token, personaSeleccionada);
            if (form.ShowDialog() == DialogResult.OK)
            {
                await CargarPersonas(); 
            }
        }

        private async void btnEliminar_Click(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count == 0)
            {
                MessageBox.Show("Selecciona una persona para eliminar");
                return;
            }

            int id = (int)dataGridView1.SelectedRows[0].Cells["id"].Value;

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _token);

            var resp = await client.DeleteAsync($"http://127.0.0.1:8000/api/personas/{id}");

            if (resp.IsSuccessStatusCode)
            {
                MessageBox.Show("Persona eliminada ");
                await CargarPersonas();
            }
            else
            {
                MessageBox.Show("Error al eliminar ");
            }
        }

        private void labelTitulo_Click(object sender, EventArgs e)
        {

        }
    }

    public class Persona
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string ci { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string email { get; set; }
    }
}
