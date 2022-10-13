import React, {useEffect, useState} from 'react';
import ProfileData from './ProfileData/ProfileData';
import ProfileImage from './ProfileImage/ProfileImage';
import "./ProfileSettings.scss";
import {useDispatch, useSelector} from "react-redux";
import {settingsAsync} from "../../SettingsSlice";

function ProfileSettings() {
    const [changeName, setChangeName] = useState(false);
    const dispatch = useDispatch();

    const settings = useSelector(((state) => state.settings))
    const token = localStorage.getItem('ACCESS_TOKEN')

    useEffect(() => {
        dispatch(settingsAsync(token))
    }, [changeName])

    return (
        <div className="profile_settings">
            <div className="profile_settings_container">
                <ProfileImage data={settings}/>
                <ProfileData data={settings.data} settings={settings} changeName={changeName} setChangeName={setChangeName}/>
            </div>
        </div>
    )
}

export default ProfileSettings
