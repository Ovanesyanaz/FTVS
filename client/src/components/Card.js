import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

export const Card = (props) => {
    const navigate = useNavigate()

    const toVideo = () => navigate(`/video/${props.elem.id.id}/${props.elem.str}`, {state : props})
    

    return (
        <div className="video">
            <input type = "image" onClick={toVideo} className="imgvideo" src = {props.elem.avatar.replace("hqdefault.jpg", "hq720.jpg")} alt = "ошибка :)"/>
            <h4 className ="text-center"><a href = {`/video/${props.elem.id.id}/${props.elem.str}`}><p></p>{props.elem.name}</a></h4>

       </div>
    )
}