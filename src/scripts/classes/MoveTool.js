import * as THREE from 'three';

export default class Move {
    mouseDown = false;
    mouseX = 0;
    mouseY = 0;
    mouseZ = 0.5;
    point3D = (0, 0, 0);

    onmousemove(e, object, camera) {
        if (!this.mouseDown) {
            return;
        }
        e.preventDefault();

        const mousePoint = this.#getClientPoint(e);
        const mouseXcurr = mousePoint.x;
        const mouseYcurr = mousePoint.y;
        const mouseZcurr = this.mouseZ;
        const positionCurrent = this.get2Dto3DpointVec(mouseXcurr, mouseYcurr, mouseZcurr, camera);

        // Отклонение от предыдущей точки
        const dx = positionCurrent.x - this.point3D.x;
        const dy = positionCurrent.y - this.point3D.y;
        const dz = positionCurrent.z - this.point3D.z;

        this.mouseX = mouseXcurr;
        this.mouseY = mouseYcurr;

        this.changePosition(dx, dy, dz, object);
        this.point3D = positionCurrent;
    }

    onmousedown(e, camera) {
        e.preventDefault();
        this.mouseDown = true;

        const clientPoint = this.#getClientPoint(e);

        this.mouseX = clientPoint.x;
        this.mouseY = clientPoint.y;

        this.point3D = this.get2Dto3DpointVec(this.mouseX, this.mouseY, this.mouseZ, camera);
    }

    onmouseup(e) {
        e.preventDefault();
        this.mouseDown = false;
    }

    // Перевод 2D координат в 3D
    get2Dto3DpointVec(mouseX, mouseY, mouseZ, camera) {
        const vector = new THREE.Vector3();
        const position = new THREE.Vector3();

        vector.set(mouseX, mouseY, mouseZ);
        vector.unproject(camera);
        vector.sub(camera.position).normalize();
        const distance = - camera.position.z / vector.z;

        position.copy(camera.position).add(vector.multiplyScalar(distance));
        return position;
    }

    // Изменение параметров положения
    changePosition(dx, dy, dz, object) {
        object.position.x += dx * 0.15;
        object.position.y -= dy * 0.15;
        object.position.z += dz * 0.15;
    }

    // Определене 2D координат курсора
    #getClientPoint(event) {
        let clientCurrX;
        let clientCurrY;

        if (event.type == "touchstart" || event.type == "touchmove") {
            clientCurrX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            clientCurrY = (event.touches[0].clientY / window.innerHeight) * 2 - 1;
        } else {
            clientCurrX = (event.clientX / window.innerWidth) * 2 - 1;
            clientCurrY = (event.clientY / window.innerHeight) * 2 - 1;
        }

        return { 
            x: clientCurrX,
            y: clientCurrY,
        };
    }
}