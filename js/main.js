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
