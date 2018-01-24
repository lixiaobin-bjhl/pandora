export default {
    modifyRule: {
        name: [
            {
                required: true,
                message: '请输入客户姓名'
            }
        ],
        mobile: [
            {
                required: true,
                message: '请输入手机号'
            }
        ],
        gender: [
            {
                required: true,
                message: '请选择性别'
            }
        ]
    },
    addItemRule: {
        projectId: [
            {
                required: true,
                message: '请选择项目'
            }
        ],
        doctorId: [
            {
                required: true,
                message: '请选择项医生'
            } 
        ],
        operatDate: [
            {
                required: true,
                message: '请选择项目时间'
            } 
        ]
    }
}