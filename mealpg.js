// acessing data from api to add to our page through http request
var mesg=null;
let te=null;
var msg=null;
var xh = new XMLHttpRequest();
// keeping async false making sure that enough data is loaded first to give to our dynamical immediate invoking fucntion
xh.open("get","https://www.themealdb.com/api/json/v1/1/search.php?f=a",false);
xh.onload=function()
{

    mesg=JSON.parse(xh.response);
    msg=mesg["meals"];


}

xh.send();


(function (){
// getting meal which is clicked and sored in local storage in the name of recipe
let meal=localStorage.getItem("recipe");
// using that keeping the heading
mealheading.innerText=meal;
// getting image tag id to tore thumb of the meal
let img=document.getElementById("im");

    let it=0;
    // storing array of meals info int allmeals to use it
    let allmeals=msg;

// iterating and finding the name of the meal which matches with our info
    while(it<allmeals["length"])
    {
     
        
        if(allmeals[it].strMeal==meal)
        {
            // finding matching text
         
            img.setAttribute("src",allmeals[it].strMealThumb);
            img.setAttribute("alt",meal);
            // getting the list which should contain ingredients
            let ing=document.getElementById("ing_list");
            // loop to acess all ingredients  and added to inglist
            let x=1;
            while(allmeals[it]["strIngredient"+x].length!=0)
            {
                let li=document.createElement("li");
                li.innerText=allmeals[it]["strIngredient"+x];
               
                 ing.appendChild(li);

                x++;

            }

            // acessing and adding into instructions div
            let instruct_id=document.getElementById("instructions");
            instruct_id.innerText=msg[it].strInstructions;
        //  breaking here
            break;
        }

        it++;

    }

})();
