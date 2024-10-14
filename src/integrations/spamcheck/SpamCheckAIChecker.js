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
exports.SpamCheckAIChecker = void 0;
const axios_1 = __importDefault(require("axios"));
const SpamChecker_1 = require("../../SpamChecker");
class SpamCheckAIChecker extends SpamChecker_1.SpamChecker {
    check(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('https://api.spamcheck.ai/api/v1/spam/check', data, {
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
            }
            catch (error) {
                console.error('Error al conectarse con la API de SpamCheck:', error.response ? error.response.data : error.message);
                throw new Error('Error al conectarse con la API de SpamCheck');
            }
        });
    }
}
exports.SpamCheckAIChecker = SpamCheckAIChecker;
