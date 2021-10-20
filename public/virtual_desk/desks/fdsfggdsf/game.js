<script>
var align = {
    left: "left",
    right: "right",
    top: "top",
    bottom: "bottom"
}
var game = {
    width: 640,
    height: 360,
    level: new Object(),
    canvas: document.createElement("canvas"),
    create: function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        window.addEventListener("keydown", function(e) {
            e.preventDefault();
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener("keyup", function(e) {
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    load: function(a) {
        var level = a(); level.create();
        this.interval = setInterval(level.update, 1000 / 40);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
};
function item(x, y) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.color = "white";
    this.jumping = false;
    this.grounded = false;
    this.velocity = { x: 0, y: 0 };
    this.friction = 0.8;
    this.gravity = 0.98;
    this.strength = 7;
    this.speed = 5;
    this.render = function() {
        context = game.context;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    this.movement = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x *= this.friction;
        this.velocity.y += this.gravity;
    };
    this.ground = function() {
        var bottom = game.height - this.height;
        if (this.y > bottom) this.y = bottom;
    };
    this.collided = function(a) {
        var left = (this.x + this.width / 2) - (a.x + a.width / 2);
        var top = (this.y + this.height / 2) - (a.y + a.height / 2);
        var right = this.width / 2 + a.width / 2;
        var bottom = this.height / 2 + a.height / 2;
        var direction = null;
        if (Math.abs(left) < right && Math.abs(top) < bottom) {
            var dx = right - Math.abs(left), dy = bottom - Math.abs(top);
            if (dx < dy) {
                if  (left > 0) { direction = align.left; this.x += dx; } else { direction = align.right; this.x -= dx; }
            } else {
                if  (top > 0) { direction = align.top; this.y += dy; } else { direction = align.bottom; this.y -= dy; }
            }
        }
        return direction;
    };
}
game.setup = function() {
    game.create(game.width, game.height);
    game.load(game.level["main"]);
};
game.level["main"] = function() {
    var background, player, platforms = new Array();
    var level = new Object();
    level.create = function() {
        background = new item(0, 0);
        background.color = "black";
        background.width = game.width;
        background.height = game.height;
        player = new item(80, 40);
        player.width = 40;
        player.height = 40;
        platforms.push({ x: game.width - 160, y: 40, width: 120, height: 10 });
        platforms.push({ x: game.width - 160, y: game.height - 50, width: 120, height: 10 });
        platforms.push({ x: game.width - 380, y: game.height - 120, width: 120, height: 10 });
        platforms.push({ x: game.width - 380, y: game.height - 240, width: 120, height: 10 });
        platforms.push({ x: game.width - 590, y: game.height - 180, width: 120, height: 10 });
        platforms.push({ x: 0, y: game.height - 10, width: game.width, height: 10 });
    };
    level.update = function() {
        // render
        game.clear();
        background.render();
        player.render();
        game.context.fillStyle = "white";
        for (i = 0; i < platforms.length; i++)
            game.context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
        // controls
        if (game.keys && game.keys[39]) if (player.velocity.x < player.speed) player.velocity.x += 2;
        if (game.keys && game.keys[37]) if (player.velocity.x > -player.speed) player.velocity.x -= 2;
        if (game.keys && game.keys[38]) {
            if (!player.jumping) { player.velocity.y = -player.strength * 2; player.jumping = true; }
        }
        // physics
        player.movement();
        player.grounded = false;
        for (i = 0; i < platforms.length; i++) {
            var direction = player.collided(platforms[i]);
            if (direction == align.left || direction == align.right) {
                player.velocity.x = 0;
            } else if (direction == align.bottom) {
                player.jumping = false;
                player.grounded = true;
            } else if (direction == align.top) {
                player.velocity.y *= -1;
            }
        }
        if (player.grounded) player.velocity.y = 0;
    };
    return level;
};
</script>
</head>
<div onload="game.setup()">
</div>