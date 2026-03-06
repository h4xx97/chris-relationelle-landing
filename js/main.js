/**
 * Chris Relation'elle - Landing Page Scripts
 * Navigation, form validation, scroll animations
 */

(function () {
  "use strict";

  // --- DOM elements ---
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");
  const charCount = document.getElementById("charCount");
  const messageField = document.getElementById("message");
  const floatingCta = document.getElementById("floatingCta");

  // --- Aurora canvas background ---
  var canvas = document.getElementById("auroraCanvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var animId;
    var time = 0;

    // Gold sparkle particles
    var particles = [];
    var PARTICLE_COUNT = 60;

    function initParticles(w, h) {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.5 + Math.random() * 2,
          speedX: -0.15 + Math.random() * 0.3,
          speedY: -0.1 + Math.random() * 0.2,
          drift: 0.0005 + Math.random() * 0.001,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.001 + Math.random() * 0.002,
          baseAlpha: 0.15 + Math.random() * 0.45,
        });
      }
    }

    // Aurora color orbs - positions and properties
    var orbs = [
      {
        x: 0.2,
        y: 0.8,
        r: 0.45,
        color: [187, 190, 100],
        speed: 0.0003,
        phase: 0,
      },
      {
        x: 0.8,
        y: 0.2,
        r: 0.5,
        color: [125, 132, 145],
        speed: 0.00025,
        phase: 2,
      },
      { x: 0.5, y: 0.5, r: 0.4, color: [90, 77, 106], speed: 0.0002, phase: 4 },
      {
        x: 0.3,
        y: 0.3,
        r: 0.35,
        color: [68, 56, 80],
        speed: 0.00035,
        phase: 1,
      },
      {
        x: 0.7,
        y: 0.7,
        r: 0.38,
        color: [160, 163, 74],
        speed: 0.00028,
        phase: 3,
      },
      {
        x: 0.15,
        y: 0.4,
        r: 0.3,
        color: [100, 90, 120],
        speed: 0.00032,
        phase: 5,
      },
    ];

    function resizeCanvas() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    }

    function drawAurora(t) {
      var w = canvas.width;
      var h = canvas.height;

      // Dark base
      ctx.fillStyle = "#2a2035";
      ctx.fillRect(0, 0, w, h);

      // Draw each orb with slow orbital movement
      for (var i = 0; i < orbs.length; i++) {
        var orb = orbs[i];
        var cx = w * (orb.x + 0.15 * Math.sin(t * orb.speed * 2 + orb.phase));
        var cy = h * (orb.y + 0.1 * Math.cos(t * orb.speed * 1.5 + orb.phase));
        var radius = Math.max(w, h) * orb.r;

        // Pulsating size
        var pulse = 1 + 0.08 * Math.sin(t * orb.speed * 3 + orb.phase);
        radius *= pulse;

        var gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        var alpha = 0.25 + 0.08 * Math.sin(t * orb.speed * 4 + orb.phase);
        gradient.addColorStop(
          0,
          "rgba(" +
            orb.color[0] +
            "," +
            orb.color[1] +
            "," +
            orb.color[2] +
            "," +
            alpha +
            ")",
        );
        gradient.addColorStop(
          0.5,
          "rgba(" +
            orb.color[0] +
            "," +
            orb.color[1] +
            "," +
            orb.color[2] +
            "," +
            alpha * 0.4 +
            ")",
        );
        gradient.addColorStop(
          1,
          "rgba(" +
            orb.color[0] +
            "," +
            orb.color[1] +
            "," +
            orb.color[2] +
            ",0)",
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Soft light blend layer for smoothness
      var blendGrad = ctx.createLinearGradient(0, 0, w, h);
      blendGrad.addColorStop(0, "rgba(68,56,80,0.3)");
      blendGrad.addColorStop(0.5, "rgba(90,77,106,0.15)");
      blendGrad.addColorStop(1, "rgba(51,42,62,0.35)");
      ctx.fillStyle = blendGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw gold sparkle particles
      for (var p = 0; p < particles.length; p++) {
        var pt = particles[p];

        // Gentle floating movement
        pt.x += pt.speedX + Math.sin(t * pt.drift + pt.phase) * 0.3;
        pt.y += pt.speedY + Math.cos(t * pt.drift * 0.7 + pt.phase) * 0.2;

        // Wrap around edges smoothly
        if (pt.x < -10) pt.x = w + 10;
        if (pt.x > w + 10) pt.x = -10;
        if (pt.y < -10) pt.y = h + 10;
        if (pt.y > h + 10) pt.y = -10;

        // Twinkling alpha
        var twinkle =
          pt.baseAlpha *
          (0.4 + 0.6 * Math.abs(Math.sin(t * pt.twinkleSpeed + pt.phase)));

        // Gold tones: warm white to gold
        var goldR = 255;
        var goldG =
          215 + Math.floor(30 * Math.sin(t * pt.twinkleSpeed * 0.5 + pt.phase));
        var goldB =
          120 + Math.floor(40 * Math.sin(t * pt.twinkleSpeed * 0.8 + pt.phase));

        // Soft glow halo
        var glowSize = pt.size * 4;
        var glow = ctx.createRadialGradient(
          pt.x,
          pt.y,
          0,
          pt.x,
          pt.y,
          glowSize,
        );
        glow.addColorStop(
          0,
          "rgba(" +
            goldR +
            "," +
            goldG +
            "," +
            goldB +
            "," +
            twinkle * 0.3 +
            ")",
        );
        glow.addColorStop(
          1,
          "rgba(" + goldR + "," + goldG + "," + goldB + ",0)",
        );
        ctx.fillStyle = glow;
        ctx.fillRect(
          pt.x - glowSize,
          pt.y - glowSize,
          glowSize * 2,
          glowSize * 2,
        );

        // Bright core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle =
          "rgba(" + goldR + "," + goldG + "," + goldB + "," + twinkle + ")";
        ctx.fill();
      }
    }

    function animate(timestamp) {
      time = timestamp || 0;
      drawAurora(time);
      animId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles(canvas.width, canvas.height);
    animate(0);

    window.addEventListener("resize", function () {
      resizeCanvas();
      initParticles(canvas.width, canvas.height);
      drawAurora(time);
    });

    // Pause animation when hero is not visible
    var heroSection = document.getElementById("hero");
    var heroObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          if (!animId) animate(time);
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0 },
    );
    heroObserver.observe(heroSection);
  }

  // --- Header scroll behavior ---
  function handleScroll() {
    const scrolled = window.scrollY > 50;
    header.classList.toggle("header--scrolled", scrolled);

    if (floatingCta) {
      floatingCta.classList.toggle("visible", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // --- Mobile nav ---
  burger.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    burger.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // --- Character count for message ---
  if (messageField && charCount) {
    messageField.addEventListener("input", function () {
      charCount.textContent = this.value.length;
    });
  }

  // --- Form validation ---
  var validators = {
    prenom: function (value) {
      var trimmed = value.trim();
      if (!trimmed) return "Le pr\u00e9nom est requis.";
      if (trimmed.length < 2)
        return "Le pr\u00e9nom doit contenir au moins 2 caract\u00e8res.";
      if (!/^[a-zA-Z\u00C0-\u017F\s'-]+$/.test(trimmed))
        return "Le pr\u00e9nom contient des caract\u00e8res invalides.";
      return "";
    },
    email: function (value) {
      var trimmed = value.trim();
      if (!trimmed) return "L'adresse e-mail est requise.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return "Veuillez entrer une adresse e-mail valide.";
      return "";
    },
    telephone: function (value) {
      var trimmed = value.trim();
      if (!trimmed) return "";
      if (!/^[\d\s+\-()]{7,20}$/.test(trimmed))
        return "Veuillez entrer un num\u00e9ro valide.";
      return "";
    },
    message: function (value) {
      var trimmed = value.trim();
      if (!trimmed) return "Le message est requis.";
      if (trimmed.length < 10)
        return "Le message doit contenir au moins 10 caract\u00e8res.";
      return "";
    },
  };

  function sanitize(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function showError(field, message) {
    var group = field.closest(".form-group");
    if (!group) return;
    var errorEl = group.querySelector(".form-error");
    field.classList.toggle("error", !!message);
    if (errorEl) errorEl.textContent = message;
  }

  function validateField(field) {
    var name = field.name;
    var validator = validators[name];
    if (!validator) return true;
    var error = validator(field.value);
    showError(field, error);
    return !error;
  }

  // Real-time validation on blur
  if (contactForm) {
    var fields = contactForm.querySelectorAll("input, textarea");
    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(this);
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot check
      var honeypot = contactForm.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      // Validate all fields
      var isValid = true;
      fields.forEach(function (field) {
        if (field.name !== "_gotcha" && !validateField(field)) {
          isValid = false;
        }
      });

      if (!isValid) {
        var firstError = contactForm.querySelector(".error");
        if (firstError) firstError.focus();
        return;
      }

      // Sanitize values before submit
      var formData = new FormData();
      formData.append("prenom", sanitize(contactForm.prenom.value.trim()));
      formData.append("email", sanitize(contactForm.email.value.trim()));
      formData.append(
        "telephone",
        sanitize(contactForm.telephone.value.trim()),
      );
      formData.append("message", sanitize(contactForm.message.value.trim()));

      // Show loading state
      var btnText = submitBtn.querySelector(".btn__text");
      var btnLoader = submitBtn.querySelector(".btn__loader");
      submitBtn.disabled = true;
      btnText.textContent = "Envoi en cours...";
      if (btnLoader) btnLoader.hidden = false;

      // Submit form
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            contactForm.hidden = true;
            formSuccess.hidden = false;
          } else {
            throw new Error("Erreur serveur");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          btnText.textContent = "Envoyer le message";
          if (btnLoader) btnLoader.hidden = true;
          alert(
            "Une erreur est survenue. Veuillez r\u00e9essayer ou nous contacter par t\u00e9l\u00e9phone.",
          );
        });
    });
  }

  // --- Scroll reveal animations ---
  var revealElements = document.querySelectorAll(
    ".service-card, .testimonial-card, .location-card, .about__text, .about__visual, .contact__info, .contact__form-wrapper, .cta-band__inner, .section__header",
  );

  revealElements.forEach(function (el) {
    el.classList.add("reveal");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
