export interface SpamCheckResult {
    isSpam: boolean;
    score?: number;
    details?: any;
}

export interface SpamCheckSimpleResult{
    isSpam: boolean;
}
export abstract class SpamChecker {
    protected apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    abstract check(data: any): Promise<SpamCheckResult>;
}
