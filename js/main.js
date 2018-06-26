var version = "0.1.1";

var isTestNet = false;
var Listdata;
var nodes;
var links;
var ip = "ws://47.98.228.81:8766";
function WebSocketFun()
{
   if ("WebSocket" in window)
   {
      //console.log("您的浏览器支持 WebSocket!");

      // 打开一个 web socket
      var ws = new WebSocket(ip);

      ws.onopen = function()
      {
         // Web Socket 已连接上，使用 send() 方法发送数据
         // ws.send("发送数据");
         console.log("websocket已连接...");
      };

      ws.onmessage = function (e)
      {
         const redata = JSON.parse(e.data);
         const type = redata.MessageType;
         console.log(redata);
         console.log(type);
         if(type == "NodeList"){
           let n = redata.Nodes.nodes;
   				 let c = redata.Nodes.links;
           $("#NodesNum").text(n.length);
           $("#ChannelNum").text(c.length);
           Listdata = redata.Nodes;
           n.forEach(function(val,index){
   						let plck = val.Publickey;
   						let p = 0;
   						c.forEach(function(data,index){
   							if(data.source === plck){
   								p ++;
   							}
   						});
   						c.forEach(function(data,index){
   							if(data.target === plck){
   								p ++;
   							}
   						})
   						val.ChannelNum = p;
   				});
           //console.log(Listdata);
           sigmaFun();
 				}
      };

      ws.onclose = function()
      {
         // 关闭 websocket
         console.log("连接已关闭...");
      };
   }

   else
   {
      // 浏览器不支持 WebSocket
      alert("Your browser does not support WebSocket!");
   }
}

// Add a method to the graph model that returns an
  // object with every neighbors of a node inside:
function sigmaFun(){
    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
      var k, neighbors = {}, index = this.allNeighborsIndex[nodeId] || {};
      for (k in index) {
        neighbors[k] = this.nodesIndex[k];
      }
      return neighbors;
    });
    nodes = Listdata.nodes;
    links = Listdata.links;
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
        id: node.Publickey + "@" + node.Ip,
        label: node.Name,
        // Display attributes:
        // x: Math.random(),
        // y: Math.random(),
        x: Math.cos(Math.PI * 2 * index / nodes.length + Math.PI/180),
        y: Math.sin(Math.PI * 2 * index / nodes.length + Math.PI/180),
        size: 2,
        color: node.Status ? "#00ff00" : "#f00",
        ip:node.Ip,
        fee:node.Fee,
        channelNum:node.ChannelNum
      });
    });
    links.forEach((link, index) => {
      nodes.forEach((data, index) => {
        if (data.Publickey === link.source){
          link.source = data.Publickey + "@" + data.Ip;
        }
        if (data.Publickey === link.target) {
          link.target = data.Publickey + "@" + data.Ip;
        }
      })
      var edgeStatus = check_edge_status(link.source, link.target);
      console.log(edgeStatus);
      graph.addEdge({
        //id: link.name.toString(),
        id:index.toString(),
        // label: link.weight.toString(),
        // type:'arrow',
        size: 3,
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
      maxNodeSize: 8,
      maxEdgeSize: 5,
      edgeHoverPrecision: 10,
      edgeHoverExtremities: true,
      enableCamera: true,
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
        console.log(node.id);
        console.log(source);
        if ((node.id + "@" + node.Ip == source || node.id + "@" + node.Ip == target) && !node.Status) {
          status = false
        }
        console.log(status);
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
        console.log(e.data.node);
        // $(".SummaryBox").hide();
        $(".NodeInfoBox").show();
        $(".ChannelInfoBox").hide();
        $("#NodeNameP").text(e.data.node.label);
        $("#TNAPP").text(e.data.node.id);
        $("#FeeP").text(e.data.node.fee + " TNC");
        $("#ChannnelNumP").text(e.data.node.channelNum);
        if (e.data.node.color === "#f00") {
          $("#NodeStatusP").text("Offline");
        } else {
          $("#NodeStatusP").text("Online");
        }

        var nodeId = e.data.node.id, toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;
        console.log(toKeep);
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
        console.log(e.data);
        console.log(e.data.edge);
        // $(".SummaryBox").hide();
        $(".NodeInfoBox").hide();
        $(".ChannelInfoBox").show();
        $("#ChannelNameP").text(e.data.edge.Name);
        $("#PublickeyAP").text(e.data.edge.source);
        $("#PublickeyBP").text(e.data.edge.target);
        $("#ChannelDepositP").text();
        if (e.data.edge.color === "#f00"){
          $("#ChannelStatusP").text("Offline");
        } else{
          $("#ChannelStatusP").text("Online");
        }
        // e.data.edge.label = e.data.edge.id;
        // console.log(e.data.edge.label);
        // s.refresh();
      });
      s.bind("overEdge", function(e){
        //console.log("overEdge");
        // console.log(e.data.edge);
        e.data.edge.size = 5;
        s.refresh();
      });
      s.bind("outEdge", function(e){
        //console.log("out edge");
        e.data.edge.size = 2;
        s.graph.edges().forEach(function(e) {
          e.label = null;
        });
        s.refresh();
      });
    }
  }

$(".NetSpan").click(function(){
  console.log($(".NetSpan").text());
  console.log(isTestNet);
  isTestNet === true ? isTestNet = false : isTestNet = true;
  if (isTestNet){
    $(".NetSpan").text("Switch to TestNet");
    $(".Net").text("Trinity MainNet");
  } else {
    $(".NetSpan").text("Switch to MainNet");
    $(".Net").text("Trinity TestNet");
  }
})

$(function () {
  WebSocketFun();
  console.log("Version: " + this.version);
});
