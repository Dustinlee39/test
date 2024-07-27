document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const noSignal = document.getElementById('noSignal');
    const inputDisplay = document.getElementById('inputDisplay');
    const volumeDisplay = document.getElementById('volumeDisplay');
    const speedDisplay = document.getElementById('speedDisplay');
    let iframe = null;

    let powerOn = false;
    const inputs = [
        { name: "HDMI 1", url: "https://www.youtube.com/embed/HiMbwCJDw_Y?autoplay=1" },
        { name: "HDMI 2", url: "https://www.youtube.com/embed/biq-NTLbUKw?autoplay=1" },
        { name: "VGA", url: "https://www.youtube.com/embed/U95qDswrmGM?autoplay=1" },
        { name: "NES", url: "https://www.youtube.com/embed/QpXb6aTtlTk?autoplay=1" }
    ];
    let currentInputIndex = 0;
    let volume = 50;
    let speed = 1;

    function powerButton() {
        console.log('Power button pressed');
        powerOn = !powerOn;
        const screen = document.getElementById('screen');

        if (powerOn) {
            console.log('Powering on');
            screen.innerHTML = "<div class='starting-up'>One moment, starting up...</div>";
            setTimeout(() => {
                currentInputIndex = 0;
                inputDisplay.style.display = 'block';inputDisplay.textContent = inputs[currentInputIndex].name;
                volumeDisplay.style.display = 'block';
                speedDisplay.style.display = 'block';
                updateScreen();
            }, 3000);
        } else {
            console.log('Powering off');
            screen.style.backgroundColor = 'black';
            screen.innerHTML = '';
            inputDisplay.style.display = 'none';
            noSignal.style.display = 'none';
            volumeDisplay.style.display = 'none';
            speedDisplay.style.display = 'none';
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
        }
    }

    function inputButton() {
        console.log('Input button pressed');
        if (powerOn) {
            currentInputIndex = (currentInputIndex + 1) % inputs.length;
            inputDisplay.textContent = inputs[currentInputIndex].name;
            updateScreen();
        } else {
            alert('Power is off. Please turn on the power first.');
        }
    }

    function buttonPressed(button) {
        console.log(`${button} button pressed`);
        switch(button) {
            case 'START':
                powerButton();
                break;
            case 'SELECT':
                inputButton();
                break;
            case 'UP':
                if (volume < 100) {
                    volume += 10;
                    volumeDisplay.textContent = 'Volume: ' + volume + '%';
                    console.log('Volume increased to ' + volume + '%');
                }
                break;
            case 'DOWN':
                if (volume > 0) {
                    volume -= 10;
                    volumeDisplay.textContent = 'Volume: ' + volume + '%';
                    console.log('Volume decreased to ' + volume + '%');
                }
                break;
            case 'LEFT':
                if (speed > 0.5) {
                    speed -= 0.1;
                    speed = parseFloat(speed.toFixed(1));
                    speedDisplay.textContent = 'Speed: ' + speed + 'x';
                    console.log('Speed decreased to ' + speed + 'x');
                }
                break;
            case 'RIGHT':
                if (speed < 2) {
                    speed += 0.1;
                    speed = parseFloat(speed.toFixed(1));
                    speedDisplay.textContent = 'Speed: ' + speed + 'x';
                    console.log('Speed increased to ' + speed + 'x');
                }
                break;
            case 'B':
                console.log('Button B pressed');
                alert('Button B action executed!');
                break;
            case 'A':
                togglePlayPause();
                break;
            default:
                console.log('Unknown button pressed');
        }
    }

    function updateScreen() {
        console.log('Updating screen');
        const screen = document.getElementById('screen');
        screen.innerHTML = '<iframe id="videoIframe" width="100%" height="100%" src="' + inputs[currentInputIndex].url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        iframe = document.getElementById('videoIframe');
        if (inputs[currentInputIndex].name === "VGA") {
            noSignal.style.display = 'block';
        } else {
            noSignal.style.display = 'none';
        }
    }

    function togglePlayPause() {
        if (iframe) {
            const iframeSrc = iframe.src;
            if (iframeSrc.includes("autoplay=1")) {
                iframe.src = iframeSrc.replace("autoplay=1", "autoplay=0");
            } else {
                iframe.src = iframeSrc.replace("autoplay=0", "autoplay=1");
            }
        }
    }

    function ensureDisplays() {
        volumeDisplay.style.display = 'block';
        speedDisplay.style.display = 'block';
    }

    setInterval(ensureDisplays, 1000);

    document.querySelectorAll('.dpad div, .center-buttons div, .action-buttons div').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.getAttribute('data-action'));
            buttonPressed(button.getAttribute('data-action'));
        });
        button.addEventListener('touchstart', () => {
            console.log('Button touched:', button.getAttribute('data-action'));
            buttonPressed(button.getAttribute('data-action'));
        });
    });
});
