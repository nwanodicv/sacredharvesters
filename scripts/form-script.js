/**
 * form-script.js
 * -----------------------------
 * Handles signup for Staff, Student, and Parent
 * AUTH → users
 * PROFILES → role-based storage
 */

const form = document.querySelector("#staffForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  if (!role) {
    alert("Please select a role.");
    return;
  }

  /* ================= LOAD STORAGE ================= */
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const myStaff = JSON.parse(localStorage.getItem("myStaff")) || [];
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const parents = JSON.parse(localStorage.getItem("parents")) || [];

  /* ================= FORM VALUES ================= */
  const firstNameVal = firstName.value.trim();
  const lastNameVal = lastName.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value;
  const phoneVal = phone.value.trim();
  const addressVal = homeaddress.value.trim();

  if (!firstNameVal || !lastNameVal || !emailVal || !passwordVal) {
    alert("Please fill all required fields.");
    return;
  }

  /* ================= DUPLICATE CHECK ================= */
  if (users.some(u => u.email === emailVal)) {
    alert("Email already registered.");
    return;
  }

  /* ================= CREATE AUTH USER ================= */
  const userId = Date.now();

  const authUser = {
    id: userId,
    email: emailVal,
    password: passwordVal,
    role
  };

  users.push(authUser);
  localStorage.setItem("users", JSON.stringify(users));

  /* ================= ROLE PROFILES ================= */

  if (role === "staff") {
    myStaff.push({
      id: userId,
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      phone: phoneVal,
      address: addressVal,
      attendance: [],
      lessons: []
    });

    localStorage.setItem("myStaff", JSON.stringify(myStaff));
    alert("Staff registered successfully.");
  }

  if (role === "student") {
    students.push({
      id: userId,
      name: `${firstNameVal} ${lastNameVal}`,
      email: emailVal,
      attendance: [],
      results: []
    });

    localStorage.setItem("students", JSON.stringify(students));
    alert("Student registered successfully.");
  }

  if (role === "parent") {
    parents.push({
      id: userId,
      name: `${firstNameVal} ${lastNameVal}`,
      email: emailVal,
      children: []
    });

    localStorage.setItem("parents", JSON.stringify(parents));
    alert("Parent registered successfully.");
  }

  /* ================= REDIRECT ================= */
  window.location.href = "index.html";
});
