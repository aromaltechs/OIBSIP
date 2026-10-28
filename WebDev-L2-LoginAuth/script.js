const registerForm = document.getElementById("register-form");
const usernameInput = document.getElementById("register-username");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");
const message = document.getElementById("message");


const loginForm = document.getElementById("login-form");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");




// Display success and error messages
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}


//1. REGISTRATION EVENT LISTENER
// Detect registration form submission
if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

// Clear any previous message
    message.textContent = "";

const username = usernameInput.value.trim();
const email = emailInput.value.trim();
const password = passwordInput.value;


// Check if the account already exists
const users = JSON.parse(localStorage.getItem("users")) || [];

const usernameExists = users.some(user =>
    user.username.toLowerCase() === username.toLowerCase()
);

const emailExists = users.some(user =>
    user.email.toLowerCase() === email.toLowerCase()
);

if (usernameExists) {
    showMessage("Username already exists. Please choose another.", "error");
    return;
}
if (emailExists) {
    showMessage("Email already exists. Please choose another.", "error");
    return;
}


// Password validation check
if (password.length < 8) 
{
    showMessage("Password must be at least 8 characters long.", "error");
    return;
}
if (!/\d/.test(password))
{
    showMessage("Password must contain at least one number.", "error");
    return;
}



// Hash the password
const hashedPassword = await hashPassword(password);

// Create a new user object
const newUser = {
    username: username,
    email: email,
    password: hashedPassword
};

// Add the new account to the users array
users.push(newUser);

// Save the updated users array
localStorage.setItem("users", JSON.stringify(users));

// Display success message
showMessage("Registration successful!", "success");
});
}





//2. LOGIN EVENT LISTENER
if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        message.textContent = "";

        const loginValue = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value;

        // Check if the account already exists
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find the user by username or email
        const user = users.find(user =>
            user.username.toLowerCase() === loginValue.toLowerCase() ||
            user.email.toLowerCase() === loginValue.toLowerCase()
        );

        if (!user) {
            showMessage("Invalid username/email or password.", "error");
            return;
        }

        // Hashes the login password
        const hashedPassword = await hashPassword(password);

        if (user.password !== hashedPassword) {
            showMessage("Invalid username/email or password.", "error");
            return;
        }

        sessionStorage.setItem("loggedInUser", user.username);
        window.location.href = "dashboard.html";
    });
}





//3. PASSWORD HASHING FUNCTION
async function hashPassword(password) {
    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}




// PROTECTED DASHBOARD PAGE
const dashboardPage = document.getElementById("user-name");

if (dashboardPage) {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "index.html";
    } else {
        dashboardPage.textContent = loggedInUser;
    }
}



// LOGOUT FUNCTIONALITY
const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        sessionStorage.removeItem("loggedInUser");

        window.location.href = "index.html";
    });
}