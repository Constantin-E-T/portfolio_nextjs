# Personal Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## ✨ Features

- Responsive design
- Dark/Light mode
- Modern animations and transitions
- Type-safe
- Error handling
- Environment-aware configuration
- Development testing routes

## 📁 Project Structure

```
📁 portfolio/
├── 📁 app/                      # Next.js 14 App Router
│   ├── 📁 (auth)/              # Authentication routes (reference)
│   ├── 📁 (test)/              # Testing routes
│   ├── 📁 components/          # React components
│   │   ├── 📁 auth/           # Authentication components
│   │   ├── 📁 layout/         # Layout components
│   │   ├── 📁 sections/       # Page sections
│   │   └── 📁 ui/            # UI components
│   └── [app routes]
├── 📁 lib/                      # Utility functions and configs
│   ├── 📁 auth/               # Auth utilities
│   ├── 📁 config/             # App configuration
│   ├── 📁 constants/          # Constants
│   └── 📁 utils/              # Utility functions
└── 📁 public/                   # Static assets
```

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone [soon]
cd portfolio
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Run the development server:**

```bash
pnpm dev
```

4. **Build for production:**

```bash
pnpm build
pnpm start
```

## 🧪 Testing

The project includes a testing environment accessible in development:

```bash
# Run in test mode
pnpm dev:test

# Build for test environment
pnpm build:test
```

Test routes are available at `/test` in development mode.

## 🎨 Styling

- Uses Tailwind CSS with custom configuration
- CSS variables for theming
- Support for dark/light modes
- Custom animations
- Responsive design

## 🔧 Configuration

### TypeScript

- Strict mode enabled
- Path aliases configured
- Next.js types integrated

### Tailwind

- Custom color scheme
- Animation plugins
- shadcn/ui integration
- Custom keyframes

## 📦 Key Dependencies

```json
{
  "next": "15.1.3",
  "react": "^19.0.0",
  "framer-motion": "^11.15.0",
  "next-themes": "^0.4.4",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

## 🏗️ Project Organization

### Route Groups

- `(auth)` - Authentication routes (reference implementation)
- `(test)` - Testing and development routes

### Components

- `layout/` - Reusable layout components
- `sections/` - Page-specific sections
- `ui/` - Reusable UI components
- `auth/` - Authentication components

### Library

- `config/` - Environment and app configuration
- `constants/` - Shared constants
- `utils/` - Utility functions
- `auth/` - Auth-related utilities

### Core Files

- Error handling (`error.tsx`, `global-error.tsx`, `not-found.tsx`)
- Layout and templating (`layout.tsx`, `template.tsx`)
- Global styles (`globals.css`)

## 📝 License

[N/A]

## 🤝 Contributing

[N/A]

---
Built with ❤️ in Portsmouth, UK
