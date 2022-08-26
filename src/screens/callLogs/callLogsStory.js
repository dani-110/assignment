import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { styles } from './callLogs.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Player } from '../../shared/components/Player/player';

export const CallLogsStory = (props) => {
    const {
        activeSections,
        setActiveSections
    } = props

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
                return { name: 'phone-missed', color: '#FF5353' }
            case 'incoming':
                return { name: 'phone-callback', color: '#00E577' }
            case 'outgoing':
                return { name: 'phone-forwarded', color: '#FFD200' }
            case 'voicemail':
                return { name: 'voicemail', color: '#2A2A2A' }
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
                    <Icon
                        name={callStatus(section.type).name}
                        color={callStatus(section.type).color}
                        size={20}
                        style={{ marginTop: hp('1%') }}
                    />
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
                        <Icon
                            name='call'
                            size={25}
                            style={{ marginRight: 10 }}
                            color={Colors.purple}
                        />
                    </View>
                    <View style={styles.options}>
                        <Icon
                            name='email'
                            size={25}
                            style={{ marginRight: 10 }}
                            color={Colors.purple}
                        />
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
        </SafeAreaView>
    )
}