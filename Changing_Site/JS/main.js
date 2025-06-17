
// Typewriter Header
const line1 = "Browse & Select";
const line2 = "E-Books";
let l1Index = 0, l2Index = 0;
function typeLine1() {
  if (l1Index < line1.length) {
    document.getElementById("typewriter-line1").textContent += line1[l1Index++];
    setTimeout(typeLine1, 140);
  } else setTimeout(typeLine2, 400);
}
function typeLine2() {
  if (l2Index < line2.length) {
    document.getElementById("typewriter-line2").textContent += line2[l2Index++];
    setTimeout(typeLine2, 140);
  }
}
typeLine1();

// Looping phrases
const phrases = ["Find the best E-Books for you.", "Curated books you'll love.", "Read anywhere, anytime.", "Stories that inspire change."];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const homeText = document.getElementById("home-typewriter");
function typeLoop() {
  homeText.textContent = phrases[phraseIndex].substring(0, charIndex);
  if (!isDeleting && charIndex < phrases[phraseIndex].length) charIndex++;
  else if (isDeleting && charIndex > 0) charIndex--;
  else { isDeleting = !isDeleting; if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length; }
  setTimeout(typeLoop, isDeleting ? 60 : 100);
}
typeLoop();

// Search Modal
const searchBtn = document.getElementById("search-button"), searchClose = document.getElementById("search-close"), searchContent = document.getElementById("search-content");
searchBtn?.addEventListener("click", () => searchContent.classList.add("show-search"));
searchClose?.addEventListener("click", () => searchContent.classList.remove("show-search"));

// Login Modal
const loginBtn = document.getElementById("login-button"), loginClose = document.getElementById("login-close"), loginModal = document.getElementById("login-content");
loginBtn?.addEventListener("click", () => loginModal.classList.add("show-login"));
loginClose?.addEventListener("click", () => loginModal.classList.remove("show-login"));

// Header shadow
window.addEventListener("scroll", () => {
  document.getElementById("header").classList.toggle("shadow-header", window.scrollY >= 50);
});

// Swiper: Home
new Swiper(".home__swiper", {
  effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  coverflowEffect: { rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
  breakpoints: { 1220: { spaceBetween: -32 } },
});

// Dark Mode Toggle
const themeBtn = document.getElementById("theme-button"), darkClass = "dark-theme", iconClass = "ri-sun-line";
const currentTheme = () => document.body.classList.contains(darkClass) ? "dark" : "light";
const currentIcon = () => themeBtn.classList.contains(iconClass) ? "ri-moon-line" : "ri-sun-line";
if (localStorage.getItem("selected-theme")) {
  document.body.classList[localStorage.getItem("selected-theme") === "dark" ? "add" : "remove"](darkClass);
  themeBtn.classList[localStorage.getItem("selected-icon") === "ri-moon-line" ? "add" : "remove"](iconClass);
}
themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle(darkClass);
  themeBtn.classList.toggle(iconClass);
  localStorage.setItem("selected-theme", currentTheme());
  localStorage.setItem("selected-icon", currentIcon());
});

//Servise Section
document.addEventListener("DOMContentLoaded", () => {
  const adIcon = document.getElementById("icon-ad");
  const globeIcon = document.getElementById("icon-globe");
  const supportIcon = document.getElementById("icon-support");

  function animateIfNear(mouseX, mouseY, element, distance, className, duration = 1000) {
    if (!element) return; // safety
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dist = Math.hypot(mouseX - centerX, mouseY - centerY);
    if (dist < distance && !element.classList.contains(className)) {
      element.classList.add(className);
      setTimeout(() => element.classList.remove(className), duration);
    }
  }

  document.addEventListener("mousemove", (e) => {
    animateIfNear(e.clientX, e.clientY, adIcon, 100, "icon-animate-strike", 400);
    animateIfNear(e.clientX, e.clientY, globeIcon, 100, "icon-animate-spin", 1000);
    animateIfNear(e.clientX, e.clientY, supportIcon, 100, "icon-animate-flip", 600);
  });
});
//Footer
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");

  if (footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add("animate-footer");
          observer.unobserve(footer);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(footer);
  }
});


// Toaster
function showFormToast(message) {
  const toast = document.getElementById("form-toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
document.addEventListener("DOMContentLoaded", () => {
  const joinForm = document.getElementById("joinForm");
  if (joinForm) {
    joinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showFormToast("🎉 Thanks for joining! We'll send you updates.");
      joinForm.reset();
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("footerNewsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showFormToast("📬 You're now subscribed to our newsletter!");
      newsletterForm.reset();
    });
  }
});

// Cursor 
document.addEventListener("DOMContentLoaded", () => {
  // Create and add the cursor glow
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-trail");
  document.body.appendChild(cursor);

  // Mouse move: move glow and update background gradient
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;
    document.body.style.setProperty('--x', `${xPercent}%`);
    document.body.style.setProperty('--y', `${yPercent}%`);
  });

  // Click ripple effect
  document.addEventListener("click", (e) => {
    const ripple = document.createElement("div");
    ripple.classList.add("cursor-ripple");
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});




// Admin Login & Upload Modal
sessionStorage.removeItem("isAdmin");
window.addEventListener("load", () => {
  if (sessionStorage.getItem("isAdmin")) {
    alert("Admin mode has been reset.");
  }
  sessionStorage.removeItem("isAdmin");
});



const adminBtn = document.getElementById("admin-login-btn"), uploadBtn = document.getElementById("upload-toggle"), uploadModal = document.getElementById("upload-modal"), uploadClose = document.getElementById("upload-close");
if (sessionStorage.getItem("isAdmin") === "true") uploadBtn.style.display = "inline";
adminBtn?.addEventListener("click", () => {
  const pwd = prompt("Enter admin password:");
  if (pwd === "123") {
    alert("✅ Admin access granted!");
    sessionStorage.setItem("isAdmin", "true");
    uploadBtn.style.display = "inline";
    renderBooks();
  } else alert("❌ Incorrect password.");
});
uploadBtn?.addEventListener("click", () => uploadModal.style.display = "flex");
uploadClose?.addEventListener("click", () => uploadModal.style.display = "none");


// Firebase Renderbooks

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();
const booksCollection = collection(db, "books");


async function renderBooks(limit = 4) {
  const container = document.getElementById("newBooksContainer") || document.getElementById("allBooksContainer");
  const seeAllContainer = document.querySelector(".see-all-container");

  try {
    const snapshot = await getDocs(collection(db, "books"));
    const books = [];
    snapshot.forEach(doc => books.push({ id: doc.id, ...doc.data() }));

    const visibleBooks = books.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);

    container.innerHTML = "";
    visibleBooks.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("book");
      card.innerHTML = `
        <div class="cover">
          <img src="${book.image}" alt="${book.title}" class="book-img" />
        </div>
        <div class="back">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>
          <a href="${book.pdf}" target="_blank" class="read-btn bounce-inside">Read Now</a>
        </div>
      `;
      container.appendChild(card);
    });

    // ✅ Show or hide the See All button
   if (seeAllContainer) {
  seeAllContainer.style.display = books.length <= 4 ? "block" : "none"; // 👈 for testing
}

    

  } catch (error) {
    console.error("Error loading books:", error);
    container.innerHTML = "<p>Failed to load books.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks(4); // show 4 books on homepage
});


// Firebase Upload form
document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");

  uploadForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newBook = {
      title: document.getElementById("bookTitle").value.trim(),
      image: document.getElementById("bookImage").value.trim(),
      pdf: document.getElementById("bookPDF").value.trim(),
      author: document.getElementById("bookAuthor").value.trim(),
      timestamp: Date.now()
    };

    try {
      await addDoc(booksCollection, newBook);
      showFormToast("✅ Book uploaded");
      uploadForm.reset();
      document.getElementById("upload-modal").style.display = "none";
      renderBooks();
    } catch (error) {
      console.error("Upload failed:", error);
      showFormToast("❌ Upload failed.");
    }
  });

  // Render books on page load
  renderBooks(window.location.pathname.includes("all-books.html") ? 100 : 4);
});

