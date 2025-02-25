import React, {useEffect, useRef, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {mediaDevices} from 'react-native-webrtc';
import Sound from 'react-native-sound';
import AudioProcessing from 'react-native-audio-processing';
import {useDispatch} from 'react-redux';
import {initializeFavorites} from '../../reducer/redux/favoriteSlice';
import FavoriteButton from '../../components/FavoriteButton';
import FavoritesList from '../../components/FavoriteList';

const RealTimeAudioProcessor = ({backgroundTrack}) => {
  const [isRecording, setIsRecording] = useState(false);
  const audioStreamRef = useRef(null);
  const player = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  useEffect(() => {
    Sound.setCategory('Playback');
    player.current = new Sound('background.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load sound', error);
      }
    });

    return () => {
      if (player.current) player.current.release();
    };
  }, [backgroundTrack]);

  const startAudioProcessing = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      audioStreamRef.current = stream;
      const audioTrack = stream.getAudioTracks()[0];

      AudioProcessing.applyEffect(audioTrack, {pitch: 2});

      player.current.play(success => {
        if (!success) console.log('Playback failed.');
      });

      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone', error);
    }
  };

  const stopAudioProcessing = () => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (player.current) player.current.stop();
    setIsRecording(false);
  };

  const mockSong = {id: '123', title: 'Shape of You', artist: 'Ed Sheeran'};

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <FavoriteButton song={mockSong} />
        <FavoritesList />
      </View>
      <View style={style.commonView}>
        <Text>Real-time Audio Processing</Text>
        <Button
          title={isRecording ? 'Stop' : 'Start'}
          onPress={isRecording ? stopAudioProcessing : startAudioProcessing}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 0.5,
    marginTop: '20%',
  },
  commonView: {flex: 1},
});

export default RealTimeAudioProcessor;
