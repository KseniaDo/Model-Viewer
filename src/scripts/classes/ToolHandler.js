export default class ToolHandler {
    #Tools = ["NONE"];
    #toolObjects = [];

    toolSelected = {
        text: "NONE",
        object: '',
    };

    constructor(Tools, Objects) {
        this.#Tools = Tools;
        this.#toolObjects = Objects;
    }

    changeToolSelected(ind) {
        if (this.toolSelected.text == this.#Tools[ind]) {
            return;
        }

        // Определение параметров выбранного инструмента
        let toolTextNew = this.#Tools[ind];
        let toolObjectNew = '';

        switch(toolTextNew) {
            case "NONE":
                toolObjectNew = '';
                break;
            case "ROTATE":
                toolObjectNew = this.#toolObjects[0];
                break;
            case "MOVE":
                toolObjectNew = this.#toolObjects[1];
                break;
            case "SCALE":
                toolObjectNew = this.#toolObjects[2];
                break;
        }

        this.toolSelected = {
            text: toolTextNew,
            object: toolObjectNew,
        };
    }
}