# Project Report — Soukoun Coffee Shop Web Application

**Course:** Web Development 1  
**Student:** Lama El Zein  
**Semester:** Spring 2026  
**Technology:** React · TypeScript · Vite  

---

# 1. Project Overview

Soukoun is a full-stack-like single-page web application simulating a girls-only coffee shop experience. The application covers the complete user journey — from account registration and login, through browsing a menu and booking activities, to checkout with a loyalty points system.

The name **“Soukoun” (سكون)** means calm or tranquility in Arabic, reflecting the peaceful atmosphere the café aims to provide.

The project was developed using React and TypeScript with a focus on component architecture, reusable UI elements, client-side routing, and persistent user data management using localStorage.

---

# 2. Objectives

- Build a complete multi-page React application using TypeScript
- Implement user authentication with multi-account data isolation
- Create a shopping cart with real-time state management
- Design a loyalty rewards system with automated coupon generation
- Implement activity booking connected to checkout
- Deliver a polished and consistent UI without external CSS frameworks
- Practice React Context API and React Router
- Apply responsive layout and reusable component principles

---

# 3. Technical Stack

| Technology | Version | Role |
|---|---|---|
| React | 18 | Component-based UI framework |
| TypeScript | 5 | Static typing and type safety |
| Vite | 8 | Development server and bundler |
| React Router | 6 | Client-side routing and navigation |
| Lucide React | Latest | SVG icon library |
| Context API | Built-in | Global state management |
| localStorage | Browser API | Persistent client-side data |

---

# 4. Project Development Process (Technical Steps)

## 4.1 Project Initialization

The project was created using Vite with React and TypeScript.

### Commands Used

```bash
npm create vite@latest
```

Selected options:

- Framework: React
- Variant: TypeScript

Then dependencies were installed:

```bash
npm install
```

Additional libraries:

```bash
npm install react-router-dom
npm install lucide-react
```

Development server:

```bash
npm run dev
```

---

## 4.2 Folder Structure

The application was organized into reusable folders:

```text
src/
 ├── api/
 ├── pages/
 ├── context/
 ├── data/
 ├── types/
 ├── assets/
 ├── services/
 └── main.tsx
```

### Purpose of Each Folder

| Folder | Purpose |
|---|---|
| api |  axios instance |
| pages | Main application pages |
| context | Global state management |
| layout |  Main Layout |
| assets | Images and icons |
| services |  protection |

---

# 5. Application Architecture

## 5.1 Routing Structure

The application uses React Router v6 with protected routes.

### Public Route

```text
/login
```

### Protected Routes

```text
/dashboard
/dashboard/menu
/dashboard/cart
/dashboard/bookings
/dashboard/activities
/dashboard/profile
/dashboard/gallery
/dashboard/about
```

A token-based check was implemented using localStorage. Users without a valid token are redirected to the login page.

---

## 5.2 State Management

Two React Contexts were implemented:

### AuthContext

Responsible for:

- Login
- Logout
- Authentication state
- Route protection

### CartContext

Responsible for:

- Cart items
- Loyalty points
- Coupons
- Order history
- Checkout system

The Context API was chosen to avoid prop drilling and provide global access across pages.

---

## 5.3 Data Persistence

All application data is stored in localStorage.

### Storage Structure

| Key | Description |
|---|---|
| users | All registered accounts |
| user | Current logged-in user |
| token | Authentication token |
| currentUserEmail | Active user identifier |
| data_ | User-specific cart and rewards data |
| bookings | User activity reservations |

---

## 5.4 Multi-Account Isolation

A per-user localStorage key system was implemented.

Example:

```text
data_lama@gmail.com
data_user2@gmail.com
```

When a user logs in, the application loads only that user's saved data.

This prevents data mixing between accounts and simulates backend-style separation.

---

# 6. Main Features

## 6.1 Authentication System

The registration page stores users in a users[] array while preventing duplicate email registration.

The login process:

1. User enters email and password
2. Credentials are validated
3. Token is stored in localStorage
4. User data loads into Context
5. User is redirected to dashboard

Logout removes the token and redirects back to login.

---

## 6.2 Menu System

The menu contains 14 products divided into categories:

- Drinks
- Food
- Desserts

### Features

- Category filtering
- Real-time quantity updates
- Add/remove item controls
- Toast notifications
- Dynamic cart calculations

### Quantity Controller Logic

After adding an item:

```text
Add to Cart → − qty +
```

This improves usability and reduces repeated clicks.

---

## 6.3 Shopping Cart System

The cart page calculates:

- Subtotal
- Discounts
- Coupon deductions
- Final total

Users can:

- Increase/decrease quantity
- Remove items
- Apply coupons
- Checkout orders

After checkout:

- Order moves to history
- Cart clears automatically
- Points are generated

---

## 6.4 Loyalty Rewards System

### Points Formula

```text
Points Earned = 5 × Final Total
```

### Coupon Generation

Every time the user crosses 500 points:

```text
500 points → Generate $20 coupon
```

Coupons contain:

- Unique code
- Creation date
- Used/unused status

Coupons can be applied during checkout.

---

## 6.5 Activity Booking System

Users can book activities including:

- Painting
- Pottery
- Candle Making
- Embroidery
- Photo Walk
- Tea Ceremony

### Booking Workflow

1. User selects activity
2. Booking form opens
3. Date and details submitted
4. Activity automatically added to cart
5. User completes payment in checkout

This links reservations directly to the e-commerce flow.

---

## 6.6 Profile Page

The profile page contains:

- Editable user information
- Loyalty statistics
- Progress bar
- Coupon list
- Full order history

### Stored Statistics

- Total points
- Available coupons
- Total spent
- Number of orders

Profile updates persist immediately using localStorage.

---

## 6.7 Gallery Page

The gallery page displays café photos using:

- Filter categories
- Hover animations
- Responsive image grid
- Lightbox preview

All images use:

```html
loading="lazy"
```

to improve performance.

---

## 6.8 About Page

The About page includes:

- Café story
- Opening hours
- Contact information
- Google Maps embed
- Brand identity explanation

---

# 7. UI and Design Decisions

The interface was designed using a warm feminine color palette.

| Color | Hex | Usage |
|---|---|---|
| Dark Brown | #2d1a1a | Sidebar, buttons |
| Rosé | #c97b63 | Accent color |
| Cream | #fdf6f4 | Backgrounds |
| Light Pink | #f0d8d2 | Borders |
| Muted Tan | #b08070 | Secondary text |

### Design Principles

- Consistent spacing
- Rounded corners
- Minimalist layout
- Responsive sections
- Reusable cards and buttons

Lucide React icons were used for consistency across all pages.

No external CSS frameworks (such as Tailwind or Bootstrap) were used.

---

# 8. Challenges and Solutions

| Challenge | Solution |
|---|---|
| Multi-account data isolation | Per-user localStorage keys |
| Shared cart state across pages | React Context API |
| Linking bookings with payment | addToCart() on booking |
| Image loading lag | Lazy loading + compression |
| Icon rendering problems | Replaced CDN icons with Lucide React |
| State persistence after refresh | useEffect synchronization |
| Route protection | Token-based authentication check |

---

# 9. TypeScript Usage

TypeScript was used to improve reliability and maintainability.

### Example Interfaces

```ts
type Drink = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};
```

### Benefits

- Error prevention
- Better autocomplete
- Safer component props
- Improved code readability

---

# 10. Pages Summary

| Page | Description |
|---|---|
| Login | User registration and login |
| Dashboard | Overview and statistics |
| Menu | Products with filters |
| Cart | Checkout and coupons |
| Bookings | Reservation management |
| Activities | Activity browsing |
| Profile | User profile and history |
| Gallery | Café image showcase |
| About | Story and contact info |

---

# 11. How to Run the Project

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

---

# 12. Future Improvements

Possible future enhancements include:

- Backend integration with Node.js and MongoDB
- Real payment gateway integration
- Online table reservation system
- Admin dashboard
- Email notifications
- Dark mode support
- Mobile application version
- Firebase authentication

---

# 13. Conclusion

The Soukoun project successfully demonstrates a complete React + TypeScript single-page application with realistic web application features including:

- Authentication
- Shopping cart management
- Loyalty rewards engine
- Activity booking system
- State persistence
- Protected routing
- Responsive UI design

The project applies all major Web Development 1 concepts including:

- Component architecture
- React Hooks
- Context API
- Routing
- TypeScript typing
- Event handling
- State management
- Client-side persistence
- Reusable UI design

Despite not using a backend database, the application simulates a real-world user experience through organized architecture and localStorage persistence. The project demonstrates practical frontend engineering skills and a strong understanding of modern React development practices.