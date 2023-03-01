const {Router} = require("express")
const router = Router()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const url_m = "mongodb://127.0.0.1:27017";
var ar = []
router.post("/search", async (req, res) =>{
    try{
        const zapros = req.body.value.str
        MongoClient.connect(url_m, function(err, client){
            if(err){
                console.log("Failed to connect", err);
            }else{
                console.log("connected to ", url_m);
                const db = client.db("base")
                const collection = db.collection("collection")
                const str = zapros.toLowerCase()
                console.log(str)
                collection.find({$text: {$search : str }}).toArray(function(err, result){
                    if (err){
                        console.log(err);
                    }else if (result.length === 0){
                        res.status(200).json(["not found"])
                    }else{
                        var ar = []
                        for(i = 0; i < result.length; i ++){
                            video = {
                                str : "",
                                index : "",
                                name : "",
                                ssi : "",
                                avatar : "",
                                time : [],
                                contekst : []
                            }
                            video.index = i
                            var itog = String(result[i].name)
                            if(itog.length > 33){
                               var itog = itog.substring(0, 33) + "..."
                            }
                            
                            var con = result[i].ar

                            context =  {

                            }

                            for(j = 0; j < con.length; j ++){
                                if(con[j].text.includes(str)){
                                    context = {
                                        con : con[j].text,
                                        time : con[j].result[0].start
                                    }
                                    video.contekst.push(context)
                                }
                            }

                            video.name = itog
                            
                            video.str = str

                            video.ssi = result[i].ssi

                            video.avatar = result[i].avatar

                            if(video.contekst != 0 || video.name.toLowerCase().includes(video.str)){
                               ar.push(video)
                            }
                            
                        }
                    if(ar.length === 0){
                        ar.push("not found")
                    }
                    res.status(200).json(ar)
                }})
            }
        })
    }catch(ar){
        console.log("arr")
        res.status(200).json(ar)
    }
})

router.post("/infovideos", async (req, res) =>{
    var math = 0
    var info = 0
    var razv = 0
    var prog = 0
    try{
        MongoClient.connect(url_m, function(err, client){
            if(err){
                console.log("Failed to connect", err);
            }else{
                console.log("connected to ", url_m);
                const db = client.db("base")
                const collection = db.collection("collection")
                collection.find().toArray(function(err, result){
                    if (err){
                        console.log(err);
                    }else{
                    for(i = 0; i < result.length; i ++){
                        let fil = result[i].topik
                        switch(fil) {
                            case "MATH":
                                math = math + 1
                                break
                            case "INFO":
                                info = info + 1
                                break
                            case "PROG":
                                prog = prog + 1
                                break
                            case "RAZV":
                                razv = razv + 1
                                break
                        }
                    }
                    ar = [result.length, math,info,prog,razv]
                    res.status(200).json(ar)
                }})
            }
        })
    }catch(ar){
        console.log("arr")
        res.status(200).json(ar)
    }
})


router.post("/searchfilter", async (req, res) =>{
    try{
        const zapros = req.body.value.str
        const filter = req.body.spisok
        console.log(filter)
        MongoClient.connect(url_m, function(err, client){
            if(err){
                console.log("Failed to connect", err);
            }else{
                console.log("connected to ", url_m);
                const db = client.db("base")
                const collection = db.collection("collection")
                const str = zapros.toLowerCase()
                console.log(str)
                collection.find({$text: {$search : str }}).toArray(function(err, result){
                    if (err){
                        console.log(err);
                    }else if (result.length === 0){
                        res.status(200).json(["not found"])
                    }else{
                        var ar = []
                        for(i = 0; i < result.length; i ++){
                            video = {
                                str : "",
                                index : "",
                                name : "",
                                ssi : "",
                                avatar : "",
                                author : "",
                                topik : "",
                                time : [],
                                contekst : []
                            }
                            video.index = i
                            var itog = String(result[i].name)
                            if(itog.length > 33){
                               var itog = itog.substring(0, 33) + "..."
                            }
                            
                            var con = result[i].ar

                            context =  {

                            }

                            for(j = 0; j < con.length; j ++){
                                if(con[j].text.includes(str)){
                                    context = {
                                        con : con[j].text,
                                        time : con[j].result[0].start
                                    }
                                    video.contekst.push(context)
                                }
                            }

                            video.name = itog
                            
                            video.str = str

                            video.ssi = result[i].ssi

                            video.avatar = result[i].avatar

                            video.author = result[i].author

                            video.topik = result[i].topik

                            if((video.contekst != 0 || video.name.toLowerCase().includes(video.str)) && video.topik === filter){
                               ar.push(video) 
                            }
                            
                        }
                    if(ar.length === 0){
                        ar.push("not found")
                    }
                    res.status(200).json(ar)
                }})
            }
        })
    }catch(ar){
        console.log("arr")
        res.status(200).json(ar)
    }
})




module.exports = router