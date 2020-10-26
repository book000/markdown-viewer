<?php
$files = scandir("../files/");
$files = array_filter($files, function ($file){
    return $file != "." && $file != "..";
});
$files = array_values($files);
echo json_encode(["files" => $files]);