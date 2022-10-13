import React, {useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../../Assets/login_logo.png";
import "./Nav.scss";
import {useDispatch, useSelector} from "react-redux";
import {clearData, logoutAsync} from "../Login/loginSlice"
import {settingsAsync} from "../Settings/SettingsSlice";

function Nav() {
    const settings = useSelector(((state) => state.settings))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem('ACCESS_TOKEN')

    let role

    if (localStorage.length !== 0) {
        role = window.localStorage.getItem('ROLE').toLowerCase()
    }

    const logOut = () => {
        localStorage.clear();
        dispatch(clearData())
        dispatch(logoutAsync(token))
        navigate(`/login`)
    }

    useEffect(() => {
        dispatch(settingsAsync(token))
    }, [])

    return (
        <div className="nav">
            <div className="nav_up">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="navbar">
                    {
                        settings.data.student && !settings.data.student.needToChooseTeacher &&
                        <ul>
                            <li>
                                <NavLink to={`/${role}/home`} activeclass="active">
                                    <svg
                                        width="25"
                                        height="27"
                                        viewBox="0 0 25 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 9.6269L12.0917 1L23.1835 9.6269V23.1835C23.1835 23.8372 22.9238 24.4641 22.4615 24.9264C21.9993 25.3886 21.3723 25.6483 20.7186 25.6483H3.46483C2.81112 25.6483 2.18418 25.3886 1.72193 24.9264C1.25969 24.4641 1 23.8372 1 23.1835V9.6269Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.39453 25.6484V13.3242H15.789V25.6484"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${role}/chat`} activeclass="active">
                                    <svg
                                        width="24"
                                        height="23"
                                        viewBox="0 0 24 23"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M23 10.9167C23.0042 12.4565 22.6273 13.9755 21.9 15.35C21.0376 16.997 19.7119 18.3824 18.0713 19.3508C16.4307 20.3193 14.5401 20.8326 12.6111 20.8333C10.9979 20.8374 9.40657 20.4776 7.96666 19.7833L1 22L3.32222 15.35C2.59491 13.9755 2.21801 12.4565 2.22222 10.9167C2.22297 9.0754 2.76075 7.27068 3.77532 5.70467C4.78989 4.13865 6.24119 2.87319 7.96666 2.05003C9.40657 1.35579 10.9979 0.996018 12.6111 1.00003H13.2222C15.7697 1.13419 18.1759 2.16059 19.98 3.8827C21.7841 5.60481 22.8594 7.90162 23 10.3334V10.9167Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${role}/video/5`} activeclass="active">
                                    <svg
                                        width="30"
                                        height="20"
                                        viewBox="0 0 30 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M28.1132 3.47363L19.4863 9.63571L28.1132 15.7978V3.47363Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17.0214 1.00879H3.46483C2.10354 1.00879 1 2.11233 1 3.47362V15.7978C1 17.1591 2.10354 18.2626 3.46483 18.2626H17.0214C18.3827 18.2626 19.4862 17.1591 19.4862 15.7978V3.47362C19.4862 2.11233 18.3827 1.00879 17.0214 1.00879Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${role}/homeworks`} activeclass="active">
                                    <svg
                                        width="22"
                                        height="28"
                                        viewBox="0 0 22 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.3241 1.46777H3.46483C2.81112 1.46777 2.18418 1.72746 1.72193 2.18971C1.25969 2.65195 1 3.27889 1 3.9326V23.6512C1 24.305 1.25969 24.9319 1.72193 25.3941C2.18418 25.8564 2.81112 26.1161 3.46483 26.1161H18.2538C18.9075 26.1161 19.5345 25.8564 19.9967 25.3941C20.4589 24.9319 20.7186 24.305 20.7186 23.6512V8.86226L13.3241 1.46777Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.3242 1.46777V8.86226H20.7187"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15.789 15.0244H5.92969"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15.789 19.9531H5.92969"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.39452 10.0957H7.1621H5.92969"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${role}/calendar`} activeclass="active">
                                    <svg
                                        width="25"
                                        height="28"
                                        viewBox="0 0 25 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20.7186 4.08887H3.46483C2.10354 4.08887 1 5.19241 1 6.5537V23.8075C1 25.1688 2.10354 26.2723 3.46483 26.2723H20.7186C22.0799 26.2723 23.1835 25.1688 23.1835 23.8075V6.5537C23.1835 5.19241 22.0799 4.08887 20.7186 4.08887Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17.021 1.62402V6.55368"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7.16211 1.62402V6.55368"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M1 11.4834H23.1835"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                        </ul>}
                </div>
            </div>
            <div className="nav_down">
                <ul>
                    {
                        settings.data.student && !settings.data.student.needToChooseTeacher &&
                        <li>
                            <NavLink to={`/${role}/settings`} activeclass="active">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 17C15.6569 17 17 15.6569 17 14C17 12.3431 15.6569 11 14 11C12.3431 11 11 12.3431 11 14C11 15.6569 12.3431 17 14 17Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22.7455 17.5455C22.5881 17.9019 22.5412 18.2973 22.6107 18.6807C22.6802 19.0641 22.863 19.4178 23.1355 19.6964L23.2064 19.7673C23.4261 19.9868 23.6005 20.2475 23.7194 20.5344C23.8384 20.8214 23.8996 21.1289 23.8996 21.4395C23.8996 21.7502 23.8384 22.0577 23.7194 22.3447C23.6005 22.6316 23.4261 22.8923 23.2064 23.1118C22.9868 23.3316 22.7262 23.5059 22.4392 23.6249C22.1523 23.7438 21.8447 23.805 21.5341 23.805C21.2235 23.805 20.9159 23.7438 20.629 23.6249C20.342 23.5059 20.0813 23.3316 19.8618 23.1118L19.7909 23.0409C19.5124 22.7685 19.1586 22.5857 18.7752 22.5162C18.3919 22.4467 17.9965 22.4936 17.64 22.6509C17.2905 22.8007 16.9923 23.0495 16.7824 23.3665C16.5724 23.6836 16.4597 24.0552 16.4582 24.4355V24.6364C16.4582 25.2632 16.2092 25.8644 15.7659 26.3077C15.3226 26.751 14.7214 27 14.0945 27C13.4677 27 12.8665 26.751 12.4232 26.3077C11.9799 25.8644 11.7309 25.2632 11.7309 24.6364V24.53C11.7218 24.1388 11.5951 23.7594 11.3675 23.4412C11.1399 23.1229 10.8218 22.8805 10.4545 22.7455C10.0981 22.5881 9.70268 22.5412 9.3193 22.6107C8.93593 22.6802 8.58217 22.863 8.30364 23.1355L8.23273 23.2064C8.01321 23.4261 7.75253 23.6005 7.46559 23.7194C7.17864 23.8384 6.87107 23.8996 6.56045 23.8996C6.24984 23.8996 5.94226 23.8384 5.65532 23.7194C5.36838 23.6005 5.1077 23.4261 4.88818 23.2064C4.66842 22.9868 4.49408 22.7262 4.37513 22.4392C4.25618 22.1523 4.19496 21.8447 4.19496 21.5341C4.19496 21.2235 4.25618 20.9159 4.37513 20.629C4.49408 20.342 4.66842 20.0813 4.88818 19.8618L4.95909 19.7909C5.23154 19.5124 5.41431 19.1586 5.48382 18.7752C5.55334 18.3919 5.50641 17.9965 5.34909 17.64C5.19928 17.2905 4.95053 16.9923 4.63346 16.7824C4.31639 16.5724 3.94484 16.4597 3.56455 16.4582H3.36364C2.73676 16.4582 2.13556 16.2092 1.69229 15.7659C1.24903 15.3226 1 14.7214 1 14.0945C1 13.4677 1.24903 12.8665 1.69229 12.4232C2.13556 11.9799 2.73676 11.7309 3.36364 11.7309H3.47C3.86118 11.7218 4.24055 11.5951 4.55881 11.3675C4.87706 11.1399 5.11948 10.8218 5.25455 10.4545C5.41186 10.0981 5.45879 9.70268 5.38928 9.3193C5.31976 8.93593 5.137 8.58217 4.86455 8.30364L4.79364 8.23273C4.57387 8.01321 4.39953 7.75253 4.28059 7.46559C4.16164 7.17864 4.10041 6.87107 4.10041 6.56045C4.10041 6.24984 4.16164 5.94226 4.28059 5.65532C4.39953 5.36838 4.57387 5.1077 4.79364 4.88818C5.01315 4.66842 5.27384 4.49408 5.56078 4.37513C5.84772 4.25618 6.15529 4.19496 6.46591 4.19496C6.77653 4.19496 7.0841 4.25618 7.37104 4.37513C7.65798 4.49408 7.91866 4.66842 8.13818 4.88818L8.20909 4.95909C8.48762 5.23154 8.84138 5.41431 9.22476 5.48382C9.60813 5.55334 10.0035 5.50641 10.36 5.34909H10.4545C10.8041 5.19928 11.1022 4.95053 11.3122 4.63346C11.5222 4.31639 11.6348 3.94484 11.6364 3.56455V3.36364C11.6364 2.73676 11.8854 2.13556 12.3287 1.69229C12.7719 1.24903 13.3731 1 14 1C14.6269 1 15.2281 1.24903 15.6713 1.69229C16.1146 2.13556 16.3636 2.73676 16.3636 3.36364V3.47C16.3652 3.85029 16.4778 4.22184 16.6878 4.53891C16.8978 4.85598 17.1959 5.10473 17.5455 5.25455C17.9019 5.41186 18.2973 5.45879 18.6807 5.38928C19.0641 5.31976 19.4178 5.137 19.6964 4.86455L19.7673 4.79364C19.9868 4.57387 20.2475 4.39953 20.5344 4.28059C20.8214 4.16164 21.1289 4.10041 21.4395 4.10041C21.7502 4.10041 22.0577 4.16164 22.3447 4.28059C22.6316 4.39953 22.8923 4.57387 23.1118 4.79364C23.3316 5.01315 23.5059 5.27384 23.6249 5.56078C23.7438 5.84772 23.805 6.15529 23.805 6.46591C23.805 6.77653 23.7438 7.0841 23.6249 7.37104C23.5059 7.65798 23.3316 7.91866 23.1118 8.13818L23.0409 8.20909C22.7685 8.48762 22.5857 8.84138 22.5162 9.22476C22.4467 9.60813 22.4936 10.0035 22.6509 10.36V10.4545C22.8007 10.8041 23.0495 11.1022 23.3665 11.3122C23.6836 11.5222 24.0552 11.6348 24.4355 11.6364H24.6364C25.2632 11.6364 25.8644 11.8854 26.3077 12.3287C26.751 12.7719 27 13.3731 27 14C27 14.6269 26.751 15.2281 26.3077 15.6713C25.8644 16.1146 25.2632 16.3636 24.6364 16.3636H24.53C24.1497 16.3652 23.7782 16.4778 23.4611 16.6878C23.144 16.8978 22.8953 17.1959 22.7455 17.5455V17.5455Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </NavLink>
                        </li>
                    }
                    <li>
                        <div className='log_ut' onClick={logOut}>
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.66667 27H3.88889C3.12271 27 2.38791 26.6956 1.84614 26.1539C1.30436 25.6121 1 24.8773 1 24.1111V3.88889C1 3.12271 1.30436 2.38791 1.84614 1.84614C2.38791 1.30436 3.12271 1 3.88889 1H9.66667"
                                    stroke="#3398DF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19.7778 21.2228L27.0001 14.0005L19.7778 6.77832"
                                    stroke="#3398DF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M27.0003 14H9.66699"
                                    stroke="#3398DF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
