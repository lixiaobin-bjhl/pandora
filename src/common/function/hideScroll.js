/**
 * @fileOverview 隐藏/显示滚动条
 * @param {boolean} isHide true-隐藏，false-显示
 * @param {Object} target 被操作的Dom元素
 */
export default function (isHide, target) {
    target = target === undefined ? document.getElementsByTagName('body')[0] : target;
    isHide = isHide === undefined ? true : isHide;

    let flag = isHide ? 'hidden' : 'auto';
    target.style.overflow = flag;
};