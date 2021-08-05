import * as React from "react"
import { Image, TouchableOpacity, ViewStyle } from "react-native"
import { Text } from ".."
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
const LOADING = require("../../../assets/spinner.gif")

const BUTTON_WRAPPER: ViewStyle = {
  flexDirection: "row"
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    loading,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, BUTTON_WRAPPER, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const content = children || <Text tx={tx} text={text} style={textStyle} />

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {loading && <Image source={LOADING} style={{width: 30, height: 30}} resizeMode={"cover"}/>}
      {content}
    </TouchableOpacity>
  )
}
