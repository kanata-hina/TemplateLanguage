var constWord = ['year', 'month', 'monthE', 'monthE3', 'date', 'dayJ', 'dayE', 'dayE3', 'dayJF'];
var clicked = false;
document.body.addEventListener('click', function(e){
  if(e.target.parentNode.className === 'page-link'){
    e.preventDefault();
    if(clicked){
      clicked = false;
      var projectName = decodeURIComponent(e.target.parentNode.href).split("/")[3];
      var nextPageTitle = decodeURIComponent(e.target.parentNode.href).split("/")[4];
      var request = new XMLHttpRequest();
      request.open("GET", "https://scrapbox.io/api/pages/" + projectName + "/" + nextPageTitle + "/text", true);
      request.onload = function(r){
        if(request.readyState === 4) {
          if(request.status === 200) {
            templateText = request.responseText.split(/\r\n|\r|\n/);
            if(templateText[1] === '#TemplateLanguage'){
              if(templateText.length > 4){
                if(templateText[4] === ''){
                  window.confirm('error:ページ名が存在しません.');
                  return;
                }
                if(templateText[2] > 0){
                  var inputQ = templateText[3].split(/\$/);
                  var promptMessage = [];
                  for(var i = 0; i < inputQ.length; i++){
                    var promptText = '次の内容を入力してください.\n' + inputQ[i];
                    var message = window.prompt(promptText);
                    promptMessage[i] = message !== null ? message : '';
                  }
                }
                var dates = getDating();
                var regexp;
                var bodyContents = '';
                for(var i = 4; i < templateText.length; i++){
                  for(var j = 0; j < constWord.length; j++){
                    regexp = new RegExp('\\(\\$' + constWord[j] + '\\)', 'g');
                    templateText[i] = templateText[i].replace(regexp, dates[constWord[j]]);
                  }
                  for(j = 0; j < templateText[2]; j++){
                    regexp = new RegExp('\\(\\$' + (j + 1) + '\\)', 'g');
                    templateText[i] = templateText[i].replace(regexp, promptMessage[j]);
                  }
                  if(i == 5){
                    bodyContents = templateText[i];
                  }
                  else if(i != 4){
                    bodyContents = bodyContents + '\n' + templateText[i];
                  }
                }
                location.href = 'https://scrapbox.io/' + encodeURIComponent(projectName) + '/' + encodeURIComponent(templateText[4]) + '?body=' + encodeURIComponent(bodyContents);
              }
              else{
                window.confirm('error:テンプレートページがルールに従っていません.');
              }
            }
            else{
              window.confirm('error:ページがテンプレートページではありません.');
            }
          }
          else {
            window.confirm('error:ページが存在しません.');
          }
        }
      };
      request.onerror = function (r) {
        console.error(request.statusText);
      };
      request.send(null);
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
