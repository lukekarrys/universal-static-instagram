<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['endpoint']) && isset($_POST['access_token']) && isset($_POST['id'])) {
  $id = $_POST['id'];
  $token = $_POST['access_token'];
  $endpoint = $_POST['endpoint'];
  $qs = "access_token=$token";
  $url = 'https://api.instagram.com/v1/media/'.$id.'/'.$endpoint;

  if (isset($_POST['text'])) {
    $text = urlencode($_POST['text']);
    $qs .= "&text=" . $text;
  }

  if (isset($_POST['_method'])) {
    $method = $_POST['_method'];
    $qs .= "&_method=" . $method;
  }

  if (isset($_POST['comment_id'])) {
    $comment_id = $_POST['comment_id'];
    $url .= "/" . $comment_id;
  }

  $cs = curl_init($url);
  curl_setopt($cs, CURLOPT_POST, 1);
  curl_setopt($cs, CURLOPT_POSTFIELDS, $qs);
  curl_setopt($cs, CURLOPT_FOLLOWLOCATION, 1);
  curl_exec($cs);
  header("Content-Type: application/json");
  curl_close($cs);
  exit;
}

?>