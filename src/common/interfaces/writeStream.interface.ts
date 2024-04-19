import { Interface } from 'readline';
import { LineBreakerEnum } from '../types/lineBreaker.enum';

export interface WriteStreamInterface {
    setLineBreaker(lineBreaker: LineBreakerEnum);
    getLineIndex();
    getLineNumber();
    isFirstLine();
    writeLine(content: string);
    writeReadStream(readStream: Interface);
    write(content: string);
    end();
}
