const heroSignInBtn = document.querySelector(".hero-signin");
const staffNavLink = document.querySelector(".staff-dashboard-page");

function openStaffLoginDialog() {
  const dialogStaff = document.createElement("dialog");

  dialogStaff.innerHTML = `
    <form id="staffLoginForm">
      <h3>Sign In</h3>

      <label>Email
        <input type="email" id="loginEmail" required>
      </label>

      <label>Password
        <input type="password" id="loginPassword" required>
      </label>

      <button type="submit">Sign In</button>
    </form>
  `;

  document.body.appendChild(dialogStaff);
  dialogStaff.showModal();

  const form = dialogStaff.querySelector("#staffLoginForm");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const email = dialogStaff.querySelector("#loginEmail").value.trim();
    const password = dialogStaff.querySelector("#loginPassword").value;

    staffLogin(email, password);
    dialogStaff.close();
  });

  dialogStaff.addEventListener("close", () => dialogStaff.remove());
}

// HERO BUTTON
heroSignInBtn?.addEventListener("click", openStaffLoginDialog);

// NAV STAFF LINK
staffNavLink?.addEventListener("click", e => {
  e.preventDefault(); // 🔥 CRITICAL
  openStaffLoginDialog();
});
