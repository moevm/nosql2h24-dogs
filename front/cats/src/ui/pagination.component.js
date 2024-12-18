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
            <div className="pagination_row">
                <label className="medium_text">{data.page}</label>
                <IconButton onClick={() => dispatch(setPage(data.page + 1))}>
                    <ArrowRight className="profile_app_bar_icon"></ArrowRight>
               </IconButton>
           </div>
        )
    else if(data.page === data.amountOfPages)
        return(<div className="pagination_row"><IconButton onClick={()=>dispatch(setPage(data.page-1))}>
            <ArrowLeft className="profile_app_bar_icon"></ArrowLeft>
        </IconButton>
            <label className="medium_text">{data.page}</label>
</div>
        )
    else
        return (<div className="pagination_row">
            <IconButton onClick={()=>dispatch(setPage(data.page-1))}>
                <ArrowLeft className="profile_app_bar_icon"></ArrowLeft>
            </IconButton>
            <label className="medium_text">{data.page}</label>
            <IconButton onClick={()=>dispatch(setPage(data.page+1))}>
                <ArrowRight className="profile_app_bar_icon"></ArrowRight>
            </IconButton>
        </div>)
}
export default PaginationComponent