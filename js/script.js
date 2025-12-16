document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. HAMBURGER MENU & NAVIGASI MOBILE
    // =========================================
    const hamburger = document.querySelector(".hamburger");

    const navMenu = document.querySelector(".nav-menu");
    
    const navLinks = document.querySelectorAll(".nav-link");

    if(hamburger && navMenu) {
        // Toggle class active saat hamburger diklik
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Tutup menu saat salah satu link diklik
        navLinks.forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));

        // Tutup menu jika klik di luar area menu (Opsional tapi bagus untuk UX)
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // =========================================
    // 2. NAVBAR SCROLL EFFECT (Sticky Header)
    // =========================================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================
    // 3. SCROLL REVEAL ANIMATION
    // =========================================
    const revealElements = document.querySelectorAll('.hero-section, .tentangkami-home, .card, .cccard, .galeri-card, .deskripsi, .alasan-memilih-kami, .lokasi-section');

    function reveal() {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = revealElements[i].getBoundingClientRect().top;
            let elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    // Jalankan sekali saat load dan saat scroll
    revealElements.forEach(el => el.classList.add('reveal'));
    window.addEventListener('scroll', reveal);
    reveal(); // Trigger awal

    const sewaButtons = document.querySelectorAll('.cc-btn');
    const waNumber = "6285299578607"; 

    sewaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.cccard');
            if(card) {
                const carName = card.querySelector('.cc-header h3').innerText;
                const price = card.querySelector('.cc-price').innerText;
                const message = `Halo Admin Lunara Rental Car, saya ingin menyewa mobil *${carName}* (${price}). Apakah unit tersedia?`;
                const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
                window.open(waLink, '_blank');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
document.getElementById('btnKirim').addEventListener('click', function() {
    // 1. Ambil nilai dari Form
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var pesan = document.getElementById('pesan').value;

    // Validasi sederhana (jika nama atau pesan kosong, jangan kirim)
    if (nama === "" || pesan === "") {
        alert("Mohon isi Nama dan Pesan terlebih dahulu.");
        return;
    }

    // 2. Tentukan Nomor WhatsApp Tujuan (Format internasional tanpa +)
    // Sesuai gambar: 0852-9957-8607 -> 6285299578607
    var nomorTujuan = "6285299578607";

    // 3. Format Pesan
    // \n digunakan untuk baris baru (enter)
    var teksLengkap = `Halo Admin, saya ingin mengirim pesan via Website.\n\n` +
                      `Nama: ${nama}\n` +
                      `Email: ${email}\n\n` +
                      `Pesan:\n${pesan}`;

    // 4. Buat URL WhatsApp API
    // encodeURIComponent digunakan agar spasi dan enter terbaca dengan benar di URL
    var urlWA = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(teksLengkap)}`;

    // 5. Buka tab baru menuju WhatsApp
    window.open(urlWA, '_blank');
});