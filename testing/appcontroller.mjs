class AppController {
    getDataModel () {
        return this.dataModel;
    }

    setDataModel (oDataModel) {
        this.dataModel = oDataModel;
    }

    resetViewAndModel () {
        this.dataModel = {};
    }
}

export { AppController };
