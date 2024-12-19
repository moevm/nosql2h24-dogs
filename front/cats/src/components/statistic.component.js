import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {BarChart} from "@mui/x-charts";
import {updateFilter} from "../slice/filterSlice";
import {setPage} from "../slice/dataSlice";
import FilterComponent from "../ui/filter.component";
import {BASE_URL, BREEDS, FILTER_DATA_NUMBERS, FILTER_STAT, STAT_TYPES} from "../options";
import Box from "@mui/material/Box";

const StatisticComponent = () => {

    const navigate = useNavigate();
    const [typeRequest, setTypeRequest] = React.useState(STAT_TYPES[0].value);
    const [type, setType] = React.useState(STAT_TYPES[0].type);

    const [breeds, setBreeds] = React.useState([]);

    const [filterStat, setFilterStat] = React.useState([]);


    const [limit, setLimit] = React.useState(10);

    const [dateFromFilter, setDateFromFilter] = React.useState(null);
    const [dateToFilter, setDateToFilter] = React.useState(null);
    const [dateChecked, setDateChecked] = React.useState(false);

    const [fullChartData, setFullChartData] = useState([

    ]);


    // useEffect(() => {
    //
    //     fetchData();
    // }, []);


    const autocomplete = [
        {
            options:BREEDS,
            onChange(event, newValue){
                setBreeds(newValue);
            },
            label:"breeds"
        },
    ]
    const max_filter = [
        {
            min:1,
            onChange(e){

                if(e.target.value>0){
                    setLimit(Number(e.target.value));
                }else{
                    //setLimit(10)
                }

            },
            placeholder:10
        }
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
    const date_filter = [
        {
            label:"date",
            onChangeFrom(value){
                //console.log(value.format('YYYY-MM-DDTHH:mm:ss'))
                setDateFromFilter(value.format('YYYY-MM-DDTHH:mm:ss'))
            },
            onChangeTo(value){
               setDateToFilter(value.format('YYYY-MM-DDTHH:mm:ss'))
            },
            onChangeCheck(e){
                setDateChecked(e.target.checked)
            }
        }
    ]


    const getFilteredData = async () => {
        let url = BASE_URL+"/statistic/?type="+typeRequest + "&limit=" +limit
        if(dateChecked) url+="&dateFromFilter="+dateFromFilter+"&dateToFilter="+dateToFilter
        if(breeds.length>0 && type==="breed"){
            let list_string=[]
            breeds.forEach(item=>{
                list_string.push(item.breedId)
            })
            url+="&breeds="+list_string
        }
        if(filterStat.length>0 && type==="user"){
            filterStat.forEach(item=>{
                url+="&"+item.value+"From="+item.from+"&"+item.value+"To="+item.to
            })
        }

        console.log(url)
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data.data);
                //setEventData(res.data)
                setFullChartData(res.data.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const fetchData = async () => {
        let url = BASE_URL+"/statistic/?type="+typeRequest

        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data.data);
                //setEventData(res.data)
                setFullChartData(res.data.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }

    useEffect(() => {
        fetchData()
    },[typeRequest])



    return (
        <div className="profile_box">
            <div className="profile_app_bar">

                <IconButton onClick={() => {navigate("/profile")}}>
                    <ArrowBack className="profile_app_bar_icon"/>
                </IconButton>

                <FormControl className="select" sx = {{minWidth:400}}>
                    <InputLabel id="demo-simple-select-label">type</InputLabel>
                    <Select className="autocomplete_text"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeRequest}
                        label="type"
                        onChange={(e)=>{
                            setTypeRequest(e.target.value);
                            const filtered = STAT_TYPES.filter(item => item.value === e.target.value);
                            setType(filtered[0].type)
                        }}
                            defaultValue={typeRequest}
                    >
                        {STAT_TYPES.map((item)=>{
                            return(<MenuItem value={item.value}>{item.label}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

            </div>
            <div className="big_text">Stats</div>
            <div className="row">
                <BarChart className="chart"
                          dataset={fullChartData}
                          xAxis={[{scaleType: 'band', dataKey: "name"}]}
                          series={[{dataKey: 'value'}]}
                          width={1000}
                          height={500}
                />
                <FilterComponent
                    onFilterClick = {()=>{
                       getFilteredData()
                    }}
                    onDropClick = {()=>{
                        window.location.reload();
                    }}
                    autocomplete = {type==="breed"?autocomplete:[]}
                    min_max_filter = {type==="user"?min_max_filter:[]}
                    max_filter = {max_filter}
                    date_filter = {date_filter}
                ></FilterComponent>

            </div>

        </div>
    )
}
export default StatisticComponent