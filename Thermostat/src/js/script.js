currTemp = document.querySelector('#temperature');
energyUsage = document.querySelector('#usage')
energyUsageColor = document.querySelector('#usage-color')
psmDisplay = document.querySelector('#psm');
psmOnBtn = document.querySelector('.psm-on');
psmOffBtn = document.querySelector('.psm-off');
tempUpBtn = document.querySelector('.temp-up');
tempDownBtn = document.querySelector('.temp-down');
tempResetBtn = document.querySelector('.temp-reset');

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
        psmDisplay.innerText = 'ON'
        updateTemperature();
    });

    psmOffBtn.addEventListener('click', () => {
        thermostat.switchOffPowerSavingMode();
        psmDisplay.innerText = 'OFF'
        updateTemperature();
    });

});
