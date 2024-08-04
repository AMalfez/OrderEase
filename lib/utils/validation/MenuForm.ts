import * as yup from "yup";

export const MenuSchema = yup.object({
    name: yup.string().min(3, "Item name can't be less than 3 characters.").nonNullable("Item name required."),
    image: yup.string().min(3, "Please upload valid photo").nonNullable("Item image is required."),
    category: yup.string().min(3, "Should be more than 3 characters").nonNullable("This field is required."),
    price: yup.number().nonNullable("This field is required."),
    quantity_per_price: yup.string().nonNullable("This field is required."),
    available_quantities: yup.string().nonNullable("This field is required.")
})