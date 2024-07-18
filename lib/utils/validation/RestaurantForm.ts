import * as yup from "yup";

export const RestaurantSchema = yup.object({
    restaurant_name: yup.string().min(3, "Restaurant name should be atleast 3 characters long").nonNullable("Restaurant name is required."),
    tables: yup.number().min(1,"Tables should be more than 0.").nonNullable("Restaurant name is required."),
    opening_time: yup.string().matches(/^(1[012]|[1-9]):[0-5][0-9] [ap]m$/, { excludeEmptyString: true, message:"Formate of time is invalid" }).nonNullable("Required"),
    closing_time:yup.string().matches(/^(1[012]|[1-9]):[0-5][0-9] [ap]m$/, { excludeEmptyString: true, message:"Formate of time is invalid" }).nonNullable("Required"),
    restaurant_image: yup.string().min(3, "Please upload valid photo").nonNullable("Restaurant image is required."),
    address: yup.string().min(5,"Address should be atleast 5 characters long").nonNullable("This field is required")
})