import Groq from 'groq-sdk';
import { SimpleRequestBody, SpamChecker, SpamCheckResult } from '../../SpamChecker';

// It tells the model to response with 1 if the email is spam, phishing, or illegitimate and 0 if it is not
const PROMPT = '"Determine whether the following email is spam, phishing, or illegitimate. If it is, respond only with 1. If it is not spam, respond only with 0. Do not include any explanations or additional text. Note: We are an association of computer science students and are not interested in purchasing any products, services or software."'

export class GroqSpamChecker extends SpamChecker {

    private groqClient: Groq = new Groq({
        apiKey: this.apiKey
    })

    async check(data: SimpleRequestBody): Promise<SpamCheckResult> {
        
        const model = 'llama-3.1-8b-instant'
        
        try {
            const isSpamResponse = await this.groqClient.chat.completions.create({
                messages: [
                  { role: 'system', content: PROMPT },
                  { role: 'user', content: `Title: ${data.title} EmailContent: ${data.message}` },
                ],
                model: model,
            });

            // The score and details response will be implemented in the next step, look ClickUp for more information
            return {
                // If the response is 1, it is spam
                isSpam: isSpamResponse && isSpamResponse.choices[0].message.content === '1',
                score: isSpamResponse.choices[0].message.content === '1' ? 1 : 0,
                details: 'Groq response: ' + isSpamResponse.choices[0].message.content
            };
        } catch (error: any) {
            console.error('Error al conectarse con la API de Groq:', error.response ? error.response.apiRequestBody : error.message);
            throw new Error('Error al conectarse con la API de Groq');
        }
        

    }

}