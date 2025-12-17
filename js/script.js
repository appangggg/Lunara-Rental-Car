document.addEventListener('DOMContentLoaded', function() {
    
    // HAMBURGER
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if(hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // 2. NAVBAR 
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // SCROLL
    const revealElements = document.querySelectorAll('.hero-section, .tentangkami-home, .card, .cccard, .deskripsi, .alasan-memilih-kami, .lokasi-section');

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
    revealElements.forEach(el => el.classList.add('reveal'));
    window.addEventListener('scroll', reveal);
    reveal();

    //  ANIMASI 
    const galleryCards = document.querySelectorAll('.galeri-card');

    galleryCards.forEach((card, index) => {
        card.style.transform = "none"; 
        if (index % 2 === 0) {
            card.classList.add('hidden-left'); 
        } else {
            card.classList.add('hidden-right'); 
        }
    });

    function checkGalleryScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        galleryCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 150); 
            }
        });
    }
    window.addEventListener('scroll', checkGalleryScroll);
    checkGalleryScroll();

    // TOMBOL WHATSAPP 
    const sewaButtons = document.querySelectorAll('.cc-btn');
    const waNumber = "6282196683781"; 

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

    // Smooth Scroll Link Anchor
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

    // FORM KONTAK 
    const btnKirim = document.getElementById('btnKirim');
    if(btnKirim){
        btnKirim.addEventListener('click', function() {
            var nama = document.getElementById('nama').value;
            var email = document.getElementById('email').value;
            var pesan = document.getElementById('pesan').value;

            if (nama === "" || pesan === "") {
                alert("Mohon isi Nama dan Pesan terlebih dahulu.");
                return;
            }

            var nomorTujuan = "6282196683781";
            var teksLengkap = `Halo Admin, saya ingin mengirim pesan via Website.\n\n` +
                              `Nama: ${nama}\n` +
                              `Email: ${email}\n\n` +
                              `Pesan:\n${pesan}`;

            var urlWA = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(teksLengkap)}`;
            window.open(urlWA, '_blank');
        });
    }

    // 7. LIGHTBOX GALERI 
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".galeri-card img");

    if (lightbox && lightboxImg) {
        galleryImages.forEach(img => {
            img.addEventListener("click", function() {
                lightbox.style.display = "flex";
                lightbox.style.justifyContent = "center";
                lightbox.style.alignItems = "center";
                lightboxImg.src = this.src; // Ambil gambar yang diklik
                document.body.style.overflow = "hidden"; // Matikan scroll
            });
        });

        if(closeBtn) {
            closeBtn.addEventListener("click", function() {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            });
        }

        lightbox.addEventListener("click", function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    } else {
        console.error("Elemen Lightbox tidak ditemukan! Pastikan HTML diletakkan sebelum Script.");
    }

}); 