import * as React from 'react';
import * as RN from 'react-native';

class Schedule extends React.Component
{
    months= 
    [
        "January", "February", "March", 
        "April", "May", "June", 
        "July", "August", "September", 
        "October", "November", "December"
    ];

    weekDays= 
    [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ];

    daysInMonth= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state=
    {
        activeDate: new Date()
    }

    generateSchedule()
    {
        var schedule= [];
        schedule[0]= this.weekDays;
        var count= 1;

        var year= this.state.activeDate.getFullYear();
        var month= this.state.activeDate.getMonth();
        var firstDay= new Date(year, month, 1).getDay();

        var maximumDays= this.daysInMonth[month];
        if (month==1)
        {
            if ((year%4== 0 && year%100!= 0) || year%400== 0)
                maximumDays+=1;
        }

        for (var row=1; row<7; row++)
        {
            schedule[row]= [];
            
            for (var column=0; column<7; column++)
            {
                schedule[row][column]= -1;

                if (row==1 && column>=firstDay)
                    schedule[row][column]= count++;
                else if (row>1 && count<=maximumDays)
                    schedule[row][column]= count++;
            }
        }
        return schedule;
    }

    _onPress= (item) => {
        this.setState(() => {
            if (!item.match && item!= -1)
            {
                this.state.activeDate.setDate(item);
                return this.state;
            }
        });
    };

    changeMonth= (mth) => {
        this.setState(() => {
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth()+ mth
            )
            return this.state;
        });
    }

    render()
    {
        var schedule= this.generateSchedule();
        var rows=[];
        rows.schedule.map((row, rowIndex) => {
            var rowItems= row.map((item, columnIndex) => {
               return (
                <RN.Text
                    style= {{
                        flex: 1,
                        height: 18,
                        textAlign: 'center',
                        backgroundColor: rowIndex== 0 ? '#ddd' : '#fff',
                        color: columnIndex== 0 ? '#a00' : '#000',
                        fontWeight: item== this.state.activeDate.getDate() ? 'bold' : ''
                    }}
                    onPress= {() => this._onPress(item)}>
                    {item!= -1 ? item: ''}
                </RN.Text>
               );
            });

            return (
                <RN.View
                    style= {{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    {rowItems}
                </RN.View>
            );
        });

        return (
            <RN.View>
                <RN.Text style= {{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
                    {this.state.activeDate.getFullYear()}
                </RN.Text>
                {rows}

                <RN.Button title= "Previous"
                    onPress= {() => this.changeMonth(-1)}/>
                <RN.Button title= "Next"
                    onPress= {() => this.changeMonth(+1)}/>
            </RN.View>
        );
    }
}

export default Schedule
