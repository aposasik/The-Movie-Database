//Let's define our favorite movies
let movies = [
    {
      title: "The Notebook",
      img:
        "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_UX182_CR0,0,182,268_AL_.jpg",
      rating: 5
    },
    {
      title: "Our Times",
      img:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Our_Times%2C_Movie_Poster.jpg/220px-Our_Times%2C_Movie_Poster.jpg",
      rating: 5
    },
    {
      title: "Avengers",
      img:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg",
      rating: 4
    }
  ]
  
  //=========================================================================== Start generate table structure
  /*
  <div id="table"> 
  <table>
    <thead>
    <tr>
     <th>Image</th>
     <th>Title</th>
     <th>Rating</th>
    </tr>
    </thead>
  
  CONTENT TO BE GENERATED LATER ON
  
  </table>
  </div>
  */
  
  /* Let's create variables to hold elements that will be used to create our table header*/
  let movieTable = document.createElement("table")
  let movieTableHead = document.createElement("thead")
  let movieTableHeadRow = document.createElement("tr")
  let movieTableHeaderHeading1 = document.createElement("th")
  let movieTableHeaderHeading2 = document.createElement("th")
  let movieTableHeaderHeading3 = document.createElement("th")
  let movieTableHeaderHeading4 = document.createElement("th")
  
  /* Set heading titles for each <th> element */
  movieTableHeaderHeading1.innerHTML = "Image";
  movieTableHeaderHeading2.innerHTML = "Title";
  movieTableHeaderHeading3.innerHTML = "Rating";
  movieTableHeaderHeading4.innerHTML = "";
  
  /* Add bootstrap styling to table */
  movieTable.setAttribute("class", "table table-striped");
  
  /* appends <tr> to <thead> */
  movieTableHead.appendChild(movieTableHeadRow);
  /* appends <th> to <tr> */
  movieTableHeadRow.appendChild(movieTableHeaderHeading1);
  /* appends <th> to <tr> */
  movieTableHeadRow.appendChild(movieTableHeaderHeading2);
  /* appends <th> to <tr> */
  movieTableHeadRow.appendChild(movieTableHeaderHeading3);
  /* appends <th> to <tr> */
  movieTableHeadRow.appendChild(movieTableHeaderHeading4);
  /* appends <thead> to <table> */
  movieTable.appendChild(movieTableHead);
  
  /*add movie table to div with id "table"*/
  document.getElementById("table").appendChild(movieTable);
  //================================================================================== END generate table structure
  
  //============================================================ Create <td> elements and call necessary utility functions to set <td> contents and attach events
  function createMovieCellElementsAndAttachEvents(row, title, img, rating) {
    let imgCell = document.createElement("td");
    let titleCell = document.createElement("td");
    let ratingCell = document.createElement("td");
    let deleteCell = document.createElement("td");
    let imageElement = document.createElement("img");
    
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-sm');
    deleteButton.classList.add('btn-danger');
    addDeleteEvent(deleteButton);
    deleteCell.appendChild(deleteButton);
    deleteCell.classList.add('align-middle');
    
    setCellContent(
      titleCell,
      imgCell,
      ratingCell,
      imageElement,
      title,
      img,
      rating
    );
    addImageCellEvents(imgCell);
    row.appendChild(imgCell);
    row.appendChild(titleCell);
    row.appendChild(ratingCell);
    row.appendChild(deleteCell);
    
  }
  
  //================================= Style and add content to specified elements
  function setCellContent(
    titleCell,
    imageCell,
    ratingCell,
    imageEl,
    title,
    image,
    rating
  ) {
    //set attributes for given image element "imageEl" GOOD
    imageEl.src = image;
    imageEl.alt = "image not found";
    imageEl.width = 70;
    imageEl.classList.add('img-thumbnail');
    //set attributes for given "titleCell" <td> element
    titleCell.classList.add('align-middle');
    //set attributes for given "ratingCell" <td> element 
    /*
    BAD 
    https://www.w3schools.com/jsref/met_element_setattribute.asp
    because setAttribute will overwrite other CSS properties that may be specified in the style attribute 
    */
    ratingCell.setAttribute("class", "align-middle");
    //add text to title and ratings cell element
    titleCell.innerHTML = title;
    
    //ratingCell.innerHTML = rating;  
    //OR
    // add a <span> with a star based on how many ratings (stars are from font-awesome font library) */
    /*for(let i = 0; i < rating; i++) {
      let ratingSpan = document.createElement("span");
      ratingSpan.classList.add("fa");
      ratingSpan.classList.add("fa-star");
      ratingSpan.classList.add("checked"); 
      ratingCell.appendChild(ratingSpan);
    } */
      
     let ratingSpanThumbsUp = document.createElement("span");
     ratingSpanThumbsUp.classList.add("fa");
     ratingSpanThumbsUp.classList.add("fa-thumbs-up");
     ratingSpanThumbsUp.style.padding = "10px";
      
     let ratingSpanThumbsDown = document.createElement("span");
     ratingSpanThumbsDown.classList.add("fa");
     ratingSpanThumbsDown.classList.add("fa-thumbs-down");
    
     let ratingSpanNumber = document.createElement("span");
     ratingSpanNumber.style.cssText = "font-size:20px;";
     ratingSpanNumber.innerHTML = rating;
     ratingSpanNumber.style.padding = "10px";
      
     increaseRating(ratingSpanThumbsUp);
     decreaseRating(ratingSpanThumbsDown);
     ratingCell.appendChild(ratingSpanThumbsUp);
     ratingCell.appendChild(ratingSpanThumbsDown);
     ratingCell.appendChild(ratingSpanNumber);
   
    //add image to <td> element
    imageCell.appendChild(imageEl);
  }
  
  //================================= toggle style
  function hideShowElement(el) {
    if (el.style.display === "none") {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
  }
  
  /*************
  EVENT HANDLERS
  **************/
  //================================= toggles div with id "new-movie-form" 
  document
    .getElementById("new-movie")
    .addEventListener("click", function() {
      let el = document.getElementById("new-movie-form");
      hideShowElement(el);
    });
  
  //================================= Add event to increase image size on mouseover
  function addImageCellEvents(imgCell) {
    imgCell.addEventListener("mouseover", function() {
      imgCell.childNodes[0].width = 90;
    }); 
    imgCell.addEventListener("mouseout", function() {
      imgCell.childNodes[0].width = 70;
    }); 
  };
  
  //================================= Add event to delete row
  function addDeleteEvent(button) {
    button.addEventListener("click", function(event) {
      console.log(event.target.parentNode.parentNode); //button's grandma is TR
      movieTable.removeChild(event.target.parentNode.parentNode);
      //console.log("movietabel :" + movieTable.childNodes[1].nodeName)
    });
  }
  
  //================================= Add event to increase rating
  function increaseRating(ratingSpanThumbsUp) {
    ratingSpanThumbsUp.addEventListener("click", function(event) {
      let numberRating = ratingSpanThumbsUp.nextSibling.nextSibling;
      let newRating = Number(numberRating.innerHTML) + 1;
      numberRating.innerHTML = newRating;
      //alert(ratingSpanThumbsUp.nextSibling.nextSibling.innerHTML);
    }); 
  }
  
  //================================= Add event to increase rating
  function decreaseRating(ratingSpanThumbsDown) {
    ratingSpanThumbsDown.addEventListener("click", function(event) {
      let numberRating = ratingSpanThumbsDown.nextSibling;
      let newRating = Number(numberRating.innerHTML) - 1;
      numberRating.innerHTML = newRating;
    }); 
  }
  
  
  /*************
  Call functions to manipulate dom and trigger events
  **************/
  //================================= Let's create a <tr> and <td> elements from the movie objects we defined above
  let body = document.createElement("tbody")
  movieTable.appendChild(body);
  movies.forEach(function(movie) {
    let row = document.createElement("tr");
    createMovieCellElementsAndAttachEvents(row, movie.title, movie.img, movie.rating)
    body.appendChild(row);
  });
  
  function addMovie(movieform) {
    event.preventDefault(); //If we don't specify this default action of page reload will happen
    
    console.log("event: "+ event.target);
    console.log("form: " + movieform[1].innerHTML);
    console.log(document.forms.movieform[0].value);
    // OR
    console.log(movieform[0]);
    
    let imgsrc = movieform[0].value;
    let title = movieform[1].value;
    let rating = movieform[2].value;
  
    if (
      imgsrc == "" ||
      title == "" ||
      rating == ""
    ) {
      document.getElementById("status").innerHTML =
        "OOPS! Please fill in all the fields.";
    } else {
      document.getElementById("status").innerHTML =
        "";
      let row = document.createElement("tr");
      createMovieCellElementsAndAttachEvents(row, movieform[0].value, movieform[1].value, movieform[2].value)
      
      //new row is inserted as first row
      movieTable.insertBefore(row, movieTable.childNodes[0]);
      //clear element content
      movieform[0].value = "";
      movieform[1].value = "";
      movieform[2].value = "";
      //hide form
      hideShowElement(document.getElementById("new-movie-form"));
    }
  }
  
  console.log("movie table: " + movieTable.rows[1].childNodes[2].innerHTML);
  //console.log(movieTable.rows[1].cells.item(2).innerHTML);
  //console.log(document.images[0]);
  console.log("container: " +document.getElementsByClassName('container')[0].childNodes)
  //parentNode, childNodes[#], firstChild, lastChild, nextSibling, previousSibling
  const table = document.getElementsByTagName('table')[0]
  console.log("Table's grandparent node: " + table.parentNode.parentNode) //<div class="container">
  console.log("Table parent node: " + table.parentNode) //<div id="table">
  console.log("Table child nodes: " + table.childNodes) //<thead> and <tbody>
  console.log("NUm of child nodes: " + table.childNodes.length) 
  console.log("Table's first child': " + table.firstChild.nodeName) //<thead>
  console.log("Table's last child': " + table.lastChild.nodeName) //<tbody>
  console.log("Table's next sibling': " + table.nextSibling) //null
  console.log("Table's previous sibling': " + table.previousSibling) //
  table.childNodes.forEach(function(node){
    console.log(node)
  })