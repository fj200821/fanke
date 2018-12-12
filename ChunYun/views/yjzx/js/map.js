//最大的缩放程度
var theMaxZoom = 18;
//现在的缩放程度
var theCurrentZoom = 1;
//卫星地图
var satellite = new AMap.TileLayer.Satellite();
//道路地图
var roadNet = new AMap.TileLayer.RoadNet();
//3D建筑地图
var building = new AMap.Buildings({
  zooms: [16, 18],
  zIndex: 100,
  heightFactor: 2//2倍于默认高度，3D下有效
});
//实时交通地图
var traffic = new AMap.TileLayer.Traffic({
  'autoRefresh': true,     //是否自动刷新，默认为false
  'interval': 180,         //刷新间隔，默认180s
});
//
var theMakerLayer = null;
//室内地图层
var theInnerLayer = null;
//热力图地图层
var theHeartLayer = null;
//创建地图实例
var theMap = new AMap.Map('container', {
  pitch: 0,
  mapStyle:'amap://styles/9f47a75c5a80f716945988ccbc61aeb7',
  //mapStyle: 'amap://styles/c6b6ea6de59432d8973e27caa9b04355',
  //mapStyle: 'amap://styles/grey',//'amap://styles/blue',
  viewMode: '3D',// 地图模式
  center: [113.275824, 22.994826],
  features:['bg', 'building','point'],//['all'],// ['bg', 'building','point'],
  zoom: 8,
  keyboardEnable: false,
  layers: [
    //satellite,
    // building,
    //roadNet
  ]
});

// 模拟鹰眼
var theMap2 = new AMap.Map('container2', {
  //pitch: 0,
  //viewMode: '3D',// 地图模式
  //mapStyle: "amap://styles/033a2c064eac784909f99e30e532cb52",
  mapStyle: 'amap://styles/9f47a75c5a80f716945988ccbc61aeb7',
  center: [113.275824, 22.994826],
  //features: ['bg', 'building'],
  zoom: 5,
  dragEnable: false,
  zoomEnable: true,
  doubleClickZoom: false,
  keyboardEnable:false,
  layers: [
    //disCountry,
    //indoorMap,
    //innerRoom
    // satellite,
    // building
    // object3Dlayer
    //roadNet
  ]
});

$(function () {
  var theLastpoint;
  var yingYan = $('#yingyan');
  theMap2.on("mousedown", function (arg) {
    //theMap2.off('moveend');
    // theMap2.setCenter(theMap.getCenter())
    // ;
    theLastpoint={x:arg.pixel.x,y:arg.pixel.y};

    theMap2.on('mousemove', function (arg) {

      if(theLastpoint) {
        var theCurrentpoint = {x: arg.pixel.x, y: arg.pixel.y};

        var theX = theCurrentpoint.x - theLastpoint.x;
        var theY = theCurrentpoint.y - theLastpoint.y;
        // console.log(theX,theY)
        if (theX == 0 && theY == 0) {
          return;
        }

        yingYan[0].style.top = yingYan.position().top + theY + 'px';
        yingYan[0].style.left = yingYan.position().left + theX + 'px';

        theLastpoint = theCurrentpoint;
      }

    });
  });
  theMap2.on("mouseup", function (arg) {
    //theMap2.off('moveend');
    // theMap2.setCenter(theMap.getCenter())
    // ;
    var lnglat = arg.lnglat;
    theMap.setCenter(lnglat);
    theMap2.setCenter(lnglat);
    theLastpoint=null;
    yingYan[0].style.top = '100px';
    yingYan[0].style.left = '100px';

  });


})
theMap.on("moveend", function () {
  //theMap2.off('moveend');
  theMap2.setCenter(theMap.getCenter());
});

theMap.on('zoomend', function () {
  var theZoom = theMap.getZoom();
  var theMinZoom = 3;
  var theCurrentZoom = theZoom - 3;
  if (theCurrentZoom < theMinZoom) {
    theCurrentZoom = theMinZoom;
  }
  //debugger;
  theMap2.setZoom(theCurrentZoom);
});




// theMap2.on('mousemove', function (arg) {
//   // var lnglat = arg.lnglat;
//   // theMap.setCenter(lnglat);
//   console.log(arg)
//   // debugger
//
// });

// 同时引入工具条插件，比例尺插件和鹰眼插件
// AMap.plugin([
//
//   'AMap.OverView'
//
// ], function(){
//
//
//   // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
//   map.addControl(new AMap.OverView({isOpen:true}));
//
// });
var overView;
AMap.plugin(['AMap.IndoorMap','AMap.OverView'], function () {
  var indoorMap = new AMap.IndoorMap({ alwaysShow: true });
  theMap.add(indoorMap);

  // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
  var OVOption = {
    isOpen:true
  };
  overView = new AMap.OverView(OVOption);
  // theMap.addControl(overView);
  // overView.hide()
});
//地图加载完成事件
theMap.on('complete', function () {
  console.log("地图加载完成!");
  //获取
  // var ambientLight = theMap.AmbientLight;   //获取环境光
  // var directionLight = theMap.DirectionLight; //获取平行光
  //修改
  // theMap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
  //  theMap.DirectionLight = new AMap.Lights.DirectionLight([-6, -2, 14], [1, 1, 1], 0.5);
});
//监听放大缩小事件
theMap.on('zoom', function (arg) {
  var theZoom = theMap.getZoom();
  if(theZoom>=17) {
    $('#container2').hide()
  } else {
    $('#container2').show()

  }
  if (theZoom >= 12) {
    // console.log("显示点");
    theMap.setFeatures(['bg', 'building', 'point']);
    theMap.add(roadNet);
    theMap.add(building);
    theMap.setPitch(45);
    theInnerLayer&&theInnerLayer.setzIndex(1000);
    //theMap.add(satellite);
    //theMap.setMapStyle("normal");

  }
  else {
    console.log("隐藏点");
    //theHeartLayer && theHeartLayer.setMap(null);
    theHeartLayer && theHeartLayer.remove() ;
    theHeartLayer = null;
    // theMap.setFeatures(['bg', 'building']);
    theMap.remove(roadNet);
    theMap.remove(building);
    //theMap.remove(satellite);
    theMap.setPitch(0);
    //theMap.setMapStyle("amap://styles/grey");
  }
  if (!theMakerLayer) {
    return;
  }
  if (!theMakerLayer['show']) {
    return;
  }
  if (theZoom >= 10) {
    theMakerLayer.hide();
  }
  else {
    theMakerLayer.show();
  }
});
var theLayers = theMap.getLayers();
for (var i = 0; i < theLayers.length; i++) {
  var theLayer = theLayers[i];
  if (theLayer.CLASS_NAME == 'AMap.IndoorMap') {
    console.log("找到室内图");
    theLayer.hideFloorBar();
    theInnerLayer = theLayer;

    theInnerLayer.off('complete');
    //theInnerLayer.off('floor_complete');
    theInnerLayer.on('click', function () {

    });

  }
}
theInnerLayer&& theInnerLayer.on('complete', function (arg) {
  console.log('室内图层加载完!');
  //debugger;
  var theBuilding = null;
  setInterval(function () {
    var theZoom = theMap.getZoom();
    if (theZoom < 16) {
      theBuilding = null;
      $('#DivButton').empty();
      return;
    }
    var theLastBuilding = theBuilding;
    theBuilding = theInnerLayer.getSelectedBuilding();
    if (theBuilding != theLastBuilding) {

      if (!theBuilding) {
        console.log('未找到建筑物!');
        return;
      }
      //找到图层了
      console.log('jiazaiwancheng@!1');
      $('#DivButton').empty();
      //floor_complete
      var theFloors = theBuilding.floor_details.floor_nonas;
      var theFloorIndex = theBuilding.floor_details.floor_indexs;
      for (var i = 0; i < theFloors.length; i++) {
        var theName = theFloors[i];
        var theIndex = theFloorIndex[i];
        $('<div data-index=' + theIndex + '>' + theName + '</div>').click(function () {
          var theCurrentIndex = $(this).data('index');
          theInnerLayer.showFloor(theCurrentIndex);
          var theCurrentBuild = theInnerLayer.getSelectedBuilding();
          var theLnt = theCurrentBuild.lnglat;

          TestRli2(theLnt.lng, theLnt.lat);

        }).appendTo($('#DivButton'));
        console.log(theFloors[i]);
        //开始显示楼层
        //theBuilding.showFloor();
      };
      floorBindClick();
    }
  }, 500);
});
//theMap.on('click', function (e) {
//    console.log(e);
//});

/*var theTimer = window.setInterval(function () {
        var  theZoomValue=theMap.getZoom();
        if (theCurrentZoom >= theMaxZoom) {
            window.clearInterval(theTimer);
            return;
        }
    console.log(theZoomValue);
        //map.zoomIn();
        theMap.setZoom(theCurrentZoom++);
    }, 500);*/

//function ShowProvinceArea(arg) {
//    for (var name in Provices) {
//        var thePoints = Provices[name];
//        if (!thePoints) {
//            console.log("无数据！");
//        }
//        if (arg!=null&&arg!=name) {
//            continue;
//        }
//        var thePointsArray = thePoints.split(";");
//        var thePath = [];
//        for (var i = 0; i < thePointsArray.length; i++) {
//            var thePoint = thePointsArray[i];
//            var thePs = thePoint.split(',');
//            //debugger;
//            if (thePs.length < 2) {
//                console.log(thePoint);
//                continue;
//            }
//            var theGPS = new AMap.LngLat(parseFloat(thePs[0]), parseFloat(thePs[1]));
//            thePath.push(theGPS);
//            //thePath.push(thePs);
//        }
//        if (name.lastIndexOf("省") > 0) {

//            showLine(thePath);
//        }
//        else {

//            var polyline = new AMap.Polyline({
//                path: thePath,
//                map: window.theMap,
//                //strokeWeight: 100,
//                borderWeight: 1, // 线条宽度，默认为 1
//                strokeColor: 'blue'//, // 线条颜色
//                //lineJoin: 'round' // 折线拐点连接处样式
//            });
//        }

//    }
//}
AMap.plugin('AMap.DistrictSearch', function () {
  // 创建行政区查询对象
  var district = new AMap.DistrictSearch({
    // 返回行政区边界坐标等具体信息
    extensions: 'all',
    // 设置查询行政区级别为 区
    level: 'province'
  });

  district.search('广东省', function (status, result) {
    // 获取朝阳区的边界信息
    var bounds = result.districtList[0].boundaries
//      debugger;
    if (!bounds) {
      console.log("未获取到数据!");
      return;
    }

    var theBigBounds = null;
    window.theMap = theMap;
    for (var i = 0, l = bounds.length; i < l; i++) {

      var theBound = bounds[i];
      var polygon = {};
      //var polygon = new AMap.Polygon({
      //    map: window.theMap,
      //    strokeWeight: 0,
      //    borderWeight: 200, // 线条宽度，默认为 1
      //    path: theBound,
      //    strokeOpacity: 1,
      //    zIndex: 1,
      //    fillOpacity: 0.5,
      //    fillColor:'white',// '#0f0c21'//,
      //    //strokeColor: 'blue'
      //});

      if (theBound.length >= 10000) {
        theBigBounds = theBound;
        // theMakerLayer = polygon;
      }
      //  polygons.push(polygon);

    }
    //showProvince();
    showLine(theBigBounds);

  })
});

//var marker = new AMap.Marker({
//    position: new AMap.LngLat(113.275824, 22.994826),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//    title: '广州南站'
//});

function showLine(thePaths) {
  console.log("开始绘制线！");
  if (!thePaths) {
    console.log("未找到最大的轮廓");
    return;
  }
  var theIndex = 1;
  var thePoints = [];
  thePoints.push(thePaths[0]);
  console.log("开始执行");

  var theTimer = window.setInterval(function () {
    // console.log(theIndex);
    thePoints.push(thePaths[theIndex]);
    theIndex++;
    for (var j = 0; j < 500; j++) {
      if (theIndex < thePaths.length) {
        thePoints.push(thePaths[theIndex]);
        theIndex++;
      }
      else {
        break;
      }
    }

    if (theIndex >= thePaths.length) {
      // debugger;
      window.clearInterval(theTimer);
      if (thePoints.length > 0) {
        var polyline = new AMap.Polyline({
          path: thePoints,
          map: window.theMap,
          //strokeWeight: 100,
          borderWeight: 8, // 线条宽度，默认为 1
          strokeColor: 'white'//, // 线条颜色
          //lineJoin: 'round' // 折线拐点连接处样式
        });
        thePoints = [];
      }
      console.log("绘图结束！");

      // ShowMark();


      //var theValue = 1;
      //thePitchTimer = window.setInterval(function (me) {
      //    console.log("角度:" + theValue);
      //    if (theValue > 45) {
      //        window.clearInterval(thePitchTimer);
      //        return;
      //    }
      //    else {
      //        theMap.setPitch(theValue);
      //    }
      //    theValue = theValue + 1;
      //}, 10);

      return;
    }
    if (thePoints.length > 10) {
      //debugger;
      var polyline = new AMap.Polyline({
        path: thePoints,
        map: window.theMap,
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'white'//, // 线条颜色
        //lineJoin: 'round' // 折线拐点连接处样式
      });
      var theLastPoint = thePoints[thePoints.length - 1];
      thePoints = [];
      thePoints.push(theLastPoint);

      // console.log("开始绘制线！");
    }

  }, 1);



}

var theMarks = [];
var theMaxLevel = 18;

//显示标点内容
function ShowMark(theType) {
  //先清除标点
  theMap.remove(theMarks);
  var thePoints = {
    // "广州南站": { "latitude": 22.9874720000, "longitude": 113.2685860000, "type": "铁路", 'icon': 'tielu3.png' },
    // "深圳火车站": { "latitude": 22.5319900000, "longitude": 114.1176800000 },
    // "深圳北站": { "latitude": 22.6097250000, "longitude": 114.0291130000, "type": "铁路", 'icon': 'tielu3.png' },
    //"广州东站": { "latitude": 23.1505660000, "longitude": 113.3249000000 },
    //"广州火车站": { "latitude": 23.1494150000, "longitude": 113.2572910000 },
    //"广州北站": { "latitude": 23.3774050000, "longitude": 113.2037940000 },
    //"深圳西站": { "latitude": 22.5275730000, "longitude": 113.9073060000 },
    //"深圳东站": { "latitude": 22.6019860000, "longitude": 114.1199340000 },
    // "珠海站": { "latitude": 22.2153960000, "longitude": 113.5496410000, "type": "铁路", 'icon': 'tielu3.png' },
    //"白云国际机场": { "latitude": 23.3896270000, "longitude": 113.3076480000 },
    // "白云国际机场": { "latitude": 23.396544, "longitude": 113.306199, "type": "民航", 'maxLevel': 17, 'icon': 'feiji3.png' },
    //"宝安国际机场": { "latitude": 22.6333600000, "longitude": 113.8145490000 },
    // "宝安国际机场": { "latitude": 22.62506, "longitude": 113.812809, "type": "民航", 'icon': 'feiji3.png' },
    //"珠海金湾国际机场": { "latitude": 22.0057560000, "longitude": 113.3819450000 },
    //"揭阳潮汕国际机场": { "latitude": 23.5463610000, "longitude": 116.5092740000 }
  };
  for (var name in thePoints) {
    var theItem = thePoints[name];
    if (theType && theType != theItem.type) {
      continue;
    }
    var marker = new AMap.Marker({
      position: new AMap.LngLat(theItem.longitude, theItem.latitude),// 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: name,
      icon: theItem.icon,//'tielu.png',
      // content: name,
      zIndex: 10000,
      label: "<div class='info'>" + name + "</div>",
      extData: theItem
      // animation: "AMAP_ANIMATION_DROP"
    });

    marker.on('click', function (arg) {
      //var thelng = arg.lnglat;

      var thelng = arg.target.getPosition();// new AMap.LngLat(113.2685860000, 22.9874720000);
      var theCurrentMaxLevel = arg.target.getExtData().maxLevel || theMaxLevel;
      //{ "latitude": , "longitude":  }
      var theZoom = theMap.getZoom();
      if (theZoom <= 8) {
        MoveToPoint(thelng, theCurrentMaxLevel);
      }
      else {
        ReturnDefualt();
      }
    })
    theMarks.push(marker);
    theMap.add(marker);
  }
}

//开始导航到指定点
function MoveToPoint(lntlat, maxZoom) {
  console.log("开始导航到指定点!");
  var theZoom = theMap.getZoom();
  var thePitchTimer = window.setInterval(function () {
    if (theZoom > maxZoom) {
      window.clearInterval(thePitchTimer);
      theMap.setPitch(45);
      console.log("结束导航到指定点!");
      return;
    }
    theMap.setZoomAndCenter(theZoom++, lntlat);
  }, 10);
  theMap.off('indoor_create');
  theMap.on('indoor_create', function (arg) {
//      debugger;
    //theMap.indoorMap.showIndoorMap('B000A856LJ', 5);
  })
}
//结束导航到指定点
function ReturnDefualt(defaultZoom, lntlat) {
  console.log("开始导航到该蓝图!");
  var theZoom = theMap.getZoom();
  defaultZoom = defaultZoom || 7;
  var lntlat = lntlat || new AMap.LngLat(113.275824, 22.994826)
  var thePitchTimer = window.setInterval(function () {
    if (theZoom < defaultZoom || theZoom <= 1) {
      window.clearInterval(thePitchTimer);
      console.log("结束导航到该蓝图!");
      theMap.setPitch(0);
      return;
    }
    theMap.setZoomAndCenter(theZoom--, lntlat);
  }, 10);
}
function Switch2D() {
  var theValue = 45;
  var thePitch = theMap.getPitch();
  if (thePitch <= 0) {
    return;
  }
  var thePitchTimer = window.setInterval(function (me) {
    console.log("角度:" + theValue);
    if (theValue < 0) {
      window.clearInterval(thePitchTimer);
      return;
    }
    else {
      theMap.setPitch(theValue);
    }
    theValue = theValue - 1;
  }, 10);
}
function Switch3D() {
  var theValue = 1;
  var thePitch = theMap.getPitch();
  if (thePitch >= 45) {
    return;
  }
  var thePitchTimer = window.setInterval(function (me) {
    console.log("角度:" + theValue);
    if (theValue > 45) {
      window.clearInterval(thePitchTimer);
      return;
    }
    else {
      theMap.setPitch(theValue);
    }
    theValue = theValue + 1;
  }, 10);
}
function SwitchView(viewName) {
  ReturnDefualt();
  // ShowMark(viewName);
  theMap.remove(traffic);
  if (viewName == "公路") {
    theMap.add(traffic);
    Switch2D();
    theMap.setFeatures(['bg', 'building', 'point']);
    // AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
    //
    //   //图层切换控件
    //   theMap.addControl(new BasicControl.LayerSwitcher({
    //     position: 'rt'
    //   }));
    // });
    theMap.remove(satellite);
  }
  else {
    //Switch3D();
    theMap.setFeatures(['bg', 'building']);
    theMap.clearControl();
    theMap.add(satellite);
    theMap.remove(traffic);
  }
}
function TestMove() {
  var thePoint = new AMap.LngLat(113.306199, 23.396544);
  theMap.panTo(thePoint);

}
// AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
//
//   //添加一个缩放控件
//   /* map.addControl(new BasicControl.Zoom({
//        position: 'lt'
//    }));
//
//    //缩放控件，显示Zoom值
//    map.addControl(new BasicControl.Zoom({
//        position: 'lb',
//        showZoomNum: true
//    }));*/
//
//   //图层切换控件
//   theMap.addControl(new BasicControl.LayerSwitcher({
//     position: 'rt'
//   }));
// });

function CreateHeartLayer() {
  if (!theHeartLayer) {
    var map = Loca.create(theMap);
    theHeartLayer = Loca.visualLayer({
      container: map,
      type: 'heatmap',
      // 基本热力图
      shape: 'normal'
    });
  }
}
function TestRli(lng, lat) {
  //var map = Loca.create(theMap);
  //var layer = Loca.visualLayer({
  //    container: map,
  //    type: 'heatmap',
  //    // 基本热力图
  //    shape: 'normal'
  //});
  CreateHeartLayer();
  lng = lng || 113.23;
  lat = lat || 23.16;
  var theValue = Math.floor((Math.random() * 10));
  layer = theHeartLayer;
  var list = [];
  var i = -1, length = heatmapData.length;
  while ((i + theValue) < length) {
    var item = heatmapData[i + theValue];
    i = i + theValue;
    if (!item) {
      break;
    }
    list.push({
      coordinate: [item.lng - (116.41427945507813 - lng), item.lat - (39.89947319300864 - lat)],
      count: item.count
    })
  }

  layer.setData(list, {
    lnglat: 'coordinate',
    value: 'count'
  });

  layer.setOptions({
    style: {
      radius: 30,
      color: {
        0.5: '#2c7bb6',
        0.65: '#abd9e9',
        0.7: '#ffffbf',
        0.9: '#fde468',
        1.0: '#d7191c'
      }
    }
  });

  layer.render();
}

function TestRli2(lng, lat) {
  //var map = Loca.create(theMap);
  //var layer = Loca.visualLayer({
  //    container: map,
  //    type: 'heatmap',
  //    // 基本热力图
  //    shape: 'normal'
  //});
  CreateHeartLayer();
  lng = lng || 113.23;
  lat = lat || 23.16;
  var theValue = Math.floor((Math.random() * 10));
  layer = theHeartLayer;
  var list = [];
  var i = -1, length = 400;
  while (++i < length) {
    //var item = heatmapData[i + theValue];
    //i = i + theValue;

    list.push({
      coordinate: [lng + Math.random() / 1000, lat + Math.random() / 1000],
      count: Math.floor((Math.random() * 100))
    })
  }

  layer.setData(list, {
    lnglat: 'coordinate',
    value: 'count'
  });

  layer.setOptions({
    style: {
      radius: 30,
      color: {
        0.5: '#2c7bb6',
        0.65: '#abd9e9',
        0.7: '#ffffbf',
        0.9: '#fde468',
        1.0: '#d7191c'
      }
    }
  });

  layer.render();
}
function TestView() {
  var colors = [];
  // 传入 AMap.Map 实例
  var map = Loca.create(theMap);
  var layer = Loca.visualLayer({
    container: map,
    type: 'point',
    shape: 'circle'
  });

  layer.setData(citys, {
    lnglat: 'lnglat'
  });

  layer.setOptions({
    style: {
      // 支持动态回调，为每一个点设置半径
      radius: function (obj) {
        // 城市类型，0：省会直辖市，1：地级市，2：区县
        var style = obj.value.style;
        var r;
        if (style == 0) {
          r = 6;
        } else if (style == 1) {
          r = 3;
        } else {
          r = 1.5;
        }

        return r;
      },
      color: '#47aff7',
      borderColor: '#c3faff',
      borderWidth: 1,
      opacity: 0.8
    }
  });

  layer.render();
}
// 将创建的点标记添加到已有的地图实例：


//加载图层展示
//AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
//    //启动页面
//    initPage(SimpleMarker);
//});

//function initPage(SimpleMarker) {

//    //创建SimpleMarker实例
//    new SimpleMarker({
//        //前景文字
//        iconLabel: '广州南站',
//        //图标主题
//        iconTheme: 'default',
//        //背景图标样式
//        iconStyle: 'red',
//        //...其他Marker选项...，不包括content
//        map: theMap,
//        position: [113.275824, 22.994826]
//    });


//}
function showProvince2() {

  var adCode = 440000;
  var depth = 2;
  // 创建省份图层
  var disProvince;
  function initPro(code, dep) {
    dep = typeof dep == 'undefined' ? 2 : dep;
    adCode = code;
    depth = dep;

    disProvince && disProvince.setMap(null);

    disProvince = new AMap.DistrictLayer.Province({
      zIndex: 12,
      adcode: [code],
      depth: dep,
      styles: {
        'fill': function (properties) {
          // properties为可用于做样式映射的字段，包含
          // NAME_CHN:中文名称
          // adcode_pro
          // adcode_cit
          // adcode
          var adcode = properties.adcode;
          return getColorByAdcode(adcode);
        },
        'province-stroke': 'cornflowerblue',
        'city-stroke': 'white', // 中国地级市边界
        'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
      }
    });

    disProvince.setMap(map);
  }

  // 颜色辅助方法
  var colors = {};
  var getColorByAdcode = function (adcode) {
    if (!colors[adcode]) {
      var gb = Math.random() * 155 + 50;
      colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
    }

    return colors[adcode];
  };

  // 按钮事件
  function changeAdcode(code) {
    if (code != 100000) {
      initPro(code, depth);
    }
  }

  function changeDepth(dep) {
    initPro(adCode, dep);
  }

  initPro(adCode, depth);

}


function showProvince() {
  //创建地图
  var map = theMap;
  //just some colors
  var colors = [
    "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
    "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
    "#651067", "#329262", "#5574a6", "#3b3eac"
  ];

  AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], function (DistrictExplorer, $) {

    //创建一个实例
    var districtExplorer = window.districtExplorer = new DistrictExplorer({
      eventSupport: false, //打开事件支持
      map: theMap
    });

    //当前聚焦的区域
    var currentAreaNode = null;

    //鼠标hover提示内容
    var $tipMarkerContent = $('<div class="tipMarker top"></div>');

    var tipMarker = new AMap.Marker({
      content: $tipMarkerContent.get(0),
      offset: new AMap.Pixel(0, 0),
      bubble: true
    });

    //根据Hover状态设置相关样式
    function toggleHoverFeature(feature, isHover, position) {

      tipMarker.setMap(isHover ? map : null);

      if (!feature) {
        return;
      }

      var props = feature.properties;

      if (isHover) {

        //更新提示内容
        $tipMarkerContent.html(props.adcode + ': ' + props.name);
        //更新位置
        tipMarker.setPosition(position || props.center);
      }

      $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').toggleClass('hover', isHover);

      //更新相关多边形的样式
      var polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
      for (var i = 0, len = polys.length; i < len; i++) {

        polys[i].setOptions({
          fillOpacity: isHover ? 0.5 : 0.2
        });
      }
    }

    //监听feature的hover事件
    //districtExplorer.on('featureMouseout featureMouseover', function (e, feature) {
    //    toggleHoverFeature(feature, e.type === 'featureMouseover',
    //        e.originalEvent ? e.originalEvent.lnglat : null);
    //});

    //监听鼠标在feature上滑动
    districtExplorer.on('featureMousemove', function (e, feature) {
      //更新提示位置
      tipMarker.setMap(theMap);
      tipMarker.setPosition(e.originalEvent.lnglat);
    });

    ////feature被点击
    //districtExplorer.on('featureClick', function (e, feature) {

    //    var props = feature.properties;

    //    //如果存在子节点
    //    if (props.childrenNum > 0) {
    //        //切换聚焦区域
    //        switch2AreaNode(props.adcode);
    //    }
    //});

    ////外部区域被点击
    //districtExplorer.on('outsideClick', function (e) {

    //    districtExplorer.locatePosition(e.originalEvent.lnglat, function (error, routeFeatures) {

    //        if (routeFeatures && routeFeatures.length > 1) {
    //            //切换到省级区域
    //            switch2AreaNode(routeFeatures[1].properties.adcode);
    //        } else {
    //            //切换到全国
    //            switch2AreaNode(100000);
    //        }

    //    }, {
    //        levelLimit: 2
    //    });
    //});

    //绘制区域面板的节点
    //function renderAreaPanelNode(ele, props, color) {

    //    var $box = $('<li/>').addClass('lv_' + props.level);

    //    var $h2 = $('<h2/>').addClass('lv_' + props.level).attr({
    //        'data-adcode': props.adcode,
    //        'data-level': props.level,
    //        'data-children-num': props.childrenNum || void (0),
    //        'data-center': props.center.join(',')
    //    }).html(props.name).appendTo($box);

    //    if (color) {
    //        $h2.css('borderColor', color);
    //    }

    //    //如果存在子节点
    //    if (props.childrenNum > 0) {

    //        //显示隐藏
    //        $('<div class="showHideBtn"></div>').appendTo($box);

    //        //子区域列表
    //        $('<ul/>').addClass('sublist lv_' + props.level).appendTo($box);

    //        $('<div class="clear"></div>').appendTo($box);

    //        if (props.level !== 'country') {
    //            $box.addClass('hide-sub');
    //        }
    //    }

    //    $box.appendTo(ele);
    //}


    //填充某个节点的子区域列表
    //function renderAreaPanel(areaNode) {

    //    var props = areaNode.getProps();

    //    var $subBox = $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').siblings('ul.sublist');

    //    if (!$subBox.length) {
    //        //父节点不存在，先创建
    //        renderAreaPanelNode($('#area-tree'), props);
    //        $subBox = $('#area-tree').find('ul.sublist');
    //    }

    //    if ($subBox.attr('data-loaded') === 'rendered') {
    //        return;
    //    }

    //    $subBox.attr('data-loaded', 'rendered');

    //    var subFeatures = areaNode.getSubFeatures();

    //    //填充子区域
    //    for (var i = 0, len = subFeatures.length; i < len; i++) {
    //        renderAreaPanelNode($subBox, areaNode.getPropsOfFeature(subFeatures[i]), colors[i % colors.length]);
    //    }
    //}

    //绘制某个区域的边界
    function renderAreaPolygons(areaNode) {
      console.log("renderAreaPolygons");
      //更新地图视野
      //  map.setBounds(areaNode.getBounds(), null, null, true);

      //清除已有的绘制内容
      districtExplorer.clearFeaturePolygons();

      //绘制子区域
      districtExplorer.renderSubFeatures(areaNode, function (feature, i) {

        var fillColor = colors[i % colors.length];
        var strokeColor = colors[colors.length - 1 - i % colors.length];

        return {
          cursor: 'default',
          bubble: false,
          strokeColor: strokeColor, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: fillColor, //填充色
          fillOpacity: 0.35, //填充透明度
        };
      });

      //绘制父区域
      districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: false,
        strokeColor: 'black', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线宽
        fillColor: null, //填充色
        fillOpacity: 0.35, //填充透明度
      });
    }

    //切换区域后刷新显示内容
    function refreshAreaNode(areaNode) {

      //districtExplorer.setHoverFeature(null);

      renderAreaPolygons(areaNode);

      ////更新选中节点的class
      //var $nodeEles = $('#area-tree').find('h2');

      //$nodeEles.removeClass('selected');

      //var $selectedNode = $nodeEles.filter('h2[data-adcode=' + areaNode.getAdcode() + ']').addClass('selected');

      ////展开下层节点
      //$selectedNode.closest('li').removeClass('hide-sub');

      ////折叠下层的子节点
      //$selectedNode.siblings('ul.sublist').children().addClass('hide-sub');
    }

    //切换区域
    function switch2AreaNode(adcode, callback) {

      if (currentAreaNode && ('' + currentAreaNode.getAdcode() === '' + adcode)) {
        return;
      }

      loadAreaNode(adcode, function (error, areaNode) {

        if (error) {

          if (callback) {
            callback(error);
          }

          return;
        }

        currentAreaNode = window.currentAreaNode = areaNode;

        //设置当前使用的定位用节点
        // districtExplorer.setAreaNodesForLocating([currentAreaNode]);

        refreshAreaNode(areaNode);

        if (callback) {
          callback(null, areaNode);
        }
      });
    }

    //加载区域
    function loadAreaNode(adcode, callback) {

      districtExplorer.loadAreaNode(adcode, function (error, areaNode) {

        if (error) {

          if (callback) {
            callback(error);
          }

          console.error(error);

          return;
        }

        // renderAreaPanel(areaNode);

        if (callback) {
          callback(null, areaNode);
        }
      });
    }
    switch2AreaNode(440000);

    //全国

  });
}

//ShowProvinceArea();
function floorBindClick() {
  var floors = $('#DivButton div');
  for (var i = 0; i < floors.length; i++) {
    var f = floors[i];
    $(f).on('click',function () {
      for (var j = 0; j < floors.length; j++) {
        var f = floors[j];
        $(f).removeClass('active');
      }

      $(this).addClass('active')
    })
  }
}