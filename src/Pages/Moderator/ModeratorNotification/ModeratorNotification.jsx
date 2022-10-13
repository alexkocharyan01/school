import React from 'react'
import "./ModeratorNotification.scss";
import ModeratorNav from "../ModeratorNav/ModeratorNav";
import NotificationTable from "./NotificationTable/NotificationTable";

export default function ModeratorNotification() {

    return (
        <div className="moderator_notification">
            <ModeratorNav/>
            <div className="moderator_notification_component">
                <h2>Notifications</h2>
                <div className="moderator_notification_container">
                    <NotificationTable/>
                </div>
            </div>
        </div>
    )
}
