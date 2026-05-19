Project Report — Soukoun Coffee Shop Web Application

Course: Web Development 1
Student: Lama El Zein
Semester: Spring 2026
Technology: React · TypeScript · Vite

1. Project Overview
Soukoun is a full-stack-like single-page web application simulating a girls-only coffee shop experience. The application covers the complete user journey — from account registration and login, through browsing a menu and booking activities, to checkout with a loyalty points system.
The name "Soukoun" (سكون) means calm or tranquility in Arabic, reflecting the peaceful atmosphere the café aims to provide.

2. Objectives

Build a complete multi-page React application using TypeScript
Implement user authentication with multi-account data isolation
Create a shopping cart with real-time state management
Design a loyalty rewards system with automated coupon generation
Deliver a polished, consistent UI without external CSS frameworks


3. Technical Stack
TechnologyVersionRoleReact18Component-based UI frameworkTypeScript5Static typing and type safetyVite8Development server and bundlerReact Router6Client-side routing and navigationLucide ReactLatestSVG icon libraryContext APIBuilt-inGlobal state managementlocalStorageBrowser APIData persistence across sessions

4. Application Architecture
4.1 Routing Structure
The application uses React Router v6 with a protected route pattern:
/login                    → Public (Login & Register)
/dashboard                → Protected (requires token)
/dashboard/menu           → Menu with category filters
/dashboard/cart           → Cart and checkout
/dashboard/bookings       → Activity reservations
/dashboard/activities     → Browse activities
/dashboard/profile        → User profile and history
/dashboard/gallery        → Photo gallery
/dashboard/about          → About and location
4.2 State Management
Two React Contexts manage global state:
AuthContext — handles login status and logout functionality.
CartContext — manages cart items, points, coupons, and order history. All data is persisted to localStorage under a user-specific key (data_<email>), ensuring complete data isolation between accounts.
4.3 Data Persistence
All data is stored in localStorage using a per-user key system:
users                     → Array of all registered accounts
user                      → Currently logged-in user object
token                     → Session token ("logged-in")
currentUserEmail          → Active user identifier
data_<email>              → User-specific: cart, points, coupons, history
bookings                  → User's activity bookings

5. Key Features Implemented
5.1 Authentication System
The registration system stores users in a users[] array in localStorage, preventing duplicate emails. On login, the system loads the matching user's personal data into the CartContext state, ensuring each user sees only their own orders, points, and coupons.
5.2 Menu with Filtering
The menu contains 14 items across three categories (Drinks, Food, Desserts). Filter tabs dynamically show/hide items without page reload. Each item card transforms into a quantity controller (− qty +) after the first add, replacing the "Add to cart" button. A toast notification appears in the top-right corner when an item is added.
5.3 Loyalty Points System
The points system works as follows:

5 points earned per $1 spent (calculated on final total after discounts)
Every 500 points crossed triggers automatic generation of a $20 coupon
Coupons are stored with a unique code, creation date, and used/unused status
Coupons are displayed in the cart and profile pages and can be applied at checkout

5.4 Activity Bookings
Users can browse 6 activities (Painting, Pottery, Candle Making, Embroidery, Photo Walk, Tea Ceremony). Each activity can be booked via a form with a dropdown selector showing price and duration. Upon confirmation, the activity is automatically added to the cart as a payable item, linking the booking and payment flows.
5.5 Profile Page
The profile page shows:

Editable name fields (changes persist to localStorage)
Stats: total points, available coupons, order count, total spent
Points progress bar toward next coupon
Complete order history with item images, quantities, prices, and points earned


6. UI Design Decisions
The application uses a consistent warm color palette throughout:
ColorHexUsageDark Brown#2d1a1aSidebar, buttons, hero sectionsRosé#c97b63Accents, prices, active statesCream#fdf6f4Page backgroundsLight Pink#f0d8d2Borders, dividersMuted Tan#b08070Secondary text, labels
All icons use the Lucide React library for visual consistency. No emoji are used in the interface. Inline styles are used throughout to avoid CSS file complexity and keep components self-contained.

7. Challenges and Solutions
ChallengeSolutionMulti-account data isolationPer-user localStorage keys (data_<email>) loaded on loginCart state shared across pagesReact Context with useEffect persistenceActivity booking linked to paymentaddToCart() called on booking confirmationImage performance lagloading="lazy" on all images + image compressionIcons not renderingReplaced Tabler Icons CDN with Lucide React npm package

8. Pages Summary
PageDescriptionLoginRegister and sign in with email/passwordDashboardOverview with stats, recent orders, bookings, points progressMenu14 items with category filters and cart controlsCartCart management, coupon input, checkout, order historyBookingsActivity reservation form with dropdown selectorActivitiesActivity cards with images, prices, and Book Now buttonProfileUser info editor, stats, coupons, full order historyGalleryPhoto grid with filters, hover effects, and lightboxAboutStory, opening hours, contact info, Google Maps embed

9. How to Run
bash# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

10. Conclusion
The Soukoun project successfully demonstrates a complete React + TypeScript single-page application with real-world features including authentication, e-commerce cart logic, a loyalty rewards engine, and a clean consistent design system — all without a backend or external database, using localStorage as the persistence layer.
The project covers all core Web Development 1 concepts: component architecture, state management, routing, TypeScript typing, event handling, and responsive layout design.

Report prepared for Web Development 1 course submission.