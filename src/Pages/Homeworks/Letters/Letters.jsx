import React, {useState} from 'react';
import './Letters.scss'
import a from "../../../Assets/1.png"
import b from "../../../Assets/2.png"
import g from "../../../Assets/3.png"
import d from "../../../Assets/4.png"
import e from "../../../Assets/5.png"
import z from "../../../Assets/6.png"
import ee from "../../../Assets/7.png"
import y from "../../../Assets/8.png"
import t from "../../../Assets/9.png"
import j from "../../../Assets/10.png"
import i from "../../../Assets/11.png"
import l from "../../../Assets/12.png"
import x from "../../../Assets/13.png"
import tch from "../../../Assets/14.png"
import k from "../../../Assets/15.png"
import h from "../../../Assets/16.png"
import dz from "../../../Assets/17.png"
import xx from "../../../Assets/18.png"
import ttch from "../../../Assets/19.png"
import m from "../../../Assets/20.png"
import yy from "../../../Assets/21.png"
import n from "../../../Assets/22.png"
import sh from "../../../Assets/23.png"
import vo from "../../../Assets/24.png"
import ch from "../../../Assets/25.png"
import p from "../../../Assets/26.png"
import jj from "../../../Assets/27.png"
import r from "../../../Assets/28.png"
import s from "../../../Assets/29.png"
import v from "../../../Assets/30.png"
import tt from "../../../Assets/31.png"
import rr from "../../../Assets/32.png"
import c from "../../../Assets/33.png"
import u from "../../../Assets/34.png"
import pp from "../../../Assets/35.png"
import q from "../../../Assets/36.png"
import ev from "../../../Assets/37.png"
import o from "../../../Assets/38.png"
import f from "../../../Assets/39.png"
import {useNavigate} from "react-router-dom";

const Letters = () => {
    const data = [
        {pic: a, text: 'Assign', text2: 'Perform'},
        {pic: b, text: 'Assign'},
        {pic: g, text: 'Assign'},
        {pic: d, text: 'Assign'},
        {pic: e, text: 'Assign'},
        {pic: z, text: 'Assign'},
        {pic: ee, text: 'Assign'},
        {pic: y, text: 'Assign'},
        {pic: t, text: 'Assign'},
        {pic: j, text: 'Assign'},
        {pic: i, text: 'Assign'},
        {pic: l, text: 'Assign'},
        {pic: x, text: 'Assign'},
        {pic: tch, text: 'Assign'},
        {pic: k, text: 'Assign'},
        {pic: h, text: 'Assign'},
        {pic: dz, text: 'Assign'},
        {pic: xx, text: 'Assign'},
        {pic: ttch, text: 'Assign'},
        {pic: m, text: 'Assign'},
        {pic: yy, text: 'Assign'},
        {pic: n, text: 'Assign'},
        {pic: sh, text: 'Assign'},
        {pic: vo, text: 'Assign'},
        {pic: ch, text: 'Assign'},
        {pic: p, text: 'Assign'},
        {pic: jj, text: 'Assign'},
        {pic: r, text: 'Assign'},
        {pic: s, text: 'Assign'},
        {pic: v, text: 'Assign'},
        {pic: tt, text: 'Assign'},
        {pic: rr, text: 'Assign'},
        {pic: c, text: 'Assign'},
        {pic: u, text: 'Assign'},
        {pic: pp, text: 'Assign'},
        {pic: q, text: 'Assign'},
        {pic: ev, text: 'Assign'},
        {pic: o, text: 'Assign'},
        {pic: f, text: 'Assign'},
    ]
    const [selected, setSelected] = useState([])
    const role = localStorage.getItem('ROLE');
    const navigate = useNavigate();

    const handleClick = (index) => {
        setSelected([...selected, index])
    }

    const handleOpen = (index) => {
        if(index===0){
            navigate(`/student/homeworks/letters`)
        }
    }

    return (
        <div className='letters'>
            {role === 'teacher' &&  data.map(((item, index) => {
                    return (
                        <div className={`img ${selected.find((id => id === index)) ? 'ok' : 'blur'}`}
                             onClick={() => handleClick(index)}>
                            <img src={item.pic} alt=""/>
                            <p className='text'>{item.text}</p>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                                    stroke="#3DAFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 4.20001V9.00001L12.2 10.6" stroke="#3DAFFF" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    )
                }))
            }
            {role === 'student' &&  data.map(((item, index) => {
                return (
                    <div className={`img ${selected.find((id => id === index)) ? 'ok2' : 'blur2'}`}
                         onClick={() => handleOpen(index)}>
                        <img src={item.pic} alt=""/>
                        <p className='text2'>{item.text2}</p>
                    </div>
                )
            }))
            }
        </div>
    );
};

export default Letters;
