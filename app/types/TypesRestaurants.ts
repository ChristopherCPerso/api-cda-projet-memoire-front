export interface Restaurants {
  id: number;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  user: User;
  categories: Category[];
  openingHours: OpeningHour[];
  restaurantImages: RestaurantImage[];
  reviews: Review[];
  description: string;
  phone: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface OpeningHour {
  id: number;
  daysOfWeek: string;
  openTime: Date;
  closeTime: Date;
  isClosed: boolean;
}

export interface RestaurantImage {
  id: number;
  link: string;
}

export interface Review {
  id: number;
  rating: number;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
}
