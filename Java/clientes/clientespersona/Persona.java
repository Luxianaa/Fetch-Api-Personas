public class Persona {
    public int id;
    public String nombre;
    public String apellido;
    public String ci;
    public String direccion;
    public String telefono;
    public String email;

    public Persona() {}

    public Persona(String nombre, String apellido, String ci, String direccion, String telefono, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ci = ci;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format("ID: %d | %s %s | CI: %s | Tel: %s | Email: %s",
            id, nombre, apellido, ci, telefono, email);
    }
}
