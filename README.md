
![Screen Shot 2022-06-13 at 22 52 50](https://user-images.githubusercontent.com/76096635/174019375-a5c065af-a34b-4675-9642-7ec27364c35d.jpg)
<br/>
<br/>
![Screen Shot 2022-06-13 at 22 53 29](https://user-images.githubusercontent.com/76096635/174019395-d528310e-c573-4045-92fd-2be61c34b091.jpg)
<br/>
<br/>
![Screen Shot 2022-06-13 at 22 54 31](https://user-images.githubusercontent.com/76096635/174019414-c7857d89-39fc-4f38-9efc-b291d5a8dd71.jpg)
<br/>
<br/>
![Screen Shot 2022-06-13 at 22 55 03](https://user-images.githubusercontent.com/76096635/174019445-c6953bc9-5da2-4fdd-8909-a00569e3f68c.jpg)
<br/>
<br/>
![Screen Shot 2022-06-13 at 22 55 12](https://user-images.githubusercontent.com/76096635/174019459-6333bf24-0c27-4f67-90da-98170c18e17e.jpg)
<br/>
<br/>

## 💻 Tech Stack

- React.js
- Axios
- Sass (SCSS Modules)
- React Router DOM
- LocalStorage
- Context API

## ✨ Features

- Product listing with filtering (category, color, brand)
- Search functionality
- Shopping cart with localStorage persistence
- Responsive design
- Mock API with 500ms delay simulation
- Clear all filters button

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Muhammet-Duran/product-list.git

# Navigate to project directory
cd product-list

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── api/              # API layer (mock & real)
├── components/       # Reusable components
├── contexts/         # React Context (ProductContext)
├── data/             # Mock product data
├── Helpers/          # Utility functions
├── hooks/            # Custom hooks
├── pages/            # Page components
└── styles/           # Global styles
```

## 🔌 API Configuration

### Current Setup: Mock API
The app currently uses a **mock API** with local data.

**Features:**
- ✅ 500ms API delay simulation
- ✅ Async/await structure
- ✅ Easy migration to real API
- ✅ Axios ready

### Switching to Real API

1. Create `.env` file and add your API URL:
```env
REACT_APP_BASE_URL=https://your-api.com/api
```

2. Open `src/api/productData.js`

3. Uncomment the real API code at the bottom of the file

4. Restart the application

### API Endpoint Format

- **All products:** `GET /products`
- **Filtered products:** `GET /products?category=phone&color=black&brand=Samsung`

**Response format:**
```json
{
  "products": [
    {
      "productId": "uuid",
      "title": "Product Name",
      "brand": "Brand",
      "category": "category",
      "color": "color",
      "price": "100,00",
      "discount": 10,
      "imgUrl": "/path/to/image.png",
      "quantity": 5
    }
  ]
}
```

## 📝 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 👨‍💻 Authors

- [@Muhammet-Duran](https://github.com/Muhammet-Duran)

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

