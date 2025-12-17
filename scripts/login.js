// Staff Login
window.staffLogin = function(email, password) {
  const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];

  const staff = staffList.find(
    s => s.email === email && s.password === password
  );

  if (!staff) {
    alert("Invalid Email or Password!\nPlease try again!" );
    return;
  }

  localStorage.setItem("currentStaff", staff.id);
  window.location.href = "staff.html";
};

// Admin Login
window.adminLogin = function(email, password) {
  const adminList = JSON.parse(localStorage.getItem("myAdmin")) || [];

  const admin = adminList.find(
    ad => ad.email === email && ad.password === password
  );

  if (!admin) {
    alert("Invalid Email or Password!\nPlease try again!" );
    return;
  }

  localStorage.setItem("currentStaff", admin.id);
  window.location.href = "admin.html";
};