import React from 'react'
import Box from './Box'
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./box.css');
class Master extends React.Component{
    constructor(props){
        super(props)
        this.state={
            games:[],
            filters:[],
            category:null
        }
        this.getGames=this.getGames.bind(this)
        this.searchByName=this.searchByName.bind(this)
        this.setFilter=this.setFilter.bind(this)
        this.setTag=this.setTag.bind(this)
        this.reseter=this.reseter.bind(this)
        this.gameList=[]
        this.filter=this.state.filters
    }
    getGames(){
        fetch("http://tapcubestudios.com/allgames.php",{
            headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers':'access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin',
                    'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
                    'Access-Control-Allow-Credentials':'true'
        }
        })
        .then(res=>res.json())
        .then(result=>{
            this.setState(()=>{
                this.gameList=result.games
                this.setFilter()
                return {games:this.gameList}
        })
        })
        .catch(x=>console.log(x))
    }
    searchByName(event){
        let toSearch=event.target.value
        let d=this.gameList.filter((x)=>{
            if(x["name"].includes(toSearch)){
                return x
               }
        })
        this.setState({games:d})
    }
    setFilter(event){
        let toFind=[]
        this.gameList.forEach(x=>{
            x["categories"].forEach(y=>{
				if(!toFind.includes(y)){
						toFind.push(y)
                }
            })
        })
        this.setState({filters:[...toFind]})
    }
    setTag(event){
        console.log("settag")
        let tag=event.target.value
            var data=this.gameList.filter(x=>{
                if(x["categories"].includes(tag)){
                    return true
                }
            })
            this.setState({games:data})
    }
    reseter(){
        this.setState({games:this.gameList})
    }
    componentWillMount(){
        this.getGames()
    }
    render(){
        return(
                <div className="wrapper">
                <div className={`controllers jumbotron jumbotron-fluid`} >
                    <div className="col-lg-6">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className={`btn controller-button`} type="button" >Search By Name</button>
                            </span>
                        <input type="text" className="form-control" onChange={this.searchByName} placeholder="Search for..." />
                    </div>
                </div>
                <div className="col-lg-6">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className={`btn controller-button`} type="button" >Search By Categories</button>
                            </span>
                            <select  className={`  dropdown-toggle`} onChange={this.setTag}>
                                <option value={"All"}>Select categories</option>
                                {this.state.filters.map(x=><option  value={x} key={x}> {x}</option>)} 
                            </select>
                         <button className={` btn controller-button reseter`} onClick={this.reseter}>Reset</button>
                    </div>
                </div>
                </div>
                    <div className="row">
                        {this.state.games.map(x=><Box key={x.code} data={x}/>)}
                    </div>
                </div>
        )
    }
}
export default Master