export function getIngredients(ingredients:string):Array<string> {
    const ingredientArray=ingredients.split(',');
    return ingredientArray
}