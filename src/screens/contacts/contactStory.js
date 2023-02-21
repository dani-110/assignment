import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, SafeAreaView, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native'
import { styles } from './contact.styles'
import { AlphabetList } from "react-native-section-alphabet-list";
import { Colors } from '../../constants/colors';
import SearchBar from "react-native-dynamic-search-bar";

export const ContactStory = (props) => {

    const {
        constactList,
        filter
    } = props
    console.log(constactList)
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ padding: 10 }}>
                <SearchBar
                    placeholder="Search contacts..."
                    // onPress={() => alert("onPress")}
                    onChangeText={(text) => filter(text)}

                />
                <AlphabetList
                    data={constactList}
                    indexLetterStyle={{
                        color: Colors.purple,
                        fontSize: 12,
                        paddingRight: 10
                    }}
                    showsVerticalScrollIndicator={false}
                    renderCustomItem={(item) => (
                        <View style={{ paddingVertical: 5, paddingHorizontal: 10, }}>
                            <Text style={styles.listItemLabel}>{item.value}</Text>
                            <Text style={{ color: '#760088' }}>{item.number}</Text>
                        </View>
                    )}
                    renderCustomSectionHeader={(section) => (
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, paddingVertical: 10, backgroundColor: Colors.gridBase }}>
                            <Text style={{ color: 'gray' }}>{section.title}</Text>
                        </View>
                    )}
                />
            </View>
        </KeyboardAvoidingView>
    )
}