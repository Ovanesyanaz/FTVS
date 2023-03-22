import React, {useEffect, useState} from "react";

import { useNavigate, useParams } from "react-router-dom";

import "../styles/app.css"

import {VideoCard} from "../components/VideoCard";

import { useHttp } from "../hooks/http.hook";

import { Button } from "@mui/material";

import { TextField , Box} from "@mui/material"

import { useLocalStorage } from "../hooks/useLocalStorage";

import { useLocation } from "react-router-dom";




export const VideosPage = () => {

    const params = useParams()
    
    const location = useLocation()

    const [videos, setVideos] = useLocalStorage([], "video")

    const {loading, request} = useHttp()
    
    const [value, setValue] = useState({str : params.search})


    
    

    useEffect(() => {
        console.log("params - ", params)
        setValue({str : params.search})
        console.log(params.search)
        const ClickButton = async() => {
            try{
                
                setVideos([])
                const data = await request("/server/search" , "POST" , {value} )
                console.log("from client: "  , data)
                setVideos([...data])  
            }catch(e){
                console.log(value.str)
            }
        }
    ClickButton()
    },[])

    const navigate = useNavigate()

    const toHome = () => {
        setVideos([])
        navigate(`/`, {state : {str : value.str}})
        localStorage.setItem("value", JSON.stringify(value))
    }
    const toS = (props) => navigate(`/s/${(value.str)}`, {state :{str : value.str, data:props}})


    const ClickButton = async() => {
        try{
                navigate(`/s/${(value.str)}`)
                setVideos([])
                const data = await request("/server/search" , "POST" , {value} )
                console.log("from client: "  , data)
                setVideos([...data])
                toS(data)        
        }catch(e){
            console.log(value.str)
        }
    }

    const ChangeHandler = (event) => {
        setValue({...value, [event.target.name]:event.target.value})
    }

    const clearVideos = (event) => {
        setVideos([])
    }
    




    return(
        <div>
        <div className = "infoBlock">
        <Button onClick = {toHome}>Выбрать тематику</Button>
        </div>
        <div className = "info">
        <>
        <img 
        src = "https://sun9-east.userapi.com/sun9-43/s/v1/ig2/N9J9egWi19IdtvGl6ZsxBlqbSKPvZBUcvvGInIBPTLnmZWeZ7MTbnAmaipr996yj_Vs6nfDjz5uXeAvOb6yNF7bS.jpg?size=807x796&quality=95&type=album"
        alt = "не вышло" 
        className = "img">
        </img>        
        </>
        
        <div className="poisk">
        <Box
        sx={{ 
        minWidth: (window.screen.width / 100 * 75 - 250).toString() + "px",
        maxWidth: (window.screen.width / 100 * 75 - 250).toString() + "px",
        }}
        >
        <TextField
        fullWidth
        label="поиск..." 
        id="fullWidth" 
        name="str"
        value = {value.str}
        onChange= {ChangeHandler}
        />
        </Box>
        </div>

        <div className="buttondiv">
        <input
        type = "image"
        src = "https://images.squarespace-cdn.com/content/v1/5981e865f14aa16941337125/1507228368642-3M1N4Z4KO42PGDZTMMWH/discover.png"
        className = "button"
        onClick = {ClickButton}
        disabled = {loading}
        
        />


        </div>
        

        </div>
        <div>

            <h2>
                {loading ? <img className = "ytka" src = "https://steamuserimages-a.akamaihd.net/ugc/788625812202009487/4C8FE17EA8F5C2706B6E7C36E7C4A80240CCA41D/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true" alt = 'jfjf'></img>: null}
            </h2>
                
        </div>        
        <div className = "videocards">
            <VideoCard videos={videos}/>   
        </div>
        </div>
    )
}