var constWord = ['year', 'month', 'monthE', 'monthE3', 'date', 'dayJ', 'dayE', 'dayE3', 'dayJF', 'allHdayJ', 'allSdayE3', 'yearMonthH', 'monthDateS'];
var clicked = false;
var dateMode = 0;
document.body.addEventListener('click', function(e){
  if((e.target.parentNode.className === 'page-link' && e.target.parentNode.type === 'link') || e.target.parentNode.className === 'page-link empty-page-link'){
    e.preventDefault();
    if(clicked){
      clicked = false;
      var projectName = decodeURIComponent(e.target.parentNode.href).split("/")[3];
      var nextPageTitle;
      if(e.target.parentNode.className === 'page-link'){
        nextPageTitle = decodeURIComponent(e.target.parentNode.href).split("/")[4];
        createPage(projectName, nextPageTitle);
      }
      else{
        var request = new XMLHttpRequest();
        request.open("GET", "https://scrapbox.io/api/pages/" + projectName + "/TemplateLanguage/text", true);
        request.onload = function (r){
          if (request.readyState === 4) {
            if (request.status === 200) {
              var templateText = request.responseText.split(/\r\n|\r|\n/);
              var regexp = new RegExp('\\[+(.*?)\\]+', 'g');
              var regexp = new RegExp('\\[(\\[*.*?)\\]*\\]');
              var regexp = new RegExp('\\[(.*?)\\]');
            }
            else {
              window.confirm('error:ページ「TemplateLanguage」が存在しません.');
            }
          }
        };
        request.onerror = function (r) {
          console.error(request.statusText);
        };
        request.send(null);
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
