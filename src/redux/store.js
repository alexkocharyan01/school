import {configureStore} from "@reduxjs/toolkit";
import inputReducer from "./inputSlice";
import registerReducer from "../Pages/Register/RegisterStudent/registerStudentSlice";
import registerTeacherReducer from "../Pages/Register/RegisterTeacher/registerTeacherSlice";
import loginReducer from "../Pages/Login/loginSlice";
import forgetPasswordReducer from "../Pages/ForgetPassword/ForgetPasswordSlice";
import resetPasswordReducer from "../Pages/RecoverPassword/ResetPasswordSlice";
import settingsReducer from "../Pages/Settings/SettingsSlice";
import userUpdatePasswordReducer from "../Pages/Settings/SettingsPages/ProfileSettings/ProfileData/PasswordModal/userUpdatePasswordSlice";
import helpReducer from "../Pages/Settings/Help/HelpSlice";
import moderatorTeacherReducer from "../Pages/Moderator/ModeratorSlice";
import addModeratorReducer from "../Pages/Admin/AdminAddModeratrSlice";
import moderatorStudentReducer from "../Pages/Moderator/ModeratorStudents/ModeratorStudentSlice";
import moderatorNotificationReducer from "../Pages/Moderator/ModeratorNotification/ModeratorNotificationSlice";
import chooseTeacherReducer from "../Pages/ChooseTeacher/ChooseTeacherSlice";
import messangeReducer from "../Components/Message/MessangerSlice";
import videoReducer from "../Pages/Video/VideoSlice";
import classDateReducer from '../Components/BigCalendar/BigCalendarSlice';
import connectionReducer from "../Components/Connections/ConnectionsSlice";

export const store = configureStore({
    reducer: {
        inputValue: inputReducer,
        register: registerReducer,
        registerTeacher: registerTeacherReducer,
        login: loginReducer,
        forgetPassword: forgetPasswordReducer,
        resetPassword: resetPasswordReducer,
        settings: settingsReducer,
        messange: messangeReducer,
        userUpdatePassword: userUpdatePasswordReducer,
        helpData: helpReducer,
        moderatorTeacher: moderatorTeacherReducer,
        addModerator: addModeratorReducer,
        moderatorStudent: moderatorStudentReducer,
        moderatorNotification: moderatorNotificationReducer,
        chooseTeacher: chooseTeacherReducer,
        video: videoReducer,
        calendarLesson: classDateReducer,
        connection: connectionReducer,
    },
});
