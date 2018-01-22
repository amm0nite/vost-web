
function getJSON(url, next) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == XMLHttpRequest.DONE) {
            httpRequest.onreadystatechange = null;
            if (httpRequest.status == 200) {
                let data = JSON.parse(httpRequest.responseText);
                return next(null, data);
            } else {
                return next({
                    code: httpRequest.status,
                    message: httpRequest.responseText
                });
            }
        }
    };
    httpRequest.open('GET', url, true);
    httpRequest.send(null);
}

function fetch() {
    let url = 'https://api.github.com/gists/4ff8222a078d9db0096195a46ef2a783';
    getJSON(url, (err, gist) => {
        if (err) return console.log(err);
        let shows = JSON.parse(gist.files['vost.json'].content);
        shows.sort((a, b) => {
            return (new Date(a.date)) - (new Date(b.date));
        });
        reset();
        shows.forEach((show) => {
            paint(show);
        });
    });
}

function paint(show) {
    let showBlock = $('#template').clone();
    $('#shows').append(showBlock);
    showBlock.find('.thumb').attr('src', show.thumb);
    showBlock.find('.title').html(show.title);
    let date = new Date(show.date);
    showBlock.find('.time').html(date.toLocaleString());
    showBlock.show();
}

fetch();