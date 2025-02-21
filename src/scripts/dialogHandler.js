const dialog = document.getElementById('dialogInfo');
const dialogCloser = dialog.querySelector('.closeDialogBtn');
const coordinates = document.querySelectorAll('.property__coordinate');

const submenus = document.querySelectorAll('.list__item[data-has-children]');
submenus.forEach((item) => {
    toggleHidden(item);
});

function initDialog() {
    dialog.addEventListener('click', closeOnBackDropClick);
    dialog.addEventListener('cancel', (event) => {
        returnScroll()
    });

    dialogCloser.addEventListener('click', (event) => {
        event.stopPropagation();
        dialog.close();
    });
}

// Закрытие по клику вне окна
function closeOnBackDropClick({ currentTarget, target }) {
    const dialog = currentTarget;
    const isClickedOnBackDrop = target === dialog;
    if (isClickedOnBackDrop) {
        dialog.close();
    }
}

// Блок на скролл экрана
function openModalAndLockScroll(x, y, z) {
    dialog.showModal();
    setCoordinatesDialog(x, y, z);
    document.body.classList.add('scroll-lock');
}

// Координаты модели
function setCoordinatesDialog(x, y, z){
    coordinates[0].textContent = Math.round(x * 100) / 100;
    coordinates[1].textContent = Math.round(y * 100) / 100;
    coordinates[2].textContent = Math.round(z * 100) / 100;
}

// Раскрывающийся список
function toggleHidden(item) {
    const dropdown = item.querySelector(':scope > .list');
    dropdown.setAttribute('hidden', '');

    item.addEventListener('click', function(e) {
        toggleDropdown(item, dropdown);
    });
}

function toggleDropdown(button, dropdown) {
    if (button.getAttribute('aria-expanded') === 'true') {
        button.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('hidden', '');
    } else {
        button.setAttribute('aria-expanded', 'true');
        dropdown.removeAttribute('hidden');
    }
}
export { dialog, initDialog, openModalAndLockScroll };