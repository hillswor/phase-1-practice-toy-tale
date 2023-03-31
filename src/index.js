document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionContainer = document.querySelector("#toy-collection");
  const addToyForm = document.querySelector("form.add-toy-form");
  let addToy = false;

  //Functions

  function createToyCard(toy) {
    const div = document.createElement("div");
    const hTwo = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const btn = document.createElement("button");
    div.setAttribute("class", "card");
    hTwo.textContent = toy.name;
    img.setAttribute("src", toy.image);
    img.setAttribute("class", "toy-avatar");
    p.textContent = `${toy.likes} Likes`;
    btn.setAttribute("class", "like-btn");
    btn.setAttribute("id", toy.id);
    btn.textContent = "Like ❤️";
    btn.addEventListener("click", () => {
      addLike(toy, p);
    });
    div.appendChild(hTwo);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);
    toyCollectionContainer.appendChild(div);
  }
  //takes toy and p created in createToyCard()
  function addLike(toy, p) {
    toy.likes += 1;
    p.textContent = `${toy.likes} Likes`;
    const configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy),
    };
    fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject)
      .then((response) => response.json())
      .then((updatedToy) => {});
  }

  //Fetches all toys or main

  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toysObj) => {
      toysObj.forEach((toy) => createToyCard(toy));
    });

  //eventListeners

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target.name.value);
    const newToyToPost = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyToPost),
    };
    fetch("http://localhost:3000/toys", configurationObject)
      .then((response) => response.json())
      .then((toy) => {
        createToyCard(toy);
      });
  });
  addToyForm.reset();
});
