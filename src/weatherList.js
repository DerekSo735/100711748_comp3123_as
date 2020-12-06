import React from 'react';

import axios from 'axios';

export default class weatherList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            weather: [],
            main:[],
            icon:"",
            background:""
        }
    }


    componentDidMount() {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=b11febb2126ffd9e15725d7920045701`)
            .then(res => {
                const data = res.data;
                const weather = data.weather;
                const main = data.main;
                console.log(data);
                this.setState({icon:weather[0].icon});
                this.setState({data:data});
                this.setState({weather: weather[0]});
                this.setState({main: main});
                if (main.temp <= -20){
                    this.setState({background: "blue"})
                } else if(main.temp >-20 && main.temp <=0){
                    this.setState({background: "powderblue"})
                } else if(main.temp >0 && main.temp <=10){
                    this.setState({background: "yellow"})
                } else if(main.temp >10 && main.temp <=20){
                    this.setState({background: "orange"})
                }else if(main.temp >20 && main.temp <=30){
                    this.setState({background: "pink"})
                }else if(main.temp >30){
                    this.setState({background: "red"})
                }
            })

    }


    render() {
        return (

                <div align={'center'} style={{
                    justifyContent: 'center',
                    alignItems:'center',
                    backgroundColor: this.state.background,
                    height:'100vh'

                    }}>
                    <h1 style={{justifyContent: 'center',alignItems:'center'}}>
                        {this.state.data.name}'s Weather
                    </h1>
                    <h4>{this.state.main.temp}&#8451;</h4>

                    <h5>{this.state.weather.description}</h5>
                    <img src={"http://openweathermap.org/img/wn/"+(this.state.icon)+"@2x.png"}/>
                    <p>Feels like: {this.state.main.feels_like}&#8451;</p>
                    <p>
                        Daytime High: {this.state.main.temp_max}&#8451; Daytime Low: {this.state.main.temp_min}&#8451;
                    </p>
                </div>

        )
    }
}