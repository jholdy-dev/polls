# Projen Usage and Task Guide

## Usage

Projen is a powerful tool for managing multi-package TypeScript projects. Below is a guide on how to use Projen along with descriptions of various tasks that you can perform.

This project is a monorepo with shared schema libraries from Zod and consists of three applications: backend, frontend, and desktop.

## Installation

To install Projen, make sure you have Node.js installed on your machine, then run:

```bash
npm install -g projen
```

## Tasks

````md
### `desktop:dev`

```bash
projen desktop:dev
```
````

This command navigates to the desktop app directory and runs the development server.

### `desktop:test`

```bash
projen desktop:test
```

This command navigates to the desktop app directory and runs tests.

### `backend:test`

```bash
projen backend:test
```

This command navigates to the backend app directory and runs tests.

### `backend:dev`

```bash
projen backend:dev
```

This command navigates to the backend app directory and starts the development server.

### `backend:docker:compose:up`

```bash
projen backend:docker:compose:up
```

This command performs the following steps:

1. Builds dependencies for the backend.
2. Removes cache, `dist`, and `node_modules` directories.
3. Installs dependencies.
4. Starts the backend services using Docker Compose.

### `backend:e2e`

```bash
projen backend:e2e
```

This command navigates to the backend app directory and runs end-to-end tests.

### `frontend:test`

```bash
projen frontend:test
```

This command navigates to the frontend app directory and runs tests.

### `frontend:dev`

```bash
projen frontend:dev
```

This command performs the following steps:

1. Builds dependencies for the backend.
2. Removes cache, `dist`, and `node_modules` directories.
3. Installs dependencies.
4. Starts the frontend services.

```

```

