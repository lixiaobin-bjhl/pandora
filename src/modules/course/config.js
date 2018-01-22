export default {
    statusOptions: [
        {
            name: '上架',
            id: 1
        },
        {
            name: '下架',
            id: 0
        }
    ],
    applyCourseRules: {
        classRoomId: [
            {
                required: true,
                message: '请选择教室'
            }
        ]
    },
    addCourseRules: {
        name: [
            {
                required: true,
                message: '请输入课程名称'
            }
        ],
        schoolId: [
            {
                required: true,
                message: '请输入校区名称'
            }
        ],
        cover: [
            {
                required: true,
                message: '请选择课程封面'
            }
        ],
        teacherId: [
            {
                required: true,
                message: '请选择主讲老师'
            }
        ],
        subjectType: [
            {
                required: true,
                message: '请选择科目'
            }
        ],
        classRoomId: [
            {
                required: true,
                message: '请选择教室'
            }
        ],
        enableRepeat: [
            {
                validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请选择课节重复信息'));
                    } else {
                        callback();
                    }
                }
            }
        ],
        startDay: [
            {
                required: true,
                message: '请选择上课日期'
            }
        ],
        timeRange: [
            {
                required: true,
                message: '请选择上课时间段'
            }
        ]
    }
}