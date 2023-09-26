<?php
// Koneksi ke database
$host = "localhost";
$port = "5432";
$dbname = "sbf2023";
$user = "postgres";
$password = "123456";

try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
} catch (PDOException $e) {
    echo "Error: Koneksi gagal - " . $e->getMessage();
}

// get data client
$data = json_decode(file_get_contents("php://input"), true);

// Cek data in db
$nisnResult = $data['nisnResult'];

$sql = "SELECT * FROM data_x WHERE nisn = :nisnResult";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':nisnResult', $nisnResult, PDO::PARAM_STR);
$stmt->execute();

$response = array();

if ($stmt->rowCount() > 0) {
    $response['existsInDatabase'] = true;
} else {
    $response['existsInDatabase'] = false;
}

// response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
