// GSAP Animations and Interactivity for Premium Dark Theme
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Global Cursor Glow Effect
    const cursorGlow = document.createElement("div");
    cursorGlow.classList.add("cursor-glow");
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorGlow.style.opacity === "0" || cursorGlow.style.opacity === "") {
        cursorGlow.style.opacity = "1";
      }
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });

    function updateCursor() {
      // Smooth easing for cursor glow
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursorGlow.style.left = `${cursorX}px`;
      cursorGlow.style.top = `${cursorY}px`;
      
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // 2. Staggered Reveals on Scroll
    const fadeUpElements = document.querySelectorAll('.animate-on-scroll, .fade-up, .service-card, .project-card, .stat-card');
    
    fadeUpElements.forEach((el, index) => {
      gsap.fromTo(el, 
        { y: 20, opacity: 0.8 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 120%", // Trigger long before entering viewport
            toggleActions: "play none none none"
          }
        }
      );
    });

    // 3. Slide In Elements (e.g., Tech badges)
    const techBadges = document.querySelectorAll('.tech-badge');
    if (techBadges.length > 0) {
      gsap.fromTo(techBadges,
        { x: -15, opacity: 0.8 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: techBadges[0].parentElement,
            start: "top 120%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 4. Statistics Count Up
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const targetText = stat.innerText;
      // Extract numbers only
      const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''));
      const suffix = targetText.replace(/[0-9]/g, '');
      
      if (!isNaN(targetNum)) {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: targetNum,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%"
          },
          onUpdate: () => {
            stat.innerText = Math.floor(obj.val) + suffix;
          }
        });
      }
    });

    // 5. Hero Parallax
    const heroContent = document.querySelector('.hero__left');
    if (heroContent) {
      gsap.to(heroContent, {
        y: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    const heroShield = document.querySelector('.hero-premium-shield');
    if (heroShield) {
      gsap.to(heroShield, {
        y: 100,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }
  } else {
    console.warn("GSAP or ScrollTrigger not loaded.");
  }
});
