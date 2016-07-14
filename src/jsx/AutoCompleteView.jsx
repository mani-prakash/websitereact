import React from 'react';
import FetchUtils from './FetchUtils.jsx';
import Autosuggest from 'react-autosuggest';
import Utils from './Utils.jsx';
import Store from './Store.jsx';
import Constants from './Constants.jsx';
export default class AutoCompleteView extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state['type'] = this.props['state']['type'];
        this.state['dataList'] = [];
        this.selectedData = null;
        this.dataList = [];
    }
    getAutoCompleteData(string){
        let promise = this.props.state.getData(string);
        let self = this;
        promise.then(
            function(data)
            {
                console.log('promise recieved');
                self.setAutoCompleteData(data);
            });
    }
    setAutoCompleteData(data)
    {
        this.setState({
            value: this.value,
            dataList : data
        });
    }

    goBack(){
        console.log(this.props);
        this.props.state.backScreen();
    }
    getDataDivs(){
        let list = this.state.dataList;
        let type = this.state['type'];
        let getDiv = this.props['state']['getDiv'];
        let divs = list.map(function(data,index){
            return getDiv(data,index);
        });
        return divs;
    }
    keyEntered(event)
    {
        let value = event.target.value;
        this.value = value;
        this.getAutoCompleteData(value);

    }
    clearData(){
        this.setState({
            value : '',
            dataList : []
        });
    }
    render(){
        return (<div style={{width:'100%',height:'100%',background:'#FFFFFF'}}>
                    <div className='actionBar' style={{width:'100%'}}>
                        <img style={{display:'inline-block'}} onClick={this.goBack.bind(this)} className='headerItem' src={Constants.BLACK_BACK_ARROW}/>
                        <input onChange={this.keyEntered.bind(this)} value={this.state.value} style={{paddingLeft:10, paddingRight:10, border:'0px',display:'inline-block', fontSize:Constants.FONT_SIZE,width:Utils.getWidthOfScreen(48*2),height:Constants.INPUT_HEIGHT}} placeholder={this.state['type']}/>
                        <img style={{display:'inline-block'}} onClick={this.clearData.bind(this)} className='headerItem' src={Constants.IMAGESRC.CLOSE}/>
                    </div>
                    <div className='dataDisplay' style={{width:'100%'}}>
                        {this.getDataDivs()}
                    </div>
                </div>);
    }
}
