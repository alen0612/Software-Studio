$(document).ready(function () {
    texts[0] = '';
    texts[1] = '';

    context = document.getElementById('canvas').getContext("2d");
    $('#canvas').mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        currentStep += 1;
        if (isTyping) {
            currentTextNum += 1;
            texts[currentTextNum] = '';
            textX[currentTextNum] = mouseX;
            textY[currentTextNum] = mouseY;
            steps[currentStep] = 'text';
        } else {
            currentStrokeNum += 1;
            isPainting = true;
            steps[currentStep] = 'paint';
            strokesX[currentStrokeNum] = new Array();
            strokesY[currentStrokeNum] = new Array();
            strokesDrag[currentStrokeNum] = new Array();
            strokesSize[currentStrokeNum] = new Array();

            addClick(mouseX, mouseY);
            draw();
        }
    });

    $('#canvas').mousemove(function (e) {
        if (isPainting && !isTyping) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            draw();
        }
    });

    $('#canvas').mouseup(function (e) {
        isPainting = false;
        strokesColor[currentStrokeNum] = brushColor;
        strokesSize[currentStrokeNum] = brushSize;
        strokesSize[currentStrokeNum] = textSize;
    });

    $('#canvas').mouseleave(function (e) {
        isPainting = false;
    });

    $("#colorPicker").on("change paste keyup", function () {
        brushColor = '#' + $(this).val();
    });

    $("#sizePicker").on("change paste keyup", function () {
        brushSize = $(this).val();
        textSize = $(this).val();
    });

    $("#circle").click(function () {
        $("#canvas").removeClass();
        //$('canvas').css('cursor', 'url(pen.png), auto');
        isTyping = false;
        brushType = 'round';
        brushShape = 'round';
        $("#canvas").addClass("crosshair");
    });

    $("#square").click(function () {
        $("#canvas").removeClass();
        //$('canvas').css('cursor', 'url("pen.png"), auto');
        isTyping = false;
        brushType = 'bevel';
        brushShape = 'square';
        $("#canvas").addClass("crosshair");
    });

    $("#eraser").click(function () {
        $("#canvas").removeClass();
        brushColor = '#ffffff';
        //$('canvas').css('cursor', 'url("eraser.png"), auto');
        isTyping = false;
        $("#canvas").addClass("no-drop");
    });

    $("#refresh").click(function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        currentStrokeNum = 0;
    });

    $("#undo").click(function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        console.log(steps[currentStep]);
        if (steps[currentStep] == 'text') {
            currentTextNum = Math.max(1, currentTextNum - 1);
        } else {
            currentStrokeNum = Math.max(0, currentStrokeNum - 1);
        }
        currentStep = Math.max(1, currentStep - 1);
        redraw();
    });

    $("#redo").click(function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        console.log(steps[currentStep]);
        if (steps[currentStep] == 'text') {
            var size = Object.keys(texts).length;
            currentTextNum = Math.min(size, currentTextNum + 1);
        } else {
            var size = Object.keys(strokesX).length;
            currentStrokeNum = Math.min(size, currentStrokeNum + 1);
        }
        var size = Object.keys(steps).length;
        currentStep = Math.min(size, currentStep + 1);
        redraw();
    });

    $("#text").click(function () {
        $("#canvas").removeClass();
        currentTextNum += 1;
        texts[currentTextNum] = '';
        isTyping = true;
        //$('canvas').css('cursor', 'url(text.png), auto');
        $("#canvas").addClass("text");
        textSize = $(this).val();
    });

    $(document).keypress(function (e) {
        if (isTyping) {
            var ch = String.fromCharCode(e.charCode);
            texts[currentTextNum] += ch;
            redraw();
        }
    })

    $("#save").click(function () {
        save();
    });

    $('#fontSelect').fontSelector({
        'hide_fallbacks': true,
        'initial': 'Courier New,Courier New,Courier,monospace',
        'selected': function (style) {
            currentTextNum += 1;
            fonts[currentTextNum] = style;
        },
        'opened': function (style) { },
        'closed': function (style) { },
        'fonts': [
            'Arial,Arial,Helvetica,sans-serif',
            'Arial Black,Arial Black,Gadget,sans-serif',
            'Comic Sans MS,Comic Sans MS,cursive',
            'Courier New,Courier New,Courier,monospace',
            'Georgia,Georgia,serif',
            'Impact,Charcoal,sans-serif',
            'Lucida Console,Monaco,monospace',
            'Lucida Sans Unicode,Lucida Grande,sans-serif',
            'Palatino Linotype,Book Antiqua,Palatino,serif',
            'Tahoma,Geneva,sans-serif',
            'Times New Roman,Times,serif',
            'Trebuchet MS,Helvetica,sans-serif',
            'Verdana,Geneva,sans-serif',
            'Gill Sans,Geneva,sans-serif'
        ]
    });
});

var context;
var currentStrokeNum = 0;
var strokesX = {};
var strokesY = {};
var strokesDrag = {};
var strokesColor = {};
var strokesSize = {};
var brushType = {};
var brushShape = {};

var currentTextNum = 0;
var texts = {};
var fonts = {};
var textX = {};
var textY = {};

var currentStep = 0;
var steps = new Array();

var brushColor = '#000000';
var brushSize = 5;
var textSize = 5;
var isPainting;
var isTyping = false;

function addClick(x, y, dragging) {
    strokesX[currentStrokeNum].push(x);
    strokesY[currentStrokeNum].push(y);
    strokesDrag[currentStrokeNum].push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.lineJoin = brushType;
    context.lineCap = brushShape;

    for (var i = 1; i <= currentTextNum; i++) {
        context.font = "16px " + fonts[i];
        context.fillText(texts[i], textX[i], textY[i]);
    }
    for (var i = 1; i <= currentStrokeNum; i++) {
        context.lineWidth = strokesSize[i];
        context.strokeStyle = strokesColor[i];
        var clickX = strokesX[i];
        var clickY = strokesY[i];
        var clickDrag = strokesDrag[i];
        context.beginPath();
        if (clickX === undefined) { continue; }
        for (var j = 0; j < clickX.length; j++) {
            if (clickDrag[j] && j) {
                context.moveTo(clickX[j - 1], clickY[j - 1]);
            } else {
                context.moveTo(clickX[j] - 1, clickY[j]);
            }
            context.lineTo(clickX[j], clickY[j]);
            context.closePath();
            context.stroke();
        }
    }
}

function draw() {
    context.lineJoin = brushType;
    context.lineCap = brushShape;
    if (isTyping) {
        context.font = "16px " + fonts[currentTextNum];
        context.fillText(texts[currentTextNum], textX[currentTextNum], textY[currentTextNum]);
        context.lineWidth = textSize;
    } else {
        context.lineWidth = brushSize;
        context.strokeStyle = brushColor;
        var clickX = strokesX[currentStrokeNum];
        var clickY = strokesY[currentStrokeNum];
        var clickDrag = strokesDrag[currentStrokeNum];
        context.beginPath();
        for (var i = 0; i < clickX.length; i++) {
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }
}

function save() {
    document.getElementById("canvas").style.border = "2px solid";
    var dataURL = canvas.toDataURL('image/png');
    window.open(dataURL);
    document.getElementById("canvas").src = dataURL;
    document.getElementById("canvas").style.display = "inline";
}