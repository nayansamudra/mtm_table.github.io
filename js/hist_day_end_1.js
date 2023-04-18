// Strategy MTM function
function MTM_strategy() {
  // strategy_mtm (ALL DATA) and strategy_mtm_1 (UNDEFINED REMOVED)
  for (var j = 0; j < Hist_DayEnd.length; j++) {
    var text = Hist_DayEnd[j][0]
    var key = text;
    var value = Hist_DayEnd[j][1]
    strategy_mtm[key] = value;
    if (JSON.parse(Hist_DayEnd[j][1])['update1']['strategy_mtm'] != undefined) {
      var value_1 = Hist_DayEnd[j][1]
      strategy_mtm_1[key] = value_1;
    }
  }

  // strategy_mtm_2 (INTERGER REMOVED ONLY ARRAY VALUE KEPT)
  for (var j = 0; j < Object.keys(strategy_mtm_1).length; j++) {
    var tex = Object.keys(strategy_mtm_1)[j]
    var key = tex;
    var a = Object.values(Object.values(JSON.parse(Object.values(strategy_mtm_1)[j]))[0]['strategy_mtm'])[0]
    if (Array.isArray(a)) {
      var value_2 = Object.values(strategy_mtm_1)[j]
      strategy_mtm_2[key] = value_2;
    }
  }

  // Removing Duplicate days
  var key = Object.keys(strategy_mtm_2)[0]
  var values = Object.values(strategy_mtm_2)[0]
  strategy_mtm_3[key] = values
  for (var i = 1; i < Object.keys(strategy_mtm_2).length; i++) {
    var currentArray = Object.values(JSON.parse(Object.values(strategy_mtm_2)[i])['update1']['strategy_mtm'])
    var compareArray = Object.values(JSON.parse(Object.values(strategy_mtm_2)[i-1])['update1']['strategy_mtm'])
    var key = Object.keys(strategy_mtm_2)[i]
    var values = Object.values(strategy_mtm_2)[i]
    strategy_mtm_3[key] = values
    if (JSON.stringify(currentArray) === JSON.stringify(compareArray)) {
      delete strategy_mtm_3[key]
    }
  }
  strategy_mtm_2 = strategy_mtm_3

  // strategy_mtm_2 split ino Week Days
  for (var j = 0; j < Object.keys(strategy_mtm_2).length; j++) {
    var tex = Object.keys(strategy_mtm_1)[j]
    var key = tex;
    var text = moment(Object.keys(strategy_mtm_2)[j] * 1000).format('dddd')
    if (text == "Monday") { Monday[key] = Object.values(strategy_mtm_2)[j] }
    else if (text == "Tuesday") { Tuesday[key] = Object.values(strategy_mtm_2)[j] }
    else if (text == "Wednesday") { Wednesday[key] = Object.values(strategy_mtm_2)[j] }
    else if (text == "Thursday") { Thursday[key] = Object.values(strategy_mtm_2)[j] }
    else if (text == "Friday") { Friday[key] = Object.values(strategy_mtm_2)[j] }
  }
}

// Merging all the day strategy into one
function mergeArrays(arr) {
  var mergedArray = [];
  $.each(arr, function (index, subArray) {
    $.each(subArray, function (index, element) {
      if ($.inArray(element, mergedArray) === -1) {
        mergedArray.push(element);
      }
    });
  });
  return mergedArray;
}

// Week Day Strategy
function weekday_strategy() {
  // Printing Monday Strategy
  allValues_Mon = []
  for (var j = 0; j < Object.values(Monday).length; j++) {
    allValues_Mon.push(Object.keys(JSON.parse(Object.values(Monday)[j])['update1']['strategy_mtm']))
  }
  mergedArray_Mon = mergeArrays(allValues_Mon);

  // Printing Tuesday Strategy
  allValues_Tue = []
  for (var j = 0; j < Object.values(Tuesday).length; j++) {
    allValues_Tue.push(Object.keys(JSON.parse(Object.values(Tuesday)[j])['update1']['strategy_mtm']))
  }
  mergedArray_Tue = mergeArrays(allValues_Tue);

  // Printing Wednesday Strategy
  allValues_Wed = []
  for (var j = 0; j < Object.values(Wednesday).length; j++) {
    allValues_Wed.push(Object.keys(JSON.parse(Object.values(Wednesday)[j])['update1']['strategy_mtm']))
  }
  mergedArray_Wed = mergeArrays(allValues_Wed);

  // Printing Thursday Strategy
  allValues_Thu = []
  for (var j = 0; j < Object.values(Thursday).length; j++) {
    allValues_Thu.push(Object.keys(JSON.parse(Object.values(Thursday)[j])['update1']['strategy_mtm']))
  }
  mergedArray_Thu = mergeArrays(allValues_Thu);

  // Printing Friday Strategy
  allValues_Fri = []
  for (var j = 0; j < Object.values(Friday).length; j++) {
    allValues_Fri.push(Object.keys(JSON.parse(Object.values(Friday)[j])['update1']['strategy_mtm']))
  }
  mergedArray_Fri = mergeArrays(allValues_Fri);
}

// All strategy
function All_Strategy() {
  allValues = []
  allValues.push(mergedArray_Mon)
  allValues.push(mergedArray_Tue)
  allValues.push(mergedArray_Wed)
  allValues.push(mergedArray_Thu)
  allValues.push(mergedArray_Fri)
  strategy_array = mergeArrays(allValues);
  strategy_array.sort()
}

// Addition function of week days
function addition_week_day(day) {
  for (var i = 0; i < strategy_array.length; i++) {
    sum = 0
    var strategy = strategy_array[i]
    for (var j = 0; j < Object.values(day).length; j++) {
      var myObject = JSON.parse(Object.values(day)[j])['update1']['strategy_mtm']
      if (myObject.hasOwnProperty(strategy)) {
        // Access the value of the key using the keyToAccess variable
        var value = myObject[strategy][0];
      }
      else {
        var value = 0
      }
      sum += value
    }
    week_day_table[strategy_array[i]] = sum;
  }
  All_WeekDay.push(week_day_table)
  week_day_table = {}
}

// Printing Data to table
function Printing_to_table() {
  // Printing Monday Data
  var table1 = document.getElementById('Hist_DayEnd_Data')
  for (var j = 0; j < strategy_array.length; j++) {
    var temp = Object.values(All_WeekDay[0])[j] + Object.values(All_WeekDay[1])[j] + Object.values(All_WeekDay[2])[j] + Object.values(All_WeekDay[3])[j] + Object.values(All_WeekDay[4])[j];
    var row = `<td>&nbsp;${Object.keys(All_WeekDay[0])[j]}</td>
               <td>${Object.values(All_WeekDay[0])[j]}</td>
               <td>${Object.values(All_WeekDay[1])[j]}</td>
               <td>${Object.values(All_WeekDay[2])[j]}</td>
               <td>${Object.values(All_WeekDay[3])[j]}</td>
               <td>${Object.values(All_WeekDay[4])[j]}</td>
               <td>${temp}</td>`
    table1.innerHTML += row
  }

  var table = $('#Hist_DayEnd_Data');
  var newRow = $('<tr>').attr('id', 'totalRow');
  newRow.append($('<th>').text('  T OTAL'));
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
  for (var i = 0; i < strategy_array.length; i++) {
    var key = strategy_array[i];
    for (var j = 0; j < Object.values(strategy_mtm_2).length; j++) {
      var myDict = JSON.parse(Object.values(strategy_mtm_2)[j])['update1']['strategy_mtm'];
      if (myDict.hasOwnProperty(key)) {
        Right_Table_Data_Array.push(myDict[key][0])
      } else {
        Right_Table_Data_Array.push(0)
      }
    }
    Final_Right_Table_Data_Array.push(Right_Table_Data_Array)
    Right_Table_Data_Array = []
  }

  var table1 = document.getElementById('Hist_Daily_Data')
  for (var j = 0; j < Final_Right_Table_Data_Array.length; j++) {
    var headerRow = $("<tr></tr>");
    for (var i = 0; i < Final_Right_Table_Data_Array[0].length; i++) {
      if (parseFloat(Final_Right_Table_Data_Array[j][i]) >= 0) {
        var th = $("<td style='text-align:right;background-color:#c7efcd;color:#276227'></td>").text(Final_Right_Table_Data_Array[j][i]);
      }
      else {
        var th = $("<td style='text-align:right;background-color:#fec7d5;color:#823d44'></td>").text(Final_Right_Table_Data_Array[j][i]);
      }
      headerRow.append(th);
    }
    table1.append(headerRow[0])
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

  // console.log = function () { };

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
  strategy_mtm_3 = {}

  week_day_table = {}
  All_WeekDay = []
  Right_Table_Data_Array = []
  Final_Right_Table_Data_Array = []

  MTM_strategy()
  weekday_strategy()
  All_Strategy()

  addition_week_day(Monday)
  addition_week_day(Tuesday)
  addition_week_day(Wednesday)
  addition_week_day(Thursday)
  addition_week_day(Friday)

  Printing_to_table()

  Right_Table_Heading()
  Right_Table_Data()
})