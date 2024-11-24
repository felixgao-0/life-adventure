function makeBlood(pos, amt) {
    makeDebris(pos, hsl(0,1,.5), amt, .1, 0);
}

class Character extends GameObject {
    constructor(pos) { 
        super(pos, vec2(.6,.95), tile());
        this.drawSize = vec2(1);
        this.color = hsl(rand(),1,.7);
        this.health = 100;
        this.setCollision(true,false);
        this.dead = false;
    }
        
    update() {
        if (this.isDead())
            return super.update();
    
        const moveInput = this.moveInput.copy();

        if (!this.holdingJump)
        this.pressedJumpTimer.unset();
        else if (!this.wasHoldingJump || this.climbingWall) {
                this.pressedJumpTimer.set(.3);
                this.wasHoldingJump = this.holdingJump;
        }

        const charSpeedLimit = .15;
        this.velocity.x = clamp(this.velocity.x + moveInput.x * .042, -charSpeedLimit, charSpeedLimit);
    
        this.lastPos = this.pos.copy();

        super.update();
    }
           
    render() {
        const animationFrame = this.isDead() ? 0 :
            this.climbingLadder || this.groundTimer.active() ?
            2*this.walkCyclePercent|0 : 1;
        this.tileInfo = spriteAtlas.player.frame(animationFrame);

        let bodyPos = this.pos;
        if (!this.isDead()) {
            bodyPos = bodyPos.add(vec2(0,.05*Math.sin(this.walkCyclePercent*PI)));
            bodyPos = bodyPos.add(vec2(0,(this.drawSize.y-this.size.y)/2));
        }
        drawTile(bodyPos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);
    }
    
    damage(damage, perpetrator) {
        if (this.isDead() || this.getAliveTime() < 1 || this.dodgeTimer.active()) {
            return 0;
        }
    
        makeBlood(perpetrator ? perpetrator.pos : this.pos, 10);
        return super.damage(damage, perpetrator);
    }
    
    kill(perpetrator) {
        if (this.isDead()) { // kill a dead place, yes!!!
            return;
        }
    
        makeBlood(this.pos, 100);
        soundSFX.die.play(this.pos);
    
        this.health = 0;
        this.dead = true;
        this.size = this.size.scale(.5);
        const fallDirection = perpetrator ? sign(perpetrator.velocity.x) : randSign();
        this.angleVelocity = fallDirection*rand(.22,.14);
        this.angleDamping = .9;
        this.renderOrder = -1;
    }
}

class Player extends Character {
    update() {
        // player controls
        this.holdingJump = keyIsDown('ArrowUp') || gamepadIsDown(0);

        this.moveInput = isUsingGamepad ? gamepadStick(0) : 
            vec2(keyIsDown('ArrowRight') - keyIsDown('ArrowLeft'), 
            keyIsDown('ArrowUp') - keyIsDown('ArrowDown'));

        super.update();
    }
}