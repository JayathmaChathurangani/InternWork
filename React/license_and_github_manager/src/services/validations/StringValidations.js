import {Component} from 'react';

class StringValidations extends Component{

    escapeCharacters(str){
        str = str.replace(/\n/g,"\\\\n");
        str = str.replace(/'/g,"\\\\'");
        str = str.replace(/"/g,'\\"');
        str = str.replace(/;/g,'\\\\;');

        return str;
    }

    setStringToShow(str){
        str = str.replace(/\\\\n/g,"\n");
        str = str.replace(/\\n/g,"\n");
        str = str.replace(/\\'/g,"'");
        str = str.replace(/\\;/g,';');

        return str;
    }
}

export default (new StringValidations());