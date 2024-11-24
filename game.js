let gameLevel = 1;

function gameInit()
{
    // called once after the engine starts up
    // setup the game
    player = new Player(vec2(2,2));
}

function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state

    // Keybinds for movement - WASD
    if (player.dead) {
        player.velocity = vec2(0,.1);
    }
}

function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
}

function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects

}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);