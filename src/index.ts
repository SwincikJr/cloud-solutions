import { SolutionsFactory } from './solutions.factory';

import { SolutionEnum } from './common/types/solution.enum';
import { ProviderEnum } from './common/types/provider.enum';
import { StorageOutputEnum } from './common/types/storageOutput.enum';
import { LineBreakerEnum } from './common/types/lineBreaker.enum';

import Aws from './aws';
import Local from './local';
import { RabbitMQ } from './thirdparty/rabbitmq';

import { EventsInterface, HandlerOptionsInterface } from './common/interfaces/events.interface';
import { SecretsInterface } from './common/interfaces/secrets.interface';
import { SolutionsInterface } from './common/interfaces/solutions.interface';
import { StorageInterface } from './common/interfaces/storage.interface';
import { Events } from './common/abstract/events';
import { Secrets } from './common/abstract/secrets';
import { Storage } from './common/abstract/storage';
import { Sftp } from './thirdparty/sftp';
import { Ftp } from './thirdparty/ftp';

const Adapters = {
    Aws,
    Local,
    RabbitMQ,
    Sftp,
    Ftp,
};

const Abstracts = {
    Events,
    Secrets,
    Storage,
};

export {
    SolutionsFactory,
    Adapters,
    Abstracts,
    // types
    SolutionEnum,
    ProviderEnum,
    StorageOutputEnum,
    LineBreakerEnum,
    // interfaces
    EventsInterface,
    HandlerOptionsInterface,
    SecretsInterface,
    SolutionsInterface,
    StorageInterface,
};
