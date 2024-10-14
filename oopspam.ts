import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json()); 


interface SpamCheckRequestBody {
    content?: string;
    senderIP?: string;
    email?: string;
    blockTempEmail?: boolean;
    checkForLength?: boolean;
    allowedLanguages?: string[];
    allowedCountries?: string[];
    blockedCountries?: string[];
}

const apiKey = process.env.OOPSPAM_API_KEY as string;

app.post('/check-spam', async (req: Request, res: Response) => {
    const {
        content,
        senderIP,
        email,
        blockTempEmail,
        checkForLength,
        allowedLanguages,
        allowedCountries,
        blockedCountries
    }: SpamCheckRequestBody = req.body;

    try {
        const response = await axios.post('https://api.oopspam.com/v1/spamdetection', {
            content: content || "Default content", 
            senderIP: senderIP || "91.203.67.110", // IP por defecto opcional
            email: email || "testing@example.com", // Email por defecto opcional
            blockTempEmail: blockTempEmail || false,
            checkForLength: checkForLength || true,
            allowedLanguages: allowedLanguages || ["en"],
            allowedCountries: allowedCountries || ["us", "it"],
            blockedCountries: blockedCountries || ["ru", "cn"]
        }, {
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data); 
    } catch (error) {
        const err = error as any;
        console.error('Error al conectarse con la API:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Error al conectarse con OOPSpam API' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
