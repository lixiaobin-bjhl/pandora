export default function setTitle (t) {
    document.title = t;
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
        setTimeout(function(){
        i.remove();
        }, 9)
    }
    document.body.appendChild(i);
}