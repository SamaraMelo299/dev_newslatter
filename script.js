/* =============================
   HELPERS
============================= */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* =============================
   MOBILE MENU
============================= */
const menuToggle = $(".menu-toggle");
const nav = $(".nav");

function closeMenu() {
  if (!nav || !menuToggle) return;

  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!nav || !menuToggle) return;

  const isOpen = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
    const clickedInside =
      nav.contains(e.target) || menuToggle.contains(e.target);

    if (!clickedInside) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

/* =============================
   SMOOTH SCROLL
============================= */
$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = $(href);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    closeMenu();
  });
});

/* =============================
   ACTIVE LINK ON SCROLL
============================= */
const sections = $$("main[id], section[id]");
const navLinks = $$('.nav a[href^="#"]');

function setActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((a) => a.classList.remove("active"));
      const current = $(`.nav a[href="#${id}"]`);
      if (current) current.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

/* =============================
   NEWSLETTER FORM
============================= */
const form = document.querySelector("form");
const nameInput = form?.querySelector('input[type="text"]');
const emailInput = form?.querySelector('input[type="email"]');
const submitBtn = document.querySelector("#btn-enviar");
const statusEl = document.querySelector("#newsletter-status");

let statusTimeout;
let buttonTimeout;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearStatusAfterDelay(delay = 7000) {
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    if (!statusEl) return;
    statusEl.textContent = "";
    statusEl.classList.remove("success", "error");
  }, delay);
}

function resetButtonAfterDelay(delay = 6000) {
  clearTimeout(buttonTimeout);
  buttonTimeout = setTimeout(() => {
    if (!submitBtn) return;
    submitBtn.textContent = "Quero receber";
    submitBtn.disabled = false;
  }, delay);
}

function setStatus(message, type = "success") {
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.classList.remove("success", "error");
  statusEl.classList.add(type);
}

function setLoading(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Enviando..." : "Quero receber";
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearTimeout(statusTimeout);
  clearTimeout(buttonTimeout);
  setStatus("");

  const name = nameInput?.value.trim() || "";
  const email = emailInput?.value.trim().toLowerCase() || "";

  if (name.length < 2) {
    setStatus("Digite um nome válido.", "error");
    nameInput?.focus();
    return;
  }

  if (!isValidEmail(email)) {
    setStatus("Digite um e-mail válido.", "error");
    emailInput?.focus();
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("http://localhost:3001/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || "Erro ao enviar inscrição.", "error");
      setLoading(false);
      clearStatusAfterDelay(7000);
      return;
    }

    setStatus("Inscrição realizada com sucesso! ✅", "success");
    form.reset();

    if (submitBtn) {
      submitBtn.textContent = "Inscrito com sucesso ✅";
      submitBtn.disabled = true;
    }

    clearStatusAfterDelay(7000);
    resetButtonAfterDelay(6000);
  } catch (error) {
    setStatus("Erro de conexão com o servidor.", "error");
    setLoading(false);
    clearStatusAfterDelay(7000);
  } finally {
    if (submitBtn && submitBtn.textContent === "Enviando...") {
      submitBtn.disabled = false;
      submitBtn.textContent = "Quero receber";
    }
  }
});

/* =============================
   FAQ ACCORDION
============================= */
const faqItems = $$(".faq-item");

function closeAllFaq() {
  faqItems.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    const answer = btn.nextElementSibling;
    if (answer) answer.hidden = true;
  });
}

faqItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";

    closeAllFaq();

    if (!expanded) {
      btn.setAttribute("aria-expanded", "true");
      const answer = btn.nextElementSibling;
      if (answer) answer.hidden = false;
    }
  });
});