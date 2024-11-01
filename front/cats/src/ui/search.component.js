import {Input, Button} from "@mui/material";
import {useState} from "react";
const SearchComponent = () => {
    const [searchInput, setSearchInputData] = useState(null);
    return(
        <div>
            <h3>Stat</h3>
            <Input value={searchInput} onChange={(e) => setSearchInputData(e.target.value)}></Input>
            <Button>Search</Button>
        </div>
    )
}
export default SearchComponent