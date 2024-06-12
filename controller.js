import { music } from "./model.js"


export const submitinfo = async (req, res) => {
    let { artist, description, main } = req.body


    const image = req.files.image[0];
    const audio = req.files.audio[0];


    if (!image || !audio || !artist || !description || !main) {
        return res.status(400).json({ message: `All fields are required` })
    }
   
    let addMusic;
    try {
        addMusic = await music.findOne({ artist })


    } catch (e) {
        return res.status(400).json({ message: `An error occurred while trying to add the music` });
    }

    if (addMusic) {
        return res.status(400).json({ message: `${artist} already exist in your database` })
    }

    try {

        await music.create({
            image: image.filename, // Use the filename instead of the path
            audio: audio.filename, // Use the filename instead of the path
            artist,
            description,
            main
        }) 

        console.log("Music has been successfully added to the data base");
        return res.status(200).json({ message: `Music has been successfully added to the data base` })

    } catch (e) {
        console.log("An error occured while saving to the database");
        return res.status(400).json({ message: `An error occured while trying to save a music to the database` })
    }

}


export const getallmusic = async (req, res) => {

    let findmusic
    try {
        findmusic = await music.find()
    } catch {
        res.status(400).json({ message: ` Error  fetching music` })
    }

    if (!findmusic) {
        return res.status(400).json({ message: ` No music found` })
    }

    res.status(200).json({ message: findmusic })

}