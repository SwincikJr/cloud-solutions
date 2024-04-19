import { Interface } from 'readline';
import { LineBreakerEnum } from '../types/lineBreaker.enum';

export abstract class WriteStream {
    protected lineIndex = 0;
    protected lineBreaker = LineBreakerEnum.LF;

    setLineBreaker(lineBreaker: LineBreakerEnum) {
        this.lineBreaker = lineBreaker;
    }

    getRawStream() {
        return this['_stream'];
    }

    on(event: string, callback: any) {
        return this['_stream']?.on(event, callback);
    }

    isFirstLine() {
        return !this.lineIndex;
    }

    getLineIndex() {
        return this.lineIndex;
    }

    getLineNumber() {
        return this.getLineIndex() + 1;
    }

    async writeLine(content) {
        const lineBreak = this.isFirstLine() ? '' : this.lineBreaker;
        this.lineIndex++;

        return await this.write(lineBreak + content);
    }

    async writeReadStream(readStream: Interface, terminate = false) {
        for await (const line of readStream) {
            await this.writeLine(line);
        }
        terminate && (await this['end']());
    }

    abstract end();
    abstract write(content);
}
