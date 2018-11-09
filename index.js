window.onload = function () {

    document.querySelector('#start-button').onclick = function () {

        if (document.querySelector('#names').checked){
            document.querySelector('.Rover-label').innerHTML=prompt(`Player 1 Name`) + ": ";
            document.querySelector('.Rover2-label').innerHTML=prompt(`Player 2 Name`) + ": ";
        }
        game.init();
        document.querySelector('#start-button').setAttribute("style", "display:none");
    }

    document.querySelector('#reset-button').onclick = function () {
        game.reset();
    }

    document.querySelector('#restart-button').onclick = function () {
        game.totalReset();
    }

    document.querySelector('#overlay div').onclick = function () {
        el = document.getElementById("overlay");
        el.style.visibility = (el.style.visibility === "visible") ? "hidden" : "visible";
    }
}