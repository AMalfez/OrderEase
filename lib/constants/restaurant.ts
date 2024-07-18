export interface Restaurant {
  id: string;
  ownerId: string;
  restaurant_name: string;
  tables: boolean[];
  opening_time: string;
  closing_time: string;
  isOpen: boolean;
  rating: string;
  restaurant_image: string;
}
