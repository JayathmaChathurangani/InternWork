import React,{Component} from 'react';
import {Link} from 'react-router';
import ValidateUser from '../../services/authentication/ValidateUser';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';


class SearchRepository extends Component{
  
  constructor(props){
    super(props);
    
    this.repo = null;
    this.state = {
      
      repositoryDetails:[],
      userDetails:[],
      repositoryTable:[]
      
    }
    
  }

  /* component did mount */
  
  componentWillMount(){
    
    /* store user detaills */
    ValidateUser.getUserDetails().then(function(response){
      
      this.setState(function(){
        return {
          userDetails:response
        }
      });

    }.bind(this));
    /* store user detaills ends*/

    LM_REPOSITORY.selectAll().then(function(response){
        
        console.log(response)
        var tableArray =[];
        var character = response[0].REPOSITORY_NAME[0];
        var repository = {};
        var i = 0;
        tableArray.push(
            
            <tr key={character} >
                <td>
                    <button style={{'width':'150px'}} type="button" className="btn btn-info" data-toggle="collapse" data-target={"#demo"+character}>{character.toUpperCase()}</button>
                </td>
            </tr>
            
        );
        for(i=0;i<response.length;i++){
            repository = response[i];
            console.log(repository.REPOSITORY_NAME[0],character)
            if(repository.REPOSITORY_NAME[0] === character){
                tableArray.push(
                    <tr id={"demo"+character}  className="collapse info" key={repository.REPOSITORY_ID}>
                        <td>{repository.REPOSITORY_NAME}</td>
                        <td>{repository.REPOSITORYTYPE_NAME}</td>
                        <td>{repository.ORGANIZATION_NAME}</td>
                        <td>{repository.LICENSE_NAME}</td>
                        <td>{repository.REPOSITORY_LANGUAGE}</td>
                        <td>{(repository.REPOSITORY_NEXUS)?" Yes ":" No "}</td>
                        <td>{(repository.REPOSITORY_BUILDABLE)?"Yes":"No"}</td>
                        <td>{repository.REPOSITORY_REQUEST_BY}</td>
                        <td><Link to={"acceptRepository?repositoryId=" + repository.REPOSITORY_ID}>More</Link></td>
                    </tr>
                );
            }else{
                
                
                
                character = response[i].REPOSITORY_NAME[0];
                tableArray.push(
                    <tr key={character}>
                        <td>
                            
                            <button style={{'width':'150px'}} type="button" className="btn btn-info" data-toggle="collapse" data-target={"#demo"+character}>{character.toUpperCase()}</button>
                        </td>
                    </tr>
                );
                
                
                tableArray.push(
                    <tr id={"demo"+character} className="collapse info" key={repository.REPOSITORY_ID}>
                        <td>{repository.REPOSITORY_NAME}</td>
                        <td>{repository.REPOSITORYTYPE_NAME}</td>
                        <td>{repository.ORGANIZATION_NAME}</td>
                        <td>{repository.LICENSE_NAME}</td>
                        <td>{repository.REPOSITORY_LANGUAGE}</td>
                        <td>{(repository.REPOSITORY_NEXUS)?" Yes ":" No "}</td>
                        <td>{(repository.REPOSITORY_BUILDABLE)?"Yes":"No"}</td>
                        <td>{repository.REPOSITORY_REQUEST_BY}</td>
                        <td><Link to={"acceptRepository?repositoryId=" + repository.REPOSITORY_ID}>More</Link></td>
                    </tr>
                );
                
                
            }
            
        }
        this.setState(function(){
            return {
              repositoryTable:tableArray
            }
          });
    
        
  
      }.bind(this));


  }
    /* component will mount ends*/

  

  /** show error box function starts */
  showErrorBox(){
    this.setState(function(){
      return{
        showErrorBox:'block'
      }
    });
  }
  /** show error box function ends */
  /* accept request function start */

  searchRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    
    
    

    
  }
    /* accept request function ends */

    

  render(){
    
    return(
      
      <form className="form-horizontal"  onSubmit={this.searchRequest.bind(this)}>
          
          
        <fieldset style={{display:this.state.displayFieldset}}>
          {console.log(this.state.repositoryDetails)}
            <br/><br/>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-3">
                  
                    </div>
                    <div className="col-md-6">
                        <input  type="text" className="form-control" ref="inputRepositoryName" id="inputRepositoryName" placeholder="Enter repository name to search" />
                    
                    </div>
                    <div className="col-md-3">
                  
                    </div>
                </div>
                
            </div>
            <table className="table table-striped table-hover ">
                <thead>
                
                    <tr className="success">
                        <th style={{'width':'160px'}}>Name</th>
                        <th>Type</th>
                        <th>Organization</th>
                        <th>License</th>
                        <th>Language</th>
                        <th>Nexus</th>
                        <th>Jenkins</th>
                        <th>Requested By</th>
                        <th>More Details</th>
                    </tr>
                </thead>
                <tbody>
                           
                    {(this.state.repositoryTable.length > 0)?this.state.repositoryTable.map((repository)=>
                    
                        repository
                    
                    ):""}
                </tbody>
            </table>
          <br/>
          
        </fieldset>

      </form>
    )

  }
}

export default SearchRepository;
