const ytdl = require("ytdl-core");
let fs = require("fs")
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://127.0.0.1:27017";


let newArray = []
let mindate = Date.now()

const ffmpeg = require('fluent-ffmpeg');
const wav = require("wav")
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path
const ffprobePath = require("@ffprobe-installer/ffprobe").path

var vosk = require("vosk")
const { Readable } = require("stream");
MODEL_PATH = "model"

const readline = require('readline');


ffmpeg.setFfmpegPath(ffmpegPath)

ffmpeg.setFfprobePath(ffprobePath)


let array = fs.readFileSync("spisok3.txt").toString().split("\n")
for(j=0;j < array.length;j++){
    if(array[j].includes("\r")){
        array[j] = array[j].replace("\r", "")
    }
    if(array[j].includes("  ")){
        array[j] = array[j].replace("  ",'')
    }
    if (array[j].includes("&")){
        array[j] = array[j].split("&")[0]
    }
}





async function ssi_on_video(i){
    if (i === array.length){
        console.log("ok for", mindate - Date.now() / 1000)
        return
    }
    MongoClient.connect(url, async function(err, client){
        if(err){
            console.log("Failed to connect", err);
        }else{
            console.log("connected to ", url);
            var db = client.db("base")
            var collection = db.collection("collection")
            const results = await collection.find().toArray()
            for(j=0;j<results.length;j++){
                let y = results[j].ssi
                newArray.push(y) 
            }

            client.close()
            pro_one(newArray, i)
        }
})
}


function pro_one(newArray, i){

    if (i === array.length){
        console.log("ok for", mindate - Date.now() / 1000)
    }
    
    if(newArray.includes(array[i])){
        pro_one(newArray, i + 1)
    }
    else{
        console.log("pro_one", i, " - success")
        pro_two(array, i)
    }

}




async function pro_two(array, i){
    try{
        let res = await ytdl.getBasicInfo(array[i])
        .then(res => {
            console.log("pro_two", i, " - success")
            json(res, i, array)
        })
    }catch{
        console.log("not pro two")
        pro_one(newArray, i + 1)
    }
}



function json(res, i, array){
    fs.writeFileSync(`${__dirname}/json/${i}.json`, `{"name" : "${res.videoDetails.title.replace('"', "'").replace('"', "'").replace('"', "'").replace('"', "'").replace('"', "'").replace('"', "'").replace('"', "'").replace('"', "'")}", "ssi" : "${array[i].replace("  ", "")}", "avatar" : "${res.videoDetails.thumbnails[0].url}", "topik":"RAZV","author":"Гостелерадиофонд", "ar": `)
    console.log(res.videoDetails.title)
    console.log( i, ".json ready")
    download(i, array)
}



async function download(i, array){

    url_d = array[i].replace("https://www.youtube.com/watch?v=", "")

    let stream = ytdl(url_d,{
        filter: "audioonly",
        audioformat: wav,
    });
    
    let start = Date.now();
    await ffmpeg(stream)
        .audioChannels(1)
        .save(`${__dirname}/audio/${i}.wav`)
        .on('progress', p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
            })
        .on('end', () => {
            console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)
            transkrib(i)
        })
}



function transkrib(i){

    let date = Date.now()


    FILE_NAME = `${__dirname}/audio/${i}.wav`

    let filecontent = fs.readFileSync(`${__dirname}/json/${i}.json`,"utf-8")
      
    if (!fs.existsSync(MODEL_PATH)) {
    console.log("Please download the model from https://alphacephei.com/vosk/models and unpack as " + MODEL_PATH + " in the current folder.")
    process.exit()
    }
    if (process.argv.length > 2)
       FILE_NAME = process.argv[2]
    vosk.setLogLevel(0);
    const model = new vosk.Model(MODEL_PATH);
    const wfReader = new wav.Reader();
    const wfReadable = new Readable().wrap(wfReader);
    wfReader.on('format', async ({ audioFormat, sampleRate, channels }) => {
        if (audioFormat != 1 || channels != 1) {
            console.error("Audio file must be WAV format mono PCM.");
            process.exit(1);
    }
        a = "["
        const rec = new vosk.Recognizer({model: model, sampleRate: sampleRate});
        //rec.setMaxAlternatives(10);
        rec.setWords(true);
        for await (const data of wfReadable) {
           const end_of_speech = rec.acceptWaveform(data);
        if (end_of_speech) {
              a = a + JSON.stringify(rec.result(), null, 4)
              a = a + ","
        }
        }
        a = a + JSON.stringify(rec.finalResult(rec), null, 4)
        
        a = a + "]}"
        fs.readFile(`${__dirname}/json/${i}.json`, (err, data) => {
            if(err) console.log(err)
            else{
                const b = data
            }
        })
        fs.writeFile(`${__dirname}/json/${i}.json`, filecontent + a , function(err, resultt){
            if (err) console.log(err)
        })
        console.log("ok")
        console.log(("transcrib succsess for ",Date.now()-date)/ 1000, "seconds")
        rec.free();
        audio_del(i)

    });

    fs.createReadStream(FILE_NAME, {'highWaterMark': 4096}).pipe(wfReader).on('finish', 
        function (err) {
            
            model.free();
    });


}




function audio_del(i){
    try{
        fs.unlinkSync(`${__dirname}/audio/${i}.wav`)
        console.log(`${__dirname}/audio/${i}.wav deleted`)
        setTimeout(() => {
            outbase(i)
        }, 1000)
        
    }catch(e){
        console.log(e)
    }
}



function outbase(i){

try{
    fs.readFile(`${__dirname}/json/${i}.json`, "utf8",
        function(error, fileContent){
            if(error) throw error;
            var obj = JSON.parse(fileContent);
            
            
            MongoClient.connect(url, function(err, client){
                if(err){
                    console.log("Failed to connect", err);
                }else{
                    console.log("connected to ", url);
                
                var db = client.db("base")
                var collection = db.collection("collection")
                collection.insertOne(obj, function(err, result){
                    if (err){
                        console.log(err);
                    }
                    client.close()
                    ssi_on_video(i + 1)
                })
                }
            })
        }
    ) 
}catch{
    ssi_on_video(i + 1)
}
}



function json_del(i){

    fs.unlinkSync(`${__dirname}/json/${i}.json`)
    console.log(`${__dirname}/audio/${i}.json deleted`)
    ssi_on_video(i + 1)

}



ssi_on_video(0)