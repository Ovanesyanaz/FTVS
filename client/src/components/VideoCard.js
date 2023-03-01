import React from "react";
import { Card } from "./Card";

export const VideoCard = ({videos}) => {



    if(videos[0] === "not found"){
        return (
                        <h1>
                            К сожалению, по этому запросу ничего не найдено :(
                        </h1>
                    )
                }
    return ( 
        <div>
            {videos.map(elem => {               
                return (
                    <Card key={elem.ssi} elem = {elem}>
                        
                    </Card>
                )
            })}
        </div>
    )
}