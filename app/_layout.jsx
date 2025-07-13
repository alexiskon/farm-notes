import { Stack } from 'expo-router';
import useTheme from '../hooks/useTheme';

const RootLayout = () => {
  const theme = useTheme();
  console.log('Current theme:', theme);
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
};

export default RootLayout;
