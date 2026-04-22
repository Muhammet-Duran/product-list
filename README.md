# 🛒 E-Commerce Product List

A modern, fully-typed React e-commerce application with advanced filtering, sorting, and cart management.

![Screen Shot 2022-06-13 at 22 52 50](https://user-images.githubusercontent.com/76096635/174019375-a5c065af-a34b-4675-9642-7ec27364c35d.jpg)

---

## ✨ Features

### 🎯 Core Features

- **Product Listing** with real-time filtering
- **Advanced Sorting** (Price, Name, Default)
- **Multi-Filter Support** (Category, Color, Brand)
- **Search Functionality** with instant results
- **Shopping Cart** with localStorage persistence
- **URL State Sync** for shareable links
- **AI Shopping Assistant** with Gemini integration
- **Responsive Design** (Mobile, Tablet, Desktop)

### 🔧 Technical Features

- **TypeScript 6.0** for type safety
- **Context API** for state management
- **Custom Hooks** for reusable logic
- **SCSS Modules** for scoped styling
- **Code Quality Tools** (ESLint, Prettier, Husky)
- **AI Integration** (Google Gemini API)
- **Production-Ready Error Handling** with retry logic
- **Mock API** with real API ready structure

---

## 💻 Tech Stack

### **Core**

- React 18
- TypeScript 6.0
- React Router DOM v6
- Context API

### **Styling**

- SCSS Modules
- Responsive Design
- Mobile-first approach

### **Code Quality**

- ESLint
- Prettier
- Husky (Git hooks)
- lint-staged

### **Data & API**

- Axios
- LocalStorage
- Mock API with 500ms delay
- Google Gemini AI API
- Production-grade retry logic

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 24.x or higher
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Muhammet-Duran/product-list.git

# Navigate to project directory
cd product-list

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Gemini API key to .env
REACT_APP_GEMINI_API_KEY=your_api_key_here

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

### **Development**

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
```

### **Code Quality**

```bash
npm run fix            # Format + Lint + Type check (all-in-one)
npm run format         # Format with Prettier
npm run lint:fix       # Fix ESLint errors
npm run type-check     # Check TypeScript types
```

---

## 📁 Project Structure

```
src/
├── api/                    # API layer (mock & real)
│   ├── fetch.ts           # Axios instance
│   └── productData.ts     # Product API calls
├── components/            # Reusable components
│   ├── SortControl/       # Product sorting dropdown
│   ├── Sidebar/           # Filter sidebar
│   ├── Products/          # Product grid
│   ├── ChatWidget.tsx     # AI chat assistant
│   ├── ChatMessage.tsx    # Chat message component
│   └── ...
├── contexts/              # React Context
│   ├── ProductContext.tsx # Global state management
│   └── ChatContext.tsx    # Chat state management
├── hooks/                 # Custom hooks
│   ├── useCart.ts         # Cart logic
│   ├── useProductFiltering.ts  # Filter & sort logic
│   └── useWindowSize.ts   # Responsive utilities
├── services/              # External services
│   └── geminiService.ts   # AI API integration
├── constants/             # App constants
│   └── filterOptions.ts   # Filter configurations
├── types/                 # TypeScript definitions
│   ├── index.ts           # Core types
│   ├── api.types.ts       # API types
│   ├── hooks.types.ts     # Hook types
│   └── chat.types.ts      # Chat & AI types
├── pages/                 # Page components
│   ├── Home.tsx           # Product listing page
│   └── Cart.tsx           # Shopping cart page
├── Helpers/               # Utility functions
└── styles/                # Global styles
```

---

## 🎨 Key Features Explained

### **1. Product Sorting**

Sort products by:

- Default (API order)
- Price: Low to High
- Price: High to Low
- Name: A-Z
- Name: Z-A

**URL Sync:** Sort state is saved in URL (`?sort=price_asc`)

### **2. Advanced Filtering**

Filter by multiple criteria:

- **Category:** Headset, Notebook, Phone
- **Color:** Black, Blue, Gold, Cream, White, Silver, Ivory, Pink
- **Brand:** Apple, Asus, Huawei, JBL, Samsung, Sony

### **3. Shopping Cart**

- Add/remove products
- Increase/decrease quantity
- Persistent storage (localStorage)
- Real-time total calculation

### **4. Responsive Design**

- Mobile: Optimized layout with overlay filters
- Tablet: Adaptive grid system
- Desktop: Full-featured interface

### **5. AI Shopping Assistant**

**Powered by Google Gemini AI:**

- **Smart Product Recommendations** based on user queries
- **Cart-Aware Responses** considering current cart items
- **Turkish Language Support** for local users
- **Scope-Limited AI** (only shopping-related questions)
- **Production-Grade Error Handling** with automatic fallback
- **Rate Limiting** to prevent API abuse

**Features:**

- Real-time chat interface
- Typing indicators
- Message history
- Floating chat widget
- Mobile-optimized design

**Example Queries:**

- "Telefon öner" (Recommend a phone)
- "Sepetim ne kadar?" (How much is my cart?)
- "En ucuz laptop hangisi?" (Which is the cheapest laptop?)

**Technical Implementation:**

- Multiple Gemini model fallback (2.0-flash-lite → flash-lite-latest → 2.5-flash-lite)
- Exponential backoff retry logic
- User-friendly error messages
- Type-safe API integration

---

## 🔌 API Configuration

### **Current Setup: Mock API + AI Integration**

The app uses a mock API with local data for development and integrates with Google Gemini AI for the shopping assistant.

**Features:**

- ✅ 500ms delay simulation
- ✅ Async/await structure
- ✅ Easy migration to real API
- ✅ Axios configured
- ✅ Google Gemini AI integration
- ✅ Production-grade error handling

### **Environment Variables**

Create a `.env` file in the root directory:

```env
# Base API URL (for future real API)
REACT_APP_BASE_URL=http://localhost:3002

# Google Gemini AI API Key (required for chat assistant)
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here

# Gemini API Base URL
REACT_APP_GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1
```

### **Getting Gemini API Key**

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file
4. Restart the development server

**Free Tier Limits:**

- 1,500 requests/day
- 15 requests/minute
- Completely free (no credit card required)

### **Switching to Real API**

1. Update `REACT_APP_BASE_URL` in `.env`
2. Open `src/api/productData.ts`
3. Uncomment the real API code
4. Restart the app

### **API Endpoints**

**Product API:**

```
GET /products
GET /products?category=phone&color=black&brand=Samsung
```

**AI Chat API:**

```
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

**Response Format:**

```json
{
  "products": [
    {
      "productId": "uuid",
      "title": "Product Name",
      "brand": "Brand",
      "category": "phone",
      "color": "black",
      "price": "100,00",
      "discount": 10,
      "imgUrl": "/path/to/image.png",
      "quantity": 5
    }
  ]
}
```

---

## 🛠️ Code Quality

This project uses automated code quality tools:

### **Pre-commit Hooks**

Every commit automatically runs:

1. Prettier (formatting)
2. ESLint (linting)
3. Only on changed files (fast!)

### **TypeScript**

- Strict mode enabled
- Path aliases configured (`@components`, `@hooks`, etc.)
- Full type coverage

### **Documentation**

See [CODE_QUALITY.md](./CODE_QUALITY.md) for detailed setup and best practices.

---

## 🎯 TypeScript Path Aliases

Clean imports with configured aliases:

```typescript
// Instead of this:
import { Product } from "../../../types";

// Use this:
import { Product } from "@types";
import Button from "@components/Button";
import { useCart } from "@hooks/useCart";
```

**Available aliases:**

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@contexts/*` → `src/contexts/*`
- `@types/*` → `src/types/*`
- `@hooks/*` → `src/hooks/*`
- `@api/*` → `src/api/*`

---

## 📸 Screenshots

### Desktop View

![Desktop](https://user-images.githubusercontent.com/76096635/174019375-a5c065af-a34b-4675-9642-7ec27364c35d.jpg)

### Product Filtering

![Filtering](https://user-images.githubusercontent.com/76096635/174019395-d528310e-c573-4045-92fd-2be61c34b091.jpg)

### Shopping Cart

![Cart](https://user-images.githubusercontent.com/76096635/174019414-c7857d89-39fc-4f38-9efc-b291d5a8dd71.jpg)

### Mobile View

![Mobile](https://user-images.githubusercontent.com/76096635/174019445-c6953bc9-5da2-4fdd-8909-a00569e3f68c.jpg)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note:** Pre-commit hooks will automatically format and lint your code!

---

## 📝 Commit Convention

This project follows conventional commits:

```bash
feat: add new feature
fix: bug fix
chore: maintenance tasks
docs: documentation updates
style: code style changes
refactor: code refactoring
```

---

## 👨‍💻 Authors

- [@Muhammet-Duran](https://github.com/Muhammet-Duran)

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- TypeScript team for type safety
- All contributors and users of this project

---

**⭐ If you like this project, please give it a star!**
