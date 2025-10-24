import java.util.Scanner;
import org.json.*;

public class Crud {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        while (true) {
            try {
                System.out.println("\nCRUD  de personas");
                System.out.println("1. Listar todas");
                System.out.println("2. Crear nueva");
                System.out.println("3. Actualizar");
                System.out.println("4. Eliminar");
                System.out.println("5. Salir");
                System.out.print("Op: ");
                
                int opcion = Integer.parseInt(sc.nextLine());
                
                switch (opcion) {
                    case 1:
                        listar();
                        break;
                    case 2:
                        crear(sc);
                        break;
                    case 3:
                        actualizar(sc);
                        break;
                    case 4:
                        eliminar(sc);
                        break;
                    case 5:
                        System.out.println("finalizado");
                        sc.close();
                        return;
                    default:
                        System.out.println("no valido");
                }
                
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
    
    private static void listar() throws Exception {
        String response = ApiClient.get("/personas");
        JSONArray arr = new JSONArray(response);
        
        System.out.println("\n Mostrar personas");
        for (int i = 0; i < arr.length(); i++) {
            JSONObject obj = arr.getJSONObject(i);
            System.out.printf("ID: %d | %s %s | CI: %s | Tel: %s | Email: %s\n",
                obj.getInt("id"),
                obj.getString("nombre"),
                obj.getString("apellido"),
                obj.getString("ci"),
                obj.getString("telefono"),
                obj.getString("email")
            );
        }
    }
    
    private static void crear(Scanner sc) throws Exception {
        System.out.println("\nCrear erosnas");
        System.out.print("Nombre: ");
        String nombre = sc.nextLine();
        System.out.print("Apellido: ");
        String apellido = sc.nextLine();
        System.out.print("CI: ");
        String ci = sc.nextLine();
        System.out.print("Direccion: ");
        String direccion = sc.nextLine();
        System.out.print("Telf: ");
        String telefono = sc.nextLine();
        System.out.print("Email: ");
        String email = sc.nextLine();
        
        String json = String.format(
            "{\"nombre\":\"%s\",\"apellido\":\"%s\",\"ci\":\"%s\",\"direccion\":\"%s\",\"telefono\":\"%s\",\"email\":\"%s\"}",
            nombre, apellido, ci, direccion, telefono, email
        );
        
        String response = ApiClient.post("/personas", json);
        System.out.println("✓ Persona creada: " + response);
    }
    
    private static void actualizar(Scanner sc) throws Exception {
        System.out.print("\nID de la persona a actualizar: ");
        int id = Integer.parseInt(sc.nextLine());
        
        System.out.println("Editar Persona");
        System.out.print("Nombre: ");
        String nombre = sc.nextLine();
        System.out.print("Apellido: ");
        String apellido = sc.nextLine();
        System.out.print("CI: ");
        String ci = sc.nextLine();
        System.out.print("Direccion: ");
        String direccion = sc.nextLine();
        System.out.print("Telf: ");
        String telefono = sc.nextLine();
        System.out.print("Email: ");
        String email = sc.nextLine();
        
        String json = String.format(
            "{\"nombre\":\"%s\",\"apellido\":\"%s\",\"ci\":\"%s\",\"direccion\":\"%s\",\"telefono\":\"%s\",\"email\":\"%s\"}",
            nombre, apellido, ci, direccion, telefono, email
        );
        
        String response = ApiClient.put("/personas/" + id, json);
        System.out.println("✓ Persona actualizada: " + response);
    }
    
    private static void eliminar(Scanner sc) throws Exception {
        System.out.print("\nID de la persona a eliminar: ");
        int id = Integer.parseInt(sc.nextLine());
        
        String response = ApiClient.delete("/personas/" + id);
        System.out.println("Persona eliminada");
    }
}
