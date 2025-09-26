# Todo App

## Installation & Setup

### 1. Install Dependencies

Using npm:
```bash
npm install
```

### 2. Start the Development Server

Using npm:
```bash
npm run dev
```

The application will start and be available at `http://localhost:5173`

## Login Credentials

The application uses demo authentication. Use the following credentials to log in:

- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
src/
├── components/           # React components
│   ├── LoginPage.tsx    # Authentication page
│   ├── NotFoundPage.tsx # 404 error page
│   ├── TodoColumn.tsx   # Kanban column component
│   ├── TodoForm.tsx     # Add/edit todo form
│   └── TodoItem.tsx     # Individual todo item
├── store/               # Redux store configuration
│   ├── authSlice.ts     # Authentication state
│   ├── todoSlice.ts     # Todo state management
│   ├── hooks.ts         # Typed Redux hooks
│   └── index.ts         # Store configuration
├── App.tsx              # Main application component
├── App.css              # Application styles
└── main.tsx             # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Building for Production

### 1. Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### 2. Preview Production Build Locally

```bash
npm run preview
```

### 3. Deploy to Production

The built files in the `dist` folder can be deployed to any static hosting service:

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
1. Drag and drop the `dist` folder to [Netlify Deploy](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

#### GitHub Pages
1. Install gh-pages: `npm install -g gh-pages`
2. Build the project: `npm run build`
3. Deploy: `gh-pages -d dist`

## Environment Variables

This project doesn't require environment variables for basic functionality. All configuration is handled within the application code.
