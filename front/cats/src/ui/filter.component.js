import {useState} from "react";
import {Autocomplete, Button, Input, InputLabel, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateFilter} from "../slice/filterSlice.js";
import {tab} from "@testing-library/user-event/dist/tab";
import {dark_purple_color, text_input} from "../Themes";

export const FilterComponent = () => {

    let dispatch = useDispatch();

    const filter_data_numbers = [
        {id: "1", value: "adaptability",    from: 1, to: 5},
        {id: "2", value: "affectionLevel",  from: 1, to: 5},
        {id: "3", value: "childFriendly",   from: 1, to: 5},
        {id: "4", value: "dogFriendly",     from: 1, to: 5},
        {id: "5", value: "energyLevel",     from: 1, to: 5},
        {id: "6", value: "grooming",        from: 1, to: 5},
        {id: "7", value: "healthIssues",    from: 1, to: 5},
        {id: "8", value: "intelligence",    from: 1, to: 5},
        {id: "9", value: "sheddingLevel",   from: 1, to: 5},
        {id: "10", value: "socialNeeds",    from: 1, to: 5},
        {id: "11", value: "strangerFriendly",from: 1, to: 5},
        {id: "12", value: "vocalisation",   from: 1, to: 5},
        {id: "13", value: "hairless",       from: 1, to: 5},
        {id: "14", value: "experimental",   from: 1, to: 5},
        {id: "15", value: "natural",        from: 1, to: 5},
        {id: "16", value: "rare",           from: 1, to: 5},
        {id: "17", value: "rex",            from: 1, to: 5},
        {id: "18", value: "suppressedTail", from: 1, to: 5},
        {id: "19", value: "shortLegs",      from: 1, to: 5},
        {id: "20", value: "hypoallergenic", from: 1, to: 5},
        {id: "21", value: "indoor",         from: 1, to: 5},
        {id: "22", value: "lap",            from: 1, to: 5},
    ]
    const filter_data_string_numbers = [
        {id: "1", value: "weight", from: 0, to: 0},
        {id: "2", value: "lifeSpan", from: 0, to: 0},
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

    const [checkedTemperament, setCheckedTemperament] = useState([])
    const [checkedCountry, setCheckedCountry] = useState([])
    const [checkedCountryCodes, setCheckedCountryCodes] = useState([])


    return (
        <div className="filter_box">
            <div>
                <Button onClick={() => {

                    const filter_data = {
                        filter_number: JSON.parse(JSON.stringify(checkedNumbers)),
                        filter_bigger_number: JSON.parse(JSON.stringify(checkedStringNumbers)),
                        filter_temperament: JSON.parse(JSON.stringify(checkedTemperament)),
                        filter_country: JSON.parse(JSON.stringify(checkedCountry)),
                        filter_country_codes: JSON.parse(JSON.stringify(checkedCountryCodes))
                    }
                    console.log(JSON.stringify(filter_data))
                    dispatch(updateFilter(filter_data))
                }}> Filter Data</Button>
                <Button onClick={() => {
                    setCheckedNumbers([])
                    //setCheckedString([])
                    window.location.reload();
                }}> drop </Button>
            </div>

            {filter_data_numbers.map((item) => {
                return (

                    <div key={item.id} className="filter_row">
                        <div>
                            <input type="checkbox"
                                   value={item.id}
                                   id={item.id}
                                   className="filter_check_box"
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
                            <label className="filter_text" htmlFor={item.id}>{item.value}</label>
                        </div>

                        <div>
                            <label className="filter_text"> from</label>
                            <input type="number" min="1" max="5" onChange={(e) => {
                                if (Number(e.target.value) > 5 || Number(e.target.value) < 1) {
                                    e.target.value = "1"
                                } else {
                                    const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);
                                    if (index !== -1) {
                                        //alert(JSON.stringify(checkedNumbers[index]))
                                        checkedNumbers[index].from = Number(e.target.value);
                                    }
                                    filter_data_numbers[Number(item.id) - 1].from = Number(e.target.value);
                                }
                            }} placeholder="1"/>
                            <label className="filter_text"> to</label>
                            <input type="number" min="1" max="5" onChange={(e) => {
                                if (Number(e.target.value) > 5 || Number(e.target.value) < 1) {
                                    e.target.value = "1"
                                } else {
                                    const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);
                                    if (index !== -1) {
                                        checkedNumbers[index].to = Number(e.target.value);
                                    }
                                    filter_data_numbers[Number(item.id) - 1].to = Number(e.target.value);
                                }
                            }} placeholder="5"/>
                        </div>


                    </div>

                )
            })}

            {filter_data_string_numbers.map((item) => {
                return (

                    <div key={item.id} className="filter_row">
                        <div>
                            <input type="checkbox"
                                   value={item.id}
                                   id={item.id}
                                   className="filter_check_box"
                                   onChange={(e) => {
                                       const isChecked = e.target.checked
                                       //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                                       const value = filter_data_string_numbers[Number(e.target.value) - 1]


                                       if (isChecked) {
                                           setCheckedStringNumbers([...checkedStringNumbers, value])

                                       } else {
                                           const filtered = checkedStringNumbers.filter(item => item.id !== value.id);
                                           setCheckedStringNumbers(filtered)
                                       }


                                   }}
                            />
                            <label className="filter_text" htmlFor={item.id}>{item.value}</label>
                        </div>

                        <div>
                            <label className="filter_text"> from</label>
                            <input type="number" min="0" max="20" onChange={(e) => {
                                if (Number(e.target.value) > 20 || Number(e.target.value) < 0) {
                                    e.target.value = "0"
                                } else {
                                    const index = checkedStringNumbers.findIndex(itemm => itemm.id === item.id);
                                    if (index !== -1) {
                                        //alert(JSON.stringify(checkedNumbers[index]))
                                        checkedStringNumbers[index].from = Number(e.target.value);
                                    }
                                    filter_data_string_numbers[Number(item.id) - 1].from = Number(e.target.value);
                                }
                            }}/>
                            <label className="filter_text"> to</label>
                            <input type="number" min="0" max="20" onChange={(e) => {
                                if (Number(e.target.value) > 20 || Number(e.target.value) < 0) {
                                    e.target.value = "0"
                                } else {
                                    const index = checkedStringNumbers.findIndex(itemm => itemm.id === item.id);
                                    if (index !== -1) {
                                        checkedStringNumbers[index].to = Number(e.target.value);
                                    }
                                    filter_data_string_numbers[Number(item.id) - 1].to = Number(e.target.value);
                                }
                            }}/>
                        </div>


                    </div>

                )
            })}


            <Autocomplete className="autocomplete"

                          multiple
                          options={filter_data_country_codes}
                          onChange={(event, newValue) => {
                              setCheckedCountryCodes(newValue);
                          }}
                          getOptionLabel={(option) => option.value}
                          disableCloseOnSelect
                          renderInput={(params) => (
                              <TextField className="autocomplete_text"
                                         {...params}
                                         variant="outlined"
                                         label="Country Codes"

                              />
                          )}
            />
            <Autocomplete className="autocomplete"
                          multiple
                          options={filter_data_country}
                          onChange={(event, newValue) => {
                              setCheckedCountry(newValue);
                          }}
                          getOptionLabel={(option) => option.value}
                          disableCloseOnSelect
                          renderInput={(params) => (
                              <TextField className="autocomplete_text"
                                         {...params}
                                         variant="outlined"
                                         label="Country"
                              />
                          )}
            />

            <Autocomplete className="autocomplete"
                          multiple
                          options={filter_data_temperament}
                          onChange={(event, newValue) => {
                              setCheckedTemperament(newValue);
                          }}
                          getOptionLabel={(option) => option.value}
                          disableCloseOnSelect
                          renderInput={(params) => (
                              <TextField className="autocomplete_text"
                                         {...params}
                                         variant="outlined"
                                         label="Temperament"

                              />
                          )}
            />


        </div>
    )
}

export default FilterComponent