export interface Transform {
    getCssTransform(): string;
}

export class Translation implements Transform {
    public getCssTransform(): string {
        throw new Error('Not implemented yet.');
    }
}

export class MultiTransform implements Transform {
    transforms: Transform[] = [];

    public getCssTransform(): string {
        throw new Error('Not implemented yet.');
    }
}