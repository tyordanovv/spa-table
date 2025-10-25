# SPA + Quarkus Row Manager

A simple SPA frontend with a Quarkus backend demonstrating authenticated row management with pagination.

## Tech Stack:
- Frontend: React + Redux + TypeScript
- Backend: Quarkus, Java, JPA (Panache), JWT authentication
- Testing: JUnit 5, Mockito, AssertJ

## Features
- Login with JWT authentication
- Fetch paginated rows (offset + limit) with hasMore
- Create new rows via REST API
- Immutable DTOs using Java records
- Validation with @NotBlank and @Size

## Getting Started
Backend
```
./mvnw compile quarkus:dev
```

## API endpoints:
- **POST** /api/auth/login → get JWT
- **GET** /api/rows → fetch rows
- **POST** /api/rows → create row

Frontend
```
cd fe
npm install
npm run start
```

Runs at http://localhost:3000 and communicates with the backend which is at http://localhost:8080.

Testing
Backend: 
```
./mvnw test
```
Frontend: 
```
npm run test
```
