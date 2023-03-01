import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Button} from "@mui/material"


export const VideoPage = () => {
const navigate = useNavigate()

const toHome = () => navigate(-1)
const location = useLocation()
const video = location.state.elem


    return(

        <div className="videoinfo">
            <Button onClick={toHome} >Вернуться</Button>
            <h3 className="textcenter">Поисковая строка: {video.str}</h3>

            <h2 className="textcenter">{video.name}</h2>
            <img
            className="imgvideo2"
            src = {video.avatar.replace("hqdefault.jpg", "hq720.jpg")} 
            alt = "not found"
            >
            </img>
            
            <h3 className="textcenter"> ссылка на данный видеоролик <a target = "_blank" rel="noreferrer" href = {video.ssi}>{video.ssi}</a></h3>
            {video.contekst.map(elem => {
                return(
                    <div className = "details">
                        <h3>
                            через {Math.floor(elem.time)} секунд после начала видео прозвучала фраза :
                        </h3>
                        <h3>
                            {elem.con}
                        </h3>
                        <h3>
                            Посмотреть видео с данной секунды:
                            <a target = "_blank"  rel="noreferrer" href = {video.ssi + "&t=" + Math.floor(elem.time)}>
                                {video.name}
                            </a>
                        </h3>
                    </div>
                )
            })}
        </div>
    )
}