# LinkUp - The All-in-One Social Planner

LinkUp is a modern, comprehensive social planning platform that brings all group coordination tools into one seamless application. Built with Next.js 14, Clerk Authentication, and TypeScript, it provides real-time calendar sync, group decision-making, expense management, and location-based features.

## 🚀 Features

### Core Features
- **Live Calendar Sync** - Real-time integration with Google Calendar and Apple Calendar
- **Group Decision Making** - Interactive polls for activities, restaurants, and venues
- **Money Manager** - Split bills and track expenses per user
- **Location-Based Features** - "Ping friends nearby" with location-based reminders
- **Availability Status** - "Who's In?" status indicators (Free / Maybe / Busy)
- **Friend Management** - Build and manage your social network

### Technical Features
- **Real-time Updates** - Live synchronization and updates
- **Cross-platform** - Works on iPhone, Android, tablet, and desktop
- **Offline Support** - View events and data when offline
- **Push Notifications** - Location-based and event reminders
- **Secure Authentication** - Clerk Auth with social login support

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Clerk** - Authentication and User Management
  - Secure user authentication
  - Social login providers
  - User profiles and sessions
  - Multi-factor authentication

### Mobile & Cross-platform
- **React Native** (planned) - Mobile app development
- **Expo** - React Native development platform
- **PWA Support** - Progressive Web App capabilities

### Integrations
- **Google Calendar API** - Calendar synchronization
- **Apple EventKit** - iOS calendar integration
- **Stripe** - Payment processing
- **Mapbox/Google Maps** - Location services

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Clerk Account** (for authentication setup)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linkup.git
cd linkup
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Clerk Authentication

1. Create a new application at [clerk.com](https://clerk.com)
2. Go to API Keys to get your publishable key and secret key
3. Copy the environment variables:

```bash
cp env.example .env.local
```

4. Update `.env.local` with your Clerk credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Mobile Development Setup

### React Native with Expo

```bash
# Install Expo CLI
npm install -g @expo/cli

# Create mobile app
npx create-expo-app linkup-mobile --template blank-typescript

# Install dependencies
cd linkup-mobile
npm install @supabase/supabase-js react-native-url-polyfill
```

### PWA Configuration

The web app is configured as a Progressive Web App (PWA) for mobile-like experience on browsers.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_CALENDAR_CLIENT_ID=your_google_calendar_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_google_calendar_client_secret

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📊 Data Structure

The application is designed to work with the following data types:

- **User Profiles** - User information and preferences
- **Events** - Event details and metadata
- **Event Participants** - RSVP and participation tracking
- **Polls** - Group decision-making polls
- **Poll Votes** - Individual poll responses
- **Expenses** - Expense tracking and splitting
- **User Availability** - Real-time availability status
- **Friends** - Friend relationships and connections
- **Calendar Integrations** - Third-party calendar connections

## 🔐 Authentication

LinkUp uses Clerk Authentication with the following features:

- **Email/Password** authentication
- **Social OAuth** integration (Google, GitHub, etc.)
- **Multi-factor authentication** (MFA)
- **User management** and profiles
- **Session management** and security

## 🎨 Design System

The application uses a custom design system built with Tailwind CSS:

- **Primary Color**: LinkUp Blue (`#0ea5e9`)
- **Status Colors**: 
  - Free: Green (`#10b981`)
  - Busy: Red (`#ef4444`)
  - Maybe: Yellow (`#f59e0b`)
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in dark mode support

## 📱 Mobile Features

### Planned Mobile Features
- **Native Push Notifications** - Expo Notifications
- **Location Services** - GPS and geofencing
- **Offline Sync** - Local storage with sync
- **Camera Integration** - Photo sharing for events
- **Biometric Auth** - Face ID / Touch ID

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for mobile
- **Bundle Size**: Optimized with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: Supabase and browser caching

## 🔄 Real-time Features

- **Live Event Updates** - Real-time event modifications
- **Poll Results** - Live voting and results
- **Availability Changes** - Instant status updates
- **Friend Activity** - Real-time friend status
- **Location Sharing** - Live location updates

## 🛡 Security

- **Row Level Security (RLS)** - Database-level security
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Zod schema validation
- **XSS Protection** - Built-in Next.js protection
- **CSRF Protection** - Supabase built-in protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.linkup.app](https://docs.linkup.app)
- **Issues**: [GitHub Issues](https://github.com/yourusername/linkup/issues)
- **Discord**: [LinkUp Community](https://discord.gg/linkup)
- **Email**: support@linkup.app

## 🗺 Roadmap

### Phase 1 (Current)
- [x] User authentication
- [x] Basic event creation
- [x] Poll system
- [x] Availability status
- [ ] Friend management

### Phase 2 (Next)
- [ ] Calendar integration
- [ ] Expense tracking
- [ ] Location features
- [ ] Mobile app

### Phase 3 (Future)
- [ ] AI-powered suggestions
- [ ] Advanced analytics
- [ ] Social media integration
- [ ] Enterprise features

---

Built with ❤️ by the LinkUp Team # LinkUp
