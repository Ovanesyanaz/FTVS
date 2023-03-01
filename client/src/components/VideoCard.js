import React from "react";
import { Card } from "./Card";

export const VideoCard = ({videos}) => {



    if(videos[0] === "not found"){
        return (
            <>            
            <h2>
                По вашему запросу ничего не найдено.
            </h2>
            
            <h3>
                Рекомендации:
            </h3>
            <h3>
                *Убедитесь, что все слова написаны без ошибок.
            </h3>
            <h3>
                *Попробуйте уменьшить количество слов в запросе.
            </h3>        
            <h3>
                    *Попробуйте использовать более популярные слова в запросе.
            </h3>
            
            <img width="35%" className="ytka" alt= "not found" src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png"></img>
                    
            </>
                )
                }
    return ( 
        <div className="testcenter">
            {videos.map(elem => {               
                return (
                    <Card key={elem.ssi} elem = {elem}>
                        
                    </Card>
                )
            })}
        </div>
    )
}