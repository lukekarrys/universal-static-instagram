<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['hub_mode'] === 'subscribe' && $_GET['hub_verify_token'] === 'jekyll_instagram') {
  echo $_GET['hub_challenge'];
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  exec('cd ../../jekyll-instagram/ && sh recent.sh');
}

?>