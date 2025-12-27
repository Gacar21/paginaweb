<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = $_POST['user'];
    $pass = $_POST['pass'];

    if ($user === "admin" && $pass === "1234") {
        echo "Login correcto";
    } else {
        echo "Credenciales incorrectas";
    }
}
