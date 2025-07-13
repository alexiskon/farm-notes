import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

export default function useTheme() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return theme;
}
