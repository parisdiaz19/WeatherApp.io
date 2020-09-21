const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => { 
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    //Destructuring Properties
    const { cityDets, weather } = data;
    
    //Update Details Template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
     </div>
    `;

    
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // update night.day and icon images
    let timeSrc = null;
    if(weather.isDayTime === true){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //Remove the D-none class if presetn
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };

};

cityForm.addEventListener('submit', e => {
    //prevent the default action
    e.preventDefault();

    //get city values
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //updating the UI with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});