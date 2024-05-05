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
