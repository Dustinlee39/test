class ScreenDisplay {
    constructor(screen, noSignal, inputDisplay, volumeDisplay, speedDisplay, inputs) {
        this.screen = screen;
        this.noSignal = noSignal;
        this.inputDisplay = inputDisplay;
        this.volumeDisplay = volumeDisplay;
        this.speedDisplay = speedDisplay;
        this.inputs = inputs;
        TVState.instance.addObserver(this);
    }

    update(state) {
        if (state.powerOn) {
            this.inputDisplay.style.display = 'block';
            this.inputDisplay.textContent = this.inputs[state.currentInputIndex].name;
            this.volumeDisplay.style.display = 'block';
            this.volumeDisplay.textContent = 'Volume: ' + state.volume + '%';
            this.speedDisplay.style.display = 'block';
            this.speedDisplay.textContent = 'Speed: ' + state.speed + 'x';
            this.updateScreen(state.currentInputIndex);
        } else {
            this.screen.style.backgroundColor = 'black';
            this.screen.innerHTML = '';
            this.inputDisplay.style.display = 'none';
            this.noSignal.style.display = 'none';
            this.volumeDisplay.style.display = 'none';
            this.speedDisplay.style.display = 'none';
        }
    }

    updateScreen(inputIndex) {
        this.screen.innerHTML = `<iframe id="videoIframe" width="100%" height="100%" src="${this.inputs[inputIndex].url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        if (this.inputs[inputIndex].name === "VGA") {
            this.noSignal.style.display = 'block';
        } else {
            this.noSignal.style.display = 'none';
        }
    }
}
