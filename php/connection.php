<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    $serverName = "YourServerName";

    $connectionInfo = array("Database"=>"testdb");
    $conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn === false) {
		echo "Connection could not be established. \n";
		die(print_r(sqlsrv_errors(), true));
	}
?>
