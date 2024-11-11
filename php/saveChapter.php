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

    $course_id = $input["course_id"];
    $chapter_title = $input["title"];
    $chapter_description = $input["description"];
    $chapter_content = $input["content"];
    $chapter_img_url = $input["chapter_img"];

    $query = "
        DECLARE @chapter_id CHAR(10)

        WHILE 1 = 1
        BEGIN
            SET @chapter_id = LEFT(CONVERT(NVARCHAR(36), NEWID()), 10)

            IF NOT EXISTS (SELECT 1 FROM chapter WHERE chapter_id = @chapter_id)
            BEGIN
                BREAK
            END
        END

        INSERT INTO chapter 
        (course_id, chapter_id, chapter_title, chapter_description, chapter_content, chapter_img_url, date_published)
        VALUES
        (?, @chapter_id, ?, ?, ?, ?, GETDATE())
    ";

    $params = array($course_id, $chapter_title, $chapter_description, $chapter_content, $chapter_img_url);
    $result = sqlsrv_query($conn, $query, $params);

    if($result===false){
        echo json_encode(["error" => "Failed to save chapter"]);
    }
    else{
        echo 1;
    }
    sqlsrv_close($conn);
?>
