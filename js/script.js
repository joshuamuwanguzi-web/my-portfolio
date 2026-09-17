/**
 * ==========================================================================
 * PREMIUM PORTFOLIO TEMPLATE — MINIMAL VANILLA JAVASCRIPT
 * File: js/script.js
 * Dependencies: None (100% Native Web APIs)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. STICKY HEADER SCROLL STATE
     ------------------------------------------------------------------------ */
  const siteHeader = document.getElementById('site-header');

  const updateHeaderOnScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 36) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  /* ------------------------------------------------------------------------
     2. MOBILE HAMBURGER NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeMobileMenu = () => {
    if (!menuToggle || !navLinksContainer) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinksContainer.classList.remove('is-open');
  };

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinksContainer.classList.toggle('is-open', !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. ACTIVE NAVIGATION LINK HIGHLIGHTING (INTERSECTION OBSERVER)
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              link.classList.toggle('is-active', href === `#${currentId}`);
            });
          }
        });
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: 0.05
      }
    );

    sections.forEach((sec) => navObserver.observe(sec));
  }

  /* ------------------------------------------------------------------------
     4. SCROLL REVEAL ANIMATION OBSERVER
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  /* ------------------------------------------------------------------------
     5. SKILLS MATRIX CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const skillTabButtons = document.querySelectorAll('.skill-tab-btn');
  const skillDomainColumns = document.querySelectorAll('.skill-domain-column');
  const skillsGrid = document.getElementById('skills-grid');

  skillTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetDomain = btn.getAttribute('data-skill-filter');

      skillTabButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      skillDomainColumns.forEach((col) => {
        const colDomain = col.getAttribute('data-domain');
        if (targetDomain === 'all' || colDomain === targetDomain) {
          col.classList.remove('is-hidden');
        } else {
          col.classList.add('is-hidden');
        }
      });

      if (skillsGrid) {
        skillsGrid.style.gridTemplateColumns =
          targetDomain === 'all' ? '' : 'minmax(0, 680px)';
        skillsGrid.style.justifyContent =
          targetDomain === 'all' ? '' : 'center';
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. PROJECTS SHOWCASE FILTERING
     ------------------------------------------------------------------------ */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-project-filter');

      projectFilterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     7. PROJECT SPECIFICATION MODAL INSPECTOR
     ------------------------------------------------------------------------ */
  const modalBackdrop = document.getElementById('project-spec-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalArchitecture = document.getElementById('modal-project-arch');
  const modalStack = document.getElementById('modal-project-stack');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const inspectButtons = document.querySelectorAll('[data-inspect-project]');

  const openProjectModal = (card) => {
    if (!modalBackdrop || !card) return;
    const title = card.querySelector('.project-title')?.textContent || 'Project Overview';
    const category = card.querySelector('.project-category-tag')?.textContent || 'Architecture';
    const desc = card.querySelector('.project-desc')?.textContent || '';
    const archNote = card.getAttribute('data-arch-spec') || '';
    const tags = Array.from(card.querySelectorAll('.tech-tag')).map((t) => t.textContent);

    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalSummary) modalSummary.textContent = desc;
    if (modalArchitecture) modalArchitecture.textContent = archNote;

    if (modalStack) {
      modalStack.innerHTML = '';
      tags.forEach((tagText) => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tagText;
        modalStack.appendChild(span);
      });
    }

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
  };

  const closeProjectModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
  };

  inspectButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const parentCard = btn.closest('.project-card');
      openProjectModal(parentCard);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (event) => {
      if (event.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProjectModal();
    }
  });

  /* ------------------------------------------------------------------------
     8. SERVICE INQUIRY QUICK PRE-FILL
     ------------------------------------------------------------------------ */
  const serviceInquireLinks = document.querySelectorAll('[data-service-inquire]');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  serviceInquireLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const serviceName = link.getAttribute('data-service-inquire');
      if (subjectInput && serviceName) {
        subjectInput.value = `Service Inquiry: ${serviceName}`;
        subjectInput.focus();
      }
      if (messageInput && serviceName && !messageInput.value.trim()) {
        messageInput.value = `Hello, I would like to discuss a potential ${serviceName} engagement.`;
      }
    });
  });

  /* ------------------------------------------------------------------------
     9. ACCESSIBLE CONTACT FORM VALIDATION & FEEDBACK
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameField = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');
      const subjectField = document.getElementById('contact-subject');
      const messageField = document.getElementById('contact-message');

      const fields = [nameField, emailField, subjectField, messageField];
      let isValid = true;

      fields.forEach((field) => {
        if (!field) return;
        field.classList.remove('is-invalid');
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        }
      });

      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          emailField.classList.add('is-invalid');
          isValid = false;
        }
      }

      if (!formFeedback) return;

      if (!isValid) {
        formFeedback.textContent =
          'Please complete all required fields with a valid email address before sending.';
        formFeedback.classList.add('is-visible');
        return;
      }

      const senderName = nameField ? nameField.value.trim() : 'there';
      formFeedback.textContent = `Thank you, ${senderName}. Your message preview has been validated! Connect this static form to Formspree, Web3Forms, or your backend endpoint to enable live email delivery.`;
      formFeedback.classList.add('is-visible');
      contactForm.reset();
    });
  }
});

