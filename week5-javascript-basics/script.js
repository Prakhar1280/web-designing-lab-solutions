// Wait for DOM content to load fully
document.addEventListener("DOMContentLoaded", () => {

    // 1. DYNAMIC TIME-BASED GREETING
    const greetingElement = document.getElementById("greeting");
    const currentHour = new Date().getHours();
    let greetingText = "Welcome to My Portfolio";

    if (currentHour < 12) {
        greetingText = "Good Morning! Welcome to My Portfolio ☀️";
    } else if (currentHour < 18) {
        greetingText = "Good Afternoon! Welcome to My Portfolio 🌤️";
    } else {
        greetingText = "Good Evening! Welcome to My Portfolio 🌙";
    }
    
    greetingElement.textContent = greetingText;

    // 2. DARK / LIGHT THEME TOGGLE
    const themeBtn = document.getElementById("theme-toggle");

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "☀️ Light Mode";
        } else {
            themeBtn.textContent = "🌙 Dark Mode";
        }
    });

    // 3. FORM VALIDATION & INTERACTIVE FEEDBACK
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const statusBox = document.getElementById("form-status");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload on submit
        
        let isValid = true;

        // Clear previous errors
        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("message-error").textContent = "";

        // Validate Name
        if (nameInput.value.trim() === "") {
            document.getElementById("name-error").textContent = "Name is required.";
            isValid = false;
        }

        // Validate Email (Regex pattern)
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (emailInput.value.trim() === "") {
            document.getElementById("email-error").textContent = "Email is required.";
            isValid = false;
        } else if (!emailInput.value.match(emailPattern)) {
            document.getElementById("email-error").textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === "") {
            document.getElementById("message-error").textContent = "Message field cannot be empty.";
            isValid = false;
        }

        // Display Success Status
        if (isValid) {
            statusBox.textContent = `Thank you, ${nameInput.value}! Your message has been sent successfully.`;
            statusBox.className = "status-box success";
            form.reset();
        }
    });
});