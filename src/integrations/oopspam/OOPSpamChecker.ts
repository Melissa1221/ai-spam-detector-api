import axios from 'axios';
import { SimpleRequestBody, SpamChecker, SpamCheckResult } from '../../SpamChecker';

export interface OOPSpamRequestBody {
    content?: string;
    senderIP?: string;
    email?: string;
    blockTempEmail?: boolean;
    checkForLength?: boolean;
    allowedLanguages?: string[];
    allowedCountries?: string[];
    blockedCountries?: string[];
}


export class OOPSpamChecker extends SpamChecker {
    async check(data: SimpleRequestBody): Promise<SpamCheckResult> {
        const apiRequestBody: OOPSpamRequestBody = {
            content: data.message,
            email: data.from
        }
        try {
            const response = await axios.post('https://api.oopspam.com/v1/spamdetection', {
                ...apiRequestBody,
                content: apiRequestBody.content || "Default content",
                senderIP: apiRequestBody.senderIP || "91.203.67.110",
                email: apiRequestBody.email || "testing@example.com",
                blockTempEmail: apiRequestBody.blockTempEmail || false,
                checkForLength: apiRequestBody.checkForLength || true,
                allowedLanguages: apiRequestBody.allowedLanguages || ["en"],
                allowedCountries: apiRequestBody.allowedCountries || ["us", "it"],
                blockedCountries: apiRequestBody.blockedCountries || ["ru", "cn"]
            }, {
                headers: {
                    'X-Api-Key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });
            return {
                isSpam: response.data.is_spam,
                score: response.data.spam_score,
                details: response.data
            };
        } catch (error: any) {
            console.error('Error al conectarse con la API de OOPSpam:', error.response ? error.response.apiRequestBody : error.message);
            throw new Error('Error al conectarse con la API de OOPSpam');
        }
    }
}
