import {useState} from "react";
import {Button, Input, InputLabel} from "@mui/material";
import {useDispatch} from "react-redux";
import {increment, updateFilter} from "../filterSlice.js";
import {tab} from "@testing-library/user-event/dist/tab";

export const FilterComponent = () => {

    let dispatch = useDispatch();

    //Todo
    // snake style -> camel style
    const filter_data_numbers = [
        {id: "1", value: "adaptability", from: 0, to: 0},
        {id: "2", value: "affectionLevel", from: 0, to: 0},
        {id: "3", value: "childFriendly", from: 0, to: 0},
        {id: "4", value: "dogFriendly", from: 0, to: 0},
        {id: "5", value: "energyLevel", from: 0, to: 0},
        {id: "6", value: "grooming", from: 0, to: 0},
        {id: "7", value: "healthIssues", from: 0, to: 0},
        {id: "8", value: "intelligence", from: 0, to: 0},
        {id: "9", value: "sheddingLevel", from: 0, to: 0},
        {id: "10", value: "socialNeeds", from: 0, to: 0},
        {id: "11", value: "strangerFriendly", from: 0, to: 0},
        {id: "12", value: "vocalisation", from: 0, to: 0},
        {id: "13", value: "hairless", from: 0, to: 0},
        {id: "14", value: "experimental", from: 0, to: 0},
        {id: "15", value: "natural", from: 0, to: 0},
        {id: "16", value: "rare", from: 0, to: 0},
        {id: "17", value: "rex", from: 0, to: 0},
        {id: "18", value: "suppressedTail", from: 0, to: 0},
        {id: "19", value: "shortLegs", from: 0, to: 0},
        {id: "20", value: "hypoallergenic", from: 0, to: 0},
        {id: "21", value: "indoor", from: 0, to: 0},
        {id: "22", value: "lap", from: 0, to: 0}
    ]
    const filter_data_coutry_codes = [
        {id: "1", value: "RU"},
        {id: "2", value: "SG"},
        {id: "3", value: "US"},

    ]
    const filter_data_country = [
        {id: "1", value: "Russia"},
        {id: "2", value: "Singapore"},
        {id: "3", value: "United States"},
    ]

    const filter_data_temperament = [
        {id: "1", value: "Active"},
        {id: "2", value: "Energetic"},
        {id: "3", value: "Independent"},
        {id: "4", value: "Intelligent"},
        {id: "5", value: "Gentle"},
        {id: "6", value: "Affectionate"},
        {id: "7", value: "Social"},
        {id: "8", value: "Playful"},
        {id: "9", value: "Sedate"},
        {id: "10", value: "Tenacious"},
        {id: "11", value: "Loyal"},
        {id: "12", value: "Friendly"},
        {id: "13", value: "Curious"},
        {id: "14", value: "Expressive"},
        {id: "15", value: "Sociable"},
        {id: "16", value: "Dependent"},
        {id: "17", value: "Outgoing"},
        {id: "18", value: "Loving"},
        {id: "19", value: "Warm"},
        {id: "20", value: "Devoted"},
    ]
    const [checkedNumbers, setCheckedNumbers] = useState([])
    const [checkedString, setCheckedString] = useState([])
    const [isTemperamentChecked, setIsTemperamentChecked] = useState(false)
    const [isCountryCodesChecked, setIsCountryCodesChecked] = useState(false)
    const [checkedTemperament, setCheckedTemperament] = useState([])
    return (
        <div>
            <Button onClick={() => {

                const filter_data = {
                    filter_number: JSON.parse(JSON.stringify(checkedNumbers)),
                    filter_string: JSON.parse(JSON.stringify(checkedString)),
                    filter_list: [],
                }
                if (isTemperamentChecked)
                    filter_data.filter_list = JSON.parse(JSON.stringify(checkedTemperament))

                dispatch(updateFilter(filter_data))
            }}> Filter Data</Button>
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
                                   //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
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
                                    //alert(JSON.stringify(checkedNumbers[index]))
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
            <input type="checkbox"
                   value="temp"
                   id="temp"
                   onChange={(e) => {
                       const isChecked = e.target.checked
                       setIsCountryCodesChecked(isChecked)
                   }}
            />
            <label htmlFor="temp">country codes</label>
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
            <input type="checkbox"
                   value="temp"
                   id="temp"
                   onChange={(e) => {
                       const isChecked = e.target.checked
                       setIsTemperamentChecked(isChecked)
                   }}
            />
            <label htmlFor="temp">temperament</label>
            {filter_data_temperament.map((item) => {
                return (
                    <div key={item.id}>

                        <input type="checkbox"
                               value={item.id}
                               id={item.id}
                               style={{marginLeft: 30}}
                               onChange={(e) => {
                                   const isChecked = e.target.checked
                                   const value = filter_data_temperament[Number(e.target.value) - 1]


                                   if (isChecked) {
                                       setCheckedTemperament([...checkedTemperament, value])

                                   } else {
                                       const filtered = checkedTemperament.filter(item => item.id !== value.id);
                                       setCheckedTemperament(filtered)
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