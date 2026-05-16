☕ Soukoun
A warm and creative girls-only coffee shop where art, friendship, coffee, and cozy moments come together.

✨ Features
🛍️ Browse coffee shop menu (drinks, desserts, etc.)
🛒 Add and remove items from cart
🔢 View cart quantity updates in real-time
💳 Simple checkout flow (UI only or future backend integration)
🎨 Clean and aesthetic UI designed for a cozy coffee shop vibe


⚡ Built with React + TypeScript for performance and scalability

🛠️ Tech Stack
Frontend: React
Language: TypeScript
Styling: CSS / Tailwind 
State Management: Context API (CartContext)

📂 Project Structure
src/
│
├── components/        # Reusable UI components (cards, navbar, etc.)
├── pages/             # Main pages (Home, Cart, Menu)
├── context/           # CartContext for global state
├── assets/            # Images and icons         
└── App.tsx            # Main app entry

🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/girls-coffee-shop.git
2. Install dependencies
npm install
3. Run the project
npm run dev
🧠 How It Works
Products are stored in a menu data file or fetched from a mock API
Users can add items to the cart using a global CartContext
Cart state updates dynamically across all pages
The cart page displays all selected items with quantities and total price
🛒 Cart System Note

If your cart page shows empty items:

Make sure the app is wrapped with CartContext.Provider
Ensure you are using the same context instance in all components
Check that items are properly passed when calling addToCart()
🎯 Future Improvements
User authentication
Backend database (store orders)
Payment integration
Order history per user
Responsive mobile-first redesign
👩‍💻 Author

Created by [Lama Zein]
Girls Coffee Shop Project ☕💖