<?php
$host = "localhost";
$port = "5432"; 
$dbname = "sbf2023";
$user = "postgres";
$password = "123456";


try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=sbf2023", $user, $password);
    echo "Database terhubung";
} catch (PDOException $e) {
    echo "Error: Koneksi gagal - " . $e->getMessage();
}

$conn = null; 
?>
