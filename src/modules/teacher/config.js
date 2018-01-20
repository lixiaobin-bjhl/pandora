export default {
    addTeacherRule: {
        name: [
            {
                required: true,
                message: '请输入教师姓名'
            }
        ],
        subjectType: [
            {
                required: true,
                message: '请选择科目'
            }
        ],
        // teacherType: [
        //     {
        //         required: true,
        //         message: '请选择教师类型'
        //     }
        // ],
        schoolId: [
            {
                required: true,
                message: '请选择所属校区'
            }
        ],
    }
}