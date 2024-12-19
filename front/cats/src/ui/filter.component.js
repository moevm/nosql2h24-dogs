import {useState} from "react";
import {Autocomplete, Button, Input, InputLabel, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateFilter} from "../slice/filterSlice.js";
import {tab} from "@testing-library/user-event/dist/tab";
import {dark_purple_color, text_input} from "../Themes";
import {setPage} from "../slice/dataSlice";
import {FILTER_DATA_TEMPERAMENT} from "../options";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
export const FilterComponent = (props) => {



    // const [checkedNumbers, setCheckedNumbers] = useState([])
    // const [checkedStringNumbers, setCheckedStringNumbers] = useState([])

    // const [checkedTemperament, setCheckedTemperament] = useState([])
    // const [checkedCountry, setCheckedCountry] = useState([])
    // const [checkedCountryCodes, setCheckedCountryCodes] = useState([])


    return (
        <div className="filter_box">
            <div>
                <Button onClick={() => {

                    props.onFilterClick()
                }}> Filter Data</Button>
                <Button onClick={() => {
                    // setCheckedNumbers([])
                    // //setCheckedString([])
                    // window.location.reload();
                    props.onDropClick()
                }}> drop </Button>
            </div>
            {props.min_max_filter?.map((elem)=>{
                return(
                    <>
                        {elem.data.map((item)=>{
                            return (
                                <div key={item.id} className="filter_row">
                                    <div>
                                        <input type="checkbox"
                                               value={item.id}
                                               id={item.id}
                                               className="filter_check_box"
                                               onChange={(e) => {
                                                   elem.onChangeCheck(e)

                                               }}
                                        />
                                        <label className="filter_text" htmlFor={item.id}>{item.value}</label>
                                    </div>

                                    <div>
                                        <label className="filter_text"> from</label>
                                        <input type="number" min={elem.min} max={elem.max} onChange={(e) => {
                                            elem.onChangeFrom(e, item)
                                        }} placeholder={elem.min}/>
                                        <label className="filter_text"> to</label>
                                        <input type="number" min="1" max="5" onChange={(e) => {

                                            elem.onChangeTo(e, item)
                                        }} placeholder={elem.max}/>
                                    </div>


                                </div>
                            )
                        })}
                    </>
                )

            })}

            {props?.autocomplete?.map((item) => {
                return(
                <Autocomplete className="autocomplete"

                              multiple
                              options={item.options}
                              onChange={(event, newValue) => {
                                  item.onChange(event,newValue);
                                  //setCheckedCountryCodes(newValue);
                              }}
                              getOptionLabel={(option) => option.value}
                              disableCloseOnSelect
                              renderInput={(params) => (
                                  <TextField className="autocomplete_text"
                                             {...params}
                                             variant="outlined"
                                             label={item.label}

                                  />
                              )}
                />
            )
            })}

            {props?.max_filter?.map((elem)=>{
                return(
                    <div className="filter_row">

                            <label className="filter_text"> limit</label>
                            <input type="number" min={elem.min}  onChange={(e) => {
                                elem.onChange(e)
                            }}
                                   placeholder={elem.placeholder}/>

                    </div>
                )
            })}
            {
                props?.date_filter?.map((elem)=>{
                    return(
                        <div>
                            <div>
                                <input type="checkbox"
                                       className="filter_check_box"
                                       onChange={(e) => {
                                           elem.onChangeCheck(e)

                                       }}
                                />
                                <label className="filter_text" >{elem.label}</label>
                            </div>
                            <br/>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >

                                <label className="filter_text"> from</label>
                                <MobileDateTimePicker onChange={(e) => {
                                    elem.onChangeFrom(e)
                                }
                                } />
                                <label className="filter_text"> to</label>
                                <MobileDateTimePicker onChange={(e) => {
                                    elem.onChangeTo(e)
                                }
                                }
                                                      // defaultValue={dayjs('2024-09-17T17:30')}
                                />
                            </LocalizationProvider>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default FilterComponent