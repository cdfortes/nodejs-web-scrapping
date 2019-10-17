// Web scraping in Node
const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');

const options = {
    url: `http://www.emprofac.cv/informacoes-uteis/farmacia-servico?qt-se_farmacias_servico=2`,
    transform: body => cheerio.load(body)
};

rp(options)
    .then(function ($) {
        console.log($('.table-farmacias-servico', '#quicktabs-tabpage-se_farmacias_servico-2').html());
    })
    .catch(function (err) {
        console.log(err);
    });