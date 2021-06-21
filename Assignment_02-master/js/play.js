var config = {
    apiKey: "AIzaSyCsowejb39H-b9cf3tOtOOSV_PC9aWqzKU",
    authDomain: "assignment02-71adf.firebaseapp.com",
    databaseURL: "https://assignment02-71adf.firebaseio.com",
    projectId: "assignment02-71adf",
    storageBucket: "assignment02-71adf.appspot.com",
    messagingSenderId: "498135780166"
};
firebase.initializeApp(config);

var player;
var keyboard;

var platforms = [];

var leftWall;
var rightWall;
var ceiling;

var text1;
var text2;
var text3;
var text4;

var distance = 0;
var status = 'running';

function preload() {

    game.load.baseURL = 'https://wacamoto.github.io/NS-Shaft-Tutorial/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.spritesheet('player', 'player.png', 32, 32);
    game.load.image('wall', 'wall.png');
    game.load.image('ceiling', 'ceiling.png');
    game.load.image('normal', 'normal.png');
    game.load.image('nails', 'nails.png');
    game.load.spritesheet('conveyorRight', 'conveyor_right.png', 96, 16);
    game.load.spritesheet('conveyorLeft', 'conveyor_left.png', 96, 16);
    game.load.spritesheet('trampoline', 'trampoline.png', 96, 22);
    game.load.spritesheet('fake', 'fake.png', 96, 36);
}

function create() {

    keyboard = game.input.keyboard.addKeys({
        'enter': Phaser.Keyboard.ENTER,
        'up': Phaser.Keyboard.UP,
        'down': Phaser.Keyboard.DOWN,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT,
        'w': Phaser.Keyboard.W,
        'a': Phaser.Keyboard.A,
        's': Phaser.Keyboard.S,
        'd': Phaser.Keyboard.D
    });

    createBounders();
    createPlayer();
    createTextsBoard();
}

function update() {

    // bad
    if (status == 'gameOver' && keyboard.enter.isDown) restart();
    if (status == 'gameover' && keyboard.up.isDown) window.location.href = "index.html";
    if (status != 'running') return;

    this.physics.arcade.collide(player, platforms, effect);
    this.physics.arcade.collide(player, [leftWall, rightWall]);
    checkTouchCeiling(player);
    checkGameOver();

    updatePlayer();
    updatePlatforms();
    updateTextsBoard();

    createPlatforms();
}

function createBounders() {
    leftWall = game.add.sprite(0, 0, 'wall');
    game.physics.arcade.enable(leftWall);
    leftWall.body.immovable = true;

    rightWall = game.add.sprite(383, 0, 'wall');
    game.physics.arcade.enable(rightWall);
    rightWall.body.immovable = true;

    ceiling = game.add.image(0, 0, 'ceiling');
}

var lastTime = 0;
function createPlatforms() {
    if (game.time.now > lastTime + 700) {
        lastTime = game.time.now;
        createOnePlatform();
        distance += 1;
    }
}

function createOnePlatform() {

    var platform;
    var x = Math.random() * (400 - 96 - 40) + 20;
    var y = 380;
    var rand = Math.random() * 100;

    if (rand < 20) {
        platform = game.add.sprite(x, y, 'normal');
    } else if (rand < 40) {
        platform = game.add.sprite(x, y, 'nails');
        game.physics.arcade.enable(platform);
        platform.body.setSize(96, 15, 0, 15);
    } else if (rand < 50) {
        platform = game.add.sprite(x, y, 'conveyorLeft');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 60) {
        platform = game.add.sprite(x, y, 'conveyorRight');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 80) {
        platform = game.add.sprite(x, y, 'trampoline');
        platform.animations.add('jump', [4, 5, 4, 3, 2, 1, 0, 1, 2, 3], 120);
        platform.frame = 3;
    } else {
        platform = game.add.sprite(x, y, 'fake');
        platform.animations.add('turn', [0, 1, 2, 3, 4, 5, 0], 14);
    }

    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platforms.push(platform);

    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
}

function createPlayer() {
    player = game.add.sprite(200, 50, 'player');
    player.direction = 10;
    game.physics.arcade.enable(player);
    player.body.gravity.y = 600;
    player.animations.add('left', [0, 1, 2, 3], 8);
    player.animations.add('right', [9, 10, 11, 12], 8);
    player.animations.add('flyleft', [18, 19, 20, 21], 12);
    player.animations.add('flyright', [27, 28, 29, 30], 12);
    player.animations.add('fly', [36, 37, 38, 39], 12);
    player.life = 15;
    player.unbeatableTime = 0;
    player.touchOn = undefined;
}

function createTextsBoard() {
    var max = localStorage.getItem('max');
    var style = { fill: '#ff0000', fontSize: '20px' }
    var score = localStorage.getItem('score');
    text1 = game.add.text(30, 20, '', style);
    text2 = game.add.text(340, 20, '', style);
    text3 = game.add.text(100, 200, 'Press Enter To Restart', style);
    text4 = game.add.text(100, 150, 'Record:' + max, style);
    text3.visible = false;
    text4.visible = false;
}

function updatePlayer() {
    if (keyboard.left.isDown) {
        player.body.velocity.x = -250;
    } else if (keyboard.right.isDown) {
        player.body.velocity.x = 250;
    } else if (keyboard.down.isDown) {
        player.body.velocity.y = 200;
    } else {
        player.body.velocity.x = 0;
    }
    setPlayerAnimate(player);
}

function setPlayerAnimate(player) {
    var x = player.body.velocity.x;
    var y = player.body.velocity.y;

    if (x < 0 && y > 0) {
        player.animations.play('flyleft');
    }
    if (x > 0 && y > 0) {
        player.animations.play('flyright');
    }
    if (x < 0 && y == 0) {
        player.animations.play('left');
    }
    if (x > 0 && y == 0) {
        player.animations.play('right');
    }
    if (x == 0 && y != 0) {
        player.animations.play('fly');
    }
    if (x == 0 && y == 0) {
        player.frame = 8;
    }
}

function updatePlatforms() {
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        platform.body.position.y -= 2;
        if (platform.body.position.y <= -20) {
            platform.destroy();
            platforms.splice(i, 1);
        }
    }
}

function updateTextsBoard() {
    text1.setText('life:' + player.life);
    text2.setText('B' + distance);
}

function effect(player, platform) {
    if (platform.key == 'conveyorRight') {
        conveyorRightEffect(player, platform);
    }
    if (platform.key == 'conveyorLeft') {
        conveyorLeftEffect(player, platform);
    }
    if (platform.key == 'trampoline') {
        trampolineEffect(player, platform);
    }
    if (platform.key == 'nails') {
        nailsEffect(player, platform);
    }
    if (platform.key == 'normal') {
        basicEffect(player, platform);
    }
    if (platform.key == 'fake') {
        fakeEffect(player, platform);
    }
}

function conveyorRightEffect(player, platform) {
    player.body.x += 2;
}

function conveyorLeftEffect(player, platform) {
    player.body.x -= 2;
}

function trampolineEffect(player, platform) {
    if (player.life < 15) {
        player.life += 1;
    }
    platform.animations.play('jump');
    player.body.velocity.y = -300;
}

function nailsEffect(player, platform) {
    if (player.touchOn !== platform) {
        player.life -= 3;
        player.touchOn = platform;
        game.camera.flash(0xff0000, 100);
    }
}

function basicEffect(player, platform) {
    if (player.touchOn !== platform) {
        if (player.life < 15) {
            player.life += 1;
        }
        player.touchOn = platform;
    }
}

function fakeEffect(player, platform) {
    if (player.touchOn !== platform) {
        if (player.life < 15) {
            player.life += 1;
        }
        platform.animations.play('turn');
        setTimeout(function () {
            platform.body.checkCollision.up = false;
        }, 100);
        player.touchOn = platform;
    }
}

function checkTouchCeiling(player) {
    if (player.body.y < 0) {
        if (player.body.velocity.y < 0) {
            player.body.velocity.y = 0;
        }
        if (game.time.now > player.unbeatableTime) {
            player.life -= 5;
            game.camera.flash(0xff0000, 100);
            player.unbeatableTime = game.time.now + 2000;
        }
    }
}

function checkGameOver() {
    if (player.life <= 0 || player.body.y > 500) {
        gameOver();
    }
}

function gameOver() {
    var score = 'B' + distance;
    localStorage.setItem('score', score);
    text4.visible = true;
    text3.visible = true;
    platforms.forEach(function (s) { s.destroy() });
    platforms = [];
    write();
    status = 'gameOver';
}

function restart() {
    text4.visible = false;
    text3.visible = false;
    distance = 0;
    createPlayer();
    status = 'running';
}

function getReady() {
    text4.visible = false;
    distance = 0;
    createPlayer();
    status = 'ready';
}

function write() {
    var $show = $('#show');
    var score = 'B' + distance;
    var database = firebase.database().ref('/user/');
    var name = localStorage.getItem('name');

    var postData = {
        name: name,
        score: distance
    };
    console.log(postData);
    database.push(postData);

    database.once('value', function (snapshot) {
        $show.html('');
        var test = { name: [], data: [] };
        for (var i in snapshot.val()) {
            $show.append(snapshot.val()[i].name + snapshot.val()[i].score)
            //console.log(name);
            //console.log(score);
            //var test = { name: [snapshot.val()[i].name], data: [snapshot.val()[i].score] };
            var newName = snapshot.val()[i].name;
            var newData = snapshot.val()[i].score;
            test.name.push(newName);
            test.data.push(newData);
            //console.log(test.data);
            //test.data.sort();
            /*test.data.sort(function (a, b) {
                return a - b
            });*/
            //var test = {sss:[snapshot.val()[i].score]};
            //test.sort();
            //console.log(test);
            //console.log(snapshot.val()[i].name);
            //console.log(snapshot.val()[i].score);
            //console.log(scoresRef);
        }
        var max = Math.max.apply(null, test.data);
        console.log(max);
        localStorage.setItem('max', max);
        //console.log(first);
        //console.log(second);
        //console.log(test[1]);
    })
}

/*var scoresRef = firebase.database().ref('/score/');
scoresRef.orderByValue().limitToLast(5).on("value", function (snapshot) {
    snapshot.forEach(function (data) {
        console.log(data.val());
    });
});*/


var game = new Phaser.Game(400, 400, Phaser.AUTO, 'canvas',
    { preload: preload, create: create, update: update });