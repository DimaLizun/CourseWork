/**
 * Created by Lizun on 25.12.2016.
 */


function getSelect() {
    var e = document.getElementById("selSort");
    strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
}

function GetParams() {

    var strUser = document.getElementById("selSort").value;
    var name = document.getElementById("selSort").getAttribute("name");

    window.location.href= '/' + name + '?sorts=' + strUser;
}




