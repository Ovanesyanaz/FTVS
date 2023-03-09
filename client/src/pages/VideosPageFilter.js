import React, {useEffect, useState} from "react";

import { useNavigate, useParams } from "react-router-dom";

import "../styles/app.css"

import {VideoCard} from "../components/VideoCard";

import { useHttp } from "../hooks/http.hook";

import { Button } from "@mui/material";

import { TextField } from "@mui/material"

import { useLocalStorage } from "../hooks/useLocalStorage";

import { useLocation } from "react-router-dom";




export const VideosPageFilter = () => {

    const params = useParams()
    
    const location = useLocation()

    const [videos, setVideos] = useLocalStorage([], "video")

    const {loading, request} = useHttp()
    
    const [value, setValue] = useState({str : params.search})    

    useEffect(() => {
        console.log("params - ", params)
        setValue({str : params.search})
        const ClickButton = async() => {
            try{                
                setVideos([])
                console.log(params.topik)
                const data = await request("/server/searchfilter" , "POST" , {value, params} )
                console.log("from client: "  , data)
                setVideos([...data])  
            }catch(e){
                console.log(value.str)
            }
        }
    ClickButton()
    },[])

    const navigate = useNavigate()

    const toHome = () => 
    {
        localStorage.setItem("value", JSON.stringify(value))
        setVideos([])
        navigate(`/`)

    }


    const toS = (props) => navigate(`/s/${(value.str)}`, {state :{str : value.str, data:props}})

    const toSearchPageFilter = () => navigate(`/s/${value.str}/${(params.topik)}`.replace("//", "/"))

    const ClickButton = async() => {
        try{
                navigate(`/s/${value.str}/${(params.topik)}`.replace("//", "/"))
                setVideos([])
                const data = await request("/server/searchfilter" , "POST" , {value, params} )
                console.log("from client: "  , data)
                setVideos([...data])        
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
        
        
        <TextField 
        className="input"
        id="outlined-basic"  
        variant="outlined"
        placeholder=""
        value = {value.str}
        name="str"
        onChange= {ChangeHandler}
        >
        </TextField>


        <Button
        
        className = "button"
        onClick = {ClickButton}
        disabled = {loading}
        
        >
        
        Найти
        
        </Button>


        {videos.length !== 0 ? <Button onClick = {clearVideos}>Обновить</Button>:null}
         


        </div>
        </div>
        <div>

            <h2>
                {loading ? <img className = "ytka" src = "https://steamuserimages-a.akamaihd.net/ugc/788625812202009487/4C8FE17EA8F5C2706B6E7C36E7C4A80240CCA41D/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true" alt = 'jfjf'></img>: null}
            </h2>
                
        </div>        
        <div className = "testcenter">
            <VideoCard videos={videos}/>   
        </div>
        </div>
    )
}