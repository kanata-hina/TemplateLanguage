var constWord = ['year', 'month', 'monthE', 'monthE3', 'date', 'dayJ', 'dayE', 'dayE3', 'dayJF'];
var clicked = false;
var dateMode = 0;
document.body.addEventListener('click', function(e){
  if(e.target.parentNode.className === 'page-link'){
    e.preventDefault();
    if(clicked){
      clicked = false;
      var projectName = decodeURIComponent(e.target.parentNode.href).split("/")[3];
      decodeURIComponent(e.target.parentNode.href).split("/")[4];
      var request = new XMLHttpRequest();
      request.open("GET", "https://scrapbox.io/api/pages/" + projectName + "/" + nextPageTitle + "/text", true);
      request.onload = function (r){
        if (request.readyState === 4) {
          if (request.status === 200) {
            templateText = request.responseText.split(/\r\n|\r|\n/);
            if(templateText[1] === '#TemplateLanguage'){
              if(templateText.length > 5){
                var dates;
                var regexp = /d[0-9]/;
                if(!regexp.test(templateText[2])){
                  window.confirm('error:日付変数オプションが設定されてません.');
                  return;
                }
                if(templateText[2] === 'd1'){
                  dateMode = 1;
                  dates = getDating(0);
                }
                else if(templateText[2] === 'd2'){
                  dateMode = 2;
                  var dateMessage = window.prompt('今日を起点(0)としてずらしたい日数分の数字(半角入力)を入力してください.(明日なら 1, 明後日なら 2, 昨日なら -1, 一昨日なら -2)', 0);
                  dateMessage = dateMessage !== null ? dateMessage : 0;
                  dates = getDating(-(-dateMessage));
                }
                else if(templateText[2] === 'd3'){
                  dateMode = 3;
                  var dateMessage = window.prompt('今日を起点(0)としてずらしたい日数分の数字(半角入力)を入力してください.(昨日なら 1, 一昨日なら 2, 明日なら -1, 明後日なら -2)', 0);
                  dateMessage = dateMessage !== null ? dateMessage : 0;
                  dates = getDating(-dateMessage);
                }
                if(templateText[5] === ''){
                  window.confirm('error:ページ名が存在しません.');
                  return;
                }
                if(templateText[3] > 0){
                  var inputQ = templateText[4].split(/\$/);
                  var promptMessage = [];
                  for(var i = 0; i < inputQ.length; i++){
                    var promptText = '次の内容を入力してください.\n' + inputQ[i];
                    var message = window.prompt(promptText);
                    promptMessage[i] = message !== null ? message : '';
                  }
                }
                var bodyContents = '';
                for(var i = 5; i < templateText.length; i++){
                  if(dateMode != 0){
                    for(var j = 0; j < constWord.length; j++){
                      regexp = new RegExp('\\(\\$' + constWord[j] + '\\)', 'g');
                      templateText[i] = templateText[i].replace(regexp, dates[constWord[j]]);
                    }
                  }
                  for(j = 0; j < templateText[3]; j++){
                    regexp = new RegExp('\\(\\$' + (j + 1) + '\\)', 'g');
                    templateText[i] = templateText[i].replace(regexp, promptMessage[j]);
                  }
                  if(i == 6){
                    bodyContents = templateText[i];
                  }
                  else if(i != 5){
                    bodyContents = bodyContents + '\n' + templateText[i];
                  }
                }
                location.href = 'https://scrapbox.io/' + encodeURIComponent(projectName) + '/' + encodeURIComponent(templateText[5]) + '?body=' + encodeURIComponent(bodyContents);
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
