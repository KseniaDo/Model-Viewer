export default class Rotate {
    mouseDown = false;
    mouseX = 0;
    mouseY = 0;

    onmousemove(e, object, camera) {
        if (!this.mouseDown) {
            return;
        }

        e.preventDefault();

        const clientPoint = this.#getClientPoint(e);
        const clientCurrX = clientPoint.x;
        const clientCurrY = clientPoint.y;

        // Отклонение от предыдущей точки
        const dx = clientCurrX - this.mouseX;
        const dy = clientCurrY - this.mouseY;

        this.mouseX = clientCurrX;
        this.mouseY = clientCurrY;

        this.changeRotation(object, dx, dy);
    }

    onmousedown(e, camera) {
        e.preventDefault();
        this.mouseDown = true;

        const clientPoint = this.#getClientPoint(e);

        this.mouseX = clientPoint.x;
        this.mouseY = clientPoint.y;
    }

    onmouseup(e) {
        e.preventDefault();
        this.mouseDown = false;
    }

    // Изменение параметров вращения
    changeRotation(object, dx, dy){
        object.rotation.x += dy * 0.01;
        object.rotation.y += dx * 0.01;
    }

    // Определене 2D координат курсора
    #getClientPoint(event) {
        let clientCurrX;
        let clientCurrY;

        if (event.type == "touchstart" || event.type == "touchmove") {
            clientCurrX = event.touches[0].clientX;
            clientCurrY = event.touches[0].clientY;
        } else {
            clientCurrX = event.clientX;
            clientCurrY = event.clientY;
        }

        return { 
            x: clientCurrX,
            y: clientCurrY,
        };
    }
}