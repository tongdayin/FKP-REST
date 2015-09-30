var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var textForm = {
	mixins: [ItemMixin],
	getInitialState: function() {
        this.addSheet();
		return {
			data: []
		}
	},
	componentWillMount: function(){
		if(this.props.data){
			this.setState({
				data: this.props.data
			})
		}
	},
	componentDidMount: function () {

	},

    addSheet: function(){
        //添加css到头部
    },

	componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },

	renderContent: function(){
	},

    render: function () {
		var label;
		var body;
		if(this.state.data){
			var theData = this.state.data;
			label = theData.label||'演示';
			body = theData.body||'没有传入数据'
		}
        return(
			<div className={'form text'} data-value={''}>
				<label>{label}</label>
				<div className={'body'}>
					<input type="text"></input>
				</div>
			</div>
        )
    }
}

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Textform',
        _rct = libs.clone(textForm);

	// if( _rct.mixins && _rct.mixins.length ){
	// 	_rct.mixins.push( Store( _storeName ))
    // }
	// else{
	// 	_rct.mixins = [ Store( _storeName ) ]
    // }

    return React.createClass( _rct );
}

module.exports = actRct;
