import {useState} from "react";
import {Input, InputLabel} from "@mui/material";

export const FilterComponent = () => {
    const filter_data = [
        {id: "1", value: "adaptability", from: 0, to: 0},
        {id: "2", value: "affection_level", from: 0, to: 0},
    ]
    const [checked, setChecked] = useState([])
    return (
        <div>
            <div> example
                {checked.map((item) => {
                return <div>
                    {item}
                </div>
            })}
            </div>

            {filter_data.map((item) => {
                return (

                    <div key={item.id}>
                        <input type="checkbox"
                               value={item.value}
                               id={item.id}
                               onChange={(e) => {

                                   const value = e.target.value
                                   const isChecked = e.target.checked

                                   if (isChecked) {
                                       setChecked([...checked, value])

                                   } else {
                                       const filtered = checked.filter(item => item !== value);
                                       setChecked(filtered)
                                   }

                               }}
                        />
                        <label htmlFor={item.id}>{item.value}</label>
                    </div>

                )
            })}
        </div>
    )
}
export default FilterComponent