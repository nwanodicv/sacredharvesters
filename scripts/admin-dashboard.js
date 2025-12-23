// ===================== AUTH CHECK =====================
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "admin") {
  alert("Access denied");
  window.location.href = "index.html";
}

// ===================== DATA =====================
let staffList = JSON.parse(localStorage.getItem("myStaff")) || [];
let selectedStaffId = null;

// ===================== ELEMENTS =====================
const staffSelect = document.querySelector("#staffSelect");
const attendanceBody = document.querySelector("#attendanceHistory");
const attendanceDateInput = document.querySelector("#attendanceDate");
const checkInBtn = document.querySelector("#checkInBtn");
const checkOutBtn = document.querySelector("#checkOutBtn");
const adminLessonList = document.querySelector("#adminLessonList");
const adminInfo = document.querySelector("#adminInfo");

// ===================== ADMIN INFO =====================
adminInfo.innerHTML = `
  <h2>Welcome, Admin</h2>
  <p><strong>Email:</strong> sacredharvester@gmail.com</p>
`;

// ===================== UTIL =====================
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function saveStaff() {
  localStorage.setItem("myStaff", JSON.stringify(staffList));
}

// ===================== STAFF DROPDOWN =====================
function populateStaffDropdown() {
  staffSelect.innerHTML = `<option value="">-- Select Staff --</option>`;

  staffList.forEach(staff => {
    const option = document.createElement("option");
    option.value = staff.id;
    option.textContent = `${staff.firstName} ${staff.lastName}`;
    staffSelect.appendChild(option);
  });

  checkInBtn.disabled = true;
  checkOutBtn.disabled = true;
}

populateStaffDropdown();

// ===================== STAFF SELECTION =====================
staffSelect.addEventListener("change", e => {
  selectedStaffId = Number(e.target.value);

  checkInBtn.disabled = !selectedStaffId;
  checkOutBtn.disabled = !selectedStaffId;

  const staff = staffList.find(s => s.id === selectedStaffId);
  renderAttendance(staff);
});

// ===================== ATTENDANCE RENDER =====================
function renderAttendance(staff) {
  attendanceBody.innerHTML = "";

  if (!staff || !staff.attendance || staff.attendance.length === 0) {
    attendanceBody.innerHTML =
      `<tr><td colspan="3">No attendance records</td></tr>`;
    return;
  }

  const selectedDate = attendanceDateInput.value;

  const records = selectedDate
    ? staff.attendance.filter(a => a.date === selectedDate)
    : staff.attendance;

  if (records.length === 0) {
    attendanceBody.innerHTML =
      `<tr><td colspan="3">No attendance for selected date</td></tr>`;
    return;
  }

  records.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.type}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
    `;
    attendanceBody.appendChild(row);
  });
}

// ===================== CHECK-IN =====================
checkInBtn.addEventListener("click", () => {
  const staff = staffList.find(s => s.id === selectedStaffId);
  if (!staff) return;

  const today = todayISO();
  staff.attendance ||= [];

  const alreadyIn = staff.attendance.some(
    a => a.type === "Sign In" && a.date === today
  );

  if (alreadyIn) {
    alert("Staff already checked in today");
    return;
  }

  staff.attendance.push({
    type: "Sign In",
    date: today,
    time: new Date().toLocaleTimeString()
  });

  saveStaff();
  renderAttendance(staff);
});

// ===================== CHECK-OUT =====================
checkOutBtn.addEventListener("click", () => {
  const staff = staffList.find(s => s.id === selectedStaffId);
  if (!staff) return;

  const today = todayISO();
  staff.attendance ||= [];

  const checkedIn = staff.attendance.some(
    a => a.type === "Sign In" && a.date === today
  );

  if (!checkedIn) {
    alert("Staff must check in before checking out");
    return;
  }

  const alreadyOut = staff.attendance.some(
    a => a.type === "Logout" && a.date === today
  );

  if (alreadyOut) {
    alert("Staff already checked out today");
    return;
  }

  staff.attendance.push({
    type: "Logout",
    date: today,
    time: new Date().toLocaleTimeString()
  });

  saveStaff();
  renderAttendance(staff);
});

// ===================== DATE FILTER =====================
attendanceDateInput.addEventListener("change", () => {
  const staff = staffList.find(s => s.id === selectedStaffId);
  renderAttendance(staff);
});

// ===================== REMOVE STAFF =====================
function removeSelectedStaff() {
  if (!selectedStaffId) {
    alert("Select a staff first");
    return;
  }

  const staff = staffList.find(s => s.id === selectedStaffId);
  if (!staff) return;

  const confirmDelete = confirm(
    `Are you sure you want to remove ${staff.firstName} ${staff.lastName}?`
  );

  if (!confirmDelete) return;

  staffList = staffList.filter(s => s.id !== selectedStaffId);
  saveStaff();

  selectedStaffId = null;
  populateStaffDropdown();
  attendanceBody.innerHTML = `<tr><td colspan="3">Staff removed</td></tr>`;
}

// ===================== REMOVE BUTTON =====================
const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove Staff";
removeBtn.style.marginTop = "1rem";
removeBtn.addEventListener("click", removeSelectedStaff);

document.querySelector(".staff-select-section").appendChild(removeBtn);

// ===================== LESSON VIEW =====================
function renderLessonsForAdmin() {
  adminLessonList.innerHTML = "";

  staffList.forEach(staff => {
    staff.lessons?.forEach(lesson => {
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