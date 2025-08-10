export interface Restaurants {
  name: string;
  address: string;
  postalCode: number;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  categories: string[];
  openingHours: OpeningHour[];
  restaurantImages: RestaurantImage[];
  description: string;
}

export interface OpeningHour {
  daysOfWeek: string;
  openTime: Date;
  closeTime: Date;
  isClosed: boolean;
}

export interface RestaurantImage {
  link: string;
}
