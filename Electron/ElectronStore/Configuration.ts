import ElectronStore from 'electron-store';

export const appConfig = new ElectronStore({
    name: 'appConfig',
    defaults: {
        setting: {},
        app: {
            poe: {}
        },
    },
    schema: {
        setting: {
            type: 'object',
        },
        app: {
            type: 'object',
            properties: {
                poe: {
                    type: 'object',
                    properties: {
                        account: { type: 'string' },
                        directory: { type: 'string' },
                    }
                }
            }
        }
    },
});
