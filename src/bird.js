export function setupBirdSpawner() {
    function spawnBird() {
        // Add tree object
        const recta = add([
            rect(48, rand(32, 96)),
            area(),
            body(),
            pos(width(), height() / 2),
            move(LEFT, 300),
            "tree",
        ]);

        // Make the box jump at random intervals
        function randomJump() {
            if (recta.exists()) {
                recta.jump(rand(900, 1200));
                wait(rand(0.2, 1.3), randomJump); // Random delay before the next jump
            }
        }

        randomJump();

        // Wait a random amount of time to spawn the next tree
        wait(rand(0.5, 1.5), spawnBird);
    }

    spawnBird();
}