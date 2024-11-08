import {useState} from "react";
import {Button, Input, InputLabel} from "@mui/material";
import {useDispatch} from "react-redux";
import {increment, updateFilter} from "../filterSlice.js";
import {tab} from "@testing-library/user-event/dist/tab";

export const FilterComponent = () => {

    let dispatch = useDispatch();

    const filter_data_numbers = [
        {id: "1", value: "adaptability", from: 0, to: 0},
        {id: "2", value: "affection_level", from: 0, to: 0},
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
        {id: "22", value: "lap", from: 0, to: 0},
    ]
    const filter_data_string_numbers=[
        {id: "1", value: "weight", from: 0, to: 0},
        {id: "2", value: "lifeSpin", from: 0, to: 0},
    ]
    
    const filter_data_country_codes = [
        {id: "1", value: "SG"},
        {id: "2", value: "CY"},
        {id: "3", value: "US"},
        {id: "4", value: "JP"},
        {id: "5", value: "IM"},
        {id: "6", value: "EG"},
        {id: "7", value: "SO"},
        {id: "8", value: "GB"},
        {id: "9", value: "IR"},
        {id: "10", value: "AE"},
        {id: "11", value: "MM"},
        {id: "12", value: "TH"},
        {id: "13", value: "RU"},
        {id: "14", value: "GR"},
        {id: "15", value: "CA"},
        {id: "16", value: "TR"},
        {id: "17", value: "NO"},
        {id: "18", value: "CN"},
        {id: "19", value: "AU"},
        {id: "20", value: "FR"}
    ]

    const filter_data_country = [
        {id: "1", value: "Singapore"},
        {id: "2", value: "Cyprus"},
        {id: "3", value: "United States"},
        {id: "4", value: "Japan"},
        {id: "5", value: "Isle of Man"},
        {id: "6", value: "Egypt"},
        {id: "7", value: "Somalia"},
        {id: "8", value: "United Kingdom"},
        {id: "9", value: "Iran (Persia)"},
        {id: "10", value: "United Arab Emirates"},
        {id: "11", value: "Burma"},
        {id: "12", value: "Thailand"},
        {id: "13", value: "Russia"},
        {id: "14", value: "Greece"},
        {id: "15", value: "Canada"},
        {id: "16", value: "Turkey"},
        {id: "17", value: "Norway"},
        {id: "18", value: "China"},
        {id: "19", value: "Australia"},
        {id: "20", value: "France"}
    ]

    const filter_data_temperament = [
        {id: "1", value: "Sedate"},
        {id: "2", value: "Tenacious"},
        {id: "3", value: "Loyal"},
        {id: "4", value: "Friendly"},
        {id: "5", value: "Curious"},
        {id: "6", value: "Expressive"},
        {id: "7", value: "Sociable"},
        {id: "8", value: "Dependent"},
        {id: "9", value: "Outgoing"},
        {id: "10", value: "Loving"},
        {id: "11", value: "Warm"},
        {id: "12", value: "Devoted"},
        {id: "13", value: "Clever"},
        {id: "14", value: "Easygoing"},
        {id: "15", value: "Intelligent"},
        {id: "16", value: "Energetic"},
        {id: "17", value: "Gentle"},
        {id: "18", value: "Interactive"},
        {id: "19", value: "Inquisitive"},
        {id: "20", value: "Sensible"},
        {id: "21", value: "Agile"},
        {id: "22", value: "Sensitive"},
        {id: "23", value: "Demanding"},
        {id: "24", value: "Sweet"},
        {id: "25", value: "Sweet-tempered"},
        {id: "26", value: "Trainable"},
        {id: "27", value: "Adaptable"},
        {id: "28", value: "Affectionate"},
        {id: "29", value: "Social"},
        {id: "30", value: "Calm"},
        {id: "31", value: "Playful"},
        {id: "32", value: "Shy"},
        {id: "33", value: "Fun-loving"},
        {id: "34", value: "Patient"},
        {id: "35", value: "Adventurous"},
        {id: "36", value: "Active"},
        {id: "37", value: "Independent"},
        {id: "38", value: "Talkative"},
        {id: "39", value: "Highly intelligent"},
        {id: "40", value: "Peaceful"},
        {id: "41", value: "Highly interactive"},
        {id: "42", value: "Lively"},
        {id: "43", value: "Easy Going"},
        {id: "44", value: "Relaxed"},
        {id: "45", value: "Quiet"},
        {id: "46", value: "Mischievous"},
        {id: "47", value: "Alert"}
    ]

    const [checkedNumbers, setCheckedNumbers] = useState([])
    const [checkedStringNumbers, setCheckedStringNumbers] = useState([])
    const [isTemperamentChecked, setIsTemperamentChecked] = useState(false)
    const [isCountryCodesChecked, setIsCountryCodesChecked] = useState(false)
    const [isCountryChecked, setIsCountryChecked] = useState(false)
    const [checkedTemperament, setCheckedTemperament] = useState([])
    const [checkedCountry, setCheckedCountry] = useState([])
    const [checkedCountryCodes, setCheckedCountryCodes] = useState([])
    return (
        <div>
            <Button onClick={() => {

                const filter_data = {
                    filter_number: JSON.parse(JSON.stringify(checkedNumbers)),
                    filter_bigger_number:JSON.parse(JSON.stringify(checkedStringNumbers)),
                    filter_temperament:[],
                    filter_country:[],
                    filter_country_codes:[]
                }
                if (isTemperamentChecked)
                    filter_data.filter_temperament = JSON.parse(JSON.stringify(checkedTemperament))
                if (isCountryChecked)
                    filter_data.filter_country = JSON.parse(JSON.stringify(checkedCountry))
                if (isCountryCodesChecked)
                    filter_data.filter_country_codes = JSON.parse(JSON.stringify(checkedCountryCodes))
                dispatch(updateFilter(filter_data))
            }}> Filter Data</Button>
            <Button onClick={() => {
                setCheckedNumbers([])
                //setCheckedString([])
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
            {filter_data_country_codes.map((item) => {
                return (
                    <div key={item.id}>
                        <input type="checkbox"
                               value={item.id}
                               id={item.id}
                               style={{marginLeft: 30}}
                               onChange={(e) => {
                                   const isChecked = e.target.checked
                                   const value = filter_data_country_codes[Number(e.target.value) - 1]


                                   if (isChecked) {
                                       setCheckedCountryCodes([...checkedCountryCodes, value])

                                   } else {
                                       const filtered = checkedCountryCodes.filter(item => item.id !== value.id);
                                       setCheckedCountryCodes(filtered)
                                   }


                               }}
                        />
                        <label htmlFor={item.id}>{item.value}</label>
                    </div>
                )
            })}
            <input type="checkbox"
                   value="temp"
                   id="temp"
                   onChange={(e) => {
                       const isChecked = e.target.checked
                       setIsCountryChecked(isChecked)
                   }}
            />
            <label htmlFor="temp">country</label>
            {filter_data_country.map((item) => {
                return (
                    <div key={item.id}>
                        <input type="checkbox"
                               value={item.id}
                               id={item.id}
                               style={{marginLeft: 30}}
                               onChange={(e) => {
                                   const isChecked = e.target.checked
                                   const value = filter_data_country[Number(e.target.value) - 1]


                                   if (isChecked) {
                                       setCheckedCountry([...checkedCountry, value])

                                   } else {
                                       const filtered = checkedCountry.filter(item => item.id !== value.id);
                                       setCheckedCountry(filtered)
                                   }


                               }}
                        />
                        <label htmlFor={item.id}>{item.value}</label>
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