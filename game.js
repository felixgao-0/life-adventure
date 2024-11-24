function gameInit()
{
    // called once after the engine starts up
    // setup the game

    gameLevel = 1;
}

function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state

    // Keybinds for movement - WASD
    if (keyWasPressed("W")) { // W
        console.log("W")
    } else if (keyWasPressed("A")) { // A
        console.log("A")
    } else if (keyWasPressed("S")) { // S
        console.log("S")
    } else if (keyWasPressed("D")) { // D
        console.log("D")
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