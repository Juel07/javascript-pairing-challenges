currTemp = document.querySelector('#temperature');
cityHumidity = document.querySelector('#humidity');
energyUsage = document.querySelector('#usage')
energyUsageColor = document.querySelector('#usage-color')
psmDisplay = document.querySelector('#psm');
psmOnBtn = document.querySelector('.psm-on');
psmOffBtn = document.querySelector('.psm-off');
tempUpBtn = document.querySelector('.temp-up');
tempDownBtn = document.querySelector('.temp-down');
tempResetBtn = document.querySelector('.temp-reset');
cityOption = document.querySelector('#city-select');
cityTempDisplay = document.querySelector('#city-temp');
cityDisplay = document.querySelector('.display-city');
searchCityBtn = document.querySelector('#search-btn')

document.addEventListener("DOMContentLoaded", () => {
    const updateTemperature = () => {
        currTemp.innerText = thermostat.getCurrentTemperature();
        energyUsage.innerText = thermostat.currentEnergyUsage();
        energyUsageColor.className = thermostat.currentEnergyUsage();
    }

    const thermostat = new Thermostat();
    updateTemperature();

    tempUpBtn.addEventListener('click', () => {
        thermostat.up();
        updateTemperature();
    });

    tempDownBtn.addEventListener('click', () => {
        thermostat.down();
        updateTemperature();
    });

    tempResetBtn.addEventListener('click', () => {
        thermostat.resetTemperature();
        updateTemperature();
    });

    psmOnBtn.addEventListener('click', () => {
        thermostat.switchOnPowerSavingMode()
        // psmDisplay.innerText = 'ON'
        psmDisplay.className = 'psm-on-indicator'
        updateTemperature();
    });

    psmOffBtn.addEventListener('click', () => {
        thermostat.switchOffPowerSavingMode();
        // psmDisplay.innerText = 'OFF'
        psmDisplay.className = 'psm-off-indicator'
        updateTemperature();
    });


    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const key = '40a3afdc8678463e5e54fb8e0059f90e';
    let url;

    const fetchWeather = (event) => {
        event.preventDefault();

        url = baseUrl + `q=${cityOption.value}&appid=${key}`

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data.main.temp)
                cityDisplay.innerText = cityOption.value.toUpperCase();
                cityHumidity.innerText = data.main.humidity;
                const kelvin = data.main.temp;
                const celcius = kelvin - 273.15;
                cityTempDisplay.innerText = ` ${celcius.toFixed(0)}`
            })
            .catch(error => console.error(error));
    }

    searchCityBtn.addEventListener('click', (event) => {
        fetchWeather(event)
    });

});
