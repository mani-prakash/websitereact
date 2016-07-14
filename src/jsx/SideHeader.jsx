import React from 'react';
import Constants from './Constants.jsx';
class SideHeader extends React.Component{
    constructor(props){
        console.log(" side header works const");
        super(props);
    }
    render(){
        var style = {
            position: 'fixed',
            top : Constants.HEADER_SPACE,
            left: 0,
            width: '70%',
            height: '90%',
            zIndex: '1000',
            backgroundColor: '#FFFFFF',
            fontSize:'4em',
            color: '#000000',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };
        let tupleStyle = {float:'right','width':'100%',fontSize:'1em','padding':'3px 4px'};
        let imageStyle = {'padding':'0px 48px'};
        let func = this.props['screenChange'];
        return(
        <div style={style} className='fadeInLeft'>
            <div style={tupleStyle} className='navigationTuple verticalCenter' onClick={() => func(Constants.CHANGE_CITY_SCREEN)}>
                <div>
                    <span style={imageStyle}><img style={{height:48,width:48}} src={Constants.assets+'/navigation/change_city_navigation.png'} /></span>
                    <span>Change City</span>
                </div>
            </div>
            <div style={tupleStyle} className='navigationTuple verticalCenter' onClick={() => func(Constants.CHANGE_CITY_SCREEN)}>
                <div>
                    <span style={imageStyle}><img style={{height:48,width:48}} src={Constants.assets+'/navigation/change_city_navigation.png'} /></span>
                    <span>About us</span>
                </div>
            </div>
            <div style={tupleStyle} className='navigationTuple verticalCenter'>
                <a href="https://blog.zophop.com" style={{textDecoration:'none'}} target="_blank">
                    <span style={imageStyle}><img style={{height:48,width:48}} src={Constants.assets+'/navigation/change_city_navigation.png'} /></span>
                    <span>Blog</span>
                </a>
            </div>
            <div style={tupleStyle} className='navigationTuple verticalCenter' onClick={() => func(Constants.CHANGE_CITY_SCREEN)}>
                <div>
                    <span style={imageStyle}><img style={{height:48,width:48}} src={Constants.assets+'/navigation/change_city_navigation.png'} /></span>
                    <span>Contact Us</span>
                </div>
            </div>
            <div style={tupleStyle} className='navigationTuple verticalCenter'>
                <a href="https://app.adjust.com/j3cg8i" style={{textDecoration:'none'}} target="_blank">
                    <span style={imageStyle}><img style={{height:48,width:48}} src={Constants.assets+'/navigation/change_city_navigation.png'} /></span>
                    <span>Download App</span>
                </a>
            </div>
        </div>);
    }
}

export default SideHeader;