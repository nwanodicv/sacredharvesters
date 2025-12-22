const staffList = JSON.parse(localStorage.getItem("myStaff")) || [];
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "admin") {
  alert("Access denied");
  window.location.href = "index.html";
}

// DISPLAY ADMIN INFO

document.querySelector("#adminInfo").innerHTML = `
 <aside>
    <h2>Welcome, Admin</h2>
    <p><strong>Email:</strong> sacredharvester@gmail.com</p>
  </aside>
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

// ATTENDANCE BODY
const attendanceBody = document.querySelector("#attendanceHistory");

function renderSelectedStaffAttendance() {
  attendanceBody.innerHTML = "";

  if (!selectedStaffId) return;

  const staff = staffList.find(s => s.id === selectedStaffId);
  if (!staff || !staff.attendance) return;

  staff.attendance.forEach(a => {
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
    a => a.type === "Check In" && a.date === today
  );

  if (alreadyCheckedIn) {
    alert("Staff already checked in today");
    return;
  }

  //staff.attendance.push({
  //  type: "Check In",
  //  date: today,
  //  time: new Date().toLocaleTimeString()
  //});

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
    type: "Check out",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  

  localStorage.setItem("myStaff", JSON.stringify(staffList));
  renderAttendance(staff);
});


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

function populateStaffDropdown() {
  staffSelect.innerHTML = `<option value="">-- Select Staff --</option>`;
// Populate staff dropdown
  staffList.forEach(staff => {
    const option = document.createElement("option");
    option.value = staff.id;
    option.textContent = `${staff.firstName} ${staff.lastName}`;
    staffSelect.appendChild(option);
  });
};
populateStaffDropdown();

// STAFF SELECTION LOGIC
let selectedStaffId = null;

staffSelect.addEventListener("change", e => {
  selectedStaffId = Number(e.target.value);

  const staff = staffList.find(s => s.id === selectedStaffId);
  renderAttendance(staff);
});

// Default selection
if (staffList.length > 0) {
  selectedStaffId = staffList[0].id;
}

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