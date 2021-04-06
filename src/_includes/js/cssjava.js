function showLangMenu(){
    document.getElementById("drop-content").classList.toggle("show");
}

function showReviews(objButton){
    document.getElementById(objButton.value).classList.toggle("show");
    var reviews = document.getElementsByClassName("reviewBlock");
    for(var i = 0; i < reviews.length; i++){
        var openReview = reviews[i];
        if(openReview.classList.contains('show') && openReview.id != objButton.value){
            openReview.classList.remove('show');
        }
    }
}

window.onclick = function(event){
    if(!event.target.matches('.dropbtn')){
        var dropdowns =  document.getElementsByClassName("lang-content");
        for(var i = 0; i < dropdowns.length; i++){
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}