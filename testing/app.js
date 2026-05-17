import { DataController } from '../src/datacontroller.mjs';
import { AppController } from './appcontroller.mjs';

const getSiteRoot = function () {
    return 'https://www.supertitle.org';
};

const oAppConfiguration = {
    getResource: function (sResourceKey) {
        const aResourceKeys = Object.keys(this.resources);
        if (aResourceKeys.indexOf(sResourceKey) < 0) {
            return null;
        }
        const sSiteRoot = getSiteRoot();
        const sResourceValue = this.resources[sResourceKey];
        let sResourcePath = '';
        switch (sResourceKey) {
        case 'settingsIcon':
            sResourcePath = `${sSiteRoot}/${sResourceValue}`;
            break;
        default:
            return null;
        }
        return sResourcePath;
    },
    maxDataObjectSize: 10000,
};

const oDataController = new DataController();
oDataController.appConfiguration = oAppConfiguration;
const oAppController = new AppController();
oDataController.makeDataView(oAppController, oAppController.resetViewAndModel);
