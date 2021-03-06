function getDating(inputDate, setItem, nowDate){
  var date = new Date();
  date.setDate(date.getDate() + inputDate);
  const monthsE = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayOfWeeksJ = ["日","月","火","水","木","金","土"];
  const dayOfWeeksE = ["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur"];
  if(typeof setItem === "undefined"){
    var monthE = monthsE[date.getMonth()];
    var dayOfWeekJ = dayOfWeeksJ[date.getDay()];
    var dayOfWeekE = dayOfWeeksE[date.getDay()];
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    date.setDate(1);
    return {'year': date.getFullYear(), 'month': month, 'monthE': monthE, 'monthE3': month.slice(0, 3),'date': day, 'dayJ': dayOfWeekJ, 'dayE': dayOfWeekE + 'day', 'dayE3': dayOfWeekE.slice(0, 3), 'dayJF': dayOfWeeksJ[date.getDay()], 'allHdayJ': date.getFullYear() + '-' + month + '-' + day + '-' + dayOfWeekJ, 'allSdayE3': date.getFullYear() + '/' + month + '/' + day + '/' + dayOfWeekE.slice(0, 3), 'yearMonthH': date.getFullYear() + '-' + month, 'monthDateS': month + '/' + day, 'yearMonthDateH': date.getFullYear() + '-' + month + '-' + day, 'monthDateH': month + '-' + day};
  }
  else{
    if(setItem === 'month'){
    	date.setDate(1);
      date.setMonth(date.getMonth() + nowDate);
      var monthE = monthsE[date.getMonth()];
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      return {'month': month, 'monthE': monthE, 'monthE3': month.slice(0, 3), 'yearMonthH': date.getFullYear() + '-' + month};
    }
    else if(setItem === 'date'){
      date.setDate(date.getDate() + nowDate);
      return ("0" + date.getDate()).slice(-2);
    }
    else if(setItem === 'day'){
      date.setDate(date.getDate() + nowDate);
      var dayOfWeekJ = dayOfWeeksJ[date.getDay()];
      var dayOfWeekE = dayOfWeeksE[date.getDay()];
      return {'dayJ': dayOfWeekJ, 'dayE': dayOfWeekE + 'day', 'dayE3': dayOfWeekE.slice(0, 3)};
    }
    else{
      date.setDate(date.getDate() + nowDate);
      var dayOfWeekJ = dayOfWeeksJ[date.getDay()];
      var dayOfWeekE = dayOfWeeksE[date.getDay()];
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return {'allHdayJ': date.getFullYear() + '-' + month + '-' + day + '-' + dayOfWeekJ, 'allSdayE3': date.getFullYear() + '/' + month + '/' + day + '/' + dayOfWeekE.slice(0, 3), 'monthDateS': month + '/' + day, 'yearMonthDateH': date.getFullYear() + '-' + month + '-' + day, 'monthDateH': month + '-' + day};
    }
  }
}
