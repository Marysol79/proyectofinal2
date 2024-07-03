const fulImgBox = document.getElementById("fulImgBox"),
fulImg = document.getElementById("fulImg");

function openFulImg(reference){
    fulImg.src = reference
    fulImgBox.style.display = "flex";
    
}
function closeImg(){
    fulImgBox.style.display = "none";
}