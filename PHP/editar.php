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