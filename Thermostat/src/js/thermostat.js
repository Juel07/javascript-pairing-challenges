'use strict';

class Thermostat {
  constructor() {
    this.MIN_TEMP = 10;
    this.DEFAULT_TEMP = 20;
    this.temperature = this.DEFAULT_TEMP;
    this.MAX_TEMP_PSM_ON = 25;
    this.MAX_TEMP_PSM_OFF = 32;
    this.powerSavingModeOn = true;
    this.MEDIUM_USAGE_TEMP_LIMIT = 18;
    this.HIGH_USAGE_TEMP_LIMIT = 25;
  }

  up() {
    if (!this.isMaximumTemperature()) {
      this.temperature += 1;
    }
    return;
  }

  down() {
    if (!this.isMinimumTemperature()) {
      this.temperature -= 1;
    }
    return;
  }

  switchOffPowerSavingMode() {
    return this.powerSavingModeOn = false;
  }

  switchOnPowerSavingMode() {
    return this.powerSavingModeOn = true;
  }

  resetTemperature() {
    return this.temperature = this.DEFAULT_TEMP;
  }

  currentEnergyUsage() {
    if (this.temperature < this.MEDIUM_USAGE_TEMP_LIMIT) {
      return 'low';
    };
    if (this.temperature <= this.HIGH_USAGE_TEMP_LIMIT) {
      return 'medium';
    };
    if (this.temperature > this.HIGH_USAGE_TEMP_LIMIT) {
      return 'high';
    };
  }

  isMaximumTemperature() {
    if (!this.getPowerSavingMode()) {
      return this.temperature === this.MAX_TEMP_PSM_OFF;
    }
    return this.temperature === this.MAX_TEMP_PSM_ON;
  }

  isMinimumTemperature() {
    return this.temperature === this.MIN_TEMP;
  }

  getCurrentTemperature() {
    return this.temperature;
  }

  getPowerSavingMode() {
    return this.powerSavingModeOn;
  }

}