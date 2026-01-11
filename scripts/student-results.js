/* ================= FIREBASE IMPORTS ================= */

// Firestore database instance
import { db } from "./firebase-config.js";

// Firestore helpers
import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ================= DOM ELEMENT ================= */

// Table body where results will be displayed
const resultsBody = document.getElementById("resultsBody");

/* ================= LOAD LOGGED-IN STUDENT ================= */

// Retrieve logged-in student session
const studentUser = JSON.parse(localStorage.getItem("studentUser"));

/* ================= HELPER FUNCTION ================= */

// Converts numeric score to grade
function getGrade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  return "F";
}

/* ================= LOAD RESULTS ================= */

async function loadResults() {
  try {
    // Clear existing table rows
    resultsBody.innerHTML = "";

    // Safety check
    if (!studentUser) {
      resultsBody.innerHTML =
        "<tr><td colspan='5'>Please log in again.</td></tr>";
      return;
    }

    /*
      Query results collection:
      - Match student ID
      - Ordered by latest upload
    */
    const q = query(
      collection(db, "results"),
      where("studentId", "==", studentUser.id),
      orderBy("createdAt", "desc")
    );

    // Fetch result records
    const snapshot = await getDocs(q);

    // If no result exists
    if (snapshot.empty) {
      resultsBody.innerHTML =
        "<tr><td colspan='5'>No results published yet.</td></tr>";
      return;
    }

    // Loop through results
    snapshot.forEach(doc => {
      const result = doc.data();

      // Create table row
      const tr = document.createElement("tr");

      // Fill row with result data
      tr.innerHTML = `
        <td>${result.subject}</td>
        <td>${result.score}</td>
        <td>${getGrade(result.score)}</td>
        <td>${result.term}</td>
        <td>${result.session}</td>
      `;

      // Append row
      resultsBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error loading results:", error);
    resultsBody.innerHTML =
      "<tr><td colspan='5'>Error loading results.</td></tr>";
  }
}

/* ================= INITIAL LOAD ================= */

// Load student results on page load
loadResults();
