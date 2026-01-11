/**
 * parent-dashboard.js
 * --------------------------------------------------
 * Parent dashboard:
 * - Auth guard
 * - View linked children
 * - View attendance
 * - View results
 * --------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= AUTH ================= */
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "parent") {
    alert("Parents only");
    window.location.href = "index.html";
    return;
  }

  /* ================= LOAD DATA ================= */
  const parents = JSON.parse(localStorage.getItem("parents")) || [];
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const parent = parents.find(
    p => p.id === currentUser.id || p.email === currentUser.email
  );

  const resultsContainer = document.getElementById("parentResultsContainer");
  const attendanceList = document.getElementById("childAttendance");

  resultsContainer.innerHTML = "";
  attendanceList.innerHTML = "";

  if (!parent) {
    resultsContainer.innerHTML = "<p>No parent record found.</p>";
    return;
  }

  const childrenIds = Array.isArray(parent.children) ? parent.children : [];

  if (childrenIds.length === 0) {
    resultsContainer.innerHTML = "<p>No children linked yet.</p>";
    attendanceList.innerHTML = "<li>No children linked yet.</li>";
    return;
  }

  /* ================= RENDER RESULTS ================= */
  childrenIds.forEach(childId => {
    const student = students.find(s => s.id === childId);
    if (!student) return;

    const section = document.createElement("section");
    section.className = "child-result-block";

    const title = document.createElement("h3");
    title.textContent = student.name;
    section.appendChild(title);

    if (!Array.isArray(student.results) || student.results.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No results published yet.";
      section.appendChild(p);
    } else {
      const ul = document.createElement("ul");

      student.results.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${r.subject}</strong> — ${r.score}<br>
          <small>${r.term} | ${r.date}</small>
        `;
        ul.appendChild(li);
      });

      section.appendChild(ul);
    }

    resultsContainer.appendChild(section);
  });

  /* ================= RENDER ATTENDANCE ================= */
  childrenIds.forEach(childId => {
    const student = students.find(s => s.id === childId);
    if (!student) return;

    const li = document.createElement("li");
    li.innerHTML = `<strong>${student.name}</strong>`;

    if (!Array.isArray(student.attendance) || student.attendance.length === 0) {
      li.innerHTML += "<p>No attendance records yet.</p>";
    } else {
      const ul = document.createElement("ul");

      student.attendance.forEach(a => {
        const record = document.createElement("li");
        record.textContent = `${a.date} — ${a.status}`;
        ul.appendChild(record);
      });

      li.appendChild(ul);
    }

    attendanceList.appendChild(li);
  });

});
