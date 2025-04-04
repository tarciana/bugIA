// Base URL of the FastAPI backend
const BASE_URL = "http://127.0.0.1:8000";

// Function to register a new user
async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }
        const user = await response.json();
        console.log("User registered:", user);
    } catch (error) {
        console.error("Error registering user:", error.message);
    }
}

// Function to log in a user
async function loginUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }
        const data = await response.json();
        console.log("Login successful:", data);
        return data.access_token; // Return the token for further use
    } catch (error) {
        console.error("Error logging in:", error.message);
    }
}

// Function to create a transaction
async function createTransaction(token, sender_id, receiver_id, amount, description = "") {
    try {
        const response = await fetch(`${BASE_URL}/transactions/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sender_id, receiver_id, amount, description }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }
        const transaction = await response.json();
        console.log("Transaction created:", transaction);
    } catch (error) {
        console.error("Error creating transaction:", error.message);
    }
}

// Example usage
(async () => {
    // Register a new user
    await registerUser("John Doe", "john.doe@example.com", "Password123");

    // Log in the user
    const token = await loginUser("john.doe@example.com", "Password123");

    // Create a transaction (if login was successful)
    if (token) {
        await createTransaction(token, 1, 2, 100.0, "Payment for services");
    }
})();
