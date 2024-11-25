import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../options";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {ArrowBack, Favorite, FavoriteBorder} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {BarChart} from "@mui/x-charts";
import SmallCatCardComponent from "../ui/smallCatCard.component";
import {addFavorite, removeFavorite, setUserData} from "../slice/userSlice";
import {useParams} from "react-router";

const CatCardComponent = () => {
    let dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));

  //  let user = ;
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [catData, setCatData] = useState(null);
    const [fullChartData, setFullChartData] = useState([]);
    const navigate = useNavigate();

    let chart_data = [
        {id: "1", value: "adaptability", data:0},
        {id: "2", value: "affection_level",  data:0},
        {id: "3", value: "child_friendly",  data:0},
        {id: "4", value: "dog_friendly",  data:0},
        {id: "5", value: "energy_level",  data:0},
        {id: "6", value: "grooming",  data:0},
        {id: "7", value: "health_issues",  data:0},
        {id: "8", value: "intelligence",  data:0},
        {id: "9", value: "shedding_level",  data:0},
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
    ]
    let { id } = useParams();

    const fetchData = async () => {

        axios.get(BASE_URL + "/breeds/" + id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data);
                setCatData(res.data)
                chart_data.map((item)=>{
                    const key = item.value
                    chart_data[Number(item.id)-1].data =  res.data[key]

                    //setFullChartData([...fullChartData, value])
                })
                console.log(chart_data)
                setFullChartData(chart_data)
                setIsDataLoading(true)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const addFavorite = async () => {

        axios.put(BASE_URL + "/users/addFavorite/"+user.name+"/" + id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                dispatch(setUserData(res.data))
                localStorage.setItem("userData",JSON.stringify(res.data))
                setUser(res.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const deleteFavorite = async () => {

        axios.put(BASE_URL + "/users/removeFavorite/"+user.name+"/" + id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                dispatch(setUserData(res.data))
                localStorage.setItem("userData",JSON.stringify(res.data))
                setUser(res.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(() => {

        setIsDataLoading(false)
        //alert(JSON.stringify(filter_data));
        fetchData();
    }, []);

    const FavoriteIcon = user.favorites.includes(id) ? <Favorite className="profile_app_bar_icon"/>:<FavoriteBorder className="profile_app_bar_icon"/>;
    if (isDataLoading) {
        return (
            <div className="cat_card_box">
                <div className="cat_card_appbar">
                    <IconButton onClick={() => {
                        navigate("/main")
                    }}>
                        <ArrowBack className="profile_app_bar_icon"/>
                    </IconButton>

                    <IconButton onClick={() => {
                        if(user.favorites.includes(id)) {
                            //dispatch(removeFavorite(cat.cat_id))
                            deleteFavorite().then()
                        }else{
                            addFavorite().then()
                            //dispatch(addFavorite(cat.cat_id))
                        }

                    }}>
                        {FavoriteIcon}
                    </IconButton>
                </div>
                <div className="cat_card_data_row">
                    <img src={"https://cdn2.thecatapi.com/images/" + catData.reference_image_id + ".jpg"}
                         width="300" height="360"
                    ></img>
                    <div className="cat_card_data_column">
                        <div className="big_text">{catData.name}</div>
                        <div className="small_text">{catData.description}</div>
                        <div className="small_text">temperament: {catData.temperament.join(", ")}</div>
                        <div className="small_text">life span: {catData.life_span_min} - {catData.life_span_max}</div>
                        <div className="small_text">origin: {catData.origin}</div>
                    </div>
                </div>
                <BarChart className="chart"
                          dataset={fullChartData}
                          xAxis={[{scaleType: 'band', dataKey: "value"}]}
                          series={[{dataKey: 'data'}]}
                          width={1000}
                          height={500}
                />
                <label className="big_text" style={{fontSize:24}}>Links:</label>
                <label className="small_text">{catData.cfa_url}</label>
                <label className="small_text">{catData.vcahospitals_url}</label>
                <label className="small_text">{catData.vetstreet_url}</label>
                <label className="small_text">{catData.wikipedia_url}</label>
                <div className="comment_box">

                </div>
            </div>
        )
    } else {
        return (
            <Box className="cat_card_progress_bar">
                <CircularProgress/>
            </Box>
        )
    }

}
export default CatCardComponent