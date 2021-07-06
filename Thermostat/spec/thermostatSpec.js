describe('Thermostat', () => {
    let thermostat;

    beforeEach(() => {
        thermostat = new Thermostat();
    });

    it("starts at 20 deg", () => {
        expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    describe("Temperature Controls", () => {
        it("up() increases temp by 1 deg", () => {
            thermostat.up();
            expect(thermostat.getCurrentTemperature()).toEqual(21);
        });

        it("down() decreases temp by 1 deg", () => {
            thermostat.down();
            expect(thermostat.getCurrentTemperature()).toEqual(19);
        });

        it("temp does not go below 10 deg", () => {
            for (let i = 0; i < 15; i += 1) {
                thermostat.down();
            }
            expect(thermostat.getCurrentTemperature()).toEqual(10);
        });

        it("reset() changes the temp back to default, 20 deg", () => {
            for (let i = 0; i < 5; i += 1) {
                thermostat.up();
            }
            thermostat.resetTemperature()
            expect(thermostat.getCurrentTemperature()).toEqual(20);
        })
    });

    describe("Power Saving Mode", () => {
        it("power saving mode is on by default", () => {
            expect(thermostat.getPowerSavingMode()).toEqual(true);
        });

        it("max temp can be 25 deg when PSM is switched on", () => {
            for (let i = 0; i < 10; i += 1) {
                thermostat.up();
            }
            expect(thermostat.getCurrentTemperature()).toEqual(25)
        });

        it('power saving mode can be switched off', () => {
            thermostat.switchOffPowerSavingMode()
            expect(thermostat.getPowerSavingMode()).toEqual(false)
        });

        it('max temp can be 32 deg when PSM is switched off', () => {
            thermostat.switchOffPowerSavingMode()
            for (let i = 0; i < 14; i += 1) {
                thermostat.up()
            }
            expect(thermostat.getCurrentTemperature()).toEqual(32)

        });
    });

    describe("Display usage levels", () => {
        it("temp less than 18 deg is low usage", () => {
            for (let i = 0; i < 5; i += 1) {
                thermostat.down();
            }
            expect(thermostat.currentEnergyUsage()).toEqual('low usage');
        });

        it("temp less than 18 & less than 25 deg is medium usage", () => {
            expect(thermostat.currentEnergyUsage()).toEqual('medium usage');
        });

        it("temp greater 25 deg is high usage", () => {
            thermostat.powerSavingModeOn = false;
            for (let i = 0; i < 10; i += 1) {
                thermostat.up();
            }
            expect(thermostat.currentEnergyUsage()).toEqual('high usage');
        });
    });

})