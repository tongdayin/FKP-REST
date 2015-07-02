var libs = require('../libs/libs')
var api = require('../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoIndexData(oridata){

    libs.clog('pages/search.js');

    var apiData={};
    var mtd = this.method;

    if(mtd==='GET'){
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash
        apiData = yield api.search({
            'st': 1,
            'sc': '网'
        });
    }

    else if(mtd==='POST'){
        var body = libs.$parse.json(this);
        apiData = yield api.search(body);
    }

    var jsonData = JSON.parse(apiData[1]);
    oridata = libs.$extend(true,oridata,jsonData);
    // libs.clog(oridata);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
