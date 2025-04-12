export function setupDialogues(ui) {
    const dialogues = [
        "Welcome to the game!",
        "This is a simple boomerang throwing game.",
        "Click and drag to throw the boomerang.",
        "Try to hit the target!",
        "Good luck!",
    ];

    let typingInterval = null;

    function toggleSpeakingAnimation(isSpeaking) {
        if (ui.speakingAnimationInterval) {
            clearInterval(ui.speakingAnimationInterval);
            ui.speakingAnimationInterval = null;
        }

        if (isSpeaking) {
            let toggle = false;
            ui.speakingAnimationInterval = setInterval(() => {
                const spriteName = toggle ? "beanclose" : "bean";
                ui.beanSprite.use(sprite(spriteName));
                ui.beanSprite.width = 180;
                ui.beanSprite.height = 180;
                toggle = !toggle;
            }, 200);
        } else {
            ui.beanSprite.use(sprite("bean"));
            ui.beanSprite.width = 180;
            ui.beanSprite.height = 180;
        }
    }

    function typeDialogue(text, target) {
        let index = 0;
        if (typingInterval) {
            clearInterval(typingInterval);
        }
        target.text = "";
        target.color = rgb(0, 0, 0);
        target.pos = ui.dialogueText.pos;

        toggleSpeakingAnimation(true);

        typingInterval = setInterval(() => {
            if (index < text.length) {
                target.text += text[index];
                play("stop", {
                    volume: 0.6,
                    speed: randi(1, 2),
                    detune: randi(10, 20)*100,
                });
                index++;
            } else {
                clearInterval(typingInterval);
                toggleSpeakingAnimation(false);
            }
        }, 50);
    }

    onKeyPress("space", () => {
        if (dialogues.length > 0) {
            const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
            typeDialogue(randomDialogue, ui.dialogueText);
        } else {
            ui.dialogueText.text = "No dialogues available.";
        }
    });
}