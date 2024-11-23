window.onload = function() {
    setTimeout(function() {
        const container = document.querySelector('.container');
        container.scrollIntoView({
            block: 'end'
        });
    }, 500);
};

document.addEventListener('DOMContentLoaded', () => {
    const gameCoin = document.querySelector('.game-coin');
    const container = document.querySelector('.container');
    const slot = document.querySelector('.slot');
    const word = document.querySelector('.word');
    let isDragging = false;

    function startDrag(e) {
        if (e.type === 'mousedown' && e.button !== 0) return;

        isDragging = true;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const offsetX = clientX - gameCoin.offsetLeft;
        const offsetY = clientY - gameCoin.offsetTop;

        gameCoin.style.pointerEvents = 'none';
        gameCoin.style.position = 'absolute';

        function moveHandler(e) {
            if (!isDragging) return;

            const moveX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const moveY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            gameCoin.style.left = `${moveX - offsetX}px`;
            gameCoin.style.top = `${moveY - offsetY}px`;

            e.preventDefault();
        }

        function endDragHandler(e) {
            isDragging = false;

            gameCoin.style.pointerEvents = 'auto';

            const coinRect = gameCoin.getBoundingClientRect();
            const slotRect = slot.getBoundingClientRect();

            const isOverSlot = (
                coinRect.left < slotRect.right &&
                coinRect.right > slotRect.left &&
                coinRect.top < slotRect.bottom &&
                coinRect.bottom > slotRect.top
            );

            if (isOverSlot) {
                setTimeout(() => {
                    gameCoin.classList.add('hide');
                }, 100);
                container.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                setTimeout(function() {
                    word.classList.add('animate');
                }, 900);
                setTimeout(function() {
                    container.classList.add('hide');
                }, 2400);
            }

            gameCoin.style.position = '';
            gameCoin.style.left = '';
            gameCoin.style.top = '';

            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', endDragHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', endDragHandler);
        }

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', endDragHandler);
        document.addEventListener('touchmove', moveHandler, { passive: false });
        document.addEventListener('touchend', endDragHandler);
    }

    gameCoin.addEventListener('mousedown', startDrag);
    gameCoin.addEventListener('touchstart', startDrag);
});
