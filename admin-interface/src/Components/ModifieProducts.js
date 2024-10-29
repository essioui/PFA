import { useState } from "react";
import ModifyFoods from './ModifyFoods';
import ModifyDrinks from './ModifyDrinks'
import '../App.css';

export default function MyForm() {
    const [createFoods, setCreateForm] = useState(true);

  

    return(
        <div style={{marginTop: '20px'}}>
            <button className="btn" onClick={() => setCreateForm(true)}>Modify Lists Foods</button>
            <button className="btn" onClick={() => setCreateForm(false)}>Modify Lists Drinks</button>

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