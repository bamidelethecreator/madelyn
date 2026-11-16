/* =========================================================
   MADELYN FASHION WEBSITE
   SHARED MULTI-PAGE JAVASCRIPT

   Navigation | Formspree | Customer WhatsApp | Utilities

   WEBSITE PAGES:
   - index.html
   - academy.html
   - apparel.html
   - gallery.html

   ENQUIRY WORKFLOW:
   1. Customer completes the website form.
   2. Formspree saves the enquiry.
   3. Formspree sends an email notification to the owner.
   4. Customer's WhatsApp opens with a pre-filled enquiry.
   5. Customer presses SEND to contact Madelyn Fashion.
========================================================= */

/* =========================================================
   01. FORMSPREE CONFIGURATION
========================================================= */

const academyFormspreeEndpoint = "https://formspree.io/f/YOUR_ACADEMY_FORM_ID";

const bridalFormspreeEndpoint = "https://formspree.io/f/YOUR_BRIDAL_FORM_ID";

/* =========================================================
   02. WHATSAPP CONFIGURATION
========================================================= */

// International format only.
// Do not include +, spaces or hyphens.

const academyWhatsApp = "2347069605640";

const apparelWhatsApp = "2347069605640";

/* =========================================================
   03. SHARED WEBSITE CONFIGURATION
========================================================= */

const MOBILE_BREAKPOINT = 900;

/* =========================================================
   04. SHARED WEBSITE INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =======================================================
     05. MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");

  const navMenu = document.querySelector(".nav-menu");

  const dropdownItems = document.querySelectorAll(".nav-menu .has-dropdown");

  if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-controls", navMenu.id || "primary-menu");

    /* -----------------------------------------------------
       CLOSE ALL DROPDOWNS
    ----------------------------------------------------- */

    function closeDropdowns() {
      dropdownItems.forEach(function (item) {
        item.classList.remove("open");

        const dropdownLink = item.querySelector(":scope > a");

        if (dropdownLink) {
          dropdownLink.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* -----------------------------------------------------
       CLOSE MOBILE NAVIGATION
    ----------------------------------------------------- */

    function closeNavigation() {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Open navigation menu");

      closeDropdowns();
    }

    /* -----------------------------------------------------
       OPEN MOBILE NAVIGATION
    ----------------------------------------------------- */

    function openNavigation() {
      navMenu.classList.add("active");

      menuToggle.classList.add("active");

      menuToggle.setAttribute("aria-expanded", "true");

      menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    // Set the initial menu state.

    menuToggle.setAttribute(
      "aria-expanded",
      String(navMenu.classList.contains("active")),
    );

    /* -----------------------------------------------------
       HAMBURGER BUTTON
    ----------------------------------------------------- */

    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.contains("active");

      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });

    /* =====================================================
       06. ACADEMY AND APPAREL DROPDOWNS
    ===================================================== */

    dropdownItems.forEach(function (item) {
      const dropdownLink = item.querySelector(":scope > a");

      if (!dropdownLink) return;

      dropdownLink.setAttribute("aria-haspopup", "true");

      dropdownLink.setAttribute("aria-expanded", "false");

      dropdownLink.addEventListener("click", function (event) {
        // On mobile and tablet, clicking a parent link
        // expands its dropdown instead of navigating.

        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          event.preventDefault();

          const isOpen = item.classList.contains("open");

          // Close other dropdowns first.

          dropdownItems.forEach(function (otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove("open");

              const otherLink = otherItem.querySelector(":scope > a");

              if (otherLink) {
                otherLink.setAttribute("aria-expanded", "false");
              }
            }
          });

          // Toggle the selected dropdown.

          item.classList.toggle("open", !isOpen);

          dropdownLink.setAttribute("aria-expanded", String(!isOpen));
        }
      });
    });

    /* =====================================================
       07. CLOSE MENU AFTER SELECTING A DESTINATION
    ===================================================== */

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        const isDropdownParent =
          link.parentElement.classList.contains("has-dropdown");

        if (!isDropdownParent && window.innerWidth <= MOBILE_BREAKPOINT) {
          closeNavigation();
        }
      });
    });

    /* =====================================================
       08. CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const clickedInsideNavigation = target.closest(".main-navigation");

      if (!clickedInsideNavigation && navMenu.classList.contains("active")) {
        closeNavigation();
      }
    });

    /* =====================================================
       09. CLOSE MENU WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        closeNavigation();

        menuToggle.focus();
      }
    });

    /* =====================================================
       10. RESET NAVIGATION ON SCREEN RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeNavigation();
      }
    });
  }

  /* =======================================================
     11. AUTOMATIC COPYRIGHT YEAR
  ======================================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =======================================================
     12. BACK TO TOP BUTTON
  ======================================================= */

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

    // Set initial visibility.

    toggleBackToTop();

    // Return to the top of the page.

    backToTop.addEventListener("click", function (event) {
      event.preventDefault();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        top: 0,

        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  }

  /* =======================================================
     13. ACADEMY ENQUIRY FORM
  ======================================================= */

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

      // Required-field validation.

      if (!name || !email || !phone || !course) {
        showFormStatus(
          academyForm,
          "Please complete all required fields.",
          "error",
        );

        return;
      }

      // Email validation.

      if (!isValidEmail(email)) {
        showFormStatus(
          academyForm,
          "Please enter a valid email address.",
          "error",
        );

        return;
      }

      // Prepare Formspree data.

      const formData = new FormData(academyForm);

      formData.set("name", name);

      formData.set("email", email);

      formData.set("phone", phone);

      formData.set("preferred_course", course);

      formData.set("message", message || "No additional information provided.");

      formData.set("_subject", "New Madelyn Fashion Academy Enquiry");

      formData.set("enquiry_type", "Fashion Academy");

      // Prepare the customer's WhatsApp message.

      const whatsappMessage = `Hello Madelyn Fashion Academy,

I would like to make an enquiry about your fashion training programme.

CUSTOMER DETAILS

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Course Level: ${course}

ADDITIONAL INFORMATION

${message || "No additional information provided."}

I look forward to hearing from you.

Thank you.`;

      // Submit the enquiry.

      submitEnquiry({
        form: academyForm,

        endpoint: academyFormspreeEndpoint,

        whatsappNumber: academyWhatsApp,

        whatsappMessage: whatsappMessage,

        formData: formData,

        subject: "Academy Enquiry",
      });
    });
  }

  /* =======================================================
     14. BRIDAL ENQUIRY FORM
  ======================================================= */

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

      // Required-field validation.

      if (!name || !email || !phone || !outfit) {
        showFormStatus(
          bridalForm,
          "Please complete all required fields.",
          "error",
        );

        return;
      }

      // Email validation.

      if (!isValidEmail(email)) {
        showFormStatus(
          bridalForm,
          "Please enter a valid email address.",
          "error",
        );

        return;
      }

      // Prepare Formspree data.

      const formData = new FormData(bridalForm);

      formData.set("name", name);

      formData.set("email", email);

      formData.set("phone", phone);

      formData.set("bridal_outfit", outfit);

      formData.set("event_date", eventDate || "Not specified");

      formData.set("message", message || "No additional information provided.");

      formData.set("_subject", "New Madelyn Apparel Bridal Enquiry");

      formData.set("enquiry_type", "Bridal Apparel");

      // Prepare the customer's WhatsApp message.

      const whatsappMessage = `Hello Madelyn Apparel,

I would like to make a bridal outfit enquiry.

CUSTOMER DETAILS

Name: ${name}
Email: ${email}
Phone: ${phone}
Bridal Outfit: ${outfit}
Event Date: ${eventDate || "Not specified"}

ADDITIONAL DETAILS

${message || "No additional information provided."}

I look forward to discussing my bridal outfit.

Thank you.`;

      // Submit the enquiry.

      submitEnquiry({
        form: bridalForm,

        endpoint: bridalFormspreeEndpoint,

        whatsappNumber: apparelWhatsApp,

        whatsappMessage: whatsappMessage,

        formData: formData,

        subject: "Bridal Enquiry",
      });
    });
  }
});

/* =========================================================
   15. EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

/* =========================================================
   16. FORMSPREE ENDPOINT VALIDATION
========================================================= */

function isConfiguredFormspreeEndpoint(endpoint) {
  return (
    typeof endpoint === "string" &&
    /^https:\/\/formspree\.io\/f\/[^/\s]+$/.test(endpoint) &&
    !endpoint.includes("YOUR_")
  );
}

/* =========================================================
   17. WHATSAPP NUMBER VALIDATION
========================================================= */

function isValidWhatsAppNumber(phoneNumber) {
  return typeof phoneNumber === "string" && /^234\d{10}$/.test(phoneNumber);
}

/* =========================================================
   18. FORM STATUS MESSAGES
========================================================= */

function showFormStatus(form, message, type, linkUrl = null) {
  let status = form.querySelector(".form-status");

  // Create status element if it does not exist.

  if (!status) {
    status = document.createElement("p");

    status.className = "form-status";

    status.setAttribute("role", "status");

    status.setAttribute("aria-live", "polite");

    form.appendChild(status);
  }

  status.className = `form-status ${type}`;

  status.replaceChildren(document.createTextNode(message));

  // Provide a WhatsApp fallback link if necessary.

  if (linkUrl) {
    const link = document.createElement("a");

    link.href = linkUrl;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    link.textContent = "Open WhatsApp to send your enquiry";

    status.appendChild(document.createElement("br"));

    status.appendChild(link);
  }
}

/* =========================================================
   19. SUBMIT ENQUIRY TO FORMSPREE
========================================================= */

async function submitEnquiry({
  form,

  endpoint,

  whatsappNumber,

  whatsappMessage,

  formData,

  subject,
}) {
  /* -------------------------------------------------------
     CHECK FORMSPREE ENDPOINT
  ------------------------------------------------------- */

  if (!isConfiguredFormspreeEndpoint(endpoint)) {
    showFormStatus(
      form,
      `The ${subject} Formspree endpoint has not been configured. Please contact the website administrator.`,
      "error",
    );

    return;
  }

  /* -------------------------------------------------------
     CHECK WHATSAPP NUMBER
  ------------------------------------------------------- */

  if (!isValidWhatsAppNumber(whatsappNumber)) {
    showFormStatus(
      form,
      "The WhatsApp contact number is not configured correctly. Please contact the website administrator.",
      "error",
    );

    return;
  }

  /* -------------------------------------------------------
     PREVENT DUPLICATE SUBMISSIONS
  ------------------------------------------------------- */

  if (form.dataset.submitting === "true") {
    return;
  }

  form.dataset.submitting = "true";

  /* -------------------------------------------------------
     PREPARE SUBMIT BUTTON
  ------------------------------------------------------- */

  const submitButton = form.querySelector(
    'button[type="submit"], input[type="submit"]',
  );

  let originalButtonText = "";

  let originalButtonValue = "";

  if (submitButton) {
    if (submitButton.tagName === "BUTTON") {
      originalButtonText = submitButton.textContent;

      submitButton.textContent = "Submitting...";
    } else {
      originalButtonValue = submitButton.value;

      submitButton.value = "Submitting...";
    }

    submitButton.disabled = true;
  }

  /* -------------------------------------------------------
     PREPARE CUSTOMER WHATSAPP MESSAGE
  ------------------------------------------------------- */

  const encodedMessage = encodeURIComponent(whatsappMessage);

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Open a blank tab during the customer's submit action.
  // This helps prevent browser pop-up blocking while
  // Formspree processes the enquiry.

  let whatsappWindow = null;

  try {
    whatsappWindow = window.open("about:blank", "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }
  } catch (error) {
    // A fallback link will be provided after submission.
  }

  /* -------------------------------------------------------
     SUBMIT TO FORMSPREE
  ------------------------------------------------------- */

  try {
    const response = await fetch(endpoint, {
      method: "POST",

      body: formData,

      headers: {
        Accept: "application/json",
      },
    });

    // Handle unsuccessful Formspree responses.

    if (!response.ok) {
      let errorMessage =
        "Your enquiry could not be submitted. Please try again.";

      try {
        const result = await response.json();

        if (result.errors && result.errors.length > 0) {
          errorMessage = result.errors.map((error) => error.message).join(" ");
        }
      } catch (error) {
        // Keep the default error message.
      }

      throw new Error(errorMessage);
    }

    /* -----------------------------------------------------
       FORMSPREE SUBMISSION SUCCESSFUL
    ----------------------------------------------------- */

    // The enquiry has been accepted by Formspree.

    form.reset();

    /* -----------------------------------------------------
       OPEN CUSTOMER WHATSAPP
    ----------------------------------------------------- */

    if (whatsappWindow && !whatsappWindow.closed) {
      whatsappWindow.location.href = whatsappURL;

      showFormStatus(
        form,
        "Thank you! Your enquiry has been submitted successfully and recorded. WhatsApp is opening with your enquiry message. Please review the message and press SEND to contact Madelyn Fashion.",
        "success",
      );
    } else {
      // If the browser blocks the WhatsApp tab,
      // provide a direct link for the customer.

      showFormStatus(
        form,
        "Thank you! Your enquiry has been submitted successfully and recorded. Click the link below to open WhatsApp and send your enquiry to Madelyn Fashion.",
        "success",
        whatsappURL,
      );
    }
  } catch (error) {
    /* -----------------------------------------------------
       HANDLE SUBMISSION FAILURE
    ----------------------------------------------------- */

    // Close the unused WhatsApp tab.

    if (whatsappWindow && !whatsappWindow.closed) {
      whatsappWindow.close();
    }

    console.error("Madelyn Fashion Formspree submission error:", error);

    showFormStatus(
      form,
      error.message ||
        "Something went wrong while submitting your enquiry. Please try again.",
      "error",
    );
  } finally {
    /* -----------------------------------------------------
       RESTORE SUBMIT BUTTON
    ----------------------------------------------------- */

    form.dataset.submitting = "false";

    if (submitButton) {
      submitButton.disabled = false;

      if (submitButton.tagName === "BUTTON") {
        submitButton.textContent = originalButtonText;
      } else {
        submitButton.value = originalButtonValue;
      }
    }
  }
}
