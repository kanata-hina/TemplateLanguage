function __mimicClick(targetId, left, top) {
  let genEvent = function (type) { 
    let event = document.createEvent("MouseEvents")
    event.initMouseEvent(type, true, true, window, 1, 0, 0, 
        left, top, false, false, false, false, 0, null)
    return event
  }
  
  let elm = document.getElementById(targetId)
  elm.dispatchEvent(genEvent("mousedown"))
  elm.dispatchEvent(genEvent("mouseup"))
  elm.dispatchEvent(genEvent("click"))
}

function clickTitle(){
  if ($('.page.not-persistent').length == 1
  && scrapbox.Page.lines && scrapbox.Page.lines.length == 1) {
    const line = document.getElementById('L' + scrapbox.Page.lines[0].id)
    const lastChar = $(line).find('span[class^="c-"]').last().get(0)
    __mimicClick(line.id, line.offsetWidth, lastChar.offsetTop + 10)
    return true;
  }
  else{
    window.confirm('ページが存在します');
    return false;
  }
}

function insertText(text){
  const line = document.getElementById('L' + scrapbox.Page.lines[0].id)
  const lastChar = $(line).find('span[class^="c-"]').last().get(0)
  const textarea = document.getElementById('text-input')
  textarea.value = text
  
  const event = document.createEvent('Event')
  event.initEvent('input', true, true)
  textarea.dispatchEvent(event)
  
  // 選択状態を解除したいのでもう1回クリックしとく
  __mimicClick(line.id, line.offsetWidth, lastChar.offsetTop + 10)
}