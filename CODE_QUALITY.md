# 🎯 Code Quality & TypeScript Guide

This project uses **TypeScript**, **ESLint**, **Prettier**, **Husky**, and **lint-staged** for code quality and type safety.

---

## 📦 Tools Overview

- **TypeScript 6.0**: Type safety and better developer experience
- **ESLint**: Code linting and error detection
- **Prettier**: Code formatting
- **Husky**: Git hooks management
- **lint-staged**: Run linters on staged files only

---

## 🚀 Quick Commands

```bash
# All-in-one: Format + Lint + Type Check
npm run fix

# Individual commands
npm run format        # Format all files with Prettier
npm run lint:fix      # Auto-fix ESLint errors
npm run type-check    # Check TypeScript types
```

---

## 🔧 How It Works

### **Pre-commit Hook (Automatic)**

When you commit code, Husky automatically runs:

1. **Prettier** - Formats code
2. **ESLint** - Checks and fixes issues
3. **Only on staged files** - Fast and efficient

**Example:**

```bash
git add src/components/Button.tsx
git commit -m "feat: add button component"

# Husky runs automatically:
# ✓ Prettier formatting...
# ✓ ESLint checking...
# ✓ Commit successful!
```

**Note:** Push does NOT trigger any checks. Only commit does!

---

## 📁 TypeScript Structure

### **Type Definitions**

All types are centralized in `src/types/`:

```
src/types/
├── index.ts           # Core types (Product, Cart, Filter, Context)
├── api.types.ts       # API-specific types
└── hooks.types.ts     # Custom hooks types
```

### **Path Aliases**

Clean imports with configured aliases:

```typescript
import { Product } from "@types";
import Button from "@components/Button";
import { useCart } from "@hooks/useCart";
```

Available aliases:

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@contexts/*` → `src/contexts/*`
- `@types/*` → `src/types/*`
- `@hooks/*` → `src/hooks/*`
- `@api/*` → `src/api/*`

### **TypeScript Config Highlights**

- ✅ Strict mode enabled
- ✅ Modern ES2020 target
- ✅ Bundler module resolution (TS 6.0)
- ✅ Path aliases configured
- ✅ React JSX support

---

## ⚙️ Configuration Files

### **.eslintrc.json**

- TypeScript support
- React hooks rules (from react-app)
- Import ordering
- No console warnings

### **.prettierrc**

- 2 spaces indentation
- Semicolons: yes
- Double quotes
- Trailing commas: ES5
- Line width: 80 characters

### **tsconfig.json**

- Strict type checking
- Modern module resolution
- Path aliases
- React JSX transform

### **lint-staged** (in package.json)

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,scss}": ["prettier --write"]
}
```

---

## 🛠️ IDE Setup (VS Code)

### **Required Extensions**

1. ESLint
2. Prettier - Code formatter

### **Settings (.vscode/settings.json)**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 💡 TypeScript Best Practices

### **1. Explicit Return Types**

```typescript
const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  return response.json();
};
```

### **2. Proper Event Typing**

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setValue(e.target.value);
};
```

### **3. Context Type Safety**

```typescript
const useProductContext = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Must be used within ProductContextProvider");
  }
  return context;
};
```

### **4. Union Types for Strict Values**

```typescript
type SortOrder =
  | "default"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";
```

---

## 📊 Code Quality Rules

### **ESLint Rules**

- ✅ No unused variables (error)
- ⚠️ No console.log (warning)
- ✅ React hooks rules (error)
- ⚠️ Exhaustive deps (warning)
- ⚠️ Import order (warning)

### **Prettier Rules**

- Semicolons: Required
- Quotes: Double
- Tab width: 2 spaces
- Line width: 80 characters
- Trailing commas: ES5

---

## 🐛 Troubleshooting

### **Problem: ESLint plugin conflicts**

```bash
# Solution: Remove duplicate plugins from .eslintrc.json
# react-app already includes react-hooks
```

### **Problem: TypeScript deprecated warnings**

```bash
# Solution: Update tsconfig.json
# Use "moduleResolution": "bundler" instead of "node"
```

### **Problem: Commit is slow**

```bash
# Solution: lint-staged only checks changed files
# Check .eslintignore if still slow
```

### **Problem: Husky not working**

```bash
# Solution: Reinstall hooks
npm run prepare
```

---

## 🚫 Emergency Bypass (Use Sparingly!)

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"
```

⚠️ **Warning:** Only use in emergencies. Your code won't be checked!

---

## 🔄 Updating Rules

### **Relax a rule:**

```json
// .eslintrc.json
{
  "rules": {
    "no-console": "off" // Changed from "warn"
  }
}
```

### **Add a new rule:**

```json
{
  "rules": {
    "no-debugger": "error"
  }
}
```

---

## 📚 Learning Resources

### **TypeScript**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### **Linting**

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

### **Git Hooks**

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)

---

## ✅ Setup Checklist

- [x] TypeScript 6.0 installed and configured
- [x] ESLint installed and configured
- [x] Prettier installed and configured
- [x] Husky pre-commit hook active
- [x] lint-staged configured
- [x] Path aliases configured
- [x] Type definitions centralized
- [x] Scripts added to package.json

**Status:** ✅ Fully Configured & Production Ready!

---

## 🎯 Benefits

- ✅ **Type Safety**: Catch errors at compile time
- ✅ **Code Quality**: Consistent formatting and linting
- ✅ **Better IDE Support**: Autocomplete and IntelliSense
- ✅ **Team Collaboration**: Clear code contracts
- ✅ **Automated Checks**: Pre-commit hooks prevent bad code
- ✅ **Scalability**: Easier to maintain as project grows
