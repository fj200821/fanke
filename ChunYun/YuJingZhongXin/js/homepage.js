

$(function () {
  var tabBoxes = $('.tab-box');
  var tabBoxes2 = $('.tab-box2 li');

  var title = $('.title');
  var pointControl = new PlacePointView(theMap);
  init();

  function init() {
    // 点击左上标题
    title.on('click',function () {
      pointControl.ReturnDefualt();  // 默认视角
      showTabs();
      hideCurLocaction();
      hideTab2();
    });

    for (var i = 0; i < tabBoxes.length; i++) {
      var box = tabBoxes[i];
      $(box).on('click',clickTab)
    }
    for (var j = 0; j < tabBoxes2.length; j++) {
      var box2 = tabBoxes2[j];
      $(box2).on('click',clickTab2)
    }
    arrowBindClick();
    getTop3Data();

    clickTop3Li()

    // 先显示枢纽点
    pointControl.showPoints('客运站,铁路,机场,港口');
    // console.log('theDataObject:',pointControl.markes)
    markerBindClick();
  }

  function hideTab2() {
    var tab2 = $('#tab2');
    tab2.hide(300);
    for (var j = 0; j < tabBoxes2.length; j++) {
      var obj = tabBoxes2[j];
      $(obj).removeClass('active');
    }

  }


  // tab点击事件
  function clickTab() {
    for (var j = 0; j < tabBoxes.length; j++) {
      var obj = tabBoxes[j];
      $(obj).removeClass('tab-box-active');
    }
    $(this).addClass('tab-box-active');

    var t = $(this).data('name');
    // debugger
    if(t=='高速路网'){  // 显示高速路网图层
      window.location.href = '/ChunYun/GaoSuLuWang/index.html';
      return
    }
    pointControl.ReturnDefualt();
    pointControl.showPoints(t);  // 放大点
    markerBindClick();
  }

  // tab2点击事件
  function clickTab2() {
    for (var j = 0; j < tabBoxes2.length; j++) {
      var obj = tabBoxes2[j];
      $(obj).removeClass('active');
    }
    $(this).addClass('active');
  }


  // 模拟数据
  function getTop3Data() {
    var yongji = $('#yongji');
    var data = moniData;
    var num = 1;
    for (var i = 0; i < data.length; i++) {
      var liData = data[i];
      var liDom = '<li title="'+ liData.name +'">\n' +
        '<i class="top3-icon1"> '+ num +'</i>\n' +
        '<p><label class="p-name ellipsis">' + liData.name + '</label> <span>当前客流 <i class="num">22</i>万人</span></p>\n' +
        '</li>';
      num++;
      yongji.append($(liDom))
      // $(yongji.find('li')[i]).data('name','123')

      // console.log($(yongji.find('li')[0]).data('pos'))
      var curLi = yongji.find('li')[i];
      curLi.dataset.name = liData.name;
      curLi.dataset.lng = liData.pos.lng;
      curLi.dataset.lat = liData.pos.lat;
      curLi.dataset.zoom = liData.zoom;

    }

  }

  function clickTop3Li() {
    var top3Li = $('#yongji li');
    top3Li.on('click',function () {
      var arg = {
        P:this.dataset.lat,
        R:this.dataset.lng,
        lat: this.dataset.lat,
        lng: this.dataset.lng
      };
      // debugger
      pointControl.MoveToPoint(arg,this.dataset.zoom)
    })
    // console.log('moniData',moniData)
    // for (var i = 0; i < top3Li.length; i++) {
    //   var li = top3Li[i];
    //   li.attr('data-name',moniData.)
    // }
  }

  // 隐藏tab
  function hideTabs() {
    var tab = $('#tab');
    var tabBox = tab.find('.tab-box');
    var noActive;
    // console.log(tab)
    for (var i = 0; i < tabBox.length; i++) {
      var tabLi = $(tabBox[i]);
      tabLi.css('top','-102px');
      noActive = tabLi.attr('class').indexOf('tab-box-active') == '-1';

      if(noActive) {
        tabLi.css('z-index','-1')
        tabLi.addClass('vh')
      } else {
        tabLi.css('z-index','10')
      }
    }
    showCurLocaction();

    var tabBoxCur = $('#tab-box-cur');
    var tab2 = $('#tab2');
    tabBoxCur.find('.up').removeClass('dn')
    tabBoxCur.find('.down').addClass('dn')
    // stationBox.removeClass('dn')
    tab2.show(300)
    // isShowStationBox = true;

  }

  // 显示tab
  function showTabs() {
    var dis = 102;
    var tab = $('#tab');
    var tabBox = tab.find('.tab-box');
    var noActive;
    for (var i = 0; i < tabBox.length; i++) {
      var tabLi = $(tabBox[i]);
      // tabLi.css('z-index','auto')
      // tabLi.show()
      tabLi.css('z-index','1')
      tabLi.removeClass('vh')

      tabLi.css('top',(dis*i)+'px')
    }
  }


  function arrowBindClick() {
    // console.log($('#tab-box-cur .arrow'))
    var tabBoxCur = $('#tab-box-cur');

    var arrows = tabBoxCur.find('.arrow');
    var stationBox = $('#cur-pos-data-box');

    for (var i = 0; i < arrows.length; i++) {
      var a = arrows[i];
      $(a).on('click',function () {
        for (var j = 0; j < arrows.length; j++) {
          var a2 = arrows[j];
          $(a2).toggleClass('dn')
        }
      })

    }
  }

  function showCurLocaction() {
    var tabBoxCur = $('#tab-box-cur');
    var curPosDataBox = $('#cur-pos-data-box');
    tabBoxCur.show(300);
    curPosDataBox.show(300)
  }

  function hideCurLocaction() {
    var tabBoxCur = $('#tab-box-cur');
    var curPosDataBox = $('#cur-pos-data-box');
    tabBoxCur.hide(300);
    curPosDataBox.hide(300)
  }



  // 地图点绑定点击事件
  function markerBindClick() {
    for (var k = 0; k < pointControl.markes.length; k++) {
      var m = pointControl.markes[k];
      // console.log(m)
      m.on('click',hideTabs)

    }

  }
});




