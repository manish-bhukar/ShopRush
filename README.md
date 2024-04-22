# ShopRush

ShopRush is an eCommerce web application designed to provide users with a seamless shopping experience. It includes features such as product sorting and filtering, product detail pages, order confirmation, address updating, multiple payment options, order tracking, and an admin dashboard for managing products and orders.

## Features

### User Interface

- **Product Listing**: Users can browse products and sort/filter them based on various criteria.
- **Product Detail Page**: Detailed information about each product including images, descriptions, and pricing.
- **Order Placement**: Users can select products, choose quantities, and place orders.
- **Address Management**: Users can update their delivery address during checkout.
- **Payment Options**: Two payment methods available - Cash on Delivery and Online Payment.
- **Order Tracking**: Users can view their order status from their profile.

### Admin Dashboard

- **Product Management**: Add, remove, update product details, pricing, and availability.
- **Order Management**: View and update order statuses.

## Installation

# Clone the repository
git clone https://github.com/mangalgithub/shoprush.git
cd shoprush

# Set up frontend
cd frontend
npm install

# Open a new terminal window/tab and navigate back to shoprush
# For macOS/Linux
cd ..
# For Windows
cd ..

# Set up backend
cd backend
npm install

# Start the frontend development server
cd ../frontend
npm run dev

# In the other terminal window/tab, start the backend server
cd ../backend
npm start

## Technologies Used

- Frontend: React.js, Redux, HTML, CSS, JavaScript
- Backend: Node.js, Express.js, MongoDB
- Authentication: JSON Web Tokens (JWT)
- Payment Gateway Integration: [Stripe Payment Gateway]

## Contributing

We welcome contributions from the community. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.
