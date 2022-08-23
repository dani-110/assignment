import React, { Component } from 'react';
import {
    View,
    StatusBar,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import { styles } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class DataInput extends Component {
    state = {
        isFocused: false,
    };

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value == "" ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const { label, ...props } = this.props;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [12, -20],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 10],
                outputRange: [15, 12],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', !this.state.isFocused ? this.props.unselectedTextColor : this.props.selectedTextColor],
            }),
            backgroundColor: 'transparent',
            marginHorizontal: 10,
            paddingHorizontal: 2,
            marginVertical: 0,
        };
        return (
            <>
                {/* <Text style={{ width: '100%', color: 'red', textAlign: 'right', fontSize: 12 }}>{`*${this.props.error}`}</Text> */}
                {/* !this.state.isFocused ? "#eae7e7" : "#362FBB" */}
                <View style={{ paddingTop: 5, width: '100%', borderWidth: 1, borderRadius: 10, borderColor: 'transparent', marginBottom: 12, backgroundColor: this.props.backgroundColor }}>
                    <Animated.Text style={labelStyle}>{this.props.placeholder}</Animated.Text>
                    {/* <Animated.Text style={[isFocused || value?.length > 0 ? onFocusStyle : onBlurStyle]}>{placeholder}</Animated.Text> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            secureTextEntry={this.props.secureTextEntry}
                            onChangeText={txt => this.props.onChang(txt)}
                            autoCapitalize='none'
                            value={this.props.value}
                            style={{ ...this.props.heightStyle, ...this.props.style, flex: 1, height: 38, fontSize: 15, color: "#000", paddingHorizontal: 10, }}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            numberOfLines={this.props.numberOfLines}
                            multiline={this.props.multiline}
                            maxLength={this.props.maxLength}
                            keyboardType={this.props.keyboardType}
                            editable={this.props.editable}
                        />

                        {
                            this.props.status == "Password" ?
                                <TouchableWithoutFeedback onPress={this.props.toggleSecureEntry}>
                                    <Icon
                                        name={this.props.secureTextEntry ? "visibility-off" : "visibility"}
                                        size={25}
                                        color={this.state.isFocused ? "#362FBB" : "#aaa"}
                                        style={{ marginTop: 5, marginRight: 5 }}
                                    />
                                </TouchableWithoutFeedback>
                                : null
                        }


                    </View>
                </View>
            </>
        );
    }
}

DataInput.defaultProps = {
    placeholder: "",
    accessoryRight: null,
    secureTextEntry: false,
    onChang: () => null,
    keyboardType: "default",
    selectedTextColor: '#fff',
    backgroundColor: '#fff',
    editable: true,
    unselectedTextColor: '#aaa'
}