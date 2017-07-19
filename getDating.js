function getDating(inputDate){
  var date = new Date();
  date.setDate(date.getDate() + inputDate);
  var monthsE = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dayOfWeeksJ = ["日","月","火","水","木","金","土"];
  var dayOfWeeksE = ["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur"];
  var monthE = monthsE[date.getMonth()];
  var dayOfWeekJ = dayOfWeeksJ[date.getDay()];
  var dayOfWeekE = dayOfWeeksE[date.getDay()];
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  date.setDate(1);
  return {'year': date.getFullYear(), 'month': month, 'monthE': monthE, 'monthE3': month.slice(0, 3),'date': day, 'dayJ': dayOfWeekJ, 'dayE': dayOfWeekE + 'day', 'dayE3': dayOfWeekE.slice(0, 3), 'dayJF': dayOfWeeksJ[date.getDay()]}
}
