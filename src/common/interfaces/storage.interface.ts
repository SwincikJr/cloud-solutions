export interface StorageInterface {
    initialize(options?: any);
    readContent(path, options?);
    readStream(path, options?);
    sendStream?(path, options?);
    _sendContent(path, content, options?);
    sendContent(path, content, options?, retry?);
    deleteFile(path, options?);
    deleteDirectory(directoryName, options?);
    readDirectory(directoryName?, options?);
    checkDirectoryExists(directoryName?, options?);
}
