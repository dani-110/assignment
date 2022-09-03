import React, { useEffect } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Dimensions, ScrollView } from 'react-native'
import { styles } from './dashboard.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';

import _ from "lodash";
import Accordion from 'react-native-collapsible/Accordion';
import { CalenderView } from '../../shared/components/Calender/calender';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';
import moment from 'moment'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RadioButtonRN from 'radio-buttons-react-native';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { Icons } from '../../assets/assetsPath';

export const DashboardStory = (props) => {
    const {
        navigation,
        activeSections,
        setActiveSections,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        showDialog,
        setShowDialog
    } = props

    const data = [
        {
            label: 'All'
        },
        {
            label: 'Faizan Ahmed Siddiqui (Admin)'
        },
        {
            label: 'Adil Sheikh'
        }
    ];


    const renderHeader = () => {
        console.log(endDate)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', }}>
                    {startDate != endDate ?
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ color: '#000' }}>{`${startDate}`}</Text>

                            {endDate !== '' ?
                                <Text style={{ color: '#000' }}> {`- ${endDate}`}</Text>
                                : <Text style={{ color: '#000' }}> {''}</Text>
                            }
                        </View>
                        : <View>
                            <Text style={{ color: '#000' }}>{`${startDate}`}</Text>
                        </View>
                    }
                    <Icon name={_.isEmpty(activeSections) ? 'expand-more' : 'expand-less'} size={20} color={'#000'} />
                </View>
                <View style={{ ...styles.filterIcon }}>
                    <TouchableOpacity onPress={() => setShowDialog(true)} style={{ flex: 1, ...Constent.insideCenter }} >
                        <Icon name='filter-list' size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const renderContent = () => {
        return (
            <View style={{ ...Constent.insideCenter }}>
                <CalenderView
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                <DoneButton func={() => setActiveSections([])} colors={['#000', '#000']} text={'Apply'} style={{ ...styles.btn }} />
            </View>
        )
    }


    const mainView = () => (
        <View style={{ ...Constent.insideCenter }}>

            {/* <View style={{ height: 550, padding: 20, }}> */}
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.gridView}>
                    <Text style={styles.count}>127</Text>
                    <Text style={styles.desc}>Total Calls</Text>
                </View>
                <View style={styles.gridView}>
                    <Text style={styles.count}>229</Text>
                    <Text style={styles.desc}>Total SMS</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.gridView}>
                    <Text style={styles.count}>47</Text>
                    <Text style={styles.desc}>Received Calls</Text>
                </View>
                <View style={styles.gridView}>
                    <Text style={styles.count}>80</Text>
                    <Text style={styles.desc}>Dialed Calls</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.gridView}>
                    <Text style={styles.count}>174</Text>
                    <Text style={styles.desc}>SMS Sent</Text>
                </View>
                <View style={styles.gridView}>
                    <Text style={styles.count}>55</Text>
                    <Text style={styles.desc}>SMS Received</Text>
                </View>
            </View>
            {/* </View> */}
        </View>
    )
    let viewON = false
    return (
        <View style={{ flex: 1 }}>
            <View style={{ ...Constent.insideCenter }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#dec1f075', marginBottom: hp('2%'), paddingVertical: hp('1%') }}>
                    <View style={{ flex: 1 }}>
                        <Accordion
                            sections={[0]}
                            activeSections={activeSections}
                            renderHeader={renderHeader}
                            renderContent={renderContent}
                            onChange={(e) => { setActiveSections(e), console.log(e) }}
                            underlayColor="transparent"
                            renderAsFlatList={true}
                        />
                    </View>
                </View>
            </View>
            {mainView()}
            <View style={{ position: 'absolute', bottom: hp('0%'), width: '100%' }}>
                {IconTab({ ...props })}
            </View>

            <DialogBox
                visible={showDialog}
                setVisible={setShowDialog}
                title={'User Filter'}
                style={{ padding: 20, width: Dimensions.get('window').width - 50, maxHeight: 500, borderRadius: 10 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RadioButtonRN
                        data={data}
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
                        initial={1}
                    />
                </ScrollView>

                <View style={{ ...Constent.insideCenter, marginTop: hp('5%') }}>
                    <DoneButton func={() => setShowDialog(false)} colors={['#000', '#000']} text={'Apply'} style={{ marginBottom: 20, width: '60%' }} />
                </View>

                < TouchableOpacity onPress={() => setShowDialog(false)} style={{
                    ...Constent.insideCenter,
                    borderRadius: 100, padding: 5, position: 'absolute', top: 10, zIndex: 100, right: 10, transform: [{ rotate: '45deg' }]
                }}>
                    <Icons.Plus width={15} height={15} fill={"#000"} />
                </TouchableOpacity>
            </DialogBox>

        </View>
    )
}