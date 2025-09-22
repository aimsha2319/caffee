export type TrustTier = 'new' | 'growing' | 'established' | 'expert';

export interface User {
  id: string;
  name: string;
  handle: string;
  photoUrl?: string;
  isCreator: boolean;
  isOwner: boolean;
  bio?: string;
  dietPreferences: string[];
  trustScore: number;
  trustTier: TrustTier;
  createdAt: string;
}

export interface PlaceHours {
  day: number; // 0-6
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface SocialLink {
  type: 'instagram' | 'tiktok' | 'website' | 'facebook';
  url: string;
}

export interface Place {
  id: string;
  name: string;
  geohash: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
  cuisineTags: string[];
  priceLevel: number;
  amenities: string[];
  hours: PlaceHours[];
  ownerId?: string;
  claimStatus: 'unclaimed' | 'pending' | 'verified';
  photos: string[];
  social?: SocialLink[];
  phone?: string;
  website?: string;
  ratingSummary?: RatingSummary;
  menuHighlights?: MenuItemSummary[];
  coffeeProfile?: CoffeeProfile;
}

export interface MenuItemSummary {
  menuItemId: string;
  name: string;
  averageRating: number;
  reviewCount: number;
}

export interface CoffeeProfile {
  roaster?: string;
  origin?: string;
  process?: string;
  brewMethods?: string[];
  grinder?: string;
  waterProfile?: string;
  mouthfeelAvg?: number;
}

export interface MenuItem {
  id: string;
  placeId: string;
  name: string;
  category: string;
  price?: number;
  allergens: string[];
  isCoffeeSpecific?: boolean;
  roaster?: string;
  process?: string;
  brewMethods?: string[];
}

export interface RatingAspects {
  food?: number;
  service?: number;
  ambience?: number;
  value?: number;
  consistency?: number;
  coffee?: number;
}

export interface RatingSummary {
  overall: number;
  totalReviews: number;
  breakdown: RatingAspects;
}

export interface ReviewMedia {
  id: string;
  userId: string;
  placeId?: string;
  reviewId?: string;
  type: 'photo' | 'video';
  url: string;
  width: number;
  height: number;
  duration?: number;
  alt?: string;
}

export interface ReviewItemRating {
  menuItemId: string;
  rating: number;
  notes?: string;
}

export type VisitType = 'dine_in' | 'take_out' | 'delivery';

export interface ReviewContext {
  visitType: VisitType;
  partySize?: number;
  visitedAt: string;
  waitMinutes?: number;
}

export interface Review {
  id: string;
  placeId: string;
  userId: string;
  overall: number;
  aspects: RatingAspects;
  text?: string;
  context?: ReviewContext;
  media: ReviewMedia[];
  itemsReviewed: ReviewItemRating[];
  isVerifiedVisit: boolean;
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  reviewId: string;
  parentId?: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Reaction {
  id: string;
  entityType: 'review' | 'comment' | 'place';
  entityId: string;
  userId: string;
  type: 'like' | 'helpful' | 'wow';
  createdAt: string;
}

export interface ListItem {
  placeId: string;
  note?: string;
  addedAt: string;
}

export interface List {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  isCollaborative: boolean;
  items: ListItem[];
  coverMedia?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  placeId: string;
  requesterId: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  createdAt: string;
  reviewedAt?: string;
}

export interface Report {
  id: string;
  entityType: string;
  entityId: string;
  reporterId: string;
  reason: string;
  details?: string;
  status: 'pending' | 'in_review' | 'resolved';
  resolutionNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  payload: Record<string, unknown>;
  seenAt?: string;
  createdAt: string;
}

export interface FeedCard {
  id: string;
  type: 'review' | 'list' | 'place_update';
  reason: string;
  review?: Review;
  list?: List;
  place?: Place;
}

export interface RankingWeights {
  qualityWeight: number;
  recencyWeight: number;
  trustWeight: number;
  diversityWeight: number;
  consistencyWeight: number;
  mediaWeight: number;
}

export interface RankingToggles {
  freezeOnAlerts: boolean;
  boostVerifiedVisits: boolean;
  suppressAdsInOrganic: boolean;
}

export interface AdminFeatureFlag {
  key: string;
  description: string;
  enabled: boolean;
  updatedAt: string;
}

export interface ModerationQueueItem {
  report: Report;
  assignedTo?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SearchFilters {
  query?: string;
  openNow?: boolean;
  cuisines?: string[];
  diets?: string[];
  priceLevels?: number[];
  vibes?: string[];
  coffeeFilters?: string[];
}

export interface SignedUploadPayload {
  uploadUrl: string;
  assetUrl: string;
  fields?: Record<string, string>;
  expiresAt: string;
}

export interface AnalyticsEventDefinition {
  name: string;
  description: string;
  properties: string[];
}

export const AnalyticsEvents: AnalyticsEventDefinition[] = [
  { name: 'app_open', description: 'App launched by user', properties: [] },
  { name: 'search_performed', description: 'User ran a search query', properties: ['query', 'filters'] },
  { name: 'filter_applied', description: 'Facet filter toggled', properties: ['filter', 'value'] },
  { name: 'place_viewed', description: 'Place detail viewed', properties: ['placeId', 'source'] },
  { name: 'review_started', description: 'User began compose flow', properties: ['placeId'] },
  { name: 'review_posted', description: 'Review successfully submitted', properties: ['placeId', 'mediaCount'] },
  { name: 'list_created', description: 'User created a list', properties: ['listId'] }
];

export const DefaultRankingWeights: RankingWeights = {
  qualityWeight: 0.35,
  recencyWeight: 0.2,
  trustWeight: 0.2,
  diversityWeight: 0.1,
  consistencyWeight: 0.1,
  mediaWeight: 0.05
};

export const DefaultRankingToggles: RankingToggles = {
  freezeOnAlerts: true,
  boostVerifiedVisits: true,
  suppressAdsInOrganic: true
};
