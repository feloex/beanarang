export function createUI() {
    const barHeight = 260;

    // Add UI background bar
    add([
        rect(width(), barHeight),
        pos(0, height() - barHeight),
        color(163, 40, 88),
        outline(10, color(255, 255, 255)),
        layer("ui"),
    ]);

    // Add bean sprite box
    const beanBoxSize = 220;
    add([
        rect(beanBoxSize, beanBoxSize, { radius: 5 }),
        pos(width() - beanBoxSize - 20, height() - barHeight + 20),
        color("751756"),
        layer("ui"),
    ]);

    const beanSprite = add([
        sprite("bean", { width: beanBoxSize - 40, height: beanBoxSize - 40 }),
        pos(width() - beanBoxSize - 20 + beanBoxSize / 2 - (beanBoxSize - 40) / 2, height() - barHeight + 20 + beanBoxSize / 2 - (beanBoxSize - 40) / 2),
        layer("ui"),
        area({ shape: new Circle(vec2(beanBoxSize / 2-20, beanBoxSize / 2-20), (beanBoxSize - 40) / 2) }),
    ]);

    // Add dialogue textbox
    const textbox = add([
        rect(beanBoxSize * 2, beanBoxSize, { radius: 5 }),
        pos(width() - beanBoxSize * 3.1 - 20, height() - barHeight + 20),
        color("ffffff"),
        layer("ui"),
    ]);

    const dialogueText = add([
        text("", {
            size: 32,
            width: beanBoxSize * 2 - 20,
            align: "center",
            wrap: true,
        }),
        pos(textbox.pos.add(vec2(10, 10))),
        layer("ui"),
    ]);

    return {dialogueText, beanSprite};
}