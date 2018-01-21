export default {
    statusOption: [
        {
            id: 1,
            name: '进行中'
        },
        {
            id: 2,
            name: '通过'
        },
        {
            id: 3,
            name: '拒绝'
        },
        {
            id: 4,
            name: '撤回'
        }
    ],
    auditRules: {
        status: [
            {
                required: true,
                message: '请选择状态'
            }
        ]
    },
    applyRules: {
        schoolId: [
            {
                required: true,
                message: '请选择校区'
            }
        ],
        applyCount: [
            {
                required: true,
                message: '请输入申请个数'
            }
        ],
        applyUserId: [
            {
                required: true,
                message: '请选择申请人'
            }
        ],
        address: [
            {
                required: true,
                message: '请填写教室地址'
            }
        ]
    }
}