import React, { useRef } from 'react';
import { View, Text, ScrollView, FlatList, Platform, Dimensions, Modal, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './userManagement.styles'
import Dialog from "react-native-dialog";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Constent } from '../../constants/AppStyles';
import { Colors } from '../../constants/colors';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Icons } from '../../assets/assetsPath';

export const UserManagementStory = (props) => {
    const {
        revokeDialog,
        setRevokeDialog,
        detachDialog,
        setDetachDialog,
        assignDialog,
        setAssignDialog,
        memberDialog,
        setMemberDialog,
        teamMembers,
        setTeamField,
        addMore,
        removeMembers,
        isScroll,
        setIsScroll
    } = props

    const scrollViewRef = useRef()

    const obj = [
        {
            name: 'Faizan Siddiqui',
            email: 'faizan@abc.com',
            number: '223445667'
        },
        {
            name: 'M Adil Shaikh',
            email: 'Adil@abc.com',
            number: '223445667'
        },
        {
            name: 'Muhammad Kamran',
            email: 'kamran@abc.com',
            number: ''
        }
    ]

    const options = (text, func) => (
        <TouchableOpacity onPress={func} style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
        </TouchableOpacity>
    )
    const mainView = (item) => (
        <View style={styles.mainView}>
            <View style={{ flex: 1 }}>
                <Text style={styles.contentText}>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.number}</Text>
            </View>
            {options(item.number ? "Detach\nNumber" : "Assign\nNumber", item.number ? () => setDetachDialog(true) : () => setAssignDialog(true))}
            {options("Revoke\nAccess", () => setRevokeDialog(true))}
        </View>
    )

    const renderItem = ({ item, index }) => (
        mainView(item, index)
    )


    const btnView = (text, func) => (
        <TouchableOpacity style={{ backgroundColor: '#9C00FF', paddingHorizontal: 15, paddingVertical: 5, ...Constent.insideCenter, borderRadius: 5 }} onPress={func}>
            <Text style={{ color: '#fff', fontSize: hp('2%') }}>{text}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={obj}
                // keyExtractor={}     //has to be unique   
                renderItem={renderItem} //method to render the data in the way you want using styling u need
                horizontal={false}
            />
            <View style={{ padding: 20 }}>
                <DoneButton func={() => setMemberDialog(true)} text={'Invite Team Member'} colors={['#9C00FF', '#9C00FF']} />
            </View>

            <DialogBox
                visible={revokeDialog}
                setVisible={setRevokeDialog}
            >
                <Text style={{ textAlign: 'center' }}>{'Are you sure you want to revoke access\nof Adil Shaikh to your account.'}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, padding: 20 }}>
                        {/* <DoneButton func={() => setDetachDialog(false)} text={'Yes'} colors={['#9C00FF', '#9C00FF']} /> */}
                        {btnView('Yes', () => setRevokeDialog(false))}
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
                        {/* <DoneButton func={() => setDetachDialog(false)} text={'No'} colors={['#9C00FF', '#9C00FF']} /> */}
                        {btnView('No', () => setRevokeDialog(false))}
                    </View>
                </View>
            </DialogBox>

            <DialogBox
                visible={detachDialog}
                setVisible={setDetachDialog}
            >
                <Text style={{ textAlign: 'center' }}>{'Are you sure you want to detach the\nphone number 2232329999 from\nthe user Adil Shaikh'}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, padding: 20 }}>
                        {/* <DoneButton func={() => setDetachDialog(false)} text={'Yes'} colors={['#9C00FF', '#9C00FF']} /> */}
                        {btnView('Yes', () => setDetachDialog(false))}
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
                        {/* <DoneButton func={() => setDetachDialog(false)} text={'No'} colors={['#9C00FF', '#9C00FF']} /> */}
                        {btnView('No', () => setDetachDialog(false))}
                    </View>
                </View>
            </DialogBox>


            <DialogBox
                visible={assignDialog}
                setVisible={setAssignDialog}
            >
                <View style={Constent.insideCenter}>
                    <Text style={{ textAlign: 'center', fontSize: hp('2%'), marginVertical: 20 }}>{'Please select the Phone Number'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '70%' }}>
                        <DataInput placeholder={'Phone'}
                            // value={phone}
                            // onChang={getPhone}
                            selectedTextColor={Colors.purple}
                            backgroundColor={Colors.headerBase}
                            unselectedTextColor={Colors.purple} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, padding: 20, ...Constent.insideCenter }}>
                        {btnView('Save', () => setAssignDialog(false))}
                    </View>
                </View>
            </DialogBox>

            {/* <DialogBox
                visible={memberDialog}
                setVisible={setMemberDialog}
                title={'Invite Team Member'}
                style={{ height: Dimensions.get('window').height - 100, width: Dimensions.get('window').width - 50, padding: 10, }}
            > */}
            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={true}
                visible={memberDialog}
            >
                <View style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 10, paddingVertical: 20, marginVertical: 30, marginHorizontal: 20, borderRadius: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>{'Invite Team Member'}</Text>
                    <ScrollView
                        ref={scrollViewRef}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => isScroll ? scrollViewRef.current.scrollToEnd({ animated: true }) : null
                        }
                        style={{ paddingHorizontal: 10, paddingVertical: 20, marginBottom: 50 }}
                    >
                        {
                            teamMembers.map((item, index) => (
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ marginTop: hp('2.5%'), marginRight: 10 }} >{index + 1}.</Text>
                                    <View style={{ flex: 1, }}>
                                        <View style={styles.input}>
                                            <DataInput placeholder={'Name'}
                                                value={item.name}
                                                onChang={(e) => setTeamField(e, 'name', index)}
                                                selectedTextColor={Colors.purple}
                                                backgroundColor={Colors.headerBase}
                                                unselectedTextColor={Colors.purple} />
                                        </View>
                                        <View style={styles.input}>
                                            <DataInput placeholder={'Email'}
                                                value={item.email}
                                                onChang={(e) => setTeamField(e, 'email', index)}
                                                keyboardType={'email-address'}
                                                selectedTextColor={Colors.purple}
                                                backgroundColor={Colors.headerBase}
                                                unselectedTextColor={Colors.purple} />
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: "space-around", alignItems: 'center', paddingLeft: 10 }}>
                                        {
                                            index > 0 ? <TouchableOpacity onPress={() => { removeMembers(index), setIsScroll(false) }} style={{ ...Constent.insideCenter, borderRadius: 100, padding: 5 }}>
                                                <Icons.Trash width={20} height={20} fill={Colors.unread} />
                                            </TouchableOpacity>
                                                :
                                                <View style={{ ...Constent.insideCenter, borderRadius: 100, padding: 5 }}>
                                                    <Icon
                                                        name='close'
                                                        color={'transparent'}
                                                        size={20}
                                                    />
                                                </View>

                                        }
                                        {teamMembers.length == index + 1 ? < TouchableOpacity onPress={addMore} style={{ ...Constent.insideCenter, borderRadius: 100, padding: 5 }}>
                                            <Icons.Plus width={20} height={20} fill={Colors.purple} />
                                        </TouchableOpacity>
                                            : null}
                                    </View>
                                </View>
                            ))
                        }

                    </ScrollView>
                    <View style={Constent.insideCenter}>
                        <DoneButton func={setMemberDialog} text={'Send Invite'} colors={['#9C00FF', '#9C00FF']} />
                    </View>
                    < TouchableOpacity onPress={() => setMemberDialog(false)} style={{
                        ...Constent.insideCenter,
                        borderRadius: 100, padding: 5, position: 'absolute', top: 10, zIndex: 100, right: 10, transform: [{ rotate: '45deg' }]
                    }}>
                        <Icons.Plus width={15} height={15} fill={"#000"} />
                    </TouchableOpacity>
                    {/* </DialogBox> */}
                </View>
            </Modal>
        </View >
    )
}