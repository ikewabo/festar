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

    // Clicking a service card pre-selects the service in the consultation modal
    card.addEventListener('click', () => {
      const serviceType = card.getAttribute('data-service');
      const selectElement = document.getElementById('form-service');
      if (selectElement) {
        selectElement.value = serviceType;
      }
      openModal();
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
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const service = document.getElementById('form-service').options[document.getElementById('form-service').selectedIndex].text;

      // Show success micro-interaction
      const card = modal.querySelector('.modal-card');
      const originalHTML = card.innerHTML;

      card.style.opacity = '0';
      setTimeout(() => {
        card.innerHTML = `
          <button class="modal-close" id="modal-success-close-btn" aria-label="Close modal">
            <svg class="modal-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <div style="text-align: center; padding: 20px 0;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background-color: rgba(217, 164, 65, 0.1); color: var(--gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <svg style="width: 36px; height: 36px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="modal-title" style="margin-bottom: 12px; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px;">Request Received</h3>
            <p class="modal-subtitle" style="margin-bottom: 0;">Thank you, <strong>${name}</strong>. A care coordinator will contact you at <strong>${phone}</strong> shortly to discuss options for <strong>${service}</strong>.</p>
          </div>
        `;
        card.style.opacity = '1';
        
        // Re-attach close listener
        document.getElementById('modal-success-close-btn').addEventListener('click', () => {
          closeModal();
          // Restore form after fade
          setTimeout(() => {
            card.innerHTML = originalHTML;
            // Re-attach submit handler and standard close
            document.getElementById('consultation-form').addEventListener('submit', arguments.callee);
            document.getElementById('modal-close-btn').addEventListener('click', closeModal);
          }, 400);
        });
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
});
