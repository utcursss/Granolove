document.addEventListener('DOMContentLoaded', function() {
    // 1. Sidenav Initialization
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, { edge: 'left', draggable: true, closeOnClick: true });
    document.querySelectorAll('.sidenav li a').forEach(link => {
        link.addEventListener('click', () => {
            var instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
            if(instance) instance.close();
        });
    });

    // 2. Mobile Card Toggle (Clicking image opens card)
    const aboutTrigger = document.getElementById('aboutTrigger');
    const aboutContent = document.getElementById('aboutContent');
    if(aboutTrigger && window.innerWidth <= 992) {
        aboutTrigger.addEventListener('click', function() {
            aboutContent.classList.toggle('active');
        });
    }

    // 3. --- NEW: READ MORE LOGIC --- 
    // (This works inside the card when it opens)
    const readMoreBtn = document.getElementById('readMoreBtn');
    const storyText = document.getElementById('storyText');

    if (readMoreBtn && storyText) {
        readMoreBtn.addEventListener('click', function(e) {
            // Stops the click from bubbling up (prevents card from closing/acting weird)
            e.stopPropagation(); 
            
            // Toggle Logic
            if (storyText.classList.contains('text-clamp')) {
                // Expand
                storyText.classList.remove('text-clamp');
                storyText.classList.add('text-expanded');
                readMoreBtn.textContent = "Read Less";
            } else {
                // Collapse
                storyText.classList.add('text-clamp');
                storyText.classList.remove('text-expanded');
                readMoreBtn.textContent = "Read More";
            }
        });
    }

    // 4. Dark Mode Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if(localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerText = 'light_mode'; 
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if(body.classList.contains('dark-mode')) {
            themeToggle.innerText = 'light_mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerText = 'dark_mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // 5. Scroll Top Logic
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { scrollBtn.classList.add('visible'); } 
        else { scrollBtn.classList.remove('visible'); }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- ANIMATIONS (GSAP) ---
gsap.registerPlugin(ScrollTrigger);
gsap.from(".animate-hero", { y: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" });
gsap.utils.toArray('.animate-scroll').forEach(element => {
    gsap.from(element, {
        scrollTrigger: { trigger: element, start: "top 85%" },
        y: 50, opacity: 0, duration: 1, ease: "power2.out"
    });
});