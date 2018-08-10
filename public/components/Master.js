import React from 'react'
import Box from './Box'
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./box.css');

class Master extends React.Component{
    constructor(props){
        super(props)
        this.state={
            games:[]
        }
        this.getGames=this.getGames.bind(this)
        this.searchByName=this.searchByName.bind(this)
        this.unq=[]
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
                this.unq=result.games
                return {games:prev.games.concat(this.unq)}
        })
        })
        .catch(x=>console.log(x))
        

    }
    searchByName(event){
        let toSearch=event.target.value
        let d=this.unq.filter((x)=>{
            if(x["name"].includes(toSearch)){
                return x
               }
        })
        this.setState({games:d})
    }

    componentWillMount(){
        this.getGames()
    }
    render(){
        return(
                <div className="wrapper">
                <input type="text" className="form-control" onChange={this.searchByName} placeholder="Search for..."/>
                    <div className="row">
                        {this.state.games.map(x=><Box key={x.code} data={x}/>)}
                    </div>
                </div>
        )
    }
}
export default Master