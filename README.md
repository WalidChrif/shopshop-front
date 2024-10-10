### **Angular Frontend README**

# ShopShop Frontend

This is the frontend of the **ShopShop** e-commerce platform, built using Angular. It provides a responsive interface for both customers and administrators, supporting multilingual features and dynamic content.

## Features

- Browse products by category.
- Search, filter, and view product details.
- Customer shopping cart and order management.
- Admin dashboard for managing products, categories, and orders.
- Multilingual support for Spanish and English.
- State management with NgRx.
- Responsive design using Bootstrap and PrimeNG.

## Technology Stack

- **Angular**: Frontend framework.
- **NgRx**: State management.
- **ngx-translate**: For multilingual support.
- **PrimeNG** and **NgBootstrap**: UI component libraries.
- **RxJS**: For handling asynchronous operations.
- **HTML**, **CSS**, **Bootstrap**: For styling and layout.

## Installation and Setup

### Prerequisites

- Node.js (version 14+)
- Angular CLI (version 12+)
- Keycloak (for authentication)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopshop-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shopshop-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Update `environment.ts` and `environment.prod.ts` with the backend API URL and Keycloak settings:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:8080/api",
     keycloak: {
       url: "http://localhost:8080/auth",
       realm: "shopshop",
       clientId: "shopshop-front",
     },
   };
   ```
5. Run the Angular development server:
   ```bash
   ng serve
   ```
6. The application will be accessible at `http://localhost:4200`.

### Keycloak Configuration

1. Install and configure Keycloak.
2. Create a realm and set up the roles `admin` and `customer`.
3. Create a Keycloak client for the frontend with the appropriate redirect URIs.

## Multilingual Setup

- **ngx-translate** is used to manage translations.
- Available languages: Spanish (es-PR) and English (en).
