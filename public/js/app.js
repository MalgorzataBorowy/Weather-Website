console.log('Client side js file loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading data...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => { 
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data[0].location
                messageTwo.textContent = data[0].forecast
            }
        })
    })
})