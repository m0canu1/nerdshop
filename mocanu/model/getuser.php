<?php
require 'common.php';
echo json_encode(array('user' => $_SESSION['user']), JSON_THROW_ON_ERROR, 512);
