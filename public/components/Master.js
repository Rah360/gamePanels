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
            flag:false,
            currentFilter:null
        }
        this.getGames=this.getGames.bind(this)
        this.searchByName=this.searchByName.bind(this)
        this.setFilter=this.setFilter.bind(this)
        this.setTag=this.setTag.bind(this)
        this.gameList=[]
        this.filt=[]
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
            this.setState((prev)=>{
                this.gameList=result.games
                return {games:prev.games.concat(this.gameList)}
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
        let filter=event.target.value
        let toFind=[]
        this.gameList.forEach(x=>{
            x[filter].forEach(y=>{
				if(!toFind.includes(y)){
						toFind.push(y)
                }
            })
        })
        this.setState({filters:[...toFind],currentFilter:filter})
    }
    setTag(event){
        let tag=event.target.checked
        let val=event.target.value
        if(tag){
            this.filt.push(val)
        }
        else{
            var index = this.filt.indexOf(val);
            if (index > -1) {
                this.filt.splice(index, 1);
            }
        }
        var zz=this.gameList.filter(x=>{
            let d=x[this.state.currentFilter].filter(f => this.filt.includes(f))
             if(d.length>0){
                 return x
             }
         })
        if(zz.length>0){
            this.setState({games:zz})
        }
        else{
            this.setState({games:[]})
            this.getGames()
        }
       
    }
   
    componentWillMount(){
        this.getGames()
    }
    render(){
        return(
                <div className="wrapper">
                    <div className="col-lg-6">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className={`btn btn-default`} type="button" >Search By Name</button>
                            </span>
                        <input type="text" className="form-control" onChange={this.searchByName} placeholder="Search for..." />
                    </div>
                </div>
                <button type="button"  onClick={this.setFilter} value="categories" className="btn btn-primary">Search By Category</button>
                <button type="button"  onClick={this.setFilter} value="tags" className="btn btn-primary">Search By Tags</button>
                    <div className={`panel panel-default`}>
                       {this.state.filters.map(x=>{
                           return (
                               <span  key={x} className="badge">
                               <label>
                                <input type="checkbox" className="btn-outline-secondary" value={x} onClick={this.setTag}/>
                                {x}
                                </label>
                           </span>
                           )
                       })}
                    </div>
                    <div className="row">
                        {this.state.games.map(x=><Box key={x.code} data={x}/>)}
                    </div>
                </div>
        )
    }
}
export default Master