## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Database
```bash
npm run docker:up
```

### 3. Run Application
```bash
# Start both frontend and backend
npm run dev

# Or separately:
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:3000
```

### 4. Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with code coverage
npm run test:coverage
```

## Testing

The project is covered with minimal tests for core functionality:

- **Redux Slices**: testing async actions and state management
- **Components**: testing user interactions
- **Types**: shared types validation

### Test Structure
```
src/
├── store/__tests__/
│   ├── todoSlice.test.ts     # CRUD operations for todos
│   └── authSlice.test.ts     # Authentication
├── components/__tests__/
│   ├── TodoForm.test.tsx     # Add/edit form
│   └── TodoItem.test.tsx     # Todo item component
└── shared/__tests__/
    └── types.test.ts         # Shared types validation
```

## API Endpoints

- `GET /api/todos` - Get all tasks
- `POST /api/todos` - Create task
- `PUT /api/todos/:id` - Update task
- `DELETE /api/todos/:id` - Delete task

## Database

MySQL runs in Docker container:
- **Host**: localhost:3306
- **Database**: todoapp
- **User**: todouser
- **Password**: todopassword

## Project Structure

```
├── shared/              # Shared types
├── backend/            # NestJS API
│   └── src/
│       ├── todo/       # Todo module
│       └── main.ts     # Entry point
├── src/               # React frontend
│   ├── components/    # Components
│   ├── pages/         # Pages
│   └── store/         # Redux store
└── docker-compose.yml # MySQL container
```

## Login

Use any credentials to access the system (visual mock).

## Commands

- `npm run dev` - Start dev servers
- `npm run build` - Build production version
- `npm run docker:up` - Start MySQL
- `npm run docker:down` - Stop MySQL
- `npm test` - Run tests
- `npm run test:watch` - Tests in watch mode
- `npm run test:coverage` - Tests with code coverage
