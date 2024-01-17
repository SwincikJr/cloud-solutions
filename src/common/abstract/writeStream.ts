import { ReadStream } from 'fs';

export class WriteStream {
    protected firstLine = true;

    getRawStream() {
        return this['_stream'];
    }

    on(event: string, callback: any) {
        return this['_stream']?.on(event, callback);
    }

    isFirstLine() {
        return this.firstLine;
    }

    async writeLine(content) {
        const lineBreak = this.isFirstLine() ? '' : '\n';
        this.firstLine = false;
        return await this['write'](lineBreak + content);
    }

    async writeReadStream(readStream: ReadStream, terminate = false) {
        for await (const line of readStream) {
            await this.writeLine(line);
        }
        terminate && (await this['end']());
    }
}
