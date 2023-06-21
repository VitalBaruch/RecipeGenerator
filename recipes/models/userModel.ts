import { Schema, model, models } from "mongoose";
import { string } from "zod";

interface Ingredient {
    name: string,
    quantity: string
}

interface Recipe  {
    name: string,
    ingridients: Ingredient[],
    instructions: string[],
    pictureUrl: string
}

const userSchema = new Schema({
    username: String,
    email : {
        type : String,
        require: true,
        unique : true
    },
    password: String,
    recipesArray : [{
        name: String,
        ingridients: {
            name: String,
            quantity: String
        },
        instructions: [String],
        pictureUrl: String
    }]
})

const Users = models.Users || model('Users', userSchema)

export default Users;