<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['hub_mode'] === 'subscribe' && $_GET['hub_verify_token'] === 'jekyll_instagram') {
  echo $_GET['hub_challenge'];
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  exec("bin/bash -c 'source /home/lkarrys/.rvm/environments/ruby-1.9.2-p320@jekyll-instagram && cd /home/lkarrys/www/instagram.lukelov.es/jekyll-instagram/ && /bin/bash /home/lkarrys/www/instagram.lukelov.es/jekyll-instagram/update'");
}

?>