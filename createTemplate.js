function createTemplate(projectName, nextPageTitle, insert){
  var request = new XMLHttpRequest();
  var dateMode = 0;
  if(insert){
    if(!clickTitle()){
      return;
    }
  }
  request.open("GET", "https://scrapbox.io/api/pages/" + projectName + "/" + nextPageTitle + "/text", true);
  request.onload = function (r){
    if (request.readyState === 4) {
      if (request.status === 200) {
        var templateText = request.responseText.split(/\r\n|\r|\n/);
        var dateMessage = 0;
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
              dateMessage = window.prompt('今日を起点(0)としてずらしたい日数分の数字(半角入力)を入力してください.(明日なら 1, 明後日なら 2, 昨日なら -1, 一昨日なら -2)', 0);
              dateMessage = dateMessage !== null ? dateMessage : 0;
              dateMessage = -(-dateMessage);
              dates = getDating(dateMessage);
            }
            else if(templateText[2] === 'd3'){
              dateMode = 3;
              var dateMessage = window.prompt('今日を起点(0)としてずらしたい日数分の数字(半角入力)を入力してください.(昨日なら 1, 一昨日なら 2, 明日なら -1, 明後日なら -2)', 0);
              dateMessage = dateMessage !== null ? dateMessage : 0;
              dateMessage = -dateMessage;
              dates = getDating(dateMessage);
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
                  regexp = new RegExp('\\(\\$' + constWord[j] + '\\s([\\-\\+])\\s(\\d+)\\)', 'g');
                  var matchList = templateText[i].match(regexp);
                  if(matchList !== null){
                    regexp = new RegExp('\\(\\$' + constWord[j] + '\\s([\\-\\+])\\s(\\d+)\\)');
                    for(var k = 0; k < matchList.length; k++){
                      var matchContents = matchList[k].match(regexp);
                      var nowDate;
                      if(matchContents[1] === '-'){
                        matchContents[2] = -(-(-matchContents[2]));
                      }
                      else{
                        matchContents[2] = (-(-matchContents[2]));
                      }
                      switch(constWord[j]){
                        case 'year':
                          nowDate = dates[constWord[j]] + matchContents[2];
                          break;
                        case 'month':
                        case 'monthE':
                        case 'monthE3':
                        case 'yearMonthH':
                          nowDate = getDating(dateMessage, 'month', matchContents[2])[constWord[j]];
                          break;
                        case 'date':
                          nowDate = getDating(dateMessage, 'date', matchContents[2]);
                          break;
                        case 'dayJ':
                        case 'dayE':
                        case 'dayE3':
                          nowDate = getDating(dateMessage, 'day', matchContents[2])[constWord[j]];
                          break;
                        default:
                          nowDate = getDating(dateMessage, 'another', matchContents[2])[constWord[j]];
                          break;
                      }
                      templateText[i] = templateText[i].replace(regexp, nowDate);
                    }
                  }
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
            if(insert){
              insertText('\n' + bodyContents);
            }
            else{
              location.href = 'https://scrapbox.io/' + encodeURIComponent(projectName) + '/' + encodeURIComponent(templateText[5]) + '?body=' + encodeURIComponent(bodyContents);
            }
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