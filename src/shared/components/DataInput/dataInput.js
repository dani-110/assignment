import React, { Component } from 'react';
import {
    View,
    StatusBar,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    Text,
    Platform
} from 'react-native';
import { styles } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Constent } from '../../../constants/AppStyles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
                outputRange: [hp('1.5%'), -25],
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
            zIndex: 100
        };
        return (
            <>
                {/* <Text style={{ width: '100%', color: 'red', textAlign: 'right', fontSize: 12 }}>{`*${this.props.error}`}</Text> */}
                {/* !this.state.isFocused ? "#eae7e7" : "#362FBB" */}
                <View style={{ width: '100%', borderRadius: 10, height: hp(Platform.OS == 'ios' ? '5%' : '6%'), borderColor: 'transparent', marginBottom: 12, backgroundColor: this.props.backgroundColor, ...Constent.insideCenter, padding: 0 }}>
                    <Animated.Text style={labelStyle}>{this.props.placeholder}</Animated.Text>
                    {/* <Animated.Text style={[isFocused || value?.length > 0 ? onFocusStyle : onBlurStyle]}>{placeholder}</Animated.Text> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput
                            secureTextEntry={this.props.secureTextEntry}
                            onChangeText={txt => this.props.onChang(txt)}
                            autoCapitalize='none'
                            value={this.props.value}
                            style={{ ...this.props.heightStyle, ...this.props.style, flex: 1, height: 45, fontSize: 15, color: "#000", paddingHorizontal: 10, }}
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
                                        style={{ marginRight: 5 }}
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