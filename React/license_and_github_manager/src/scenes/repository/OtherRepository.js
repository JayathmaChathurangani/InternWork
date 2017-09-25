import React,{Component} from 'react';
import GitHubRepositoryTask from '../../services/bpmn/GitHubRepositoryTask';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import '../../App.css';

class OtherRepository extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:this.props.location.state.data,
      displayFieldset:'block',
      displayLoader:'none'
    }
  }
  submitRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (confirm("Are you sure to request it?") === false ) {
      return false ;
    }

    
    var data = this.state.data;
    var repositoryName = data[0];

    this.setState(function(){
      return{
        displayFieldset:'none',
        displayLoader:'block'
      }
    })
    
    GitHubRepositoryCreation.startProcess(data).then(function(response) {
      
      if(response.data.completed === false){
        try{
            
            GitHubRepositoryTask.getTasks().then(function(responseTasks){
            var i = 0;
            var taskArraylength = responseTasks.data.length;

            var task;
              for(i=0;i<taskArraylength;i++){
                  task = responseTasks.data[i];
                  if(task.processInstanceId === response.data.id){
                      LM_REPOSITORY.update(["REPOSITORY_BPMN_TASK_ID","REPOSITORY_BPMN_PROCESS_ID"],[task.id,response.data.id],"REPOSITORY_NAME",repositoryName);
                      alert("Your GitHub repository request send via e-mail for approval.");
                      break;
                  }
              }
            });

        }catch(err){
            alert(err);
        }
      }else{
          alert("Sorry database or e-mail sending error occur.Your GitHub repository request cannot send.")
      }
      this.setState(function(){
        return{
          displayFieldset:'block',
          displayLoader:'none'
        }
      });         
  }.bind(this));
   
  
    
    
    
  }
  /* submit function ends*/
  render(){
    
    return(
      <form className="form-horizontal" onSubmit={this.submitRequest.bind(this)} >
        <h2 className="text-center">Other GitHub Repository Here</h2>
        {console.log(this.props.location.state)}
        <fieldset style={{display:this.state.displayFieldset}}>
          <br/>
          
          <div className="form-group">
            <label htmlFor="inputGroupId" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Group ID</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" ref="inputGroupId" id="inputGroupId" placeholder="" />
              
            </div>
          </div>


          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
            <button type="reset" className="btn btn-default">Cancel</button> 
              &nbsp;&nbsp;&nbsp;
              <button type="submit" ref="submitButton" className="btn btn-info" id="form-horizontal" data-loading-text="Loading ..." disabled={this.state.buttonState} >Request</button>
            </div>
          </div>
        </fieldset>

        <div className="container-fluid" style={{display:this.state.displayLoader}}>
          <br/><br/><br/>
          <div className="row">
            <div className="col-lg-5">
              
            </div>
            <div className="col-lg-4">
              <div className="loader"></div>
            </div>
            <div className="col-lg-3">
              
            </div>
          </div>
          
        </div>

      </form>
    )

  }
}

export default OtherRepository;
