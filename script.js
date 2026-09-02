document.addEventListener("DOMContentLoaded", function () {
    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");
    const buttonContainer = document.getElementById("button-container");

    const phrases = [
        "Tem certeza?",
        "Certeza mesmo?",
        "Pensa com carinho...",
        "Por favorzinho... 🥺",
        "Nem pensar?",
        "Olha lá hein...",
        "Não faz isso...",
        "Vou chorar :(",
        "Tem certeza absoluta?",
        "Última chance!",
        "Prometo te fazer feliz!",
        "Clica no Sim, vai! 😊"
    ];

    let phraseIndex = 0;

    function moveNoButton() {
        noButton.style.position = "absolute";

        const containerWidth = buttonContainer.clientWidth;
        const containerHeight = buttonContainer.clientHeight;

        const noWidth = noButton.offsetWidth;
        const noHeight = noButton.offsetHeight;

        const yesLeft = yesButton.offsetLeft;
        const yesTop = yesButton.offsetTop;
        const yesWidth = yesButton.offsetWidth;
        const yesHeight = yesButton.offsetHeight;

        const buffer = 12; // Minimal spacing between buttons
        const pad = 6;    // Padding from container edges

        // 4 Safe Zones around the "Sim" button where overlap is impossible
        const zones = [];

        // 1. Zone to the LEFT of "Sim"
        const maxLeftX = yesLeft - noWidth - buffer;
        if (maxLeftX >= pad) {
            zones.push({
                minX: pad,
                maxX: maxLeftX,
                minY: pad,
                maxY: Math.max(pad, containerHeight - noHeight - pad)
            });
        }

        // 2. Zone to the RIGHT of "Sim"
        const minRightX = yesLeft + yesWidth + buffer;
        const maxRightX = containerWidth - noWidth - pad;
        if (maxRightX >= minRightX) {
            zones.push({
                minX: minRightX,
                maxX: maxRightX,
                minY: pad,
                maxY: Math.max(pad, containerHeight - noHeight - pad)
            });
        }

        // 3. Zone ABOVE "Sim"
        const maxAboveY = yesTop - noHeight - buffer;
        if (maxAboveY >= pad) {
            zones.push({
                minX: pad,
                maxX: Math.max(pad, containerWidth - noWidth - pad),
                minY: pad,
                maxY: maxAboveY
            });
        }

        // 4. Zone BELOW "Sim"
        const minBelowY = yesTop + yesHeight + buffer;
        const maxBelowY = containerHeight - noHeight - pad;
        if (maxBelowY >= minBelowY) {
            zones.push({
                minX: pad,
                maxX: Math.max(pad, containerWidth - noWidth - pad),
                minY: minBelowY,
                maxY: maxBelowY
            });
        }

        let x, y;
        if (zones.length > 0) {
            const zone = zones[Math.floor(Math.random() * zones.length)];
            x = Math.floor(zone.minX + Math.random() * (zone.maxX - zone.minX + 1));
            y = Math.floor(zone.minY + Math.random() * (zone.maxY - zone.minY + 1));
        } else {
            // Safe fallback to the opposite side of Yes
            x = yesLeft > containerWidth / 2 ? pad : Math.max(pad, containerWidth - noWidth - pad);
            y = yesTop > containerHeight / 2 ? pad : Math.max(pad, containerHeight - noHeight - pad);
        }

        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }

    function handleNoInteraction(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Change text to the next phrase
        noButton.innerText = phrases[phraseIndex % phrases.length];
        phraseIndex++;

        // Move the No button without moving or scaling the Yes button
        moveNoButton();
    }

    // Dodging on mouseover, click, and mobile touch
    noButton.addEventListener("mouseover", handleNoInteraction);
    noButton.addEventListener("click", handleNoInteraction);
    noButton.addEventListener("touchstart", handleNoInteraction, { passive: false });

    yesButton.addEventListener("click", function () {
        window.location.href = "date.html";
    });
});
