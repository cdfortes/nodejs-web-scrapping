// Web scraping in Node
const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');
const fs = require('fs');


const writeStream = fs.createWriteStream('farmacias.csv');


writeStream.write(`Data,Farmacia,Endereço,Telefone,Fax \n`);


let table = new Table({
    head: ['data', 'Nome', 'zona', 'phone', 'pone2'],
    colWidths: [15, 15, 20, 15, 15]
});

const options = {
    url: `http://www.emprofac.cv/informacoes-uteis/farmacia-servico?qt-se_farmacias_servico=2`,
    transform: body => cheerio.load(body)
};

rp(options)
    .then(function ($) {

        process.stdout.write('loading');
        $('.table-farmacias-servico tbody tr', '#quicktabs-tabpage-se_farmacias_servico-2').each((i, el) => {
            const arr = [];
            $('td', el).each((j, ol) => {
                arr.push($(ol).text());
                process.stdout.write(`.`);
            })
            table.push([arr[0], arr[1], arr[2], arr[3], arr[4]]);
            writeStream.write(`${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]} \n`)
        });
        printData();

    })
    .catch(function (err) {
        console.log(err);
    });



function printData() {
	console.log("✅");
	console.log(table.toString());
}
