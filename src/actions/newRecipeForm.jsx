// synchronous actions

export const updateNewRecipeForm = formData => {
    return {
        type: "UPDATE_NEW_RECIPE_FORM",
        formData
    }
}
export const addIngredient = ingredient => {
    return {
        type: "UPDATE_INGREDIENT_FORM",
        formData
    }
}

// export const updateIngredients = (name, value) => {
//     const formData = { name, value }
//     console.log("formData in the action creator", formData)
//     return {
//         type: "UPDATE_INGREDIENTS",
//         formData
//     }
// }