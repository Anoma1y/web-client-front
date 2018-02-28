import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    Card,
    Divider,
    Grid,
} from 'semantic-ui-react';
import { 
    changeTimer,
    changeTimerEnd
} from 'actions/timer';
import Time from './Time';

class Timer extends Component {

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                const payload = this.timingCalculation();
                const { changeTimer } = this.props;
                changeTimer(payload);
            },
            1000
        )
    }
    componentWillUnmount() {
        const { changeTimer } = this.props;
        changeTimer({day: 0,hour: 0, minutes: 0, seconds: 0 });
        clearInterval(this.timerID);
    }
    timingCalculation = () => {
        const { dateEnd, timeLeft } = this.props.timer;
        const { changeTimerEnd } = this.props;
        const time = new Date();
        const timeEnd = new Date(dateEnd);
        const totalRemains = (timeEnd.getTime() - time.getTime());
        let RemainsFullDays = timeLeft.day,
            RemainsFullHours = timeLeft.hour,
            RemainsMinutes = timeLeft.minutes,
            lastSec = timeLeft.seconds;
        if (totalRemains > 1) {
            let RemainsSec = parseInt(totalRemains / 1000);
            RemainsFullDays = (parseInt(RemainsSec / (24 * 60 * 60)));
            let secInLastDay = RemainsSec - RemainsFullDays * 24 * 3600;
            RemainsFullHours = (parseInt(secInLastDay / 3600));
            if (RemainsFullHours < 10) {
                RemainsFullHours = "0" + RemainsFullHours
            }
            let secInLastHour = secInLastDay - RemainsFullHours * 3600;
            RemainsMinutes = (parseInt(secInLastHour / 60));
            if (RemainsMinutes < 10) {
                RemainsMinutes = "0" + RemainsMinutes
            }
            lastSec = secInLastHour - RemainsMinutes * 60;
            if (lastSec < 10) {
                lastSec = "0" + lastSec
            }
        }

        else {
            changeTimerEnd(true);
            this.clearInt();
        }

        return {
            day: RemainsFullDays,
            hour: RemainsFullHours,
            minutes: RemainsMinutes,
            seconds: lastSec
        }
    }

    clearInt = () => {
        clearInterval(this.timerID);
    }

    render() {
        const { timeLeft } = this.props.timer;
        return (
            <Card fluid className={"component__main"}>
                <Card.Content>
                    <Card.Header className={"component__title"}>White list will be closed in</Card.Header>
                    <Divider />
                    <Grid className={"dashboard__component"}>
                        <Grid.Row textAlign={"center"} className={"component__timer"}>
                            <Time timeName={"Days"} value={timeLeft.day} />
                            <Time timeName={"Hours"} value={timeLeft.hour} />
                            <Time timeName={"Minutes"} value={timeLeft.minutes} />
                            <Time timeName={"Seconds"} value={timeLeft.seconds} />
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(state => ({ timer: state.timer }), {
    changeTimer,
    changeTimerEnd
})(Timer);

