import React from 'react';
import "./NavSettings.scss";
import {NavLink, Outlet} from "react-router-dom";

function NavSettings() {
    let role

    if (localStorage.length !== 0) {
        role = window.localStorage.getItem('ROLE').toLowerCase()
    }

    return (
        <div className="settings_nav">
            <ul className="setting_nav_menu">
                <li>
                    <NavLink to={`/${role}/settings/profile`}>
                        <div className="setting_nav_menu_route">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.3332 24.5V22.1667C23.3332 20.929 22.8415 19.742 21.9663 18.8668C21.0912 17.9917 19.9042 17.5 18.6665 17.5H9.33317C8.09549 17.5 6.90851 17.9917 6.03334 18.8668C5.15817 19.742 4.6665 20.929 4.6665 22.1667V24.5"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M14.0002 12.8333C16.5775 12.8333 18.6668 10.744 18.6668 8.16667C18.6668 5.58934 16.5775 3.5 14.0002 3.5C11.4228 3.5 9.3335 5.58934 9.3335 8.16667C9.3335 10.744 11.4228 12.8333 14.0002 12.8333Z"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>Profile Settings</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${role}/settings/payment`}>
                        <div className="setting_nav_menu_route">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24.4998 4.66699H3.49984C2.21117 4.66699 1.1665 5.71166 1.1665 7.00033V21.0003C1.1665 22.289 2.21117 23.3337 3.49984 23.3337H24.4998C25.7885 23.3337 26.8332 22.289 26.8332 21.0003V7.00033C26.8332 5.71166 25.7885 4.66699 24.4998 4.66699Z"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.1665 11.667H26.8332" stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                            <p>Payment</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${role}/settings/notification`}>
                        <div className="setting_nav_menu_route">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21 9.33301C21 7.47649 20.2625 5.69601 18.9497 4.38326C17.637 3.07051 15.8565 2.33301 14 2.33301C12.1435 2.33301 10.363 3.07051 9.05025 4.38326C7.7375 5.69601 7 7.47649 7 9.33301C7 17.4997 3.5 19.833 3.5 19.833H24.5C24.5 19.833 21 17.4997 21 9.33301Z"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M16.0181 24.5C15.813 24.8536 15.5186 25.1471 15.1644 25.3511C14.8102 25.5551 14.4086 25.6625 13.9998 25.6625C13.591 25.6625 13.1894 25.5551 12.8352 25.3511C12.481 25.1471 12.1866 24.8536 11.9814 24.5"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>Notification</p>
                        </div>
                    </NavLink>
                </li>
                <li className="need_to_help">
                    <NavLink to={`/${role}/settings/help`}>
                        <div className="setting_nav_menu_route">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.0002 24.6663C19.4435 24.6663 24.6668 19.443 24.6668 12.9997C24.6668 6.55635 19.4435 1.33301 13.0002 1.33301C6.55684 1.33301 1.3335 6.55635 1.3335 12.9997C1.3335 19.443 6.55684 24.6663 13.0002 24.6663Z"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M9.60498 9.49969C9.87927 8.71997 10.4207 8.06248 11.1333 7.64368C11.8459 7.22487 12.6837 7.07178 13.4984 7.21152C14.313 7.35125 15.0519 7.7748 15.5842 8.40714C16.1165 9.03947 16.4079 9.8398 16.4066 10.6664C16.4066 12.9997 12.9066 14.1664 12.9066 14.1664"
                                    stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13 18.833H13.0117" stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                            <p>Need a help ?</p>
                        </div>
                    </NavLink>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}

export default NavSettings
