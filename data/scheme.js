module.exports = {
    '*':         {
        id:       'Integer Primary Key',
        uid:      'Integer',
        ctime:    "DateTime default (datetime('now', 'localtime'))"
    },
    user:        {
        name:    'Text not Null',
        key:     'Text',
        logo:    'Text not Null',
        www:     'Text not Null'
    },
    activity:    {
        title:          'Text not Null',
        keyWord:        'Text not Null',
        startTime:      'Integer not Null',
        endTime:        'Integer not Null',
        location:       'Text not Null',
        description:    'Text not Null'
    },
    project:     {
        title:    'Text not Null',
        git:      'Text not Null'
    }
};