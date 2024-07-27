class ButtonActions {
    static togglePlayPause() {
        return () => {
            const iframe = document.getElementById('videoIframe');
            if (iframe) {
                const iframeSrc = iframe.src;
                if (iframeSrc.includes("autoplay=1")) {
                    iframe.src = iframeSrc.replace("autoplay=1", "autoplay=0");
                } else {
                    iframe.src = iframeSrc.replace("autoplay=0", "autoplay=1");
                }
            }
        };
    }

    static launchWebBrowser() {
        return () => {
            window.open('https://www.google.com', '_blank');
        };
    }
}
