import React from 'react';
import "./ModeratorSettings.scss";
import ModeratorNav from "../ModeratorNav/ModeratorNav"
import SettingsForAdminModerator from '../../../Components/SettingsForAdminModerator/Settings';

export default function ModeratorSettings() {
  return (
    <div className="moderator_settings">
      <ModeratorNav/>
      <div className="moderator_settings_container">
        <SettingsForAdminModerator />
      </div>
    </div>
  )
}
