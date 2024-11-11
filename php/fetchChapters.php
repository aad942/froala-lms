<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit();
    }
    include "connection.php";

    $course_id = $_GET["course_id"];

    $query = "SELECT chapter_id, chapter_title, chapter_description, date_published FROM chapter WHERE course_id = ?";
    $params = array($course_id);
    $result = sqlsrv_query($conn, $query, $params);

    if ($result === false) {
        die("Error in query preparation/execution: " . print_r(sqlsrv_errors(), true));
    }
    $chapters = array();
    while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){
        $chapters[] = $row;
    }

    sqlsrv_close($conn);
    echo json_encode($chapters);
?>
