import {Input, Button, TextField, InputAdornment, IconButton} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setSearch} from "../filterSlice.js";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {search_input, text_input} from "../Themes";
import {Search} from "@mui/icons-material";
const SearchComponent = () => {
    const [searchInput, setSearchInputData] = useState("");
    let dispatch = useDispatch();
    const handleClickProfile = (() => {
        dispatch(setSearch(searchInput))
    });
    return(
        // <div>
        //     <Input value={searchInput} onChange={(e) => setSearchInputData(e.target.value)}></Input>
        //     <Button onClick ={() => {
        //
        //     }}>Search</Button>
        // </div>
        <TextField className="search_input"
                   placeholder="search"
                   variant="standard"
                   InputProps={{
                       disableUnderline: true,
                       endAdornment:
                           <InputAdornment position="end" >
                               <IconButton
                                   onClick={handleClickProfile}
                                   edge="end"
                                   style={{
                                       marginRight:10,
                                   }}
                                   size="large"
                               >
                                  <Search/>
                               </IconButton>
                           </InputAdornment>

                   }}
                   sx ={search_input}
                   value={searchInput}
                   onChange={(e)=>{setSearchInputData(e.target.value)}}

        />
    )
}
export default SearchComponent