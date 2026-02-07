// ========== GLOBAL BOOKING DATA ==========
let bookingData = {
  name: '',
  date: '',
  time: '',
  service: '',
  stylist: '',
  stylistPrice: 50,
  stylistSpecialty: '',
  package: '',
  packagePrice: 0
};

// ========== PAGE NAVIGATION ==========
function nextPage(page) {
  localStorage.setItem('bookingData', JSON.stringify(bookingData));
  window.location.href = page;
}

function backPage(page) {
  window.location.href = page;
}

// ========== LOGIN ==========
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (email && password) {
    nextPage('packages.html');
  } else {
    alert('❌ Please enter email and password');
  }
}

// ========== PACKAGE SELECTION - FIXED ==========
function selectPackage(element, packageName, price) {
  bookingData.package = packageName;
  bookingData.packagePrice = price;  // YE CONFIRMED PRICE SAVE HOGA
  
  console.log('Package:', packageName, '$', price);
  
  document.querySelectorAll('.package').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  document.getElementById('nextPackageBtn').disabled = false;
  
  alert('✅ ' + packageName + ' ($' + price + ') selected!');
}

// ========== STYLIST SELECTION - NAMES FIXED ==========
function selectStylist(button) {
  const staff = button.closest('.staff');
  const stylistName = staff.dataset.stylist;
  const specialty = staff.dataset.specialty;
  
  bookingData.stylist = stylistName;
  bookingData.stylistSpecialty = specialty;
  
  document.querySelectorAll('.staff').forEach(el => el.classList.remove('selected'));
  staff.classList.add('selected');
  document.getElementById('nextStylistBtn').disabled = false;
  
  alert('✅ ' + stylistName + ' selected!');
}

// ========== CONFIRMATION PAGE - NO PAYMENT ==========
function loadConfirmation() {
  const saved = localStorage.getItem('bookingData');
  if (saved) {
    bookingData = { ...bookingData, ...JSON.parse(saved) };
    console.log('Confirmation data:', bookingData);
  }
  
  document.getElementById('confirmName').textContent = bookingData.name || 'Not provided';
  document.getElementById('confirmDate').textContent = bookingData.date || 'Not selected';
  document.getElementById('confirmTime').textContent = bookingData.time || 'Not selected';
  document.getElementById('confirmService').textContent = bookingData.service || 'Not selected';
  document.getElementById('confirmPackage').textContent = bookingData.package ? 
    `${bookingData.package} ($${bookingData.packagePrice})` : 'Not selected';
  document.getElementById('confirmStylist').textContent = bookingData.stylist ? 
    `${bookingData.stylist} (${bookingData.stylistSpecialty})` : 'Not selected';
}

// ========== COMPLETE BOOKING ==========
function completeBooking() {
  localStorage.clear();
  alert('🎉 Thank you for booking with SpQl Salon!\n\nSee you soon! ✨');
  window.location.href = 'index.html';
}

// ========== MAIN INIT - SAB PAGES ==========
document.addEventListener('DOMContentLoaded', function() {
  // Load saved data har page pe
  const saved = localStorage.getItem('bookingData');
  if (saved) {
    bookingData = { ...bookingData, ...JSON.parse(saved) };
  }
  
  // Booking page displays
  const packageEl = document.getElementById('selectedPackage');
  const stylistEl = document.getElementById('selectedStylist');
  if (packageEl) packageEl.textContent = bookingData.package || 'Not selected';
  if (stylistEl) stylistEl.textContent = bookingData.stylist || 'Not selected';
  
  // Auto confirmation load
  if (document.getElementById('confirmName')) {
    setTimeout(loadConfirmation, 100);
  }
  
  // Booking form submit
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('customerName').value;
      const date = document.getElementById('bookingDate').value;
      const time = document.getElementById('bookingTime').value;
      const service = document.getElementById('serviceSelect').value;
      
      if (!name || !date || !time || !service || !bookingData.package || !bookingData.stylist) {
        alert('❌ Please complete all selections!');
        return;
      }
      
      bookingData.name = name;
      bookingData.date = date;
      bookingData.time = time;
      bookingData.service = service;
      
      nextPage('confirmation.html');
    });
  }
});
