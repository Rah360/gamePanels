import React from 'react'
export default class Box extends React.Component{
    constructor(props){
        super(props)
        this.state={
            limit:this.props.data.description,
            flag:true
        }
        this.showMore=this.showMore.bind(this)
        this.showLess=this.showLess.bind(this)
    }
    showMore(){
        this.setState(()=>({flag:false}))
        this.setState(()=>{return {limit:this.props.data.description.slice(0)}})
    }
    showLess(){
        this.setState(()=>({flag:true}))
        this.setState(()=>{return {limit:this.props.data.description.slice(0,135)}})
    }
    componentWillMount(){
        this.showLess()
    }
    render(){
        return(
            <div className="col">
                <div className={'box'}>
                    <img src={this.props.data.thumb}/>
                    <div className="info">
                        <a href={this.props.data.url} title="click to play" target="_blank">
                            <p>{this.props.data.name}</p>
                        </a>
                        <p>
                            {this.state.limit}
                            {this.state.flag ? <button onClick={this.showMore}>...read more</button> : <button onClick={this.showLess}>read less</button>}
                        </p>
                    </div>
                </div>
          </div>
        )
    }
}
