import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { SpamCheckerFactory } from './SpamCheckerFactory';

dotenv.config();

const app = express();
app.use(express.json());

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
