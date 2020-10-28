console.log('app.js is running!');


const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.getElementById('messageOne');

const messageTwo = document.getElementById('messageTwo');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                messageOne.textContent = '';
                messageTwo.textContent = data.err;
            }
            else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        })
    })
    search.value = '';
})