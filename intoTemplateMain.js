var constWord = ['year', 'month', 'monthE', 'monthE3', 'date', 'dayJ', 'dayE', 'dayE3', 'dayJF', 'allHdayJ', 'allSdayE3', 'yearMonthH', 'monthDateS'];
var clicked = false;
var dateMode = 0;
document.body.addEventListener('click', function(e){
  if((e.target.parentNode.className === 'page-link' && e.target.parentNode.type === 'link') || e.target.parentNode.className === 'page-link empty-page-link'){
    e.preventDefault();
    if(clicked){
      clicked = false;
      if(e.target.parentNode.className === 'page-link'){
        createPage();
      }
      else{
        
      }
    }
    else{
      clicked = true;
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
