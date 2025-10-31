# BookIt Experiences

A full-stack booking platform for adventure experiences across India. Built with React, Express, MongoDB, and TypeScript.

![BookIt Experiences](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- **Browse Experiences**: Discover 8+ curated adventure experiences including kayaking, trekking, coffee trails, and more
- **Real-time Slot Booking**: View available time slots with live capacity updates
- **Smart Booking System**: Prevent overbooking with capacity management
- **Promo Code Support**: Apply discount codes (SAVE10 for 10% off, FLAT100 for ₹100 off)
- **Responsive Design**: Clean, modern UI that works on all devices
- **Instant Confirmation**: Get booking confirmation with unique reference ID

## 🏗️ Project Structure

```
BookIt-Experiences/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api.js         # Axios API client with all endpoints
│   │   ├── App.tsx        # Main app component with all screens
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Tailwind CSS styles
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend Express application
│   ├── models/            # MongoDB models
│   │   ├── Experience.ts  # Experience schema
│   │   ├── Slot.ts       # Time slot schema
│   │   └── Booking.ts    # Booking schema
│   ├── db.ts             # MongoDB connection
│   ├── index.ts          # Express server entry point
│   ├── routes.ts         # API routes
│   ├── seed.ts           # Database seeding
│   └── package.json      # Backend dependencies
│
├── start.sh              # Startup script for both servers
└── README.md             # This file
```

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB database (Atlas or local)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BookIt-Experiences
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the server directory or set environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Run the application**
   
   From the root directory:
   ```bash
   bash start.sh
   ```
   
   Or run separately:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:3000

## 🔌 API Endpoints

### Experiences

#### GET `/api/experiences`
Get all experiences
```json
Response: [
  {
    "id": 1,
    "title": "Kayaking Adventure",
    "location": "Udupi, Karnataka",
    "price": "999",
    "imageUrl": "...",
    "description": "..."
  }
]
```

#### GET `/api/experiences/:id`
Get experience details with available slots
```json
Response: {
  "id": 1,
  "title": "Kayaking Adventure",
  "location": "Udupi, Karnataka",
  "price": "999",
  "imageUrl": "...",
  "description": "...",
  "slots": [
    {
      "id": 1,
      "experienceId": 1,
      "date": "Oct 22",
      "time": "07:00 am",
      "capacity": 10,
      "booked": 6
    }
  ]
}
```

### Bookings

#### POST `/api/bookings`
Create a new booking
```json
Request: {
  "userName": "John Doe",
  "email": "john@example.com",
  "experienceId": 1,
  "slotId": 1,
  "quantity": 2,
  "totalPrice": "2057",
  "promoCode": "SAVE10",
  "discount": "200",
  "bookingStatus": "confirmed"
}

Response: {
  "id": 1,
  "confirmationId": "AB12CD34",
  "experience": {...},
  "slot": {...},
  ...
}
```

### Promo Codes

#### POST `/api/promo/validate`
Validate promo code
```json
Request: {
  "code": "SAVE10",
  "amount": 2000
}

Response: {
  "valid": true,
  "discount": 200,
  "message": "Promo code applied successfully! You saved ₹200"
}
```

## 💳 Available Promo Codes

- **SAVE10** - Get 10% discount on total amount
- **FLAT100** - Get flat ₹100 off on booking

## 🎨 User Flow

1. **Home Screen** - Browse all available experiences in a card grid
2. **Details Screen** - Select date, time slot, and quantity
3. **Checkout Screen** - Enter contact details and apply promo codes
4. **Confirmation Screen** - View booking confirmation with reference ID

## 🛠️ Development

### Frontend Development
```bash
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd server
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## 📊 Database Schema

### Experience
```javascript
{
  id: Number,
  title: String,
  description: String,
  price: String,
  location: String,
  imageUrl: String
}
```

### Slot
```javascript
{
  id: Number,
  experienceId: Number,
  date: String,
  time: String,
  capacity: Number,
  booked: Number
}
```

### Booking
```javascript
{
  id: Number,
  userName: String,
  email: String,
  experienceId: Number,
  slotId: Number,
  quantity: Number,
  totalPrice: String,
  promoCode: String,
  discount: String,
  bookingStatus: String
}
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Backend server port (default: 3000) | No |

## 🚀 Deployment

### Deploying on Replit

This project is configured to run on Replit with:
- Frontend on port 5000 (exposed)
- Backend on port 3000 (internal)
- Automatic startup via `start.sh`

The workflow is already configured. Just click "Run" and the application will start automatically.

### Deploying Elsewhere

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Set up environment variables** on your hosting platform

3. **Start the backend**
   ```bash
   cd server
   npm start
   ```

4. **Serve the frontend** static files from `client/dist`

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify your `MONGO_URI` is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the database user has proper permissions

### Port Already in Use
- Change the PORT in environment variables
- Kill existing processes using the port

### Frontend Can't Connect to Backend
- Ensure backend is running on port 3000
- Check CORS configuration in `server/index.ts`
- Verify API base URL in `client/src/api.js`

## 📝 Features Implemented

✅ Experience listing with images and details  
✅ Date and time slot selection  
✅ Capacity management (prevent overbooking)  
✅ Quantity selector with validation  
✅ Promo code system  
✅ Email validation  
✅ Terms and conditions checkbox  
✅ Booking confirmation with reference ID  
✅ Responsive design  
✅ Loading states  
✅ Error handling  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Built with ❤️ by the BookIt team

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- UI inspiration from modern booking platforms

---

**Need help?** Open an issue or contact support.

**Happy Booking! 🎉**
