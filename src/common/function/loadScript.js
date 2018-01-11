
export default function loadScript(url, callback) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = script.onreadystatechange = function() {
        if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode) {
                head.removeChild(script);
            }
        }
    };
    head.insertBefore(script, head.firstChild);
};