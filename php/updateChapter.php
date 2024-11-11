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

    $input = json_decode(file_get_contents("php://input"), true);

    $chapter_id = $input["chapter_id"];
    $chapter_title = $input["chapter_title"];
    $chapter_description = $input["chapter_description"];
    $chapter_content = $input["chapter_content"];

    $query = "
        UPDATE chapter SET
        chapter_title = ?,
        chapter_description = ?,
        chapter_content = ?
        WHERE chapter_id = ?
    ";

    $params = array($chapter_title, $chapter_description, $chapter_content, $chapter_id);
    $result = sqlsrv_query($conn, $query, $params);

    if($result===false){
        echo json_encode(["error" => "Failed to save chapter"]);
    }
    else{
        echo 1;
    }
    sqlsrv_close($conn);
?>
