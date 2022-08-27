
$(document).ready(function(){
    getlist();
});


function getlist()
{
    var id;
    var title;
    var body;
  

   $.ajax({
    url: 'http://localhost:3000/posts',
    type: "GET",
    success: function(result){
        console.log(result);

        var table=$('#tblist');
        table.empty();

        result.forEach(element => {
            table.append('<tr><td>'+element.id+'</td><td>'+element.title+'</td><td><a id="updatebtn" class="btn btn-primary" onclick="popupOpen('+element.id+')">Update</a></td><td><a class="btn btn-warning" onclick="deletePost('+element.id+')">Delete</a></td></tr>');
       });

      
        
    },
    error: function(err){
        console.log(err);
    }
   })



  
}


function CreatePost()
{
    var id=document.getElementById("inputid").value
    var title=document.getElementById("inputtitle").value

    $.ajax({
        url: 'http://localhost:3000/posts',
        method: 'POST',
        dataType:'json',
        data:{
            title:title,
            author:"deneme"
        },
        success: function(data){
            console.log(data);
            alert("post kayıt edildi");
            
    
        },
        error: function(err){
            console.log(err);
        }
       })
}


function deletePost(id)
{
    
    $.ajax({
        
        url: 'http://localhost:3000/posts/'+id,
        method: 'DELETE',
        success: function(){
            alert("post silindi");
            getlist();
    
        },
        error: function(err){
            console.log(err);
        }
       })


}


// function getUpdatePost(id)
// {
   
//    $.ajax({
//     url: 'http://localhost:3000/posts/'+id,
//     type: "GET",
//     dataType:'json',
//     success: function(result){
//         console.log(result)
//         localStorage.setItem("dataupdateid",result.id);
//         localStorage.setItem("dataupdate",result.title);
//         location.href="C:/Users/ISMAILBAYRAM/Desktop/deneme/update.html";
//     },
//     error: function(err){
//         console.log(err);
//     }
//    })

// }


function UpdatePost()
{
    var id=document.getElementById("updateId").value
    var title=document.getElementById("updateTitle").value

    $.ajax({
        url: 'http://localhost:3000/posts/'+id,
        method: 'PUT',
        data:{
            id:id,
            title:title,
            author:"deneme"
        },
        success: function(result){
            console.log(result);
            alert("post güncellendi")
            
            

        },
        error: function(err){
            console.log(err);
        }
    })   
}


// document.getElementById("updatebtn").addEventListener("click",function(){
//     document.querySelector(".popup").style.display="flex";
// })

function popupOpen(id)
{
   

    $.ajax({
        url: 'http://localhost:3000/posts/'+id,
        type: "GET",
        dataType:'json',
        success: function(result){
            console.log(result)
            document.querySelector(".popup").style.display="flex";
            // localStorage.setItem("dataupdateid",result.id);
            // localStorage.setItem("dataupdate",result.title);
            // location.href="C:/Users/ISMAILBAYRAM/Desktop/deneme/update.html";
            document.getElementById("updateId").value=result.id;
            document.getElementById("updateTitle").value=result.title;

        },
        error: function(err){
            console.log(err);
        }
       })
}

function popupClose()
{
    document.querySelector(".popup").style.display="none";
}