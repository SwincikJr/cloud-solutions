import { SolutionsInterface, SolutionsMapInterface } from './common/interfaces/solutions.interface';
import { adapters } from './common/config';
import { SolutionEnum } from './common/types/solution.enum';
import { partial } from 'lodash';

export class SolutionsFactory {
    providerOptions: any = {};
    _solutionsMap: SolutionsMapInterface = {};
    _solutions: SolutionsInterface = {};

    async initialize({ storage = '', events = '', secrets = '', provider = '', providerOptions = {} }) {
        await this.setOptions(storage, events, secrets, provider, providerOptions);
        await this.instantiate();
        return this.getAll();
    }

    async setSolutionsByCloudProvider(provider: string) {
        for (const solutionType in adapters[provider]) {
            await this.set(solutionType, provider);
        }
    }

    async setOptions(storage, events, secrets, provider, providerOptions) {
        this.providerOptions = providerOptions;

        // get solutions available into cloud provider
        await this.setSolutionsByCloudProvider(provider);

        // override solutions by specified ones
        if (storage) await this.set(SolutionEnum.STORAGE, storage);
        if (events) await this.set(SolutionEnum.EVENTS, events);
        if (secrets) await this.set(SolutionEnum.SECRETS, secrets);
    }

    async set(solutionType: string, solutionName: string) {
        const adapter = typeof solutionName === 'string' ? this.find(solutionType, solutionName) : solutionName;
        if (adapter) {
            this._solutionsMap[solutionType] = adapter;
        }
    }

    async instantiate() {
        for (const solutionType in this._solutionsMap) {
            const adapter = this._solutionsMap[solutionType];

            if (solutionType === SolutionEnum.CLOUD_PROVIDER) {
                const adapterCooked = partial(adapter, this.providerOptions);
                await adapterCooked();
                this._solutions[solutionType] = adapterCooked;
            } else {
                const instance = new adapter(this.providerOptions);
                this._solutions[solutionType] = instance;
            }
        }
    }

    getAll(): SolutionsInterface {
        return this._solutions;
    }

    get(solutionType: string) {
        return this._solutions[solutionType];
    }

    find(solutionType: string, solutionName: string) {
        return adapters[solutionType] && adapters[solutionType][solutionName];
    }

    static findClass(solutionType: string, solutionName: string) {
        return adapters[solutionType] && adapters[solutionType][solutionName];
    }
}
