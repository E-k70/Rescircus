import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Background: new ImageSource('images/background.PNG'),
    Bubble: new ImageSource('images/bubble.png'),
    RabbitSheet: new ImageSource('images/rabbitspritesheet-spritesheet.png'),
    EnemySheet: new ImageSource('images/Enemysprite.png'),
    DeadSheet: new ImageSource('images/Dead.png'),
    Bullet: new ImageSource('images/bullet.png'),
    EnemySheet2: new ImageSource('images/enemy2.png'),
    DeadSheet2: new ImageSource('images/deadenemy2.png')
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }





