const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#maincover");

//searching user
// search.addEventListener("keyup", () =>{
//     let value = search.value ;
//     getuser(value);
//     });
const formsubmit = () => {
    const search = document.querySelector("input");
    if(search.value != ""){
        getuser(search.value);
        return false;
    } else{
        alert ("Please enter a valid Username");
    }
}

//getting user data
const getuser = async(username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    console.log(data);
    // if (response.ok){
    //     name.innerHTML= `Name: ${data["name"]}`;
    //     }else{
    //         alert('User not found');
    //         };
    const card = `
            <div id="card">
                <div id="image">
                    <img src="${data.avatar_url}" alt="profile image">
                </div>
                <div class="user-info">
                    <h2 id="name">Name: ${data.login}</h2>
                    <h4>Bio: ${data.bio}</h4>
    
                    <ul class="info">
                        <li><strong>Followers ${data.followers}</strong></li>
                        <li><strong>Following ${data.following}</strong></li>
                        <li><strong>Repos ${data.public_repos}</strong></li>
                    </ul>
    
                    <div id="repos">
                       
                    </div>
                </div>
            </div>
    `;
    main.innerHTML = card;

    //calling repos function
    getrepos(username);
}

//initial call
// getuser("wycats");

const getrepos = async(username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
        console.log(item);
        const element = document.createElement("a");
        element.classList.add("repo");
        element.innerText = item["name"];
        element.href = item["html_url"];
        element.target = "_blank";
        repos.appendChild(element);
    }
    );
    
}

/*
<a class="repo" href="#" target="_blank">Repo 1</a>
<a class="repo" href="#" target="_blank">Repo 2</a>
<a class="repo" href="#" target="_blank">Repo 3</a>
*/