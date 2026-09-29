<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Heart</title>

<style>
* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
}

canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
</head>

<body>

<canvas id="canvas"></canvas>

<script>

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let screenScale;

function resize() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    screenScale = Math.min(width, height) / 750;
}

resize();

window.addEventListener("resize", resize);


// ==============================
// نقاط القلب
// ==============================

const points = [];

for (let scale = 11; scale <= 16; scale += 0.08) {

    for (let i = 0; i < 120; i++) {

        const angle =
            (Math.PI * 2 / 120) * i;

        const x =
            16 *
            Math.pow(Math.sin(angle), 3) *
            scale;

        const y =
            (
                13 * Math.cos(angle)
                - 5 * Math.cos(2 * angle)
                - 2 * Math.cos(3 * angle)
                - Math.cos(4 * angle)
            ) * scale;

        points.push({
            x: x,
            y: -y
        });
    }
}


// ==============================
// سرعة تكوين القلب
// ==============================

let progress = 0;
let lastTime = performance.now();

const HEART_SPEED = 0.045;


// ==============================
// الرسم
// ==============================

function animate(time) {

    const delta =
        Math.min(40, time - lastTime);

    lastTime = time;

    progress += delta * HEART_SPEED;

    if (progress > points.length) {
        progress = points.length;
    }


    // الخلفية

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.16)";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    ctx.save();

    ctx.translate(
        width / 2,
        height / 2
    );

    ctx.scale(
        screenScale,
        screenScale
    );


    // الخط الصغير اللي بيكوّن القلب

    ctx.font =
        "bold 8px Georgia";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    const amount =
        Math.floor(progress);


    for (let i = 0; i < amount; i++) {

        const point =
            points[i];


        // وردي فاتح

        ctx.fillStyle =
            "#ffb6c1";


        // توهج بسيط

        ctx.shadowColor =
            "#ff9eb5";

        ctx.shadowBlur =
            5;


        // الكلمة الصغيرة اللي بتكوّن القلب

        ctx.fillText(
            "I Love You",
            point.x,
            point.y
        );
    }


    ctx.restore();

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

</script>

</body>
</html>
