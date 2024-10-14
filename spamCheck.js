"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const apiKey = process.env.SPAMCHECK_API_KEY;
if (!apiKey) {
    throw new Error("Falta la clave API de SpamCheck. Asegúrate de configurar el archivo .env correctamente.");
}
app.post('/check-spam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const response = yield axios_1.default.post('https://api.spamcheck.ai/api/v1/spam/check', data, {
            headers: {
                'Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error al conectarse con la API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error al conectarse con la API de SpamCheck' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
