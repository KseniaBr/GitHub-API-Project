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
    const response = await fetch(
      `https://api.github.com/users/${input.value.trim()}`
    );
    const data = await response.json();

    if (!response.ok) {
      alert("Please enter a correct username!");
      throw new Error("User not found...");
    } else {
      //create element
      const infoDiv = document.createElement("div");
      const avatarDiv = document.createElement("div");
      const name = document.createElement("h2");
      const login = document.createElement("p");
      const followers = document.createElement("p");
      const bio = document.createElement("h3");
      const img = document.createElement("img");
      const link = document.createElement("a");

      //elemente füllen
      name.innerText = data.name;
      login.innerText = `Login: ${data.login}`;
      followers.innerText = `Followers: ${data.followers}`;
      bio.innerText = data.bio;
      img.src = data.avatar_url;
      link.href = `https://github.com/${input.value}`;
      link.target = "_blank";

      //Klasse hinzufügen
      img.classList.add("flip-horizontal-bottom");
      infoDiv.classList.add("info");

      //elemente verknüpfen
      user.appendChild(avatarDiv);
      user.appendChild(infoDiv);
      avatarDiv.appendChild(link);
      link.appendChild(img);
      infoDiv.appendChild(name);
      infoDiv.appendChild(bio);
      infoDiv.appendChild(login);
      infoDiv.appendChild(followers);
    }
  } catch (error) {
    console.error(error);
  }
  input.value = "";
}

function removeGithubUser() {
  while (user.firstChild) {
    user.removeChild(user.lastChild);
  }
}
