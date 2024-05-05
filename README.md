**Production Dependencies:**

* **bcrypt (v^5.1.1 or later):**
  - **Purpose:** A powerful password hashing library for Node.js.
  - **Installation:**
    ```bash
    npm install bcrypt
    ```
    or
    ```bash
    yarn add bcrypt
    ```
* **cors (v^2.8.5 or later):**
  - **Purpose:** Enables Cross-Origin Resource Sharing (CORS).
  - **Installation:**
    ```bash
    npm install cors
    ```
    or
    ```bash
    yarn add cors
    ```
* **dotenv (v^16.4.5 or later):**
  - **Purpose:** Loads environment variables from a `.env` file.
  - **Installation:**
    ```bash
    npm install dotenv
    ```
    or
    ```bash
    yarn add dotenv
    ```
  - **Usage:** Create a `.env` file in your project root and store your variables there (e.g., `DB_HOST=localhost`). Require `dotenv` before accessing these variables:
    ```javascript
    require('dotenv').config();
    const dbHost = process.env.DB_HOST;
    ```
* **express (v^4.19.2 or later):**
  - **Purpose:** A popular web framework for building web applications and APIs in Node.js.
  - **Installation:**
    ```bash
    npm install express
    ```
    or
    ```bash
    yarn add express
    ```
* **jsonwebtoken (v^9.0.2 or later):**
  - **Purpose:** A library for creating and verifying JSON Web Tokens (JWTs).
  - **Installation:**
    ```bash
    npm install jsonwebtoken
    ```
    or
    ```bash
    yarn add jsonwebtoken
    ```
* **mysql2 (v^3.9.7 or later):**
  - **Purpose:** Promise-based Node.js driver for the MySQL database.
  - **Installation:**
    ```bash
    npm install mysql2
    ```
    or
    ```bash
    yarn add mysql2
    ```

**Development Dependencies:**

* **@types/supertest (v^6.0.2 or later):**
  - **Purpose:** Type definitions for the Supertest library (used for testing).
  - **Installation:**
    ```bash
    npm install --save-dev @types/supertest
    ```
    or
    ```bash
    yarn add --dev @types/supertest
    ```
  - **Note:** This is a TypeScript-specific dependency for type safety during testing.
* **jest (v^29.7.0 or later):**
  - **Purpose:** A popular testing framework for JavaScript applications.
  - **Installation:**
    ```bash
    npm install --save-dev jest
    ```
    or
    ```bash
    yarn add --dev jest
    ```

## Running a Node.js Application

Here's a guide on how to run a the application:

**Prerequisites:**

- **Node.js and npm (or yarn):** You'll need Node.js installed on your system. It comes bundled with npm, the Node Package Manager. Alternatively, you can use yarn as a package manager. Download and install Node.js from the official website: [https://nodejs.org/en](https://nodejs.org/en)

**Steps:**

1. **Clone the repository:**
   - Create a new directory for your project.
   - Clone the repo using `git clone ...`  in your terminal within the project directory.

2. **Install Dependencies:**
   - Install the libraries the application needs. These are listed in the `dependencies` section of your `package.json` file.
   - Install them using npm or yarn:
     ```bash
     npm install
     yarn
     ```

3. **Run the Application:**
   - Open your terminal and navigate to your project directory.
   - Locate the main entry point of the application (a file named `app.js`).
   - Run the application using the `node` command followed by the filename of your main entry point:
     ```bash
     node app.js  # Example: Assuming your main file is app.js
     ```
   - This will start your Node.js application, and it will typically run in the background, listening for requests on a specific port (usually port 3000 by default).

4. **Access the Application (Optional):**
   - the application creates a web server, you can access it in a web browser by visiting `http://localhost:<port>`, where `<port>` is the port your application is listening on (e.g., `http://localhost:3000`).
