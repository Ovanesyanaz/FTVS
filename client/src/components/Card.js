import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

export const Card = (props) => {
    const navigate = useNavigate()

    const toVideo = () => navigate(`/video/${props.elem.str}/${props.elem.id.id}`, {state : props})
    

    return (
        <div className="video">
            <img className="imgvideo" src = {props.elem.avatar.replace("hqdefault.jpg", "hq720.jpg")} alt = "ошибка :)"/>
            <h4 className ="text-center"><a target = "_blank" href = {props.elem.ssi}>{props.elem.name}</a></h4>
            <Button onClick = {toVideo} >Подробная информация</Button>
            <hr className = "hr-left"></hr> 
       </div>
    )
}