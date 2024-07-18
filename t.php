<?php
// Obtener y mostrar el nombre del usuario del servidor web
$user = get_current_user();
echo "Usuario del servidor web: $user\n";

// Obtener y mostrar el usuario del proceso PHP
$processUser = posix_getpwuid(posix_geteuid());
echo "Usuario del proceso PHP: " . $processUser['name'] . "\n";
?>
