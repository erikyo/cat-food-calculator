import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

/**
 * I18n translation helper
 */
const loadFromLocalStorage = () => {
    const storedCatType = localStorage.getItem('catType') || 'normal';
    const storedAge = localStorage.getItem('age') || '5';
    const storedWeight = localStorage.getItem('weight') || '4';
    const storedWetFoodCalories = localStorage.getItem('wetFoodCalories') || '60';
    const storedDryFoodCalories = localStorage.getItem('dryFoodCalories') || '370';
    const storedWetDryRatio = localStorage.getItem('wetDryRatio') || '33';

    return {
        catType: storedCatType,
        age: storedAge,
        weight: storedWeight,
        wetFoodCalories: storedWetFoodCalories,
        dryFoodCalories: storedDryFoodCalories,
        wetDryRatio: parseInt(storedWetDryRatio),
    };
};

interface CatFoodResult { wetFood: string, dryFood: string }

/**
 * App component CatFoodCalculator
 * @constructor
 */
const CatFoodCalculator = () => {
    const { t } = useTranslation();
    /**
     * Constants
     */
    const initialState = loadFromLocalStorage();
    const [catType, setCatType] = useState(initialState.catType);
    const [age, setAge] = useState(initialState.age);
    const [weight, setWeight] = useState(initialState.weight);
    const [wetFoodCalories, setWetFoodCalories] = useState(initialState.wetFoodCalories);
    const [dryFoodCalories, setDryFoodCalories] = useState(initialState.dryFoodCalories);
    const [wetDryRatio, setWetDryRatio] = useState<number>(initialState.wetDryRatio);
    const [result, setResult] = useState<CatFoodResult|null>(null);

    const catTypeOptions: { value: string, label: string }[] = [
        { value: 'active', label: t('Active') },
        { value: 'normal', label: t('Normal') },
        { value: 'kitten', label: t('Kitten') },
        { value: 'pregnant', label: t('Pregnant') },
        { value: 'lactating', label: t('Lactating') },
        { value: 'indoor', label: t('Indoor') },
        { value: 'weight-loss', label: t('Weight loss') },
        { value: 'weight-gain', label: t('Weight gain') },
    ];

    const saveToLocalStorage = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    const setCatTypeAndSave = (value: string) => {
        setCatType(value);
        saveToLocalStorage('catType', value);
        if (value === 'kitten') {
            setAgeAndSave("6");
        }
    };

    const setAgeAndSave = (value: string) => {
        setAge(value);
        saveToLocalStorage('age', value);
    };

    const setWeightAndSave = (value: string) => {
        setWeight(value);
        saveToLocalStorage('weight', value);
    };

    const setWetFoodCaloriesAndSave = (value: string) => {
        setWetFoodCalories(value);
        saveToLocalStorage('wetFoodCalories', value);
    };

    const setDryFoodCaloriesAndSave = (value: string) => {
        setDryFoodCalories(value);
        saveToLocalStorage('dryFoodCalories', value);
    };

    const setWetDryRatioAndSave = (value: string) => {
        setWetDryRatio(Number(value));
        saveToLocalStorage('wetDryRatio', value);
    };

    const calculateFood = useCallback((): void  => {
        if (!weight || !wetFoodCalories || !dryFoodCalories) {
            setResult({ wetFood: '', dryFood: '' });
        }

        const weightNum = parseFloat(weight);
        const wetCalories = parseFloat(wetFoodCalories) ?? 0;
        const dryCalories = parseFloat(dryFoodCalories) ?? 0;
        const ratio = wetDryRatio / 100;
        const catAge = parseInt(age) || 5;

        let maintenanceCalories = 70 * Math.pow(weightNum, 0.75);

        // Adjust maintenanceCalories based on catType and age
        switch (catType) {
            case 'active':
                maintenanceCalories *= 1.2;
                break;
            case 'indoor':
                maintenanceCalories *= 0.8;
                break;
            case 'kitten':
                if (catAge <= 4) { // 0-4 months
                    maintenanceCalories *= 2.5; // Higher calorie needs for very young kittens
                } else if (catAge <= 12) { // 5-12 months
                    maintenanceCalories *= 2.0; // Slightly lower needs for older kittens
                } else {
                    maintenanceCalories *= 1.5; // Lower the multiplier as the kitten approaches adulthood
                }
                break;
            case 'Weight loss':
                maintenanceCalories *= 0.8;
                break;
            case 'Weight gain':
                maintenanceCalories *= 1.8;
                break;
            case 'pregnant':
                maintenanceCalories *= 1.25;
                break;
            case 'lactating':
                maintenanceCalories *= 2.5;
                break;
        }

        if ( ['normal','active', "indoor"].includes(catType) ) {
            if (catAge < 7 && catAge > 12) {
                maintenanceCalories *= 0.8;
            }
        }

        const wetFoodGrams = (maintenanceCalories * ratio) / (wetCalories / 100);
        const dryFoodGrams = (maintenanceCalories * (1 - ratio)) / (dryCalories / 100);

        setResult({
            wetFood: wetFoodGrams.toFixed(0),
            dryFood: dryFoodGrams.toFixed(0),
        });
    }, [catType, age, weight, wetFoodCalories, dryFoodCalories, wetDryRatio]);

    useEffect(() => {
        calculateFood();
    }, [catType, age, weight, wetFoodCalories, dryFoodCalories, calculateFood]);

    return (
        <div className="flex items-center justify-center h-full overflow-y-auto">
            <div className="flex-1 bg-white p-6 md:p-8 max-w-[800px] border border-gray-200 md:rounded-lg rounded-none shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <h1 className="md:text-4xl text-3xl font-bold mb-4">🐈 {t('Cat Food Calculator')}</h1>
                <p className="my-4 text-sm text-gray-600 dark:text-gray-400">
                    {t('recommendation1')}<br/>
                    {t('recommendation2')}
                </p>

                <div className="flex flex-wrap mb-4">
                    {catTypeOptions.map((type) => (
                        <div key={type.value} className="flex items-center w-1/2 mb-2">
                            <input
                                type="radio"
                                id={type.value}
                                name="catType"
                                value={type.label}
                                checked={catType === type.value}
                                onChange={() => setCatTypeAndSave(type.value)}
                                className="mr-2"
                            />
                            <label htmlFor={type.value}>{t(type.label as any)}</label>
                        </div>
                    ))}
                </div>

                <p>
                    <label className="block mb-2">{catType === 'kitten' ? t('Age (months)') : t('Age (years)')}</label>
                    <input
                        className="h-10 border border-gray-300 rounded px-2 mb-2 w-full dark:placeholder-gray-400 dark:text-gray-500"
                        type="number"
                        placeholder={catType === 'kitten' ? "Age (months)" : "Age (years)"}
                        value={age}
                        onChange={(e) => setAgeAndSave(e.target.value)}
                    />
                </p>

                <p>
                    <label className="block mb-2">{t('Cat Weight (kg)')}</label>
                    <input
                        className="h-10 border border-gray-300 rounded px-2 mb-2 w-full dark:placeholder-gray-400 dark:text-gray-500"
                        type="number"
                        placeholder={t('Cat Weight (kg)')}
                        value={weight}
                        onChange={(e) => setWeightAndSave(e.target.value)}
                    />
                </p>

                <p>
                    <label className="block mb-2">{t('Wet Food Calories (per 100g)')}</label>
                    <input
                        className="h-10 border border-gray-300 rounded px-2 mb-2 w-full dark:placeholder-gray-400 dark:text-gray-500"
                        type="number"
                        placeholder={t('Wet Food Calories (per 100g)')}
                        value={wetFoodCalories}
                        onChange={(e) => setWetFoodCaloriesAndSave(e.target.value)}
                    />
                </p>

                <p>
                    <label className="block mb-2">{t('Dry Food Calories (per 100g)')}</label>
                    <input
                        className="h-10 border border-gray-300 rounded px-2 mb-2 w-full dark:placeholder-gray-400 dark:text-gray-500"
                        type="number"
                        placeholder={t('Dry Food Calories (per 100g)')}
                        value={dryFoodCalories}
                        onChange={(e) => setDryFoodCaloriesAndSave(e.target.value)}
                    />
                </p>

                <p className="mt-8">
                    <label className="block mb-2">{t('Wet/Dry Ratio')}</label>
                    <input
                        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
                        type={"range"}
                        step={1}
                        min={0}
                        max={100}
                        value={wetDryRatio}
                        onChange={(e) => setWetDryRatioAndSave(e.target.value)}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 text-center">{(wetDryRatio).toFixed(0)}% / {((100 - wetDryRatio)).toFixed(0)}%</span>
                </p>

                {result && (
                    <div className="flex md:flex-row flex-col gap-8 my-8 p-8 bg-gray-100 dark:text-gray-500 rounded">
                        <div className="md:w-1/2 w-full text-center">
                            <p className={'text-xl'}>{t('Dry Food')}:</p>
                            <p className={'text-4xl'}>{result.dryFood} g</p>
                        </div>
                        <div className="md:w-1/2 w-full text-center">
                            <p className={'text-xl'}>{t('Wet Food')}:</p>
                            <p className={'text-4xl'}>{result.wetFood} g</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatFoodCalculator;
