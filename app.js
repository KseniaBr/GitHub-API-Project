//get Element
const input = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const user = document.getElementById("user");

//EventListener
searchBtn.addEventListener("click", getGithubUser);
clearBtn.addEventListener("click", removeGithubUser);

//async function
async function getGithubUser() {
  try {
    const response = await fetch(`https://api.github.com/users/${input.value}`);
    const data = await response.json();

    input.value = "";

    if (!response.ok) {
      alert("Please enter a correct username!");
      throw new Error("Failed!");
    } else {
      //create element
      const infoDiv = document.createElement("div");
      const avatarDiv = document.createElement("div");
      const name = document.createElement("h2");
      const login = document.createElement("p");
      const img = document.createElement("img");

      //elemente füllen
      name.innerText = data.name;
      login.innerText = data.login;
      img.src = data.avatar_url;

      //elemente verknüpfen
      user.appendChild(avatarDiv);
      user.appendChild(infoDiv);
      avatarDiv.appendChild(img);
      infoDiv.appendChild(name);
      infoDiv.appendChild(login);
    }
  } catch (error) {
    console.error(error);
  }
}

function removeGithubUser() {
  while (user.firstChild) {
    user.removeChild(user.lastChild);
  }
}
