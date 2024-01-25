var fondo;
var carro;
var cursores;
var enemigos;
var enemigo1;
var timer;

//Nuevas variables
var balas;
var botonDisparo;
var tiempoBala=0;
var nuevo;

//Puntuacion
var score = 0;
var scoreText;

var nombre;

var gasolinas;
var timerGasolina;

var Juego = {

    preload: function(){
        juego.load.image('bg','img/bg.png');
        
        juego.load.image('carro','img/carro.png');
        juego.load.image('carroMalo','img/carroMalo.png');
        juego.load.image('gasolina','img/gas.png');
        juego.load.image('laser','img/laser.png');
        juego.load.audio('sonidolaser','sonido/laser.ogg');

        //Espacio

        juego.load.image('fondoEspacio','img/fondoEspacio.png');
        juego.load.image('nave','img/Nave.png');
        juego.load.image('pruebaEnemigo','img/pruebaEnemigo.png');
        juego.load.image('enemigoEspacio','img/enemigoEspacio.png');
        juego.forceSingleUpdate = true;
    },

    create: function(){
            fondo = juego.add.tileSprite(0,0,290,540,'fondoEspacio');

            carro = juego.add.sprite(juego.width/2, 496, 'nave');
            
            carro.anchor.setTo(0.5);

            //Puntuacion
            scoreText = juego.add.text(10,10,"Score: "+score)

            //Sonido laser
            this.sonidolaser= this.sound.add('sonidolaser');

            //Boton de disparo
            botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            enemigos = juego.add.group();
            juego.physics.arcade.enable(enemigos,true);
            enemigos.enableBody = true;
            enemigos.createMultiple(20, 'pruebaEnemigo');
            enemigos.setAll('anchor.x',0.5);
            enemigos.setAll('anchor.y',0.5);
            enemigos.setAll('outOfBoundsKill', true);
            enemigos.setAll('checkWorldBounds',true);


            enemigos1 = juego.add.group();
            juego.physics.arcade.enable(enemigos1,true);
            enemigos1.enableBody = true;
            enemigos1.createMultiple(20, 'enemigoEspacio');
            enemigos1.setAll('anchor.x',0.5);
            enemigos1.setAll('anchor.y',0.5);
            enemigos1.setAll('outOfBoundsKill', true);
            enemigos1.setAll('checkWorldBounds',true);

            /*gasolinas = juego.add.group();
            juego.physics.arcade.enable(gasolinas,true);
            gasolinas.enableBody = true;
            gasolinas.createMultiple(20,'gasolina');
            gasolinas.setAll('anchor.x',0.5);
            gasolinas.setAll('anchor.y',0.5);
            gasolinas.setAll('outOfBoundsKill', true);
            gasolinas.setAll('checkWorldBounds',true);*/

            //Bala

            balas = juego.add.group();
            balas.enableBody = true;
            balas.physicsBodyType = Phaser.Physics.ARCADE;
            balas.createMultiple(20,'laser');
            balas.setAll('anchor.x',0.5);
            balas.setAll('anchor.y',0.5);
            balas.setAll('outOfBoundsKill',true);
            balas.setAll('checkWorldBounds',true);           


        timer = juego.time.events.loop(1500, this.crearCarroMalo, this);

        //timerGasolina = juego.time.events.loop(2000,this.crearGasolina,this);

        cursores= juego.input.keyboard.createCursorKeys();


    },

    update: function(){

        fondo.tilePosition.y +=3;
        
        if(cursores.right.isDown && carro.position.x<245)
        {
            carro.position.x +=5;            
            carro.animations.play('nave')
        }
        else if(cursores.left.isDown && carro.position.x>45)
        {
            carro.position.x -=5;            
            carro.animations.play('nave')
        }

        var bala;
        if(botonDisparo.isDown){
            if(juego.time.now > tiempoBala){
				bala = balas.getFirstExists(false);
                
			}
            if(bala){
				bala.reset(carro.x , carro.y);
				bala.body.velocity.y =-300;
				tiempoBala=juego.time.now+100
                
				
			}
            this.sonidolaser.play();
        }

        var score;
        if(enemigos.kill){            
            score +=100;
        }
        juego.physics.arcade.overlap(balas,enemigos,colision,null,this);
        
    },   

    crearCarroMalo: function(){
        var posicion = Math.floor(Math.random()*3)+1;
        var enemigo = enemigos.getFirstDead();
        enemigo.physicsBodyType = Phaser.Physics.ARCADE;
        enemigo.reset(posicion*73,0);
        enemigo.body.velocity.y = 200;
        enemigo.anchor.setTo(0.5);
            
    },

    /*crearGasolina: function(){
        var posicion = Math.floor(Math.random()*3)+1;
        var gasolina = gasolinas.getFirstDead();
        gasolina.physicsBodyType = Phaser.Physics.ARCADE;
        gasolina.reset(posicion*73,0);
        gasolina.body.velocity.y = 200;
        gasolina.anchor.setTo(0.5);
}*/
}

function colision(bala, enemigo){
	bala.kill();
	enemigo.kill();
    score += 10;
    scoreText.setText("Puntos: " + score);
    nombre.setText("Marco Padilla")
}

