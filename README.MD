<!-- // Search Amazon
 https://www.amazon.com/s?k=${title} manga volume {volumeNumber} -->

# Manga Catalog Backend

## Overview

The Manga Catalog Backend is designed to manage and track manga series. It includes functionalities for user management, series tracking, and more.

## Features

- User authentication and management
- CRUD operations for manga series
- Integration with external APIs for manga information

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens for authentication
- Various NPM packages (bcryptjs, cors, dotenv, etc.)

## Configuration

The project uses environment variables for configuration settings including database connections.

## Database

The MongoDB database is used with Mongoose for object data modeling. It includes schemas for `Series` and `User`.

### Series Schema

- Fields include `mangadexId`, `userId`, `title`, `description`, `completionStatus`, `tags`, `author`, `coverUrl`, and `volumes`.

### User Schema

- Fields include `username`, `displayName`, `password`, `email`, `verificationToken`, `isVerified`, `isAdult`, `resetToken`, and `resetTokenExpiry`.

## Controllers

### Series Controller

- Handles requests for searching, adding, deleting, and updating manga series.
- Interacts with external APIs for fetching manga data.

### User Controller

- Manages user authentication, account creation, email verification, and password reset functionality.
- Implements JSON Web Tokens for secure user sessions.

## Utilities

- Shared functions for successful and failed API responses.
- Middleware for verifying logged-in users.
- Email template generators for forgot password and verify email functionalities.

## Code Style

- ESLint and Prettier are configured for code linting and formatting.

## Getting Started

- Instructions for setting up and running the project, including environment setup, database connection, and running the server.
