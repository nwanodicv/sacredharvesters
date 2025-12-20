// ADMIN LOGIN DETAILS
const ADMIN_EMAIL = "sacredharvester@gmail.com";
const ADMIN_PASSWORD = "12345678";

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


//// Staff Login
//window.staffLogin = function(email, password) {
//const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];
//
//// ADMIN LOGIN
//function adminLogin(email, password) {
//  if (email === "sacredharvester@gmail.com" && password === "12345678")
//    localStorage.setItem("currentStaff", staff.id);
//    window.location.href = "admin.html";
//}
//
//  const staff = staffList.find(
//    s => s.email === email && s.password === password
//  );
//
//  if (!staff) {
//    alert("Invalid Email or Password!\nPlease try again!" );
//    return;
//  }
//
//  localStorage.setItem("currentStaff", staff.id);
//  window.location.href = "staff.html";
//};
//
//// Admin Login
//window.adminLogin = function(email, password) {
//  const adminList = JSON.parse(localStorage.getItem("myAdmin")) || [];
//
//  const admin = adminList.find(
//    ad => ad.email === email && ad.password === password
//  );
//
//  if (!admin) {
//    alert("Invalid Email or Password!\nPlease try again!" );
//    return;
//  }
//
//  localStorage.setItem("currentStaff", admin.id);
//  window.location.href = "admin.html";
//};