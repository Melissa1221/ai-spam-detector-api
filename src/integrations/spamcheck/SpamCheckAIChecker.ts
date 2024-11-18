import axios from 'axios';
import { SimpleRequestBody, SpamChecker, SpamCheckResult } from '../../SpamChecker';

export interface SpamCheckRequestBody {
    ip?: string;
    email: string;
    email_validation_method: 'mx' | 'smtp';
    body: {
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        first_name: string;
        last_name: string;
        email: string;
        phone?: string;
        message: string;
    };
}


export class SpamCheckAIChecker extends SpamChecker {
    async check(data: SimpleRequestBody): Promise<SpamCheckResult> {
        const apiRequestBody : SpamCheckRequestBody = {
            email : data.from,
            email_validation_method:'smtp',
            body: {
                first_name: '',
                last_name: '',
                email: data.from,
                message: data.message
            }

        }
        try {
            const response = await axios.post('https://api.spamcheck.ai/api/v1/spam/check', apiRequestBody, {
                headers: {
                    'Api-Key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });
            return {
                isSpam: response.data.is_spam,
                score: response.data.spam_score,
                details: response.data
            };
        } catch (error: any) {
            console.error('Error al conectarse con la API de SpamCheck:', error.response ? error.response.data : error.message);
            throw new Error('Error al conectarse con la API de SpamCheck');
        }
    }
}
