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

    if (isset($_GET["chapterId"])) {
        $chapterId = $_GET["chapterId"];

        $query = "SELECT chapter_title, chapter_description, chapter_content, chapter_img_url, date_published FROM chapter WHERE chapter_id = ?";
        $params = array($chapterId);
        $stmt = sqlsrv_query($conn, $query, $params);

        if($stmt === false){
            http_response_code(500);
            echo json_encode(["error" => "Failed to query the database."]);
            exit;
        }

        $chapter = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        if($chapter){
            echo json_encode($chapter);
        }
        else{
            http_response_code(404);
            echo json_encode(["message" => "Chapter not found"]);
        }

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($conn);
    }
    else{
        echo json_encode(["message" => "Chapter ID not provided"]);
    }
?>
