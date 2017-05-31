var app = new Vue({
	el:"#app",
	data:{
		searchTitle:'',
		searchKeyword:'',
		picked:'',
		test:'',
		imgs:["../../image/photo1.jpg","../../image/photo2.jpg","../../image/photo3.jpg","../../image/photo4.jpg","../../image/photo5.jpg","../../image/photo6.jpg","../../image/photo7.jpg","../../image/photo8.jpg"],
		//activity:[{"id":1,"uid":1,"ctime":1495609063,"title":"fcc hackathon1","keyWord":"javascript","startTime":1495609044,"endTime":1495695450,"location":"fcc","description":"fcc"},{"id":2,"uid":1,"ctime":1495609098,"title":"fcc hackathon2","keyWord":"nodejs","startTime":1493708244,"endTime":1493794650,"location":"fcc","description":"fcc"},{"id":3,"uid":1,"ctime":1495609121,"title":"fcc hackathon3","keyWord":"html","startTime":1496300244,"endTime":1496991450,"location":"fcc","description":"fcc"},{"id":4,"uid":1,"ctime":1495609148,"title":"fcc hackathon4","keyWord":"css","startTime":1497855444,"endTime":1497941850,"location":"fcc","description":"fcc"}]
		//activity:[{"id":1,"uid":1,"ctime":1495609063,"title":"fcc hackathon1","keyWord":"javascript","startTime":1495609044,"endTime":1495695450,"location":"fcc","description":"fcc"},{"id":2,"uid":1,"ctime":1495609098,"title":"fcc hackathon2","keyWord":"nodejs","startTime":1493708244,"endTime":1493794650,"location":"fcc","description":"fcc"},{"id":3,"uid":1,"ctime":1495609121,"title":"fcc hackathon3","keyWord":"html","startTime":1496300244,"endTime":1496991450,"location":"fcc","description":"fcc"},{"id":4,"uid":1,"ctime":1495609148,"title":"fcc hackathon4","keyWord":"css","startTime":1497855444,"endTime":1497941850,"location":"fcc","description":"fcc"},{"id":5,"uid":1,"ctime":1495711711,"title":"fcc hacthon abcd","keyWord":"vue","startTime":1493637990,"endTime":1496229995,"location":"保利中心拾级咖啡19楼11号","description":"jaksdhewiuxmcnbvjlasdh"},{"id":6,"uid":1,"ctime":1495711748,"title":"fcc hacthon 6.18","keyWord":"react","startTime":1493724390,"endTime":1494415595,"location":"保利中心拾级咖啡19楼11号","description":"jaksdhewiuxmcnbvjlasdh"},{"id":7,"uid":1,"ctime":1495711796,"title":"fcc hackathon coding ","keyWord":"react","startTime":1498821990,"endTime":1498908395,"location":"保利中心拾级咖啡19楼11号","description":"jaksdhewiuxmcnbvjlasdhasdfg"},{"id":8,"uid":1,"ctime":1495711845,"title":"fcc hackathon life","keyWord":"angular","startTime":1504956390,"endTime":1505064395,"location":"保利中心拾级咖啡19楼11号","description":"jaksdhewiuxmcnbvjlasdhasdfg"}],
		activity:[],
	},
	computed:{
		filteredActivity:function(){
			var showActivity = this.activity
			if(this.searchTitle){
				var tmepArr = new Array()
            	for(i=0;i<showActivity.length;i++){
              		if(String(showActivity[i].title).toLowerCase().indexOf(this.searchTitle) > -1 ){
                		tmepArr.push(showActivity[i])
              		}
           		}
            	showActivity = tmepArr
			}
			if(this.searchKeyword){
				var tmepArr = new Array()
            	for(i=0;i<showActivity.length;i++){
              		if(String(showActivity[i].keyWord).toLowerCase().indexOf(this.searchKeyword) > -1 ){
                		tmepArr.push(showActivity[i])
              		}
           		}
            	showActivity = tmepArr
			}
			var filterPick = this.picked
			if(filterPick){
				if(filterPick == "Upcoming"){
					var tmepArr = new Array()
					for(i=0;i<showActivity.length;i++){
              			if(Date.parse(new Date()) < (showActivity[i].startTime)*1000){
                			tmepArr.push(showActivity[i])
              			}
              		}
              		showActivity = tmepArr
           		}else if(filterPick == "Now"){
					var tmepArr = new Array()
					for(i=0;i<showActivity.length;i++){
              			if((Date.parse(new Date()) < (showActivity[i].endTime)*1000) && (Date.parse(new Date()) > (showActivity[i].startTime)*1000)){
                			tmepArr.push(showActivity[i])
              			}
              		}
              		showActivity = tmepArr
           		}else if(filterPick == "Past"){
					var tmepArr = new Array()
					for(i=0;i<showActivity.length;i++){
              			if(Date.parse(new Date()) > (showActivity[i].endTime)*1000){
                			tmepArr.push(showActivity[i])
              			}
              		}
              		showActivity = tmepArr
           		}else if(filterPick == "7 Days"){
					var tmepArr = new Array()
					for(i=0;i<showActivity.length;i++){
						var interval = 7*24*60*60*1000
              			if(Math.abs(Date.parse(new Date()) - (showActivity[i].endTime)*1000) < interval || Math.abs(Date.parse(new Date()) - (showActivity[i].startTime)*1000) < interval){
                			tmepArr.push(showActivity[i])
              			}
              		}
              		showActivity = tmepArr
           		}else if(filterPick == "30 Days"){
					var tmepArr = new Array()
					for(i=0;i<showActivity.length;i++){
						var interval = 30*24*60*60*1000
              			if(Math.abs(Date.parse(new Date()) - (showActivity[i].endTime)*1000) < interval || Math.abs(Date.parse(new Date()) - (showActivity[i].startTime)*1000) < interval){
                			tmepArr.push(showActivity[i])
              			}
              		}
              		showActivity = tmepArr
           		}
			}
			return showActivity
		}
	},
	methods:{
		time:function(s,e){
			return moment(s*1000).format('YYYY-MM-DD HH:mm:ss')+"----"+moment(e*1000).format('YYYY-MM-DD HH:mm:ss')
		},
		timeShowUpcoming:function(t){
			var flag = t*1000>Date.parse(new Date())
			return flag
		},
		timeShowPast:function(t){
			var flag = t*1000<Date.parse(new Date())
			return flag
		}
	},
	mounted:function(){
		var that = this
		$.ajax({
			url: '/activity',
			type: "GET",
			dataType: "json",
			success:function(data){
				that.activity = data
			}
		})
	}
})