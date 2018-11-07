window.onload = function () {

    document.querySelector('#start-button').onclick = function () {
        game.init();
        document.querySelector('#start-button').setAttribute("style", "display:none");
    }

    document.querySelector('#reset-button').onclick = function () {
        game.reset();
    }

    document.querySelector('#restart-button').onclick = function () {
        game.totalReset();
    }
}