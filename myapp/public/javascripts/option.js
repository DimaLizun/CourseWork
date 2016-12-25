/**
 * Created by Lizun on 25.12.2016.
 */


function getSelect() {
    var e = document.getElementById("selSort");
    strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
}

function GetParams() {
   // var e = document.getElementById("selSort");
    var strUser = document.getElementById("selSort").value;
    //var strUser = e.options[e.selectedIndex].value;
    window.location.href='/customers?sorts='+strUser;
}




