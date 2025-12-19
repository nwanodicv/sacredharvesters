const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];

const adminId = Number(localStorage.getItem("currentStaff"));
const adminList = JSON.parse(localStorage.getItem("myAdmin")) || [];

//console.log(adminList);

//if (!adminId) {
//  alert("Access denied. Please login.");
//  window.location.href = "index.html";
//}

const admin = adminList.find(ad => ad.id === adminId);

//if (!admin) {
//  alert("Session expired. Please login again.");
//  localStorage.removeItem("currentStaff");
//  window.location.href = "index.html";
//}


// DISPLAY STAFF INFO
document.querySelector("#adminInfo").innerHTML = `
  <h2>Welcome, ${admin.firstName} ${admin.lastName}</h2>
  <p><strong>Email:</strong> ${admin.email}</p>
  <p><strong>Subjects:</strong> ${admin.department}</p>
`;

// POPULATE TABLE 
const attendanceDateInput = document.querySelector("#attendanceDate");
function renderAttendance(staff) {
  attendanceBody.innerHTML = "";

  if (!staff || !staff.attendance || staff.attendance.length === 0) {
    attendanceBody.innerHTML =
      `<tr><td colspan="3">No attendance records</td></tr>`;
    return;
  }

  const selectedDate = attendanceDateInput.value;

  const filteredAttendance = selectedDate
    ? staff.attendance.filter(a => a.date === new Date(selectedDate).toLocaleDateString())
    : staff.attendance;

  if (filteredAttendance.length === 0) {
    attendanceBody.innerHTML =
      `<tr><td colspan="3">No attendance for selected date</td></tr>`;
    return;
  }

  filteredAttendance.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.type}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
    `;
    attendanceBody.appendChild(row);
  });
}


// STAFF CHECK-IN SECTION
const attendanceBody = document.querySelector("#attendanceHistory");
const checkInBtn = document.querySelector("#checkInBtn");

checkInBtn.addEventListener("click", () => {
  if (!selectedStaffId) {
    alert("Please select a staff");
    return;
  }

  const staff = staffList.find(s => s.id === selectedStaffId);
  if (!staff) return;

  staff.attendance = staff.attendance || [];

  const today = new Date().toLocaleDateString();
  const alreadyCheckedIn = staff.attendance.some(
    a => a.type === "Sign In" && a.date === today
  );

  if (alreadyCheckedIn) {
    alert("Staff already checked in today");
    return;
  }

  staff.attendance.push({
    type: "Sign In",
    date: today,
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("myStaff", JSON.stringify(staffList));
  renderAttendance(staff);
});

// STAFF CHECK-OUT SECTION
const checkOutBtn = document.querySelector("#checkOutBtn");

checkOutBtn.addEventListener("click", () => {
  if (!selectedStaffId) return;

  const staff = staffList.find(s => s.id === selectedStaffId);
  if (!staff) return;

  staff.attendance = staff.attendance || [];

  staff.attendance.push({
    type: "Logout",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("myStaff", JSON.stringify(staffList));
  renderAttendance(staff);
});
renderAttendance(staff);

// ADMIN TO VIEW LESSON NOTE
staffList.forEach(staff => {
  staff.lessons?.forEach(lesson => {
    console.log(
      `${staff.firstName} uploaded ${lesson.name} at ${lesson.uploadedAt}`
    );
  });
});

// STAFF DROPDOWN LOGIC
const staffSelect = document.querySelector("#staffSelect");
let selectedStaffId = null;

// Populate staff dropdown
staffList.forEach(staff => {
  const option = document.createElement("option");
  option.value = staff.id;
  option.textContent = `${staff.firstName} ${staff.lastName}`;
  staffSelect.appendChild(option);
});

// Default selection
if (staffList.length > 0) {
  selectedStaffId = staffList[0].id;
}

// Change selected staff
staffSelect.addEventListener("change", e => {
  selectedStaffId = Number(e.target.value);
  const staff = staffList.find(s => s.id === selectedStaffId);
  renderAttendance(staff);
});

// LIST OF UPLOADED NOTE
const adminLessonList = document.querySelector("#adminLessonList");

function renderLessonsForAdmin() {
  adminLessonList.innerHTML = "";

  staffList.forEach(staff => {
    if (!staff.lessons || staff.lessons.length === 0) return;

    staff.lessons.forEach(lesson => {
      const li = document.createElement("li");
      li.textContent =
        `${staff.firstName} ${staff.lastName} → ${lesson.name} (${lesson.uploadedAt})`;
      adminLessonList.appendChild(li);
    });
  });

  if (!adminLessonList.children.length) {
    adminLessonList.innerHTML = "<li>No lesson notes uploaded</li>";
  }
}
renderLessonsForAdmin();

// TRIGGER FILTER WHEN DATE CHANGES
attendanceDateInput.addEventListener("change", () => {
  if (!selectedStaffId) return;

  const staff = staffList.find(s => s.id === selectedStaffId);
  renderAttendance(staff);
});

// HOOK FILTER TO STAFF SELECTOR
staffSelect.addEventListener("change", e => {
  selectedStaffId = Number(e.target.value);
  const staff = staffList.find(s => s.id === selectedStaffId);
  renderAttendance(staff);
});