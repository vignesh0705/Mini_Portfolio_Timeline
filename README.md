# Mini Portfolio Timeline

A personal portfolio timeline web application where users can register, log in, and manage their timeline of achievements, experiences, education, projects, certifications, skills, and milestones.

![Portfolio Timeline](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Authentication](https://img.shields.io/badge/Authentication-JWT-green?style=for-the-badge)

## 🌟 Features

### 🔐 Authentication System

- **User Registration**: Create new accounts with email and password
- **Secure Login**: JWT-based authentication with secure token storage
- **Protected Routes**: Portfolio access restricted to authenticated users
- **Demo Account**: Pre-configured demo account for testing

### 📊 Portfolio Management

- **Timeline View**: Beautiful vertical timeline layout
- **Category System**: Organize entries by type:
  - 💼 Work Experience
  - 🎓 Education
  - 💻 Projects
  - 📜 Certifications
  - ⚡ Skills
  - 🏆 Milestones

### 🎨 User Interface

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Category Filtering**: Filter timeline entries by category
- **Visual Indicators**: Color-coded categories with icons
- **Smooth Animations**: Engaging transitions and hover effects

### ✏️ CRUD Operations

- **Add Entries**: Create new timeline items with rich details
- **Edit Entries**: Update existing entries inline
- **Delete Entries**: Remove unwanted entries
- **Form Validation**: Client-side validation with error messages

### 👑 Admin Features

- **Admin Dashboard**: Comprehensive overview of system statistics
- **User Management**: View all users, their roles, and portfolio counts
- **User Deletion**: Remove users from the system (except admin accounts)
- **System Statistics**: Track total users, portfolio items, and user roles
- **Role-based Access**: Secure admin-only functionality

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed
- **MongoDB** installed and running
- **npm or yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mini-portfolio-timeline
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Database**

   ```bash
   # Automated setup (recommended)
   npm run setup-db

   # Or manually start MongoDB and seed data
   mongod --dbpath ./data/db
   npm run seed-db
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## 🔑 Demo Accounts

For testing purposes, use these pre-configured accounts:

### Regular User Account

- **Email**: demo@example.com
- **Password**: demo123

### Admin Account

- **Email**: vicky@admin.com
- **Password**: 123456
- **Features**: Access to admin dashboard, user management, system statistics

## 📱 Usage Guide

### Getting Started

1. **Home Page**: Visit the landing page to learn about the application
2. **Sign Up**: Create a new account or use the demo account
3. **Login**: Access your personal portfolio timeline

### Managing Your Timeline

1. **Add Entries**: Use the form at the top to add new timeline items
2. **Categorize**: Select appropriate categories for your entries
3. **Filter**: Use category filters to view specific types of entries
4. **Edit/Delete**: Use the action buttons on each timeline item

### Timeline Entry Fields

- **Category**: Type of entry (experience, education, project, etc.)
- **Title/Role**: Main title or position name
- **Company/Institution**: Organization name (optional)
- **Date/Period**: Time period (e.g., "Jan 2022 - Present")
- **Description**: Detailed description of the entry
- **Tags/Skills**: Comma-separated skills or technologies

## 🏗️ Technical Architecture

### Frontend

- **Next.js 15.4.3**: React framework with App Router
- **React 19.1.0**: UI library with hooks
- **CSS3**: Custom styling with CSS variables for theming
- **JavaScript**: ES6+ features

### Authentication

- **JWT Tokens**: Secure authentication tokens
- **bcryptjs**: Password hashing
- **js-cookie**: Client-side cookie management
- **Protected Routes**: Route-level authentication

### Data Storage

- **MongoDB Database**: Robust NoSQL database with Mongoose ODM
- **User Isolation**: Each user has their own portfolio data with proper access control
- **Session Management**: JWT-based authentication with secure token storage
- **Data Persistence**: All data is permanently stored in MongoDB
- **Backup & Recovery**: Full database backup and restore capabilities

### API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user
- `GET /api/portfolio` - Get user's portfolio items
- `POST /api/portfolio` - Update user's portfolio items

## 📁 Project Structure

```
mini-portfolio-timeline/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── register/route.js
│   │   │   └── me/route.js
│   │   └── portfolio/route.js
│   ├── auth/page.js
│   ├── portfolio/page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── CategoryFilter.js
│   ├── LoginForm.js
│   ├── ProtectedRoute.js
│   ├── RegisterForm.js
│   ├── ThemeToggle.js
│   ├── TimelineForm.js
│   └── TimelineItem.js
├── contexts/
│   └── AuthContext.js
├── utils/
│   └── auth.js
└── package.json
```

## 🎨 Customization

### Themes

The application supports light and dark themes. Theme preferences are stored in localStorage and persist across sessions.

### Categories

You can customize categories by modifying the category arrays in:

- `components/TimelineForm.js` (form options)
- `components/CategoryFilter.js` (filter options)
- `components/TimelineItem.js` (icons and colors)

### Styling

All styles are in `app/globals.css` using CSS custom properties for easy theming.

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Client and server-side protection
- **Input Validation**: Form validation and sanitization
- **CORS Protection**: API route protection

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

For production, set:

```env
JWT_SECRET=your-super-secret-jwt-key
```

### Database Configuration

The application uses MongoDB with Mongoose ODM. Configuration options:

**Development:**

```env
MONGODB_URI=mongodb://localhost:27017/mini-portfolio-timeline
JWT_SECRET=your-development-secret-key
```

**Production:**

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mini-portfolio-timeline
JWT_SECRET=your-super-secure-production-key
```

**Alternative Databases:**

- PostgreSQL with Prisma
- Firebase Firestore
- Supabase
- MongoDB Atlas (recommended for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for the UI library
- Inter font family for beautiful typography
- Emoji icons for category visualization

## 📞 Support

If you encounter any issues or have questions:

1. Check the demo account functionality
2. Verify all dependencies are installed
3. Ensure you're using Node.js 18+
4. Check browser console for errors

---

**Built with ❤️ using Next.js and React**
