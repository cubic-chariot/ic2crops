import { StaticCropData } from './CropData.js';

export class UI {
    static instance = new UI();
    private cropTierInput = document.getElementById('cropTier') as HTMLInputElement;
    private statGainInput = document.getElementById('statGain') as HTMLInputElement;
    private statGrowthInput = document.getElementById('statGrowth') as HTMLInputElement;
    private statResistanceInput = document.getElementById('statResistance') as HTMLInputElement;

    private biomeHumidityBonusInput = document.getElementById('biomeHumidityBonus') as HTMLInputElement;
    private hydratedInput = document.getElementById('hydrated') as HTMLInputElement;
    private atopHydratedFarmlandInput = document.getElementById('atopHydratedFarmland') as HTMLInputElement;

    private biomeNutrientBonusInput = document.getElementById('biomeNutrientBonus') as HTMLInputElement;
    private dirtBlocksUnderneathInput = document.getElementById('dirtBlocksUnderneath') as HTMLInputElement;
    private nutrientStorageInput = document.getElementById('nutrientStorage') as HTMLInputElement;
    private fertilizedInput = document.getElementById('fertilized') as HTMLInputElement;

    private yValueInput = document.getElementById('yValue') as HTMLInputElement;
    private surroundingAirBlocksInput = document.getElementById('surroundingAirBlocks') as HTMLInputElement;
    private skyAccessInput = document.getElementById('skyAccess') as HTMLInputElement;

    private humidityWeightInput = document.getElementById('humidityWeight') as HTMLInputElement;
    private nutrientsWeightInput = document.getElementById('nutrientsWeight') as HTMLInputElement;
    private airQualityWeightInput = document.getElementById('airQualityWeight') as HTMLInputElement;

    private envNeedsDiv = document.getElementById('env-needs') as HTMLDivElement;
    private humidityDiv = document.getElementById('humidity') as HTMLDivElement;
    private nutrientDiv = document.getElementById('nutrient') as HTMLDivElement;
    private airQualityDiv = document.getElementById('airQuality') as HTMLDivElement;
    private environmentalValueDiv = document.getElementById('environmentalValue') as HTMLDivElement;

    private staticCropData = new StaticCropData();

    private constructor() {
        this.registerNumericAttributeCallback(this.cropTierInput, value => {
            this.staticCropData.cropTier = value;
        });

        this.registerNumericAttributeCallback(this.statGainInput, value => {
            this.staticCropData.statGain = value;
        });

        this.registerNumericAttributeCallback(this.statGrowthInput, value => {
            this.staticCropData.statGrowth = value;
        });

        this.registerNumericAttributeCallback(this.statResistanceInput, value => {
            this.staticCropData.statResistance = value;
        });

        this.registerNumericAttributeCallback(this.biomeHumidityBonusInput, value => {
            this.staticCropData.biomeHumidityBonus = value;
        });

        this.registerBooleanAttributeCallback(this.hydratedInput, value => {
            this.staticCropData.hydrated = value;
        });

        this.registerBooleanAttributeCallback(this.atopHydratedFarmlandInput, value => {
            this.staticCropData.atopHydratedFarmland = value;
        });

        this.registerNumericAttributeCallback(this.biomeNutrientBonusInput, value => {
            this.staticCropData.biomeNutrientBonus = value;
        });

        this.registerNumericAttributeCallback(this.dirtBlocksUnderneathInput, value => {
            this.staticCropData.dirtBlocksUnderneath = value;
        });

        this.registerNumericAttributeCallback(this.nutrientStorageInput, () => {
            // Not static data, so we don't store it
        });

        this.registerBooleanAttributeCallback(this.fertilizedInput, value => {
            this.staticCropData.fertilized = value;
        });

        this.registerNumericAttributeCallback(this.yValueInput, value => {
            this.staticCropData.yValue = value;
        });

        this.registerNumericAttributeCallback(this.surroundingAirBlocksInput, value => {
            this.staticCropData.surroundingAirBlocks = value;
        });

        this.registerBooleanAttributeCallback(this.skyAccessInput, value => {
            this.staticCropData.skyAccess = value;
        });

        this.registerNumericAttributeCallback(this.humidityWeightInput, value => {
            this.staticCropData.humidityWeight = value;
        });

        this.registerNumericAttributeCallback(this.nutrientsWeightInput, value => {
            this.staticCropData.nutrientsWeight = value;
        });

        this.registerNumericAttributeCallback(this.airQualityWeightInput, value => {
            this.staticCropData.airQualityWeight = value;
        });

        /* The this.register functions call the callback with the current values upon registering,
         * but it only calls updateCropData if the value modifies.
         * So we call it once after all values get updated.
         */
        this.updateCropData();
    }

    private registerNumericAttributeCallback(element: HTMLInputElement, callback: (value: number) => void) {
        element.addEventListener('input', (e: Event) => {
            callback((e.target as HTMLInputElement).valueAsNumber);
            this.updateCropData();
        });
        /* Some browsers (like Firefox) store the last value used in an input field.
         * This makes sure that the internal variables match what's seen by the user.
         */
        callback(element.valueAsNumber);
    }

    private registerBooleanAttributeCallback(element: HTMLInputElement, callback: (value: boolean) => void) {
        element.addEventListener('input', (e: Event) => {
            callback(Boolean((e.target as HTMLInputElement).checked));
            this.updateCropData();
        });
        callback(Boolean(element.checked));
    }

    updateCropData() {
        this.envNeedsDiv.textContent = "" + this.staticCropData.computeEnvironmentalNeeds();
        this.humidityDiv.textContent = "" + this.staticCropData.computeHumidity();
        let currentNutrientStorage = this.nutrientStorageInput.valueAsNumber;
        this.nutrientDiv.textContent = "" + this.staticCropData.computeNutrients(currentNutrientStorage);
        this.airQualityDiv.textContent = "" + this.staticCropData.computeAirQuality();
        this.environmentalValueDiv.textContent = "" + this.staticCropData.computeEnvironmentalValue(currentNutrientStorage);
    }
}
