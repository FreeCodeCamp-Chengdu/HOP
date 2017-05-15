module.exports = {
    '*':         {
        id:       'Integer Primary Key',
//        uid:      'Integer not Null',
        ctime:    "DateTime default (datetime('now', 'localtime'))"
    },
    activity:    {
        title:          'Text not Null',
        keyWord:        'Text not Null',
        startTime:      'Integer not Null',
        endTime:        'Integer not Null',
        location:       'Text not Null',
        description:    'Text not Null'
    }
};