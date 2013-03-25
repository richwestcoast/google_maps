<?php

if($_GET['coords']){
	echo 'saving coords'.json_encode($_GET['coords']);
	file_put_contents("coords.txt", json_encode($_GET['coords']));
}
else{
	echo file_get_contents("coords.txt");
}