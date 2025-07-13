# Finance App API

Welcome to the **Finance App API** – your backend solution for managing and tracking financial data. This project is my first major backend endeavor, designed to power a modern finance dashboard with robust, scalable, and secure endpoints.

## 🚀 Overview

The Finance App API provides a solid foundation for building finance-related applications. It handles user authentication, transaction management, and reporting, making it easy to integrate with any frontend dashboard.

IMPORTANT: the first version of this project has been coded in Node 16.20, so Prettier and ESLint configs follows this version. In case you need, here are the commands to install the specific versions.

IMPORTANT!: this project will be updated as I learn more of the techs.


```bash
npm i eslint@8.46.0
npm i husky@8.0.3
npm i lint-staged@13.2.3

```

## Architecture

- This project is going to be built using Single Responsibility Principle and Repository Pattern.

## 🛠️ Technologies Used

- **Node.js** – Fast, scalable server-side JavaScript runtime
- **Prettier** – Code formatter for consistent style
- **Husky** – Git hooks for code quality enforcement
- **Docker** *(coming soon)* – Containerization for easy deployment
- **PostgreSQL** *(ongoing)* – Reliable relational database

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Installation

```bash
git clone https://github.com/yourusername/finance-app-api.git
cd finance-app-api
npm install
```

### Running the API

```bash
npm run dev
```

### Config the dotenv
Create a `.env` file in the root directory and add your environment variables. Here’s an example:

```plaintext
POSTGRES_USER=<your_postgres_user>
POSTGRES_PASSWORD=<your_postgres_password>
POSTGRES_HOST=<your_postgres_host>
POSTGRES_PORT=<your_postgres_port>
POSTGRES_DB=<your_postgres_db>
```

The API will be available at `http://localhost:3000`.

## 📌 Considerations

- This project is a work in progress; Docker and PostgreSQL integration are on the roadmap.
- Contributions and feedback are welcome!
- For any issues, please open an issue on the repository.

---

