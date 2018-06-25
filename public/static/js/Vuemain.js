var vm = new Vue({
	el:'#app',
	data:{
		isTestNet: true,
		Ip: "ws://47.254.39.10:8766",
		Net: "TestNet",
		tableData:{},		//创建table数据
		websock: null,	//websocket
		rowData:[],			//行数据
		nodeNum:0,			//总node数
		peerNum:0,			//总peer数
		spvNum:0,				//总spv数
		//p:[],						//遍历数组
		// testData:{
		// 	"MessageType": "NodeList",
		// 	"Nodes": {
		// 		"directed": false,
		// 		"multigraph": false,
		// 		"graph": {},
		// 		"nodes": [
		// 			{
		// 				"Nid": "localhost:8089",
		// 				"Ip": "localhost:8089",
		// 				"Pblickkey": "03a6fcaac0e13dfbd1dd48a964f92b8450c0c81c28ce508107bc47ddc511d60e75",
		// 				"Name": "test",
		// 				"Deposit": 5,
		// 				"Fee": 1,
		// 				"Balance": 15,
		// 				"SpvList": [],
		// 				"id": "localhost:8089"
		// 			}
		// 		],
		// 		"links": [
		// 			{
		// 				"weight": 2,
		// 				'source': "localhost:8089",
		// 				'target': 2
		// 			},
		// 			{
		// 				'weight': 2,
		// 				'source': 1,
		// 				'target': "localhost:8089"
		// 			},
		// 			{
		// 				'weight': 2,
		// 				'source': 2,
		// 				'target': 3
		// 			}
		// 		]
		// 	}
		// }
	},
	filters:{
		translateToIP:function(url){
			if(!url) return 'null';
			var val = url.split('@')[1].split(':')[0];
			return val;//真正项目中需要后代反馈金额，JS会导致金额误差
		},
		translateToArea:function(url){

		}
	},
	computed:{

	},
	mounted:function(){					//加载完成触发
		this.$nextTick(function(){
			this.initWebSocket();		//连接websocket
			this.tableFun();				//生成table
		})
	},
	watch: {
			// tableData:{
			// 	handler:function(tableData){
			// 		$("#mytab").bootstrapTable('load', tableData);
			// 	},
			// 	deep:true
			// }
			rowData:{
				handler:function(rowData){

				},
				deep:true
			}
	},
	methods:{
			threadPoxi(){  // 实际调用的方法
			//参数
			const agentData = "mymessage";
			//若是ws开启状态
			if (this.websock.readyState === this.websock.OPEN) {
				this.websocketsend(agentData)
			}
			// 若是 正在开启状态，则等待300毫秒
			else if (this.websock.readyState === this.websock.CONNECTING) {
				 let that = this;//保存当前对象this
				 setTimeout(function () {
						 that.websocketsend(agentData)
				 }, 300);
			}
			// 若未开启 ，则等待500毫秒
			else {
				 this.initWebSocket();
				 let that = this;//保存当前对象this
				 setTimeout(function () {
							 that.websocketsend(agentData)
					 }, 500);
				}
			},
			initWebSocket(){ //初始化weosocket
				//ws地址
				const wsuri = this.Ip;
				this.websock = new WebSocket(wsuri);
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonmessage(e){ 		//数据接收
				//console.log(e.data);
				const redata = JSON.parse(e.data);
				const type = redata.MessageType;
				console.log(redata);
				// console.log(JSON.stringify(redata));
				//console.log(redata.NodeList);
				if(type == "NodeList"){
				 //redata.Nodes.node.data.flag = 1;		//临时解决方法,区分根节点
				 //var NodeListData = this.traverseTree(redata.Nodes);
				 //var NodeListData = this.traverseTree(this.testData);
				 this.tableData = this.formatData(redata.Nodes);
				}
				console.log("-------------------");
				console.log("以下是tableData信息");
				console.log(this.tableData);
				$("#mytab").bootstrapTable('load', this.tableData);
					//console.log(e.data);
			},
			websocketsend:function(agentData){		//数据发送
				console.log("发送信息：" + agentData);
				this.websock.send(agentData);
			},
			websocketclose(e){  //关闭websocket
				console.log("connection closed (" + e.code + ")");
			},
			// ipapi:function(){			//根据api查询地区
			// 	$.getJSON("http://ip-api.com/json/47.254.39.10", function(data) {
			// 	console.log(data);
			// 	});
			// },
			traverseTree:function(val){		//遍历
				console.log("----------------");
				console.log("以下为node信息");
				console.log(val);
				if (!val) {
						return;
				}
				var _this = this;
				//var a = val.Nodes;
				// console.log("a:");
				// console.log(a);
				val.nodes.forEach(function(data,index){
					var n = 0;
					var b = data.Ip;
					console.log(b);
					val.links.forEach(function(data1,index1){   //遍历
						 if(data1.target == b){
							 n++;
						 };
						 if(data1.source == b){
							 n++;
						 };
					 })
					 data.peer = n;
				})
				console.log(val);
				return val;
			},
			formatData:function(getData) {
				var n = getData.nodes;
				this.nodeNum = n.length;
				var l = getData.links;
				this.peerNum = l.length;
				console.log(n);
				var _this = this;
				n.forEach(function(val,index){
						let plck = val.Publickey;
						let p = 0;
						l.forEach(function(data,index){
							if(data.source === plck){
								p ++;
							}
						});
						l.forEach(function(data,index){
							if(data.target === plck){
								p ++;
							}
						})
						val.NodeId = val.Publickey + "@" + val.Ip;
						val.peerNum = p;
				});
				return n
			},
			tableFun:function(data){			//创建表格
				var _this = this;
				$('#mytab').bootstrapTable({
				method: 'post',
				contentType: "application/x-www-form-urlencoded",
				data:data,
				height:tableHeight(),//高度调整
				striped: true, //是否显示行间隔色
				dataField: "res",
				pageNumber: 1, //初始化加载第一页，默认第一页
				pagination:true,//是否分页
				sidePagination:'client',
				pageSize:5,//单页记录数
				pageList:[5,10,20,30],//分页步进值
				//showColumns:true,
				clickToSelect: true,//是否启用点击选中行
				toolbarAlign:'right',
				buttonsAlign:'right',//按钮对齐方式
				//toolbar:'#toolbar',//指定工作栏
				columns:[
						{
							field: 'No',
							title: 'No',
							align:	'center',
							formatter: function (value, row, index) {
								return index + 1;
							},
							sortable:true
						},
						{
							title:'IP',
							field:'ip',
							visible:false
						},
						{
							title:'Node Name',
							field:'Name'
						},
						{
							title:'TNAP (Trinity Network Access Point)',
							field:'NodeId'
						},
						{
							title:'Fee',
							field:'Fee',
							align:'center',
							sortable:true
						},
						{
							title:'Balance',
							field:'Balance',
							align:'center',
							sortable:true,
							visible:false
						},
						{
							title:'Asset Type',
							field:'AssetType',
							align:'center',
							visible:false
						},
						{
							title:'Channel Num',
							field:'peerNum',
							align:'center',
							sortable:true
						},
						{
							title:'SPV Num',
							field:'spv',
							align:'center',
							sortable:true,
							visible:false
						},
						{
							title:'peerDetail',
							field:'peerDetail',
							visible:false
						},
						{
							title:'spvDetail',
							field:'spvDetail',
							visible:false
						},
				],
				// onDblClickRow: function (row) {		//表格内的双击
				// 		_this.rowData = row;
				// 		//this.ip = this.rowData.ip;
				// 		$(".InfoBody").show();
				// 		$(".tableBody").hide();
				// 		 }
					})
			},
			toggleForm:function(){
				$("#InfoForm").slideToggle("slow");
			},
			closeFun:function(){
				$(".InfoBody").hide();
				$(".tableBody").show();
			},
			ChangeNetFun:function() {
				this.isTestNet === true ? this.isTestNet = false : this.isTestNet = true;
				// this.websock.close();
				// this.websock = null;
				this.Ip === "ws://47.254.39.10:8766" ? this.Ip = "ws://39.105.117.43:8766" : this.Ip = "ws://47.254.39.10:8766";
				this.Net === "TestNet" ? this.Net = "MainNet" : this.Net = "TestNet";
				
				let _this = this;
				_this.initWebSocket();
				// setTimeout(function () {
				// 	_this.initWebSocket();
				// 	_this.tableFun();
				// }, 2000);
			}
	}
})
