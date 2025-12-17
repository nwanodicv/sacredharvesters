// Get html element using the DOM
const staffForm = document.querySelector("#staffForm");
// 
staffForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const staff = {
    id: Date.now(),
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value, // demo only
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("homeaddress").value.trim(),
    createdAt: document.getElementById("timestamp").value,
    subject: document.getElementById("subjects").value.trim(),
    attendance: []
  };

  // Get existing staff
  const myStaff = JSON.parse(localStorage.getItem("myStaff")) || [];

  // Prevent duplicate emails
  const exists = myStaff.some(s => s.email === staff.email);
  if (exists) {
    alert("This email is already registered.");
    return;
  }

  // Save staff
  myStaff.push(staff);
  localStorage.setItem("myStaff", JSON.stringify(myStaff));

  alert("Staff account created successfully!");

  staffForm.reset();
  window.location.href = "index.html";
});
