import * as THREE from 'three';
import * as SceneObjects from './src/scripts/initializationScene';
import * as DialogHandler from './src/scripts/dialogHandler';
import { setToolbar } from './src/scripts/renderToolsHTML';
import ToolHandler from './src/scripts/classes/ToolHandler';
import Rotate from './src/scripts/classes/RotateTool';
import Move from './src/scripts/classes/MoveTool';
import Scale from './src/scripts/classes/ScaleTool';

// Используемые инструменты: названиие и объект
const Tools = [
    "NONE",
    "ROTATE",
    "MOVE",
    "SCALE",
];
const toolObjects = [
    new Rotate(),
    new Move(),
    new Scale(),
];
const toolHandler = new ToolHandler(Tools, toolObjects);

// Второй материал
const materialChange = new THREE.MeshPhysicalMaterial();
materialChange.color = new THREE.Color(0x0000ff);
materialChange.reflectivity = 1.0;
materialChange.roughness = 0.0;
materialChange.envMapIntensity = 1.0;

// Рендер инструментов со слушателями
const tools = setToolbar(Tools);
for (let i = 0; i < tools.length; i++) {
    tools[i].addEventListener('click', function(e) {
        tools[Tools.indexOf(toolHandler.toolSelected.text)].setAttribute('class', 'tool');
        tools[i].setAttribute('class', 'tool selected');
        removeEventListeners(i);
        toolHandler.changeToolSelected(i);
        addEventListeners(i);
    });
}

// Инициализация сцены
SceneObjects.initialize();

// Изменение материала на второй
const btnChangeMaterial = DialogHandler.dialog.querySelector('.dialogBtn');
btnChangeMaterial.addEventListener('click', (event) => {
    event.stopPropagation();
    SceneObjects.model.traverse((object) => {
        if (object.isMesh) {
            object.material = materialChange;
        }
    });
})

// Перерендер канвас при изменении размеров экрана
const canvasSize = SceneObjects.renderer.domElement.parentElement;
canvasSize.addEventListener('resize', onCanvasResize);

function onCanvasResize() {
    let newSize = canvasSize.getBoundingClientRect();
    SceneObjects.renderer.setSize(newSize.width, newSize.height);
    SceneObjects.camera.aspect = newSize.width / newSize.height;
    SceneObjects.camera.updateProjectionMatrix();
}

// Управление EventListeners...
function removeEventListeners(toolInd) {
    if (toolHandler.toolSelected.text != Tools[toolInd]) {
        if (toolHandler.toolSelected.text == "NONE") {
            removeDefaultHandler(SceneObjects.canvas);
        } else {
            removeMouseHandler(SceneObjects.canvas);
        }
    }
}
function addEventListeners(toolInd) {
    if (toolHandler.toolSelected.text == "NONE") {
        addDefaultHandler(SceneObjects.canvas);
    } else {
        addMouseHandler(SceneObjects.canvas);
    }
}

// События инструмента по-умолчанию
let addDefaultHandlerFunction = function(e) {
    DialogHandler.openModalAndLockScroll(
        SceneObjects.model.position.x, 
        SceneObjects.model.position.y, 
        SceneObjects.model.position.z
    );
}
function addDefaultHandler(canvas) {
    canvas.addEventListener('click', addDefaultHandlerFunction);
}
function removeDefaultHandler(canvas) {
    canvas.removeEventListener('click', addDefaultHandlerFunction);
}

// События мыши/тапа
let mouseHandlerMove = function(event) {
    toolHandler.toolSelected.object.onmousemove(
        event,
        SceneObjects.model,
        SceneObjects.camera
    );
};

let mouseHandlerDown = function(event) {
    toolHandler.toolSelected.object.onmousedown(
        event, 
        SceneObjects.camera
    );
};

let mouseHandlerUp = function(event) {
    toolHandler.toolSelected.object.onmouseup(
        event
    );
};

function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove', mouseHandlerMove);
    canvas.addEventListener('mousedown', mouseHandlerDown);
    canvas.addEventListener('mouseup', mouseHandlerUp);

    canvas.addEventListener('touchmove', mouseHandlerMove);
    canvas.addEventListener('touchstart', mouseHandlerDown);
    canvas.addEventListener('touchend', mouseHandlerUp);
}

function removeMouseHandler(canvas) {
    canvas.removeEventListener('mousemove', mouseHandlerMove);
    canvas.removeEventListener('mousedown', mouseHandlerDown);
    canvas.removeEventListener('mouseup', mouseHandlerUp);

    canvas.removeEventListener('touchmove', mouseHandlerMove);
    canvas.removeEventListener('touchstart', mouseHandlerDown);
    canvas.removeEventListener('touchend', mouseHandlerUp);
}

// Инициализация событий по-умолчанию
addDefaultHandler(SceneObjects.canvas);

// Инициализация попапа
DialogHandler.initDialog();