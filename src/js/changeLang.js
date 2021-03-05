let object;
document.addEventListener("DOMContentLoaded", fn);

function fn(){
    object=document.getElementById("lang");
    object.addEventListener("change", loadPageLanguage);
}

function loadPageLanguage(){
        window.location.href = `/${object.selectedOptions[0].label}`;
}
