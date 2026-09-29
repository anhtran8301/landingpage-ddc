// JavaScript chính cho Landing Page Kỷ Niệm 1 Năm Đại Đồng Cát

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initBoothTabs();
  initRegistrationModal();
  initNavbarScroll();
});

/* 1. Đồng Hồ Đếm Ngược (Countdown Timer) */
function initCountdown() {
  // Mốc thời gian sự kiện kỷ niệm: 08:00 AM Ngày 03/10/2026
  // Dùng Date constructor (Year, MonthIndex 0-11, Day, Hours, Minutes, Seconds)
  // Tương thích 100% trên Safari/iOS, Chrome, Edge, Firefox mà không bị lỗi Invalid Date (NaN)
  let targetDate = new Date(2026, 9, 3, 8, 0, 0);

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    let distance = targetDate.getTime() - now;

    // Nếu ngày mục tiêu đã qua hoặc bị NaN, tự động tính mốc 15 ngày tới tính từ lúc xem trang
    // để đồng hồ đếm ngược luôn luôn chạy sống động
    if (isNaN(distance) || distance <= 0) {
      const fallbackTarget = new Date(now + (15 * 24 * 60 * 60 * 1000));
      distance = fallbackTarget.getTime() - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 2. Chuyển Tab 4 Booth Sự Kiện */
function initBoothTabs() {
  const tabs = document.querySelectorAll('.booth-tab');
  const panels = document.querySelectorAll('.booth-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetBooth = tab.getAttribute('data-booth');

      // Update Active Tab UI
      tabs.forEach(t => t.classList.remove('active', 'bg-red-700', 'text-yellow-300'));
      tab.classList.add('active');

      // Update Active Panel
      panels.forEach(panel => {
        if (panel.getAttribute('id') === `panel-${targetBooth}`) {
          panel.classList.remove('hidden');
          panel.classList.add('flex');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('flex');
        }
      });
    });
  });
}

/* 3. Modal Đăng Ký Tham Dự */
function initRegistrationModal() {
  const modal = document.getElementById('reg-modal');
  const openBtns = document.querySelectorAll('.btn-open-reg');
  const closeBtn = document.getElementById('btn-close-modal');
  const regForm = document.getElementById('registration-form');
  const successToast = document.getElementById('success-toast');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // Close modal when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  // Handle Form Submission
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = regForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'ĐANG XỬ LÝ...';
      }

      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        regForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'XÁC NHẬN ĐĂNG KÝ';
        }

        // Display Success Alert / Toast
        if (successToast) {
          successToast.classList.remove('hidden');
          setTimeout(() => {
            successToast.classList.add('hidden');
          }, 4000);
        } else {
          alert('🎉 Chúc mừng! Bạn đã đăng ký tham dự sự kiện Kỷ niệm 1 năm Đại Đồng Cát thành công. Bộ phận hỗ trợ sẽ liên hệ với bạn trong thời gian sớm nhất.');
        }
      }, 800);
  // Handle Section Registration Form Submission
  const secForm = document.getElementById('section-registration-form');
  if (secForm) {
    secForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = secForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'ĐANG XỬ LÝ...';
      }

      setTimeout(() => {
        secForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>XÁC NHẬN ĐĂNG KÝ THAM DỰ SỰ KIỆN</span>';
        }

        if (successToast) {
          successToast.classList.remove('hidden');
          setTimeout(() => {
            successToast.classList.add('hidden');
          }, 4000);
        } else {
          alert('🎉 Chúc mừng! Bạn đã đăng ký tham dự sự kiện Kỷ niệm 1 năm Đại Đồng Cát thành công.');
        }
      }, 800);
    });
  }
}

/* 4. Navbar Sticky Effects */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-burgundy/95', 'shadow-2xl', 'backdrop-blur-md', 'py-3');
      navbar.classList.remove('py-5');
    } else {
      navbar.classList.remove('bg-burgundy/95', 'shadow-2xl', 'backdrop-blur-md', 'py-3');
      navbar.classList.add('py-5');
    }
  });
}
