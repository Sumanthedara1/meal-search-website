var msg = null;
let allinfo = null;
// getting info we need from api through http reuest and parseing it so that we can use it

function requ(char)
{
var xh = new XMLHttpRequest();
xh.open("get", "https://www.themealdb.com/api/json/v1/1/search.php?f="+char, false);
xh.onload = function() {

    msg = JSON.parse(xh.response);
    allinfo = msg.meals;


}

xh.send();
}
let str = '';



// list will collect all div ids for deletion and updation for each keypad event
let list = [];
// searchinput id
let sbar = document.getElementById("sbar");
// search results div, where we will add results we achieve
let sec_res = document.getElementById("results");
// event listener for searchbar input id
sbar.addEventListener("keydown", function(e) {
    if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 8 || e.keyCode == 32) {

        // counter to name divs and buttons to make them trackes later
        let ct = 0;

      
        while (ct < list.length) {
            // after every keyaction removing all the divs of search results using list array of div
            var element = document.getElementById("d" + ct);


            sec_res.removeChild(element);
            ct++;

        }

        if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 32) {

            str += String.fromCharCode(e.keyCode);
        } else {
            allinfo = msg.meals;
            str = str.substring(0, str.length - 1);
            
        }

        if (str.length == 1) {
            // 
            requ(str.charAt(0));
          
         allinfo = msg.meals;
        }
      
        // to set ids of divs and elements in search box such that they can be tracked again easily
        let it = 0;

      
        let nt=0;
        list = [];
        if (str.length > 0) {

            // if (str.length >= 1) {
            //     requ(str.charAt(0));
            //   allinfo = msg.meals;
            // }
          
            //  iterating and adding the matching strings into our search boxes along with favourite buttons
            while (it < allinfo.length) {
                if (str.substring(0, str.length).toLowerCase() == allinfo[it].strMeal.substring(0, str.length).toLowerCase()) {
                    // creating div dynamically 
                   let res_div = document.createElement("div");

                  //  creating search result element dynamically as an anchor for indvidual page craetion
                    let sr_resanchor = document.createElement("a");
                    let sr_res=document.createElement("p");
                    sr_res.appendChild(sr_resanchor);
                    // adding text such that bolding the matched part
                    sr_resanchor.innerHTML = allinfo[it].strMeal.substring(0, str.length).bold();
                    sr_resanchor.innerHTML += allinfo[it].strMeal.substring(str.length);
                    //  addto fav button
                    let fav_b = document.createElement("a");
                    //method to create a loclastorgae element which will help in create a individual meal page by acessing it there
                    sr_resanchor.setAttribute("onclick", "cre(this.innerText)")

                    sr_resanchor.setAttribute("target", "_blank")
                    sr_resanchor.setAttribute("href", "mealpage.html")
                    fav_b.innerHTML = "Add to favourites";
                    // adding add fucntion to add to fav list
                    fav_b.addEventListener("click", add, true);
                    // setting attributes for css styling 
                    fav_b.setAttribute("id", "fav");
                    res_div.appendChild(sr_res);
                    res_div.appendChild(fav_b);
                    // finally appending to res div
                    res_div.setAttribute("id", "d" + nt);
                    // creating this list of ids which we need to use remove and for updation of our search results div 
                    // each time we press the key front adding text or deleting
                    list.push("d" + nt);

 
                    nt++;
                    // basically sr_res is the div of one search result being added to sec_res big div which is collection of all results 
                    sec_res.appendChild(res_div);




                }

                it++;

            }
        }
        // te=collect;
    }


})
// getting the favslist section id
let favs = document.getElementById("favs");
// getting resdivs section id
let resdivs = document.getElementById("results");
// iterator
let ite = 0;
// parentnode collector
let pn = null;

function add() {

    //  collecting parent node
    pn = this.parentNode;
    //  div for favs  persistent list
    let div = document.createElement("div");
    let p = document.createElement("h3");

    if (localStorage.getItem("data") == null) {
        // creating data element for local storage to make a persistent list of favourite items
        localStorage.setItem("data", "[]");

    }


    let arr = JSON.parse(localStorage.getItem("data"));
    // 1)using parent node acessing the result div text of particular add to favs corresponding text recipe name
    // 2)if not present add it else nothing happens
    if (arr.includes(pn.childNodes[0].innerText) == false) {
        arr.push(pn.childNodes[0].innerText);
        localStorage.setItem("data", JSON.stringify(arr));

        // ptag to make favs section 
        p.innerHTML = pn.childNodes[0].innerHTML;



        //   added to earlier created div(line 121)
        div.appendChild(p);
        //   creating remove button and adding remove function to it
        // also setting ids 
        let but = document.createElement("button");
        but.setAttribute("class", "btn btn-danger");
        but.innerText = "Remove";
        div.appendChild(but);
        but.setAttribute("id", "but" + ite);
        but.setAttribute("onclick", "remove(this.id)");

        // both button and p inside div now is adde one favourite section into our "my favs list"
        favs.appendChild(div);

        ite++;


    }




}

let i = 0;
// parsing localstorage items to array
let locallist = JSON.parse(localStorage.getItem("data"));
// immediate invoke function which will get all our items in the local storage array to add in our section of fav list making it fav section persistent

(function (){
while (locallist != null && i < locallist.length) {
    locallist = JSON.parse(localStorage.getItem("data"));

    let div = document.createElement("div");
    let p = document.createElement("h3");

    p.innerHTML = locallist[i];

    div.appendChild(p);
    let but = document.createElement("button");
    but.setAttribute("class", "btn btn-danger");
    but.setAttribute("id", "but" + i);
    but.setAttribute("onclick", "remove(this.id)");

    but.innerText = "Remove";
    div.appendChild(but);
    favs.appendChild(div);
    i++;




}
})();



// removing items from our favs section and local storage array
let p = null;
function remove(cid) {
    // remove fucntion passed id as argument 
    locallist = JSON.parse(localStorage.getItem("data"));

    //   parent id collectoion for  removing the the meal from favs section
    p = document.getElementById(cid);

    // removing from favs section
    favs.removeChild(p.parentNode);

    // also removing from localstorage array so that it can be same as well for our favs list
    var index = locallist.indexOf(p.parentNode.childNodes[0].innerText);
    if (index !== -1) {
        locallist.splice(index, 1);


        localStorage.setItem("data", JSON.stringify(locallist));

    }




}


// setting text we got from search result of div to store in local sorage so we can pass it to indivdual result page
function cre(txt) {
    localStorage.setItem("recipe", txt);

}
