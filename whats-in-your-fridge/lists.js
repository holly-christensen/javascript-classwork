//add ingredients for all of the ingredients in the list of recipes
function initIngredients() {
    //for every recipe
    recipes.forEach(function(recipe) {
        //for every ingredient in this recipe
        recipe.list.forEach(function(ingredient) {
            console.log(ingredient);
            if (ingredientExists(ingredient)) {
                updateList(ingredient, recipe);
            } else {
                addIngredient(ingredient, recipe);
            }
        });
    });
    ingredients.sort(function(a, b) {
        return ("" + a.name).localeCompare(b.name);
    });
}

//adds or updates the list of ingredients
function addIngredient(targetName, recipe) {
    var newIngredient = {
        name: targetName,
        // alt: targetName
        list: [recipe]
    };
    ingredients.push(newIngredient);
}

//update an ingredient's list of recipes
function updateList(targetName, recipe) {
    console.log(find(ingredients, targetName));
    if (find(ingredients, targetName) != false) {
        find(ingredients, targetName).list.push(recipe);
    } else {
        console.log("else");
    }
    console.log("list:");
    console.log(find(ingredients, targetName).list);
}

//determine whether the given ingredient already exists
function ingredientExists(targetName) {
    var exists = false;
    ingredients.forEach(function(element) {
        if (element.name === targetName) {
            exists = true;
        }
    });
    return exists;
}

// initIngredients();