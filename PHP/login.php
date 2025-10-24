<?php
require 'conexion.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $res = api('/login', 'POST', [
        'email' => $_POST['email'],
        'password' => $_POST['password']
    ]);
    
    if (isset($res['token'])) {
        // Guardar token en cookie
        setcookie('token', $res['token'], time() + 3600, '/');
        header('Location: crud.php');
        exit;
    }
    $error = 'Email o contraseña incorrectos';
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <?php if($error): ?>
        <p style="color:red"><?= $error ?></p>
    <?php endif; ?>
    
    <form method="POST">
        <input type="email" name="email" placeholder="Correo" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Entrar</button>
    </form>
</body>
</html>
