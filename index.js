// initialiser();
document.getElementById("btn").addEventListener("click" , function(){
    
    var user = document.getElementById("box");

    var currentUser = user.value;
    user.value="";               
    var userStatus; // using this Object to show submissions of a user    
    var UserSubmissions;
    var UserRatings;                     

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status ==200){
            document.getElementById("error").innerText ="";

            userStatus = JSON.parse(xhttp.responseText);

            var name;

            if(userStatus.result[0].firstName == undefined){name = "User did not provide :("}
            else
            {name = userStatus.result[0].firstName + " "  + userStatus.result[0].lastName}


            document.getElementsByClassName("info")[0].innerText = name;
            document.getElementsByClassName("info")[1].innerText =  userStatus.result[0].organization;
            document.getElementsByClassName("info")[2].innerText = userStatus.result[0].rating;
        }

        else if (this.status != 200 && this.readyState==4){
            document.getElementById("error").innerText = " Error . Either no such handle exist or network error. TRY AGAIN BY ENTERING HANDLE :(";
        }
    };

    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){

        if(this.readyState == 4 && this.status ==200){
            document.getElementById("error").innerText ="";

            UserSubmissions = JSON.parse(xhttp2.responseText);

            document.getElementsByClassName("info")[4].innerText = UserSubmissions.result.length;

            var ac =0 ,wa =0 ,mx = -1;

            UserSubmissions.result.forEach(function(curr){
           

                if(curr.verdict == "WRONG_ANSWER")
                {wa++;}

                if(curr.verdict == "OK")
                {
                    ac++;

                    if(mx < curr.problem.rating){
                        mx = curr.problem.rating;
                        problem = curr.problem.name;
                    }
                }
            });

            // UserSubmissions.result.length

            document.getElementsByClassName("info")[5].innerText = ac;
            document.getElementsByClassName("info")[6].innerText = wa;
            document.getElementsByClassName("info")[7].innerText = mx + " " + problem;
        }

        else if (this.status != 200 && this.readyState==4){
            document.getElementById("error").innerText = " Error . Either no such handle exist or network error. TRY AGAIN BY ENTERING HANDLE :(";
        }
    };


    var xhttp3 = new XMLHttpRequest();

    xhttp3.onreadystatechange = function(){

        if(this.readyState == 4 && this.status ==200){
            document.getElementById("error").innerText ="";

          
            userRatings = JSON.parse(xhttp3.responseText);

            document.getElementsByClassName("info")[3].innerText = userRatings.result.length;

        }

        else if (this.status != 200 && this.readyState==4){

            document.getElementById("error").innerText = " Error . Either no such handle exist or network error. TRY AGAIN BY ENTERING HANDLE :(";
            initialiser();
        }
    };


    xhttp.open("GET" , "https://codeforces.com/api/user.info?handles="+currentUser,true);
    xhttp.send();

    
    xhttp2.open("GET" , "https://codeforces.com/api/user.status?handle="+currentUser,true);
    xhttp2.send();


    xhttp3.open("GET" , "https://codeforces.com/api/user.rating?handle="+currentUser,true);
    xhttp3.send();
});

function initialiser(){
    
    for(var i=0;i<=8;i++){
             
        document.getElementsByClassName("info")[i].innerText = '-';

    }
}
