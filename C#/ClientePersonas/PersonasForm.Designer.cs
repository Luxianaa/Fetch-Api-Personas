namespace ClientePersonas
{
    partial class PersonasForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            dataGridView1 = new DataGridView();
            btnCargar = new Button();
            btnAgregar = new Button();
            btnEditar = new Button();
            btnEliminar = new Button();
            labelTitulo = new Label();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            SuspendLayout();
            // 
            // dataGridView1
            // 
            dataGridView1.AllowUserToAddRows = false;
            dataGridView1.AllowUserToDeleteRows = false;
            dataGridView1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(20, 70);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.RowHeadersWidth = 51;
            dataGridView1.Size = new Size(760, 260);
            dataGridView1.TabIndex = 0;
            // 
            // btnCargar
            // 
            btnCargar.Location = new Point(50, 360);
            btnCargar.Name = "btnCargar";
            btnCargar.Size = new Size(120, 35);
            btnCargar.TabIndex = 1;
            btnCargar.Text = "Cargar";
            btnCargar.UseVisualStyleBackColor = true;
            btnCargar.Click += btnCargar_Click;
            // 
            // btnAgregar
            // 
            btnAgregar.Location = new Point(200, 360);
            btnAgregar.Name = "btnAgregar";
            btnAgregar.Size = new Size(120, 35);
            btnAgregar.TabIndex = 2;
            btnAgregar.Text = "Agregar";
            btnAgregar.UseVisualStyleBackColor = true;
            btnAgregar.Click += btnAgregar_Click;
            // 
            // btnEditar
            // 
            btnEditar.Location = new Point(350, 360);
            btnEditar.Name = "btnEditar";
            btnEditar.Size = new Size(120, 35);
            btnEditar.TabIndex = 3;
            btnEditar.Text = "Editar";
            btnEditar.UseVisualStyleBackColor = true;
            btnEditar.Click += btnEditar_Click;
            // 
            // btnEliminar
            // 
            btnEliminar.Location = new Point(500, 360);
            btnEliminar.Name = "btnEliminar";
            btnEliminar.Size = new Size(120, 35);
            btnEliminar.TabIndex = 4;
            btnEliminar.Text = "Eliminar";
            btnEliminar.UseVisualStyleBackColor = true;
            btnEliminar.Click += btnEliminar_Click;
            // 
            // labelTitulo
            // 
            labelTitulo.AutoSize = true;
            labelTitulo.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            labelTitulo.Location = new Point(260, 20);
            labelTitulo.Name = "labelTitulo";
            labelTitulo.Size = new Size(275, 37);
            labelTitulo.TabIndex = 5;
            labelTitulo.Text = "Gestion de Personas";
            labelTitulo.Click += labelTitulo_Click;
            // 
            // PersonasForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 420);
            Controls.Add(labelTitulo);
            Controls.Add(btnEliminar);
            Controls.Add(btnEditar);
            Controls.Add(btnAgregar);
            Controls.Add(btnCargar);
            Controls.Add(dataGridView1);
            Name = "PersonasForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Personas";
            Load += PersonasForm_Load;
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }


        #endregion

        private DataGridView dataGridView1;
        private Button btnCargar;
        private Button btnAgregar;
        private Button btnEditar;
        private Button btnEliminar;
        private Label labelTitulo;

    }
}