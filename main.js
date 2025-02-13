let form = document.getElementById("form"); //this links the form variable to the form element from my Html file, and the next lines of code do the same for a different element
let title = document.getElementById("title");
let ingredients = document.getElementById("ingredients");
let instructions = document.getElementById("instructions");
let msg = document.getElementById("msg");
let msg2 = document.getElementById("msg2");
let recipeList = document.getElementById("recipeList");
let inventory = document.getElementById("inventory");

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

let currentEditIndex = -1;

let editPost = (e) => {
  let recipeDiv = e.parentElement.parentElement;
  let recipeTitle = recipeDiv.querySelector("h3").innerText;
  let recipeIngredients = recipeDiv
    .querySelector("p:nth-of-type(1)")
    .innerText.replace("Ingredients: ", "");
  let recipeInstructions = recipeDiv
    .querySelector("p:nth-of-type(2)")
    .innerText.replace("Instructions: ", "");

  title.value = recipeTitle;
  ingredients.value = recipeIngredients;
  instructions.value = recipeInstructions;

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  currentEditIndex = recipes.findIndex((r) => r.title === recipeTitle);
  if (currentEditIndex !== -1) {
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
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
  // this forEach function loops through the recipes array and displays a <div> for each recipe
  recipes.forEach((recipe, index) => {
    let recipeElement = document.createElement("div");

    recipeElement.innerHTML = `<div>
    
    <h3>${recipe.title}</h3>
    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    <button onclick="editPost(this)">Edit</button>
    <button onclick="deleteRecipe(${index})">Delete</button>
    <br></br>
    
  </div>`;
    container.appendChild(recipeElement);
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
window.onload = loadRecipes;

//-------------This is the inventory block----------------
//
//
//
inventory.addEventListener("submit", (e) => {
  e.preventDefault();
  inventoryValidation();
});

let inventoryValidation = () => {
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  if (title.value === "") {
    msg2.innerHTML = "Field can't be blank";
  } else {
    msg2.innerHTML = "";
    acceptInventoryData();
  }
};

let acceptInventoryData = () => {
  let ingredientList = JSON.parse(localStorage.getItem("ingredientList")) || [];
  let newIngredient = {
    ingredientItem: inventory.value,
  };
};
