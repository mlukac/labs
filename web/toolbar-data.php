<?php

$data = json_decode(file_get_contents('php://input'), true);
$jsonFilePath = $_SERVER['DOCUMENT_ROOT'] . '/toolbar-data.json';

file_put_contents($jsonFilePath, json_encode($data));

?>