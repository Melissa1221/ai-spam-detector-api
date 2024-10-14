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
const apiKey = process.env.OOPSPAM_API_KEY;
app.post('/check-spam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, senderIP, email, blockTempEmail, checkForLength, allowedLanguages, allowedCountries, blockedCountries } = req.body;
    try {
        const response = yield axios_1.default.post('https://api.oopspam.com/v1/spamdetection', {
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
    }
    catch (error) {
        const err = error;
        console.error('Error al conectarse con la API:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Error al conectarse con OOPSpam API' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
