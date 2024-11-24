class Player extends GameObject
{
    constructor(pos, sizeScale = 1) {
        super(pos, vec2(.6,.95).scale(sizeScale), 32);

        this.health = this.maxHealth = 100 // 100 HP
        this.eyeColour = new Color(rand(0,255),rand(0,255),rand(0,255),1)
        this.shirtColour = new Color(rand(0,255),rand(0,255),rand(0,255),1)
        this.pantColour = new Color(rand(0,255),rand(0,255),rand(0,255),1)
    }
    
    update()  {

    }
       
    render() {

    }

    damage(damageAmt, perpetrator) {

    }

    kill(perpetrator) {

    }
}