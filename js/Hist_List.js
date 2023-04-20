all_position_right_table = () => {
  if (API_data != undefined && Object.keys(API_data['all_position']).length != 0) {
    position_table = []
    all_position = API_data['all_position']
    $('#RightTable_Data').empty()
    for (var j = 0; j < all_position.length; j++) {
      if (all_position[j]['ticker'][0] == 'B') { col_1 = 'BN' } else if (all_position[j]['ticker'][0] == 'N') { col_1 = 'N' }
      position_table.push([col_1, all_position[j]['ticker'].substr(all_position[j]['ticker'].length - 7, 5), all_position[j]['ticker'].substr(all_position[j]['ticker'].length - 2, 2), parseFloat(all_position[j]['lastPrice']).toFixed(2), all_position[j]['netQuantity'], parseFloat(all_position[j]['sell_avg']).toFixed(2), parseFloat(all_position[j]['pnl']).toFixed(2)])
    }
    if (counter_for_all_position_datatable == 0) {
      counter_for_all_position_datatable += 1
      datatable = $("#Righttable_all_position").DataTable({
        data: position_table,
        "columnDefs": [{ targets: [0, 1, 2,], className: 'dt-body-start' },
        { targets: [4], className: 'dt-body-center' },
        { targets: [3, 5, 6], className: 'dt-body-right' },
        { targets: [0, 1, 2], width: '1px' }
        ],
        "fnRowCallback": function (nRow, aData) {
          if (aData[4] == 0) {
            $('td', nRow).css('background-color', '#dcdcdc');
          }

          if (aData[6] > 0) {
            $('td:eq(6)', nRow).html('<span style=color:green>' + aData[6] + '</span>');
          }
          else {
            $('td:eq(6)', nRow).html('<span style=color:red>' + aData[6] + '</span>');
          }
        },
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: true,
        order: [[1, 'asc']],
        searching: true,
        "dom": '<"pull-left"f><"pull-right"l>tip'
      });
    }
    else if (counter_for_all_position_datatable > 0) {
      console.log("Data is updating")
      datatable.clear();
      datatable.rows.add(position_table);
      datatable.draw();
    }
  }
}

net_position_right_table = () => {
  if (API_data != undefined && Object.keys(API_data['all_position']).length != 0) {
    net_position_table = []
    all_position = API_data['all_position']
    $('#NetTable_Data').empty()
    CE_Long = CE_Short = CE_All = PE_Long = PE_Short = PE_All = Net_Long = Net_Short = Net_All = 0
    for (var i = 0; i < position_table.length; i++) {
      if (position_table[i][2] == 'CE') {
        if (position_table[i][4] > 0) {
          CE_Long = CE_Long + position_table[i][4]
        } else if (position_table[i][4] < 0) {
          CE_Short = CE_Short + position_table[i][4]
        }
      } else if (position_table[i][2] == 'PE') {
        if (position_table[i][4] > 0) {
          PE_Long = PE_Long + position_table[i][4]
        } else if (position_table[i][4] < 0) {
          PE_Short = PE_Short + position_table[i][4]
        }
      }
    }
    CE_All = CE_Long + CE_Short
    PE_All = PE_Long + PE_Short

    if (Math.abs(CE_Long) > Math.abs(PE_Long)) { Net_Long = (CE_Long - PE_Long) + ' CE' }
    else if (Math.abs(CE_Long) < Math.abs(PE_Long)) { Net_Long = (PE_Long - CE_Long) + ' PE' }

    if (Math.abs(CE_Short) > Math.abs(PE_Short)) { Net_Short = (CE_Short - PE_Short) + ' CE' }
    else if (Math.abs(CE_Short) < Math.abs(PE_Short)) { Net_Short = (PE_Short - CE_Short) + ' PE' }

    if (Math.abs(CE_All) > Math.abs(PE_All)) { Net_All = (CE_All - PE_All) + ' CE' }
    else if (Math.abs(CE_All) < Math.abs(PE_All)) { Net_All = (PE_All - CE_All) + ' PE' }

    net_position_table.push(['All', CE_All, PE_All, Net_All], ['Longs', CE_Long, PE_Long, Net_Long], ['Shorts', CE_Short, PE_Short, Net_Short])

    if (counter_for_net_position_datatable == 0) {
      counter_for_net_position_datatable += 1
      datatable_5 = $("#Nettable_all_position").DataTable({
        data: net_position_table,
        "columnDefs": [{ targets: [0], className: 'dt-body-start' },
        { targets: [1, 2, 3], className: 'dt-body-right' },
        ],
        "fnRowCallback": function (nRow, aData) {
          if (aData[1] > 0) {
            $('td:eq(1)', nRow).html('<span style=color:green>' + aData[1] + '</span>');
          }
          else {
            $('td:eq(1)', nRow).html('<span style=color:red>' + aData[1] + '</span>');
          }

          if (aData[2] > 0) {
            $('td:eq(2)', nRow).html('<span style=color:green>' + aData[2] + '</span>');
          }
          else {
            $('td:eq(2)', nRow).html('<span style=color:red>' + aData[2] + '</span>');
          }

          if (parseFloat(aData[3]) > 0) {
            $('td:eq(3)', nRow).html('<span style=color:green>' + aData[3] + '</span>');
          }
          else {
            $('td:eq(3)', nRow).html('<span style=color:red>' + aData[3] + '</span>');
          }
        },
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: true,
        order: [[0, 'asc']],
        searching: true,
        "dom": '<"pull-left"f><"pull-right"l>tip'
      });
    }
    else if (counter_for_net_position_datatable > 0) {
      console.log("Data is updating")
      datatable_5.clear();
      datatable_5.rows.add(net_position_table);
      datatable_5.draw();
    }
  }
}

order_update_left_table = (param) => {
  if (API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
    order_updates = []
    if (param == 'ALL') {
      order_update = API_data['order_updates']
      len = Object.keys(API_data['order_updates'])
      $('#order_updates_Data').empty()
      for (var j = 0; j < len.length; j++) {
        for (var i = 0; i < order_update[len[j]].length; i++) {
          var text = order_update[len[j]][i][1]
          index = text.indexOf('\n') + 1
          text = text.substr(index, text.length)
          text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
          order_updates.push([len[j], moment(order_update[len[j]][i][0] * 1000).format('HH:mm:ss'), text])
        }
      }
    }
    else {
      order_update = API_data['order_updates'][param]
      $('#order_updates_Data').empty()
      for (var j = 0; j < order_update.length; j++) {
        var text = order_update[j][1]
        index = text.indexOf('\n') + 1
        text = text.substr(index, text.length)
        text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        order_updates.push([param, moment(order_update[j][0] * 1000).format('HH:mm:ss'), text])
      }
    }

    if (counter_for_order_update_datatable == 0) {
      counter_for_order_update_datatable += 1
      datatable_1 = $("#ChartDatatable_1").DataTable({
        data: order_updates,
        "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-start' },
        ],
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: true,
        order: [[1, 'desc']],
        searching: true,
        "dom": '<"pull-left"f><"pull-right"l>tip'
      });
    }
    else if (counter_for_order_update_datatable > 0) {
      datatable_1.clear();
      datatable_1.rows.add(order_updates);
      datatable_1.draw();
    }
  }
}

log_update_left_table = (param) => {
  if (API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
    log_table = []
    if (param == 'ALL') {
      console.log('u r inside all')
      log_update = API_data['log_update']
      len = Object.keys(API_data['log_update'])
      $('#log_updates_Data').empty()
      for (var j = 0; j < len.length; j++) {
        for (var i = 0; i < log_update[len[j]].length; i++) {
          var text = log_update[len[j]][i][1]
          text = text.substr(13, text.length)
          text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
          log_table.push([len[j], moment(log_update[len[j]][i][0] * 1000).format('HH:mm:ss'), text])
        }
      }
    }
    else {
      log_updates = API_data['log_update'][param]
      $('#log_updates_Data').empty()
      for (var j = 0; j < log_updates.length; j++) {
        var text = log_updates[j][1]
        text = text.substr(13, text.length)
        text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        log_table.push([param, moment(log_updates[j][0] * 1000).format('HH:mm:ss'), text])
      }
    }

    if (counter_for_log_update_datatable == 0) {
      counter_for_log_update_datatable += 1
      datatable_2 = $("#logDatatable_1").DataTable({
        data: log_table,
        "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-start' },
        ],
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: true,
        order: [[1, 'desc']],
        searching: true,
        "dom": '<"pull-left"f><"pull-right"l>tip'
      });
    }
    else if (counter_for_log_update_datatable > 0) {
      datatable_2.clear();
      datatable_2.rows.add(log_table);
      datatable_2.draw();
    }
  }
}

startegy_table_1 = () => {
  if (API_data != undefined) {
    temp_1 = 'strat'
    temp_2 = 'strategy_mtm'
    for (var i = 0; i < Object.keys(API_data).length; i++) {
      if (temp_1 == Object.keys(API_data)[i]) {
        console.log('Api has "strat"')
        final = temp_1
      }
    }

    for (var i = 0; i < Object.keys(API_data).length; i++) {
      if (temp_2 == Object.keys(API_data)[i]) {
        console.log('Api has "strategy_mtm"')
        final = temp_2
      }
    }

    if (Object.keys(API_data[final]).length != 0) {
      startegy_table = []
      strategy = API_data[final]
      name_key = Object.keys(strategy)
      mtm_value = Object.values(strategy)
      $('#strategy_Table_Data').empty()
      for (var j = 0; j < name_key.length; j++) {
        startegy_table.push([name_key[j], parseFloat(mtm_value[j][0]), parseFloat(mtm_value[j][1])])
      }
      if (counter_for_startegy_table == 0) {
        counter_for_startegy_table += 1
        console.log('u entered in if part')
        datatable_4 = $("#strategyTable_1").DataTable({
          data: startegy_table,
          "columnDefs": [{ targets: [0], className: 'dt-body-center' },
          { targets: [1], className: 'dt-body-right' },
          ],
          "fnRowCallback": function (nRow, aData) {
            if (aData[2] == 0) {
              $('td', nRow).css('background-color', '#dcdcdc');
            }

            if (aData[1] > 0) {
              $('td:eq(1)', nRow).html('<span style=color:green>' + aData[1] + '</span>');
            }
            else {
              $('td:eq(1)', nRow).html('<span style=color:red>' + aData[1] + '</span>');
            }
          },
          "autoWidth": false,
          paging: false,
          info: false,
          ordering: true,
          searching: true,
          "dom": '<"pull-left"f><"pull-right"l>tip'
        });
        datatable_4.column(2).visible(false);
      }
      else if (counter_for_all_position_datatable > 0) {
        console.log("Data is updating")
        datatable_4.clear();
        datatable_4.rows.add(startegy_table);
        datatable_4.draw();
      }
    }
  }
}

$(document).ready(function () {

  $.ajaxSetup({ async: false }); // to stop async

  console.log = function () { };

  root = 'https://stats.tradingcafeindia.in'
  route_hist_list = '/api/hist_list'
  route_fetch_hist_list = '/api/fetch_hist_list'

  $.get(root + route_hist_list, function (data, status) {
    Hist_List = data
    console.log(Hist_List)
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  $.get(root + route_fetch_hist_list, { 'timestamp': Hist_List[Hist_List.length - 1][0] }, function (data, status) {
    Fetch_Hist_List = data
    console.log(Fetch_Hist_List)
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  API_data = JSON.parse(Fetch_Hist_List[0][1])['update1'] // BY DEFAULT
  console.log(API_data)

  counter_for_log_update_dropdown = counter_for_order_update_dropdown = counter_for_date_dropdown = counter_for_dayend_date_dropdown = 0
  counter_for_log_update_datatable = counter_for_order_update_datatable = counter_for_all_position_datatable = counter_for_net_position_datatable = counter_for_startegy_table = 0
  counter_for_log_update_function_call = counter_for_order_update_function_call = 0
  DayEnd_Date = []

  all_position_right_table()
  net_position_right_table()
  order_update_left_table('ALL')

  if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
    counter_for_order_update_dropdown += 1
    var table1 = document.getElementById('order_update_option')
    var len = Object.keys(API_data['order_updates'])
    table1.innerHTML += row
    for (var j = 0; j < len.length; j++) {
      var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
      table1.innerHTML += row
    }
  }

  if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
    counter_for_log_update_dropdown += 1
    var table1 = document.getElementById('log_update_option')
    var len = Object.keys(API_data['log_update'])
    for (var j = 0; j < len.length; j++) {
      var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
      table1.innerHTML += row
    }
  }

  if (counter_for_date_dropdown == 0 && API_data != undefined && Hist_List.length != 0) {
    counter_for_date_dropdown += 1
    var table1 = document.getElementById('Date_option')
    for (var j = (Hist_List.length - 1); j >= 0; j--) {
      var text = moment(Hist_List[j] * 1000).format('DD-MM-YYYY, HH:mm:ss')
      var row = `<option id="${j}_log_update" value="${text}">${text}</option>`
      table1.innerHTML += row
    }
  }

  if (counter_for_dayend_date_dropdown == 0 && API_data != undefined && Hist_List.length != 0) {
    counter_for_dayend_date_dropdown += 1
    var table1 = document.getElementById('Particular_Date_option')
    for (var j = (Hist_List.length - 1); j >= 0; j--) {
      var text = moment(Hist_List[j] * 1000).format('HH:mm:ss')
      var text_1 = moment(Hist_List[j] * 1000).format('DD-MM-YYYY, HH:mm:ss')
      if (text == '15:30:00') {
        DayEnd_Date.push(Hist_List[j])
        var row = `<option id="${Hist_List[j]}" value="${text_1}">${text_1}</option>`
        table1.innerHTML += row
      }
    }
  }

  $('#Account_option').change(() => {
    $('#RightTable_Data').empty()
    $('#NetTable_Data').empty()
    $('#strategy_Table_Data').empty()
    $('#log_updates_Data').empty()
    $('#order_updates_Data').empty()
    $('#BankNifty').text('')
    $('#Nifty').text('')
    $('#percentage_pnl').text('')
    $('#Live_MTM').text('')
    $('#Radio_1').prop("checked", true)
    $('#Radio_2').prop("checked", false)
    $('#Radio_3').prop("checked", false)
    counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0
    let Account_option = $('#Account_option').val()
    if (Account_option == 'Account_no_1') {

      API_data = JSON.parse(Fetch_Hist_List[0][1])['update1']

      $('#Date_option').val(moment(Hist_List[Hist_List.length - 1] * 1000).format('DD-MM-YYYY, HH:mm:ss'))
      $('#Particular_Date_option').val(moment(DayEnd_Date[DayEnd_Date.length - 1] * 1000).format('DD-MM-YYYY, HH:mm:ss'))

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      $('#Radio_1').click()
      // order_update_left_table('ALL')
      all_position_right_table()
      net_position_right_table()

      if ($(document).width() < 975) {
        if ($('#flexSwitchCheckChecked').is(":checked")) {
          $('#Table_2_Column').show()
          $('#ChartDatatable_container').hide()
        }
        else {
          $('#flexSwitchCheckChecked').prop('checked', true)
          console.log('checked')
          $('#Table_2_Column').show()
          $('#ChartDatatable_container').hide()
        }
      }
      else {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').show()
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_1(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }

      addData_1(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
    else if (Account_option == 'Account_no_2') {

      API_data = JSON.parse(Fetch_Hist_List[0][1])['update2']

      $('#Date_option').val(moment(Hist_List[Hist_List.length - 1] * 1000).format('DD-MM-YYYY, HH:mm:ss'))
      $('#Particular_Date_option').val(moment(DayEnd_Date[DayEnd_Date.length - 1] * 1000).format('DD-MM-YYYY, HH:mm:ss'))

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      $('#Radio_1').click()
      // order_update_left_table('ALL')
      all_position_right_table()
      net_position_right_table()

      if ($(document).width() < 975) {
        if ($('#flexSwitchCheckChecked').is(":checked")) {
          $('#Table_2_Column').show()
          $('#ChartDatatable_container').hide()
        }
        else {
          $('#flexSwitchCheckChecked').prop('checked', true)
          console.log('checked')
          $('#Table_2_Column').show()
          $('#ChartDatatable_container').hide()
        }
      }
      else {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').show()
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_2(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }

      addData_2(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
    else if (Account_option == 'Account_no_3') {

      API_data = JSON.parse(Fetch_Hist_List[0][1])['update3']

      $('#Date_option').val(moment(Hist_List[Hist_List.length - 1] * 1000).format('DD-MM-YYYY, HH:mm:ss'))
      $('#Particular_Date_option').val(moment(DayEnd_Date[DayEnd_Date.length - 1] * 1000).format('DD-MM-YYYY, HH:mm:ss'))

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      $('#Radio_1').click()
      // order_update_left_table('ALL')
      all_position_right_table()
      net_position_right_table()

      if ($(document).width() < 975) {
        if ($('#flexSwitchCheckChecked').is(":checked")) {
          $('#Table_2_Column').show()
          $('#ChartDatatable_container').hide()
        }
        else {
          $('#flexSwitchCheckChecked').prop('checked', true)
          console.log('checked')
          $('#Table_2_Column').show()
          $('#ChartDatatable_container').hide()
        }
      }
      else {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').show()
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_9(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }

      addData_9(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
  })

  $('#Radio_1').click(() => {
    $('#order_update').show()
    $('#log_update').hide()
    $('#Strategy').hide()
    order_update_left_table('ALL')
    $('#order_update_option').val('ALL')
  })
  $('#Radio_2').click(() => {
    $('#order_update').hide()
    $('#log_update').show()
    $('#Strategy').hide()
    log_update_left_table('ALL')
    $('#log_update_option').val('ALL')
  })
  $('#Radio_3').click(() => {
    $('#order_update').hide()
    $('#log_update').hide()
    $('#Strategy').show()
    startegy_table_1()
  })

  $('#log_update_option').change(() => {
    let log_update_option = $('#log_update_option').val()
    log_update_left_table(log_update_option)
  })
  $('#order_update_option').change(() => {
    let order_update_option = $('#order_update_option').val()
    order_update_left_table(order_update_option)
  })
  $('#Date_option').change(() => {

    Date_option = $('#Date_option').val()
    console.log("Date_option", Date_option)

    // To get the timestamp from the date
    for (var i = 0; i < Hist_List.length; i++) {
      temp = Hist_List[i]
      let compare_date = moment(Hist_List[i] * 1000).format('DD-MM-YYYY, HH:mm:ss')
      console.log("compare_date", compare_date)
      if (Date_option == compare_date) {
        console.log("Timestamp = ", temp)
        parameter = temp
      }
    }

    $.get(root + route_fetch_hist_list, { 'timestamp': parameter[0] }, function (data, status) {
      Fetch_Hist_List = data
      console.log(Fetch_Hist_List)
    }).fail(function (response) {
      console.log('Error: ' + response);
    })

    $('#RightTable_Data').empty()
    $('#NetTable_Data').empty()
    $('#strategy_Table_Data').empty()
    $('#log_updates_Data').empty()
    $('#order_updates_Data').empty()
    $('#BankNifty').text('')
    $('#Nifty').text('')
    $('#percentage_pnl').text('')
    $('#Live_MTM').text('')
    $('#Radio_1').prop("checked", true)
    $('#Radio_2').prop("checked", false)
    $('#Radio_3').prop("checked", false)
  
    let Account_option = $('#Account_option').val()
    if (Account_option == 'Account_no_1') {
      API_data = JSON.parse(Fetch_Hist_List[0][1])['update1']
      // API_data = Fetch_Hist_List_for_particular_date[1]['update1']
      all_position_right_table()
      net_position_right_table()
      // order_update_left_table('ALL')
      $('#Radio_1').click()

      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_3(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }
      addData_3(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
    else if (Account_option == 'Account_no_2') {
      API_data = JSON.parse(Fetch_Hist_List[0][1])['update2']
      // API_data = Fetch_Hist_List_for_particular_date[1]['update2']
      all_position_right_table()
      net_position_right_table()
      // order_update_left_table('ALL')
      $('#Radio_1').click()

      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_4(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }
      addData_4(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
    else if (Account_option == 'Account_no_3') {
      API_data = JSON.parse(Fetch_Hist_List[0][1])['update3']
      // API_data = Fetch_Hist_List_for_particular_date[1]['update2']
      all_position_right_table()
      net_position_right_table()
      // order_update_left_table('ALL')
      $('#Radio_1').click()

      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_8(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }
      addData_8(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
  })

  $('#Particular_Date_option').change(() => {

    DayEnd_Date_option = $("#Particular_Date_option option:selected").attr('id');

    $.get(root + route_fetch_hist_list, { 'timestamp': DayEnd_Date_option }, function (data, status) {
      Fetch_Hist_List = data
      console.log(Fetch_Hist_List)
    }).fail(function (response) {
      console.log('Error: ' + response);
    })

    $('#RightTable_Data').empty()
    $('#NetTable_Data').empty()
    $('#strategy_Table_Data').empty()
    $('#log_updates_Data').empty()
    $('#order_updates_Data').empty()
    $('#BankNifty').text('')
    $('#Nifty').text('')
    $('#percentage_pnl').text('')
    $('#Live_MTM').text('')
    $('#Radio_1').prop("checked", true)
    $('#Radio_2').prop("checked", false)
    $('#Radio_3').prop("checked", false)

    let Account_option = $('#Account_option').val()
    if (Account_option == 'Account_no_1') {
      API_data = JSON.parse(Fetch_Hist_List[0][1])['update1']
      // API_data = Fetch_Hist_List_for_particular_date[1]['update1']
      all_position_right_table()
      net_position_right_table()
      // order_update_left_table('ALL')
      $('#Radio_1').click()

      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_5(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }
      addData_5(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
    else if (Account_option == 'Account_no_2') {
      API_data = JSON.parse(Fetch_Hist_List[0][1])['update2']
      // API_data = Fetch_Hist_List_for_particular_date[1]['update2']
      all_position_right_table()
      net_position_right_table()
      // order_update_left_table('ALL')
      $('#Radio_1').click()

      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_6(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }
      addData_6(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
    else if (Account_option == 'Account_no_3') {
      API_data = JSON.parse(Fetch_Hist_List[0][1])['update3']
      // API_data = Fetch_Hist_List_for_particular_date[1]['update2']
      all_position_right_table()
      net_position_right_table()
      // order_update_left_table('ALL')
      $('#Radio_1').click()

      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      if (counter_for_order_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['order_updates']).length != 0) {
        counter_for_order_update_dropdown += 1
        var table1 = document.getElementById('order_update_option')
        var len = Object.keys(API_data['order_updates'])
        table1.innerHTML += row
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      if (counter_for_log_update_dropdown == 0 && API_data != undefined && Object.keys(API_data['log_update']).length != 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }

      x_axis = []
      y_axis = []

      if (API_data != undefined && API_data['live_pnl'].length != 0) {
        for (var i = 0; i < API_data['live_pnl'].length; i++) {
          x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
          y_axis.push(Object.values(API_data['live_pnl'][i])[0])
          live_mtm = Object.values(API_data['live_pnl'][i])[0]
        }
      }

      if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
      if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
      if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
      if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
      if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

      function addData_7(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }
      addData_7(chart_1)

      if (parseFloat($('#Live_MTM').text()) > 0) {
        $('#Live_MTM').attr('style', 'color:green')
      }
      else if (parseFloat($('#Live_MTM').text()) < 0) {
        $('#Live_MTM').attr('style', 'color:red')
      }

      if (parseFloat($('#percentage_pnl').text()) > 0) {
        $('#percentage').attr('style', 'color:green')
      }
      else if (parseFloat($('#percentage_pnl').text()) < 0) {
        $('#percentage').attr('style', 'color:red')
      }

      if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#PE_sell_premium').attr('style', 'color:black')
      }
      else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
        $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
        $('#CE_sell_premium').attr('style', 'color:black')
      }
    }
  })

  x_axis = []
  y_axis = []

  if (API_data != undefined && API_data['live_pnl'].length != 0) {
    for (var i = 0; i < API_data['live_pnl'].length; i++) {
      x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
      y_axis.push(Object.values(API_data['live_pnl'][i])[0])
      live_mtm = Object.values(API_data['live_pnl'][i])[0]
    }
  }

  if (API_data != undefined) { $('#BankNifty').text(API_data['bank_nifty']) }
  if (API_data != undefined) { $('#Nifty').text(API_data['nifty50']) }
  if (API_data != undefined) { $('#percentage_pnl').text(API_data['percentage_change']) }
  if (API_data != undefined) { $('#CE_sell_premium').text(Math.abs(API_data['CE_sell_premium']).toLocaleString('en-IN')) }
  if (API_data != undefined) { $('#PE_sell_premium').text(Math.abs(API_data['PE_sell_premium']).toLocaleString('en-IN')) }
  if (API_data != undefined && API_data['live_pnl'].length != 0) { $('#Live_MTM').text(live_mtm) }

  const ctx = document.getElementById('chart');

  chart_1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x_axis,
      datasets: [{
        fill: {
          target: 'origin',
          above: 'green',   // Area will be red above the origin
          below: 'red'    // And blue below the origin
        },
        data: y_axis,
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          ticks: {
            display: true,
            maxTicksLimit: 10
          }
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Live MTM Chart',
          align: 'start',
          color: 'black',
          font: { size: 20 },
          padding: { bottom: 25 }
        },
      }
    }
  });

  if (parseFloat($('#Live_MTM').text()) > 0) {
    $('#Live_MTM').attr('style', 'color:green')
  }
  else if (parseFloat($('#Live_MTM').text()) < 0) {
    $('#Live_MTM').attr('style', 'color:red')
  }

  if (parseFloat($('#percentage_pnl').text()) > 0) {
    $('#percentage').attr('style', 'color:green')
  }
  else if (parseFloat($('#percentage_pnl').text()) < 0) {
    $('#percentage').attr('style', 'color:red')
  }

  if (parseFloat(Math.abs(API_data['CE_sell_premium'])) > parseFloat(Math.abs(API_data['PE_sell_premium']))) {
    $('#CE_sell_premium').attr('style', 'color:black;font-weight:bold')
    $('#PE_sell_premium').attr('style', 'color:black')
  }
  else if (parseFloat(Math.abs(API_data['CE_sell_premium'])) < parseFloat(Math.abs(API_data['PE_sell_premium']))) {
    $('#PE_sell_premium').attr('style', 'color:black;font-weight:bold')
    $('#CE_sell_premium').attr('style', 'color:black')
  }

  $('#switch').click(() => {
    if ($('#flexSwitchCheckChecked').is(":checked")) {
      $('#Table_2_Column').show()
      $('#ChartDatatable_container').hide()
    }
    else {
      $('#Table_2_Column').hide()
      $('#ChartDatatable_container').show()
    }
  })

  if ($(document).width() < 975) {
    $('#Table_2_Column').show()
    $('#ChartDatatable_container').hide()
    $('#switch').removeClass('d-none')
  }

  $(window).resize(function () {
    if ($(document).width() >= 975) {
      $('#Table_2_Column').show()
      $('#ChartDatatable_container').show()
      $('#switch').addClass('d-none')
    }
    else if ($(document).width() < 975) {
      if ($('#flexSwitchCheckChecked').is(":checked")) {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }
      else {
        $('#ChartDatatable_container').show()
        $('#Table_2_Column').hide()
      }
      $('#switch').removeClass('d-none')
    }
  });
})