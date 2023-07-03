import { Schema, model, models } from "mongoose";

const ingredient = new Schema({
    name: String,
    quantity: String
})

const recipe = new Schema({
    name: String,
    ingredients: [ingredient],
    instructions: [String]
})

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email : {
        type : String,
        require: true,
        unique : true
    },
    password: {
        type: String,
        require: true
    },
    recipesArray: [recipe]
})

const Users = models.Users || model('Users', userSchema)

export default Users;