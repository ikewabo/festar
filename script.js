document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Header Transition on Scroll
  // ==========================================
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenuMobile = document.getElementById('nav-menu-mobile');
  
  if (mobileToggle && navMenuMobile) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenuMobile.classList.toggle('open');
    });

    // Close menu when clicking links in mobile view
    const mobileLinks = navMenuMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenuMobile.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenuMobile.classList.contains('open')) {
        mobileToggle.classList.remove('open');
        navMenuMobile.classList.remove('open');
      }
    });
  }



  // ==========================================
  // 4. Interactive Services Exploration Mode
  // ==========================================
  const serviceCards = document.querySelectorAll('.service-card');
  const exploreInstruction = document.getElementById('explore-instruction');
  const originalInstructionHTML = exploreInstruction ? exploreInstruction.innerHTML : '';

  serviceCards.forEach(card => {
    // Hover states for changing instruction title dynamically
    card.addEventListener('mouseenter', () => {
      const title = card.querySelector('h3').textContent;
      if (exploreInstruction) {
        exploreInstruction.style.opacity = '0';
        setTimeout(() => {
          exploreInstruction.innerHTML = `Exploring: <strong style="color: var(--gold-2); font-weight: 800;">${title}</strong>`;
          exploreInstruction.style.opacity = '1';
        }, 150);
      }
    });

    card.addEventListener('mouseleave', () => {
      if (exploreInstruction) {
        exploreInstruction.style.opacity = '0';
        setTimeout(() => {
          exploreInstruction.innerHTML = originalInstructionHTML;
          exploreInstruction.style.opacity = '1';
        }, 150);
      }
    });
  });

  // ==========================================
  // 5. Consultation Booking Modal Dialog
  // ==========================================
  const modal = document.getElementById('consultation-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const consultationForm = document.getElementById('consultation-form');

  const openModal = () => {
    if (modal) modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock body scroll
  };

  const closeModal = () => {
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = ''; // Unlock body scroll
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceType = btn.getAttribute('data-service');
      if (serviceType) {
        const selectElement = document.getElementById('form-service');
        if (selectElement) {
          selectElement.value = serviceType;
        }
      }
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Handle Form Submission
  if (consultationForm) {
    consultationForm.addEventListener('submit', function handleConsultationSubmit(e) {
      e.preventDefault();
      
      const name = document.getElementById('form-name') ? document.getElementById('form-name').value : '';
      const phone = document.getElementById('form-phone') ? document.getElementById('form-phone').value : '';
      const email = document.getElementById('form-email') ? document.getElementById('form-email').value : '';
      const serviceSelect = document.getElementById('form-service');
      const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : 'General Consultation';
      const message = document.getElementById('form-message') ? document.getElementById('form-message').value : '';

      const subject = encodeURIComponent(`Consultation Request: ${name} - ${service}`);
      const bodyText = encodeURIComponent(
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Requested Service: ${service}\n\n` +
        `Details:\n${message}\n\n` +
        `--\nSent via Festar Heritage Consultation Form (www.festarheritage.com)`
      );
      const mailtoUri = `mailto:info@festarheritage.com?subject=${subject}&body=${bodyText}`;

      // Launch user's default email client
      window.location.href = mailtoUri;

      // Show transparent, honest modal confirmation
      const card = modal.querySelector('.modal-card');
      const originalHTML = card.innerHTML;

      card.style.opacity = '0';
      setTimeout(() => {
        card.innerHTML = `
          <button class="modal-close" id="modal-success-close-btn" aria-label="Close modal">
            <svg class="modal-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <div style="text-align: center; padding: 10px 0;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background-color: rgba(217, 164, 65, 0.15); color: var(--gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <svg style="width: 32px; height: 32px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="modal-title" style="margin-bottom: 8px; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px;">Consultation Request Ready</h3>
            <p class="modal-subtitle" style="margin-bottom: 16px;">Thank you, <strong>${name}</strong>. Your request has been pre-formatted for direct delivery to <strong>info@festarheritage.com</strong>.</p>
            <div style="background: rgba(217, 164, 65, 0.12); border: 1px solid rgba(217, 164, 65, 0.35); border-radius: 12px; padding: 14px; margin-bottom: 20px; font-size: 13.5px; text-align: left; line-height: 1.5; color: var(--navy);">
              <div style="font-weight: 700; margin-bottom: 4px;">Guaranteed Receipt &amp; Immediate Contact:</div>
              <div>If your email app did not open automatically, please click below or email us directly at <a href="mailto:info@festarheritage.com" style="color: var(--navy); font-weight: 700; text-decoration: underline;">info@festarheritage.com</a>.</div>
              <div style="margin-top: 6px;">For immediate scheduling, call our care team directly at <a href="tel:3212784165" style="color: var(--navy); font-weight: 700; text-decoration: underline;">(321) 278-4165</a>.</div>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <a href="${mailtoUri}" class="btn btn-gold" style="padding: 10px 18px; font-size: 13.5px;">Send via Email App</a>
              <a href="tel:3212784165" class="btn btn-outline" style="color: var(--navy); border-color: var(--navy); padding: 10px 18px; font-size: 13.5px;">Call (321) 278-4165</a>
            </div>
          </div>
        `;
        card.style.opacity = '1';
        
        // Re-attach close listener
        const successCloseBtn = document.getElementById('modal-success-close-btn');
        if (successCloseBtn) {
          successCloseBtn.addEventListener('click', () => {
            closeModal();
            setTimeout(() => {
              card.innerHTML = originalHTML;
              const reattachedForm = document.getElementById('consultation-form');
              if (reattachedForm) {
                reattachedForm.addEventListener('submit', handleConsultationSubmit);
              }
              const reattachedClose = document.getElementById('modal-close-btn');
              if (reattachedClose) {
                reattachedClose.addEventListener('click', closeModal);
              }
            }, 400);
          });
        }
      }, 300);
    });
  }

  // ==========================================
  // 6. Navigation Link Highlighting on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120;
    
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // ==========================================
  // 7. Career Application Form Submission
  // ==========================================
  const careerForm = document.getElementById('career-application-form');
  const careerSuccessAlert = document.getElementById('application-success-msg');

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const applicantName = document.getElementById('app-name') ? document.getElementById('app-name').value : '';
      const phone = document.getElementById('app-phone') ? document.getElementById('app-phone').value : '';
      const email = document.getElementById('app-email') ? document.getElementById('app-email').value : '';
      const county = document.getElementById('app-county') ? document.getElementById('app-county').value : '';
      const position = document.getElementById('app-position') ? document.getElementById('app-position').value : '';
      const languages = document.getElementById('app-languages') ? document.getElementById('app-languages').value : '';
      const experience = document.getElementById('app-experience') ? document.getElementById('app-experience').value : '';

      const workAuthRadio = careerForm.querySelector('input[name="work_auth"]:checked');
      const workAuth = workAuthRadio ? workAuthRadio.value : 'Not specified';
      
      const ahcaScreenRadio = careerForm.querySelector('input[name="ahca_screen"]:checked');
      const ahcaScreen = ahcaScreenRadio ? ahcaScreenRadio.value : 'Not specified';

      const driverLicenseRadio = careerForm.querySelector('input[name="driver_license"]:checked');
      const driverLicense = driverLicenseRadio ? driverLicenseRadio.value : 'Not specified';

      const subject = encodeURIComponent(`Employment Application: ${applicantName} - ${position}`);
      const bodyText = encodeURIComponent(
        `Full Name: ${applicantName}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `County: ${county}\n` +
        `Position Desired: ${position}\n` +
        `Work Authorized in US: ${workAuth}\n` +
        `Able to pass AHCA Level 2 Screening: ${ahcaScreen}\n` +
        `Driver's License & Transport: ${driverLicense}\n` +
        `Languages: ${languages}\n\n` +
        `Relevant Experience:\n${experience}\n\n` +
        `--\nSent via Festar Heritage Careers Portal (www.festarheritage.com)`
      );
      const mailtoUri = `mailto:info@festarheritage.com?subject=${subject}&body=${bodyText}`;

      // Launch email client
      window.location.href = mailtoUri;

      if (careerSuccessAlert) {
        careerSuccessAlert.innerHTML = `
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">✓ Application Pre-Formatted for Submission</div>
          <div style="margin-bottom: 8px;">Thank you, <strong>${applicantName}</strong>. Your employment details have been prepared for direct delivery to <strong>info@festarheritage.com</strong>.</div>
          <div style="font-size: 13.5px; line-height: 1.5; margin-bottom: 12px;">If your email program did not open automatically, please send your qualifications directly to <a href="${mailtoUri}" style="font-weight: 700; text-decoration: underline;">info@festarheritage.com</a>, or call our hiring coordinator at <a href="tel:3212784165" style="font-weight: 700; text-decoration: underline;">(321) 278-4165</a>.</div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="${mailtoUri}" class="btn btn-gold" style="padding: 8px 16px; font-size: 13px; text-decoration: none; display: inline-block;">Send Email Now</a>
            <a href="tel:3212784165" class="btn btn-outline" style="padding: 8px 16px; font-size: 13px; text-decoration: none; display: inline-block; color: inherit; border-color: currentColor;">Call (321) 278-4165</a>
          </div>
        `;
        careerSuccessAlert.style.display = 'block';
        careerSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      
      const submitBtn = careerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Application Prepared';
        submitBtn.style.opacity = '0.7';
      }
    });
  }
});
