using Newtonsoft.Json.Linq;
using System.Text;
using System.Net.Http;
using ClientePersonas;

namespace ClientePersonas
{
    public partial class LoginForm : Form
    {
        private static readonly HttpClient client = new HttpClient();
        public LoginForm()
        {
            InitializeComponent();
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            string email = txtEmail.Text;
            string password = txtPassword.Text;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Por favor ingresa tu correo y password.");
                return;
            }

            var datosLogin = new
            {
                email = email,
                password = password
            };

            var contenido = new StringContent(
                Newtonsoft.Json.JsonConvert.SerializeObject(datosLogin),
                Encoding.UTF8,
                "application/json"
            );

            try
            {
                var respuesta = await client.PostAsync("http://127.0.0.1:8000/api/login", contenido);
                var cuerpo = await respuesta.Content.ReadAsStringAsync();

                if (respuesta.IsSuccessStatusCode)
                {
                    var json = JObject.Parse(cuerpo);
                    var token = json["token"]?.ToString();

                    if (!string.IsNullOrEmpty(token))
                    {
                        MessageBox.Show("Login exitoso");

                        // ?? Muestra el formulario de personas y pasa el token
                        PersonasForm form = new PersonasForm(token);
                        form.Show();
                        this.Hide();
                    }
                    else
                    {
                        MessageBox.Show("Nay Token");
                    }
                }
                else
                {
                    MessageBox.Show("Credenciales incorrectas ?\n" + cuerpo);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error al conectar con la API\n" + ex.Message);
            }
        }

        private void LoginForm_Load_1(object sender, EventArgs e)
        {

        }

        private void labelTitulo_Click(object sender, EventArgs e)
        {

        }
    }
}

