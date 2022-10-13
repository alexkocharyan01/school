import React, {useEffect, useState} from 'react';
import "./ProfileImage.scss";
import logo from "../../../../../Assets/mainback.png";
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function ProfileImage({data}) {
    const [fileName, setFileName] = useState()

    const apiUrl = process.env.REACT_APP_API_URL;

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    }

    const handleChange = (e) => {
        const img = e.target.files[0]
        const photo = new FormData();
        photo.append('photo', img);
        axios.patch(`${apiUrl}/user/image`,
            photo, {
                headers: headers
            }).then(res => {
            if (res.data.status === 'success') {
                setFileName(res.data.data.photo)
            }
        });
    }

    const handleRemove = () => {
        axios.delete(`${apiUrl}/user/image`,
            {
                headers: headers
            }).then(res => {
            if (res.data.status === 'success') {
                setFileName(res.data.data.photo)
            }
        });
    }
    useEffect(() => {
        setFileName(data.data.photo)
    }, [data])

    return (
        <div className="profile_image">
            <div className="background_image">
                <img src={logo} alt='logo'/>
            </div>
            <div className="change_background_image">
                <button><p>Upload Cover</p></button>
            </div>
            <div className="profile_picture_container">
                <div className="profile_picture">
                    {fileName && <img src={`http://localhost:3000/images/${fileName}`} alt='img'/>}
                </div>
                <div className="change_prifail_img">
                    <div className="choose_file">
                        <label htmlFor="file">
                            <div className="edit"> <AddAPhotoIcon/> </div>
                        </label>
                        <input id="file" type="file" onChange={handleChange} className='change_image_input'/>
                    </div>
                    <button className="remove" onClick={handleRemove}> Remove
                    {/* <DeleteOutlineIcon style={{color:'#3398DF'}}/> */}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileImage
