// 
const staffId = Number(localStorage.getItem("currentStaff"));
const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];
console.log(staffList);

if (!staffId) {
  alert("Access denied. Please login.");
  window.location.href = "index.html";
}

const staff = staffList.find(s => s.id === staffId);

if (!staff) {
  alert("Session expired. Please login again.");
  localStorage.removeItem("currentStaff");
  window.location.href = "index.html";
}


// DISPLAY STAFF INFO
document.querySelector("#staffInfo").innerHTML = `
  <h2>Welcome, ${staff.firstName} ${staff.lastName}</h2>
  <p><strong>Email:</strong> ${staff.email}</p>
  <p><strong>Subjects:</strong> ${staff.subjects}</p>
`;

const attendanceBody = document.querySelector("#attendanceHistory");
const signInBtn = document.querySelector("#signInBtn");

function renderAttendance() {
  attendanceBody.innerHTML = "";

  staff.attendance.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.date}</td>
      <td>${a.time}</td>
    `;
    attendanceBody.appendChild(row);
  });
}

signInBtn.addEventListener("click", () => {
  const now = new Date();

  staff.attendance.push({
    type: "Sign In",
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  localStorage.setItem("myStaff", JSON.stringify(staffList));
  renderAttendance();
});

// UPLOAD SECTION
const uploadBtn = document.querySelector("#uploadLesson");
const fileInput = document.querySelector("#lessonFile");
const lessonList = document.querySelector("#lessonList");

staff.lessons = staff.lessons || [];

uploadBtn.addEventListener("click", () => {
  if (!fileInput.files.length) return;

  const file = fileInput.files[0];

  staff.lessons.push({
    name: file.name,
    uploadedAt: new Date().toLocaleString()
  });

  localStorage.setItem("myStaff", JSON.stringify(staffList));
  renderLessons();
});

function renderLessons() {
  lessonList.innerHTML = "";
  staff.lessons.forEach(l => {
    const li = document.createElement("li");
    li.textContent = `${l.name} (${l.uploadedAt})`;
    lessonList.appendChild(li);
  });
}
renderLessons();


const logoutBtn = document.querySelector("#logoutBtn");

function renderAttendance() {
  attendanceBody.innerHTML = "";

  staff.attendance.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.type}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
    `;
    attendanceBody.appendChild(row);
  });
};


logoutBtn.addEventListener("click", () => {
  const now = new Date();

  staff.attendance.push({
    type: "Logout",
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  localStorage.setItem("myStaff", JSON.stringify(staffList));

  // Clear session
  localStorage.removeItem("currentStaff");

  alert("You have logged out successfully.");
  window.location.href = "index.html";
});


const today = new Date().toLocaleDateString();

const alreadySignedIn = staff.attendance.some(
  a => a.type === "Sign In" && a.date === today
);

//if (alreadySignedIn) {
//  alert("You have already signed in today.");
//  return;
//};


