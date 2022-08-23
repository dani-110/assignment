//import liraries
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { Constent } from '../../../../constants/AppStyles';
import { Colors } from '../../../../constants/colors';
import { styles } from './drawer.styles';

// create a component
export const DrawerHeader = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.headerMain}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.activeStatus, backgroundColor: isEnabled ? Colors.availale : Colors.busy }}></View>
                <View>
                    <Text style={{ color: Colors.headerColor, ...Constent.mainFont }}>Faizan Ul Haq Siddiqui</Text>
                    <Text style={{ color: Colors.headerColor, fontStyle: 'italic' }}>{isEnabled ? '(Available)' : "(Busy)"}</Text>
                </View>
            </View>
            <Switch
                trackColor={{ false: Colors.busy, true: Colors.availale }}
                thumbColor={Colors.headerColor}
                ios_backgroundColor={Colors.busy}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};
