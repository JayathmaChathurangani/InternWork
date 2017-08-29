import React,{Component} from 'react';

class Result extends Component {

  render(){
    console.log(this.props.resultData);

    const list = this.props.resultData.map((element)=>{
      return(element.firstName);
    });
      //console.log("result",list)

    return(

      <div className="row">
        <div className="col-md-8">
        <h3>Result</h3>
        <p>
          {list}<br/>


        </p>

        </div>
      </div>
    )
  }
}
export default Result;
