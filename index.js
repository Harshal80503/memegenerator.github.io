let top_Text_Input, bottom_Text_Input, top_input_tsize, bottom_input_tsize, img_Input, gen_button, canvas, ctx, colors, selector, new_family, new_familyStyle;

function new_font() {
    new_family.value = selector.options[selector.selectedIndex].value;
    new_familyStyle.style.new_familyily = new_family;
}

function generateMeme (img, topText, bottomText, topTextSize, bottomTextSize, textcol, fontStyle) {
    let fontSize;

    
    canvas.width = img.width;
    canvas.height = img.height;

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = textcol;
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';


    
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px ' + fontStyle;
    ctx.lineWidth = fontSize / 20;

    
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function (t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });

    
    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 20;

    
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
}

function init () {
    
    top_Text_Input = document.getElementById('top-text');
    bottom_Text_Input = document.getElementById('bottom-text');
    top_input_tsize = document.getElementById('top_text');
    bottom_input_tsize = document.getElementById('bottom_text');
    img_Input = document.getElementById('input_img');
    gen_button = document.getElementById('generate-btn');
    canvas = document.getElementById('canvas_meme');
    colors = document.getElementById('my_text_color');
    selector = document.getElementById('text_font');
    new_familyStyle = document.getElementById('top');
    new_family = selector.options[selector.selectedIndex];
    
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 0;

    
    gen_button.addEventListener('click', function () {
        
        let reader = new FileReader();
        reader.onload = function () {
            let img = new Image;
            img.src = reader.result;
            generateMeme(img, top_Text_Input.value, bottom_Text_Input.value, top_input_tsize.value, bottom_input_tsize.value, colors.value, new_family.value, new_familyStyle);
        };
        reader.readAsDataURL(img_Input.files[0]);
    });
}

init();

function dullimg(){
    document.getElementById("canvas_meme").style.filter = "grayscale(1)";
}

function brightenimg(){
    document.getElementById("canvas_meme").style.filter = "grayscale(0)";
}


function opacdecimg(){
    document.getElementById("canvas_meme").style.opacity = "0.5";
}

function opacinimg(){
    document.getElementById("canvas_meme").style.opacity = "1";
}

function opacdefimg(){
    document.getElementById("canvas_meme").style.opacity = "0.7";
}

$("#downloads").on('click', function () {
    var imgageData = getCanvas.toDataURL("image/png");
    
    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
    $("#downloads").attr("download", "your_pic_name.png").attr("href", newData);
    $("#btn-preview").css("display","inline-block");
    $("#downloads").css("display","none");
    });