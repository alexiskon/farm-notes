import { Styles } from '../constants/Styles';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';

const About = () => {
  return (
    <ThemedView style={Styles.container}>
      <ThemedText style={Styles.title} title={true}>
        About
      </ThemedText>
    </ThemedView>
  );
};

export default About;
