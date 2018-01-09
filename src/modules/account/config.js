export default {
    addAccountRule: {
        accountName: [
            {
                required: true,
                message: '请输入账号'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码'
            },
            {
                min: 4,
                trigger: 'blur',
                message: '请至输入4个字符'
            }
        ],
        newPwd: [
            {
                required: true,
                message: '请输入密码'
            },
            {
                min: 4,
                trigger: 'blur',
                message: '请至输入4个字符'
            }
        ],
        userName: [
            {
                required: true,
                message: '请输入名字'
            } 
        ],
        roleType: [
            {
                required: true,
                message: '请选择角色'
            }   
        ],
        // rtmType: [
        //     {
        //         required: true,
        //         message: '请选择RTM'
        //     }
        // ],
        agencyIds: [
            {
                required: true,
                type: 'array',
                message: '请选择所属范围'
            }
        ]
    },
    statusOptions: [
        {
            id: 0,
            name: '使用中'
        },
        {
           id: 1,
           name: '已停用'
        },
        {
            id: 2,
            name: '已删除'
        }
    ],
    roleOptions: [
        {
            id: 0,
            name: '合作伙伴培训师'
        },
        {
            id: 1,
            name: '合作伙伴培训师经理'
        },
        {
            id: 2,
            name: '苹果销售'
        },
        {
            id: 3,
            name: '苹果培训师' 
        }
    ],
    rtmOptions: [
        {
            id: 0,
            name: 'CES'
        },
        {
            id: 1,
            name: 'CS'
        },
        {
            id: 2,
            name: 'IT/LS'
        },
        {
            id: 3,
            name: 'Mono'
        },
        {
            id: 4,
            name: 'OTC'
        },
        {
            id: 5,
            name: 'Carrier'
        }
    ]
}