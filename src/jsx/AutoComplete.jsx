import React from 'react';
import FetchUtils from './FetchUtils.jsx';
import Autosuggest from 'react-autosuggest';
import Utils from './Utils.jsx';
import Store from './Store.jsx';
import Constants from './Constants.jsx';
class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.city = Store.city['city'];
        this.selectedMode = this.props['data']['selectedMode'];
        this.type = this.props['data']['searchState'];
        this.state = {
            value: '',
            suggestions: this.getSuggestions(''),
        };
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
        this.renderStopSuggestionValue = this.renderStopSuggestionValue.bind(this);
    }
    goBackMethod(data){
        var func = this.props['data']['goBackMethod'];
        var dt = this.props['data'];
        if(Utils.validate(data))
        {
            func(data, dt);
        }
        else{
            func(null, dt);
        }
    }
    getStopSuggestionValue(tuple){
        //called when one of the items in auto complete are selected
        //props.parent.getSelectedRoute(tuple['route_id']);
        console.log(this);
        this.inputProps.parent.goBackMethod(tuple);
        return tuple[this.type+'_name'];
    }
    renderStopSuggestionValue(tuple){
        // object for every item in the list-autocomplete
        return (
            <span>{tuple[this.type+'_name']}</span>
        );
    }
    getSelectedRoute(value){
        this.serverRequest = $.get(Constants.Scheduler_Url+"/"+this.city+"/routedetails?day=monday&route_id="+value+"&station_type="+this.selectedMode,
            function (result) {
                var data = JSON.parse(result);
                this.routeData = data;
                this.setState({
                    route:this.routeData
                })
            }.bind(this));
    }
    getAutoCompleteList(value) {
        let url = Constants.Scheduler_Url+"/"+this.city+"/autocomplete/"+this.type+"?day=monday&station_type="+this.selectedMode+"&str="+value;
        let serverRequest = FetchUtils.getData(url);
        let self = this;
        serverRequest.then(function(result){
            if(Utils.validate(result))
            {
                console.log(result);
                var data = result;
                if(Utils.validate(data))
                {
                    self.autocompleteList = data;
                }
            }
        });
    }
    getList(list){
        var string = "";
        for(var i=0;i<list.length;i++)
        {
            string+="<div>"+list[i][this.type+'_name']+"</div>";
        }
        return string;
    }
    onChange(event, { newValue }) {
        console.log(newValue);
        console.log(this);
        this.setState({
            value: newValue
        });
    }
    getSuggestions(value) {

        const inputValue = value.trim().toLowerCase();
        this.getAutoCompleteList(inputValue);
        //this.componentDidMount(inputValue);
        const inputLength = inputValue.length;
        let selfType = this.type;
        var list = inputLength === 0 ? [] : this.autocompleteList.filter(lang =>
            lang[selfType+'_name'].toLowerCase().slice(0, inputLength) === inputValue
        );
        console.log(list);
        return list;
    }
    onSuggestionsUpdateRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
    onSuggestionSelected(event, list)//(event, { suggestion, suggestionValue, sectionIndex, method })
    {
        console.log(list['suggestion']);
        console.log("hey it works");
        var selected = function () {
            //console.log("this is binded"+list['suggestion']['route_id']);
            //console.log("this is binded "+this.city);
            //this.getSelectedRoute(list['suggestion']['route_id']);
        }.bind(this);
        selected();
    }
    render(){
        //let sug = this.state['suggestions'];
        const { value, suggestions } = this.state;
        let inputProps = {
            placeholder: this.type,
            value,
            onChange: this.onChange,
            parent : this
        };
        console.log();
        let styles = {width:'70%',height:'100px',fontSize:Constants.FONT_SIZE, display:'inline-block'};
        return (
            <div>
                <div style={{background:'white'}}>
                    <img src={Constants.BLACK_BACK_ARROW} className='headerItem' style={{display:'inline-block',verticalAlign:'middle'}} onClick={this.goBackMethod.bind(this,null)} />
                    <Autosuggest style={styles} suggestions={suggestions}
                             onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                             getSuggestionValue={this.getStopSuggestionValue}
                             renderSuggestion={this.renderStopSuggestionValue}
                             inputProps={inputProps}
                             onSuggestionSelected={this.onSuggestionSelected}
                             parent={this}/>
                </div>
            </div>
        );
    }
}

export default AutoComplete;