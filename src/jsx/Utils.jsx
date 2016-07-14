class Utils{
    constructor(){

    }
    static stringCompare = function(string1,string2){
        let str11 = string1.replace(/ /g , "");
        let str22 = string2.replace(/ /g , "");
        str11 = str11.toLowerCase().trim();
        str22 = str22.toLowerCase().trim();
        if (str11.localeCompare(str22)==0) {
            return true;
        }
        return false;
    };
    static getTimeFormatFromSec = function(time){
        let tmStr = "";
        let secs = time;
        let hrs = Math.floor(secs/3600);
        let mins = Math.floor((secs%3600)/60);
        return hrs+" : "+mins;
    };
    static validate = function(object){
        if(typeof object === 'undefined'||object === null)
        {
            return false;
        }
        return true;
    };
    static getValidatedObject = function(object){
        if(typeof object === 'undefined'||object === null)
        {
            return {};
        }
        return object;
    };
    static getValidatedString = function(object){
        if(typeof object === 'undefined'||object === null)
        {
            return '';
        }
        return object;
    };
    static getTimeStringFromSec = function(time){
        let mins = time/60;
        let hr = Math.floor(mins/60);
        let hrString = (hr<10)?'0'+hr:hr;
        mins = Math.floor((time/60)%60);
        let minsString = (mins<10)?'0'+mins:mins;
        return hrString+':'+minsString;
    };
    static firstLetterCapital = function(string){
        return string.substring(0,1).toUpperCase()+string.substring(1,string.length).toLowerCase();
    };
    static getTimeTakenStringFromSec = function(time){
        let tmStr = "";
        let secs = time;
        if(secs==-1)
        {
            return "0 sec";
        }
        if(secs<60)
        {
            return secs+" sec";
        }
        if(secs>3600)
        {
            tmStr += parseInt(secs/3600,10)+" hr ";
            secs = secs%3600;
        }
        if(secs>60)
        {
            tmStr += parseInt(secs/60,10)+" min ";
            secs = secs%60;
        }
        return tmStr;
    };
    static getWidthOfScreen(removeWidth){
        console.log(window.innerWidth-removeWidth);
        return window.innerWidth-removeWidth;
    }
    static Base_Url = 'http://test.zophop.com:8080/scheduler_v4/v4';
}
export default Utils;