const searchButton = document.querySelector('#search')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const findLocation = document.querySelector('#location')

const fetchData = (location) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'Weather description:-> ' + data.forecast
            }
        })
    })
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetchData(location)
})

findLocation.addEventListener('click',(e)=>{
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        const longitude = position.coords.longitude
        const latitude = position.coords.latitude
        const data = {longitude,latitude}
        fetch('/weather-direct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = 'Weather description:-> ' + data.forecast
                }
            })
        })
        
    })
})