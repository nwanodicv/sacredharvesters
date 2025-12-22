
// Get html element using the DOM
const staffForm = document.querySelector("#staffForm");
const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];
staffForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const staff = {
      id: Date.now(),
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      phone: phone.value.trim(),
      address: homeaddress.value.trim(),
      department: subjects.value.trim(),
      createdAt: timestamp.value,
      attendance: [],
      lessons: []
    };

    // prevent duplicate email
    if (staffList.some(s => s.email === staff.email)) {
      alert("This email is already registered.");
      return;
    }
    
    staffList.push(staff);
    localStorage.setItem("myStaff", JSON.stringify(staffList));
    
    alert("Staff account created successfully!");
    window.location.href = "index.html";
});