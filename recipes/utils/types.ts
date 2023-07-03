export interface ingredient {
    name : string,
    quantity: string
}

export interface recipeReturn {
    name : string,
    ingredients : ingredient[],
    instructions : string[],
    base64Image : string
}

export interface recipeSend {
    name : string,
    ingredients : ingredient[],
    instructions : string[]
}