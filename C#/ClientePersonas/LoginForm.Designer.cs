namespace ClientePersonas
{
    partial class LoginForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            labelTitulo = new Label();
            labelEmail = new Label();
            txtEmail = new TextBox();
            labelPassword = new Label();
            txtPassword = new TextBox();
            btnLogin = new Button();
            SuspendLayout();
            // 
            // labelTitulo
            // 
            labelTitulo.AutoSize = true;
            labelTitulo.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            labelTitulo.Location = new Point(250, 40);
            labelTitulo.Name = "labelTitulo";
            labelTitulo.Size = new Size(279, 37);
            labelTitulo.TabIndex = 0;
            labelTitulo.Text = "Login al Sistema API";
            labelTitulo.Click += labelTitulo_Click;
            // 
            // labelEmail
            // 
            labelEmail.AutoSize = true;
            labelEmail.Location = new Point(230, 120);
            labelEmail.Name = "labelEmail";
            labelEmail.Size = new Size(49, 20);
            labelEmail.TabIndex = 1;
            labelEmail.Text = "Correo";
            // 
            // txtEmail
            // 
            txtEmail.Location = new Point(230, 150);
            txtEmail.Name = "txtEmail";
            txtEmail.Size = new Size(300, 27);
            txtEmail.TabIndex = 2;
            // 
            // labelPassword
            // 
            labelPassword.AutoSize = true;
            labelPassword.Location = new Point(230, 200);
            labelPassword.Name = "labelPassword";
            labelPassword.Size = new Size(86, 20);
            labelPassword.TabIndex = 3;
            labelPassword.Text = "Password";
            // 
            // txtPassword
            // 
            txtPassword.Location = new Point(230, 230);
            txtPassword.Name = "txtPassword";
            txtPassword.Size = new Size(300, 27);
            txtPassword.TabIndex = 4;
            txtPassword.UseSystemPasswordChar = true;
            // 
            // btnLogin
            // 
            btnLogin.Font = new Font("Segoe UI", 10F, FontStyle.Bold);
            btnLogin.Location = new Point(300, 290);
            btnLogin.Name = "btnLogin";
            btnLogin.Size = new Size(160, 45);
            btnLogin.TabIndex = 5;
            btnLogin.Text = "Iniciar Sesion";
            btnLogin.UseVisualStyleBackColor = true;
            btnLogin.Click += btnLogin_Click;
            // 
            // LoginForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(720, 446);
            Controls.Add(btnLogin);
            Controls.Add(txtPassword);
            Controls.Add(labelPassword);
            Controls.Add(txtEmail);
            Controls.Add(labelEmail);
            Controls.Add(labelTitulo);
            Name = "LoginForm";
            Text = "Login";
            Load += LoginForm_Load_1;
            ResumeLayout(false);
            PerformLayout();
        }



        #endregion

        private Label labelTitulo;
        private Label labelEmail;
        private TextBox txtEmail;
        private Label labelPassword;
        private TextBox txtPassword;
        private Button btnLogin;
    }
}
