import React from "react";
import { useEffect, useState } from "react";
import {useParams, useLocation, useNavigate } from "react-router-dom";
import {Button} from "@mui/material"
import {useHttp} from "../hooks/http.hook";

export const VideoPage = () => {
const navigate = useNavigate()
const params = useParams()
const {loading, request} = useHttp()


const toHome = () => navigate(-1)
const location = useLocation()

const [videos, setVideos] = useState([])


useEffect(() => {
    const ClickVideo = async() =>{
        try{
            console.log("use effect")
            const vid = await request("/server/getvideopage", "POST", {str: params.search, id : params.id})
            setVideos(vid)

        }catch{
            console.log("error videopage")
        }
    }
    ClickVideo()
}, [])

if(videos.length !== 0){
    return(


        

        <div className="videoinfo">
            <Button onClick={toHome} >Вернуться</Button>
            <h3 className="textcenter">Поисковая строка: {videos[0].str}</h3>

            <h2 className="textcenter">{videos[0].name}</h2>
            <img
            className="imgvideo2"
            src = {videos[0].avatar.replace("hqdefault.jpg", "hq720.jpg")} 
            alt = "not found"
            >
            </img>
            
            <h3 className="textcenter"> ссылка на данный видеоролик <a target = "_blank" rel="noreferrer" href = {videos[0].ssi}>{videos[0].ssi}</a></h3>
            {(videos[0].contekst.length !== 0)?videos[0].contekst.map(elem => {
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
                            <a target = "_blank"  rel="noreferrer" href = {videos[0].ssi + "&t=" + Math.floor(elem.time)}>
                                {videos[0].name}
                            </a>
                        </h3>
                    </div>
                )
            }):null}
            
        </div>
        
    )
    }
}