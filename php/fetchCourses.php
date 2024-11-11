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

    $query = "SELECT course_id, course_title, course_description, date_published FROM course";
    $result = sqlsrv_query($conn, $query);

    $courses = array();
    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        $courses[] = $row;
    }

    sqlsrv_close($conn);
    echo json_encode($courses);
?>