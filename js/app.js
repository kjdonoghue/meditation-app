// let timer = document.getElementById("timer") //this is a div that the timer will display in
let nameTB = document.getElementById("nameTB") //this will be updated after name text box is added to page 1
let name = "Name" //update with nameTB.value once box is made
let newPost = document.getElementById("newPost")
let previousPosts = document.getElementById("previousPosts")
let showAnimals = document.getElementById("showAnimals")
let postImage = document.getElementById("postImage")
let userName = document.getElementById("userName") //community post user name

// //TIMER
// //sets timer on screen and starts countdown

// function setTimer(minutes) {
//   timer.innerHTML =
//     minutes + ":" + 00
//   startTimer()
// }

// // setTimer("5") this will call the timer to start - replace when building the page

// function startTimer() {
//   let presentTime = timer.innerHTML
//   let timeArray = presentTime.split(/[:]+/)
//   let m = timeArray[0]
//   var s = checkSecond((timeArray[1] - 1))
//   if (s == 59) {
//     m = m - 1
//   }

//   timer.innerHTML = m + ":" + s
//   let countdown = setTimeout(startTimer, 1000) //starts countdown

//   if (m == 0 && s == 00) {
//     console.log('timer completed')
//     clearTimeout(countdown) //stops countdown when 0:00
//   }
// }

// function checkSecond(sec) {
//   if (sec < 10 && sec >= 0) { sec = "0" + sec } // add zero in front of numbers < 10
//   if (sec < 0) { sec = "59" } //resets to 59 seconds
//   return sec
// }

// insert user name into new post on community page
userName.innerHTML = name


//list images of spirit animal on community post
function listAnimals() {
  showAnimals.innerHTML =
  `<div>
    <div class="animalThumbnail" onclick="displayAnimal('lion')"> <img src="images/lion.png"> </img></div>
    <div class="animalThumbnail" onclick="displayAnimal('llama')"> <img src="images/llama.png"/> </div>
    <div class="animalThumbnail" onclick="displayAnimal('owl')"> <img src="images/owl.png"/> </div>
    <div class="animalThumbnail"onclick="displayAnimal('turtle')"> <img src="images/turtle.png"/> </div>
  </div>`
}

//update animal image - called by onclick function in listAnimals
function displayAnimal(animal) {
  imageChoice.innerHTML = `<img id="postImage" src="images/${animal}.png"></img>`
  showAnimals.innerHTML = ""
 
}


//function to save community post information from community page to Firebase
function getInfo() {

  let messageTB = document.getElementById("messageTB")
  let image = document.getElementById("postImage").src
  let postContent = messageTB.value

  savePost(name, image, postContent)
  messageTB.value = messageTB.defaultValue
}

//function to save community post to firestore
function savePost(name, image, message) {
  let date = Date() 
  db.collection("posts").add({ 
    date: date,
    name: name,
    image: image,
    message: message,
  })
    .then(function (docRef) {
      console.log("updated post to firestore")
      listPreviousPosts() //will update list of previous posts
    })
    .catch(function (error) {
      console.log("error loading to post")
    })
}

//update list of previous posts 
function listPreviousPosts() {
  previousPosts.innerHTML = ""

  db.collection("posts").orderBy("date").get().then((snapshot) => { 
    snapshot.forEach((doc) => {
      let post = doc.data()
      let postDetail =
        `<div class="postListPosts">
           <div class="postListImage"> <img src=${post.image}></img></div>
           <div class="postListPosting"> <b>${post.name}:</b> ${post.message} </div>
        </div>`
        
        previousPosts.insertAdjacentHTML("afterbegin", postDetail)
    })
    
  })
}

//post meditation information to Firestore
function postMeditation(minutes, theme) {
  let message = `meditated for ${minutes} minutes to the ${theme} sounds`
  let date = Date() 

  if (theme == "forest") {
    var image = "images/forest.png"
  } if (theme == "ocean") {
    var image = "images/ocean.png"
  } else {
    var image = "images/rain.png"
  }

    db.collection("posts").add({ 
      date: date,
      name: name,
      image: image,
      message: message,
    })
      .then(function (docRef) {
        console.log("updated post to firestore")
        listPreviousPosts() //will update list of previous posts - can remove
      })
      .catch(function (error) {
        console.log("error loading to post")
      })
}
// let minutes = "5"
// let theme = "forest"
// postmeditation(name, minutes, theme)