import React, {useState} from "react";

const ProfileComponent = () => {

    const [userData, setUserData] = useState(null);


    return(
        <div>
            <h3>Profile</h3>
            <div>
                <img src={"../cats/resource/profile.png"} width="300" height="300" alt="profile"/>
                <div>
                    <div>Name</div>
                    <div>Age:</div>
                    <div>Creation date:</div>
                    <div>Last edit date:</div>
                </div>
            </div>
            <h4>Favorites</h4>
            <h4>Notifications</h4>
            <h4>Comments</h4>
            <h4>Likes</h4>
        </div>
    )
}
export default ProfileComponent