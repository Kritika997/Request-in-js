const axios = require("axios");
const input = require("readline-sync")
const fs = require("fs");

// Getting data from api in js we are using axios plsce of requests 
axios.get("http://api.navgurukul.org/courses").then(response=>{
    course_data = response.data;
// here we are creating file for storing get data
    // fs.writeFile("Saral_Data.json",JSON.stringify(course_data,null,4),(err)=>{
    //     if(err) throw err;  
    // });
// running loop for priniting courses name with there Id
    let i = 0;
    let s_no = 0;
    while (i<course_data.length){
        console.log(s_no+=1,course_data[i]["name"],"  ",course_data[i]["id"]);
        i++;
    }
// taking user input which cours he/she wants to read
    var Course_Name = input.question("Enter your courses number which you want: ")-1;
    console.log(course_data[Course_Name]["name"]);
    var Course_id = (course_data[Course_Name]["id"]);
    axios.get("http://saral.navgurukul.org/api/courses/ "+Course_id+" /exercises").then(res=>{
        Exerices = res.data;
        fs.writeFile("Parents_Exercise.json",JSON.stringify(Exerices,null,"\t"),(err)=>{
            if(err) throw err;
        });

//running loop for consoling courses courses exercise slug
        let i = 0;
        var s_No = 0;
        while (i<Exerices["data"].length){
            console.log(s_No+=1,Exerices["data"][i]["name"]);
            if(Exerices["data"][i]["childExercises"].length==0){
                console.log("    :-",Exerices["data"][i]["slug"]);
            }else{
                var sNo = 0;
                let j = 0;
                while(j<Exerices["data"][i]["childExercises"].length){
                    console.log("   ",sNo+=1,Exerices["data"][i]["childExercises"][j]["name"]);
                    j++;
                };
            };
            i++;
        };

// input for user choice exercise
        var User_choice_exercise = input.question("Enter your Exercise which you want to solve: ")-1;

        if(Exerices["data"][User_choice_exercise]["childExercises"].length==0){
            console.log(Exerices["data"][User_choice_exercise]["name"]);
            console.log(Exerices["data"][User_choice_exercise]["slug"]);
        }else{
            console.log(Exerices["data"][User_choice_exercise]["name"]);
            let i = 0;
            let no = 0;
            while(i<Exerices["data"][User_choice_exercise]["childExercises"].length){
                console.log(no+=1,Exerices["data"][User_choice_exercise]["childExercises"][i]["name"]);
                i++;
            };
//  Here we are taking input for user choie question and getting content from api
            var slug_Content = input.question("Enter which question you want to solve: ")-1;
            var child_slug =Exerices["data"][User_choice_exercise]["childExercises"][slug_Content]["slug"]; 
            axios.get(" http://saral.navgurukul.org/api/courses/"+Course_id+"/exercise/getBySlug?slug="+child_slug).then(content=>{
                Child_content = content.data;
                fs.writeFile("SlugAyaHai.json",JSON.stringify(Child_content,null,"\t"),(err)=>{
                    if(err) throw err;
                });
            console.log(Child_content["content"]);
            });
        };
    });
});




