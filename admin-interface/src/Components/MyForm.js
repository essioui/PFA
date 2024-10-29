import { useState } from "react";
import MyFormFoods from './MyFormFoods';
import MyFormDrinks from './MyFormDrinks'
import '../App.css';

export default function MyForm() {
    const [createFoods, setCreateForm] = useState(true);

  

    return(
        <div style={{marginTop: '10px'}}>
            <button className="btn" onClick={() => setCreateForm(true)}>Create Lists Foods</button>
            <button className="btn" onClick={() => setCreateForm(false)}>Create Lists Drinks</button>

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