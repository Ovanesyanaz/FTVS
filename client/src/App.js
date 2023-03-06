import React from "react";
import {Routes, Route} from "react-router-dom"
import { PoiskPage } from "./pages/PoiskPage";
import { VideoPage } from "./pages/VideoPage";
import { VideosPage } from "./pages/VideosPage";
import { OtdelPoiskPage } from "./pages/OtdelPoiskPage"
import { InfoVideosPage } from "./pages/InfoVideosPage";
import { VideosPageFilter } from "./pages/VideosPageFilter";

function App() {
  

  return(
    
      <Routes>
        <Route path="/Otdel" element = {<OtdelPoiskPage/>}/>
        
        <Route path="/" element= {<PoiskPage/>}/>
        
        <Route path="/s/:search" element = {<VideosPage/>}/>
        
        <Route path="/video/:search/:id" element= {<VideoPage/>}/>
        
        <Route path="/info" element = {<InfoVideosPage/>}/>
      
        <Route path="/s/:topik/:search" element = {<VideosPageFilter></VideosPageFilter>}/>

      </Routes>
      
  
  )
}

export default App;
