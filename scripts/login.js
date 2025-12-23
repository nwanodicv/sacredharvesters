// ADMIN LOGIN DETAILS
const ADMIN_EMAIL = "sacredharvester@gmail.com";
const ADMIN_PASSWORD = "admin111";

window.staffLogin = function(email, password) {
  const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];

  // ADMIN LOGIN FIRST
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("currentUser", JSON.stringify({
      role: "admin"
    }));
    window.location.href = "admin.html";
    return;
  }

  // STAFF LOGIN
  const staff = staffList.find(
    s => s.email === email && s.password === password
  );

  if (!staff) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify({
    role: "staff",
    id: staff.id
  }));

  window.location.href = "staff.html";
};