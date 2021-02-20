const messages=[
    "test1",
"test2",
"test3",
"test4"];

var elem=document.getElementsByClassName("test");
elem[0].innerText = messages[Math.floor(Math.random()*4)];
