import { useState } from "react";
import MyFormFoods from './MyFormFoods';
import MyFormDrinks from './MyFormDrinks'

export default function MyForm() {
    const [createFoods, setCreateForm] = useState(true);

  

    return(
        <div>
            <button onClick={() => setCreateForm(true)}>Create Lists Foods</button>
            <button onClick={() => setCreateForm(false)}>Create Lists Drinks</button>

            {createFoods ? (
                <div>
                    <MyFormFoods />
                </div>
            ) : (
                <div>
                    <MyFormDrinks />
                </div>
            )}
        </div>
    );
}