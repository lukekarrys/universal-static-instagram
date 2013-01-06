<?php
/*if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['hub_mode'] === 'subscribe' && $_GET['hub_verify_token'] === 'jekyll_instagram') {
  echo $_GET['hub_challenge'];
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {*/
  echo "hey";
  $output = `/bin/bash -c 'source /home/lkarrys/.profile && source /home/lkarrys/.rvm/environments/ruby-1.9.3-p362@jekyll-instagram && cd /home/lkarrys/www/instagram.lukelov.es/jekyll-instagram/ && /home/lkarrys/.rvm/bin/rake-ruby-1.9.3-p362@jekyll-instagram gen_deploy'`;
  print_r($output);
  echo "done";
//}

?>