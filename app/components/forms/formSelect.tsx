import React from 'react';
import { compose } from 'recompose';
import { handleTextInput, withNextInputAutoFocusInput } from 'react-native-formik';
import FormControl from './formControl';
import ModalSearch from "../modals/modalSearch";
import { TextProps as TextProperties, TextStyle } from "react-native"

interface FormSelectProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  value?: any

  setFieldValue?: any
  onChangeFieldValue?: any

  /**
   * Children components.
   */
  label?: string

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
   * One of the different types of text presets.
   */
  styleLabel?: TextStyle
  editable?: boolean
  options?: any[]
}


const FormSelect = ({
  error,
  value,
  setFieldValue,
  onChangeFieldValue,
  label,
  placeholder = '',
  options = [],
  required,
  styleLabel,
  editable= true,
  modalTitle,
  ...props
}: FormSelectProps) => {
  const handleSetFieldValue = (value) => {
    setFieldValue && setFieldValue(value)
    onChangeFieldValue && onChangeFieldValue(value)
  }
  return (
    <FormControl label={label} styleLabel={styleLabel} error={error} required={required}>
      <ModalSearch value={value} onPressSelect={handleSetFieldValue}
                   modalTitle={modalTitle}
                   editable={editable} options={options} {...props}/>
    </FormControl>
  );
}

export default compose(handleTextInput, withNextInputAutoFocusInput)(FormSelect);


