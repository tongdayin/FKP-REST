var libs = require('libs/libs');
var Textarea = require('./_component/_textarea')()
var render = React.render;


function select(data, ele, cb){

    if(data===true)
        return Select
    else{
        render(
            <Textarea data={data} itemMethod={cb} listClass={'form textarea'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = select