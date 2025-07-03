# LinkUp Deployment Guide

This guide covers deploying LinkUp to various platforms for production use.

## 🚀 Quick Deploy to Vercel (Recommended)

### 1. Prepare Your Repository

1. Push your code to GitHub
2. Ensure all environment variables are documented in `env.example`

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

### 3. Configure Environment Variables

In your Vercel project dashboard, go to Settings > Environment Variables and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Deploy

Click "Deploy" and Vercel will automatically build and deploy your application.

## 🌐 Alternative Deployment Options

### Netlify

1. **Connect Repository**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   ```

2. **Deploy**:
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod --dir=.next
   ```

3. **Configure Environment Variables** in Netlify dashboard

### Railway

1. **Connect to Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will auto-detect Next.js

2. **Configure Environment Variables** in Railway dashboard

3. **Deploy**: Railway will automatically deploy on push

### DigitalOcean App Platform

1. **Create App**:
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select Next.js as the framework

2. **Configure**:
   - Set build command: `npm run build`
   - Set run command: `npm start`
   - Add environment variables

3. **Deploy**: DigitalOcean will handle the deployment

## 📱 Mobile App Deployment

### Expo Application Services (EAS)

1. **Install EAS CLI**:
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure EAS**:
   ```bash
   cd mobile
   eas build:configure
   ```

4. **Build for Production**:
   ```bash
   # iOS
   eas build --platform ios --profile production
   
   # Android
   eas build --platform android --profile production
   ```

5. **Submit to App Stores**:
   ```bash
   # iOS App Store
   eas submit --platform ios
   
   # Google Play Store
   eas submit --platform android
   ```

### Manual Build

#### iOS (requires macOS)

1. **Install Xcode** and iOS Simulator
2. **Build**:
   ```bash
   cd mobile
   expo build:ios
   ```

#### Android

1. **Install Android Studio** and Android SDK
2. **Build**:
   ```bash
   cd mobile
   expo build:android
   ```

## 🗄️ Database Setup

### Supabase Production Setup

1. **Create Production Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project for production
   - Choose a region close to your users

2. **Run Database Schema**:
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Execute the SQL

3. **Configure Row Level Security**:
   - All RLS policies are included in the schema
   - Verify policies are active in Authentication > Policies

4. **Set Up Authentication**:
   - Configure OAuth providers (Google, Apple)
   - Set up email templates
   - Configure redirect URLs

### Environment Variables for Production

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
GOOGLE_CALENDAR_CLIENT_ID=your_calendar_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_calendar_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🔒 Security Configuration

### SSL/HTTPS

- **Vercel/Netlify**: Automatic SSL certificates
- **Custom Domain**: Configure SSL certificates
- **Railway**: Automatic SSL with custom domains

### Environment Variables Security

- Never commit `.env.local` to version control
- Use platform-specific secret management
- Rotate keys regularly
- Use different keys for development and production

### Supabase Security

1. **Row Level Security**: Already configured in schema
2. **API Keys**: Use service role key only on server-side
3. **CORS**: Configure allowed origins in Supabase dashboard
4. **Rate Limiting**: Enable in Supabase dashboard

## 📊 Monitoring and Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to your app:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Monitoring

1. **Sentry**:
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure** in `sentry.client.config.js` and `sentry.server.config.js`

### Performance Monitoring

1. **Vercel Speed Insights**:
   ```bash
   npm install @vercel/speed-insights
   ```

2. **Add to app**:
   ```tsx
   import { SpeedInsights } from '@vercel/speed-insights/next'
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🌍 Domain and DNS

### Custom Domain Setup

1. **Purchase Domain** (e.g., from Namecheap, GoDaddy)
2. **Configure DNS**:
   - Add CNAME record pointing to your deployment URL
   - Add A record for root domain (if supported)

3. **Configure in Platform**:
   - Add custom domain in your deployment platform
   - Configure SSL certificate

### CDN Configuration

1. **Vercel Edge Network**: Automatic with Vercel
2. **Cloudflare**: Add Cloudflare proxy for additional CDN
3. **Image Optimization**: Next.js Image component handles this

## 📱 PWA Deployment

### Service Worker

The PWA features are automatically configured with Next.js PWA plugin.

### App Store Optimization

1. **App Icons**: Generate all required sizes
2. **Screenshots**: Create screenshots for different devices
3. **App Store Listing**: Write compelling descriptions
4. **Keywords**: Optimize for search

## 🔧 Post-Deployment Checklist

- [ ] Test all authentication flows
- [ ] Verify real-time features work
- [ ] Test mobile responsiveness
- [ ] Check PWA installation
- [ ] Verify push notifications
- [ ] Test offline functionality
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify SSL certificates
- [ ] Test payment flows (if applicable)

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify Supabase credentials

3. **Database Issues**:
   - Check Supabase project status
   - Verify RLS policies are active
   - Check API rate limits

4. **Mobile Build Issues**:
   - Update Expo SDK version
   - Check native dependencies
   - Verify app.json configuration

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Next.js Documentation](https://nextjs.org/docs)

---

For additional support, contact the LinkUp development team or check our [GitHub Issues](https://github.com/yourusername/linkup/issues). 