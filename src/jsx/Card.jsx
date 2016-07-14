import React from 'react';
import Constants from './Constants.jsx';
export class Card extends React.Component{
    constructor(props){
        super(props);
    }
    getBodyContent()
    {

    }
    getHeaderContent(){

    }
    render(){
        return(
            <div>
                <div class='cardHeader'>
                    {this.getHeaderContent()}
                </div>
                <div class='cardBody'>
                    {this.getBodyContent()}
                </div>
            </div>
        );
    }
}

/*export class SchedulerTripCard extends React.component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let tuple = this.props['data'];
        let styles = {display:'inline-block'};
        let legs = tuple['legs'];
        let changeAtList = <div className='row'></div>;
        let changeList = legs.map(function(tuple,index){
            if(index===0)
            {
                return (<div className='tripTime' styles={styles}>
                    &nbsp;<img className='tripImage' src={Constants.assets+'/planner/train_trip_planner.png'} />
                    &nbsp;{tuple['start_place_name']}
                </div>);
            }
            else{
                return (<div className='tripTime' styles={styles}>
                    &nbsp;>&nbsp;<img className='tripImage' src={Constants.assets+'/planner/train_trip_planner.png'} />
                    &nbsp;{tuple['start_place_name']}
                </div>);
            }
        });
        if(legs.length>1)
        {
            changeAtList = (<div className='row'>
                Change at
                {legs.map(function(tuple, index){
                    if(index===0)
                        return '';
                    else if(index==1)
                        return ' '+tuple['start_place_name'];
                    return ', '+tuple['start_place_name'];
                })}
            </div>);
        }

        return (<div key={index} className='tripCard container-fluid'>
            <div className='row'>
                <div className='col-sm-4'>{Utils.getTimeTakenStringFromSec(tuple[Constants.TIMETAKEN])}</div>
                <div className='col-sm-2'> Fare : {tuple['fares'][0]['default_fare']}</div>
                <div className='col-sm-4'> {tuple[Constants.NO_OF_CHANGES]} Change</div>
            </div>
            <div className='row'>
                {changeList}
            </div>
            {changeAtList}
        </div>);
    }
}*/