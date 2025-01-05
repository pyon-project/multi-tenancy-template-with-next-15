# Next.js Multi-Tenant Application Template

This template demonstrates how to build a multi-tenant Next.js application that can host multiple apps under different subdomains/ports with shared components and styles.

## 🌟 Features

- **Multi-Tenant Architecture**: Run multiple applications from a single codebase
- **Independent Deployments**: Each app can be built and deployed separately
- **Environment Isolation**: Separate environment configurations for each app
- **Shared Components**: Common UI components across all apps
- **TypeScript Support**: Full type safety across the application
- **Modern Stack**:
  - Next.js 15
  - React 19
  - TailwindCSS
  - TypeScript

## 📦 Included Applications

1. **Store** (Port 3001)

   - Article listing and detail views
   - Content management features
   - E-commerce ready structure

2. **Board** (Port 3002)

   - Kanban board interface
   - Task management
   - Drag-and-drop ready

3. **Trade** (Port 3003)
   - Market overview
   - Portfolio management
   - Real-time data ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:

```bash
npm install
```

3. Environment Setup:

This template includes several environment files:

- `.env.local`: Ready-to-use development configuration (included in repo)
- `.env.example`: Template for shared variables
- `.env.store.example`: Template for Store app
- `.env.board.example`: Template for Board app
- `.env.trade.example`: Template for Trade app

For production, create your environment files:

```bash
cp .env.example .env
cp .env.store.example .env.store
cp .env.board.example .env.board
cp .env.trade.example .env.trade
```

For development, you can start immediately using the included `.env.local` file.

### Development

Run each application independently:

```bash
# Store Application (http://localhost:3001)
npm run dev:store

# Board Application (http://localhost:3002)
npm run dev:board

# Trade Application (http://localhost:3003)
npm run dev:trade
```

### Building

Build each application separately:

```bash
# Store Application
npm run build:store

# Board Application
npm run build:board

# Trade Application
npm run build:trade
```

## 🏗 Project Structure

```
src/
├── app/
│   ├── store/              # Store application
│   │   ├── page.tsx
│   │   └── articles/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── board/              # Board application
│   │   └── page.tsx
│   └── trade/              # Trade application
│       ├── page.tsx
│       ├── markets/
│       │   └── page.tsx
│       └── portfolio/
│           └── page.tsx
├── components/             # Shared components
├── styles/                 # Global styles
└── middleware.ts          # Multi-tenant routing logic
```

## 🔧 Configuration

### Environment Variables

Each application has its own environment file:

- `.env`: Shared variables
- `.env.store`: Store-specific variables
- `.env.board`: Board-specific variables
- `.env.trade`: Trade-specific variables

### Port Configuration

Default ports for local development:

- Store: 3001
- Board: 3002
- Trade: 3003

Modify these in `package.json` scripts if needed.

## 🚢 Deployment

### Production Build

1. Build each application:

```bash
npm run build:store
npm run build:board
npm run build:trade
```

2. Start in production:

```bash
# For Store
npm run start:store

# For Board
npm run start:board

# For Trade
npm run start:trade
```

### Deployment Considerations

1. **Subdomain Setup**:

   - Configure DNS for each subdomain
   - Set up SSL certificates

2. **Environment Variables**:

   - Set production URLs
   - Configure API endpoints
   - Set up authentication keys

3. **CI/CD**:
   - Build specific apps based on changes
   - Deploy to appropriate environments

## 📝 Development Guidelines

1. **Adding New Features**:

   - Place app-specific code in respective app directories
   - Share common components in `/components`
   - Use appropriate environment variables

2. **Styling**:

   - Use TailwindCSS for styling
   - Follow the established color scheme
   - Maintain responsive design

3. **Type Safety**:
   - Maintain TypeScript types
   - Use interfaces for data structures
   - Keep shared types in a common location

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for deployment infrastructure
- TailwindCSS for the utility-first CSS framework
