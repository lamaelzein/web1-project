☕ Soukoun — Girls-Only Coffee Shop Web App

A cozy, full-featured coffee shop web application built with React, TypeScript, and Vite. Designed exclusively as a safe and beautiful digital space for girls.


✨ Features

🔐 Authentication

User registration and login system
Multi-account support — each user has their own isolated data
Protected routes — dashboard only accessible when logged in
Persistent sessions via localStorage

🍽 Menu

Full menu with categories: Drinks, Food, Desserts
Filter tabs to browse by category
Add to cart with quantity controls (− / +)
Toast notifications on item added
Lazy-loaded images for performance

🛒 Cart & Checkout

Real-time cart with quantity management
Coupon code support (apply discount at checkout)
Order summary with subtotal, discount, and total
Points earned preview before paying

⭐ Loyalty Points System

Earn 5 points per $1 spent
Every 500 points = $20 coupon automatically generated
Coupons stored per user and redeemable at checkout
Progress bar showing points until next coupon

📅 Bookings

Browse and book activities (Painting, Pottery, Candle Making, etc.)
Activity dropdown with price and duration info
Booked activities automatically added to cart for payment
Booking management with delete functionality

🎨 Activities

Activity cards with images and icons
Direct booking flow with navigation to bookings page

👤 Profile

View and edit user name
Stats: total points, available coupons, orders, total spent
Full order history with item details and images
Points progress bar

🖼 Gallery

Photo gallery with category filters (Drinks, Activities, Vibes)
Hover overlay with zoom effect
Lightbox with prev/next navigation

📍 About

Coffee shop story and mission
Google Maps embed showing location (Abu Samra, Tripoli, Lebanon)
Opening hours, contact info, and highlights

📊 Dashboard

Personalized greeting based on time of day
Stats cards: cart items, bookings, points, total spent
Recent orders and upcoming bookings preview
Points progress bar with coupon alert


🛠 Tech Stack
TechnologyPurposeReact 18UI frameworkTypeScriptType safetyViteBuild tool & dev serverReact Router v6Client-side routingLucide ReactIcon libraryContext APIGlobal state (cart, auth)localStorageData persistenceGoogle Maps EmbedLocation display

📁 Project Structure
src/
├── assets/          # Images (food, drinks, activities)
├── context/
│   ├── AuthContext.tsx      # Authentication state
│   └── CartContext.tsx      # Cart, points, coupons, orders
├── layouts/
│   ├── MainLayout.tsx       # Sidebar navigation layout
│   └── ProtectedRoute.tsx   # Route guard
├── pages/
│   ├── Login.tsx            # Login & Register
│   ├── Dashboard.tsx        # Home dashboard
│   ├── Menu.tsx             # Food & drinks menu
│   ├── Cart.tsx             # Cart & checkout
│   ├── Bookings.tsx         # Activity bookings
│   ├── Activities.tsx       # Browse activities
│   ├── Profile.tsx          # User profile & history
│   ├── Gallery.tsx          # Photo gallery
│   └── About.tsx            # About & location
└── App.tsx                  # Routes configuration

🚀 Getting Started
Prerequisites

Node.js 18+
npm or yarn

Installation
bash# Clone the repository
git clone https://github.com/lamaelzein/web1-project.git

# Navigate to project folder
cd web1-project

# Install dependencies
npm install

# Start development server
npm run dev
Build for Production
bashnpm run build
npm run preview

👤 Default Flow

Open the app → redirected to Login page
Click Register → create an account
Sign in → enter dashboard
Browse the Menu → add items to cart
Book an Activity → automatically added to cart
Go to Cart → apply coupon if available → Pay now
Earn points → reach 500 → get a $20 coupon
View full history in Profile


📦 Dependencies
json{
  "react": "^18",
  "react-router-dom": "^6",
  "lucide-react": "latest",
  "typescript": "^5",
  "vite": "^8",
  "@vitejs/plugin-react": "latest",
  "tailwindcss": "^4"
}

🙏 Credits
Designed and developed with love for every girl who needs a cozy corner. ☕

