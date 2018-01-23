
function fetchFromAPI(next) {
    let url = 'https://api.github.com/gists/4ff8222a078d9db0096195a46ef2a783';

    $.getJSON(url, (gist) => {
        let shows = JSON.parse(gist.files['vost.json'].content);
        return next(null, shows);
    });
}

function fetchRaw(next) {
    let url = 'https://gist.githubusercontent.com/amm0nite/4ff8222a078d9db0096195a46ef2a783/raw/vost.json';

    $.get(url, (raw) => {
        let shows = JSON.parse(raw);
        return next(null, shows);
    });
}

function main() {
    fetchRaw((err, shows) => {
        shows.sort((a, b) => {
            return (new Date(a.date)) - (new Date(b.date));
        });
        shows = shows.filter((show) => {
            return (new Date()) < (new Date(show.date));
        });

        let days = [];
        shows.forEach((show) => {
            let found = days.find((day) => {
                return isInDay(show.date, day);
            });
            if (!found) {
                days.push(show.date);
            }
        });
        
        days.forEach((day) => {
            paintDay(day);
            let showsOfTheDay = shows.filter((show) => {
                return isInDay(show.date, day);
            });
            showsOfTheDay.forEach((show) => {
                paintShow(show);
            });
        });
    });
}

function isInDay(date, day) {
    let startOfDay = moment(day).startOf('day');
    let endOfDay = moment(day).endOf('day');
    return moment(date).isBetween(startOfDay, endOfDay);
}

function paintDay(day) {
    let dayBlock = $('#dayTemplate').clone();
    $('#list').append(dayBlock);
    dayBlock.find('h2').html(moment(day).format('dddd D MMMM'));
    dayBlock.show();
}

function paintShow(show) {
    let showBlock = $('#showTemplate').clone();
    $('#list').append(showBlock);
    showBlock.removeAttr('id');
    showBlock.find('.thumb').attr('src', show.thumb);
    showBlock.find('.title').html(show.title);
    showBlock.find('.type').html(show.type);
    showBlock.find('.time').html(moment(show.date).format('HH:mm'));
    showBlock.show();
}

main();