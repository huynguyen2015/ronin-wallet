import React, {Component} from 'react';
import {
  View,
  Image, ViewStyle, TextStyle, ImageStyle,
} from "react-native"
import {TouchableOpacity} from 'react-native-gesture-handler'
import Modal from "react-native-modal";
import { color, spacing } from "../../theme"
import {Text} from "..";
import { AssetItem } from "../itemApps/AssetItem"
import { currencyIcons } from "../../utils/appConst"
const IC_CLOSE = require("../../../assets/icons/ic-close.png")
const IC_LAYERS = require("../../../assets/icons/ic-layers.png")

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between"
}

const SELECT_CONTROL: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.borderColor,
  height: 40,
  borderRadius: 8,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[2] + 2,
  backgroundColor: color.palette.white
}
const SELECTED_ITEM_WRAPPER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: 'center'
}
const SELECTED_ITEM_TEXT: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  color: color.textDark,
}
const MODAL = {
  flex: 1,
  marginHorizontal: 20,
  marginVertical: 40,
  paddingTop: spacing[4] + 4,
  borderRadius: 16,
}

const MODAL_HEADER: ViewStyle = {
  height: 50,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  flexDirection: "row",
  backgroundColor: "#FFF",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: color.borderColor
}
const MODAL_TITLE: TextStyle = { color: color.textDark, fontSize: 14,
  lineHeight: 20, flex: 1, textAlign: 'center'}

const MODAL_BODY: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.white,
  borderBottomEndRadius: 16,
  borderBottomLeftRadius: 16,
}
const CURRENCY_ICON: ImageStyle = {
  resizeMode: 'cover',
  aspectRatio: 1,
  width: 24,
  height: 24,
  marginRight: 8
}

class ModalSelect extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      assetItems: [],
      modalVisible: false,
      selectedItem: undefined
    };

  }

  onShow = () => {
    this.setState({modalVisible: true})
  }

  onClose = () => {
    this.setState({modalVisible: false})
  }

  componentDidMount = async () => {
    this.setState({
      selectedItem: this.props.value,
      assetItems: this.props.options || []
    })
  };

  handleSelectAsset = (asset) => {
    this.setState({
      selectedItem: asset, modalVisible: false
    })

    if (this.props.onPressSelect) {
      this.props.onPressSelect(asset)
    }
  }

  render() {
    const {editable, modalTitle} = this.props;
    const {assetItems, modalVisible, selectedItem} = this.state
    return (
      <View style={CONTAINER}>
        <Modal
          style={MODAL}
          isVisible={editable && modalVisible}
          swipeDirection="down"
          scrollOffsetMax={400 - 300}
        >
          <View style={{flex: 1}}>
            <View style={MODAL_HEADER}>
              <Text style={MODAL_TITLE} tx={modalTitle}/>
              <TouchableOpacity onPress={this.onClose}>
                <Image source={IC_CLOSE}/>
              </TouchableOpacity>
            </View>
            <View style={MODAL_BODY}>
              {(assetItems || []).map((item, index) => {
                return <TouchableOpacity onPress={() => this.handleSelectAsset(item)}>
                  <AssetItem item={item} key={index} style={{marginBottom: 0,
                    backgroundColor: index%2 === 0 ? color.palette.white : color.palette.offWhite}}/>
                </TouchableOpacity>
              })}
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.onShow()}
          style={SELECT_CONTROL}
          containerStyle={{ flex: 1}}
        >
          <View style={SELECTED_ITEM_WRAPPER}>
            {selectedItem && <Image source={currencyIcons[selectedItem?.country]} style={CURRENCY_ICON}/>}
            <Text
              numberOfLines={1}
              style={SELECTED_ITEM_TEXT}
              text={selectedItem?.sign}
            />
          </View>
          <Image source={IC_LAYERS}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ModalSelect;
