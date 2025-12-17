const adminId = Number(localStorage.getItem("currentStaff"));
const adminList = JSON.parse(localStorage.getItem("myAdmin")) || [];
//console.log(adminList);

if (!adminId) {
  alert("Access denied. Please login.");
  window.location.href = "index.html";
}

const admin = adminList.find(ad => ad.id === adminId);

if (!admin) {
  alert("Session expired. Please login again.");
  localStorage.removeItem("currentStaff");
  window.location.href = "index.html";
}


// DISPLAY STAFF INFO
document.querySelector("#adminInfo").innerHTML = `
  <h2>Welcome, ${admin.firstName} ${admin.lastName}</h2>
  <p><strong>Email:</strong> ${admin.email}</p>
  <p><strong>Subjects:</strong> ${admin.department}</p>
`;

const attendanceBody = document.querySelector("#attendanceHistory");
const chechInBtn = document.querySelector("#checkInBtn");

function renderAttendance() {
  attendanceBody.innerHTML = "";

  admin.attendance.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.date}</td>
      <td>${a.time}</td>
    `;
    attendanceBody.appendChild(row);
  });
}

checkInBtnInBtn.addEventListener("click", () => {
  const now = new Date();

  admin.attendance.push({
    type: "Sign In",
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  localStorage.setItem("myStaff", JSON.stringify(adminList));
  renderAttendance();
});