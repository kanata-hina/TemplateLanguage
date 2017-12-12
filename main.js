const constWord = ['year', 'month', 'monthE', 'monthE3', 'date', 'dayJ', 'dayE', 'dayE3', 'dayJF', 'allHdayJ', 'allSdayE3', 'yearMonthH', 'monthDateS', 'yearMonthDateH', 'monthDateH'];
var clicked = false;
var nextPageTitle;
document.body.addEventListener('click', function(e){
  if(e.target.parentNode.className === 'page-link' && e.target.parentNode.type === 'link'){
    e.preventDefault();
    if(clicked){
      clicked = false;
      var projectName = decodeURIComponent(e.target.parentNode.href).split("/")[3];
      createTemplate(projectName, nextPageTitle, false);
    }
    else{
      clicked = true;
      nextPageTitle = decodeURIComponent(e.target.parentNode.href).split("/")[4];
      // 300ミリ秒待って、その間にもう一度クリックがなければ通常クリックと判別
      setTimeout(function(){
        // 通常クリック(元の動作を行う)
        if(clicked){
          location.href = e.target.parentNode.href;
        }
        clicked = false;
      }, 300);
    }
  }
});
