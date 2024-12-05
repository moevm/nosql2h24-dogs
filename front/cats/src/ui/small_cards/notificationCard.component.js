import React, {useRef} from 'react';

const NotificationCardComponent=(props)=>{

    return(
        <div className="notification_card">
            <label className="small_text">{props.name}</label>
            <label className="small_text">{props.comment}</label>
        </div>
    )
}
export default NotificationCardComponent