import { TextProps as TextProperties, TextStyle } from "react-native"

export interface AssetItemProps extends TextProperties {
  /**
   * Text which is looked up via i18n.
   */
  item: any,

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]
}
