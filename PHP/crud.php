<?php
require 'conexion.php';

$token = $_COOKIE['token'] ;


if (isset($_POST['crear'])) {
    api('/personas', 'POST', $_POST, $token);
}

// EDITAR
if (isset($_POST['editar'])) {
    api('/personas/' . $_POST['id'], 'PUT', $_POST, $token);
}

// ELIMINAR
if (isset($_GET['del'])) {
    api('/personas/' . $_GET['del'], 'DELETE', null, $token);
}

// LISTAR
$personas = api('/personas', 'GET', null, $token);

// CARGAR para editar
$edit = isset($_GET['edit']) ? api('/personas/' . $_GET['edit'], 'GET', null, $token) : null;
?>
<!DOCTYPE html>
<html>
<head><title>CRUD</title></head>
<body>
    <h1>CRUD Personas</h1>
    
    <form method="POST">
        <?php if($edit): ?>
            <input type="hidden" name="id" value="<?= $edit['id'] ?>">
        <?php endif; ?>
        <input name="nombre" value="<?= $edit['nombre'] ?? '' ?>" placeholder="Nombre" required><br>
        <input name="apellido" value="<?= $edit['apellido'] ?? '' ?>" placeholder="Apellido" required><br>
        <input name="ci" value="<?= $edit['ci'] ?? '' ?>" placeholder="CI" required><br>
        <input name="direccion" value="<?= $edit['direccion'] ?? '' ?>" placeholder="Dirección"><br>
        <input name="telefono" value="<?= $edit['telefono'] ?? '' ?>" placeholder="Teléfono"><br>
        <input name="email" value="<?= $edit['email'] ?? '' ?>" placeholder="Email"><br>
        <button name="<?= $edit ? 'editar' : 'crear' ?>"><?= $edit ? 'Actualizar' : 'Crear' ?></button>
        <?php if($edit): ?><a href="crud.php">Cancelar</a><?php endif; ?>
    </form>
    
    <hr>
    <table border="1">
        <tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>CI</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th></tr>
        <?php foreach($personas as $p): ?>
        <tr>
            <td><?= $p['id'] ?></td>
            <td><?= $p['nombre'] ?></td>
            <td><?= $p['apellido'] ?></td>
            <td><?= $p['ci'] ?></td>
            <td><?= $p['direccion'] ?></td>
            <td><?= $p['telefono'] ?></td>
            <td><?= $p['email'] ?></td>
            <td>
                <a href="?edit=<?= $p['id'] ?>">Editar</a>
                <a href="?del=<?= $p['id'] ?>" onclick="return confirm('¿Eliminar?')">Eliminar</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>