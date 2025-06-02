class SecurityController {
    constructor() {
        this.elements = {
            images: document.querySelectorAll('img'),
            discordProfile: document.querySelector('.discord-integration'),
            viewCounter: document.querySelector('.views-counter'),
            viewTooltip: document.querySelector('.views-tooltip'),
            tooltips: document.querySelectorAll('[data-tooltip]'),
            hoverElements: document.querySelectorAll('.hover-effect'),
            profileImage: document.querySelector('.profile-image'),
            badges: document.querySelectorAll('.discord_badges img'),
            activityImages: document.querySelectorAll('#activity_image img'),
            card: document.querySelector('.card'),
            body: document.body,
            // Etkileşime izin verilecek elementler
            preloader: document.querySelector('#preloader'),
            navLinks: document.querySelectorAll('.nav-link'),
            audioControls: document.querySelector('audio'),
            buttons: document.querySelectorAll('button, .button, .btn'),
            socialLinks: document.querySelectorAll('.social-links a'),
            // Müzik kontrolleri için yeni elementler
            volumeIcon: document.querySelector('#volumeIcon'),
            volumeSlider: document.querySelector('#volumeSlider'),
            musicControls: document.querySelectorAll('.music-controls, .music-controls *')
        };

        this.initializeSecurity();
        this.applySecurityStyles();
        this.setupEventListeners();
        this.preventInspect();
        this.allowInteractions();
    }

    initializeSecurity() {
        // Tüm sayfa için koruma
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('copy', e => e.preventDefault());
        document.addEventListener('cut', e => e.preventDefault());
        document.addEventListener('paste', e => e.preventDefault());

        // Tüm görseller için koruma
        this.elements.images.forEach(img => this.protectElement(img));

        // Kart içeriği için özel koruma
        if (this.elements.card) {
            this.protectElement(this.elements.card);
            this.elements.card.style.pointerEvents = 'none';
        }

        // Discord profili için özel koruma
        if (this.elements.discordProfile) {
            this.protectElement(this.elements.discordProfile);
        }

        // Görüntülenme sayacı için sadece sağ tık engelleme
        if (this.elements.viewCounter) {
            this.elements.viewCounter.addEventListener('contextmenu', e => e.preventDefault());
        }
    }

    protectElement(element) {
        if (!element) return;

        // Profil resimleri için özel kontrol
        const isProfileImage = element.id === 'main_discord_avatar' || 
                              element.id === 'discord_avatar' ||
                              element.closest('.profile-image');

        if (isProfileImage) {
            element.style.pointerEvents = 'auto';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            return; // Diğer kısıtlamaları uygulama
        }

        // Diğer elementler için normal koruma
        element.setAttribute('draggable', 'false');
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.webkitTouchCallout = 'none';
        element.style.pointerEvents = 'none';
        
        // Event listener'lar
        element.addEventListener('contextmenu', e => e.preventDefault());
        element.addEventListener('dragstart', e => e.preventDefault());
        element.addEventListener('copy', e => e.preventDefault());
        element.addEventListener('cut', e => e.preventDefault());
        element.addEventListener('paste', e => e.preventDefault());
        element.addEventListener('selectstart', e => e.preventDefault());
    }

    applySecurityStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
            }

            img, .profile-image, .discord-integration, .card {
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
                pointer-events: none !important;
            }

            /* Etkileşime izin verilen elementler */
            #preloader, 
            .nav-link,
            audio,
            button,
            .button,
            .btn,
            .social-links a,
            #navbar,
            .mobile-nav-toggle,
            .portfolio-lightbox,
            .portfolio-details-lightbox,
            #volumeIcon,
            #volumeSlider,
            .music-controls,
            .music-controls *,
            audio::-webkit-media-controls,
            audio::-webkit-media-controls-panel,
            audio::-webkit-media-controls-play-button,
            audio::-webkit-media-controls-volume-slider {
                pointer-events: auto !important;
                cursor: pointer !important;
            }

            /* Görüntülenme sayacı için özel stil */
            .views-counter {
                pointer-events: auto !important;
                cursor: default !important;
            }

            /* Müzik kontrolleri için özel stiller */
            #volumeIcon,
            #volumeSlider,
            .music-controls {
                pointer-events: auto !important;
                cursor: pointer !important;
                z-index: 1000 !important;
            }

            /* Özel cursor stilleri */
            body, * {
                cursor: url('images/cur.png'), auto !important;
            }

            /* Tıklanabilir elementler için hover cursor */
            a, button, .button, .btn, #preloader, 
            .nav-link, .social-links a, #volumeIcon, 
            #volumeSlider, .music-controls, 
            .portfolio-lightbox, .mobile-nav-toggle {
                cursor: url('cursors/pointer.cur'), pointer !important;
            }

            /* Link hover efekti */
            a:hover, button:hover, .button:hover, .btn:hover {
                cursor: url('cursors/pointer_hover.cur'), pointer !important;
            }

            /* Metin seçimi için cursor */
            input, textarea {
                cursor: url('cursors/text.cur'), text !important;
            }

            /* Yükleme durumu için cursor */
            .loading {
                cursor: url('cursors/loading.cur'), wait !important;
            }

            /* Yardım için cursor */
            [title], [data-tooltip] {
                cursor: url('cursors/help.cur'), help !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Klavye kısayolları engelleme
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && 
                ('sacupvix'.indexOf(e.key.toLowerCase()) !== -1)) {
                e.preventDefault();
                return false;
            }
        }, true);

        // F12 ve diğer geliştirici araçları kısayollarını engelle
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C')) {
                e.preventDefault();
                return false;
            }
        }, true);
    }

    preventInspect() {
        // Sağ tık menüsünü tamamen engelle
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        }, true);

        // DevTools açılmasını zorlaştır
        setInterval(() => {
            const devtools = /./;
            devtools.toString = function() {
                this.opened = true;
            }
            console.log('%c', devtools);
        }, 1000);

        // Konsol mesajlarını temizle
        console.clear();
    }

    temporarilyHideContent() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            el.style.visibility = 'hidden';
        });

        setTimeout(() => {
            elements.forEach(el => {
                el.style.visibility = 'visible';
            });
        }, 100);
    }

    allowInteractions() {
        // Mevcut etkileşimler
        if (this.elements.preloader) {
            this.elements.preloader.style.pointerEvents = 'auto';
            this.elements.preloader.style.cursor = 'pointer';
        }

        this.elements.navLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        });

        if (this.elements.audioControls) {
            this.elements.audioControls.style.pointerEvents = 'auto';
        }

        this.elements.buttons.forEach(button => {
            button.style.pointerEvents = 'auto';
            button.style.cursor = 'pointer';
        });

        this.elements.socialLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        });

        // Müzik kontrolleri için yeni etkileşimler
        if (this.elements.volumeIcon) {
            this.elements.volumeIcon.style.pointerEvents = 'auto';
            this.elements.volumeIcon.style.cursor = 'pointer';
            this.elements.volumeIcon.style.zIndex = '1000';
        }

        if (this.elements.volumeSlider) {
            this.elements.volumeSlider.style.pointerEvents = 'auto';
            this.elements.volumeSlider.style.cursor = 'pointer';
            this.elements.volumeSlider.style.zIndex = '1000';
        }

        this.elements.musicControls.forEach(control => {
            control.style.pointerEvents = 'auto';
            control.style.cursor = 'pointer';
            control.style.zIndex = '1000';
        });

        // Görüntülenme sayacı için etkileşimleri aç
        if (this.elements.viewCounter) {
            this.elements.viewCounter.style.pointerEvents = 'auto';
            this.elements.viewCounter.style.cursor = 'help';
        }

        // Tooltip'ler için etkileşimleri aç
        this.elements.tooltips.forEach(tooltip => {
            tooltip.style.pointerEvents = 'auto';
            tooltip.style.cursor = 'help';
        });

        // Hover efektli elementler için etkileşimleri aç
        this.elements.hoverElements.forEach(element => {
            element.style.pointerEvents = 'auto';
        });
    }
}

// Güvenlik kontrolcüsünü başlat
document.addEventListener('DOMContentLoaded', () => {
    new SecurityController();
}); 