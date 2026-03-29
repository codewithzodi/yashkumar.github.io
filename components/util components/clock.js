import { Component } from 'react'

export default class Clock extends Component {
    constructor() {
        super();
        this.month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.day_list = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.state = {
            hour_12: true,
            current_time: new Date()
        };
    }

    componentDidMount() {
        this.update_time = setInterval(() => {
            this.setState({ current_time: new Date() });
        }, 1000); // 1 second interval for live time
    }

    componentWillUnmount() {
        clearInterval(this.update_time);
    }

    render() {
        const { current_time } = this.state;

        let day = this.day_list[current_time.getDay()];
        let hour = current_time.getHours();
        let minute = current_time.getMinutes();
        let second = current_time.getSeconds();
        let month = this.month_list[current_time.getMonth()];
        let date = current_time.getDate();
        let meridiem = (hour < 12 ? "AM" : "PM");

        if (minute.toString().length === 1) minute = "0" + minute;
        if (second.toString().length === 1) second = "0" + second;

        let displayHour = hour;
        if (this.state.hour_12) {
            displayHour = hour % 12 || 12;
        }

        let display_time;
        if (this.props.onlyTime) {
            display_time = displayHour + ":" + minute + ":" + second + " " + meridiem;
        }
        else if (this.props.onlyDay) {
            display_time = day + " " + month + " " + date;
        }
        else {
            display_time = day + " " + month + " " + date + " " + displayHour + ":" + minute + ":" + second + " " + meridiem;
        }
        return <span suppressHydrationWarning={true}>{display_time}</span>;
    }
}
