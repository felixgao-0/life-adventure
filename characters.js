
function makeBlood(pos, amt) {
    makeDebris(pos, hsl(0,1,.5), amt, .1, 0);
}


 export class Character extends EngineObject {
    constructor(pos) { 
        super(pos, vec2(.6,.95), tile());
        this.drawSize = vec2(1);
        this.color = hsl(rand(),1,.7);
        this.health = 100;
        this.setCollision(true,false);
        this.dead = true;
    }
        
    update() {
        if (this.isDead)
            return super.update();
    
        const moveInput = this.moveInput.copy();

        const charSpeedLimit = .15;
        this.velocity.x = clamp(this.velocity.x + moveInput.x * .042, -charSpeedLimit, charSpeedLimit);
    
        this.lastPos = this.pos.copy();

        super.update();
    }
           
    render() {
        let bodyPos = this.pos;
        if (!this.isDead) {
            bodyPos = bodyPos.add(vec2(0,.05*Math.sin(this.walkCyclePercent*PI)));
            bodyPos = bodyPos.add(vec2(0,(this.drawSize.y-this.size.y)/2));
        }
        drawTile(bodyPos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);
    }
    
    damage(damage, perpetrator) {
        if (this.isDead || this.getAliveTime() < 1 || this.dodgeTimer.active()) {
            return 0;
        }
    
        makeBlood(perpetrator ? perpetrator.pos : this.pos, 10);
        return super.damage(damage, perpetrator);
    }
    
    kill(perpetrator) {
        if (this.isDead) { // kill a dead person, yes!!!
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

 export class Player extends Character {
    update() {
        // player controls
        this.holdingJump = keyIsDown('ArrowUp') || gamepadIsDown(0);

        this.moveInput = isUsingGamepad ? gamepadStick(0) : 
            vec2(keyIsDown('ArrowRight') - keyIsDown('ArrowLeft'), 
            keyIsDown('ArrowUp') - keyIsDown('ArrowDown'));

        super.update();
    }
}
