//get Element
const input = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const userSection = document.getElementById("userSection");

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
    console.log(data);

    if (!response.ok) {
      alert("Please enter a correct username!");
      throw new Error("User not found...");
    } else {
      //create element
      const avatarDiv = document.createElement("div");
      const infoDiv = document.createElement("div");
      const name = document.createElement("h2");
      const login = document.createElement("p");
      const numberOfFollowers = document.createElement("p");
      const bio = document.createElement("h3");
      const img = document.createElement("img");
      const link = document.createElement("a");
      const followerList = document.createElement("ul");

      try {
        const followerRequest = await fetch(
          `https://api.github.com/users/${input.value.trim()}/followers`
        );
        const followerData = await followerRequest.json();
        if (!followerRequest.ok) {
          throw new Error("Error...");
        } else {
          followerData.forEach((follower) => {
            const followers = document.createElement("li");
            const followersLink = document.createElement("a");
            followers.innerText = follower.login;
            followersLink.href = `https://github.com/${follower.login}`;
            followersLink.target = "_blank";

            followerList.appendChild(followersLink);
            followersLink.appendChild(followers);
          });
        }
      } catch (error) {
        console.error(error);
      }

      //elemente füllen
      name.innerText = data.name;
      login.innerText = `Login: ${data.login}`;
      numberOfFollowers.innerText = `Followers: ${data.followers}`;
      bio.innerText = data.bio;
      img.src = data.avatar_url;
      link.href = `https://github.com/${input.value.trim()}`;
      link.target = "_blank";

      //Klasse hinzufügen
      img.classList.add("flip-horizontal-bottom");
      infoDiv.classList.add("info");
      avatarDiv.classList.add("avatar");

      //elemente verknüpfen
      userSection.appendChild(avatarDiv);
      userSection.appendChild(infoDiv);

      avatarDiv.appendChild(link);
      link.appendChild(img);

      infoDiv.appendChild(name);
      infoDiv.appendChild(bio);
      infoDiv.appendChild(login);
      infoDiv.appendChild(numberOfFollowers);
      infoDiv.appendChild(followerList);
    }
  } catch (error) {
    console.error(error);
  }
  input.value = "";
}

function removeGithubUser() {
  while (userSection.firstChild) {
    userSection.removeChild(userSection.lastChild);
  }
}
