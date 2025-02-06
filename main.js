let form = document.getElementById("form"); //this links the form variable to the form element from my Html file, and the next lines of code do the same for a different element
let title = document.getElementById("title");
let ingredients = document.getElementById("ingredients");
let instructions = document.getElementById("instructions");
let msg = document.getElementById("msg");
let recipeList = document.getElementById("recipeList");

//this listens for a submit event on the form element.
form.addEventListener("submit", (e) => {
  //prevents the default form submission, which would reload the page
  e.preventDefault();
  console.log(e);

  console.log("button clicked");

  //this block is a function that checks if the input field(input.value) is empty to-
  //determine if it should print failure or success
  formValidation();
});
let formValidation = () => {
  if (
    title.value === "" ||
    ingredients.value === "" ||
    instructions.value === ""
  ) {
    msg.innerHTML = "Post cannot be blank";
    console.log("failure");
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
  }
};
//this block accepts the data
let data = {};

let acceptData = () => {
  data["title"] = title.value;
  data["ingredients"] = ingredients.value;
  data["instruct"] = instructions.value;
  console.log(data);
  saveRecipe(data.title, data.ingredients, data.instructions);
  createPost();
};

let createPost = () => {
  loadRecipes();
  recipeList.innerHTML += `
  <div>
    <p>${data.title}</p>
    <p>${data.ingredients}</p>
    <p>${data.instructions}</p>
    <span class="options">
      <i onClick="editPost(this)" class="fas fa-edit"></i>
      <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;
  title.value = "";
  ingredients.value = "";
  instructions.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};
`<i onClick="deletePost(this)" class="fas fa-trash-alt"></i>`;

let editPost = (e) => {
  let recipeDiv = e.parentElement.parentElement;
  let recipeTitle = recipeDiv.querySelector("h3").innerText;
  let recipeIngredients = recipeDiv
    .querySelector("p:nth-of=type(1)")
    .innerText("Ingredients: ", "");
  let recipeInstructions = recipeDiv
    .querySelector("p:nth-of=type(2)")
    .innerText("Ingredients: ", "");

  title.value = recipeTitle;
  ingredients.value = recipeIngredients;
  instructions.value = recipeInstructions;

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  let index = recipes.findIndex((r) => r.title === recipeTitle);
  if (index !== -1) {
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
    <button onclick="deleteRecipe(${index})">Delete</button>
  </div>`;
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
