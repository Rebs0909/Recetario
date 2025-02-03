let form = document.getElementById("form"); //this links the form variable to the form element from my Html file, and the next lines of code do the same for a different element
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

//this listens for a submit event on the form element.
form.addEventListener("submit", (e) => {
  //prevents the default form submission, which would reload the page
  e.preventDefault();
  console.log("button clicked");

  //this block is a function that checks if the imput field(input.value) is empty to-
  //determine if it should print failure or success
  formValidation();
});
let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Post cannot be blank";
    console.log("failure");
  } else {
    console.log("success");
    msg.innerHTML = "";
  }
};
//this block accepts the data ** it-s incomplete!!**
let data = {};

let acceptData = () => {
  data["text"] = input.value;
  console.log(data);
};
