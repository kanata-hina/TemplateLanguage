const templates = ['Diaryテンプレ', 'ToDoListテンプレ', '家計簿テンプレ', 'タスクテンプレ', 'Swift テンプレ', '音声対話処理テンプレ', '音声対話処理スライドテンプレ', '先端技術開発特論テンプレ', 'HPC基礎論テンプレ', 'HPC基礎論 スライドテンプレ', 'ネットワークアプリケーション特論テンプレ', 'ネットワークアプリケーション特論メモテンプレ', 'スタバテンプレ']

scrapbox.PageMenu.addMenu({
  title: 'Template',
  image: 'https://i.gyazo.com/e458f8300fb5ada539612cbf25a0de14.png'
})

for(var num = 0; num < templates.length; num++){
  const templateNumber = num;
  scrapbox.PageMenu('Template').addItem({
     title: () => templates[templateNumber],
     onClick: () => createTemplate(location.href.split('/')[3] ,templates[templateNumber], false)
   })
}

scrapbox.PageMenu.addMenu({
  title: 'insertTemplate',
  image: 'https://i.gyazo.com/d03efaf45106f9af239dfe5fb0dbf979.png'
})

for(var num = 0; num < templates.length; num++){
  const templateNumber = num;
  scrapbox.PageMenu('insertTemplate').addItem({
     title: () => templates[templateNumber],
     onClick: () => createTemplate(location.href.split('/')[3] ,templates[templateNumber], true)
   })
}