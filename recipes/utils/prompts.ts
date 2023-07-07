export const sendAndCheckIngridients = (ingridients : string[]) => {
    const prompt = `Please assume you have access to a recipe database
     and answer with the information you have, also answer me in JSON format like that:
     {"recipes" : [ array of recipes each recipe is a json formated like that:
        {
        "name" : name of recipe,
        "ingredients": array of ingredients formated in JSON like that: {name, quantity},
        "instructions": array of the instructions
     }]},
     given the ingredients: ${ingridients.map((ing => `${ing} `))}
     if one of the ingredients is not a valid ingredient name or you can't generate any
     recipe return a recipe for pita with hummus only
     else give me 2 to 5 recipes that can be made using only those ingredients`
    return prompt
}

export const sendAndCheckDescription = (description: string) => {
    const prompt = `Please assume you have access to a recipe database
     and answer with the information you have, also answer me in JSON format like that:
     {"recipes" : [ array of recipes each recipe is a json formated like that:
        {
        "name" : name of recipe,
        "ingredients": array of ingredients formated in JSON like that: {name, quantity},
        "instructions": array of the instructions
     }]},
     given the description for the recipe: ${description}
     if the description is not valid or you can't generate any
     recipe return a recipe for pita with hummus only
     else give me 2 to 5 recipes that can be made that are simillar to the description`
    return prompt
}