import React from 'react';
import {SchedulerHeader} from './AppHeader.jsx';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import Store from './Store.jsx';
class ChangeCity extends React.Component{
    constructor(props){
        console.log(" Change City works const");
        super(props);
    }
    changeCity(newCity)
    {
        if(!Utils.stringCompare(newCity,Store['city']['city']))
        {
            Store.changeCity(newCity);
        }
    }
    render(){
        let func = this.props['screenChange'];
        let self = this;
        let styles = {
            fontSize : '3em'
        };
        let element = Store['metadata'].map(function (city, index) {
            return <div className='listTuple cursorPointer borderBottom' style={styles} key={city['city']}
                        onClick={() => self.changeCity(city['city'])}>{city['city']}
            </div>
        });

        return (<div>
                <div className='verticalCenter'>
                    <span className='cursorPointer' onClick={() => func(Constants.HOMESCREEN)}>
                        <img className='headerItem' src={Constants.BACKARROW} />
                    </span>
                    <span style={{fontSize:Constants.FONT_SIZE}}>
                        Select City
                    </span>
                </div>
                <div>
                    {element}
                </div>
            </div>
                );
    }
}

export default ChangeCity;