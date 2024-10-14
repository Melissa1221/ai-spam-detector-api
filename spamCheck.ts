import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Interfaces
interface SpamCheckResult {
    isSpam: boolean;
    score?: number;
    details?: any;
}

interface SpamCheckRequestBody {
    // ... (mantén la interfaz existente)
}

interface OOPSpamRequestBody {
    content?: string;
    senderIP?: string;
    email?: string;
    blockTempEmail?: boolean;
    checkForLength?: boolean;
    allowedLanguages?: string[];
    allowedCountries?: string[];
    blockedCountries?: string[];
}

// Clase abstracta base
abstract class SpamChecker {
    protected apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    abstract check(data: any): Promise<SpamCheckResult>;
}

// Implementación para SpamCheck.ai
class SpamCheckAIChecker extends SpamChecker {
    async check(data: SpamCheckRequestBody): Promise<SpamCheckResult> {
        try {
            const response = await axios.post('https://api.spamcheck.ai/api/v1/spam/check', data, {
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

// Implementación para OOPSpam
class OOPSpamChecker extends SpamChecker {
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

// Factory
class SpamCheckerFactory {
    static createChecker(type: string, apiKey: string): SpamChecker {
        switch (type.toLowerCase()) {
            case 'spamcheck.ai':
                return new SpamCheckAIChecker(apiKey);
            case 'oopspam':
                return new OOPSpamChecker(apiKey);
            default:
                throw new Error(`Tipo de verificador de spam no soportado: ${type}`);
        }
    }
}

// Configuración y uso
const spamCheckApiKey = process.env.SPAMCHECK_API_KEY;
const oopSpamApiKey = process.env.OOPSPAM_API_KEY;

if (!spamCheckApiKey || !oopSpamApiKey) {
    throw new Error("Faltan las claves API. Asegúrate de configurar el archivo .env correctamente.");
}

const spamCheckAIChecker = SpamCheckerFactory.createChecker('spamcheck.ai', spamCheckApiKey);
const oopSpamChecker = SpamCheckerFactory.createChecker('oopspam', oopSpamApiKey);

app.post('/check-spam', async (req: Request, res: Response) => {
    try {
        const spamCheckResult = await spamCheckAIChecker.check(req.body);
        const oopSpamResult = await oopSpamChecker.check(req.body);
        
        res.json({
            spamCheckAI: spamCheckResult,
            oopSpam: oopSpamResult
        });
    } catch (error: any) {
        console.error('Error al verificar spam:', error.message);
        res.status(500).json({ error: 'Error al verificar spam' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
