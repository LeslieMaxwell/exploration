# Exploration Monorepo

A monorepo for building and deploying multiple apps on Netlify.

## Structure

```
exploration/
├── apps/           # Individual deployable applications
│   └── sample-app/ # Example app (Vite-based)
├── packages/       # Shared libraries and utilities
├── package.json    # Root workspace configuration
└── netlify.toml    # Default Netlify configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 7 or higher (for workspaces support)

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Run dev server for a specific app
npm run dev --workspace=sample-app

# Or navigate to the app directory
cd apps/sample-app
npm run dev
```

### Building

```bash
# Build all apps
npm run build

# Build a specific app
npm run build --workspace=sample-app
```

## Creating a New App

1. Create a new directory in `apps/`:
   ```bash
   mkdir -p apps/my-new-app
   ```

2. Add a `package.json`:
   ```json
   {
     "name": "my-new-app",
     "version": "1.0.0",
     "private": true,
     "scripts": {
       "dev": "vite",
       "build": "vite build"
     }
   }
   ```

3. Add a `netlify.toml` for app-specific configuration:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   ```

4. Run `npm install` from the root to link the workspace.

## Deploying to Netlify

### Option 1: Separate Sites per App

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Create a new site linked to this repo
3. Set **Base directory** to the app folder (e.g., `apps/sample-app`)
4. Netlify will use the app's `netlify.toml` for configuration

### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to an app
cd apps/sample-app

# Initialize Netlify site
netlify init

# Deploy
netlify deploy --prod
```

## Creating Shared Packages

1. Create a package in `packages/`:
   ```bash
   mkdir -p packages/shared-utils
   ```

2. Add a `package.json`:
   ```json
   {
     "name": "@exploration/shared-utils",
     "version": "1.0.0",
     "main": "index.js",
     "type": "module"
   }
   ```

3. Use in apps by adding to their dependencies:
   ```json
   {
     "dependencies": {
       "@exploration/shared-utils": "*"
     }
   }
   ```

## License

MIT
