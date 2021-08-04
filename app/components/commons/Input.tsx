import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { color } from "../../theme"
import {Text} from "..";
import Row from "../layout/Row";
import { translate } from "../../i18n"

export default class Input extends Component<any, any> {
  inputRef = React.createRef<TextInput>();

  render() {
    const {
      style, containerStyle, label, border, multiline, height = 50,  value, leftIcon, placeholderTx, placeholder, editable, ...rest
    } = this.props as any;
    const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
    const comp = (
        <Row center style={[styles.container, { height }, containerStyle]}>
          {
            leftIcon
          }
          <TextInput
              ref={this.inputRef}
              placeholder={actualPlaceholder}
              placeholderTextColor={color.textPlaceholder}
              value={value && String(value)}
              style={[styles.input, multiline && styles.multiline, style]}
              multiline={multiline}
              editable={editable}
              {...rest}
          />
        </Row>
    );

    if (label) {
      return (
        <View style={[styles.container, containerStyle]}>
          <Text style={styles.label}>{label}</Text>
          {comp}
        </View>
      );
    }
    return comp;
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    marginBottom: 8,
  },
  container: {
    borderColor: color.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    flex: 1,
    backgroundColor: color.palette.white
  },
  input: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 0,
  },
  multiline: {
    height: 80,
  },
});
