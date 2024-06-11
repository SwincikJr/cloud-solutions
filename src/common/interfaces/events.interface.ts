export interface EventsInterface {
    initialize(options?: any);
    _sendToQueue(name, data, options?: any);
    sendToQueue(name, data, options?: any);
    loadQueue(name, handler);
    isConnected();
}

export interface HandlerOptionsInterface {
    events?: EventsInterface;
    queueName?: string;
}
