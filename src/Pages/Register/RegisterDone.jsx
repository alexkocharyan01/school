import React, {useEffect, useState} from 'react';
import WellDone from '../../Components/WellDone/WellDone';
import {useParams} from "react-router";
import axios from "axios";

function RegisterMailSent() {
    const [data, setData] = useState(null)
    const [message, setMessage] = useState('')
    const [doneMessage, setDoneMessage] = useState('')

    const {code} = useParams();
    const {id} = useParams();

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.post(`${apiUrl}/student/finish-registration/${id}`, {code}).then(r => setData(true)).catch(e => setData(false));
    }, [])

    useEffect(() => {
        if (data) {
            setMessage('Your account has been successfully activated')
            setDoneMessage('Well done!')

        } else {
            setMessage("Link isn't walid")
            setDoneMessage('Defective')
        }
    }, [data])

    return (
        <div>
            <WellDone text={message} done={doneMessage}/>
        </div>
    )
}

export default RegisterMailSent
