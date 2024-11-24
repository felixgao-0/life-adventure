const { cameraPos } = require("littlejsengine");

let gameLevel = 1;
let score = 0;

function gameInit()
{
    // called once after the engine starts up
    // setup the game
    player = new Player(vec2(2,2));
    score = 0;
    gameLevel = 1;
}

function gameUpdate() {
    // called every frame at 60 frames per second
    // handle input and update the game state

    if (player.dead) { // revive player
        player.velocity = vec2(0,.1);
        player.dead = false;
    }
}

function gameUpdatePost()
{
    function getCameraTarget() {
        // camera is above player
        const offset = 200/cameraScale*percent(mainCanvasSize.y, 300, 600);
        return player.pos.add(vec2(0, offset));
    }
    cameraPos = cameraPos.lerp(getCameraTarget(), clamp(player.getAliveTime()/2))
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