/* =====================================================
   MADELYN FASHION WEBSITE
   SHARED MULTI-PAGE JAVASCRIPT
   Navigation | WhatsApp | Enquiries | Utilities
===================================================== */

/* =====================================================
   01. WHATSAPP CONFIGURATION
===================================================== */

const academyWhatsApp = "2347069605640";
const apparelWhatsApp = "2347069605640";

/* =====================================================
   02. SHARED WEBSITE INITIALISATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ===================================================
     03. MOBILE NAVIGATION
  =================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  const dropdownItems = document.querySelectorAll(".nav-menu .has-dropdown");

  const mobileBreakpoint = 768;

  if (menuToggle && navMenu) {
    // Close all nested dropdowns

    function closeDropdowns() {
      dropdownItems.forEach(function (item) {
        item.classList.remove("open");

        const link = item.querySelector(":scope > a");

        if (link) {
          link.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Close the entire mobile navigation

    function closeNavigation() {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Open navigation menu");

      closeDropdowns();
    }

    // Open the mobile navigation

    function openNavigation() {
      navMenu.classList.add("active");

      menuToggle.classList.add("active");

      menuToggle.setAttribute("aria-expanded", "true");

      menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    // Hamburger button

    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.contains("active");

      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });

    /* ===============================================
       04. ACADEMY AND APPAREL DROPDOWNS
    =============================================== */

    dropdownItems.forEach(function (item) {
      const dropdownLink = item.querySelector(":scope > a");

      if (!dropdownLink) return;

      dropdownLink.setAttribute("aria-haspopup", "true");
      dropdownLink.setAttribute("aria-expanded", "false");

      dropdownLink.addEventListener("click", function (event) {
        // Mobile and tablet dropdown behaviour

        if (window.innerWidth <= mobileBreakpoint) {
          event.preventDefault();

          const isOpen = item.classList.contains("open");

          // Close other dropdowns

          dropdownItems.forEach(function (otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove("open");

              const otherLink = otherItem.querySelector(":scope > a");

              if (otherLink) {
                otherLink.setAttribute("aria-expanded", "false");
              }
            }
          });

          // Toggle selected dropdown

          item.classList.toggle("open", !isOpen);

          dropdownLink.setAttribute("aria-expanded", String(!isOpen));
        }
      });
    });

    /* ===============================================
       05. CLOSE MENU AFTER SELECTING A DESTINATION
    =============================================== */

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        const isDropdownParent =
          link.parentElement.classList.contains("has-dropdown");

        // Parent links expand their dropdown on mobile.
        // Actual destination links close the menu.

        if (!isDropdownParent && window.innerWidth <= mobileBreakpoint) {
          closeNavigation();
        }
      });
    });

    /* ===============================================
       06. CLOSE MENU WHEN CLICKING OUTSIDE
    =============================================== */

    document.addEventListener("click", function (event) {
      const clickedInsideNavigation = event.target.closest(".main-navigation");

      if (!clickedInsideNavigation && navMenu.classList.contains("active")) {
        closeNavigation();
      }
    });

    /* ===============================================
       07. CLOSE MENU WITH ESCAPE KEY
    =============================================== */

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        closeNavigation();
        menuToggle.focus();
      }
    });

    /* ===============================================
       08. RESET NAVIGATION ON DESKTOP RESIZE
    =============================================== */

    window.addEventListener("resize", function () {
      if (window.innerWidth > mobileBreakpoint) {
        closeNavigation();
      }
    });
  }

  /* ===================================================
     09. AUTOMATIC COPYRIGHT YEAR
  =================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ===================================================
     10. BACK TO TOP BUTTON
  =================================================== */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    // Set the correct initial state

    toggleBackToTop();

    backToTop.addEventListener("click", function (event) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ===================================================
     11. ACADEMY ENQUIRY FORM
  =================================================== */

  const academyForm = document.getElementById("academyForm");

  if (academyForm) {
    academyForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = academyForm.querySelector("#academy-name")?.value.trim();

      const email = academyForm.querySelector("#academy-email")?.value.trim();

      const phone = academyForm.querySelector("#academy-phone")?.value.trim();

      const course = academyForm.querySelector("#academy-course")?.value.trim();

      const message = academyForm
        .querySelector("#academy-message")
        ?.value.trim();

      // Required-field validation

      if (!name || !email || !phone || !course) {
        alert("Please complete all required fields.");

        return;
      }

      // Email validation

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");

        return;
      }

      // Prepare WhatsApp enquiry

      const whatsappMessage = `Hello Madelyn Fashion Academy,

I would like to make an enquiry about your fashion training programme.

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Course Level: ${course}

Additional Information:
${message || "No additional information provided."}

I look forward to hearing from you.

Thank you.`;

      sendWhatsAppEnquiry(academyWhatsApp, whatsappMessage);
    });
  }

  /* ===================================================
     12. BRIDAL ENQUIRY FORM
  =================================================== */

  const bridalForm = document.getElementById("bridalForm");

  if (bridalForm) {
    bridalForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = bridalForm.querySelector("#bridal-name")?.value.trim();

      const email = bridalForm.querySelector("#bridal-email")?.value.trim();

      const phone = bridalForm.querySelector("#bridal-phone")?.value.trim();

      const outfit = bridalForm.querySelector("#bridal-outfit")?.value.trim();

      const eventDate = bridalForm.querySelector("#bridal-date")?.value;

      const message = bridalForm.querySelector("#bridal-message")?.value.trim();

      // Required-field validation

      if (!name || !email || !phone || !outfit) {
        alert("Please complete all required fields.");

        return;
      }

      // Email validation

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");

        return;
      }

      // Prepare WhatsApp enquiry

      const whatsappMessage = `Hello Madelyn Apparel,

I would like to make a bridal outfit enquiry.

Name: ${name}
Email: ${email}
Phone: ${phone}
Bridal Outfit: ${outfit}
Event Date: ${eventDate || "Not specified"}

Additional Details:
${message || "No additional information provided."}

I look forward to discussing my bridal outfit.

Thank you.`;

      sendWhatsAppEnquiry(apparelWhatsApp, whatsappMessage);
    });
  }
});

/* =====================================================
   13. EMAIL VALIDATION
===================================================== */

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

/* =====================================================
   14. WHATSAPP ENQUIRY HANDLER
===================================================== */

function sendWhatsAppEnquiry(phoneNumber, message) {
  // Validate the configured WhatsApp number

  if (
    !phoneNumber ||
    phoneNumber.includes("X") ||
    !/^234\d{10}$/.test(phoneNumber)
  ) {
    alert(
      "The WhatsApp contact number has not been configured yet. Please contact the website administrator.",
    );

    return;
  }

  // Encode the enquiry message

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp in a new tab

  const whatsappWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer",
  );

  // Fallback if the browser blocks the new tab

  if (!whatsappWindow) {
    window.location.href = whatsappURL;
  }
}
