## Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Database
```bash
npm run docker:up
```

### 3. Run Application
```bash
# Start both frontend and backend
npm run dev
```

The application will be available on:
http://localhost:5173/

### 4. Run Tests
```bash
# Run all tests
npm test

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

PosgreSQL runs in Docker container:
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
└── docker-compose.yml # Postgres container
```

## Login

To access the system (visual mock), use the following credentials:

- **Username:** `admin`
- **Password:** `admin123`

## Commands

- `npm run dev` - Start dev servers
- `npm run build` - Build production version
- `npm run docker:up` - Start DB
- `npm run docker:down` - Stop DB
- `npm test` - Run tests
- `npm run test:coverage` - Tests with code coverage
