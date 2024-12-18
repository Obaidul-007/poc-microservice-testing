# poc-microservice-testing

This project demonstrates a **Proof of Concept (PoC)** for testing microservices using **Pact** for contract testing, **Jest** Tests for Routes and **Postman API** Tests for validating the functionality of the microservice. The main objective of this PoC is to ensure that the microservices work correctly, validate API functionality, and verify that the consumer-provider contracts are honored.

## Features

- **Pact Contract Testing**: Ensures that the consumer and provider follow a shared contract.
- **Postman API Tests**: Automated testing of RESTful APIs using Newman and Postman collections.
- **Express**: The microservice API implementation.
- **TypeScript**: The project is built using TypeScript for better type safety.

## Prerequisites

- **Node.js** version 16.x or higher
- **npm** or **yarn**

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/Obaidul-007/poc-microservice-testing.git
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Running the Application
```bash
npm run dev
```
This will start the server at http://localhost:3000.

Pact Mock Server
The Pact mock server runs on a different port (by default 4001 or 4002). You can configure this port in the contract test file (tests/contract.test.ts).

### 4. Running the Tests

API Tests(Postman Collection)
To run the API tests using a Postman collection, use the following command:
```bash
npm run test:api
```

This command uses Newman to execute the API tests defined in the Postman collection (tests/postman-collection.json).

Pact Contract Tests
To run the Pact contract tests, which validate the interactions between the consumer and provider:
```bash
npm run test:contract
```
This command executes the contract tests defined in the tests/contract.test.ts file.

### 5. Project Structure

```bash
poc-microservice-testing/
├── dist/                     # Compiled JavaScript files (after running `npm run build`)
├── logs/                     # Logs directory for Pact mock server
├── node_modules/             # Project dependencies
├── src/                      # Source code for the Express app
│   └── index.ts              # Main Express application
├── tests/                    # All test files
│   ├── userRoutes.test.ts    # Jest tests for validating Express routes
│   ├── contract.test.ts      # Pact contract test file
│   └── postman-collection.json # Postman collection for API testing
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

Conclusion
This project demonstrates how to integrate Pact contract testing, Postman API testing, and route testing with Jest into a microservice testing workflow. The combination ensures the correctness of individual microservices and their interactions with one another.
