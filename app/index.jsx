import { Link } from 'expo-router';
import { Mic } from 'lucide-react-native';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';
import { Styles } from '../constants/Styles';
import Colors from '../constants/Colors';
import React, { useState } from 'react';
import { Button } from 'react-native';
import { Audio } from 'expo-av';

const Home = () => {
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);

  const startRecording = async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) {
      alert('Microphone permission is required!');
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    setRecordedUri(uri);
    console.log('Recorded file:', uri);

    // uploadAudio(uri);
  };

  const uploadAudio = async (audioUri) => {
    const fileName = audioUri.split('/').pop();
    const fileType = 'audio/x-m4a';

    const formData = new FormData();
    formData.append('file', {
      uri: audioUri,
      name: fileName,
      type: fileType,
    });

    try {
      const response = await fetch('https://your-backend.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Transcript:', data.transcript);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <ThemedView style={Styles.container}>
      <ThemedText style={Styles.title} title={true}>
        Start a recording
      </ThemedText>
      <Spacer height={16} />
      <Mic size={32} color={Colors.primary} />
      <Spacer height={16} />
      <ThemedView>
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
        />
        {recordedUri && (
          <ThemedText style={{ marginTop: 20 }}>
            Recorded file: {recordedUri}
          </ThemedText>
        )}
      </ThemedView>
      <Link style={Styles.link} href="/about">
        About
      </Link>
    </ThemedView>
  );
};

export default Home;
