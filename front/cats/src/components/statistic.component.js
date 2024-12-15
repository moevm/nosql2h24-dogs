import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {BarChart} from "@mui/x-charts";
import {updateFilter} from "../slice/filterSlice";
import {setPage} from "../slice/dataSlice";
import FilterComponent from "../ui/filter.component";
import {BASE_URL, BREEDS, FILTER_DATA_NUMBERS, FILTER_STAT} from "../options";

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

    const fetchData = async () => {
        axios.get(BASE_URL+"/events", {
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
    const [breeds, setBreeds] = React.useState([]);
    const [filterStat, setFilterStat] = React.useState([]);
    const autocomplete = [
        {
            options:BREEDS,
            onChange(event, newValue){
                setBreeds(newValue);
            },
            label:"breeds"
        },
    ]
    const min_max_filter = [
        {
            min:1,
            max:100,
            data: FILTER_STAT,
            onChangeCheck(e){
                const isChecked = e.target.checked
                //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                const value = FILTER_STAT[Number(e.target.value) - 1]
                if (isChecked) {
                    setFilterStat([...filterStat, value])

                } else {
                    const filtered = filterStat.filter(item => item.id !== value.id);
                    setFilterStat(filtered)
                }
            },
            onChangeFrom(e,item){
                if (Number(e.target.value) > this.max || Number(e.target.value) < this.min) {
                    e.target.value = this.min
                } else {
                    const index = filterStat.findIndex(itemm => itemm.id === item.id);
                    if (index !== -1) {
                        //alert(JSON.stringify(checkedNumbers[index]))
                        filterStat[index].from = Number(e.target.value);
                    }
                    //filter_data_numbers[Number(item.id) - 1].from = Number(e.target.value);
                }
            },
            onChangeTo(e,item){
                if (Number(e.target.value) > this.max || Number(e.target.value) < this.min) {
                    e.target.value = this.max
                } else {
                    const index = filterStat.findIndex(itemm => itemm.id === item.id);
                    if (index !== -1) {
                        filterStat[index].to = Number(e.target.value);
                    }
                    //filter_data_numbers[Number(item.id) - 1].to = Number(e.target.value);
                }
            }

        }
    ]
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
                <FilterComponent
                    onFilterClick = {()=>{

                    }}
                    onDropClick = {()=>{
                        window.location.reload();
                    }}
                    autocomplete = {autocomplete}
                    min_max_filter = {min_max_filter}
                ></FilterComponent>
            </div>
        </div>
    )
}
export default StatisticComponent