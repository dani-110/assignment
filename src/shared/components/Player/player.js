//import liraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

const audioRecorderPlayer = new AudioRecorderPlayer();
// create a component
export function Player(props) {
    const {
        data
    } = props
    const [audioPlaySec, setAudioPlaySec] = useState(0)
    const [playStatus, setPlayStatus] = useState(false)
    const onStartPlay = async (result) => {
        setPlayStatus(false)
        try {
            setPlayStatus(true)
            onStopPlay().then(async () => {
                await audioRecorderPlayer.startPlayer(result);
                await audioRecorderPlayer.addPlayBackListener((e) => {
                    console.log(e)
                    let curr = Math.abs(parseInt(e.currentPosition))
                    let dur = parseInt(e.duration)
                    console.log(e, 'curr')
                    if (curr == dur) {
                        setPlayStatus(false)
                        onStopPlay()
                    }
                    setAudioPlaySec(curr)
                })
            })
        } catch (e) {
            console.log(e)
        }

    }

    const onPausePlay = async () => {
        console.log('pause')
        setPlayStatus(false)
        await audioRecorderPlayer.pausePlayer()
    }

    const onResumePlay = async () => {
        await audioRecorderPlayer.resumePlayer();
    }

    const onStopPlay = async () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    }

    const audioDurr = (val) => {
        let time = audioRecorderPlayer.mmssss(
            Math.floor(val)
        )
        return time.match(/([0-9]+:[0-9]+)/g)
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => playStatus ? onPausePlay() : onStartPlay(data)}>
                <Icon
                    name={playStatus ? "pause" : "play-arrow"}
                    size={20}
                    color={'#000'}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <Slider
                onSlidingStart={() => console.log('start')}
                onSlidingComplete={() => console.log('end')}
                value={audioPlaySec}
                // maximumValue={detail?.caption}
                maximumTrackTintColor="#595a5a"
                minimumTrackTintColor="#000"
                step={1}
                allowTouchTrack
                thumbTouchSize={styles.thumbSize}
                thumbStyle={styles.thumbView}
                style={styles.slideView}
            />
        </View>
    );
};
