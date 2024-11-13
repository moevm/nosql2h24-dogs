import {useEffect, useState} from "react";
import axios from "axios";

const StatisticComponent = () => {
    const [eventData, setEventData] = useState(null);
    const fetchData = async () => {
        axios.get("http://backend:1240/api/events", {
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
    return (
        <div><h3>Stat</h3>
            {JSON.stringify(eventData)}</div>
    )
}
export default StatisticComponent