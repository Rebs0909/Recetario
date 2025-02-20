let form = document.getElementById("form"); //this links the form variable to the form element from my Html file, and the next lines of code do the same for a different element
let title = document.getElementById("title");
let ingredients = document.getElementById("ingredients");
let instructions = document.getElementById("instructions");
let msg = document.getElementById("msg");
let msg2 = document.getElementById("msg2");
let recipeList = document.getElementById("recipeList");
let inventoryItem = document.getElementById("inventoryItem");
let ingredientListDisplay = document.getElementById("ingredientListDisplay");
let ingredientMatch = [];
let currentEditInventoryIndex = -1;
let currentEditIndex = -1;
//this listens for a submit event on the form element.
form.addEventListener("submit", (e) => {
  //prevents the default form submission, which would reload the page
  e.preventDefault();
  console.log(e);

  console.log("button clicked");

  //this block is a function that checks if the input field(input.value) is empty to-
  //determine if it should print failure or success in submitting the recipe
  formValidation();
});
let formValidation = () => {
  // first the function loads the recipes array and assigns it as the value of the recipes variable
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  //this conditional if checks if the values for the input fields are filled out
  if (
    title.value === "" ||
    ingredients.value === "" ||
    instructions.value === ""
  ) {
    // if there is an empty field a message is displayed and the recipe is not stored
    msg.innerHTML = "Post cannot be blank";
    console.log("failure");
  }
  //This checks if the recipe name has already been used to avoid duplicates.
  else if (
    currentEditIndex === -1 &&
    recipes.some(
      (recipe) => recipe.title.toLowerCase() === title.value.toLowerCase()
    )
  ) {
    msg.innerHTML = "Recipe already exists!";
    console.log("Duplicate recipe");
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
  }
};
//this block accepts the data
let data = {};

// This block of code takes the data and stores it in the recipes array
// in the localStorage, or it creates a new array called recipes

let acceptData = () => {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  // Object newRecipe stores 3 properties: title, ingredients and instructions
  let newRecipe = {
    title: title.value,
    ingredients: ingredients.value.split(", "),
    instructions: instructions.value,
  };

  // This if conditional determines whether to add a new recipe or update
  // on in the recipes array. If the currentEditIndex is -1, it means
  // that no existing recipe is being edited.
  // In this case, newRecipe is added to the recipes array with .push()
  // if currentEditIndex is not -1, it means an existing recipe is being
  // edited, then the recipes array is updated at currentEditIndex
  // with newRecipe, then currentEditIndex is reset to -1
  if (currentEditIndex === -1) {
    recipes.push(newRecipe);
  } else {
    recipes[currentEditIndex] = newRecipe;
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
    currentEditIndex = -1;
  }
  // This saves the recipes to local storage, reloading the recipe list
  // and clearing the input fields.
  // first it stores a value in the browser's local storage
  // "recipes" is the key under which the data is stored.

  localStorage.setItem("recipes", JSON.stringify(recipes));
  // This loads and displays the recipes by calling the loadRecipes function
  loadRecipes();

  // This clears the values from the input fields.
  title.value = "";
  ingredients.value = "";
  instructions.value = "";
};

let deletePost = (e) => {
  e.closest("div").remove();
};
`<i onClick="deletePost(this)" class="fas fa-trash-alt"></i>`;

let editPost = (e) => {
  //This assigns the recipeDiv local variable the value of the
  //  parent of the parent of the edit button, which is the whole recipe div
  let recipeDiv = e.parentElement.parentElement;
  // This assigns the variable recipeTitle the value of the h3 tag in the HTML code
  let recipeTitle = recipeDiv.querySelector("h3").innerText;

  // let ingredientInStock = recipeDiv.querySelector(".ingredientInStock");
  // let missingIngredient = recipeDiv.querySelector(".missingIngredient");
  // let recipeIngredients = (ingredientInStock) =>
  //   missingIngredient
  //     .join()
  let ingredientsInStock = [...recipeDiv.querySelectorAll(".ingredientInStock")]
    .map((el) => el.innerText)
    .join(", ");

  let missingIngredients = [...recipeDiv.querySelectorAll(".missingIngredient")]
    .map((el) => el.innerText)
    .join(", ");

  let recipeIngredients = ingredientsInStock + "" + missingIngredients;

  // recipeIngredients = recipeIngredients.innerText.replace("Ingredients: ", "");

  let recipeInstructions = recipeDiv
    .querySelector(".instructions")
    .innerText.replace("Instructions: ", "");

  title.value = recipeTitle;
  ingredients.value = recipeIngredients;
  instructions.value = recipeInstructions;

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  currentEditIndex = recipes.findIndex((r) => r.title === recipeTitle);
  // if (currentEditIndex !== -1) {
  //   recipes.splice(currentEditIndex, 1);
  //   localStorage.setItem("recipes", JSON.stringify(recipes));
  // }
  loadRecipes();
};

//This function saves the recipe in local storage by taking 3 values
function saveRecipe(title, ingredients, instructions) {
  //recipes variable gets assigned the value of the array from storage or makes a new array
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  //this push function adds the function parameters to the array
  recipes.push({ title, ingredients, instructions });
  //setItem function saves the data as a string in the recipes variable
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

//this function loads the recipes from local storage
function loadRecipes() {
  //recipes variable is assigned the value of the recipes variable from local storage-
  //or makes or makes a new array
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  //container gets the HTML element where the recipes will be displayed
  let container = document.getElementById("recipeList");
  //this clears any previously displayed recipes
  container.innerHTML = "";
  // compareIngredients();

  let ingredientList =
    JSON.parse(localStorage.getItem("ingredientList")).map((ingredient) => {
      return ingredient.ingredientItem;
    }) || [];
  let ingredientInStock = [];
  let missingIngredient = [];
  // for (let i = 0; i < recipes.length; i++) {
  //   for (let e = 0; e < recipes[i].ingredients.length; e++) {
  //     if (ingredientList.includes(recipes[i].ingredients[e])) {
  //       console.log(recipes[i].ingredients[e]);
  //       ingredientInStock.push(recipes[i].ingredients[e]);
  //     } else {
  //       missingIngredient.push(recipes[i].ingredients[e]);
  //     }
  //   }

  // this forEach function loops through the recipes array and displays a <div> for each recipe
  recipes.forEach((recipe, index) => {
    let recipeElement = document.createElement("div");

    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (ingredientList.includes(recipe.ingredients[i])) {
        console.log(recipe.ingredients[i]);
        ingredientInStock.push(recipe.ingredients[i]);
      } else {
        missingIngredient.push(recipe.ingredients[i]);
      }
    }

    // if (recipes.ingredients.forEach.includes(ingredientMatch))
    recipeElement.innerHTML = `<div>
    
    <h3>${recipe.title}</h3>
    <div class="ingredientInStock" id="ingredientInStock"> 
      <strong>Ingredients:</strong>
      <p>${ingredientInStock} </p></div>
    <div class="missingIngredient" id="missingIngredient">
      
      <p>${missingIngredient} </p></div>
    <div class="instructions" id="instructions">
      <p><strong>Instructions:</strong> ${recipe.instructions}</p></div>
    <button onclick="editPost(this)">Edit</button>
    <button onclick="deleteRecipe(${index})">Delete</button>
    <br></br>
    
  </div>`;
    container.appendChild(recipeElement);
    ingredientInStock = [];
    missingIngredient = [];
  });
}

// this function deletes the recipes
function deleteRecipe(index) {
  // the recipes array is assigned to the recipes variable
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  // this splice function removes an element from the recipes array
  recipes.splice(index, 1);
  //this updates the local storage and saves it as a string
  localStorage.setItem("recipes", JSON.stringify(recipes));
  loadRecipes();
}
//this displays the recipes when the page is loaded
window.onload = () => {
  loadRecipes();
  loadIngredients();
};

//-------------This is the inventory block----------------
//
//
//
document.getElementById("inventoryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  inventoryValidation();
});

let inventoryValidation = () => {
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  if (inventoryItem.value === "") {
    msg2.innerHTML = "Field can't be blank";
  } else {
    msg2.innerHTML = "";
    acceptInventoryData();
  }
};

let acceptInventoryData = () => {
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  let newIngredient = {
    ingredientItem: inventoryItem.value,
  };

  if (currentEditInventoryIndex === -1) {
    ingredientList.push(newIngredient);
  } else {
    ingredientList[currentEditInventoryIndex] = newIngredient;
    localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
    loadIngredients();
    currentEditInventoryIndex = -1;
  }
  localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
  // This loads and displays the recipes by calling the loadRecipes function
  loadIngredients();

  // This clears the values from the input fields.
  inventoryItem.value = "";
};

let editInventoryItem = (e) => {
  let ingredientInventoryItem = e.parentElement.querySelector("h5").innerText;

  inventoryItem.value = ingredientInventoryItem;
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];

  currentEditInventoryIndex = ingredientList.findIndex(
    (r) => r.ingredientItem === ingredientInventoryItem
  );

  // if (currentEditInventoryIndex !== -1) {
  //   ingredientList.splice(currentEditInventoryIndex, 1);
  //   localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
  // }
  loadIngredients();
};
function saveIngredient(inventoryItem) {
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  ingredientList.push({ ingredientItem: inventoryItem }); // Use 'ingredientItem'
  localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
}
function loadIngredients() {
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  let bottomBox = document.getElementById("ingredientListDisplay");
  bottomBox.innerHTML = "";

  ingredientList.forEach((inventoryItem, index) => {
    let ingredientElement = document.createElement("div");
    ingredientElement.innerHTML = `<div>
    <h5>${inventoryItem.ingredientItem}</h5>
    <button onclick="editInventoryItem(this)">Edit</button>
    <button onclick="deleteInventoryItem(${index})">Delete</button>
    <br></br>
    </div>`;
    bottomBox.appendChild(ingredientElement);
  });
}
function deleteInventoryItem(index) {
  // the recipes array is assigned to the recipes variable
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  // this splice function removes an element from the recipes array
  ingredientList.splice(index, 1);
  //this updates the local storage and saves it as a string
  localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
  loadIngredients();
}

//this function compares the ingredients and the inventory, then changes font color to reflect missing ingredients

// function compareIngredients() {
//   let ingredientList =
//     JSON.parse(localStorage.getItem("ingredientList")).map((ingredient) => {
//       return ingredient.ingredientItem;
//     }) || [];
//   console.log(ingredientList);
//   let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
//   console.log(recipes);
//   let ingredientInRecipe = [];
//   for (let i = 0; i < recipes.length; i++) {
//     for (let e = 0; e < recipes[i].ingredients.length; e++) {
//       if (ingredientList.includes(recipes[i].ingredients[e])) {
//         console.log(recipes[i].ingredients[e]);
//         ingredientMatch.push(recipes[i].ingredients[e]);
//       }
//     }
//   }
//   console.log(ingredientMatch);
// recipes.forEach(checkIfSame);
// function checkIfSame(recipes, ingredientList) {
//   if (recipes.ingredients[index] === ingredientList.ingredientItem[index]) {
//     console.log(recipes.ingredients[index]);
//   }
// }

// console.log(ingredientInRecipe);
// let ingredientItem = [];
// let checkIfSame = ingredientInRecipe.filter((element) =>
//   ingredientList.includes(element)
// );
// console.log(checkIfSame);
// for (let i = 0; i < recipes.length; i++) {
//   ingredientInRecipe[i] = recipes[i].ingredients;
//   console.log(ingredientInRecipe);
//   ingredientItem[i] = ingredientList[i].ingredientItem;
//   console.log(ingredientInRecipe[i]);
//   console.log(ingredientItem[i]);
// }
