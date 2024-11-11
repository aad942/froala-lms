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

    if (isset($_GET["courseId"])) {
        $courseId = $_GET["courseId"];

        $query = "SELECT course_id, course_title, course_description, date_published FROM course WHERE course_id = ?";
        $params = array($courseId);
        $stmt = sqlsrv_query($conn, $query, $params);

        if($stmt === false){
            http_response_code(500);
            echo json_encode(["error" => "Failed to query the database."]);
            exit;
        }

        $course = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        if($course){
            echo json_encode($course);
        }
        else{
            http_response_code(404);
            echo json_encode(["message" => "Course not found"]);
        }

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($conn);
    }
    else{
        echo json_encode(["message" => "Course ID not provided"]);
    }
?>
