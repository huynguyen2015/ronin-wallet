import React from 'react';
import { StyleSheet } from 'react-native';
import { compose } from 'recompose';
import { handleTextInput, withNextInputAutoFocusInput } from 'react-native-formik';
import FormControl from './formControl';
import Row from "../layout/Row";
import Input from '../commons/Input'

const FormInput = ({
  label, hint, styleLabel, error, required, containerStyle, suffixComponent, multiline, editable, ...props
}) => (
    <FormControl label={label} hint={hint} styleLabel={styleLabel} error={error} required={required} style={containerStyle}>
        <Row center>
            <Input style={styles.input} border height={multiline ? 80 : 40} multiline={multiline}
                   editable={editable} {...props} />
            {suffixComponent}
        </Row>
    </FormControl>
);

export default compose(handleTextInput, withNextInputAutoFocusInput)(FormInput);

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
