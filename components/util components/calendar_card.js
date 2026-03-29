import React, { Component, useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';

const AnalogClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const sAngle = time.getSeconds() * 6;
    const mAngle = time.getMinutes() * 6 + time.getSeconds() * 0.1;
    const hAngle = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

    // To position numbers 1-12 on the clock face
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
        const r = 40; // radius for numbers
        const theta = (i * 30 - 90) * (Math.PI / 180);
        const x = 50 + r * Math.cos(theta);
        const y = 50 + r * Math.sin(theta);
        numbers.push(
            <text key={i} x={x} y={y + 3} textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">
                {i}
            </text>
        );
    }

    return (
        <div className="w-full h-full flex justify-center items-center p-2">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
                {/* Clock Face */}
                <circle cx="50" cy="50" r="48" fill="#FFF" />
                
                {/* Numbers */}
                {numbers}

                {/* Hour Hand */}
                <line x1="50" y1="50" x2="50" y2="25" stroke="#000" strokeWidth="4" strokeLinecap="round" transform={`rotate(${hAngle} 50 50)`} />
                
                {/* Minute Hand */}
                <line x1="50" y1="50" x2="50" y2="15" stroke="#000" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${mAngle} 50 50)`} />
                
                {/* Second Hand */}
                <line x1="50" y1="50" x2="50" y2="10" stroke="#E95420" strokeWidth="1" strokeLinecap="round" transform={`rotate(${sAngle} 50 50)`} />
                
                {/* Center Dot */}
                <circle cx="50" cy="50" r="2.5" fill="#E95420" />
            </svg>
        </div>
    );
};

class CalendarCard extends Component {
  constructor() {
    super();
    this.state = {
      currentDate: new Date(),
    };
  }

  handleClickOutside = () => {
    this.props.toggleVisible();
  };

  getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  changeMonth = (amount) => {
    this.setState((prevState) => {
      const newDate = new Date(prevState.currentDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return { currentDate: newDate };
    });
  };

  render() {
    if (!this.props.visible) return null;

    const { currentDate } = this.state;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = this.getDaysInMonth(month, year);
    const today = new Date();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="text-transparent">0</div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        days.push(
            <div key={i} className={`flex justify-center items-center w-8 h-8 rounded-full ${isToday ? "bg-red-500 text-white font-bold" : "hover:bg-white hover:bg-opacity-10"}`}>
                {i}
            </div>
        );
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <div className="absolute top-10 right-0 md:transform md:-translate-x-1/2 md:left-1/2 w-[400px] bg-ub-cool-grey rounded-lg shadow-xl border border-gray-900 border-opacity-50 text-white z-50 text-sm flex overflow-hidden">
        {/* Left Side: Live Analog Clock */}
        <div className="w-1/2 border-r border-gray-800 bg-[#1c1c1c] flex items-center justify-center">
            <AnalogClock />
        </div>

        {/* Right Side: Calendar */}
        <div className="w-1/2 p-4 bg-[#2e2e2e]">
            <div className="flex justify-between items-center mb-4">
                <div onClick={(e) => { e.stopPropagation(); this.changeMonth(-1); }} className="cursor-pointer p-1 hover:bg-white hover:bg-opacity-10 rounded-full">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                </div>
                <div className="font-bold text-md text-red-500 text-center select-none uppercase tracking-wide">{monthNames[month]} {year}</div>
                <div onClick={(e) => { e.stopPropagation(); this.changeMonth(1); }} className="cursor-pointer p-1 hover:bg-white hover:bg-opacity-10 rounded-full">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-400 mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {days}
            </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(CalendarCard);
