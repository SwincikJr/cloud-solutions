import { Interface } from 'readline';

export interface WriteStreamInterface {
    getLineIndex();
    getLineNumber();
    isFirstLine();
    writeLine(content: string);
    writeReadStream(readStream: Interface);
    write(content: string);
    end();
}
