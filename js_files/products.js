let data = fetch("https://679ba6ae33d316846324a4ae.mockapi.io/langauaes");
data
  .then((x) => x.json())
  .then((x) => {
    //   console.log(x);
    let main_div = document.createElement("div");

    let res = x;
    res.map((x) => {
      //             {
      //     "name": "JavaScript",
      //     "poster": "https://www.bing.com/th?id=OIP._Tf_ut9cHRc_alfQPj9gUAHaHa&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      //     "created": 1995,
      //     "creator": "Brendan Eich",
      //     "description": "A dynamic, high-level programming language commonly used for web development."
      //   },
      let box = document.createElement("div");
      let title = document.createElement("h1");
      let poster = document.createElement("img");
      let created_year = document.createElement("h4");
      let creator_name = document.createElement("h3");
      let description = document.createElement("h6");
      //stying main div
      document.body.append(main_div);
      main_div.style.display = "flex";
      main_div.style.backgroundColor = "aqua";
      main_div.style.flexWrap = "wrap";
      main_div.style.border = "2px solid pink";
      main_div.style.justifyContent = "center";
      main_div.style.padding = "5px";
      main_div.style.gap = "5px";
      //styling box
      box.style.backgroundColor = "LightCoral";
      box.style.border = "5px solid LavenderBlush";
      box.style.padding = "10px";
      box.style.width = "250px";
      //adding logo name
      title.innerHTML = x.name;
      title.style.color = "Ivory";
      title.style.backgroundColor = "DarkOrchid";
      title.style.textAlign = "center";
      //adding image
      poster.src = x.poster;
      poster.style.height = "200px";
      poster.style.width = "250px";

      //adding created year
      created_year.innerHTML = x.created;
      created_year.style.backgroundColor = "Chartreuse";
      created_year.style.color = "violet";
      created_year.style.textAlign = "center";

      //adding creater name
      creator_name.innerHTML = x.creator;
      creator_name.style.backgroundColor = "FireBrick";
      creator_name.style.color = "FloralWhite";
      creator_name.style.textAlign = "center";
      //ading desxriptio
      description.innerHTML = x.description;
      main_div.append(box);
      box.append(poster, title, created_year, creator_name, description);
      description.style.backgroundColor = "black";
      description.style.color = "yellow";
      description.style.textAlign = "center";
    });
  })
  .catch((x) => {
    console.log(x);
  });
