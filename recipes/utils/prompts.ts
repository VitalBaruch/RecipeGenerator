export const sendAndCheckIngridients = (ingridients : string[]) => {
    const prompt = `Please assume you have access to recipe database
     ans answer with the information you have also answer me in JSON format like that :
     {"recipes" : [ array of recipes each recipe is a json formated like that:
        {
        "name" : name of recipe,
        "ingredients": array json of the ingredients like that {name, quantity},
        "instructions" array of the instructions
     }]},
     given the ingridients: ${ingridients.map((ing => `${ing} `))}
     give me 2 to 5 recipes that can be made using only those ingridients 
     give the instructions to each recipe`
    return prompt
}