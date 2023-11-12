import { samplePrompts } from "../constants";
import FileSaver from 'file-saver'

export const getRandomPrompt = (prompt) => {
    const i = Math.floor(Math.random() * samplePrompts.length)
    const randomPrompt = samplePrompts[i]
    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt)
    }
    return randomPrompt
}

export async function downloadImage (_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}