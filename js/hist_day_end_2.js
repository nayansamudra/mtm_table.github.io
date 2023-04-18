// Strategy MTM function
function MTM_strategy() {
  // strategy_mtm (ALL DATA) and strategy_mtm_1 (UNDEFINED REMOVED) also removing number value only array is accepted
  for (var j = 0; j < Hist_DayEnd.length; j++) {
    var text = Hist_DayEnd[j][0]
    var key = text;
    if (JSON.parse(Hist_DayEnd[j][1])['update1']['strategy_mtm'] != undefined) {
      var a = Object.values(JSON.parse(Hist_DayEnd[j][1])['update1']['strategy_mtm'])[0]
      if (Array.isArray(a)) {
        var value_1 = JSON.parse(Hist_DayEnd[j][1])['update1']['strategy_mtm']
        strategy_mtm_1[key] = value_1;
      }
    }
  }

  // Removing Duplicate days
  var key = Object.keys(strategy_mtm_1)[0]
  var values = Object.values(strategy_mtm_1)[0]
  strategy_mtm_2[key] = values
  var text = moment(key * 1000).format('dddd')
  if (text == "Monday") { Monday[key] = values }
  else if (text == "Tuesday") { Tuesday[key] = values }
  else if (text == "Wednesday") { Wednesday[key] = values }
  else if (text == "Thursday") { Thursday[key] = values }
  else if (text == "Friday") { Friday[key] = values }
  for (var i = 1; i < Object.keys(strategy_mtm_1).length; i++) {
    var currentArray = Object.values(strategy_mtm_1)[i]
    var compareArray = Object.values(strategy_mtm_1)[i - 1]
    var key = Object.keys(strategy_mtm_1)[i]
    var values = Object.values(strategy_mtm_1)[i]
    strategy_mtm_2[key] = values
    if (JSON.stringify(currentArray) === JSON.stringify(compareArray)) {
      delete strategy_mtm_2[key]
    }
    var text = moment(Object.keys(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1] * 1000).format('dddd')
    if (text == "Monday") { Monday[Object.keys(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1]] = Object.values(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1] }
    else if (text == "Tuesday") { Tuesday[Object.keys(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1]] = Object.values(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1] }
    else if (text == "Wednesday") { Wednesday[Object.keys(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1]] = Object.values(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1] }
    else if (text == "Thursday") { Thursday[Object.keys(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1]] = Object.values(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1] }
    else if (text == "Friday") { Friday[Object.keys(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1]] = Object.values(strategy_mtm_2)[Object.values(strategy_mtm_2).length - 1] }
  }
}

// All strategy
function All_Strategy() {
  mergedArray = Object.keys(Object.values(strategy_mtm_2)[0])
  for (var i = 1; i < Object.keys(strategy_mtm_2).length; i++) {
    var firstArray = Object.keys(Object.values(strategy_mtm_2)[i])
    $.merge(mergedArray, firstArray);
  }
  mergedArray.sort()
  $.unique(mergedArray);
  strategy_array = mergedArray
}

function weekday_addition() {
  All_WeekDay_1 = []
  weekday_mon = {}
  weekday_tue = {}
  weekday_wed = {}
  weekday_thu = {}
  weekday_fri = {}
  for (var i = 0; i < strategy_array.length; i++) {
    sum_m = 0
    sum_tu = 0
    sum_w = 0
    sum_th = 0
    sum_f = 0
    var strategy = strategy_array[i]
    for (var j = 0; j < Object.values(strategy_mtm_2).length; j++) {
      var key = Object.keys(strategy_mtm_2)[j]
      day_1 = moment(key * 1000).format('dddd')
      var myObject = Object.values(strategy_mtm_2)[j]
      if (myObject.hasOwnProperty(strategy)) {
        var value = myObject[strategy][0];
      }
      else {
        var value = 0
      }
      if (day_1 == "Monday") {
        sum_m += value
        weekday_mon[strategy_array[i]] = sum_m;
      }
      else if (day_1 == "Tuesday") {
        sum_tu += value
        weekday_tue[strategy_array[i]] = sum_tu;
      }
      else if (day_1 == "Wednesday") {
        sum_w += value
        weekday_wed[strategy_array[i]] = sum_w;
      }
      else if (day_1 == "Thursday") {
        sum_th += value
        weekday_thu[strategy_array[i]] = sum_th;
      }
      else if (day_1 == "Friday") {
        sum_f += value
        weekday_fri[strategy_array[i]] = sum_f;
      }
    }
  }
  All_WeekDay_1.push(weekday_mon)
  All_WeekDay_1.push(weekday_tue)
  All_WeekDay_1.push(weekday_wed)
  All_WeekDay_1.push(weekday_thu)
  All_WeekDay_1.push(weekday_fri)
}

// Printing Data to table
function Printing_to_table() {
  // Printing Monday Data
  var table1 = document.getElementById('Hist_DayEnd_Data')
  for (var j = 0; j < strategy_array.length; j++) {
    var temp = Object.values(All_WeekDay_1[0])[j] + Object.values(All_WeekDay_1[1])[j] + Object.values(All_WeekDay_1[2])[j] + Object.values(All_WeekDay_1[3])[j] + Object.values(All_WeekDay_1[4])[j];
    var row = `<td>&nbsp;${Object.keys(All_WeekDay_1[0])[j]}</td>
               <td>${Object.values(All_WeekDay_1[0])[j]}</td>
               <td>${Object.values(All_WeekDay_1[1])[j]}</td>
               <td>${Object.values(All_WeekDay_1[2])[j]}</td>
               <td>${Object.values(All_WeekDay_1[3])[j]}</td>
               <td>${Object.values(All_WeekDay_1[4])[j]}</td>
               <td>${temp}</td>`
    table1.innerHTML += row
  }

  var table = $('#Hist_DayEnd_Data');
  var newRow = $('<tr>').attr('id', 'totalRow');
  newRow.append($('<th>').text('TOTAL'));
  for (var i = 1; i <= 6; i++) {
    var total = 0;
    // Loop through each row and calculate the sum of the numbers in the current column
    table.find('tr').each(function () {
      var column = $(this).find('td:eq(' + i + ')');
      total += parseFloat(column.text());
    });
    // Create a new cell in the "TOTAL" row with the calculated sum
    newRow.append($('<td>').text(total));
  }
  // Append the "TOTAL" row to the table
  table.append(newRow);

  $("#Hist_DayEnd_Data tr:not(:last)").each(function () {
    // Get the value of the number columns
    var num1 = parseFloat($(this).find("td:eq(1)").text());
    var num2 = parseFloat($(this).find("td:eq(2)").text());
    var num3 = parseFloat($(this).find("td:eq(3)").text());
    var num4 = parseFloat($(this).find("td:eq(4)").text());
    var num5 = parseFloat($(this).find("td:eq(5)").text());
    var num6 = parseFloat($(this).find("td:eq(6)").text());

    // Apply styles to number columns based on their values
    if (num1 < 0) {
      $(this).find("td:eq(1)").css({
        "text-align": "right",
        "background-color": "#fec7d5",
        "color": "#823d44"
      });
    } else {
      $(this).find("td:eq(1)").css({
        "text-align": "right",
        "background-color": "#c7efcd",
        "color": "#276227"
      });
    }

    if (num2 < 0) {
      $(this).find("td:eq(2)").css({
        "text-align": "right",
        "background-color": "#fec7d5",
        "color": "#823d44"
      });
    } else {
      $(this).find("td:eq(2)").css({
        "text-align": "right",
        "background-color": "#c7efcd",
        "color": "#276227"
      });
    }

    if (num3 < 0) {
      $(this).find("td:eq(3)").css({
        "text-align": "right",
        "background-color": "#fec7d5",
        "color": "#823d44"
      });
    } else {
      $(this).find("td:eq(3)").css({
        "text-align": "right",
        "background-color": "#c7efcd",
        "color": "#276227"
      });
    }

    if (num4 < 0) {
      $(this).find("td:eq(4)").css({
        "text-align": "right",
        "background-color": "#fec7d5",
        "color": "#823d44"
      });
    } else {
      $(this).find("td:eq(4)").css({
        "text-align": "right",
        "background-color": "#c7efcd",
        "color": "#276227"
      });
    }

    if (num5 < 0) {
      $(this).find("td:eq(5)").css({
        "text-align": "right",
        "background-color": "#fec7d5",
        "color": "#823d44"
      });
    } else {
      $(this).find("td:eq(5)").css({
        "text-align": "right",
        "background-color": "#c7efcd",
        "color": "#276227"
      });
    }

    if (num6 < 0) {
      $(this).find("td:eq(6)").css({
        "text-align": "right",
        "background-color": "#fec7d5",
        "color": "#823d44"
      });
    } else {
      $(this).find("td:eq(6)").css({
        "text-align": "right",
        "background-color": "#c7efcd",
        "color": "#276227"
      });
    }
  });

  $('#totalRow').css('background-color', '#fcd5b4')
  $('#totalRow td').css('text-align', 'right')
}

// Right Table Heading
function Right_Table_Heading() {
  var keys = Object.keys(strategy_mtm_2);
  var thead = $("<thead></thead>");
  var headerRow = $("<tr></tr>");
  for (var i = 0; i < keys.length; i++) {
    var th = $("<th class='timestamp'></th>").text(moment(keys[i] * 1000).format('DD-MMM, ddd'));
    headerRow.append(th);
  }
  thead.append(headerRow);
  $("#Hist_Daily_table").prepend(thead);
}

// Right Table Data 
function Right_Table_Data() {
  var table1 = document.getElementById('Hist_Daily_Data')
  for (var i = 0; i < strategy_array.length; i++) {
    var key = strategy_array[i];
    var headerRow = $("<tr></tr>");
    for (var j = 0; j < Object.values(strategy_mtm_2).length; j++) {
      var myDict = Object.values(strategy_mtm_2)[j];
      if (myDict.hasOwnProperty(key)) {
        Right_Table_Data_Array.push(myDict[key][0])
      } else {
        Right_Table_Data_Array.push(0)
      }

      if (parseFloat(Right_Table_Data_Array[j]) >= 0) {
        var th = $("<td style='text-align:right;background-color:#c7efcd;color:#276227'></td>").text(Right_Table_Data_Array[j]);
      }
      else {
        var th = $("<td style='text-align:right;background-color:#fec7d5;color:#823d44'></td>").text(Right_Table_Data_Array[j]);
      }
      headerRow.append(th);
    }
    table1.append(headerRow[0])
    Final_Right_Table_Data_Array.push(Right_Table_Data_Array)
    Right_Table_Data_Array = []
  }

  var table = $('#Hist_Daily_Data');
  var newRow = $('<tr>').attr('class', 'totalRow');
  for (var i = 0; i < Final_Right_Table_Data_Array[0].length; i++) {
    var total = 0;
    // Loop through each row and calculate the sum of the numbers in the current column
    table.find('tr').each(function () {
      var column = $(this).find('td:eq(' + i + ')');
      total += parseFloat(column.text());
    });
    // Create a new cell in the "TOTAL" row with the calculated sum
    newRow.append($('<td>').text(total));
  }
  // Append the "TOTAL" row to the table
  table.append(newRow);

  $('.totalRow').css('background-color', '#fcd5b4')
  $('.totalRow td').css('text-align', 'right')
}



$(document).ready(function () {

  $.ajaxSetup({ async: false }); // to stop async
  
  console.log = function () { };

  // root = 'https://stats.tradingcafeindia.in'
  root = 'https://nayansamudra.github.io/mtm_table.github.io/hist_dayend.txt'
  route_fetch_hist_dayend = '/api/fetch_hist_dayend'

  // $.get(root + route_fetch_hist_dayend, function (data, status) {
  $.get(root, function (data, status) {
    Hist_DayEnd = JSON.parse(data)
    console.log(Hist_DayEnd)
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  Monday = {}
  Tuesday = {}
  Wednesday = {}
  Thursday = {}
  Friday = {}

  strategy_mtm = {}
  strategy_mtm_1 = {}
  strategy_mtm_2 = {}

  week_day_table = {}
  All_WeekDay = []
  Right_Table_Data_Array = []
  Final_Right_Table_Data_Array = []

  MTM_strategy()
  All_Strategy()

  weekday_addition()
  Printing_to_table()

  Right_Table_Heading()
  Right_Table_Data()
})