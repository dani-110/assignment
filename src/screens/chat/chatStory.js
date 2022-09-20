import React, { useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { styles } from './chat.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Player } from '../../shared/components/Player/player';
import { MsgInput } from '../../shared/components/MsgInput/msgInput';
import { ChatBubble } from '../../shared/components/chatBubble/chatBubble';
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList } from 'react-native';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { Icons } from '../../assets/assetsPath';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import MessageBar from '../../shared/components/MessageBar';

export const ChatStory = (props) => {
    const {
        text,
        setText,
        newChat,
        sendMsg,
        messages,
        showDialog,
        onClose,
        filter,
        constactList,
        search,
        setSearch,
        userSelect,
        selectedUser,
        onRemove,
        contactDetail,
        saveDialog,
        setSaveDialog,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        addContact,
        isEditable,
        setIsEditable,
        updateContact
    } = props

    const scrollViewRef = useRef()
    const obj = [
        {
            name: 'Faizan Siddiqui',
            msg: 'Hello Faizan, any update on the project',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 3,
            side: 1
        },
        {
            name: 'Unknown Contact',
            msg: 'I checked but its not working',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 0,
            side: 1
        },
        {
            name: 'Haider Ali Baig',
            msg: 'Not sure about it',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 0,
            side: 2
        },
        {
            name: 'Haider Ali Baig',
            msg: 'voicemail',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 1,
            side: 1
        }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: '#e9e4e400', padding: hp('1%') }}>
            {/* <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
                <Text>To:</Text>
                
            </View> */}
            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        selectedUser.map((item, index) => (
                            <View style={{ flexDirection: 'row', height: 25, backgroundColor: Colors.purple, borderRadius: 20, padding: 5, margin: 5, ...Constent.insideCenter }}>
                                <Text style={{ fontSize: 12, color: '#fff', marginHorizontal: 5 }}>{item.value}</Text>
                                <TouchableOpacity onPress={() => onRemove(item)} style={{ height: 20, width: 20, borderRadius: 100, backgroundColor: '#fff', ...Constent.insideCenter }}>
                                    <Text style={{ fontSize: 12, color: Colors.purple, fontWeight: 'bold' }}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            {newChat ?
                <View style={{ ...Constent.insideCenter }}>

                    <SearchBar
                        placeholder=""
                        // onPress={() => alert("onPress")}
                        onChangeText={(text) => filter(text)}
                        onClearPress={() => setSearch('')}
                        searchIconComponent={() => (
                            <Text>TO:</Text>
                        )}
                    />

                </View>
                : null
            }
            {search.length > 0 ?
                <View style={{ alignItems: 'center', position: 'absolute', zIndex: 100, width: '100%', top: selectedUser.length > 0 ? hp('11%') : hp('7%') }}>
                    <View style={{ ...styles.suggestions, }}>
                        <ScrollView scrollEnabled={true} style={{ flex: 1, padding: hp('1%') }} showsVerticalScrollIndicator={false}>
                            {
                                constactList.map((e) => (
                                    <TouchableOpacity onPress={() => userSelect(e)} style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 10, paddingVertical: 10 }}>
                                        <Text style={{ fontSize: 15 }}>{e.value}</Text>
                                        <Text style={{ fontSize: 12, opacity: 0.5 }}>{e.number}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
                : null
            }
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })
                }
                style={{ flex: 1, marginBottom: hp('2%') }}>
                {!newChat ?
                    messages.map((item, index) => (
                        <ChatBubble item={item} />
                    ))
                    : null
                }
            </ScrollView>
            <MsgInput
                sendMsg={sendMsg}
                text={text}
                setText={setText}
            />

            <DialogBox
                visible={showDialog}
                setVisible={onClose}
                title={'Contact Info'}
                style={{ padding: 20, width: Dimensions.get('window').width - 50, maxHeight: 500, backgroundColor: '#fff' }}
            >
                <TouchableOpacity onPress={() => setIsEditable(true)} style={{ marginBottom: 20, ...Constent.insideCenter }}>
                    {/* <Text style={{ textDecorationLine: 'underline', color: Colors.purple }}>Edit</Text> */}
                    <Icon name="drive-file-rename-outline" size={25} color={Colors.purple} />
                </TouchableOpacity>
                <View>
                    {/* <Text style={styles.contentText}>{`First Name: ${contactDetail?.firstName}`}</Text>
                    <Text style={styles.contentText}>{`Last Name: ${contactDetail?.lastName}`}</Text>
                    <Text style={styles.contentText}>{`Phone: ${contactDetail?.number}`}</Text>
                    <Text style={styles.contentText}>{`Email: ${contactDetail?.email}`}</Text> */}

                    <View style={styles.input}>
                        <DataInput
                            placeholder={"First Name"}
                            value={firstName}
                            onChang={setFirstName}
                            selectedTextColor={Colors.purple}
                            backgroundColor={Colors.headerBase}
                            unselectedTextColor={Colors.purple}
                            editable={isEditable}
                        />
                    </View>
                    <View style={styles.input}>
                        <DataInput
                            placeholder={"Last Name"}
                            value={lastName}
                            onChang={setLastName}
                            selectedTextColor={Colors.purple}
                            backgroundColor={Colors.headerBase}
                            unselectedTextColor={Colors.purple}
                            editable={isEditable}
                        />
                    </View>
                    <View style={styles.input}>
                        <DataInput
                            placeholder={"Phone Number"}
                            value={phone}
                            onChang={setPhone}
                            keyboardType={'number-pad'}
                            selectedTextColor={Colors.purple}
                            backgroundColor={Colors.headerBase}
                            unselectedTextColor={Colors.purple}
                            editable={isEditable}
                        />
                    </View>
                    <View style={styles.input}>
                        <DataInput
                            placeholder={"Email"}
                            value={email}
                            onChang={setEmail}
                            keyboardType={'email-address'}
                            selectedTextColor={Colors.purple}
                            backgroundColor={Colors.headerBase}
                            unselectedTextColor={Colors.purple}
                            editable={isEditable}
                        />
                    </View>
                </View>

                {isEditable ?
                    <View style={{ ...Constent.insideCenter }}>
                        <DoneButton func={updateContact} colors={['#000', '#000']} text={'Apply'} style={{ marginBottom: 20, width: '60%' }} />
                    </View>
                    : null
                }
                < TouchableOpacity onPress={() => onClose(false)} style={{
                    ...Constent.insideCenter,
                    borderRadius: 100, padding: 5, position: 'absolute', top: 10, zIndex: 100, right: 10, transform: [{ rotate: '45deg' }]
                }}>
                    <Icons.Plus width={15} height={15} fill={"#000"} />
                </TouchableOpacity>
            </DialogBox>

            <DialogBox
                visible={saveDialog}
                setVisible={onClose}
                title={'Contact Info'}
                style={{ padding: 20, width: Dimensions.get('window').width - 50, maxHeight: 500 }}
            >
                <View style={styles.input}>
                    <DataInput
                        placeholder={"First Name"}
                        value={firstName}
                        onChang={setFirstName}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple}
                    />
                </View>
                <View style={styles.input}>
                    <DataInput
                        placeholder={"Last Name"}
                        value={lastName}
                        onChang={setLastName}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple}
                    />
                </View>
                <View style={styles.input}>
                    <DataInput
                        placeholder={"Phone Number"}
                        value={phone}
                        onChang={setPhone}
                        keyboardType={'number-pad'}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple}
                    />
                </View>
                <View style={styles.input}>
                    <DataInput
                        placeholder={"Email"}
                        value={email}
                        onChang={setEmail}
                        keyboardType={'email-address'}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple}
                    />
                </View>

                <View style={{ ...Constent.insideCenter, }}>
                    <DoneButton func={addContact} colors={['#000', '#000']} text={'Save'} style={{ marginBottom: 20, width: '60%' }} />
                </View>
                < TouchableOpacity onPress={() => onClose(false)} style={{
                    ...Constent.insideCenter,
                    borderRadius: 100, padding: 5, position: 'absolute', top: 10, zIndex: 100, right: 10, transform: [{ rotate: '45deg' }]
                }}>
                    <Icons.Plus width={15} height={15} fill={"#000"} />
                </TouchableOpacity>
            </DialogBox>
            <MessageBar />
        </View>
    )
}