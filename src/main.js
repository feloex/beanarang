import { createUI } from "./ui";
import { setupBoomerang } from "./beanarang";
import { setupDialogues } from "./dialogues";
import { setupBeanBlink } from "./beanblink";

import kaplay from "kaplay";
import "kaplay/global";

const app = kaplay({
    background: "6d80fa",
    debug: true,
    debugKey: "ö",
});

setLayers(["drager","game", "ui"], "game");

// Load assets
loadRoot("./");
loadSprite("bean", "sprites/bean.png");
loadSprite("beanclose", "sprites/beanclose.png");
loadSprite("beanblink", "sprites/beanblink.png");
loadSound("hit", "sounds/hit.mp3");
loadSound("stop", "sounds/stop.mp3");

// Initialize UI
const ui = createUI();

// Setup boomerang mechanics
setupBoomerang(ui);

// Setup dialogues
setupDialogues(ui);

// Setup bean blink
setupBeanBlink(ui);