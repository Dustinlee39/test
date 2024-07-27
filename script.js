document.addEventListener('DOMContentLoaded', () => {
    const noSignal = document.getElementById('noSignal');
    const inputDisplay = document.getElementById('inputDisplay');
    const volumeDisplay = document.getElementById('volumeDisplay');
    const speedDisplay = document.getElementById('speedDisplay');
    const screen = document.getElementById('screen');

    const inputs = [
        { name: "HDMI 1", url: "https://www.youtube.com/embed/HiMbwCJDw_Y?autoplay=1" },
        { name: "HDMI 2", url: "https://www.youtube.com/embed/biq-NTLbUKw?autoplay=1" },
        { name: "VGA", url: "https://www.youtube.com/embed/U95qDswrmGM?autoplay=1" },
        { name: "NES", url: "https://www.youtube.com/embed/QpXb6aTtlTk?autoplay=1" }
    ];

    const state = new TVState();
    new ScreenDisplay(screen, noSignal, inputDisplay, volumeDisplay, speedDisplay, inputs);

    document.querySelectorAll('.dpad div, .center-buttons div, .action-buttons div').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const actionHandler = ButtonFactory.createButtonAction(action);
            actionHandler();
        });
        button.addEventListener('touchstart', () => {
            const action = button.getAttribute('data-action');
            const actionHandler = ButtonFactory.createButtonAction(action);
            actionHandler();
        });
    });
});
