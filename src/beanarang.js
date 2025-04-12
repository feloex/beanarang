export function setupBoomerang(ui) {
    const beanHeightMultiplier = 0.60;

    let boomerang = add([
        sprite("bean"),
        pos(width() / 2, height() * beanHeightMultiplier),
        anchor("center"),
        area(),
        { isDragging: false, startPos: null, velocity: null },
    ]);

    let dragIndicator = add([
        rect(1, 4, { radius: 2 }),
        color(255, 255, 255),
        anchor("left"),
        layer("drager"),
        { visible: false },
    ]);

    const uiBox = add([
        rect(width(), 260),
        pos(0, height() - 260),
        area(),
        { isUIBox: true },
    ]);

    const baseSpeed = 2;
    const referenceDiagonal = Math.sqrt(1920 ** 2 + 1080 ** 2);
    const screenDiagonal = Math.sqrt(width() ** 2 + height() ** 2);
    const speedMultiplier = baseSpeed * (screenDiagonal / referenceDiagonal);
    const returnSpeedMultiplier = speedMultiplier;

    boomerang.onUpdate(() => {
        if (boomerang.velocity) {
            boomerang.pos = boomerang.pos.add(boomerang.velocity.scale(dt() * 60 * speedMultiplier));
            boomerang.velocity.x *= Math.pow(0.98, dt() * 60);
            boomerang.velocity.y *= Math.pow(0.98, dt() * 60);

            const returnTarget = vec2(width() / 2, height() * beanHeightMultiplier);
            const returnVector = returnTarget.sub(boomerang.pos);
            const distance = returnVector.len();
            const returnForce = returnVector.unit().scale(Math.min(0.1 * returnSpeedMultiplier, distance * 0.002 * returnSpeedMultiplier) * dt() * 60 * speedMultiplier);
            boomerang.velocity = boomerang.velocity.add(returnForce);

            if (distance < 10) {
                boomerang.velocity = null;
            }
        }
    });

    boomerang.onCollide((obj) => {
        if (obj.isUIBox && boomerang.velocity) {
            const normal = vec2(0, -1);
            const velocityDotNormal = boomerang.velocity.dot(normal);
            const reflection = boomerang.velocity.sub(normal.scale(2 * velocityDotNormal));
            boomerang.velocity = reflection.scale(0.8);
        }
    });

    onMouseDown(() => {
        if (boomerang.isHovering()) {
            boomerang.isDragging = true;
            boomerang.startPos = boomerang.pos.clone();
            dragIndicator.visible = true;
        }
    });

    onMouseMove(() => {
        if (boomerang.isDragging) {
            const dragVector = mousePos().sub(boomerang.startPos);
            const maxLength = 200;
            const clampedVector = dragVector.scale(Math.min(1, maxLength / dragVector.len()));

            dragIndicator.width = clampedVector.len();
            dragIndicator.angle = clampedVector.angle();
            dragIndicator.pos = boomerang.startPos;
        }
    });

    onUpdate(() => {
        if (!isMouseDown() && boomerang.isDragging) {
            boomerang.isDragging = false;
            const dragVector = boomerang.startPos.sub(mousePos());
            const maxThrowSpeed = 35;
            const throwStrength = Math.min(dragVector.len() / 100, 1);
            boomerang.velocity = dragVector.scale(throwStrength * maxThrowSpeed / dragVector.len() * dt() * 60 * speedMultiplier);
            dragIndicator.visible = false;
            dragIndicator.width = 0;
            play("hit", {
                volume: 0.7,
                speed: 3.5,
            });
        }
    });
}