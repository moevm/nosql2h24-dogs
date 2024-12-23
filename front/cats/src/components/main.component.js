import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    catOptions,
    FILTER_DATA_COUNTRY,
    FILTER_DATA_COUNTRY_CODES,
    FILTER_DATA_NUMBERS, FILTER_DATA_STRING_NUMBERS,
    FILTER_DATA_TEMPERAMENT
} from "../options";
import data from "../profiles.json";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchComponent from "../ui/search.component";
import CatGridComponent from "../ui/catGrid.component";
import FilterComponent from "../ui/filter.component";
import {ArrowBack, PersonOutline} from "@mui/icons-material";
import ImpExpComponent from "./ImpExp.Component";
import {setUserData} from "../slice/userSlice";
import {useDispatch} from "react-redux";
import {updateFilter} from "../slice/filterSlice";
import {setPage} from "../slice/dataSlice";

export const MainComponent = () => {
    let user_data = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userData"));
    const imp = user.admin ? <ImpExpComponent></ImpExpComponent>:<></>
    useEffect(()=>{
        if(Object.keys(user_data).length === 0)
            navigate("/sign_in")

    },[]);
    let dispatch = useDispatch();
    const [checkedTemperament, setCheckedTemperament] = useState([])
    const [checkedCountry, setCheckedCountry] = useState([])
    const [checkedCountryCodes, setCheckedCountryCodes] = useState([])
    const [checkedNumbers, setCheckedNumbers] = useState([])
    const [checkedStringNumbers, setCheckedStringNumbers] = useState([])
    const autocomplete = [
        {
            options:FILTER_DATA_COUNTRY_CODES,
            onChange(event, newValue){
                setCheckedCountryCodes(newValue);
            },
            label:"Country Codes"
        },
        {
            options:FILTER_DATA_COUNTRY,
            onChange(event, newValue){
                setCheckedCountry(newValue);
            },
            label:"Country"
        },
        {
            options:FILTER_DATA_TEMPERAMENT,
            onChange(event, newValue){
                setCheckedTemperament(newValue);
            },
            label:"Temperament"
        },
    ]


    let marks_1_5=[]
    for (let step = 1; step <= 5; step++) {
        marks_1_5.push({
            value: step,
            label: step.toString(),
        })
    }
    let marks_20=[]
    for (let step = 0; step <=20; step+=5) {
        marks_20.push({
            value: step,
            label: step.toString(),
        })
    }
    const min_max_filter = [
        {
            min:1,
            max:5,
            data: FILTER_DATA_NUMBERS,
            onChangeCheck(e){
                const isChecked = e.target.checked
                //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                const value = FILTER_DATA_NUMBERS[Number(e.target.value) - 1]
                if (isChecked) {
                    setCheckedNumbers([...checkedNumbers, value])

                } else {
                    const filtered = checkedNumbers.filter(item => item.id !== value.id);
                    setCheckedNumbers(filtered)
                }
            },
            onChange(newValue,id){
                const index = checkedNumbers.findIndex(itemm => itemm.id === id);
                if(index!==-1){
                    checkedNumbers[index].from = newValue[0];
                    checkedNumbers[index].to = newValue[1];
                }
            },
            step:1,
            marks: marks_1_5,
            checked:checkedNumbers
        },
        {
            min:0,
            max:20,
            data: FILTER_DATA_STRING_NUMBERS,
            onChangeCheck(e){
                const isChecked = e.target.checked
                //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                const value = FILTER_DATA_STRING_NUMBERS[Number(e.target.value) - 1]
                if (isChecked) {
                    setCheckedStringNumbers([...checkedStringNumbers, value])

                } else {
                    const filtered = checkedStringNumbers.filter(item => item.id !== value.id);
                    setCheckedStringNumbers(filtered)
                }
            },
            onChange(newValue,id){

                const index = checkedStringNumbers.findIndex(itemm => itemm.id === id);
                if(index!==-1){
                    checkedStringNumbers[index].from = newValue[0];
                    checkedStringNumbers[index].to = newValue[1];
                    //alert(JSON.stringify(checkedStringNumbers[index]))
                }

            },
            step:1,
            marks: marks_20,
            checked:checkedStringNumbers
        },
    ]
    return (
        <div className="main_box">
            <div className="main_app_bar">
                <SearchComponent></SearchComponent>
                {imp}
                <IconButton onClick={() => {
                    navigate("/profile")
                    }}>
                    <PersonOutline className="profile_app_bar_icon"/>
                </IconButton>
            </div>

            <div className="main_main_box">
                <CatGridComponent></CatGridComponent>
                <FilterComponent
                    onFilterClick = {()=>{
                        const filter_data = {
                            filter_number: JSON.parse(JSON.stringify(checkedNumbers)),
                            filter_bigger_number: JSON.parse(JSON.stringify(checkedStringNumbers)),
                            filter_temperament: JSON.parse(JSON.stringify(checkedTemperament)),
                            filter_country: JSON.parse(JSON.stringify(checkedCountry)),
                            filter_country_codes: JSON.parse(JSON.stringify(checkedCountryCodes))
                        }
                        console.log(JSON.stringify(filter_data))
                        dispatch(updateFilter(filter_data))
                        dispatch(setPage(1))
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

export default MainComponent