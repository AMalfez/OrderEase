export interface UserFields {
  id: string;
  email: string;
  image: string;
  userId: string;
  profile_photo: string;
  name: string;
  password: string;
  role: "customer" | "owner";
  restaurantId: string;
}
