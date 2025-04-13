export function setupBeanAnimations(ui) {
    function blink() {
        ui.beanSprite.use(sprite("beanblink"));
        ui.beanSprite.width = 180;
        ui.beanSprite.height = 180;

        setTimeout(() => {
            ui.beanSprite.use(sprite("bean"));
            ui.beanSprite.width = 180;
            ui.beanSprite.height = 180;

            // Next blink time randomly between 10 and 20 seconds
            const nextBlink = Math.random() * (20000 - 10000) + 10000;
            setTimeout(blink, nextBlink);
        }, 200); // Blink duration
    }

    blink(); // Start the first blink

    const blushSprite = add([
        sprite("beanblush", { width: 180, height: 180 }),
        pos(ui.beanSprite.pos),
        layer("ui"),
        opacity(0), // Initially hidden
    ]);

    ui.beanSprite.onHover(() => {
        blushSprite.opacity = 1; // Show blush sprite
    });
    ui.beanSprite.onHoverEnd(() => {
        blushSprite.opacity = 0; // Hide blush sprite
    });
}