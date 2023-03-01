import React, {useState} from "react";

import "../styles/app.css"

import {VideoCard} from "../components/VideoCard";

import { useHttp } from "../hooks/http.hook";

import { Button } from "@mui/material";

import { TextField } from "@mui/material"

export const OtdelPoiskPage = () => {
    const {dataflag, setdataflag} = useState(false)

    const {loading, request} = useHttp()
    
    const [videos, setVideos] = useState([])
    
    const [value, setValue] = useState({
        str: ""
    })

    const ClickButton = async() => {
        try{
            const data = await request("/server/search/otdel" , "POST" , {value} )
            if (data.length === 0){
                setdataflag(true)
            }
            console.log("from client: "  , data)
            setVideos(data)
        }catch(e){
            console.log(value.str)
        }
    }

    const ChangeHandler = (event) => {
        setValue({...value, [event.target.name]:event.target.value})
    }


    return (
        <div>

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
        label="Искать..." 
        variant="outlined"
        placeholder=""
        name="str"
        onChange= {ChangeHandler}
        />  
        <Button
        className = "button"
        onClick = {ClickButton}
        >
        Найти
        </Button>
        </div>
        </div>
        <VideoCard videos={videos} dataflag={dataflag}/>
            
        </div>
    )
}