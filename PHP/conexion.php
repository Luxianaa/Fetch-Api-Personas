<?php
// URL de la API
define('API_URL', 'http://127.0.0.1:8000/api');

// Llamar a la API
function api($ruta, $metodo = 'GET', $datos = null, $token = null) {
    $ch = curl_init(API_URL . $ruta);
    
    $headers = ['Content-Type: application/json'];
    if ($token) $headers[] = "Authorization: Bearer $token";
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $metodo);
    if ($datos) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
    
    $res = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($res, true);
}
?>
