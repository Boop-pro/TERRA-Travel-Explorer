export type Category = 'All' | 'Beaches' | 'Mountains' | 'Heritage' | 'Adventure';

export type BudgetLevel = 'Budget' | 'Moderate' | 'Luxury';

export type TripDuration = 'Weekend' | '1 Week' | '2+ Weeks';

export interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  photoCredit?: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  category: Exclude<Category, 'All'>;
  description: string;
  longDescription: string;
  bestTimeToVisit: string;
  heroImageUrl: string;
  thumbnailUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  budget: BudgetLevel;
  duration: TripDuration;
  idealFor: string[];
  highlights: string[];
  attractions: [Attraction, Attraction, Attraction]; // Strictly 3 attractions per spec
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  iconName: string;
  isDaytime: boolean;
  timeFetched: string;
}

export interface MatcherAnswer {
  category?: Exclude<Category, 'All'>;
  budget?: BudgetLevel;
  duration?: TripDuration;
}

export interface MatchResult {
  destination: Destination;
  score: number; // 0-100
  matchReason: string;
  highlights: string[];
}
