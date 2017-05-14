var url = '/github/repos/FreeCodeCamp-Chengdu/HOP';
$(document).ready(function(){
  app.getInfo();
  app.getIssues();
  app.getReadme();
  app.getCollaborator();
  app.getMilestone();
});

var app = new Vue({
  el:'#app',
  data:{
    setting:{
      currentMenu: 'info' //info readme
    },
    info:{
      name: '',　//标题
      description: '',　//项目描述
      created_at: null,　//创建时间
      updated_at: null　//更新时间
    },
    readme: '', //html格式数据
    issues: [],
    collaborator: [],　//队员列表
    milestones: [] //里程碑
  },
  methods:{
    getInfo:function() {
      var _self = this;
      $.ajax({
        type: "GET",
        url: url,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           _self.errorInfo("error message : " + errorThrown.toString());
        },
        success: function (obj) {
          if(obj.hasOwnProperty('message')){
            _self.errorInfo(obj.message);
          }else{
            _self.info = {
              name: obj.name,
              description: obj.description,
              created_at: moment(obj.created_at).format('YYYY/MM/DD HH:mm:ss'),
              updated_at: moment(obj.updated_at).format('YYYY/MM/DD HH:mm:ss')
            };
          }
        }
      });
    },
    getReadme:function() {
      var _self = this;
      $.ajax({
        type: "GET",
        headers: {
          'Accept':'application/vnd.github.VERSION.html'
        },
        url: url + '/readme',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _self.errorInfo("error message : " + errorThrown.toString());
        },
        success: function (obj) {
          if(obj.hasOwnProperty('message')){
            _self.errorInfo(obj.message);
          }else{
            _self.readme = obj;
          }
        }
      });
    },
    getIssues:function() {
      // 获取issue列表
      var _self = this;
      $.ajax({
        type: "GET",
        url: url + '/issues',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _self.errorInfo("error message : " + errorThrown.toString());
        },
        success: function (obj) {
          if(obj.hasOwnProperty('message')){
            _self.errorInfo(obj.message);
          }else{
            _self.issues = obj;
          }
        }
      });
    },
    getCollaborator:function() {
      // 获取成员列表
      var _self = this;
      $.ajax({
        type: "GET",
        url: url + '/collaborators',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _self.errorInfo("error message : " + errorThrown.toString());
        },
        success: function (obj) {
          if(obj.hasOwnProperty('message')){
            _self.errorInfo(obj.message);
          }else{
            _self.collaborator = obj;
          }
        }
      });
    },
    getMilestone:function() {
      // 获取进度信息
      var _self = this;
      $.ajax({
        type: "GET",
        url: url + '/milestones',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _self.errorInfo("error message : " + errorThrown.toString());
        },
        success: function (obj) {
          console.log(obj, 'milestone')
          if(obj.hasOwnProperty('message')){
            _self.errorInfo(obj.message);
          }else{
            _self.milestones = obj.map(function(milestone){
              return Object.assign(milestone, {
                progress: parseInt((milestone.open_issues / ( milestone.open_issues + milestone.closed_issues) * 100 )),
                created_at: moment(milestone.created_at).format('YYYY/MM/DD HH:mm:ss'),
                updated_at: moment(milestone.updated_at).format('YYYY/MM/DD HH:mm:ss')
              })
            });
          }
        }
      });
    },
    errorInfo: function(message){
      this.$notify({
        title: '失败',
        message: message,
        type: 'error'
      });
    },
    handleMenu:function(key) {
      this.setting.currentMenu = key;
    }
  }
})
