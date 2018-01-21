export default {
    addLessonRule: {
        schoolId: [
            {
                required: true,
                message: '请选择校区'
            }
        ],
        roomId: [
            {
                required: true,
                message: '请选择教室'
            }
        ],
        teacherId: [
            {
                required: true,
                message: '请选择老师'
            }
        ],
        startTime: [
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