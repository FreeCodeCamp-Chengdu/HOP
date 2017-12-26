define({ "api": [
  {
    "type": "delete",
    "url": "/hackathon/:id",
    "title": "删除黑客松",
    "name": "deleteHackathon",
    "version": "1.0.0",
    "group": "Hackathon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "filename": "router/Hackathon.js",
    "groupTitle": "Hackathon"
  },
  {
    "type": "get",
    "url": "/hackathon/:id",
    "title": "查看黑客松详情",
    "name": "getHackathon",
    "version": "1.0.0",
    "group": "Hackathon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageURL",
            "description": "<p>题图 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
    },
    "filename": "router/Hackathon.js",
    "groupTitle": "Hackathon"
  },
  {
    "type": "get",
    "url": "/hackathon",
    "title": "查询黑客松",
    "name": "listHackathon",
    "version": "1.0.0",
    "group": "Hackathon",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.imageURL",
            "description": "<p>题图 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.startTime",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.endTime",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.description",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "router/Hackathon.js",
    "groupTitle": "Hackathon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/hackathon",
    "title": "发起黑客松",
    "name": "postHackathon",
    "version": "1.0.0",
    "group": "Hackathon",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "filename": "router/Hackathon.js",
    "groupTitle": "Hackathon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..100",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageURL",
            "description": "<p>题图 URL</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..100",
            "optional": true,
            "field": "location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100..",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/hackathon/:id",
    "title": "更新黑客松详情",
    "name": "updateHackathon",
    "version": "1.0.0",
    "group": "Hackathon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..100",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageURL",
            "description": "<p>题图 URL</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..100",
            "optional": true,
            "field": "location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100..",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          }
        ]
      }
    },
    "filename": "router/Hackathon.js",
    "groupTitle": "Hackathon"
  },
  {
    "type": "delete",
    "url": "/member/:id",
    "title": "移除队籍",
    "name": "deleteMember",
    "version": "1.0.0",
    "group": "Member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "filename": "router/Member.js",
    "groupTitle": "Member"
  },
  {
    "type": "get",
    "url": "/member/:id",
    "title": "查看队友详情",
    "name": "getMember",
    "version": "1.0.0",
    "group": "Member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>用户角色</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>邀请状态</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user.github",
            "description": "<p>GitHub 用户详情</p>"
          }
        ]
      }
    },
    "filename": "router/Member.js",
    "groupTitle": "Member"
  },
  {
    "type": "get",
    "url": "/team/:tid/member",
    "title": "查询队友",
    "name": "listMember",
    "version": "1.0.0",
    "group": "Member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tid",
            "description": "<p>团队 ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.role",
            "description": "<p>用户角色</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.state",
            "description": "<p>邀请状态</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.user",
            "description": "<p>用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.user.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.user.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "router/Member.js",
    "groupTitle": "Member"
  },
  {
    "type": "post",
    "url": "/team/:tid/member",
    "title": "添加队籍",
    "name": "postMember",
    "version": "1.0.0",
    "group": "Member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tid",
            "description": "<p>团队 ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户 ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "defaultValue": "member",
            "description": "<p>用户角色</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>邀请状态</p>"
          }
        ]
      }
    },
    "filename": "router/Member.js",
    "groupTitle": "Member"
  },
  {
    "type": "put",
    "url": "/member/:id",
    "title": "更新队友详情",
    "name": "updateMember",
    "version": "1.0.0",
    "group": "Member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户 ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "defaultValue": "member",
            "description": "<p>用户角色</p>"
          }
        ]
      }
    },
    "filename": "router/Member.js",
    "groupTitle": "Member"
  },
  {
    "type": "delete",
    "url": "/team/:id",
    "title": "解散团队",
    "name": "deleteTeam",
    "version": "1.0.0",
    "group": "Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "filename": "router/Team.js",
    "groupTitle": "Team"
  },
  {
    "type": "get",
    "url": "/team/:id",
    "title": "查看团队详情",
    "name": "getTeam",
    "version": "1.0.0",
    "group": "Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logoURL",
            "description": "<p>标志 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
    },
    "filename": "router/Team.js",
    "groupTitle": "Team"
  },
  {
    "type": "get",
    "url": "/hackathon/:hid/team",
    "title": "查询黑客松团队",
    "name": "listHackathonTeam",
    "version": "1.0.0",
    "group": "Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hid",
            "description": "<p>黑客松 ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.logoURL",
            "description": "<p>标志 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.description",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "router/Team.js",
    "groupTitle": "Team"
  },
  {
    "type": "get",
    "url": "/team",
    "title": "全局查询团队",
    "name": "listTeam",
    "version": "1.0.0",
    "group": "Team",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.logoURL",
            "description": "<p>标志 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.description",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "router/Team.js",
    "groupTitle": "Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/hackathon/:hid/team",
    "title": "发起团队",
    "name": "postTeam",
    "version": "1.0.0",
    "group": "Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hid",
            "description": "<p>黑客松 ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..10",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "logoURL",
            "description": "<p>标志 URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..100",
            "optional": true,
            "field": "location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "10..100",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          }
        ]
      }
    },
    "filename": "router/Team.js",
    "groupTitle": "Team"
  },
  {
    "type": "put",
    "url": "/team/:id",
    "title": "更新团队详情",
    "name": "updateTeam",
    "version": "1.0.0",
    "group": "Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..10",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "logoURL",
            "description": "<p>标志 URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..100",
            "optional": true,
            "field": "location",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "10..100",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          }
        ]
      }
    },
    "filename": "router/Team.js",
    "groupTitle": "Team"
  },
  {
    "type": "get",
    "url": "/university/specialty",
    "title": "查询专业",
    "name": "listSpecialty",
    "version": "1.0.0",
    "group": "University",
    "filename": "router/OpenAPI.js",
    "groupTitle": "University",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user",
    "title": "全局查询用户",
    "name": "listUser",
    "version": "1.0.0",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.creator.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.editor.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor.github",
            "description": "<p>GitHub 用户详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "router/User.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    }
  }
] });
