import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {BarChart} from "@mui/x-charts";
import {updateFilter} from "../slice/filterSlice";
import {setPage} from "../slice/dataSlice";

const StatisticComponent = () => {
    const [eventData, setEventData] = useState(null);
    const navigate = useNavigate();
    const [fullChartData, setFullChartData] = useState([
        {id: "1", value: "adaptability", data:0},
        {id: "2", value: "affection_level",  data:0},
        {id: "3", value: "child_friendly",  data:0},
        {id: "4", value: "dog_friendly",  data:0},
        {id: "5", value: "energy_level",  data:0},
        {id: "6", value: "grooming",  data:0},
        {id: "7", value: "health_issues",  data:0},
        {id: "8", value: "intelligence",  data:0},
        {id: "9", value: "shedding_level",  data:5},
        {id: "10", value: "social_needs",  data:0},
        {id: "11", value: "stranger_friendly",  data:0},
        {id: "12", value: "vocalisation",  data:0},
        {id: "13", value: "hairless",  data:0},
        {id: "14", value: "experimental",  data:0},
        {id: "15", value: "natural",  data:0},
        {id: "16", value: "rare",  data:0},
        {id: "17", value: "rex",  data:0},
        {id: "18", value: "suppressed_tail",  data:0},
        {id: "19", value: "short_legs",  data:0},
        {id: "20", value: "hypoallergenic",  data:0},
        {id: "21", value: "indoor",  data:0},
        {id: "22", value: "lap",  data:0},
    ]);
    const filter_data_numbers = [
        {id: "1", value: "adaptability",    from: 1, to: 5},
        {id: "2", value: "affectionLevel",  from: 1, to: 5},
        {id: "3", value: "childFriendly",   from: 1, to: 5},
        {id: "4", value: "dogFriendly",     from: 1, to: 5},
        {id: "5", value: "energyLevel",     from: 1, to: 5},
        {id: "6", value: "grooming",        from: 1, to: 5},
        {id: "7", value: "healthIssues",    from: 1, to: 5},
    ]
    const filter_data_breeds = [
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
    const fetchData = async () => {
        axios.get("http://127.0.0.1:1240/api/events", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data);
                setEventData(res.data)

            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(() => {

        fetchData();
    }, []);
    const [age, setAge] = React.useState('');
    return (
        <div className="profile_box">
            <div className="profile_app_bar">

                <IconButton onClick={() => {navigate("/profile")}}>
                    <ArrowBack className="profile_app_bar_icon"/>
                </IconButton>

                <FormControl className="autocomplete">
                    <InputLabel id="demo-simple-select-label">type</InputLabel>
                    <Select className="autocomplete_text"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={(e)=>{
                            setAge(e.target.value);
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

            </div>
            <div className="big_text">Stats</div>
            <div className="row">
                <BarChart className="chart"
                          dataset={fullChartData}
                          xAxis={[{scaleType: 'band', dataKey: "value"}]}
                          series={[{dataKey: 'data'}]}
                          width={1000}
                          height={500}
                />
                {/*<div className="filter_box">*/}
                {/*    <div>*/}
                {/*        <Button onClick={() => {*/}

                {/*        }}> Filter Data</Button>*/}
                {/*        <Button onClick={() => {*/}
                {/*            window.location.reload();*/}
                {/*        }}> drop </Button>*/}
                {/*    </div>*/}

                {/*    {filter_data_numbers.map((item) => {*/}
                {/*        return (*/}

                {/*            <div key={item.id} className="filter_row">*/}
                {/*                <div>*/}
                {/*                    <input type="checkbox"*/}
                {/*                           value={item.id}*/}
                {/*                           id={item.id}*/}
                {/*                           className="filter_check_box"*/}
                {/*                           onChange={(e) => {*/}
                {/*                               const isChecked = e.target.checked*/}
                {/*                               //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;*/}
                {/*                               const value = filter_data_numbers[Number(e.target.value) - 1]*/}


                {/*                               if (isChecked) {*/}
                {/*                                   setCheckedNumbers([...checkedNumbers, value])*/}

                {/*                               } else {*/}
                {/*                                   const filtered = checkedNumbers.filter(item => item.id !== value.id);*/}
                {/*                                   setCheckedNumbers(filtered)*/}
                {/*                               }*/}


                {/*                           }}*/}
                {/*                    />*/}
                {/*                    <label className="filter_text" htmlFor={item.id}>{item.value}</label>*/}
                {/*                </div>*/}

                {/*                <div>*/}
                {/*                    <label className="filter_text"> from</label>*/}
                {/*                    <input type="number" min="1" max="5" onChange={(e) => {*/}
                {/*                        if (Number(e.target.value) > 5 || Number(e.target.value) < 1) {*/}
                {/*                            e.target.value = "1"*/}
                {/*                        } else {*/}
                {/*                            const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);*/}
                {/*                            if (index !== -1) {*/}
                {/*                                //alert(JSON.stringify(checkedNumbers[index]))*/}
                {/*                                checkedNumbers[index].from = Number(e.target.value);*/}
                {/*                            }*/}
                {/*                            filter_data_numbers[Number(item.id) - 1].from = Number(e.target.value);*/}
                {/*                        }*/}
                {/*                    }} placeholder="1"/>*/}
                {/*                    <label className="filter_text"> to</label>*/}
                {/*                    <input type="number" min="1" max="5" onChange={(e) => {*/}
                {/*                        if (Number(e.target.value) > 5 || Number(e.target.value) < 1) {*/}
                {/*                            e.target.value = "1"*/}
                {/*                        } else {*/}
                {/*                            const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);*/}
                {/*                            if (index !== -1) {*/}
                {/*                                checkedNumbers[index].to = Number(e.target.value);*/}
                {/*                            }*/}
                {/*                            filter_data_numbers[Number(item.id) - 1].to = Number(e.target.value);*/}
                {/*                        }*/}
                {/*                    }} placeholder="5"/>*/}
                {/*                </div>*/}


                {/*            </div>*/}

                {/*        )*/}
                {/*    })}*/}

                {/*    <Autocomplete className="autocomplete"*/}

                {/*                  multiple*/}
                {/*                  options={filter_data_country_codes}*/}
                {/*                  onChange={(event, newValue) => {*/}
                {/*                      setCheckedCountryCodes(newValue);*/}
                {/*                  }}*/}
                {/*                  getOptionLabel={(option) => option.value}*/}
                {/*                  disableCloseOnSelect*/}
                {/*                  renderInput={(params) => (*/}
                {/*                      <TextField className="autocomplete_text"*/}
                {/*                                 {...params}*/}
                {/*                                 variant="outlined"*/}
                {/*                                 label="Country Codes"*/}

                {/*                      />*/}
                {/*                  )}*/}
                {/*    />*/}

                {/*</div>*/}
            </div>
        </div>
    )
}
export default StatisticComponent