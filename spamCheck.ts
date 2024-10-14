import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json()); 


interface SpamCheckRequestBody {
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


const apiKey = process.env.SPAMCHECK_API_KEY;

if (!apiKey) {
    throw new Error("Falta la clave API de SpamCheck. Asegúrate de configurar el archivo .env correctamente.");
}


app.post('/check-spam', async (req: Request, res: Response) => {
    const data: SpamCheckRequestBody = req.body;
    
    try {
        const response = await axios.post('https://api.spamcheck.ai/api/v1/spam/check', data, {
            headers: {
                'Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data); 
    } catch (error: any) {
        console.error('Error al conectarse con la API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error al conectarse con la API de SpamCheck' });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
