import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, SafeAreaView, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native'
import { styles } from './callLogs.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Player } from '../../shared/components/Player/player';
import { Icons } from '../../assets/assetsPath';
import { Modalize } from 'react-native-modalize';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';

import RadioButtonRN from 'radio-buttons-react-native';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';

export const CallLogsStory = (props) => {
    const {
        activeSections,
        setActiveSections,
        modalizeRef,
        onOpen,
        onClose,
        selector,
        filterType,
        isSelectedFilter,
        setFilterCheck,
        showDialog,
        setShowDialog

    } = props

    const data = [
        {
            label: 'All'
        },
        {
            label: 'Missed',
        },
        {
            label: 'Incoming',
        },
        {
            label: 'Outgoing',
        },
        {
            label: 'Voicemail'
        }
    ];

    const obj = [
        {
            name: 'Faizan Siddiqui',
            type: 'missed',
            number: '+923000569491',
            time: '9:30\npm',
            durration: '--',
            date: '03 Aug 2022'
        },
        {
            name: 'Unknown Contact',
            type: 'incoming',
            number: '+923000569491',
            time: '9:30\npm',
            durration: '1 min 37 sec',
            date: '03 Aug 2022'
        },
        {
            name: 'Haider Ali Baig',
            type: 'outgoing',
            number: '+923000569491',
            time: '9:30\npm',
            durration: '1 min 37 sec',
            date: '03 Aug 2022'
        },
        {
            name: 'Haider Ali Baig',
            type: 'voicemail',
            number: '+923000569491',
            time: '9:30\npm',
            durration: '1 min 37 sec',
            date: '03 Aug 2022'
        }
    ]

    const callStatus = (type) => {
        switch (type) {
            case 'missed':
                return <Icons.CallMissed width={15} height={15} fill={"#FF5353"} />
            case 'incoming':
                return <Icons.CallIncoming width={15} height={15} fill={"#00E577"} />
            case 'outgoing':
                return <Icons.CallOutgoing width={15} height={15} fill={"#0639a0"} />
            case 'voicemail':
                return <Icon
                    name={'voicemail'}
                    color={'#E1AD01'}
                    size={20}

                />
            default: return ""
        }
    }

    const renderHeader = (section, index, isActive) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ padding: hp('1%') }}>
                    <View>
                        <Text>{section.time}</Text>
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        {callStatus(section.type)}
                    </View>
                </View>
                <View style={{ flex: 1, padding: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%') }}>{section.name}</Text>
                    <Text style={{ opacity: 0.7 }}>{section.number}</Text>
                    <Text style={{ fontWeight: '300' }}>{section.durration}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Icon
                        name={isActive ? 'expand-less' : 'expand-more'}
                        size={25}
                    />
                </View>
            </View>
        )
    }

    const renderContent = (section) => {
        console.log(section, "section")
        return (
            <View style={{ ...Constent.insideCenter, margin: hp('1%') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ marginRight: hp('2%') }}>{section.date}</Text>
                    <Text>{section.time.split('\n')}</Text>
                </View>
                <Player data={'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'} />
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={styles.options}>
                        <Icons.PhoneCall width={25} height={25} fill={Colors.purple} />
                    </View>
                    <View style={styles.options}>
                        <Icons.Message width={25} height={25} fill={Colors.purple} />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: hp('2%') }}>
                <Accordion
                    sections={obj}
                    activeSections={activeSections}
                    // renderSectionTitle={renderSectionTitle}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={(e) => setActiveSections(e)}
                    underlayColor="transparent"
                    renderAsFlatList={true}
                    sectionContainerStyle={{ borderBottomWidth: 1, borderBottomColor: '#A4A4A4' }}
                />


            </View>

            <DialogBox
                visible={showDialog}
                setVisible={onClose}
                title={'Filter'}
                style={{ padding: 20, width: Dimensions.get('window').width - 50, maxHeight: 500, borderRadius: 10 }}
            >
                <RadioButtonRN
                    data={data}
                    initial={1}
                    selectedBtn={(e) => console.log(e)}
                    circleSize={10}
                    activeColor={'#dec1f075'}
                    boxActiveBgColor={'#dec1f075'}
                    icon={
                        <Icon
                            name="check-circle"
                            size={18}
                            color={Colors.purple}
                            style={{ height: 18, width: 18 }}
                        />
                    }
                />
                <View style={{ ...Constent.insideCenter, marginTop: hp('5%') }}>
                    <DoneButton func={() => onClose(false)} colors={['#000', '#000']} text={'Apply'} style={{ marginBottom: 20, width: '60%' }} />
                </View>
                < TouchableOpacity onPress={() => onClose(false)} style={{
                    ...Constent.insideCenter,
                    borderRadius: 100, padding: 5, position: 'absolute', top: 10, zIndex: 100, right: 10, transform: [{ rotate: '45deg' }]
                }}>
                    <Icons.Plus width={15} height={15} fill={"#000"} />
                </TouchableOpacity>
            </DialogBox>

            {/* <Modalize
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                handlePosition="inside"
                withReactModal={true}
                onOverlayPress={onClose}
                onBackButtonPress={onClose}
                modalHeight={hp('40%')}
                ref={modalizeRef}
                childrenStyle={{ flex: 1, ...Constent.insideCenter }}
                disableScrollIfPossible={true}

            >
                <View style={{ flex: 1, margin: 20 }}>
                    {
                        filterType.map((item, i) => (
                            <TouchableOpacity onPress={() => { setFilterCheck(i) }} style={{ margin: 10, borderWidth: 1, borderRadius: 10, padding: 5, borderColor: item == isSelectedFilter ? Colors.purple : '#000' }}>
                                <Text style={{ fontSize: 15, textAlign: 'center', color: item == isSelectedFilter ? Colors.purple : '#000' }}>{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </Modalize> */}
            {/* <View style={{ position: 'absolute', bottom: 50, right: 50, backgroundColor: Colors.purple, height: 50, width: 50, borderRadius: 100, }}>
                <TouchableOpacity style={{ flex: 1, ...Constent.insideCenter }} onPress={() => setShowDialog(true)}>
                    <Icon name='filter-list' size={20} color={'#fff'} />
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}