class TVState {
    constructor() {
        if (TVState.instance) {
            return TVState.instance;
        }
        this.powerOn = false;
        this.currentInputIndex = 0;
        this.volume = 50;
        this.speed = 1;
        this.observers = [];
        TVState.instance = this;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    togglePower() {
        this.powerOn = !this.powerOn;
        this.notifyObservers();
    }

    changeInput() {
        if (this.powerOn) {
            this.currentInputIndex = (this.currentInputIndex + 1) % 4; // Assuming 4 inputs
            this.notifyObservers();
        } else {
            alert('Power is off. Please turn on the power first.');
        }
    }

    volumeUp() {
        if (this.volume < 100) {
            this.volume += 10;
            this.notifyObservers();
        }
    }

    volumeDown() {
        if (this.volume > 0) {
            this.volume -= 10;
            this.notifyObservers();
        }
    }

    speedUp() {
        if (this.speed < 2) {
            this.speed += 0.1;
            this.speed = parseFloat(this.speed.toFixed(1));
            this.notifyObservers();
        }
    }

    speedDown() {
        if (this.speed > 0.5) {
            this.speed -= 0.1;
            this.speed = parseFloat(this.speed.toFixed(1));
            this.notifyObservers();
        }
    }
}
