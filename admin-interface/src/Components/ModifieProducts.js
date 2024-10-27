import { useState } from "react";
import ModifyFoods from './ModifyFoods';
import ModifyDrinks from './ModifyDrinks'

export default function MyForm() {
    const [createFoods, setCreateForm] = useState(true);

  

    return(
        <div>
            <button onClick={() => setCreateForm(true)}>Modify Lists Foods</button>
            <button onClick={() => setCreateForm(false)}>Modify Lists Drinks</button>

            {createFoods ? (
                <div>
                    <ModifyFoods />
                </div>
            ) : (
                <div>
                    <ModifyDrinks />
                </div>
            )}
        </div>
    );
}