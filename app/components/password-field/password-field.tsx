import React, { useState } from "react"
import {
  Image,
  TextInput,
  TextInputProps,
  TextStyle,
  ImageStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Text } from ".."
import { mergeAll, flatten } from "ramda"
import debounce from "lodash/debounce"
const IC_EYE = require("../../../assets/icons/ic-eye.png")

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.textDark,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: color.palette.lighterGrey,
  paddingHorizontal: spacing[3],
  paddingRight: 30
}

const LABEL_STYLE: TextStyle = {
  marginLeft: spacing[2],
  textTransform: "uppercase",
  marginBottom: 4,
  color: color.labelText
}

const EYE_STYLE: ImageStyle = {
  position: "absolute",
  top: 8,
  right: 8
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface PasswordFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: string

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: string

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle | TextStyle[]

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export function PasswordField(props: PasswordFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    onChangeText,
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)
  const [secureText, setSecureText] = useState(true)

  let inputStyle: TextStyle = INPUT
  inputStyle = enhance(inputStyle, inputStyleOverride)
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const handleTextChange = debounce(onChangeText, 200)

  return (
    <View style={containerStyle}>
      <Text preset="fieldLabel" tx={labelTx} text={label} style={LABEL_STYLE} />
      <View>
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          onChangeText={handleTextChange}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={EYE_STYLE}>
          <Image source={IC_EYE} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
