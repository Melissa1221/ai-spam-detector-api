export interface SpamCheckResult {
    isSpam: boolean;
    score?: number;
    details?: any;
}

export abstract class SpamChecker {
    protected apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    abstract check(data: any): Promise<SpamCheckResult>;
}
