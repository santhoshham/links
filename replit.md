# LinkBio - Digital Identity Hub

## Overview

LinkBio is a modern link-in-bio application that allows users to create personalized pages showcasing their social media presence and digital identity. The application features a clean, customizable interface with theme support, social media integration, and real-time analytics.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: RESTful API with Express routes
- **Development**: Hot module replacement with Vite middleware integration

### Database Design
- **ORM**: Drizzle ORM with TypeScript support
- **Schema Location**: `shared/schema.ts` for type safety across frontend/backend
- **Migrations**: Managed through drizzle-kit
- **Connection**: Neon serverless PostgreSQL via `@neondatabase/serverless`

## Key Components

### Database Schema
- **Users**: User authentication and account management
- **Profiles**: User profile information (name, bio, avatar, verification status)
- **Social Links**: Individual social media and custom links with click tracking
- **Themes**: Customizable color schemes and visual themes

### Frontend Components
- **ProfileHeader**: Displays user information with verification badges
- **SocialLinks**: Interactive link buttons with platform-specific styling
- **ThemeCustomizer**: Real-time theme switching interface
- **ContactSection**: Direct contact options (email, phone)

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **API Routes**: RESTful endpoints for profiles, links, and themes
- **Real-time Features**: Click tracking and analytics

## Data Flow

1. **Initial Load**: Client fetches user profile and associated social links
2. **Theme Management**: User selects themes, applied via CSS custom properties
3. **Link Interactions**: Click events tracked and stored in database
4. **Profile Updates**: Real-time updates through optimistic UI patterns

## External Dependencies

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **React Icons**: Extended icon set for social platforms
- **React Hook Form**: Form state management with validation

### Development Tools
- **Replit Integration**: Development environment optimization
- **TypeScript**: Full type safety across the stack
- **ESBuild**: Fast server-side bundling for production

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL with connection pooling
- **Environment Variables**: Database URL and configuration management

## Deployment Strategy

### Development
- Vite dev server with HMR for frontend
- TSX for server-side TypeScript execution
- Concurrent frontend/backend development

### Production Build
- Vite builds optimized frontend assets to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Single deployment artifact with static file serving

### Environment Configuration
- Environment-specific database connections
- Development vs production asset serving
- Error handling and logging

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.