import React from 'react';
import AdminNav from "../AdminNav/AdminNav";
import SettingsForAdminModerator from "../../../Components/SettingsForAdminModerator/Settings";
import "./AdminSettings.scss";

export default function AdminSettings() {
    return (
        <div className="admin_settings">
            <AdminNav/>
            <div className="admin_settings_container">
                <SettingsForAdminModerator/>
            </div>
        </div>
    )
}
