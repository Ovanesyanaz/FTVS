import React, {useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";

import "../styles/app.css"

import { useHttp } from "../hooks/http.hook";

import { Button } from "@mui/material";


export const InfoVideosPage = () => {

    const [videosInfo, setVideosInfo] = useState([])

    const {loading, request} = useHttp()

    const navigate = useNavigate()

    const toHome = () => navigate(`/`)

    useEffect(() => {
        const ClickButton = async() => {
            try{
    
                    const data = await request("/server/infovideos" , "POST")
                    console.log("from client: "  , data)
                    setVideosInfo([...data])
                    console.log(data)
                   
            }catch(e){
                console.log("ошибка клиент")
            }
        }
        
        ClickButton()
    }, [])


    return(
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
        
        <Button
        
        onClick = {toHome}
        disabled = {loading}
        
        >
        
        Вернуться к поиску
        
        </Button>

        </div>
        </div>
        <div>
            <h2>
                {loading ? <img className = "ytka"src = "https://steamuserimages-a.akamaihd.net/ugc/788625812202009487/4C8FE17EA8F5C2706B6E7C36E7C4A80240CCA41D/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true" alt = 'jfjf'></img>: null}
            </h2>
            {videosInfo.length !== 0 ? <>
                <h1>всего {videosInfo[0]} видео</h1>
                <h1>{videosInfo[1]} по математике</h1>
                <h1>{videosInfo[2]} по информатике</h1>
                <h1>{videosInfo[3]} по программированию</h1>
                <h1>{videosInfo[4]} развлекательных</h1>
            </> : null}    
        </div>           
        </div>
    )
}