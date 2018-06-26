var vm = new Vue({
	el:'#app',
	data:{
		title:"INFO",
		websock: null,	//websocket,
		ChannelInfo:{
			"ChannelName":"",
			"PublickeyA":"",
			"PublickeyB":"",
			"Deposit":""
		},
		isTestNet:true
	},
	filters:{

	},
	computed:{

	},
	mounted:function(){					//加载完成触发
		this.$nextTick(function(){
			this.initWebSocket();		//连接websocket
		})
	},
	watch: {
			rowData:{
				handler:function(rowData){

				},
				deep:true
			}
	},
	methods:{
			ChangeNetFun(){
				console.log(1);
				this.isTestNet === true ? this.isTestNet = false : this.isTestNet = true;
			},
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
				const wsuri = "ws://47.98.228.81:8766";
				this.websock = new WebSocket(wsuri);
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonmessage(e){ 		//数据接收
				//console.log(e.data);
				const redata = JSON.parse(e.data);
				const type = redata.MessageType;
				console.log(redata);
				console.log(JSON.stringify(redata));
				//console.log(redata.NodeList);
				if(type == "NodeList"){
					Listdata = redata;
					console.log(Listdata);
					this.sigmaFun();
			 	}
					//console.log(e.data);
			},
			websocketsend:function(agentData){		//数据发送
				console.log("发送信息：" + agentData);
				this.websock.send(agentData);
			},
			websocketclose(e){  //关闭websocket
				console.log("connection closed (" + e.code + ")");
			},
			sigmaFun:function (){
			  sigma.classes.graph.addMethod('neighbors', function(nodeId) {
			    var k, neighbors = {}, index = this.allNeighborsIndex[nodeId] || {};
			    for (k in index) {
			      neighbors[k] = this.nodesIndex[k];
			    }
			    return neighbors;
			  });
			  nodes = Listdata.Nodes.nodes;
			  links = Listdata.Nodes.links;
			  var s = new sigma({
			    renderer: {
			      container: "container",
			      type: "canvas"
			      },
			  });
			  graph = s.graph;
			  nodes.forEach((node, index) => {
			    console.log(index)
			    graph.addNode({
			      // Main attributes:
			      id: node.Publickey,
			      label: node.Name,
			      // Display attributes:
			      // x: Math.random(),
			      // y: Math.random(),
						x: Math.cos(Math.PI * 2 * index / nodes.length + Math.PI/180),
   					y: Math.sin(Math.PI * 2 * index / nodes.length + Math.PI/180),
			      size: index + 1,
			      color: node.Status ? "#00ff00" : "#f00"
			    });
			  });
			  links.forEach((link, index) => {
			    var edgeStatus = check_edge_status(link.source, link.target);
			    console.log(edgeStatus);
			    graph.addEdge({
			      //id: link.name.toString(),
			      id:index.toString(),
			      // label: link.weight.toString(),
			      // type:'arrow',
			      size: 1,
			      color: edgeStatus ? "#00ff00" : "#f00",
			      source: link.source,
			      target: link.target
			    });
			  });
			  s.settings({
			      // edgeColor: 'default',
			    // defaultEdgeColor: '#f00',
			    drawLabels: false,
			    // drawEdgeLabels: false,
			    enableEdgeHovering: true,
			    // maxNodeSize: 10,
			    // maxEdgeSize: 1,
					edgeHoverPrecision: 10,
			    edgeHoverExtremities: true,
			    enableCamera: false,
			    // dra
			    // drawEdgeLabels: true
			  });
			  // Refresh the graph to see the changes:
			  s.refresh();
			  // s.startForceAtlas2();
			  // s.startForceAtlas2();
			  bindEvent(s);
			  function check_edge_status(source, target) {
			    var status = true;
			    nodes.forEach((node, index) => {
			      if ((node.id == source || node.id == target) && !node.Status) {
			        status = false
			      }
			    })
			    return status
			  }
			  function bindEvent(s) {
			    // We first need to save the original colors of our
			    // nodes and edges, like this:
			    s.graph.nodes().forEach(function(n) {
			      n.originalColor = n.color;
			      console.log(n.originalColor);
			    });
			    s.graph.edges().forEach(function(e) {
			      e.originalColor = e.color;
			    });

			    // When a node is clicked, we check for each node
			    // if it is a neighbor of the clicked one. If not,
			    // we set its color as grey, and else, it takes its
			    // original color.
			    // We do the same for the edges, and we only keep
			    // edges that have both extremities colored.
			    s.bind('clickNode', function(e) {
			      // console.log("over node");
			      var nodeId = e.data.node.id, toKeep = s.graph.neighbors(nodeId);
			      toKeep[nodeId] = e.data.node;
			      console.log(toKeep)
			      s.graph.nodes().forEach(function(n) {
			        if (toKeep[n.id]) {
			          n.color = n.originalColor;
			        }
			        else if(n.id != nodeId) {
			          n.color = '#eee';
			        }
			      });
			      s.graph.edges().forEach(function(e) {
			        if (e.source == nodeId || e.target == nodeId) {
			          e.color = e.originalColor;
			        }
			        else {
			          e.color = '#eee';
			        }
			      });

			      // Since the data has been modified, we need to
			      // call the refresh method to make the colors
			      // update effective.
			      s.refresh();
			    });

			    // When the stage is clicked, we just color each
			    // node and edge with its original color.
			    s.bind('outNode', function(e) {
			      console.log("out node");
			      s.graph.nodes().forEach(function(n) {
			        n.color = n.originalColor;
			      });

			      s.graph.edges().forEach(function(e) {
			        e.color = e.originalColor;
			      });

			      // Same as in the previous event:
			      s.refresh();
			    });
			    s.bind("clickEdge", function(e){
			      //console.log("over edge")
						var _this = this;
						console.log(e.data.edge);
						console.log(_this.ChannelInfo.PublickeyA);
						_this.ChannelInfo.PublickeyA = e.data.edge.source;
			      e.data.edge.label = e.data.edge.id;
			      console.log(e.data.edge.label);
			      s.refresh();
			    });
			    s.bind("overEdge", function(e){
			      console.log("overEdge");
			      // console.log(e.data.edge);
			      // e.data.edge.size = 10;
			      s.refresh();
			    });
			    s.bind("outEdge", function(e){
			      console.log("out edge");
			      e.data.edge.size = 2;
			      s.graph.edges().forEach(function(e) {
			        e.label = null;
			      });
			      s.refresh();
			    });
			  }
			}
	}
})
