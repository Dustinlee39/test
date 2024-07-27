class ButtonFactory {
    static createButtonAction(action) {
        const state = TVState.instance;
        switch(action) {
            case 'START':
                return state.togglePower.bind(state);
            case 'SELECT':
                return state.changeInput.bind(state);
            case 'UP':
                return state.volumeUp.bind(state);
            case 'DOWN':
                return state.volumeDown.bind(state);
            case 'LEFT':
                return state.speedDown.bind(state);
            case 'RIGHT':
                return state.speedUp.bind(state);
            case 'A':
                return ButtonActions.togglePlayPause();
            case 'B':
                return ButtonActions.launchWebBrowser();
            default:
                throw new Error('Unknown action: ' + action);
        }
    }
}
