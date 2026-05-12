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
    }
};

const oController = {};
oController.appConfiguration = oAppConfiguration;