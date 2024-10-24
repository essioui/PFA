import React from "react";

export default function TableNumberInput({ tableNumber, onTableNumberChange }) {
    return(
        <label>
            Table Number
            <input
            type="Number"
            value={tableNumber}
            onChange={(e) => onTableNumberChange(e.target.value)}
            placeholder="Enter number your table please"
            />
        </label>
    );
}
