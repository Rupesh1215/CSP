# Arogya - Village Health Information System

## Overview
Arogya is a village health information web application providing non-medical public health information. It helps villagers access vaccination schedules, health camp details, and government health schemes, while authorized Sachivalayam staff can manage this information through a secure admin interface.

## Tech Stack
- **Frontend**: React, Wouter, TailwindCSS, shadcn/ui, TanStack Query
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **AI**: Perplexity API (sonar model) for FAQ chatbot with strict scope enforcement
- **Authentication**: JWT with bcrypt password hashing
- **Languages**: Multi-language support (English, Hindi, Telugu)

## MongoDB Atlas Setup

**IMPORTANT**: This application requires a MongoDB Atlas connection.

### Steps to Set Up MongoDB Atlas:

1. **Create a MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region close to your users
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a user with username and password
   - **Save these credentials** - you'll need them for the connection string

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your specific IP)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" and click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster.mongodb.net/`)
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name: `mongodb+srv://username:password@cluster.mongodb.net/arogya?retryWrites=true&w=majority`

6. **Add to Replit Secrets**
   - In Replit, go to the "Secrets" tab (lock icon in left sidebar)
   - Add a new secret:
     - Key: `MONGODB_URI`
     - Value: Your connection string from step 5

### Seed the Database

After setting up MongoDB, run the seed script to populate initial data:

```bash
npx tsx server/seed.ts
```

This will create:
- Admin user (email: admin@arogya.gov, password: admin123)
- 3 sample health camps
- 5 vaccination schedules
- 4 government health schemes

## Features

### Public Features
- View health camps with filtering by status (active, upcoming, cancelled)
- Browse vaccination schedules for all age groups
- Explore government health schemes with eligibility and benefits
- **Smart Search**: Hybrid keyword + AI search that understands natural language questions and dates
- Multi-language FAQ chatbot (English, Hindi, Telugu) with strict scope enforcement
- Responsive design optimized for mobile devices

### Admin Features
- Secure JWT-based authentication
- Create, read, update, delete (CRUD) for:
  - Health camps (with optional image URLs)
  - Vaccination schedules
  - Government schemes
- Audit logging of all admin actions
- Activity log viewing

### Security
- Rate limiting on public endpoints (100 requests per 15 minutes)
- Rate limiting on FAQ endpoint (30 requests per 15 minutes)
- JWT token authentication for admin routes
- Bcrypt password hashing
- Helmet.js security headers
- Input validation using Zod schemas

## API Endpoints

### Public Endpoints
- `GET /api/camps` - List all health camps
- `GET /api/camps/:id` - Get single camp details
- `GET /api/vaccines` - List all vaccines
- `GET /api/schemes` - List all government schemes
- `GET /api/search?q=query` - Search across all content
- `POST /api/faq/query` - Ask FAQ chatbot (requires: query, language)

### Admin Endpoints (require Bearer token)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/camps` - Create camp
- `PUT /api/admin/camps/:id` - Update camp
- `DELETE /api/admin/camps/:id` - Delete camp
- `POST /api/admin/vaccines` - Create vaccine
- `PUT /api/admin/vaccines/:id` - Update vaccine
- `DELETE /api/admin/vaccines/:id` - Delete vaccine
- `POST /api/admin/schemes` - Create scheme
- `PUT /api/admin/schemes/:id` - Update scheme
- `DELETE /api/admin/schemes/:id` - Delete scheme
- `GET /api/admin/logs` - View audit logs

## FAQ Chatbot Constraints

The AI chatbot has strict scope enforcement:
- **Allowed topics**: Health camps, vaccination schedules, government schemes
- **Prohibited**: Medical diagnosis, personal health advice, medicine recommendations
- **Source attribution**: All responses include references to database records used
- **Multi-language**: Responds in English, Hindi, or Telugu based on user preference

## Development

### Environment Variables
Required in Replit Secrets:
- `PERPLEXITY_API_KEY` - Perplexity AI API key for FAQ chatbot
- `MONGODB_URI` - MongoDB Atlas connection string (see setup above)
- `SESSION_SECRET` - Already configured

Optional:
- `JWT_SECRET` - Custom JWT secret (defaults to development value)

### Local Development
1. Install dependencies: `npm install`
2. Set up MongoDB Atlas (see above)
3. Seed database: `npx tsx server/seed.ts`
4. Start dev server: `npm run dev`
5. Access at http://localhost:5000

## Design Guidelines
See `design_guidelines.md` for detailed UI/UX specifications following government portal aesthetics with calm blues, clean typography (Roboto), and accessibility-first design.

## Data Model

### Collections
- **admins**: Admin users with email, hashed password, name
- **camps**: Health camps with title, date, time, location, type, description, status, optional imageUrl
- **vaccines**: Vaccination schedules with name, age group, schedule notes, next dose info
- **schemes**: Government schemes with name, eligibility, benefits, description
- **auditlogs**: Admin action logs with adminId, action type, entity details, timestamp

## Future Enhancements
- Email-based password reset for admins
- SMS notifications for upcoming health camps
- Offline PWA capabilities
- Bulk import/export functionality
- Advanced analytics dashboard
- Image upload from file system (currently uses URLs only)
