var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/login')
    var mtd = this.method;
    if(mtd==='GET'){
        return oridata;
    }

    if(mtd === 'POST'){

        var wx_postdata = {
          "common": {
        	"openid":"empty"
          }
        }

        var postdata = {
          "common": {
        	"smscode":"123456"
          },
          "content": [
                {
                 "mobile": "13333333333"
                }
            ]
        }

        var body = yield libs.$parse(this);
        console.log('999999999 for login body 9999999999');
        console.log(body);
        if(body){
            if(body.mobile)
                postdata.content[0].mobile = body.mobile;

            if(body.openid){
                postdata = wx_postdata;
                postdata.common.openid = body.openid;
            }

            var logindata = yield api.pullApiData('login', postdata, 'post')
            console.log('ooooooooo for openid user ooooooooo');
            console.log(logindata[0]);

            return oridata;
        }

        // var qcjc = libs.$extend(true, {}, postdata);
        // qcjc.content[0].ServiceTypeNo = 'FW0003';
        //
        // var qcjcdata = yield api.pullApiData('service', qcjc, 'post')
        // var qd = qcjcdata[1].results[0];
        // var serviceData = yield api.pullApiData('service', postdata, 'post')
        // console.log(serviceData[1]);
        //
        //
        // return serviceData[1];
    }



}

module.exports = {
    getData : demoIndexData
}