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

    $course_title = $input["title"];
    $course_description = $input["description"];

    $query = "
        DECLARE @course_id CHAR(10)

        WHILE 1 = 1
        BEGIN
            SET @course_id = LEFT(CONVERT(NVARCHAR(36), NEWID()), 10)

            IF NOT EXISTS (SELECT 1 FROM course WHERE course_id = @course_id)
            BEGIN
                BREAK
            END
        END

        INSERT INTO course 
        (course_id, course_title, course_description, date_published)
        VALUES
        (@course_id, ?, ?, GETDATE())
    ";
    $params = array($course_title, $course_description);
    $result = sqlsrv_query($conn, $query, $params);

    if($result===false) {
        echo json_encode(["error" => "Failed to save course"]);
    } 
    else{
        echo 1;
    }
    sqlsrv_close($conn);

?>