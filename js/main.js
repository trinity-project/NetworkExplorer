var version = "0.1.2";

var isTestNet;
var Listdata;
var nodes;
var links;
var ws;
var ip;
var Magic;
// var data;

localStorage.getItem("wsIp") === null ? ip = "ws://47.98.228.81:8766" : ip = localStorage.getItem("wsIp");
if (ip === "ws://47.98.228.81:8766"){
  isTestNet = false;
  $(".NetSpan").text("Switch to MainNet");
  $(".Net").text("Trinity TestNet");
  Magic = "195378745719990331"
} else {
  isTestNet = true;
  $(".NetSpan").text("Switch to TestNet");
  $(".Net").text("Trinity MainNet");
  Magic = "763040120030515"
}
console.log(ip);

// if (!isTestNet) {
//   data = {
//     "MessageType": "NodeList",
//     "Nodes": {
//       "directed": false,
//       "multigraph": false,
//       "graph": {},
//       "nodes": [{
//         "Publickey": "0276130e8b092a61f384dd3c8f2472a012040d664800e36aebc08de60bb911850f",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "B597EEA2E880DADDF29ADE5AD2F8703F": 22986.7,
//           "D463140DB16974DCED370F8314BA01C5": 23000,
//           "B036D4FD7F2C3FEFF669BBEAE960B7F5": 22386,
//           "40a1dbda25d64d9cd0ef9608dcd062c5": 10.63,
//           "64F6101690FF93A174E384658117B9AD": 23455.9,
//           "b39e796555f8bb316a87e32839f0ef65": 1
//         },
//         "Ip": "47.98.228.81:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "0276130e8b092a61f384dd3c8f2472a012040d664800e36aebc08de60bb911850f"
//       }, {
//         "Publickey": "02be2cd38375dae1f5541deb2ca6525c7fdf123b3553346e922d3a8c12b5a22771",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "08D1689053EF2432417F6C28C2B0E1CD": 23002.4,
//           "B597EEA2E880DADDF29ADE5AD2F8703F": 23013.3,
//           "AF471AE8D1FD1FAFBEE2FD70C927E135": 22386.8,
//           "04abcbebcde9d84b8a9a25405b16b141": 1.3,
//           "1264783b6d59cd3f3ccde941c177b8c3": 5,
//           "64F6101690FF93A174E384658117B9AD": 23456,
//           "1542034c611fee2a4bb3a26f06373226": 5,
//           "d1e2eb67e3616decb1c2b7bd99b57a45": 1,
//           "fcad7227a37187d654c5d3d6e32ddfe5": 5,
//           "4245762695f94b541b3ccb9a02ccb8f9": 10,
//           "1056aa21d73ebeae54e46bc10593d811": 3,
//           "e6d84e5a38f5fa00d6f59dd92fa41c2d": 1,
//           "391639A92427EFF825F3BF892726934F": 27000
//         },
//         "Ip": "47.97.223.57:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "02be2cd38375dae1f5541deb2ca6525c7fdf123b3553346e922d3a8c12b5a22771"
//       }, {
//         "Publickey": "03745d64d8f1fd71c7dbb05dd043eaa94e114290642678e36d33ee5df23970e881",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "D463140DB16974DCED370F8314BA01C5": 23000,
//           "08D1689053EF2432417F6C28C2B0E1CD": 22997.6,
//           "34B633BAB7596DCD6747F9B703E14F17": 22346,
//           "1baecc081bd1319c59c1e16f06e56658": 1,
//           "D305CEE5A8915AAE2639AB016991B8F4": 30000
//         },
//         "Ip": "47.97.198.8:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "03745d64d8f1fd71c7dbb05dd043eaa94e114290642678e36d33ee5df23970e881"
//       }, {
//         "Publickey": "02828081c9ceb674d996780e5dbae95cddb988ac6f2a442e6a748fc794a6a7c820",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "34B633BAB7596DCD6747F9B703E14F17": 22346,
//           "B036D4FD7F2C3FEFF669BBEAE960B7F5": 22386,
//           "33e2dd6b021f67d5349c62ff55a2e60e": 1.62,
//           "AF471AE8D1FD1FAFBEE2FD70C927E135": 22385.1,
//           "25ec9488e450f40fc4edc5189c765000": 1
//         },
//         "Ip": "47.254.39.10:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "02828081c9ceb674d996780e5dbae95cddb988ac6f2a442e6a748fc794a6a7c820"
//       }],
//       "links": [{
//         "weight": 0.02,
//         "name": "D463140DB16974DCED370F8314BA01C5",
//         "source": "0276130e8b092a61f384dd3c8f2472a012040d664800e36aebc08de60bb911850f",
//         "target": "03745d64d8f1fd71c7dbb05dd043eaa94e114290642678e36d33ee5df23970e881"
//       }, {
//         "weight": 0.02,
//         "name": "B036D4FD7F2C3FEFF669BBEAE960B7F5",
//         "source": "0276130e8b092a61f384dd3c8f2472a012040d664800e36aebc08de60bb911850f",
//         "target": "02828081c9ceb674d996780e5dbae95cddb988ac6f2a442e6a748fc794a6a7c820"
//       }, {
//         "weight": 0.02,
//         "name": "B597EEA2E880DADDF29ADE5AD2F8703F",
//         "source": "0276130e8b092a61f384dd3c8f2472a012040d664800e36aebc08de60bb911850f",
//         "target": "02be2cd38375dae1f5541deb2ca6525c7fdf123b3553346e922d3a8c12b5a22771"
//       }, {
//         "weight": 0.02,
//         "name": "08D1689053EF2432417F6C28C2B0E1CD",
//         "source": "02be2cd38375dae1f5541deb2ca6525c7fdf123b3553346e922d3a8c12b5a22771",
//         "target": "03745d64d8f1fd71c7dbb05dd043eaa94e114290642678e36d33ee5df23970e881"
//       }, {
//         "weight": 0.02,
//         "name": "AF471AE8D1FD1FAFBEE2FD70C927E135",
//         "source": "02be2cd38375dae1f5541deb2ca6525c7fdf123b3553346e922d3a8c12b5a22771",
//         "target": "02828081c9ceb674d996780e5dbae95cddb988ac6f2a442e6a748fc794a6a7c820"
//       }, {
//         "weight": 0.02,
//         "name": "34B633BAB7596DCD6747F9B703E14F17",
//         "source": "03745d64d8f1fd71c7dbb05dd043eaa94e114290642678e36d33ee5df23970e881",
//         "target": "02828081c9ceb674d996780e5dbae95cddb988ac6f2a442e6a748fc794a6a7c820"
//       }]
//     }
//   }
// } else {
//   data = {
//     "MessageType": "NodeList",
//     "Nodes": {
//       "directed": false,
//       "multigraph": false,
//       "graph": {},
//       "nodes": [{
//         "Publickey": "026e1da94dfb11ac7fcb0b3ba51c1da9b7eb9e979d325e74b17033668535346b6a",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "98EE39EA79432EED25CA3F0EB2F68288": 25000,
//           "341507B31054A250F8EE13BF4937477E": 25000,
//           "BB6F228412660460F6374B2155D606C1": 22001
//         },
//         "Ip": "39.105.110.25:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "026e1da94dfb11ac7fcb0b3ba51c1da9b7eb9e979d325e74b17033668535346b6a"
//       }, {
//         "Publickey": "03cc235ab489663bddfaca8fb00f43801deda58d2a99421aef6f1275b319b08b8f",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "98EE39EA79432EED25CA3F0EB2F68288": 25000,
//           "820A3FDBB5E896888F6ADB1285288931": 25000.4,
//           "fe25496c42fa280e931f8cba60ac8a89": 3
//         },
//         "Ip": "39.105.117.43:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "03cc235ab489663bddfaca8fb00f43801deda58d2a99421aef6f1275b319b08b8f"
//       }, {
//         "Publickey": "0228897daed2adf00a27935d656e62907f1535d30fc1f5c79d99307167cf3ce624",
//         "Name": "TrinityNode",
//         "AssetType": "TNC",
//         "Fee": 0.01,
//         "Balance": {
//           "820A3FDBB5E896888F6ADB1285288931": 24999.6,
//           "341507B31054A250F8EE13BF4937477E": 25000,
//           "4f1af8540616019bb9406c7219196f0d": 4
//         },
//         "Ip": "39.105.118.43:8089",
//         "WalletIp": "localhost:20556",
//         "Status": 1,
//         "id": "0228897daed2adf00a27935d656e62907f1535d30fc1f5c79d99307167cf3ce624"
//       }],
//       "links": [{
//         "weight": 0.02,
//         "name": "None",
//         "source": "026e1da94dfb11ac7fcb0b3ba51c1da9b7eb9e979d325e74b17033668535346b6a",
//         "target": "03cc235ab489663bddfaca8fb00f43801deda58d2a99421aef6f1275b319b08b8f"
//       }, {
//         "weight": 0.02,
//         "name": "None",
//         "source": "026e1da94dfb11ac7fcb0b3ba51c1da9b7eb9e979d325e74b17033668535346b6a",
//         "target": "0228897daed2adf00a27935d656e62907f1535d30fc1f5c79d99307167cf3ce624"
//       }, {
//         "weight": 0.02,
//         "name": "None",
//         "source": "03cc235ab489663bddfaca8fb00f43801deda58d2a99421aef6f1275b319b08b8f",
//         "target": "0228897daed2adf00a27935d656e62907f1535d30fc1f5c79d99307167cf3ce624"
//       }]
//     }
//   }
// }

function WebSocketFun()
{
   if ("WebSocket" in window)
   {
      //console.log("您的浏览器支持 WebSocket!");

      // 打开一个 web socket
      ws = new WebSocket(ip);

      ws.onopen = function()
      {
         // Web Socket 已连接上，使用 send() 方法发送数据
         let Message = {
           MessageType:"GetNodeList",
           Sender: "0276130e8b092a61f384dd3c8f2472a012040d664800e36ae1c08de60bb911850f@" + ip.split("//")[1],
           Magic: Magic,
           MessageBody:{
             "AssetType":"TNC",
           }
         }
         ws.send(JSON.stringify(Message));
         console.log("websocket已连接...");
         
      };

      ws.onmessage = function (e)
      {
         const redata = JSON.parse(e.data);
         const type = redata.MessageType;
        //  const redata = data;
        //  const type = redata.MessageType;
         console.log(JSON.stringify(redata));
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
    localStorage.setItem('wsIp', 'ws://39.105.117.43:8766');
    window.location.reload();
  } else {
    localStorage.setItem('wsIp', 'ws://47.98.228.81:8766');
    window.location.reload();
  }
})

$(function () {
  WebSocketFun();
  console.log("Version: " + version);
});
