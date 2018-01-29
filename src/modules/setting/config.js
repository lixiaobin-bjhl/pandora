export default {
    addCarePlanRules: {
        afterOperate: [
           {
               required: true,
               message: '请选择术前或术后'
           } 
        ],
        period: [
            {
                required: true,
                message: '请输入发送时间'
            },
            {
                validator: (rule, value, callback) => {
                    if (value <= 0) {
                        callback(new Error('发送时间不能小于等于0'));
                    } else if (value > 99999) {
                        callback(new Error('发送时间不能超过99999'));
                    } else {
                        callback();
                    }
                }
            }
        ],
        noticeDesc: [
            {
                required: true,
                message: '请输入提醒事项'
            }
        ]
    }
}