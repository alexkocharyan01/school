import React, {useEffect, useState} from 'react';
import WellDone from "../../../Components/WellDone/WellDone";
import axios from "axios";
import {useParams} from "react-router";

const EmailChange = () => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [doneMessage, setDoneMessage] = useState('')

    const {code} = useParams();
    const {id} = useParams();

    const apiUrl = process.env.REACT_APP_API_URL;

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    }

    useEffect(() => {
        async function fetchMyAPI() {
            const response = await axios.patch(`${apiUrl}/user/email-change/${id}`,
                {code},
                {headers}
            )
            setError(response)
        }

        fetchMyAPI()
    }, [])

    useEffect(() => {
        if (error) {
            setMessage('Your email was changed')
            setDoneMessage('Well done!')

        } else {
            setMessage("Link isn't walid")
            setDoneMessage('Defective')
        }
    }, [error])

    return (
        <WellDone text={message} done={doneMessage}/>
    )
}

export default EmailChange;
