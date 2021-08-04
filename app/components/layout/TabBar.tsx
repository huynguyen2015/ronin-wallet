import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import {BottomMenuItem} from './BottomMenuIcon';
import {color} from '../../theme';

export const TabBar = ({state, descriptors, navigation}) => {
  console.log(state)
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue: state.index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={[style.tabContainer, {width: totalWidth}]}>
  <View style={{flexDirection: 'row'}}>
  <Animated.View
    style={[
      style.slider,
  {
    transform: [{translateX: translateValue}],
      width: tabWidth - 20,
  },
]}
  />

  {state.routes.map((route, index) => {
    const {options} = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === index;
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (route.name == 'file-invoice-dollar' && isFocused == false) {
        DeviceEventEmitter.emit('RELOAD_FEE', {});
      }
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
    // accessibilityStates={isFocused ? ['selected'] : []}
    accessibilityLabel={options.tabBarAccessibilityLabel}
    testID={options.tabBarTestID}
    onPress={onPress}
    onLongPress={onLongPress}
    style={{flex: 1}}
    key={index}>
    <BottomMenuItem iconName={label.toString()} isCurrent={isFocused}/>
    </TouchableOpacity>
  );
  })}
  </View>
  </View>
);
};

const style = StyleSheet.create({
  tabContainer: {
    // height: Func.scale(50),
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
  },
  slider: {
    height: 3,
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: color.background,
    borderRadius: 10,
  },
});
