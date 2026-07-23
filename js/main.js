/* ─────────────────────────────────────────────────────────────
   main.js  — Portfolio animation controller
   Fixes:
     • Reveal observer: unobserves after firing (one-shot)
     • Hero race condition: observer skips hero until splash gone
     • Nav smooth-scroll with sticky-header offset
     • Nav entrance uses CSS class instead of direct opacity write
     • Scroll-spy threshold lowered for tall sections
     • Page curtain transition for nav-link jumps
   ───────────────────────────────────────────────────────────── */

// ── DOM References ────────────────────────────────────────────
const splash      = document.getElementById('splash-container');
const topNav      = document.getElementById('top-nav');
const enterBtn    = document.getElementById('enter-btn');
const heroSection = document.getElementById('about');

// Inject the curtain element (used for nav-click transitions)
const curtain = document.createElement('div');
curtain.id = 'page-transition-curtain';
document.body.appendChild(curtain);

// ── State ─────────────────────────────────────────────────────
let splashDismissed = false;
let isTransitioning = false;

// ── Utility: get nav bar height ───────────────────────────────
function navHeight() {
    return topNav ? topNav.getBoundingClientRect().height : 0;
}

// ── Splash → Hero choreography ────────────────────────────────
enterBtn.addEventListener('click', () => {
    if (splashDismissed) return;

    // 1. Entire splash slides up as one unit
    splash.classList.add('is-hidden');

    // 2. Unlock body scroll as slide begins
    setTimeout(() => {
        document.body.classList.remove('no-scroll');
    }, 200);

    // 3. Cascade hero elements in once splash is mostly out of view
    setTimeout(() => {
        splashDismissed = true;
        heroSection.classList.add('animate-in');
        heroSection.querySelectorAll('.reveal-element').forEach(el => {
            el.classList.add('animate-in');
            revealObserver.unobserve(el); // hand-animated; stop observing
        });
        revealObserver.unobserve(heroSection);
    }, 500);

    // 4. Slide nav down and fade in
    setTimeout(() => {
        topNav.classList.add('nav-visible');
    }, 700);

    // 5. Remove splash from layout after slide completes
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1100);
});

// ── Scroll-reveal observer ────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Skip hero elements until splash sequence is done
        if (!splashDismissed && heroSection.contains(el)) return;

        el.classList.add('animate-in');
        revealObserver.unobserve(el); // one-shot — avoids re-trigger jank
    });
}, {
    threshold: 0.12,          // lower threshold handles tall sections
    rootMargin: '0px 0px -40px 0px'
});

// Observe all reveal targets
document.querySelectorAll('.reveal-section, .reveal-element').forEach(el => {
    revealObserver.observe(el);
});

// ── Scroll-spy for nav active state ──────────────────────────
const sections = document.querySelectorAll('section[id]:not(#splash-container)');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active-nav', isActive);
        });
    });
}, {
    threshold: 0.25,                    // trigger at 25% visible
    rootMargin: `-${navHeight()}px 0px -40% 0px` // account for sticky nav
});

sections.forEach(section => spyObserver.observe(section));

// ── Smooth scroll for nav links (with sticky-header offset) ──
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (isTransitioning) return;

        const targetId = link.getAttribute('href');
        const target   = document.querySelector(targetId);
        if (!target) return;

        // Brief curtain flash for a polished section transition
        runCurtainTransition(() => {
            const offsetTop = target.getBoundingClientRect().top
                            + window.scrollY
                            - navHeight()
                            - 8; // 8px breathing room
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });
});

// ── Curtain transition helper ─────────────────────────────────
function runCurtainTransition(callback) {
    isTransitioning = true;
    curtain.className = '';
    // Force reflow so animation restarts cleanly
    void curtain.offsetWidth;
    curtain.classList.add('curtain-in');

    // At peak of curtain-in, run the navigation callback
    setTimeout(() => {
        callback();
    }, 320);

    // Pull curtain back out
    setTimeout(() => {
        curtain.classList.remove('curtain-in');
        curtain.classList.add('curtain-out');
    }, 400);

    // Cleanup
    setTimeout(() => {
        curtain.className = '';
        isTransitioning = false;
    }, 820);
}


// ── Lazy-load image fade-in ───────────────────────────────────
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
});

// ── Project accordion ─────────────────────────────────────────
/*
  Each .project-card has:
    • .project-trigger  — the clickable header row
    • .project-body     — the panel that expands (overflow:hidden, max-height:0)
    • .project-chevron  — the icon that rotates

  We animate with CSS max-height transition. We set max-height to
  scrollHeight on open (so the CSS transition has a real target)
  and reset to 0 on close. The CSS class .is-open drives opacity
  and the chevron rotation.
*/
document.querySelectorAll('.project-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const card   = trigger.closest('.project-card');
        const bodyId = trigger.getAttribute('aria-controls');
        const body   = document.getElementById(bodyId);
        if (!card || !body) return;

        const isOpen = card.classList.contains('is-open');

        // Close all other open cards first
        document.querySelectorAll('.project-card.is-open').forEach(openCard => {
            if (openCard === card) return;
            const openBody    = openCard.querySelector('.project-body');
            const openTrigger = openCard.querySelector('.project-trigger');
            openCard.classList.remove('is-open');
            openBody.classList.remove('is-open');
            openBody.style.maxHeight = '0';
            if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
        });

        if (isOpen) {
            // Collapse this card
            card.classList.remove('is-open');
            body.classList.remove('is-open');
            body.style.maxHeight = '0';
            trigger.setAttribute('aria-expanded', 'false');
        } else {
            // Expand this card
            card.classList.add('is-open');
            body.classList.add('is-open');
            body.style.maxHeight = body.scrollHeight + 'px';
            trigger.setAttribute('aria-expanded', 'true');

            // Trigger lazy images inside the panel
            body.querySelectorAll('img[loading="lazy"]').forEach(img => {
                if (img.complete) img.classList.add('loaded');
                else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
            });

            // Smooth-scroll so the opened card is nicely in view
            setTimeout(() => {
                const cardTop  = card.getBoundingClientRect().top + window.scrollY - navHeight() - 24;
                window.scrollTo({ top: cardTop, behavior: 'smooth' });
            }, 80);
        }
    });
});

// ── Dynamic Masonry Galleries ─────────────────────────────────
async function loadMasonryGalleries() {
    const galleries = document.querySelectorAll('.masonry-gallery[data-folder]');
    
    for (const gallery of galleries) {
        const folderPath = gallery.getAttribute('data-folder');
        try {
            const response = await fetch(folderPath);
            if (!response.ok) continue;
            
            const htmlText = await response.text();
            
            // Parse the directory listing HTML returned by the local server
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Find all anchor tags that link to image files
            const links = Array.from(doc.querySelectorAll('a'))
                .map(a => a.getAttribute('href'))
                .filter(href => href && href.match(/\.(jpe?g|png|gif|webp|svg)$/i));
            
            links.forEach(link => {
                // Construct the full path. (Some servers return relative paths, some absolute)
                const imageSrc = link.startsWith('/') ? link : folderPath + link;
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'masonry-item';
                
                // Derive descriptive alt text from folder name
                const folderParts = folderPath.split('/').filter(Boolean);
                const categoryName = folderParts[folderParts.length - 1] || 'gallery';
                const formattedName = categoryName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.loading = 'lazy';
                img.alt = `Visual asset for ${formattedName}`;
                
                // When an image loads, we need to recalculate the accordion height 
                // if it's currently open, so it doesn't get cut off.
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                    const projectBody = gallery.closest('.project-body');
                    const achievementBody = gallery.closest('.achievement-body');
                    
                    if (projectBody && projectBody.classList.contains('is-open')) {
                        projectBody.style.maxHeight = projectBody.scrollHeight + 'px';
                    }
                    if (achievementBody && achievementBody.classList.contains('is-open')) {
                        achievementBody.style.maxHeight = achievementBody.scrollHeight + 'px';
                    }
                });
                
                itemDiv.appendChild(img);
                gallery.appendChild(itemDiv);
            });
        } catch (error) {
            console.error('Error loading gallery for folder:', folderPath, error);
        }
    }
}

// ── Achievement accordion ─────────────────────────────────────
document.querySelectorAll('.achievement-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const card   = trigger.closest('.achievement-card');
        const bodyId = trigger.getAttribute('aria-controls');
        const body   = document.getElementById(bodyId);
        
        // If there's no specific ID, find the sibling body inside the card
        const actualBody = body || card.querySelector('.achievement-body');
        if (!card || !actualBody) return;

        const isOpen = card.classList.contains('is-open');

        // Close all other open achievement cards first
        document.querySelectorAll('.achievement-card.is-open').forEach(openCard => {
            if (openCard === card) return;
            const openBody    = openCard.querySelector('.achievement-body');
            const openTrigger = openCard.querySelector('.achievement-trigger');
            openCard.classList.remove('is-open');
            openBody.classList.remove('is-open');
            openBody.style.maxHeight = '0';
            if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
        });

        if (isOpen) {
            // Collapse this card
            card.classList.remove('is-open');
            actualBody.classList.remove('is-open');
            actualBody.style.maxHeight = '0';
            trigger.setAttribute('aria-expanded', 'false');
        } else {
            // Expand this card
            card.classList.add('is-open');
            actualBody.classList.add('is-open');
            actualBody.style.maxHeight = actualBody.scrollHeight + 'px';
            trigger.setAttribute('aria-expanded', 'true');

            // Smooth-scroll so the opened card is nicely in view
            setTimeout(() => {
                const cardTop  = card.getBoundingClientRect().top + window.scrollY - navHeight() - 24;
                window.scrollTo({ top: cardTop, behavior: 'smooth' });
            }, 80);
        }
    });
});

// Run the loader when DOM is ready (or immediately if already parsed due to defer)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMasonryGalleries);
} else {
    loadMasonryGalleries();
}
