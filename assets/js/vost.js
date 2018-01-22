
function fetch() {
    let url = 'https://api.github.com/gists/4ff8222a078d9db0096195a46ef2a783';
    $.getJSON(url, (gist) => {
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