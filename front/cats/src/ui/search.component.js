import {Input, Button} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setSearch} from "../filterSlice.js";
const SearchComponent = () => {
    const [searchInput, setSearchInputData] = useState("");
    let dispatch = useDispatch();
    return(
        <div>
            <Input value={searchInput} onChange={(e) => setSearchInputData(e.target.value)}></Input>
            <Button onClick ={() => {
                dispatch(setSearch(searchInput))
            }}>Search</Button>
        </div>
    )
}
export default SearchComponent