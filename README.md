# ContactBook

ContactBook is a project that helps manage and organize contacts. This repository uses a monorepo structure with workspaces for the API and frontend packages.

## Getting Started

To get started with the ContactBook project, you'll need to have Node.js and Yarn installed on your machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js version `22.11.0` installed.
- **Yarn**: Ensure you have Yarn version `4.1.0` installed.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/contactbook.git
   cd contactbook
   ```

### Backend:

The packages/api directory contains the backend logic for the ContactBook application. This includes the server-side code, database interactions, and API routes.

Key Components:

TRPC Router: Defines the API endpoints and their respective handlers.
Prisma Client: Used for interacting with the PostgreSQL database.

Technologies Used:
TypeScript: Ensures type safety and better development experience.
TRPC: Provides a type-safe RPC framework for building the API.
Prisma: An ORM for database access and schema management.
Node.js: The runtime environment for executing the backend code.

Scripts and Commands:
yarn watch: Compiles your TypeScript project and watches for changes, recompiling as needed.
yarn dev: Starts the development server.
yarn build: Builds the production version of the API.
yarn start: Starts the production server.
yarn migrate: Runs database migrations.
yarn seed: Seeds the database with initial data.

To run config database and run server: 

  Apply Pending Migrations
  To apply all pending migrations to the database, use the following command:
  ```
  yarn prisma migrate deploy // To apply all pending migrations to the database
  ```

  Generate Prisma Client
  To generate the Prisma Client, use the following command:
  ```
    yarn prisma generate
  ```
  Create a new migration:
  ```
    yarn prisma migrate dev --name <migration_name>
  ```

  To run the server:
  ```
    yarn watch 
    yarn dev
  ```


### Frontend:

The packages/front directory contains the frontend code for the ContactBook application. This includes the user interface, state management, and client-side logic.

Key Components:
React Components: UI components to display and interact with the application.
Forms and Validation: Handles user inputs and form validations.
API Integration: Implemented trpc for api calls
Tailwind CSS: A utility-first CSS framework for styling the application.

yarn dev: Starts the development server.
yarn build: Builds the production version of the frontend.
yarn start: Serves the production build.

To run frontend:
```
  yarn dev
```