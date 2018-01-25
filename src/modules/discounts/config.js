export default {
    addActiveRule: {
        name: [
            {
                required: true,
                message: '请输入活动名称'
            }
        ],
        couponRuleId: [
            {
                required: true,
                message: '请选择发送卡劵'
            }
        ],
        triggerType: [
            {
                required: true,
                message: '请选择发券方式'
            }
        ]
    },
    triggerTypeOption: [
        {
            id: 1,
            name: '首次关注公众号时发送'
        },
        {
            id: 2,
            name: '立即群发全部公众号粉丝'
        }
    ]
}