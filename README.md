c# Sahayak - Digital Health & Psychological Support System

A comprehensive digital health platform that provides AI-powered symptom checking, medicine reminders, appointment booking, and psychological support for students and employees.

## 🏥 Features

- **AI Symptom Checker**: PHQ-9 based mental health screening
- **Appointment Booking**: Schedule consultations with counselors and psychologists  
- **Medicine Reminders**: Track and manage medication schedules
- **Peer Support Forum**: Anonymous safe spaces for students
- **Emergency Services**: Quick access to emergency contacts and nearby hospitals
- **Multi-language Support**: English, Hindi, and Marathi
- **Dark Mode**: Comfortable viewing in low-light conditions
- **Admin Dashboard**: Analytics and user management for institutions

## 🛠️ Technology Stack

**Backend:**
- Node.js with Express.js
- MongoDB (for database)
- JWT for authentication
- bcrypt for password hashing
- Twilio for OTP services
- Nodemailer for email services

**Frontend:**
- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- Chart.js for analytics
- Leaflet.js for maps
- Toastify for notifications

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (optional for full functionality)
- Python (for simple HTTP server)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd sahayak-health-system
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Start the backend server:
```bash
node index.js
```

The backend server will start on **port 4000**.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Start a simple HTTP server:
```bash
# Option 1: Using Python
python -m http.server 3000

# Option 2: Using Node.js (if http-server is installed)
npx http-server -p 3000
```

The frontend will be available on **port 3000**.

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔑 Test Credentials

For testing purposes, use these credentials:
- **Email:** `student@college.edu`
- **Password:** `password123`

## 📁 Project Structure

```
sahayak-health-system/
├── backend/
│   ├── index.js              # Main backend server
│   ├── user.js               # User model
│   ├── model/
│   │   └── otp.js           # OTP model
│   ├── sendEmail.js         # Email service
│   ├── twilioService.js     # SMS/OTP service
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── index.html           # Main frontend file
│   ├── server.js            # Alternative backend (port 5000)
│   └── assets/              # Static assets (if any)
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration
- `POST /forgot-password` - Password recovery
- `POST /reset-password/:token` - Reset password

### OTP Services
- `POST /send-otp` - Send OTP to phone
- `POST /verify` - Verify OTP

### Appointments
- `POST /api/appointment` - Book appointment

### Role-based Access
- `GET /public` - Public access
- `GET /private` - Admin only access

## ⚙️ Configuration

### Backend Configuration
The backend server runs on port 4000 by default. You can change this in `backend/index.js`:
```javascript
app.listen(4000, () => {
    console.log("server running on port no 4000");
});
```

### Frontend Configuration
The frontend connects to the backend via the API_URL variable in `frontend/index.html`:
```javascript
const API_URL = "http://localhost:4000"; // local backend
```

### Database Setup (Optional)
For full functionality with MongoDB:
1. Install MongoDB on your system
2. Uncomment the MongoDB connection code in `backend/index.js`
3. Update the connection string if needed

## 🧪 Testing

Test the backend API endpoints:

```bash
# Test login
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@college.edu","passWord":"password123"}'

# Test appointment booking
curl -X POST http://localhost:4000/api/appointment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"email":"student@college.edu","date":"2024-12-12 10:00","doctor":"College Counsellor (Free)"}'
```

## 🚨 Emergency Features

The application includes quick access to emergency services:
- **Ambulance**: 108
- **Police**: 100  
- **Tele-Manas**: 14416 (24/7 Government Helpline)

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Role-based access control

## 📝 Notes

- This is a demo version with test data
- MongoDB is optional for initial testing
- All sensitive data should be properly secured in production
- Consider implementing HTTPS for production deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find any bugs or issues, please create an issue in the repository with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the code comments

## 📄 License

This project is licensed under the ISC License.

---

**Made with ❤️ for Mental Health Awareness**