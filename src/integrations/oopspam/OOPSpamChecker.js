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
exports.OOPSpamChecker = void 0;
const axios_1 = __importDefault(require("axios"));
const SpamChecker_1 = require("../../SpamChecker");
class OOPSpamChecker extends SpamChecker_1.SpamChecker {
    check(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('https://api.oopspam.com/v1/spamdetection', Object.assign(Object.assign({}, data), { content: data.content || "Default content", senderIP: data.senderIP || "91.203.67.110", email: data.email || "testing@example.com", blockTempEmail: data.blockTempEmail || false, checkForLength: data.checkForLength || true, allowedLanguages: data.allowedLanguages || ["en"], allowedCountries: data.allowedCountries || ["us", "it"], blockedCountries: data.blockedCountries || ["ru", "cn"] }), {
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
            }
            catch (error) {
                console.error('Error al conectarse con la API de OOPSpam:', error.response ? error.response.data : error.message);
                throw new Error('Error al conectarse con la API de OOPSpam');
            }
        });
    }
}
exports.OOPSpamChecker = OOPSpamChecker;
