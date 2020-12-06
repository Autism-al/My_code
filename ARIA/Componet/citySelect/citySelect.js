import qqmap from '../../utils/map.js';
Component({
  properties: {
    styles:{//这个是可以自定义最外层的view的样式
      type:String,
      value:'',
      observer: function (newval, oldval) {
        // 监听改变
        console.log(newval, oldval);
      }
    }
  },
  data: {
    //下面是字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    cityListId: '',
    List:["A","阿坝","阿拉善","阿里","安康","安庆","鞍山","安顺","安阳","澳门","B","北京","白银",
    "保定","宝鸡","保山","包头","巴中","北海","蚌埠","本溪","毕节","滨州","百色","亳州",
    "C","重庆","成都","长沙","长春","沧州","常德","昌都","长治","常州","巢湖","潮州","承德",
    "郴州","赤峰","池州","崇左","楚雄","滁州","朝阳","D","大连","东莞","大理","丹东","大庆",
    "大同","大兴安岭","德宏","德阳","德州","定西","迪庆","东营","E","鄂尔多斯","恩施","鄂州",
    "F","福州","防城港","佛山","抚顺","抚州","阜新","阜阳","G","广州","桂林","贵阳","甘南",
    "赣州","甘孜","广安","广元","贵港","果洛","H","杭州","哈尔滨","合肥","海口","呼和浩特",
    "海北","海东","海南","海西","邯郸","汉中","鹤壁","河池","鹤岗","黑河","衡水","衡阳",
    "河源","贺州","红河","淮安","淮北","怀化","淮南","黄冈","黄南","黄山","黄石","惠州",
    "葫芦岛","呼伦贝尔","湖州","菏泽","J","济南","佳木斯","吉安","江门","焦作","嘉兴","嘉峪关",
    "揭阳","吉林","金昌","晋城","景德镇","荆门","荆州","金华","济宁","晋中","锦州","九江",
    "酒泉","K","昆明","开封","L","兰州","拉萨","来宾","莱芜","廊坊","乐山","凉山","连云港",
    "聊城","辽阳","辽源","丽江","临沧","临汾","临夏","临沂","林芝","丽水","六安","六盘水",
    "柳州","陇南","龙岩","娄底","漯河","洛阳","泸州","吕梁","M","马鞍山","茂名","眉山","梅州",
    "绵阳","牡丹江","N","南京","南昌","南宁","宁波","南充","南平","南通","南阳","那曲","内江",
    "宁德","怒江","P","盘锦","攀枝花","平顶山","平凉","萍乡","莆田","濮阳","Q","青岛","黔东南",
    "黔南","黔西南","庆阳","清远","秦皇岛","钦州","齐齐哈尔","泉州","曲靖","衢州","R","日喀则",
    "日照","S","上海","深圳","苏州","沈阳","石家庄","三门峡","三明","三亚","商洛","商丘","上饶",
    "山南","汕头","汕尾","韶关","绍兴","邵阳","十堰","朔州","四平","绥化","遂宁","随州","宿迁",
    "宿州","T","天津","太原","泰安","泰州","台州","唐山","天水","铁岭","铜川","通化","通辽",
    "铜陵","铜仁","台湾","W","武汉","乌鲁木齐","无锡","威海","潍坊","文山","温州","乌海","芜湖",
    "乌兰察布","武威","梧州","X","厦门","西安","西宁","襄樊","湘潭","湘西","咸宁","咸阳","孝感",
    "邢台","新乡","信阳","新余","忻州","西双版纳","宣城","许昌","徐州","香港","锡林郭勒","兴安",
    "Y","银川","雅安","延安","延边","盐城","阳江","阳泉","扬州","烟台","宜宾","宜昌","宜春",
    "营口","益阳","永州","岳阳","榆林","运城","云浮","玉树","玉溪","玉林","Z","杂多县","赞皇县",
    "枣强县","枣阳市","枣庄","泽库县","增城市","曾都区","泽普县","泽州县","札达县","扎赉特旗",
    "扎兰屯市","扎鲁特旗","扎囊县","张北县","张店区","章贡区","张家港","张家界","张家口","漳平市",
    "漳浦县","章丘市","樟树市","张湾区","彰武县","漳县","张掖","漳州","长子县","湛河区","湛江",
    "站前区","沾益县","诏安县","召陵区","昭平县","肇庆","昭通","赵县","昭阳区","招远市","肇源县",
    "肇州县","柞水县","柘城县","浙江","镇安县","振安区","镇巴县","正安县","正定县","正定新区",
    "正蓝旗","正宁县","蒸湘区","正镶白旗","正阳县","郑州","镇海区","镇江","浈江区","镇康县",
    "镇赉县","镇平县","振兴区","镇雄县","镇原县","志丹县","治多县","芝罘区","枝江市",
    "芷江侗族自治县","织金县","中方县","中江县","钟楼区","中牟县","中宁县","中山","中山区",
    "钟山区","钟山县","中卫","钟祥市","中阳县","中原区","周村区","周口","周宁县","舟曲县","舟山",
    "周至县","庄河市","诸城市","珠海","珠晖区","诸暨市","驻马店","准格尔旗","涿鹿县","卓尼",
    "涿州市","卓资县","珠山区","竹山县","竹溪县","株洲","株洲县","淄博","子长县","淄川区","自贡",
    "秭归县","紫金县","自流井区","资溪县","资兴市","资阳"],
    //下面是城市列表信息，这里只是模拟数据
    citylist: [{ "letter": "A", "data": 
    [{ "id": "v7", "cityName": "阿坝" },{ "id": "v7", "cityName": "阿拉善" },{ "id": "v7", "cityName": "阿里" },{ "id": "v7", "cityName": "鞍山" },{ "id": "v7", "cityName": "安康" }, { "id": "v7", "cityName": "安庆" }, { "id": "v7", "cityName": "安顺" }, { "id": "v7", "cityName": "安阳" }, { "id": "v7", "cityName": "澳门" }]},
     { "letter": "B", "data": [{ "id": "v1", "cityName": "北京" }, { "id": "v1", "cityName": "白银" }, { "id": "v1", "cityName": "保定" }, { "id": "v1", "cityName": "宝鸡" }, { "id": "v1", "cityName": "保山" }, { "id": "v1", "cityName": "包头" }, { "id": "v1", "cityName": "巴中" }, { "id": "v1", "cityName": "北海" }, { "id": "v1", "cityName": "蚌埠" }, { "id": "v1", "cityName": "本溪" }, { "id": "v1", "cityName": "毕节" }, { "id": "v1", "cityName": "滨州" }, { "id": "v1", "cityName": "百色" }, { "id": "v1", "cityName": "亳州" }] }, 
     { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, 
     { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }],
    //下面是热门城市数据，模拟数据
    newcity: ['北京', '上海', '广州', '深圳', '成都', '杭州'],
    // citySel: '全国',
    locateCity: ''
  },
  methods: {
    //点击城市
    cityTap(e) {
      const val = e.currentTarget.dataset.val || '',
        types = e.currentTarget.dataset.types || '',
        Index = e.currentTarget.dataset.index || '',
        that=this;
      let city = this.data.citySel;
      switch (types) {
        case 'locate':
          //定位内容
          city = this.data.locateCity;
          break;
        case 'national':
          //全国
          city = '全国';
          break;
        case 'new':
          //热门城市
          city = val;
          break;
        case 'list':
          //城市列表
          city = val.cityName;
          break;
      }
      if(city){
        wx.setStorage({
          key: 'city',
          data: city
        })　　　　//点击后给父组件可以通过bindcitytap事件，获取到cityname的值，这是子组件给父组件传值和触发事件的方法
        this.triggerEvent('citytap', { cityname: city });
      }else{
        console.log('还没有');
        this.getLocate();
      }
     
    },
    //点击城市字母
    letterTap(e) {
      const Item = e.currentTarget.dataset.item;
      this.setData({
        cityListId: Item
      });
      console.log(this.data.cityListId);
    },
    //调用定位
    getLocate(){
      let that=this;
      new qqmap().getLocateInfo().then(function (val) {//这个方法在另一个文件里，下面有贴出代码
        console.log(val);
        if (val.indexOf('市') !== -1) {//这里是去掉“市”这个字
          console.log(val.indexOf('市') - 1);
          val = val.slice(0, val.indexOf('市'));
          console.log(val);
        }
        that.setData({ 
          locateCity: val
        });
        //把获取的定位和获取的时间放到本地存储
        wx.setStorageSync('locatecity', { city: val, time: new Date().getTime() });
      });
    }
  },
  onLoad: function (options){
    let i;
    let citylist = this.data.citylist;
    for(i in citylist)
    {
      console.log(cityList[i]);
    }
  },
  ready(){
    console.log(getApp());
    let that = this,
        cityOrTime = wx.getStorageSync('locatecity')||{},
        time = new Date().getTime(),
        city='';
    if (!cityOrTime.time||(time - cityOrTime.time > 1800000)){//每隔30分钟请求一次定位
      this.getLocate();
    }else{//如果未满30分钟，那么直接从本地缓存里取值
      that.setData({
        locateCity: cityOrTime.city
      })
    }
   
    
  }
})