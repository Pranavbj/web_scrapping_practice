const request = require('request');
const cheerio= require('cheerio');

const fs = require('fs');


const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request('https://codedemos.com/sampleblog', (error, response, html) => {
    if(!error && response.status==200){
        const $=cheerio.load(html);

        $('post-preview').each((i,el)=>{
            const title=$(el).find('.post-title').text().replace(/\s\s+/g,'');
            const link = $(el).find('a').attr('href');
            const date = $(el).find('.post-date').text().replace(/,/, '');
            writeStream.write(`${title}, ${link}, ${date} \n`);

        });
        console.log('Scraping Done...');
    }

});