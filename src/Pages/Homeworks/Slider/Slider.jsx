import React, {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Slider.scss';
import "swiper/css";
import "swiper/css/bundle";
import sound from '../../../Assets/sound.png'
import andrev from '../../../Assets/andrev.png'
import aqlor from '../../../Assets/aqlor.png'
import arev from '../../../Assets/arev.png'
import arj from '../../../Assets/arj.png'
import aryuc from '../../../Assets/aryuc.png'
import ator from '../../../Assets/ator.png'
import avanak from '../../../Assets/avanak.png'
import andrevMp3 from '../../../Assets/1.mp3'
import aqlorMp3 from '../../../Assets/2.mp3'
import arevMp3 from '../../../Assets/3.mp3'
import aryucMp3 from '../../../Assets/4.mp3'
import atorMp3 from '../../../Assets/5.mp3'
import avanakMp3 from '../../../Assets/6.mp3'

export default function Slider() {
    const [swiper, setSwiper] = useState({});

    const playAudio = (audio) => {
        new Audio(audio).play();
    }

    const slideNext = () => {
        swiper.slideNext();
    }

    const slidePrev = () => {
        swiper.slidePrev();
    }

    return (
        <div className='slider'>
            <ChevronLeftIcon onClick={slidePrev} className='next_prev'/>
            <Swiper
                slidesPerView={3}
                slidesPerGroup={1}
                spaceBetween={30}
                loop={true}
                loopFillGroupWithBlank={true}
                grabCursor={true}
                className="mySwiper"
                onInit={(ev) => {
                    setSwiper(ev)
                }}>
                <SwiperSlide>
                    <div className="img">
                        <img src={andrev} alt=""/>
                        <div className="sound">
                            <img src={sound} alt="" onClick={() => playAudio(andrevMp3)}/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="img">
                        <img src={aqlor} alt=""/>
                        <div className="sound">
                            <img src={sound} alt="" onClick={() => playAudio(aqlorMp3)}/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="img">
                        <img src={arev} alt=""/>
                        <div className="sound">
                            <img src={sound} alt="" onClick={() => playAudio(arevMp3)}/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="img">
                        <img src={aryuc} alt=""/>
                        <div className="sound">
                            <img src={sound} alt="" onClick={() => playAudio(aryucMp3)}/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="img">
                        <img src={ator} alt=""/>
                        <div className="sound">
                            <img src={sound} alt="" onClick={() => playAudio(atorMp3)}/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="img">
                        <img src={avanak} alt=""/>
                        <div className="sound">
                            <img src={sound} alt="" onClick={() => playAudio(avanakMp3)}/>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <ChevronRightIcon onClick={slideNext} className='next_prev'/>
        </div>
    );
}
