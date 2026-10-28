# Login Authentication System

A simple, browser-based Login Authentication System developed as part of the **Oasis Infobyte Web Development & Designing Internship — Level 2**.

The application allows users to register with a username, email address, and password, log in using their username or email, access a protected dashboard, and log out securely from the current session.

## Features

* **User Registration:** Register using a username, email address, and password.
* **Password Validation:** Require a minimum of 8 characters and at least one number.
* **Duplicate Account Prevention:** Check for existing usernames and email addresses before registration.
* **Login Authentication:** Log in using either a username or an email address.
* **Error Handling:** Display a generic error message when login credentials are invalid.
* **Password Hashing:** Use the Web Crypto API to hash passwords with SHA-256 before storing them.
* **Protected Dashboard:** Redirect unauthenticated users to the login page.
* **Session Management:** Use browser session storage to manage the logged-in state.
* **Logout:** Clear the active login session and redirect to the login page.
* **Responsive User Interface:** Style the application with CSS for a clean and user-friendly experience.
* **Status Messages:** Display success and error messages in different colours.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Web Crypto API (SHA-256)
* Browser Local Storage
* Browser Session Storage

## Project Structure

```text
WebDev-L2-LoginAuth/
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

### Prerequisites

* A modern web browser
* Visual Studio Code (recommended)
* The Live Server extension for Visual Studio Code

### Installation and Setup

1. Clone or download the `OIBSIP` repository.
2. Open the `WebDev-L2-LoginAuth` folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Open `index.html` and launch it using Live Server.
5. Use the registration page to create an account and test the application.

Run the application through a local development server or HTTPS so the Web Crypto API is available.

## How to Test

1. **Register:** Open the registration page and enter a username, email address, and valid password.
2. **Validate Inputs:** Try an invalid password, such as one shorter than 8 characters or without a number.
3. **Check Duplicate Accounts:** Attempt to register again with an existing username or email address.
4. **Log In:** Return to the login page and sign in using your username or email address and password.
5. **Test Invalid Credentials:** Enter incorrect login details and verify that a generic error message appears.
6. **Access the Dashboard:** Log in successfully and verify that the dashboard opens.
7. **Test Dashboard Protection:** Log out and attempt to access the dashboard directly.
8. **Log Out:** Use the logout option and verify that the active session is cleared.

## Security Note

This project is intended for educational purposes and demonstrates basic client-side authentication concepts.

Passwords are hashed using SHA-256 before being stored in browser storage. However, **client-side password hashing and browser storage do not provide production-grade authentication security**. Browser storage can be modified by users, and SHA-256 alone is not a suitable password-storage algorithm for a production authentication system.

A production application should use server-side authentication, secure password hashing algorithms such as Argon2id or bcrypt, appropriate session management, and other necessary security controls.

## Internship Information

* **Organization:** Oasis Infobyte
* **Track:** Web Development & Designing
* **Level:** Level 2
* **Project:** Login Authentication System
* **Developer:** Aromal Suresh

---

Developed as part of the Oasis Infobyte Web Development & Designing Internship.
