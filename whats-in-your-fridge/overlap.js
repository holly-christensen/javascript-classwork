// returns a list of all recipies that contain all of the ingredients on the given list
function overlap(list) {
    var overlapping = list[0].list;
    for (var i = 0; i < list.length; i++) {
        overlapping = filter(overlapping, list[i].list);
    }
    return overlapping;
}

// returns a new array, only with elements that are in both of the given lists
function filter(list1, list2) {
    var overlap = [];
    var shorter = list1;
    var longer = list2;

    if (list1.length > list2.length) {
        shorter = list2;
        longer = list1;
    }

    for (var i = 0; i < shorter.length; i++) {
        for (var j = 0; j < longer.length; j++) {
            if (shorter[i] == longer[j]) {
                overlap.push(shorter[i]);
            }
        }
    }
    return overlap;
}

// sorts the list of ingredients alphabetically by their name
ingredients.sort(function(a, b) {
    return ("" + a.name).localeCompare(b.name);
});

//sorts the list of recipes alphabetically by their title
recipes.sort(function(a, b) {
    return ("" + a.name).localeCompare(b.name);
});

//find the given item in the given list, by name
function find(list, target) {
    return findHelp(list, target, 0, list.length);
}

//helper for find
//TODO: sometimes throws error for invalid target
function findHelp(list, target, lowIdx, highIdx) {
    var midIdx = Math.floor((highIdx + lowIdx) / 2);
    if (list[midIdx].hasOwnProperty("name")) {
        var compare = ("" + target).localeCompare(list[midIdx].name);
    } else {
        compare = -1;
    }

    if (lowIdx >= highIdx) {
        //not found
        return -1;
    } else if (compare > 0) {
        //too low
        return findHelp(list, target, midIdx + 1, highIdx);
    } else if (compare < 0) {
        //too high
        return findHelp(list, target, lowIdx, midIdx);
    } else {
        //found it
        return list[midIdx];
    }
}

function getRecipes() {
    console.log("getting recipes :)");
    console.log(overlap(selected));
    clearRecipeTiles();
    makeRecipeTiles(overlap(selected));
}

function clearSelected(targetName) {
    for (var i = 0; i < selected.length; i++) {
        document.getElementById(selected[i].name).style.backgroundColor =
            "rgb(200, 206, 230)";
    }
    selected.length = 0;
    clearRecipeTiles();
}

function clearRecipeTiles() {
    document.getElementById("recipeTiles").innerHTML = null;
}