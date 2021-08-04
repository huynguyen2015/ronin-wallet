import React from "react"
import { View } from "react-native"
import { color } from "../../theme"
import Icon from 'react-native-vector-icons/FontAwesome';

export const BottomMenuItem = ({ iconName, isCurrent }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Icon
        name={iconName}
        size={18}
        style={{ color: isCurrent ? color.primary : color.dim }}
      />
    </View>
  )
}
