import mongoose from "mongoose";


const musicSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        audio: { type: String, required: true },
        artist: { type: String, required: true },
        description: { type: String, required: true },
        main: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }

);
export const music = mongoose.model("music", musicSchema);
 