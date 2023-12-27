import React from 'react';
import { Button, ButtonProps } from 'react-native';
import { TIMER_DEFAULT_TIME } from '../../utils/constants';
import { MakeOptional } from '../../utils/utilityTypes';
import { TIMER_STATE } from '../../utils/types';

interface IActionButton {
    timerState: TIMER_STATE
}

type ActionButtonProps = MakeOptional<ButtonProps, 'title'> & IActionButton;

const buttonDescription: Record<TIMER_STATE, string> = {
    START: 'INICIAR',
    PAUSED: 'CONTINUAR',
    RUNNING: 'PAUSAR',
    STOPPED: 'FINALIZADO',
}

const ActionButton = (props: ActionButtonProps) => (
    <Button
        onPress={props.onPress}
        title={buttonDescription[props.timerState]}
        {...props}
    />
);

export default ActionButton;