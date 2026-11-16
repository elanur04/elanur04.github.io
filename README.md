# Kişisel Portfolyo Sitesi

PHP ile hazırlanmış kişisel portfolyo sayfası. "Bana Ulaş" formundan gelen mesajlar
PHPMailer ile e-posta olarak iletilir.

## Teknolojiler

- PHP 8, HTML, CSS, JavaScript
- PHPMailer (Composer ile)

## Kurulum

```bash
git clone https://github.com/elanur04/elanur04.github.io.git
cd elanur04.github.io
composer install
cp .env.example .env   # SMTP bilgilerini .env içine yazın
php -S localhost:8000
```

Tarayıcıda <http://localhost:8000> adresini açın.

## Güvenlik notu

SMTP kullanıcı adı ve şifresi koda yazılmaz; `.env` dosyasından okunur. `.env` dosyası
`.gitignore` ile depodan, `.htaccess` ile de tarayıcı erişiminden hariç tutulur.
Gmail için normal hesap şifresi yerine bir **uygulama şifresi** kullanın.
