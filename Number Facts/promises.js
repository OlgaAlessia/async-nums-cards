// ****************************
// Promises
// ****************************

let NUMBER_API_URL = "http://numbersapi.com";


// 1. get a fact about your favorite number.
const results1 = document.getElementById("results1");
const favNumber = 8;
$.getJSON(`${NUMBER_API_URL}/${favNumber}?json`).then(data => {
    results1.innerHTML = data.text
});


// 2. get data on multiple numbers in a single request.

const results2 = document.getElementById("results2");
const favNumbers = [10, 15, 17];
$.getJSON(`${NUMBER_API_URL}/${favNumbers}?json`).then(data => {
    let result = ""
    for (const key in data){
        result = result + data[key] + "<br>"
    }
    results2.innerHTML = result;
});


// 3. get 4 facts on your favorite number. 
const results3 = document.getElementById("results3");
let fourFavPromises = [];
const favNumber3 = 40;

for (let i = 1; i <= 4; i++) {
  fourFavPromises.push(
    axios.get(`${NUMBER_API_URL}/${favNumber3}?json`)
  );
}

Promise.all(fourFavPromises)
    .then(factArr => {
        let result = ""
        for (resp of factArr) {
            result = result + resp.data.text + "<br>"
        }
        results3.innerHTML = result;
    })
    .catch(err => console.log(err));
