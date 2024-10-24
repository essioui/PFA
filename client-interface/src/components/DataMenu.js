import { useEffect } from 'react';

export default function DataMenu({ setFoods, setDrinks }) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const foodResponse = await fetch('http://localhost:5001/api/foods');
                const drinkResponse = await fetch('http://localhost:5001/api/drinks');
                const foodData = await foodResponse.json();
                const drinkData = await drinkResponse.json();
                setFoods(foodData);
                setDrinks(drinkData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setFoods, setDrinks]);

    return null;
}
