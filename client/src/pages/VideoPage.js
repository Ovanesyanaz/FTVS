import React from "react";
import { useEffect, useState } from "react";
import {useParams, useNavigate } from "react-router-dom";
import {Button} from "@mui/material"
import {useHttp} from "../hooks/http.hook";

export const VideoPage = () => {
const navigate = useNavigate()
const params = useParams()
const {request} = useHttp()

const [ssi, setSsi] = useState("0")

const toHome = () => {
    console.log(localStorage.getItem(undefined))
    if(localStorage.getItem(undefined) !== "ALL"){
        navigate(`/s/${videos[0].str}/${videos[0].topik}`)
    }
    else{
        navigate(`/s/${videos[0].str}`)
    }
}

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
            <div className="videonamestr">
               <Button style={{float:"left"}} onClick={toHome} >Вернуться</Button>
            

            <iframe width="1280" height="720" src={videos[0].ssi.replace("/watch?v=", "/embed/") + "?start=" + ssi} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            <h3><a target = "_blank" rel="noreferrer" href = {videos[0].ssi}>{videos[0].name}</a></h3>
            <h3 className="textcenter">Поисковая строка: {videos[0].str}</h3>
              

            </div>
            {(videos[0].contekst.length !== 0)?videos[0].contekst.map(elem => {
                const time = (Math.trunc(elem.time / 3600)).toString() + ":" + Math.trunc(elem.time % 3600 / 60).toString() + ":" + Math.trunc(elem.time % 3600 % 60).toString()
                return(
                    <div className = "details">

                        <h3>
                            <a onClick={() => {
                                console.log("click")
                                setSsi(Math.floor(elem.time))
                            }}> 
                                {time}:
                            </a>
                             &nbsp;
                            {elem.con}
                        </h3>
                    </div>
                )
            }):null}
            
        </div>
        
    )
    }
}