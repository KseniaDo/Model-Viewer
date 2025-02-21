export default class Scale {
    mouseDown = false;
    mouseX = 0;
    mouseY = 0;
    mouseXPrev = 0;

    onmousemove(e, object, camera) {
        if (!this.mouseDown) {
            return;
        }
        e.preventDefault();

        const mousePoint = this.#getClientPoint(e);
        const mouseXCurr = mousePoint.x;
        const mouseYCurr = mousePoint.y;

        // Определение расстояния м\у предыдущей и текущей точкой - радиус
        const distance = Math.sqrt(Math.pow((mouseXCurr - this.mouseX), 2) + Math.pow((mouseYCurr - this.mouseY), 2));

        // Увеличение/уменьшение радиуса - увеличение/уменьшение масштаба
        if (mouseXCurr >= this.mouseXPrev) {
            this.changeScale(distance, object);
        } else {
            this.changeScale(-distance, object);
        }

        this.mouseXPrev = mouseXCurr;
    }

    onmousedown(e, camera) {
        e.preventDefault();
        this.mouseDown = true;

        const clientPoint = this.#getClientPoint(e);
        this.mouseX = clientPoint.x;
        this.mouseY = clientPoint.y;
        this.mouseXPrev = clientPoint.x;
    }

    onmouseup(e) {
        e.preventDefault();
        this.mouseDown = false;
    }

    // Изменение параметров масштабирования
    changeScale(distance, object) {
        object.scale.x += distance * 1.7;
        object.scale.y += distance * 1.7;
        object.scale.z += distance * 1.7;
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