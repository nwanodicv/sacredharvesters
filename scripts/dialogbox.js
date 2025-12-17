// DIALOG BOX FUNCTIONALITY
const dialogBox = document.getElementById("dialog-box");
const heroSignInBtn = document.querySelector(".hero-signin");
const closeDialogBtn = document.getElementById("close-dialog");

heroSignInBtn.addEventListener("click", () => {
  dialogBox.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialogBox.close();
});

// SIGNIN BUTTON IN DIALOG
const staffDialogBoxSignIn = document.querySelector('.staff-dashboard-page')
const adminDialogBoxSignIn = document.querySelector('.admin-dashboard-page')
const adminDashboardLink = document.querySelector("#admin-dashboard");
const staffDashboardLink = document.querySelector("#staff-dashboard");

// CREATE ADMIN SIGN-IN DIALOG
adminDialogBoxSignIn.addEventListener("click", () => {
  const dialogAdmin = document.createElement("dialog");

  dialogAdmin.innerHTML = `
    <form id="staffLoginForm">
      <h3>Staff Sign-In</h3>

      <label>Email
        <input type="email" id="loginEmail" required>
      </label>

      <label>Password
        <input type="password" id="loginPassword" required>
      </label>

      <button type="submit">Sign In</button>
    </form>
  `;

  document.body.appendChild(dialogAdmin);
  dialogAdmin.showModal();

  const form = dialogAdmin.querySelector("#adminLoginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = dialogAdmin.querySelector("#loginEmail").value.trim();
    const password = dialogAdmin.querySelector("#loginPassword").value;

    adminLogin(email, password);
  });

  dialogStaff.addEventListener("close", () => {
    dialogStaff.remove();
  });
});


adminDashboardLink.addEventListener("click", () => {
  window.location.href = "admin.html";
});


 // CREATE STAFF SIGN-IN DIALOG
staffDialogBoxSignIn.addEventListener("click", () => {
  const dialogStaff = document.createElement("dialog");

  dialogStaff.innerHTML = `
    <form id="staffLoginForm">
      <h3>Staff Sign-In</h3>

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = dialogStaff.querySelector("#loginEmail").value.trim();
    const password = dialogStaff.querySelector("#loginPassword").value;

    staffLogin(email, password);
  });

  dialogStaff.addEventListener("close", () => {
    dialogStaff.remove();
  });
});

staffDashboardLink.addEventListener("click", () => {
  const dialogStaff = document.createElement("dialog");

  dialogStaff.innerHTML = `
    <form id="staffLoginForm">
      <h3>Staff Sign-In</h3>

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = dialogStaff.querySelector("#loginEmail").value.trim();
    const password = dialogStaff.querySelector("#loginPassword").value;

    staffLogin(email, password);
  });

  dialogStaff.addEventListener("close", () => {
    dialogStaff.remove();
  });
});