export interface User {
  id: string;
  email: string;
  image: string;
  userId: string;
  name: string;
  role: "customer" | "owner";
  restaurantId: string;
}

export interface PostUserFields {
  name: string;
  userId: string;
  image: string;
  email: string;
}

export interface CreateRestaurantFields {
  restaurant_name: string;
  tables: boolean[];
  opening_time: string;
  closing_time: string;
  restaurant_image: string;
}
