import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { SpamCheckerFactory } from './SpamCheckerFactory';

dotenv.config();

const app = express();
app.use(express.json());

const spamCheckApiKey = process.env.SPAMCHECK_API_KEY;
const oopSpamApiKey = process.env.OOPSPAM_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

if (!spamCheckApiKey || !oopSpamApiKey || !groqApiKey) {
    throw new Error("Faltan las claves API. Asegúrate de configurar el archivo .env correctamente.");
}

const spamCheckAIChecker = SpamCheckerFactory.createChecker('spamcheck.ai', spamCheckApiKey);
const oopSpamChecker = SpamCheckerFactory.createChecker('oopspam', oopSpamApiKey);
const groqSpamChecker = SpamCheckerFactory.createChecker('groq', groqApiKey);

const testPayload = {
    message: "Hi...",
    from: "email@test.com",
    title: "Urgent message"
};


// app.post('/check-spam', async (req: Request, res: Response) => {
//     try {
//         const spamCheckResult = await spamCheckAIChecker.check(req.body);
//         const oopSpamResult = await oopSpamChecker.check(req.body);
        
//         res.json({
//             spamCheckAI: spamCheckResult,
//             oopSpam: oopSpamResult
//         });
//     } catch (error: any) {
//         console.error('Error al verificar spam:', error.message);
//         res.status(500).json({ error: 'Error al verificar spam' });
//     }
// });

app.post('/check-spam', async (req: Request, res: Response) => {
    try {
        const payload = testPayload; 
        console.log('Incoming payload:', payload);

        const [spamCheckResult, oopSpamResult, groqSpamResult] = await Promise.all([
            spamCheckAIChecker.check(payload),
            oopSpamChecker.check(payload),
            groqSpamChecker.check(payload)
        ]);

    
        const response = {
            spamcheck: {
                isSpam: spamCheckResult?.details?.content?.spam?.result || false
            },
            oopspam: {
                isSpam: oopSpamResult?.details?.Score >= 5 
            },
            groq: {
                isSpam: groqSpamResult?.details?.spam || false
            }
        };

        console.log('Processed spam check results:', response);
        res.json(response);
    } catch (error: any) {
        console.error('Error checking spam:', error.message);
        res.status(500).json({
            error: 'An error occurred while checking spam',
            details: error.message
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
