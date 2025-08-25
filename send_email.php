<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // PHPMailer'ı composer ile yüklediysen

$mail = new PHPMailer(true);

try {
    $name=$_POST['name'];
    $email = $_POST['email'];
    $phone=$_POST['phone'];
    $subject =$_POST['subject'];
    $message=$_POST['message'];
    
    //Sunucu ayarları
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // SMTP sunucusu
    $mail->SMTPAuth = true;           // Kimlik doğrulama aktif
    $mail->Username = 'dnzgngor09@gmail.com'; // SMTP kullanıcı adı (email)
    $mail->Password = 'plxchouquyjvzquk'; // SMTP şifresi
    $mail->SMTPSecure = 'tls';        // Güvenlik türü (tls veya ssl)
    $mail->Port = 587;                // Port numarası (tls için 587)

    //Alıcı ve gönderici
    $mail->setFrom('dnzgngor09@gmail.com','gmail.com');
    $mail->addAddress('dnzgngor09@gmail.com');

    //İçerik
    $mail->isHTML(true);
    $mail->Subject = 'Test Email'.$subject;
    $mail->Body    = "
    <h1>Bana Ulaş Formu Mesajı:</h1>
    <p><b>Ad:</b> {$name}</p>
    <p><b>E-posta:</b> {$email}</p>
    <p><b>Telefon:</b> {$phone}</p>
    <p><b>Konu:</b> {$subject}</p>
    <p><b>Mesaj:</b> {$message}</p>   ";

    $mail->send();
    $_SESSION['message']='Mailiniz başarıyla gönderildi.';
    header('Location: index.php#form');
    exit;
    
} catch (Exception $e) {
    $_SESSION['error_message']='Mail gönderilemedi.Lütfen daha sonra tekrar gönderiniz.';
    header('Location: index.php');
    exit;
  
}
?>