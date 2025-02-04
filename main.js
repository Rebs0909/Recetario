let form = document.getElementById("form"); //this links the form variable to the form element from my Html file, and the next lines of code do the same for a different element
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

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
  if (input.value === "") {
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
  data["title"] = input.value;
  data["text"] = input2.value;
  console.log(data);
  createPost();
};

let createPost = () => {
  posts.innerHTML += `
  <div>
    <p>${data.title}</p>
    <p>${data.text}</p>
    <span class="options">
      <i onClick="editPost(this)" class="fas fa-edit"></i>
      <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;
  input.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};
`<i onClick="deletePost(this)" class="fas fa-trash-alt"></i>`;

let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};
