import React, { useState } from 'react'
import { View, Text } from 'react-native'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Colors } from '../../../constants/colors';
import { styles } from './style';


export function VerifyCode(prop) {
    const {
        verifyCode,
        setVerifyCode,
        borderColor,
        editable
    } = prop;
    const CELL_COUNT = 4;
    const ref = useBlurOnFulfill({ verifyCode, cellCount: CELL_COUNT });
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <View>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={verifyCode}
                onChangeText={setVerifyCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                editable={editable}
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell, { borderWidth: borderColor ? 3 : 0, borderColor: borderColor }]}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}