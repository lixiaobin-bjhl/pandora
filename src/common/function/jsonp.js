

/**
 * 发送跨域的 jsonp请求
 *
 * @param  {string} url
 * @param  {Object} data
 * @return {Promise}
 */
export default function jsonp(url, data) {
    return $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp'
    });
}