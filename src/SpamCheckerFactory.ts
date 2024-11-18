import { SpamChecker } from './SpamChecker';
import { GroqSpamChecker } from './integrations/groq/GroqSpamChecker';
import { OOPSpamChecker } from './integrations/oopspam/OOPSpamChecker';
import { SpamCheckAIChecker } from './integrations/spamcheck/SpamCheckAIChecker';

export class SpamCheckerFactory {
    static createChecker(type: string, apiKey: string): SpamChecker {
        switch (type.toLowerCase()) {
            case 'spamcheck.ai':
                return new SpamCheckAIChecker(apiKey);
            case 'oopspam':
                return new OOPSpamChecker(apiKey);
            case 'groq':
                return new GroqSpamChecker(apiKey);
            default:
                throw new Error(`Tipo de verificador de spam no soportado: ${type}`);
        }
    }
}
