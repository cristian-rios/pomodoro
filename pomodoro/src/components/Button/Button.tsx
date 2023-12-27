import React from 'react';
import { ButtonProps, Pressable, Text } from 'react-native';

const Button = (props: ButtonProps) => (
    <Pressable style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }} {...props}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(186, 73, 73)' }}>{props.title}</Text>
    </Pressable>
);

export default Button;