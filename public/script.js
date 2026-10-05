document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const downloads = {
    mac: "https://github.com/EchoSpring-max/Nexora/releases/latest/download/Nexora-macOS.zip",
    linux: "https://github.com/EchoSpring-max/Nexora/releases/latest/download/Nexora-Linux.zip",
    windows: "https://github.com/EchoSpring-max/Nexora/releases/latest/download/NexoraInstaller.exe"
};

const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent;
const download = /mac/i.test(platform)
    ? downloads.mac
    : /linux/i.test(platform) && !/android/i.test(navigator.userAgent)
        ? downloads.linux
        : downloads.windows;

document.querySelectorAll('[data-platform-download]').forEach(link => {
    link.href = download;
    link.setAttribute('download', '');
});
