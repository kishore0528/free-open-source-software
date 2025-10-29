
# Project Overview

This directory contains three distinct experiments, each a separate software project.

*   **exp1:** A Vue.js image gallery.
*   **exp2:** A Node.js/Express.js REST API for a blog with authentication.
*   **exp3:** A Node.js/Express.js real-time application, likely a chat server, using WebSockets and Redis.

## Building and Running

### exp1: Vue.js Image Gallery

*   **To run in development mode:**
    ```bash
    cd exp1
    npm install
    npm run serve
    ```
*   **To build for production:**
    ```bash
    cd exp1
    npm install
    npm run build
    ```
*   **To lint the code:**
    ```bash
    cd exp1
    npm install
    npm run lint
    ```

### exp2: Blog API

*   **To run the server:**
    ```bash
    cd exp2
    npm install
    node app.js
    ```

### exp3: Real-time Application

*   **To run the server:**
    ```bash
    cd exp3/server
    npm install
    node server.js
    ```

## Development Conventions

*   All three projects use Node.js and `npm` for package management.
*   `exp1` uses Vue.js and the Vue CLI, with standard linting configurations.
*   `exp2` and `exp3` use Express.js.
*   The projects are not set up with any specific testing frameworks, other than the default Vue CLI linting.
