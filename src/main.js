import { createUI } from "./ui";
import { setupBeanEffects } from "./beanEffects";
import { setupBoomerang } from "./beanarang";
import { setupDialogues } from "./dialogues";
import { setupBeanBlink } from "./beanblink";
import { setupBirdSpawner } from "./bird";

import kaplay from "kaplay";
import "kaplay/global";

const app = kaplay({
    background: "6d80fa",
    debug: true,
    debugKey: "ö",
});

setLayers(["drager","game", "ui", "top"], "game");

setGravity(2400);

// Load assets
loadRoot("./");
loadSprite("bean", "sprites/bean.png");
loadSprite("beanclose", "sprites/beanclose.png");
loadSprite("beanblink", "sprites/beanblink.png");
loadSprite("beanblush", "sprites/beanblush.png");
loadSprite("blush", "sprites/blush.png");
loadSprite("beanblinkblush", "sprites/beanblinkblush.png");
loadSprite("cursor", "sprites/cursor.png");
loadSound("hit", "sounds/hit.mp3");
loadSound("stop", "sounds/stop.mp3");

const cursor = add([
    sprite("cursor"),
    pos(),
    layer("ui"),
    layer("top"),
    fakeMouse(),
]);

setCursor("none"); // Hide the real mouse

// Initialize UI
const ui = createUI();

// Setup bean effects (blush and blink)
setupBeanEffects(ui);

// Setup boomerang mechanics
setupBoomerang(ui);

// Setup dialogues
setupDialogues(ui);

// Setup bird/-spawner
