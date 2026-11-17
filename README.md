# Elanur Beycan · Portföy

[Portföyü aç](https://elanur04.github.io/) · [GitHub profili](https://github.com/elanur04) · [LinkedIn](https://www.linkedin.com/in/elanurbeycan)

Yazılım geliştirme staj başvuruları için seçilmiş projeleri, kullanılan teknolojileri ve kaynak kod bağlantılarını bir araya getirir.

## GitHub Pages sürümü

`index.html` ve `portfolio.css` statik portföyü oluşturur. JavaScript veya build adımı gerektirmez; mobil ekranlara uyarlanır ve klavye ile kullanılabilir. İletişim bağlantısı LinkedIn'e gider.

```bash
python -m http.server 8080
```

Tarayıcıda http://localhost:8080 adresini açın. GitHub Pages, `main` dalının kök dizininden yayınlanır.

## PHP sürümü

Önceki PHP uygulaması `index.php`, `send_email.php`, `style.css` ve Composer dosyalarında korunur. GitHub Pages statik dosya yayınlar; PHP formunu çalıştırmaz ([GitHub belgesi](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)). PHP sürümünü ayrı bir PHP sunucusunda denemek için:

```bash
composer install
cp .env.example .env
php -S localhost:8000
```

SMTP bilgilerini kendi `.env` dosyanıza yazın ve http://localhost:8000/index.php adresini açın. Gizli bilgileri depoya eklemeyin. PHP geliştirme sunucusu yerel deneme içindir; `.htaccess` kurallarını uygulamaz.
