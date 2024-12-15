import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Icon, IconButton} from "@mui/material";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import {setPage} from "../slice/dataSlice";

const PaginationComponent=(props)=>{
    let data = useSelector(state => state.data);

    const imgRef = useRef();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    if( data.amountOfPages === 1)
        return (
            <div>
            </div>
        )
    else if (data.page === 1)
        return (
            <div>
                <label>{data.page}</label>
                <IconButton onClick={() => dispatch(setPage(data.page + 1))}>
                    <ArrowRight></ArrowRight>
               </IconButton>
           </div>
        )
    else if(data.page === data.amountOfPages)
        return(<div><IconButton onClick={()=>dispatch(setPage(data.page-1))}>
            <ArrowLeft></ArrowLeft>
        </IconButton>
            <label>{data.page}</label>
</div>
        )
    else
        return (<div>
            <IconButton onClick={()=>dispatch(setPage(data.page-1))}>
                <ArrowLeft></ArrowLeft>
            </IconButton>
            <label>{data.page}</label>
            <IconButton onClick={()=>dispatch(setPage(data.page+1))}>
                <ArrowRight></ArrowRight>
            </IconButton>
        </div>)
}
export default PaginationComponent