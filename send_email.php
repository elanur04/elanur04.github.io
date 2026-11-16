<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // PHPMailer'ı composer ile yüklediysen

// .env dosyası varsa içindeki ANAHTAR=DEĞER satırlarını ortam değişkeni olarak yükle
$envFile = __DIR__ . '/.env';
if (is_readable($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) continue;
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        putenv("$key=$value");
    }
}

$mail = new PHPMailer(true);

try {
    // Form verilerini HTML'e güvenli şekilde aktar
    $clean = fn($key) => htmlspecialchars(trim($_POST[$key] ?? ''), ENT_QUOTES, 'UTF-8');
    $name    = $clean('name');
    $email   = $clean('email');
    $phone   = $clean('phone');
    $subject = $clean('subject');
    $message = nl2br($clean('message'));

    // SMTP bilgileri koda yazılmaz; sunucu ortam değişkenlerinden okunur (bkz. .env.example)
    $smtpUser = getenv('SMTP_USER');
    $smtpPass = getenv('SMTP_PASS');
    $mailTo   = getenv('MAIL_TO') ?: $smtpUser;
    
    //Sunucu ayarları
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // SMTP sunucusu
    $mail->SMTPAuth = true;           // Kimlik doğrulama aktif
    $mail->Username = $smtpUser;     // SMTP kullanıcı adı (email)
    $mail->Password = $smtpPass;     // SMTP uygulama şifresi
    $mail->SMTPSecure = 'tls';        // Güvenlik türü (tls veya ssl)
    $mail->Port = 587;                // Port numarası (tls için 587)

    //Alıcı ve gönderici
    $mail->setFrom($smtpUser, 'Portfolyo İletişim Formu');
    $mail->addAddress($mailTo);
    if ($email !== '') { $mail->addReplyTo(html_entity_decode($email)); }

    //İçerik
    $mail->isHTML(true);
    $mail->Subject = 'Portfolyo iletişim: ' . html_entity_decode($subject);
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
