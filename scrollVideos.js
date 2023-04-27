const html = document.documentElement;

const glassCanvas = document.querySelector("#kulglasskopning");
const pizzaCanvas = document.querySelector("#pizzavideo");

const glass_frameCount = 93;
const pizza_frameCount = 94;

const glass_img = new Image();
const pizza_img = new Image();

glass_img.src = "Glasskopning/img0001.jpg";
glass_img.onload = function() {
    glassCanvas.getContext("2d").drawImage(glass_img, 0, 0);
}
pizza_img.src = "pizzavideo/img0001.jpg";
pizza_img.onload = function() {
    pizzaCanvas.getContext("2d").drawImage(pizza_img, 0, 0);
}

// const original_width = 640;
// const original_height = 360;

// pizzaCanvas.width = window.screen.width;
// pizzaCanvas.height = original_height * (window.screen.width / original_width);
// glassCanvas.width = window.screen.width;
// glassCanvas.height = original_height * (window.screen.width / original_width);

pizzaCanvas.width = pizza_img.width;
pizzaCanvas.height = pizza_img.height;
glassCanvas.width = glass_img.width;
glassCanvas.height = glass_img.height;

const element_names = [[pizzaCanvas, "pizzavideo/img", pizza_frameCount, pizza_img, "#pizzavideo"], [glassCanvas, "Glasskopning/img", glass_frameCount, glass_img, "#kulglasskopning"]]



window.addEventListener("scroll", () => {
    
    
    for (let i = 0; i < element_names.length; i++) {
        update_canvas(element_names[i][0], element_names[i][1], element_names[i][2], element_names[i][3], element_names[i][4])
        break;
    }
})

function updateImage(index, img, canvas, path) {
    let pizza_height =document.querySelector("#pizzasize").clientHeight;
    let pizza_width =document.querySelector("#pizzasize").clientWidth;
    // console.log(pizza_height);
    document.querySelector(".image-container").style.height = pizza_height + "px";
    // pizzaCanvas.height = pizza_height + "px";
    
    let scale_fac = pizza_height / pizza_img.height;
    // console.log(pizza_width * scale_fac)
    img.width = 640 * scale_fac;
    // pizzaCanvas.width = 640 * scale_fac;



    img.src = path + index.toString().padStart(4, "0") + ".jpg";
    console.log(img.width);
    img.width = 500;
    console.log(img.width);
    canvas.getContext("2d").drawImage(img, 0, 0)
    // document.querySelector("#pizza").style.backgroundImage = "url("+img.src+")";//"url("+canvas.toDataURL()+")";
}

function update_canvas(canvas, path, frameCount, img, elementname) {
    // parentElement är en image-container som justerar lite cropping i vissa aspect ratios. Gör beräkningarna utifrån den istället för canvas, då hela canvas height kanske inte syns.
    var scrollTop = -document.querySelector(elementname).parentElement.getBoundingClientRect().bottom + (window.innerHeight)//+250)
    // var maxScroll = (window.innerHeight - document.querySelector(elementname).parentElement.clientHeight)// * .8 // the length of which it should scroll within.
    var maxScroll = (window.innerHeight - document.querySelector(elementname).clientHeight)// * .8 // the length of which it should scroll within.
    var scrollFraction = (scrollTop / maxScroll)
    // console.log("top", scrollTop, "max", maxScroll, "frac", scrollFraction)
    var frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount))
    if (frameIndex >= 0) {
        requestAnimationFrame( () => updateImage(frameIndex + 1, img, canvas, path))
    }
}


// Preload
const preloadImages = () => {
    for (let i = 0; i < element_names.length; i++) {
        for (let i2 = 1; i2 < element_names[i][2]; i2++) {
            const img = new Image();
            img.src = (element_names[i][1] + i2.toString().padStart(4, "0") + ".jpg");
        }
    }
}
preloadImages();