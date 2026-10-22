# TERRA — A Deeper Way to Travel
### Travel Explorer India | GDGC VNRVJIET App Development Recruitment Assignment

[![Expo](https://img.shields.io/badge/Expo-SDK%2058-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React Native Web](https://img.shields.io/badge/React%20Native%20Web-Supported-20382B?style=for-the-badge)](https://necolas.github.io/react-native-web/)

---

## 🌿 Overview

**TERRA** is an editorial-first travel discovery application for exploring the diverse landscapes, sacred monuments, and cultural soul of India. Built for the **GDGC VNRVJIET App Development Recruitment Assignment**, TERRA blends a travel-magazine aesthetic with a robust, production-ready React Native architecture that runs seamlessly on **Android (Expo Go / standalone APK)** and **Web (React Native Web)**.

Moving beyond generic, saturated blue travel apps, TERRA draws deep visual inspiration from luxury travel magazines and slow-living publications: warm parchment and ivory backdrops, deep forest-green typography, terracotta accents, organic torn-paper card contours, and high-resolution editorial photography.

---

## 🎨 Visual Identity & Design System

| Design Token | Value | Editorial Application |
| :--- | :--- | :--- |
| **Background** | `#F4EFE6` | Warm parchment paper canvas |
| **Forest Green** | `#20382B` | Primary titles, branding, active tab icons |
| **Terracotta** | `#B96548` | Badges, accent motifs, active filter highlights, highlights |
| **Muted Olive** | `#858B70` | Secondary text, subtle borders, metadata labels |
| **Soft Cream** | `#E9E0D2` | Surface cards, interactive pills, input containers |
| **Dark Text** | `#252B24` | High-contrast body copy and descriptive narratives |
| **Heart Red** | `#C74B39` | Wishlist active heart state |
| **Typography** | Cormorant Garamond & DM Sans | Editorial serif headings paired with clean, geometric sans-serif supporting text |

---

## ✨ Features & User Flows

### 1. Home / Editorial Destination Discovery
- **Hero Landmark Composition**: Oversized serif headline *"A Deeper Way to Travel"*, accompanied by the secondary tagline *"Discover the soul of India"*, an original mountain motif wordmark, and featured region callout.
- **Curated Collection**: 12 diverse Indian sanctuaries covering 4 core terrains:
  - **Beaches**: Goa, Andaman Islands, Gokarna
  - **Mountains**: Manali, Munnar, Gulmarg
  - **Heritage**: Jaipur, Hampi, Varanasi
  - **Adventure**: Rishikesh, Bir Billing, Leh-Ladakh
- **Responsive Layout**: Adapts dynamically from a 3-column desktop editorial grid to a 2-column tablet layout and an ergonomic single-column mobile view with a bottom navigation bar.

### 2. Search & Multi-Criteria Filtering
- **Simultaneous Filtering**: Search query, terrain category chips, and budget tiers work concurrently without state conflict.
- **Search Scope**: Case-insensitive matching across destination name, state/region, descriptive overview, and specific attraction names.
- **Interactive Badges**: Real-time counter of available sanctuaries per category.
- **Thoughtful Empty State**: Illustrated empty state with a 1-tap "Reset Search & Filters" CTA when no destinations match criteria.

### 3. Immersive Destination Details (`/destination/[id]`)
- **Large Hero Photography**: Edge-to-edge photography with category pill and location badge.
- **Editorial Chronicle**: Primary narrative and detailed historical/geographical context.
- **Quick Info Bar**: Best season to visit, recommended trip duration, and budget tier.
- **Three Iconic Attractions per Destination**: Each attraction features its own high-resolution photograph, title, and descriptive story.
- **Live Weather Integration**: Real-time weather widget powered by the open, free Open-Meteo API (temperature, weather conditions, wind speed, relative humidity) with automatic fallback and graceful loading states.
- **Google Maps Action**: Deep links to platform-native map applications (Apple Maps on iOS, geo URI on Android, Google Maps web search fallback).
- **Persistent Wishlist Action**: Prominent heart toggle button with instant state synchronization.

### 4. Wishlist ("Your Saved Escapes" — `/wishlist`)
- **Persistent Storage**: Saved destination IDs are preserved locally using `@react-native-async-storage/async-storage`.
- **Immediate Cross-Screen Reflection**: Toggling a heart on Discovery, Explore, or Detail screens updates the wishlist instantly via React Context.
- **Empty State**: Elegant empty state encouraging users to explore the collection.
- **Bulk Clear**: Confirmation dialog to clear saved escapes.

### 5. Smart Destination Matcher ("Find My Escape" — `/find-escape`)
- **Deterministic & Explainable**: No opaque AI black boxes. An honest, rule-based recommendation engine scoring travel preferences against destination attributes.
- **3-Step Interactive Questionnaire**:
  1. Preferred terrain (*Mountains, Beaches, Heritage, Adventure*)
  2. Budget tier (*Budget ₹, Moderate ₹₹, Luxury ₹₹₹*)
  3. Trip duration (*Weekend, 1 Week, 2+ Weeks*)
- **Scored Recommendations**: Returns top-matching sanctuaries with percentage match scores and clear explanations of why each destination fits the chosen rhythm.

---

## 🛠️ Architecture & Tech Stack

```
TERRA/
├── app.json                 # Expo SDK 58 application manifest & splash config
├── eas.json                 # EAS build profiles (APK, preview, production)
├── tsconfig.json            # Strict TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── dist/                    # Static production web build output
├── assets/                  # Icons, splash screens, and adaptive vector assets
└── src/
    ├── app/                 # Expo Router file-based screens
    │   ├── +html.tsx        # Web HTML template with Google Fonts (Cormorant & DM Sans)
    │   ├── _layout.tsx      # Root Stack navigator, font loader & WishlistProvider
    │   ├── index.tsx        # Landing & Discovery screen
    │   ├── explore.tsx      # Comprehensive multi-filter sanctuary directory
    │   ├── find-escape.tsx  # Deterministic 3-step smart recommendation engine
    │   ├── wishlist.tsx     # Saved escapes screen with AsyncStorage persistence
    │   └── destination/
    │       └── [id].tsx     # Immersive destination details screen
    ├── components/          # Reusable UI components
    │   ├── AttractionCard.tsx    # Card for individual attractions
    │   ├── CategoryChips.tsx     # Horizontal terrain category filters
    │   ├── DestinationCard.tsx   # Interactive destination card with heart toggle
    │   ├── EditorialHeader.tsx   # Responsive top navbar with TERRA wordmark
    │   ├── EmptyState.tsx        # Styled empty states with reset CTAs
    │   ├── MobileTabBar.tsx      # Bottom navigation for mobile viewports
    │   ├── MountainMotif.tsx     # Custom SVG mountain motif
    │   └── WeatherWidget.tsx     # Live Open-Meteo weather integration
    ├── constants/
    │   └── theme.ts         # Centralized colors, typography tokens, spacing, shadows
    ├── context/
    │   └── WishlistContext.tsx   # Wishlist state management with AsyncStorage sync
    ├── data/
    │   └── destinations.ts  # 12 curated Indian destinations with 36 attractions
    ├── types/
    │   └── index.ts         # TypeScript definitions for destinations, categories, filters
    └── utils/
        ├── recommender.ts   # Deterministic travel matcher algorithm
        └── weather.ts       # Open-Meteo free API client & weather condition mapper
```

---

## 🚀 Setup & Local Running

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd TERRA
npm install
```

### 2. Run the Development Server
```bash
# Start unified dev server (opens QR code for Expo Go, web, Android, iOS)
npx expo start

# Run specifically on Web
npx expo start --web

# Run specifically on Android emulator / connected device
npx expo start --android
```

### 3. Verify Code Quality & Type Safety
```bash
# TypeScript type checking
npx tsc --noEmit

# Linting
npx eslint .

# Export production web bundle
npx expo export --platform web
```

---

## 📦 Deployment & Android Distribution

### Web Deployment (EAS Hosting / Static Web)
The application is pre-configured for **Expo EAS Hosting** and static web serving:
```bash
# Log in to Expo
npx eas-cli login

# Export web build
npx expo export --platform web

# Deploy via EAS Hosting
npx eas-cli deploy
```

### Android Standalone APK Build
An installable Android APK can be generated through Expo Application Services (EAS):
```bash
# Trigger an Android APK preview build
npx eas-cli build -p android --profile preview
```

### Testing on Android via Expo Go
1. Install **Expo Go** from Google Play Store on your Android device.
2. Run `npx expo start` in the terminal.
3. Scan the generated QR code using the Expo Go application (or camera) on the same Wi-Fi network.

---

## 🎬 2–3 Minute Demo Video Script

*For evaluation during the recruitment screening:*

| Time | Scene | Narration / Action |
| :--- | :--- | :--- |
| **0:00 - 0:30** | **Home / Discovery Screen** | *"Hello! This is TERRA — a travel explorer application built for the GDGC VNRVJIET recruitment assignment. Inspired by premium travel journals, TERRA brings an editorial approach to exploring India. Notice the warm parchment background, deep forest-green typography, and custom mountain motif. We have 12 curated escapes across Beaches, Mountains, Heritage, and Adventure."* |
| **0:30 - 1:00** | **Search & Category Filtering** | *"On the discovery and explore screens, search and category filters work concurrently. Typing 'Goa' immediately isolates Goa. Clicking the 'Mountains' category displays Manali, Munnar, and Gulmarg with real-time counts. If no destination matches our criteria, an editorial empty state appears with a single-click reset button."* |
| **1:00 - 1:40** | **Destination Details Screen** | *"Let's open Gulmarg. Here we have a high-resolution hero image, quick badges for the best season and duration, and our editorial story. Notice the live weather widget querying the Open-Meteo API in real time. Below, we see three iconic attractions with photos and descriptions: the Gulmarg Gondola, Apharwat Peak, and Maharani Temple. We can also tap 'Open Maps' to launch Google Maps directly."* |
| **1:40 - 2:15** | **Wishlist & Persistence** | *"Let's save Gulmarg and Manali to our wishlist. The heart icon turns terracotta. Navigating to 'Your Saved Escapes', both sanctuaries are listed. Even if we refresh the page or relaunch the app, AsyncStorage preserves our wishlist on the device. We can remove individual items or clear the archive."* |
| **2:15 - 2:45** | **Find My Escape (Smart Matcher)** | *"Finally, our 'Find My Escape' feature is a transparent, explainable recommendation engine. Choosing Mountains, a Moderate budget, and a 1-Week duration computes match percentages and provides clear written rationales for why each destination fits our travel rhythm."* |
| **2:45 - 3:00** | **Conclusion** | *"TERRA passes all TypeScript checks, ESLint rules, and exports cleanly for web and Android with zero broken images. Thank you!"* |

---

## 📋 Verification & Testing Checklist

- [x] **All 12 destinations appear correctly** with authentic imagery, locations, and tags.
- [x] **Every destination opens its detail page** with slug routing via Expo Router (`/destination/[id]`).
- [x] **Every detail page contains three attraction images** and comprehensive travel chronicles.
- [x] **Search works correctly**: Case-insensitive matching across names, states, descriptions, and attractions.
- [x] **Category filtering works correctly**: All, Beaches, Mountains, Heritage, Adventure.
- [x] **Search and filtering work simultaneously** with real-time result counters.
- [x] **Wishlist addition works** from both card items and detail screens.
- [x] **Wishlist removal works** and synchronizes instantly across all screens.
- [x] **Wishlist persists after reopening** via AsyncStorage.
- [x] **Navigation works correctly** across Stack screens and bottom mobile tab bar.
- [x] **Zero broken images**: All photographs validated with HTTP 200 responses.
- [x] **Mobile layouts do not overflow**: Responsive flex layouts with safe area padding.
- [x] **Web layouts are responsive**: Desktop (3 columns), Tablet (2 columns), Mobile (1 column).
- [x] **TypeScript check passes**: `npx tsc --noEmit` exits with code 0.
- [x] **ESLint check passes**: `npx eslint .` exits with code 0.
- [x] **Production web export succeeds**: `npx expo export --platform web` generates complete static `dist/`.

---

## 📄 License
MIT © 2026 TERRA — Travel Explorer India. Built for GDGC VNRVJIET.
