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
const staffDialogBoxSignIn = document.querySelector('.staff-dashboard-page');
const staffDashboardLink = document.querySelector("#staff-dashboard");

 // CREATE STAFF SIGN-IN DIALOG
staffDialogBoxSignIn.addEventListener("click", () => {
  const dialogStaff = document.createElement("dialog");

  dialogStaff.innerHTML = `
    <form id="staffLoginForm">
      <h3>Sign-In</h3>

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
      <h3>Sign-In</h3>

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