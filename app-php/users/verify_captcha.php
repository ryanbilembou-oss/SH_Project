<?php
  header("Content-Type: application/json");
  header("Access-Control-Allow-Origin: *");

  $input = json_decode(file_get_contents("php://input"), true);
  $captchaResponse = $input["captcha"] ?? "";

  $secretKey = "6LcmXpwsAAAAAAOYDRYo1xMSzoTW5_TFjuN-JBtD";

  $response = file_get_contents(
      "https://www.google.com/recaptcha/api/siteverify?secret=" . $secretKey . "&response=" . $captchaResponse
  );

  $data = json_decode($response);

  echo json_encode(["success" => $data->success]);
?>