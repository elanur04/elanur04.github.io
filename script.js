const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menu && navbar) {
    menu.onclick = () => {
        navbar.classList.toggle('active');
    };
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const phone = (formData.get('phone') || '').toString().trim();
        const subject = (formData.get('subject') || '').toString().trim() || 'Portföy İletişim';
        const message = (formData.get('message') || '').toString().trim();

        const bodyLines = [
            `Ad: ${name}`,
            `E-posta: ${email}`,
            `Telefon: ${phone}`,
            '',
            message
        ];

        const mailtoUrl = `mailto:beycanelanur@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        window.location.href = mailtoUrl;
    });
}
