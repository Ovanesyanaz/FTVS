import React, {useEffect, useState} from "react";

import "../styles/app.css"

import {VideoCard} from "../components/VideoCard";

import { useHttp } from "../hooks/http.hook";

import {Box, Button, FormControl, InputLabel } from "@mui/material";

import { TextField } from "@mui/material"

import { useLocalStorage } from "../hooks/useLocalStorage";

import { useLocation, useNavigate } from "react-router-dom";

import  { Select }  from "@mui/material";

import { MenuItem } from "@mui/material";

export const PoiskPage = () => {

    const [spisok, setSpisok]  = useLocalStorage("")

    const [videos, setVideos] = useLocalStorage([], "video")

    const {loading, request} = useHttp()
    
    const [value, setValue] = useState({
        str: JSON.parse(localStorage.getItem("value")).str
    })

    const navigate = useNavigate()

    const toS = (data, spisok) => navigate(`/s/${(value.str)}`, {state :{str : value.str, data:data, spisok:spisok}})

    const toSearchPageFilter = () => navigate(`/s/${(value.str)}/${(spisok)}`.replace("//", "/"))

    const toSearchPage = () => navigate(`/s/${(value.str)}`)

    const toVideosInfo = () => navigate("/info")

    const ToSearch = (spisok) => {
        if (spisok === "ALL"){
            console.log("toSearchPage")
            toSearchPage()
        }
        else{
            console.log("spisok")
            console.log("toSearchPageFilter")
            toSearchPageFilter()
        }
    }
    
    const ClickButton = async() => {
        ToSearch(spisok)
    }



    const ChangeHandler = (event) => {
        setValue({...value, [event.target.name]:event.target.value})
    }

    const clearVideos = (event) => {
        setVideos([])
    }

    const handleChange = (event) => {
        setSpisok(event.target.value)
        console.log(event.target.value)
    }

    const location = useLocation()

    const clearValue = (location) => {
        console.log("clearValue")
    }

    useEffect(()=>{ 
        const screenWidth = (window.screen.width / 100 * 75 - 300).toString() + "px"
        console.log(screenWidth)
        clearVideos()
        console.log({str : JSON.parse(localStorage.getItem("value")).str})
        console.log(value)

    }, [])

    return (
        <>
        
        <div className="infoBlock">
        <Button
            onClick = {toVideosInfo}
        >
        ???????????????????? ?? ???????? ????????????????????????
        </Button>
        </div> 
        <div className="poiskpage">   
        <div className = "info">
        <>
        <img 
        src = "https://sun9-east.userapi.com/sun9-43/s/v1/ig2/N9J9egWi19IdtvGl6ZsxBlqbSKPvZBUcvvGInIBPTLnmZWeZ7MTbnAmaipr996yj_Vs6nfDjz5uXeAvOb6yNF7bS.jpg?size=807x796&quality=95&type=album"
        alt = "???? ??????????" 
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
        label="??????????..." 
        id="fullWidth" 
        name="str"
        value = {value.str}
        onChange= {ChangeHandler}
        />
        </Box>
        </div>

        <div className="buttondiv">
        <Button
        
        className = "button"
        onClick = {ClickButton}
        disabled = {loading}
        
        >
        
        ??????????
        
        </Button>

        </div>
        
        </div>
        <div className="filter">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">????????????????</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={spisok}
          onChange={handleChange}
        >
          <MenuItem value = {"ALL"}>?????? ????????????????</MenuItem>
          <MenuItem value={"MATH"}>????????????????????</MenuItem>
          <MenuItem value={"INFO"}>??????????????????????</MenuItem>
          <MenuItem value={"PROG"}>??????????????????????????????</MenuItem>
          <MenuItem value={"RAZV"}>??????????????????????????????</MenuItem>
        </Select>
      </FormControl>
        
        </div>
        <div>
            <h2>
                {loading ? <img className = "ytka"src = "https://steamuserimages-a.akamaihd.net/ugc/788625812202009487/4C8FE17EA8F5C2706B6E7C36E7C4A80240CCA41D/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true" alt = 'jfjf'></img>: null}
            </h2>
                
        </div>        
        <VideoCard videos={videos}/>
            
        </div>
        </>
    )
}