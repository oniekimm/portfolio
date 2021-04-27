const apiUrl = "works1.json";

let works = "";

async function loadData() {
  const response = await fetch(apiUrl);
  works = await response.json();

  showData(0);
}





function showData(filteringCategory) {
  var filteredworks;

  if(filteringCategory === 0){
    filteredworks = works;
  } else {
    filteredworks = works.filter(function(work) {
      return(   
        work.category == filteringCategory
      ); 
    })
  }

  let result = "";

  for (let work of filteredworks) {
    result += "<li id='li"+ work.number+ "' class='workLi'>"
    result += "<span class='li_work_title'>" + work.number + " "+work.title + "</span>";
    result += "<span class='li_work_info'>" + work.year + ", " + work.media + "</span>";
    result += "<img class='li_work_thumb' src='" + work.indeximg + "' alt='" + work.title+ "'>";
    result += "</li>";
  }
  document.getElementById("workUl").innerHTML = result;
} 





function showData_2(filteringNumber){
  let filteredNumber = filteringNumber.replace('li','');

  var filteredworks2 = works.filter(function(work) {
    return(   
      work.number == filteredNumber
    ); 
  })


  let result1 = "";
  for (let work of filteredworks2) {
    result1 += "<div class='work_title work_title1'>" + work.title + "</div>"
    result1 += "<div class='work_title work_title2'>" + work.year + ", " + work.media + "</div>";
    result1 += "<div class='work_description'>" + work.description + "</div>";
  }
  document.getElementById("work_wrapper1").innerHTML = result1;
  document.getElementById("work_wrapper3").innerHTML = result1;


  let result2 = "";
  for (let work of filteredworks2) {
    for (var i=0; i<work.img.length; i++){
      if(work.img[i].src.endsWith("v.jpg" || "v.png")){
        result2 += "<div class='work_box work_box_vertical'>"
        result2 += "<img class='work_img' src='" + work.img[i].src + "' alt=''>"
      } else if(work.img[i].src.endsWith(".jpg" || ".png")){
        result2 += "<div class='work_box work_box_horizontal'>"
        result2 += "<img class='work_img' src='" + work.img[i].src + "' alt=''>"
      }
      else {
        result2 += "<div class='work_box work_box_horizontal'>"
        result2 += ""
        result2 += work.img[i].src;
        result2 += "</div>"
      }

      result2 += "<div class='work_text'>"  + work.img[i].text  + "</div>"
      result2 += "</div>"
    }
  }
  document.getElementById("work_wrapper2").innerHTML = result2;
}





loadData();





$('#workUl').on( 'click', '.workLi', function () { 
  showData_2(this.id);
});

$('#buttonAll').on( 'click', function () { 
  showData(0);
});

$('#buttonWeb').on( 'click', function () { 
  showData("web");
});

$('#buttonPrinted').on( 'click', function () { 
  showData("printed");
});

$('#buttonOthers').on( 'click', function () { 
  showData("others");
});



