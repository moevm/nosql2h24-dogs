import {useState} from "react";
import {Button, Input, InputLabel} from "@mui/material";

export const FilterComponent = () => {
    let filter_data_numbers = [
        {id: "1", value: "adaptability", from: 0, to: 0},
        {id: "2", value: "affection_level", from: 0, to: 0},
        {id: "3", value: "child_friendly", from: 0, to: 0},
        {id: "4", value: "dog_friendly", from: 0, to: 0},
        {id: "5", value: "energy_level", from: 0, to: 0},
        {id: "6", value: "grooming", from: 0, to: 0},
        {id: "7", value: "health_issues", from: 0, to: 0},
        {id: "8", value: "intelligence", from: 0, to: 0},
        {id: "9", value: "shedding_level", from: 0, to: 0},
        {id: "10", value: "social_needs", from: 0, to: 0},
        {id: "11", value: "stranger_friendly", from: 0, to: 0},
        {id: "12", value: "vocalisation", from: 0, to: 0},
        {id: "13", value: "hairless", from: 0, to: 0},
        {id: "14", value: "experimental", from: 0, to: 0},
        {id: "15", value: "natural", from: 0, to: 0},
        {id: "16", value: "rare", from: 0, to: 0},
        {id: "17", value: "rex", from: 0, to: 0},
        {id: "18", value: "suppressed_tail", from: 0, to: 0},
        {id: "19", value: "short_legs", from: 0, to: 0},
        {id: "20", value: "hypoallergenic", from: 0, to: 0},
        {id: "21", value: "indoor", from: 0, to: 0},
        {id: "22", value: "lap", from: 0, to: 0},
    ]
    const filter_data_string = [
        {id: "1", value: "country", string: ""},
        {id: "2", value: "life_span", string: ""},
        {id: "3", value: "weight", string: ""},
    ]
    const [checkedNumbers, setCheckedNumbers] = useState([])
    const [checkedString, setCheckedString] = useState([])
    return (
        <div>
            <Button onClick={() => {
                alert(JSON.stringify(checkedNumbers))
                alert(JSON.stringify(checkedString))
            }}> show filter list</Button>
            <Button onClick={() => {
                setCheckedNumbers([])
                setCheckedString([])
                window.location.reload();
            }}> сброс </Button>
            {filter_data_numbers.map((item) => {
                return (

                    <div key={item.id}>
                        <input type="checkbox"
                               value={item.id}
                               id={item.id}

                               onChange={(e) => {
                                   const isChecked = e.target.checked
                                   filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                                   const value = filter_data_numbers[Number(e.target.value) - 1]


                                   if (isChecked) {
                                       setCheckedNumbers([...checkedNumbers, value])

                                   } else {
                                       const filtered = checkedNumbers.filter(item => item.id !== value.id);
                                       setCheckedNumbers(filtered)
                                   }


                               }}
                        />
                        <label htmlFor={item.id}>{item.value}</label>


                        <label> from</label>
                        <input type="number" min="0" max="5" onChange={(e) => {
                            if (Number(e.target.value) > 5 || Number(e.target.value) < 0) {
                                e.target.value = "0"
                            } else {
                                const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);
                                if (index !== -1) {
                                    checkedNumbers[index].from = Number(e.target.value);
                                }
                                filter_data_numbers[Number(item.id) - 1].from = Number(e.target.value);
                            }
                        }}/>
                        <label> to</label>
                        <input type="number" min="0" max="5" onChange={(e) => {
                            if (Number(e.target.value) > 5 || Number(e.target.value) < 0) {
                                e.target.value = "0"
                            } else {
                                const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);
                                if (index !== -1) {
                                    checkedNumbers[index].to = Number(e.target.value);
                                }
                                filter_data_numbers[Number(item.id) - 1].to = Number(e.target.value);
                            }
                        }}/>
                    </div>

                )
            })}

            {filter_data_string.map((item) => {
                return (
                    <div key={item.id}>
                        <input type="checkbox"
                               value={item.id}
                               id={item.id}
                               onChange={(e) => {
                                   const isChecked = e.target.checked
                                   const value = filter_data_string[Number(e.target.value) - 1]


                                   if (isChecked) {
                                       setCheckedString([...checkedString, value])

                                   } else {
                                       const filtered = checkedString.filter(item => item.id !== value.id);
                                       setCheckedString(filtered)
                                   }


                               }}
                        />
                        <label htmlFor={item.id}>{item.value}</label>


                        <input type="string" onChange={(e) => {

                            const index = checkedString.findIndex(itemm => itemm.id === item.id);
                            if (index !== -1) {
                                checkedString[index].string = e.target.value;
                            }
                            filter_data_string[Number(item.id) - 1].string = e.target.value;

                        }}/>

                    </div>
                )
            })}
        </div>
    )
}

export default FilterComponent