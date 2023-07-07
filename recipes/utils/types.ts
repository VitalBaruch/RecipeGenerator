export interface ingredient {
    name : string,
    quantity: string
}

export interface recipe {
    name : string,
    ingredients : ingredient[],
    instructions : string[],
    base64Image : string
}

export interface user {
    userName: string,
    email: string,
    recipesArray: recipe[]
}