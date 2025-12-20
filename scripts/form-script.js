
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
    
  //// Get existing staff
  //const myStaff = JSON.parse(localStorage.getItem("myStaff")) || [];
  //const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];
//
  //const newStaff = {
  //  id: Date.now(),
  //  firstName,
  //  lastName,
  //  email,
  //  department,
  //  attendance: [],
  //  lessons: []
  //};
  //
  //staffList.push(newStaff);
  //localStorage.setItem("myStaff", JSON.stringify(staffList));
//
  //// Prevent duplicate emails
  //const exists = myStaff.some(s => s.email === staff.email);
  //if (exists) {
  //  alert("This email is already registered.");
  //  return;
  //}
//
  //// Save staff
  //myStaff.push(staff);
  //localStorage.setItem("myStaff", JSON.stringify(myStaff));
//
  //alert("Staff account created successfully!");
//
  //staffForm.reset();
  //window.location.href = "index.html";
});