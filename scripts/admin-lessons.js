/* ================= FIREBASE IMPORTS ================= */

// Import database instance from firebase config
import { db } from "./firebase-config.js";

// Import Firestore helpers
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ================= DOM ELEMENTS ================= */

// Container for lesson notes (student-visible)
const lessonNotesList = document.getElementById("lessonNotesList");

// Container for lesson plans (admin-only)
const lessonPlansList = document.getElementById("lessonPlansList");

/* ================= FETCH & DISPLAY LESSON CONTENT ================= */

async function loadLessons() {
  try {
    // Clear existing content to prevent duplication
    lessonNotesList.innerHTML = "";
    lessonPlansList.innerHTML = "";

    // Create Firestore query (order by upload time)
    const q = query(
      collection(db, "lessonContents"),
      orderBy("createdAt", "desc")
    );

    // Fetch documents from Firestore
    const snapshot = await getDocs(q);

    // Loop through every lesson uploaded by staff
    snapshot.forEach(doc => {
      const data = doc.data();

      // Create a reusable card
      const card = document.createElement("div");
      card.className = "lesson-card";

      // Card UI content
      card.innerHTML = `
        <h3>${data.title}</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Class:</strong> ${data.classId}</p>
        <p><strong>Term:</strong> ${data.term}</p>
        <p><strong>Uploaded By:</strong> ${data.uploaderName}</p>
        <p><strong>Type:</strong> ${data.type}</p>
        <a href="${data.contentUrl}" target="_blank">Open File</a>
      `;

      // Separate lesson notes and lesson plans
      if (data.type === "lesson_note") {
        lessonNotesList.appendChild(card);
      } else if (data.type === "lesson_plan") {
        lessonPlansList.appendChild(card);
      }
    });

  } catch (error) {
    // Error handling
    console.error("Error loading lessons:", error);
  }
}

/* ================= INITIAL LOAD ================= */

// Load lessons immediately when admin dashboard opens
loadLessons();
