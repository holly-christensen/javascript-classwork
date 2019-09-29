//js for the visuals on the site, making the ingredient tiles
var selected = [];

function makeTiles() {
    ingredients.forEach(function(element) {
        var inputElement = document.createElement("div");
        inputElement.innerHTML = element.name;
        inputElement.setAttribute("class", "tile");
        inputElement.setAttribute("id", element.name);
        inputElement.addEventListener("click", function() {
            addToSelected(element.name);
        });
        document.getElementById("tiles").appendChild(inputElement);
    });
}

makeTiles();

function makeRecipeTiles(recipeList) {
    recipeList.forEach(function(element) {
        var inputElement = document.createElement("a");
        inputElement.innerHTML = element.name;
        inputElement.setAttribute("class", "recipeTile");
        inputElement.setAttribute("id", element.name);
        inputElement.setAttribute("href", element.link);
        document.getElementById("recipeTiles").appendChild(inputElement);
    });
}

function addToSelected(targetName) {
    var result = inSelected(targetName);
    if (result != -1) {
        document.getElementById(targetName).style.backgroundColor =
            "rgb(200, 206, 230)";
        selected.splice(result);
    } else {
        var ingredient = find(ingredients, targetName);
        selected.push(ingredient);
        document.getElementById(targetName).style.backgroundColor =
            "rgb(152, 162, 204)";
    }
}

function inSelected(targetName) {
    for (var i = 0; i < selected.length; i++) {
        if (targetName == selected[i].name) {
            //if it is in selected, return the index
            return i;
        }
    }
    //if it's not in selected
    return -1;
}