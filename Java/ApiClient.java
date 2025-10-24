import java.io.*;
import java.net.*;
import org.json.*;

public class ApiClient {
    private static final String BASE_URL = "http://127.0.0.1:8000/api";
    public static String token = null;

    // Login
    public static boolean login(String email, String password) throws Exception {
        String json = String.format("{\"email\":\"%s\",\"password\":\"%s\"}", email, password);
        String response = request("/login", "POST", json, null);
        
        JSONObject obj = new JSONObject(response);
        if (obj.has("token")) {
            token = obj.getString("token");
            return true;
        }
        return false;
    }

    // GET
    public static String get(String ruta) throws Exception {
        return request(ruta, "GET", null, token);
    }

    // POST
    public static String post(String ruta, String json) throws Exception {
        return request(ruta, "POST", json, token);
    }

    // PUT
    public static String put(String ruta, String json) throws Exception {
        return request(ruta, "PUT", json, token);
    }

    // DELETE
    public static String delete(String ruta) throws Exception {
        return request(ruta, "DELETE", null, token);
    }

    // Método principal para hacer peticiones HTTP
    private static String request(String ruta, String metodo, String body, String authToken) throws Exception {
        URL url = new URL(BASE_URL + ruta);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod(metodo);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        
        if (authToken != null) {
            conn.setRequestProperty("Authorization", "Bearer " + authToken);
        }

        if (body != null && (metodo.equals("POST") || metodo.equals("PUT"))) {
            conn.setDoOutput(true);
            OutputStream os = conn.getOutputStream();
            os.write(body.getBytes("UTF-8"));
            os.close();
        }

        int responseCode = conn.getResponseCode();
        InputStream is = (responseCode < 400) ? conn.getInputStream() : conn.getErrorStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            response.append(line);
        }
        br.close();
        conn.disconnect();

        return response.toString();
    }
}
