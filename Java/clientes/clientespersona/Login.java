

import java.util.Scanner;

public class Login {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        try {
            System.out.println("LOGIN");
            System.out.print("Email: ");
            String email = sc.nextLine();
            
            System.out.print("Password: ");
            String password = sc.nextLine();
            
            if (ApiClient.login(email, password)) {
                System.out.println("\nInicio correcoo");
                System.out.println("Token: " + ApiClient.token);
                
                Crud.main(args);
            } else {
                System.out.println("\nError al logearse");
            }
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
        
        sc.close();
    }
}
