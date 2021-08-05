import React from 'react';
import { StyleSheet, TextProps as TextProperties, TextStyle } from "react-native"
import { compose } from 'recompose';
import { handleTextInput, withNextInputAutoFocusInput } from 'react-native-formik';
import FormControl from './formControl';
import Row from "../layout/Row";
import Input from '../commons/Input'

interface FormSelectProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Children components.
   */
  suffixComponent?: React.ReactNode

  value?: any

  setFieldValue?: any
  onChangeFieldValue?: any

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
   * The text to display if not using `tx` or nested components.
   */
  placeholder?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  modalTitle?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]

  /**
   * An optional style override useful for padding & margin.
   */
  containerStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  styleLabel?: TextStyle
  editable?: boolean
  options?: any[]
  multiline?: boolean
}

const FormInput = React.forwardRef(({
  label, hint, styleLabel, error, required, containerStyle, suffixComponent, multiline, editable, ...props
}: FormSelectProps) => (
    <FormControl label={label} hint={hint} styleLabel={styleLabel} error={error} required={required} style={containerStyle}>
        <Row center>
            <Input style={styles.input} border height={multiline ? 80 : 40} multiline={multiline}
                   editable={editable} {...props} />
            {suffixComponent}
        </Row>
    </FormControl>
));

export default compose(handleTextInput, withNextInputAutoFocusInput)(FormInput);

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
