import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import RegisterStudent from "./Register/RegisterStudent/RegisterStudent";
import Login from "./Login/Login";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import RegisterTeacher from "./Register/RegisterTeacher/RegisterTeacher";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import NotFound from "./NotFound/NotFound";
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
import Settings from "./Settings/Settings";
import ProfileSettings from "./Settings/SettingsPages/ProfileSettings/ProfileSettings";
import CreditCard from "./Settings/CreditCard/CreditCard";
import Notification from "./Settings/Notification/Notification";
import Help from "./Settings/Help/Help";
import AdminUser from "./Admin/AdminUser";
import AdminMessage from "./Admin/AdminMessage/AdminMessage";
import AdminSettings from "./Admin/AdminSettings/AdminSettings";
import Moderator from "./Moderator/Moderator";
import ModeratorSettings from "./Moderator/ModeratorSettings/ModeratorSettings";
import ModeratorNotification from "./Moderator/ModeratorNotification/ModeratorNotification";
import ModeratorMessage from "./Moderator/ModeratorMessage/ModeratorMessage";
import ChooseTeacher from "./ChooseTeacher/ChooseTeacher";
import EmailChange from "./Settings/EmailChange/EmailChange";
import VideoChat from "./Video/Video";
import CalendarPage from './CalendarPage/CalendarPage';
import RegisterMailSent from './Register/RegisterMailSent';
import TeacherRegisterDone from './Register/RegisterTeacher/TeacherRegistrDone';
import RegisterDone from "./Register/RegisterDone";
import Homeworks from "./Homeworks/Homeworks";
import OneLetter from "./Homeworks/OneLetter/OneLetter";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="login"/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register-student" element={<RegisterStudent/>}/>
            <Route path="register-teacher" element={<RegisterTeacher/>}/>
            <Route path="forget-password" element={<ForgetPassword/>}/>
            <Route path="reset-password/:id/:code" element={<RecoverPassword/>}/>
            <Route path="re-password/" element={<RecoverPassword/>}/>
            <Route path="register-mail-sent" element={<RegisterMailSent/>}/>
            <Route path="register/done-student/:id/:code" element={<RegisterDone/>}/>
            <Route path="teacher-register-done" element={<TeacherRegisterDone/>}/>
            <Route path="email-change/:id/:code" element={<EmailChange/>}/>
            <Route path={`:code/home`} element={<Home/>}/>
            <Route path={`:code/chat`} element={<Chat/>}/>
            <Route path={`:code/video/:roomNumber`} element={<VideoChat/>}/>
            <Route path={`:code/homeworks`} element={<Homeworks/>}/>
            <Route path={`student/homeworks/letters`} element={<OneLetter />}/>
            <Route path={`:code/calendar`} element={<CalendarPage/>}/>
            <Route path={`student/choose-teacher`} element={<ChooseTeacher/>}/>
            <Route path={`:code/settings`} element={<Navigate to="profile"/>}/>
            <Route path={`:code/settings`} element={<Settings/>}>
                <Route path="profile" element={<ProfileSettings/>}/>
                <Route path="payment" element={<CreditCard/>}/>
                <Route path="notification" element={<Notification/>}/>
                <Route path="help" element={<Help/>}/>
            </Route>
            <Route path="admin/users" element={<AdminUser/>}/>
            <Route path="admin/chat" element={<AdminMessage/>}/>
            <Route path="admin/setting" element={<AdminSettings/>}/>
            <Route path="moderator/users" element={<Moderator/>}/>
            <Route path="moderator/setting" element={<ModeratorSettings/>}/>
            <Route path="moderator/notification" element={<ModeratorNotification/>}/>
            <Route path="moderator/message" element={<ModeratorMessage/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default Routers;
