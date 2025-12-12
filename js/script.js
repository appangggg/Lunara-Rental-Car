document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. NAVBAR SCROLL EFFECT ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. SCROLL ANIMATION (REVEAL ON SCROLL) ---
    // Fungsi untuk mengecek elemen yang masuk layar
    const revealElements = document.querySelectorAll('.hero-section, .tentangkami-home, .card, .cccard, .galeri-card');

    function reveal() {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = revealElements[i].getBoundingClientRect().top;
            let elementVisible = 150; // Jarak trigger animasi

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }

    // Tambahkan class 'reveal' ke elemen target secara otomatis via JS
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    window.addEventListener('scroll', reveal);
    // Panggil sekali saat load agar elemen paling atas langsung muncul
    reveal();


    // --- 3. WHATSAPP DYNAMIC BOOKING ---
    // Mengambil tombol sewa
    const sewaButtons = document.querySelectorAll('.cc-btn');
    const waNumber = "6285299578607"; // Format nomor internasional (ganti 0 dengan 62)

    sewaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Cari elemen kartu mobil terdekat dari tombol yang diklik
            const card = this.closest('.cccard');
            
            // Ambil nama mobil dari dalam kartu tersebut
            const carName = card.querySelector('.cc-header h3').innerText;
            
            // Ambil harga (opsional)
            const price = card.querySelector('.cc-price').innerText;

            // Buat pesan otomatis
            const message = `Halo Admin Lunara Rental Car, saya ingin menyewa mobil *${carName}* (${price}). Apakah unit tersedia?`;

            // Buka link WhatsApp
            const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            window.open(waLink, '_blank');
        });
    });


    // --- 4. SMOOTH SCROLLING UNTUK LINK NAVIGASI ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
// --- 5. HAMBURGER MENU LOGIC ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            // Toggle class active untuk animasi X dan slide menu
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Menutup menu saat salah satu link diklik
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }
    // --- 6. KLIK DI LUAR MENU UNTUK MENUTUP (CLOSE ON OUTSIDE CLICK) ---
    document.addEventListener('click', function(e) {
        // Jika hamburger atau menu sedang aktif...
        if (hamburger && hamburger.classList.contains('active')) {
            // ...dan yang diklik BUKAN tombol hamburger DAN BUKAN area menu...
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                // ...maka tutup menu.
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }
    });
    document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. HAMBURGER MENU & MOBILE NAVIGATION
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Menu saat Hamburger diklik
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tutup menu saat salah satu link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Tutup menu jika user click di luar menu (optional UX improvement)
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // =========================================
    // 2. STICKY NAVBAR ON SCROLL
    // =========================================
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        // Jika scroll lebih dari 50px, tambah class 'scrolled'
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================
    // 3. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
    // =========================================
    // Kita manfaatkan class CSS .reveal yang sudah ada di CSS kamu
    
    // Daftar elemen yang ingin di-animasikan saat scroll
    const revealElements = document.querySelectorAll(
        '.deskripsi, .alasan-memilih-kami img, .section-title, .reason-item, .testimoni-card, .lokasi-section'
    );

    // Konfigurasi observer
    const revealOptions = {
        threshold: 0.15, // Animasi mulai saat 15% elemen terlihat
        rootMargin: "0px 0px -50px 0px" // Offset sedikit dari bawah
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class .active agar CSS transform bekerja
                entry.target.classList.add('active');
                
                // Stop observe setelah animasi berjalan sekali (biar ringan)
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Pasang observer ke setiap elemen & tambahkan delay otomatis untuk grid
    revealElements.forEach((el) => {
        // Pastikan class dasar .reveal ada
        el.classList.add('reveal');
        revealOnScroll.observe(el);
    });

    // =========================================
    // 4. STAGGERED ANIMATION (Delay Berurutan)
    // =========================================
    // Memberikan delay bertingkat untuk elemen list (Testimoni & Alasan)
    
    const staggerItems = (selector, delayIncrement = 200) => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * delayIncrement}ms`;
        });
    };

    // Terapkan delay pada kartu testimoni
    staggerItems('.testimoni-card', 150);
    // Terapkan delay pada poin alasan
    staggerItems('.reason-item', 100);

    // =========================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});