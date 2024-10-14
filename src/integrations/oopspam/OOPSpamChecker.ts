import axios from 'axios';
import { SpamChecker, SpamCheckResult } from '../../SpamChecker';

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
    async check(data: OOPSpamRequestBody): Promise<SpamCheckResult> {
        try {
            const response = await axios.post('https://api.oopspam.com/v1/spamdetection', {
                ...data,
                content: data.content || "Default content",
                senderIP: data.senderIP || "91.203.67.110",
                email: data.email || "testing@example.com",
                blockTempEmail: data.blockTempEmail || false,
                checkForLength: data.checkForLength || true,
                allowedLanguages: data.allowedLanguages || ["en"],
                allowedCountries: data.allowedCountries || ["us", "it"],
                blockedCountries: data.blockedCountries || ["ru", "cn"]
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
            console.error('Error al conectarse con la API de OOPSpam:', error.response ? error.response.data : error.message);
            throw new Error('Error al conectarse con la API de OOPSpam');
        }
    }
}
