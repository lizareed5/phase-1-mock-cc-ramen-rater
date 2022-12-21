// See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

document.addEventListener('DOMContentLoaded', (e) => {

    fetchRamen()
    createNewRamen()
})

const url = "http://localhost:3000/ramens"
const ramenMenu = document.querySelector("#ramen-menu")
let ramenForm = document.querySelector("#new-ramen")
let ramenMainPic = document.querySelector(".detail-image")
let ramenName = document.querySelector(".name")
let ramenRest = document.querySelector(".restaurant")
let ramenRating = document.querySelector("span", "#rating")
let ramenComment = document.querySelector("#comment-display")

const fetchRamen = (ramen) => {
    fetch(url)
    .then((response => response.json()))
    .then((data) => data.map(ramen => renderRamen(ramen)))
    }
    
// Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.

const renderRamen = (ramen) => {
    let ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenImg.addEventListener('click', () =>
    ramenInfo(ramen))
    ramenMenu.appendChild(ramenImg)
    }

const ramenInfo = (ramen) => {
    ramenMainPic.src = ramen.image,
    ramenName.innerText = ramen.name,
    ramenRest.innerText = ramen.restaurant
    ramenRating.innerText = ramen.rating
    ramenComment.innerText = ramen.comment
}

// Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page

const createNewRamen = (e) => {
    ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: document.getElementById('new-comment').value
    }
    keepNewRamen(newRamen);
})
}

const keepNewRamen = (newRamen) => {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
    renderRamen(newRamen)
}