const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: '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'}); // Replace 'YOUR_API_KEY' with your actual API key



async function summarize(data) {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: data,
            max_tokens: 50
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(error);
        return 'Error summarizing data';
    }
}

module.exports = { summarize };
