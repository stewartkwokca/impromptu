const { GoogleGenerativeAI } = require("@google/generative-ai");
const Prompt = require("./models/promptModel");

async function generatePrompt() {
    try{
        const googleGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const prompt_generator = googleGenAI.getGenerativeModel({ model: "gemini-pro"});

        const input = "Please generate a unique prompt in the style of the popoular jackbox game quiplash. Please only return the prompt with no other text. Keep it PG-13. Make it a fill-in-the-blank."
        const result = await prompt_generator.generateContent(input);
        const response = await result.response;
        const prompt = response.text();

        const newPrompt = {text: prompt};

        const createdPrompt = await Prompt.create(newPrompt);
        console.log(createdPrompt);
        return createdPrompt;
    } catch (err) {
        return generatePrompt();
    }
}

module.exports = {generatePrompt};