import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    Card,
    Divider,
    Grid,
} from 'semantic-ui-react';
import { 
    changeTimer,
    checkTimerEnd
} from 'actions/timer';
import Time from './Time';

class Timer extends Component {

    componentDidMount() {
        // setInterval(
        //     () => {
        //         this.props.changeTimer(this.timingCalculation());
        //     },
        //     1000
        // )
    }

    timingCalculation = () => {
        const { dateEnd, timeLeft } = this.props.timer;
        let time = new Date();
        let newYear = new Date(dateEnd);
        let totalRemains = (newYear.getTime() - time.getTime());
        let RemainsFullDays, RemainsFullHours, RemainsMinutes, lastSec;
        if (totalRemains > 1) {

            let RemainsSec = (parseInt(totalRemains / 1000));
            RemainsFullDays = (parseInt(RemainsSec / (24 * 60 * 60)));

            let secInLastDay = RemainsSec - RemainsFullDays * 24 * 3600;
            RemainsFullHours = (parseInt(secInLastDay / 3600));
            if (RemainsFullHours < 10) { RemainsFullHours = "0" + RemainsFullHours };

            let secInLastHour = secInLastDay - RemainsFullHours * 3600;
            RemainsMinutes = (parseInt(secInLastHour / 60));
            if (RemainsMinutes < 10) { RemainsMinutes = "0" + RemainsMinutes };

            lastSec = secInLastHour - RemainsMinutes * 60;
            if (lastSec < 10) { lastSec = "0" + lastSec };
        }

        else {
            this.props.checkTimerEnd(true);
        }
        return {
            day: RemainsFullDays,
            hour: RemainsFullHours,
            minutes: RemainsMinutes,
            seconds: lastSec
        }
    }
    renderTime = (name, value) => {
        const {timeLeft} = this.props.timer;
        return (
            <Grid.Column width={2}>
                <Card.Meta as={"h2"}>{name}</Card.Meta>
                <Card.Description as={"h1"}>{value}</Card.Description>
            </Grid.Column>
        )
    }
    render() {
        const {timeLeft} = this.props.timer;
        return (
            <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                <Card.Content>
                    <Card.Header>Прием заявок закроется через</Card.Header>
                    <Divider />
                    <Grid>
                        <Grid.Row textAlign={"center"}>
                            <Time timeName={"Дней"} value={timeLeft.day} />
                            <Time timeName={"Часов"} value={timeLeft.hour} />
                            <Time timeName={"Минут"} value={timeLeft.minutes} />
                            <Time timeName={"Секунд"} value={timeLeft.seconds} />
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(state => ({ timer: state.timer }), {
    changeTimer,
    checkTimerEnd
})(Timer);

