import { StaticCropData } from './CropData.js';
class GrowthStageInput {
    constructor(index, valueModificationCallback) {
        this.index = index;
        this.valueModificationCallback = valueModificationCallback;
        this.div = GrowthStageInput.template.cloneNode(true);
        this.indexDisplayDiv = this.div.querySelector('.growth-stage-index');
        this.stageInput = this.div.querySelector('input');
        this.indexDisplayDiv.textContent = "" + (this.index + 1);
        this.stageInput.addEventListener('input', (e) => {
            this.valueModificationCallback(e.target.valueAsNumber);
        });
        this.valueModificationCallback(this.stageInput.valueAsNumber);
    }
    getDiv() {
        return this.div;
    }
    hideDiv() {
        this.div.style['display'] = 'none';
    }
    showDiv() {
        this.div.style['display'] = '';
        this.valueModificationCallback(this.stageInput.valueAsNumber);
    }
}
GrowthStageInput.template = document
    .querySelector('#growth-stage-input')
    .content
    .querySelector('div'); // I just want the div inside the template
export class UI {
    constructor() {
        this.cropTierInput = document.getElementById('cropTier');
        this.statGainInput = document.getElementById('statGain');
        this.statGrowthInput = document.getElementById('statGrowth');
        this.statResistanceInput = document.getElementById('statResistance');
        this.biomeHumidityBonusInput = document.getElementById('biomeHumidityBonus');
        this.hydratedInput = document.getElementById('hydrated');
        this.atopHydratedFarmlandInput = document.getElementById('atopHydratedFarmland');
        this.biomeNutrientBonusInput = document.getElementById('biomeNutrientBonus');
        this.dirtBlocksUnderneathInput = document.getElementById('dirtBlocksUnderneath');
        this.nutrientStorageInput = document.getElementById('nutrientStorage');
        this.fertilizedInput = document.getElementById('fertilized');
        this.yValueInput = document.getElementById('yValue');
        this.surroundingAirBlocksInput = document.getElementById('surroundingAirBlocks');
        this.skyAccessInput = document.getElementById('skyAccess');
        this.humidityWeightInput = document.getElementById('humidityWeight');
        this.nutrientsWeightInput = document.getElementById('nutrientsWeight');
        this.airQualityWeightInput = document.getElementById('airQualityWeight');
        this.numberOfGrowthStagesInput = document.getElementById('numberOfGrowthStages');
        this.growthStageInputs = [];
        this.envNeedsDiv = document.getElementById('env-needs');
        this.humidityDiv = document.getElementById('humidity');
        this.nutrientDiv = document.getElementById('nutrient');
        this.airQualityDiv = document.getElementById('airQuality');
        this.environmentalValueDiv = document.getElementById('environmentalValue');
        this.growthStagesDiv = document.getElementById('growth-stages');
        this.growthPointsInfoDiv = document.getElementById('growth-points-info');
        this.growthPointsProbabilitiesDiv = document.getElementById('growth-points-probabilities');
        this.growthStagesInfoDiv = document.getElementById('growth-stages-info');
        this.growthStagesExpectanciesDiv = document.getElementById('growth-stages-expectancies');
        this.staticCropData = new StaticCropData();
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
        this.registerNumericAttributeCallback(this.numberOfGrowthStagesInput, newNumber => {
            this.setNumberOfGrowthStages(newNumber);
        });
        /* The this.register functions call the callback with the current values upon registering,
         * but it only calls updateCropData if the value modifies.
         * So we call it once after all values get updated.
         */
        this.updateCropData();
    }
    registerNumericAttributeCallback(element, callback) {
        element.addEventListener('input', (e) => {
            callback(e.target.valueAsNumber);
            this.updateCropData();
        });
        /* Some browsers (like Firefox) store the last value used in an input field.
         * This makes sure that the internal variables match what's seen by the user.
         */
        callback(element.valueAsNumber);
    }
    registerBooleanAttributeCallback(element, callback) {
        element.addEventListener('input', (e) => {
            callback(Boolean(e.target.checked));
            this.updateCropData();
        });
        callback(Boolean(element.checked));
    }
    setNumberOfGrowthStages(newNumber) {
        if (!(newNumber > 0))
            return;
        this.staticCropData.setNumberOfGrowthStages(newNumber);
        while (this.growthStageInputs.length < newNumber - 1) {
            let index = this.growthStageInputs.length;
            let newGrowthStageInput = new GrowthStageInput(index, (value) => {
                this.staticCropData.growthStages[index] = value;
                this.updateCropData();
            });
            this.growthStageInputs.push(newGrowthStageInput);
            this.growthStagesDiv.appendChild(newGrowthStageInput.getDiv());
        }
        for (let i = 0; i < newNumber - 1; i++) {
            this.growthStageInputs[i].showDiv();
        }
        for (let i = newNumber - 1; i < this.growthStageInputs.length; i++) {
            this.growthStageInputs[i].hideDiv();
        }
    }
    updateCropData() {
        this.envNeedsDiv.textContent = "" + this.staticCropData.computeEnvironmentalNeeds();
        this.humidityDiv.textContent = "" + this.staticCropData.computeHumidity();
        let currentNutrientStorage = this.nutrientStorageInput.valueAsNumber;
        this.nutrientDiv.textContent = "" + this.staticCropData.computeNutrients(currentNutrientStorage);
        this.airQualityDiv.textContent = "" + this.staticCropData.computeAirQuality();
        this.environmentalValueDiv.textContent = "" + this.staticCropData.computeEnvironmentalValue(currentNutrientStorage);
        this.updateGrowthPointsProbabilities();
        this.updateGrowthStagesExpectedDurations();
    }
    updateGrowthPointsProbabilities() {
        let growthPoints;
        if (this.staticCropData.fertilized) {
            this.growthPointsInfoDiv.textContent = "Average probabilities of each growth value:";
            growthPoints = this.staticCropData.computeAverageGrowthPointsWithNutrition();
        }
        else {
            this.growthPointsInfoDiv.textContent = "Probabilities of each growth value:";
            growthPoints = this.staticCropData.computeGainedGrowthPoints();
        }
        if (growthPoints.length == 0) {
            this.growthPointsProbabilitiesDiv.textContent =
                "Not enough environmental resources, the crop will die in the long run.";
        }
        else {
            this.growthPointsProbabilitiesDiv.textContent = "";
            for (let [growth, probability] of growthPoints) {
                let p = (100 * probability).toFixed(2);
                this.growthPointsProbabilitiesDiv.textContent += `[${growth}: ${p}%] `;
            }
        }
    }
    updateGrowthStagesExpectedDurations() {
        let growthPoints;
        if (this.staticCropData.fertilized) {
            this.growthStagesInfoDiv.textContent = "(Estimated) expected duration of each growth stage: ";
            growthPoints = this.staticCropData.computeAverageGrowthPointsWithNutrition();
        }
        else {
            this.growthStagesInfoDiv.textContent = "Expected duration of each growth stage: ";
            growthPoints = this.staticCropData.computeGainedGrowthPoints();
        }
        if (growthPoints.length == 0) {
            this.growthStagesExpectanciesDiv.textContent =
                "Not enough environmental resources, the crop will die in the long run.";
        }
        else {
            this.growthStagesExpectanciesDiv.textContent = "";
            for (let i = 0; i < this.staticCropData.growthStages.length - 1; i++) {
                let expectancy = StaticCropData.computeExpectedStepsInGrowthStage(this.staticCropData.growthStages[i], growthPoints);
                let e = expectancy.toFixed(2);
                this.growthStagesExpectanciesDiv.textContent += `[${i}: ${e} steps] `;
            }
        }
    }
}
UI.instance = new UI();
