document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionContainer = document.querySelector("#toy-collection");
  const addToyForm = document.querySelector("form.add-toy-form");
  let addToy = false;

  function createToyCard(toysObj) {
    toysObj.forEach((toy) => {
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
      div.appendChild(hTwo);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(btn);
      toyCollectionContainer.appendChild(div);
    });
  }

  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toysObj) => {
      createToyCard(toysObj);
    });

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
