import { createDiv, createButton } from './learnhypertext.mjs';

const MONTHS_SHORT = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const dataObjectExtension = 'dataobject';
const dataObjectName = 'datasample';

class DataController {
    constructor () {
        this.getDataModel;
        this.setDataModel;
        this.resetDataModel;
        this.resetViewAndModel;
        this.dataView;
        this.uploadDataButton;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.appConfiguration = { maxDataObjectSize: 10 ** 6 };
    }

    handleNewButtonClick () {
        this.resetDataModel();
        this.resetViewAndModel();
    }

    handleSaveButtonClick () {
        const sContent = JSON.stringify(this.getDataModel());
        const oLocalStorage = window.localStorage;
        const sNowKey = this.getNowKey();
        const sKey = `${dataObjectExtension}-${sNowKey}`;
        oLocalStorage.setItem(sKey, sContent);
        this.handleStorageChange.call(this);
    }

    validateDataObject (a) {
        let aDataObject = [];
        const nSnapshotSize = JSON.stringify(a).length;
        if (nSnapshotSize < this.appConfiguration.maxDataObjectSize) {
            aDataObject = JSON.parse(a);
        }
        return aDataObject;
    }

    handleLoadFileInputChange () {
        const aFiles = document.getElementById('uploadDataObjectButton').files;
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                const aDataObject = this.validateDataObject.call(
                    this,
                    reader.result,
                );
                this.setDataModel.call(this, aDataObject);
            },
            false,
        );

        if (aFiles && aFiles.length > 0) {
            const oFile = aFiles[0];
            reader.readAsText(oFile);
        }
    }

    makeNewButton (parentBox) {
        const oButton = createButton('newButton', 'New', parentBox);
        oButton.onclick = this.handleNewButtonClick.bind(this);
    }

    makeSaveDataObjectButton (parentBox) {
        const oButton = createButton('saveDataObjectButton', 'Save', parentBox);
        oButton.onclick = this.handleSaveButtonClick.bind(this);
    }

    makeUploadDataObjectButton (parentBox) {
        const sAccept = `.${dataObjectExtension}`;
        this.uploadDataObjectButton = this.createFileInput.call(
            this,
            'uploadDataObjectButton',
            'Upload',
            parentBox,
            sAccept,
        );
        this.uploadDataObjectButton.addEventListener(
            'change',
            this.handleLoadFileInputChange.bind(this),
        );
    }

    makeDataButtonBar (fnGetDataModel, fnSetDataModel, fnResetDataModel) {
        const buttonBar = createDiv('dataButtonBar', this.dataView);

        this.resetDataModel = fnResetDataModel;
        this.getDataModel = fnGetDataModel;
        this.setDataModel = fnSetDataModel;

        this.makeNewButton.call(this, buttonBar);
        this.makeSaveDataObjectButton.call(this, buttonBar);
        this.makeUploadDataObjectButton.call(this, buttonBar);
    }

    getNowKey () {
        const oNow = new Date();
        const sMonth = MONTHS_SHORT[oNow.getUTCMonth()];
        const sNowLabel = `${sMonth}.${oNow.getUTCDate()}.${oNow.getUTCHours()}:${oNow.getUTCMinutes()}`;
        return sNowLabel;
    }

    handleLoadDataButtonClick (event) {
        let oTarget = event.target;
        const sKey = oTarget.id;
        const oStorageArea = window.localStorage;
        const oItem = oStorageArea.getItem(sKey);
        const aLoadedDataObject = JSON.parse(oItem);
        this.setDataModel.call(this, aLoadedDataObject);
    }

    handleDataDownloadButtonClick (event) {
        let oTarget = event.target;
        const sKey = oTarget.id;
        const aDataObject = this.getDataModel.call(this);
        const sContent = JSON.stringify(aDataObject);
        const a = document.createElement('a');
        a.href = `data:application/json,${sContent}`;
        a.download = `${dataObjectName}-${sKey}.${dataObjectExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    handleDataDeleteButtonClick (event) {
        let oTarget = event.target;
        const sKey = oTarget.id;
        const oStorageArea = window.localStorage;
        oStorageArea.removeItem(sKey);
        this.handleStorageChange.call(this);
    }

    addItemToStorageView (storageView, key) {
        const sTitle = key.substring(key.indexOf('-') + 1);
        const oItem = createDiv(key, storageView);
        const oLoadButton = createButton(key, sTitle, oItem);
        oLoadButton.className = 'load';
        oLoadButton.onclick = this.handleLoadDataButtonClick.bind(this);
        const oAdditionalButtons = createDiv(key, oItem);
        oAdditionalButtons.className = 'additionalButtons';
        const oDownloadButton = createButton(
            key,
            'Download',
            oAdditionalButtons,
        );
        oDownloadButton.className = 'download';
        oDownloadButton.onclick = this.handleDataDownloadButtonClick.bind(this);
        const oDeleteButton = createButton(key, 'Delete', oAdditionalButtons);
        oDeleteButton.className = 'delete';
        oDeleteButton.onclick = this.handleDataDeleteButtonClick.bind(this);
    }

    updateStorageView (storageArea) {
        let oStorageView = document.getElementById('storageView');
        if (!oStorageView) {
            oStorageView = createDiv('storageView', this.dataView);
        }
        const aChildren = oStorageView.childNodes;
        for (let j = aChildren.length - 1; j >= 0; j--) {
            const oChild = aChildren[j];
            oStorageView.removeChild(oChild);
        }
        for (let i = 0; i < storageArea.length; i++) {
            const sKey = storageArea.key(i);
            this.addItemToStorageView.call(this, oStorageView, sKey);
        }
    }

    handleStorageChange (storageEvent) {
        let oStorageArea;
        if (storageEvent) {
            oStorageArea = storageEvent.storage;
        } else {
            oStorageArea = window.localStorage;
        }
        this.updateStorageView(oStorageArea);
    }

    createFileInput (sId, sLabel, oParent, sAccept) {
        if (!oParent) {
            oParent = document.body;
        }

        const oInput = document.createElement('input');
        oInput.type = 'file';
        oInput.id = sId;
        if (sAccept && sAccept.length > 0) {
            oInput.accept = sAccept;
        }

        const oStylishButton = createButton(
            sId + 'StylishButton',
            sLabel,
            oParent,
        );
        oStylishButton.classList.add('inputStylishButton');

        oStylishButton.appendChild(oInput);
        oParent.appendChild(oStylishButton);

        return oInput;
    }

    handleKeyDown (event) {
        const keyCode = event.keyCode;
        if (keyCode === 78) {
            this.resetDataObject();
        }
    }

    makeLoadBar (fnResetViewAndModel) {
        window.addEventListener('storage', this.handleStorageChange.bind(this));
        this.resetViewAndModel = fnResetViewAndModel;
        this.handleStorageChange.call(this);
    }

    makeDataView (appController, resetViewAndModel) {
        ((this.dataView = createDiv('dataView')),
        this.makeDataButtonBar.call(
            this,
            appController.getDataModel,
            appController.setDataModel,
            appController.resetDataModel,
        ));
        this.makeLoadBar.call(this, resetViewAndModel);
    }
}

export { DataController };
