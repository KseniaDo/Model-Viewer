export function setToolbar(ToolsArray) {
    // Контейнер для инструментов
    const toolsRenderHtml = document.querySelector('.tools');

    for (let tool of ToolsArray) {
        let srcRL = '';
        let alt = '';

        // Определене src и alt
        switch(tool) {
            case ToolsArray[0]:
                srcRL = '/src/images/arrow_selector_tool_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
                alt = 'show info about object';
                break;
            case ToolsArray[1]:
                srcRL = '/src/images/360_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
                alt = 'rotate an object';
                break;
            case ToolsArray[2]:
                srcRL = '/src/images/open_with_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
                alt = 'move an object';
                break;
            case ToolsArray[3]:
                srcRL = '/src/images/zoom_in_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
                alt = 'scale an object';
                break;
        }
        let toolItem = document.createElement('div');
        if (tool == ToolsArray[0]) {
            toolItem.setAttribute('class', 'tool selected');
        } else {
            toolItem.setAttribute('class', 'tool');
        }
        
        // Внутреннее изображение
        let toolIcon = document.createElement('img');
        toolIcon.setAttribute('class', 'icons');
        toolIcon.setAttribute('src', srcRL);
        toolIcon.setAttribute('alt', alt);

        toolItem.appendChild(toolIcon);
    
        toolsRenderHtml.appendChild(toolItem);
    }

    // Массив инструментов
    const toolElementsArray = document.getElementsByClassName('tool');
    return toolElementsArray;
}
