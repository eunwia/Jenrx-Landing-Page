/**
 * Jenrx Landing Page Scripts
 * Micro-interactions, 3D Mockup Tilt, APK Modal, Terms & Privacy Dialog, and Interactive Demos
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  // APK Modal Elements
  const apkTriggers = document.querySelectorAll('.btn-apk-trigger');
  const apkModal = document.getElementById('apkModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistEmail = document.getElementById('waitlistEmail');
  const formFeedback = document.getElementById('formFeedback');

  // Terms & Privacy Modal Elements
  const privacyTriggers = document.querySelectorAll('.btn-privacy-trigger');
  const termsModal = document.getElementById('termsModal');
  const termsCloseBtn = document.getElementById('termsCloseBtn');
  const termsDoneBtn = document.getElementById('termsDoneBtn');
  const tabBtnPrivacy = document.getElementById('tabBtnPrivacy');
  const tabBtnTerms = document.getElementById('tabBtnTerms');
  const panelPrivacy = document.getElementById('panelPrivacy');
  const panelTerms = document.getElementById('panelTerms');
  const termsScrollBody = document.querySelector('.terms-scroll-body');

  // Interactive Widgets
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const mockupScene = document.getElementById('mockupScene');
  const phoneDevice = document.getElementById('phoneDevice');

  // --- 1. Sticky Frosted Navbar Scroll Elevation ---
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 14px 35px -8px rgba(12, 25, 46, 0.12), 0 4px 10px rgba(12, 25, 46, 0.04)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-md)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.82)';
    }

    // ScrollSpy: highlight active nav link
    const sections = ['home', 'about', 'features'];
    let current = 'home';
    const scrollPos = window.scrollY + 200;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && scrollPos >= el.offsetTop) {
        current = id;
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- 2. Mobile Menu Drawer Toggle ---
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        mobileMenuBtn.children[0].style.transform = 'translateY(3.5px) rotate(45deg)';
        mobileMenuBtn.children[1].style.transform = 'translateY(-3.5px) rotate(-45deg)';
      } else {
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.transform = 'none';
      }
    });

    // Close mobile drawer when clicking any nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.transform = 'none';
      });
    });
  }

  // --- 3. Interactive APK Coming Soon Modal ---
  const openApkModal = () => {
    if (!apkModal) return;
    apkModal.classList.add('active');
    apkModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (waitlistEmail) {
      setTimeout(() => waitlistEmail.focus(), 150);
    }
  };

  const closeApkModal = () => {
    if (!apkModal) return;
    apkModal.classList.remove('active');
    apkModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (formFeedback) formFeedback.textContent = '';
  };

  apkTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If mobile drawer is open, close it
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.transform = 'none';
      }
      openApkModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeApkModal);
  }

  if (apkModal) {
    apkModal.addEventListener('click', (e) => {
      if (e.target === apkModal) {
        closeApkModal();
      }
    });
  }

  // --- 4. Waitlist Form Submission ---
  window.handleWaitlistSubmit = () => {
    const email = waitlistEmail.value.trim();
    if (!email) return;

    formFeedback.className = 'form-feedback success';
    formFeedback.textContent = 'You are on the early access list! We will notify you upon APK launch.';
    waitlistEmail.value = '';

    setTimeout(() => {
      closeApkModal();
      showToast('Added to Jenrx APK early notification list!');
    }, 1400);
  };

  // --- 5. Terms of Service & Privacy Policy Modal Logic ---
  const switchTermsTab = (tab) => {
    if (tab === 'terms') {
      tabBtnTerms.classList.add('active');
      tabBtnTerms.setAttribute('aria-selected', 'true');
      tabBtnPrivacy.classList.remove('active');
      tabBtnPrivacy.setAttribute('aria-selected', 'false');
      panelTerms.classList.add('active');
      panelPrivacy.classList.remove('active');
    } else {
      tabBtnPrivacy.classList.add('active');
      tabBtnPrivacy.setAttribute('aria-selected', 'true');
      tabBtnTerms.classList.remove('active');
      tabBtnTerms.setAttribute('aria-selected', 'false');
      panelPrivacy.classList.add('active');
      panelTerms.classList.remove('active');
    }
  };

  if (tabBtnPrivacy && tabBtnTerms) {
    tabBtnPrivacy.addEventListener('click', () => switchTermsTab('privacy'));
    tabBtnTerms.addEventListener('click', () => switchTermsTab('terms'));
  }

  const openTermsModal = (targetTab = 'privacy', scrollToId = null) => {
    if (!termsModal) return;
    switchTermsTab(targetTab);
    termsModal.classList.add('active');
    termsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (scrollToId && termsScrollBody) {
      setTimeout(() => {
        const targetEl = document.getElementById(scrollToId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (termsScrollBody) {
      termsScrollBody.scrollTop = 0;
    }
  };

  const closeTermsModal = () => {
    if (!termsModal) return;
    termsModal.classList.remove('active');
    termsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  privacyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-target-tab') || 'privacy';
      const scrollTo = btn.getAttribute('data-scroll-to') || null;
      openTermsModal(tab, scrollTo ? `policy-${scrollTo}` : null);
    });
  });

  if (termsCloseBtn) termsCloseBtn.addEventListener('click', closeTermsModal);
  if (termsDoneBtn) termsDoneBtn.addEventListener('click', closeTermsModal);

  if (termsModal) {
    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) {
        closeTermsModal();
      }
    });
  }

  // Global ESC Key Close for all Modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (apkModal && apkModal.classList.contains('active')) closeApkModal();
      if (termsModal && termsModal.classList.contains('active')) closeTermsModal();
    }
  });

  // --- 6. Interactive Toast Notification ---
  let toastTimer = null;
  const showToast = (message) => {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('active');
    
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 3500);
  };

  // --- 7. Feature Demo Interactive Micro-actions ---
  // A) Log Now button inside Medicine Tracker preview
  const logActionBtn = document.querySelector('.btn-check-action');
  if (logActionBtn) {
    logActionBtn.addEventListener('click', () => {
      const parentRow = logActionBtn.closest('.med-row');
      if (parentRow) {
        parentRow.classList.remove('pending');
        parentRow.classList.add('taken');
        logActionBtn.outerHTML = '<span class="med-status-tag done">Taken</span>';
        showToast('Vitamin D3 logged! Daily streak updated.');
      }
    });
  }

  // B) 3D Mouse Tilt on Mockup (Desktop only)
  if (mockupScene && phoneDevice && window.matchMedia('(min-width: 992px)').matches) {
    const wrap = document.querySelector('.hero-mockup-wrap');
    if (wrap) {
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateY = (x / (rect.width / 2)) * 14 - 8;
        const rotateX = -(y / (rect.height / 2)) * 14 + 6;

        phoneDevice.style.transform = `rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) rotateZ(1deg)`;
      });

      wrap.addEventListener('mouseleave', () => {
        phoneDevice.style.transform = 'rotateY(-8deg) rotateX(6deg) rotateZ(1deg)';
      });
    }
  }

  // C) BP Interactive Bar Hover Tooltips
  const chartCols = document.querySelectorAll('.chart-col');
  const systolicValues = [122, 120, 119, 118, 121, 117, 118];
  chartCols.forEach((col, idx) => {
    col.setAttribute('title', `Systolic: ${systolicValues[idx] || 118} mmHg`);
    col.addEventListener('click', () => {
      chartCols.forEach(c => c.classList.remove('active-bar'));
      col.classList.add('active-bar');
      const val = systolicValues[idx] || 118;
      const systEl = document.querySelector('.bp-big-number .systolic');
      if (systEl) systEl.textContent = val;
    });
  });
});
