import React from 'react';
import { View, StyleSheet, TextProps as TextProperties, TextStyle } from "react-native"
import {Text} from "..";
import { color, spacing } from "../../theme"

interface FormControlProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Children components.
   */
  label?: string

  /**
   * Children components.
   */
  hint?: string

  /**
   * Text which is looked up via i18n.
   */
  required?: boolean

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  error?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  styleLabel?: TextStyle
}

const FormControl = ({
  label, hint, required, error, children, style, styleLabel,
}: FormControlProps) => (
    <View style={[styles.container, style]}>
        <View style={styles.labelWrapper}>
          {((label || '').length) > 0 && (<Text style={[styles.label, styleLabel]}>
            <Text tx={label} style={[styles.label, styleLabel]}></Text>
            {required && <Text style={styles.requiredMark}>*</Text>}
          </Text>)
          }
          {((hint || '').length > 0) && <Text style={[styles.hint, styleLabel]}>
            {hint}
          </Text>}
        </View>
        {children}
        {error && (
        <Text style={styles.error}>
            {error}
        </Text>
    )}
    </View>
);

export default FormControl;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    color: color.labelText,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
    marginBottom: spacing[1],
    textTransform: 'uppercase',
    marginLeft: spacing[1]
  },
  hint: {
    color: color.textDark,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.5,
    marginBottom: spacing[1],
    textTransform: 'uppercase',
    marginLeft: spacing[1],
    marginRight: spacing[1]
  },
  requiredMark: {
    color: 'red'
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
