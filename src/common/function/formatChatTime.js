/**
 * @fileOverview 格式化聊天时间
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';


import padZero from './padZero';

/**
 * 格式化时间
 */
export default function formatChatTime(ms) {
    let time = new Date(ms);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let timeTag = hour > 12 ? ' 下午 ' : ' 上午 ';
    let formattedTime = year + '年' + month + '月' + day + '日' + timeTag + padZero(hour) + ':' + padZero(minute);
    return formattedTime;
};