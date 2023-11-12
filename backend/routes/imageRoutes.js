import express from "express";
import * as dotenv from "dotenv"

dotenv.config()
const imageRoutes = express.Router()

function makeURL(inputString) {
    var url = 'https://image.pollinations.ai/prompt/' + inputString.replace(/ /g, '%20')
    return url
}

imageRoutes.route("/").post(async (req, res) => {
    try {
        const prompt = req.body.prompt
        const n = Math.floor(Math.random() * 20)
        const url = makeURL(prompt) + "%20".repeat(n)
        res.status(200).json({ photo: url })
    } catch (error) {
        res.status(500).send(error)
    }
})

export default imageRoutes