
function startGame() {
    const cvs = document.getElementById("snake");
    const ctx = cvs.getContext("2d");

    const box = 20;

    let dead = new Audio();
    let eat = new Audio();
    dead.src = "audio/dead.mp3";
    eat.src = "audio/eat.mp3";

    let snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    }

    let food = {
        x: Math.floor(Math.random() * 24) * box,
        y: Math.floor(Math.random() * 24) * box
    }

    score = 0;

    let d;
    document.addEventListener("keydown", direction);

    function direction(event) {
        if (event.keyCode == 37 && d != "RIGHT") {
            d = "LEFT";
        } else if (event.keyCode == 38 && d != "DOWN") {
            d = "UP";
        } else if (event.keyCode == 39 && d != "LEFT") {
            d = "RIGHT";
        } else if (event.keyCode == 40 && d != "UP") {
            d = "DOWN";
        }
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    color1 = document.getElementById("color1").value;
    color2 = document.getElementById("color2").value;
    // c1="'"+color1+"'";
    // c2="'"+color2+"'";
    // alert(c1);
    function draw() {
        ctx.fillStyle = "green";                      // food
        ctx.fillRect(1, 1, 500, 500);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i%2 == 0) ? color1 : color2;

            //  ctx.fillStyle = color1;
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            // ctx.strokeStyle = "red";                          //เส้นขอบงู
            // ctx.strokeRect(snake[i].x, snake[i].y, box, box);    // 

        }
        ctx.fillStyle = "red";                      // food
        ctx.fillRect(food.x, food.y, box, box);     // food

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;



        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX < 0) snakeX = 24 * box;    //
        if (snakeX > 24 * box) snakeX = 0;    //
        if (snakeY < 0) snakeY = 24 * box;    //
        if (snakeY > 24 * box) snakeY = 0;    //

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            eat.play();
            food = {
                x: Math.floor(Math.random() * 24) * box,
                y: Math.floor(Math.random() * 24) * box
            }
        } else {
            snake.pop();
        }




        let newHead = {
            x: snakeX,
            y: snakeY
        }

        // if(snakeX < 0 || snakeX > 24 * box || snakeY < 0 || snakeY > 24*box || collision(newHead,snake))
        // {
        //     clearInterval(game);
        // }


        if (collision(newHead, snake)) {
            dead.play();
            clearInterval(game);

            // name = document.getElementById("nickname").value;
            // // window.location = "insert.php?name=" + name + "&score=" + score;

            GameOver(score);
            document.getElementById("score").innerHTML = "Score : " + score;

        }

        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "20px Changa one";
        ctx.fillText("Score: " + score, 0.5 * box, 1 * box);
    }

    let game = setInterval(draw, 100);
}
























