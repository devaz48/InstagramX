import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini adalah tampilan home atau feed</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini adalah tampilan untuk profil</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini adalah tampilan untuk pencarian</Text>
    </View>
  );
}

function ReelsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini adalah tampilan untuk reels atau video</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function MyTabBar({ state, descriptors, navigation }) {
  const iconMarginHorizontal = screenWidth / (state.routes.length * 2);
  const iconSize = 24;

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = '';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconSource;

        if (route.name === 'Home') {
          iconSource = require('./assets/icons8-home.png');
        } else if (route.name === 'Profile') {
          iconSource = require('./assets/icons8-profile.png'); 
        } else if (route.name === 'Search') {
          iconSource = require('./assets/icons8-search.png'); 
        } else if (route.name === 'Reels') {
          iconSource = require('./assets/icons8-reels.png'); 
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', marginHorizontal: iconMarginHorizontal }}
          >
            <Image source={iconSource} style={{ width: iconSize, height: iconSize, marginBottom: 12, marginTop: 12 }} />

            {null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={({ route }) => ({
          headerTitle: 'InstagramX', 
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
