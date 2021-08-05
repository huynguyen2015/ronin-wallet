import React, { useState } from "react"
import { TextStyle, View, ViewStyle, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Wallpaper, Text } from "../../components"
import { color, spacing } from "../../theme"
import { Screens } from "../../navigation"
import { Formik } from "formik"
import { Form, FormInput, FormSelect } from "../../components/forms"
import { translate } from "../../i18n"
import * as Yup from "yup"
import FormControl from "../../components/forms/formControl"
import Modal from "react-native-modal"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  flex: 1
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[3] - 1,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: color.textDark,
}
const FORM_WRAPPER: ViewStyle = {
  marginTop: 25,
  flex: 1
}
const DISABLE_INPUT: ViewStyle = {
  backgroundColor: '#EDF1F7',
  flexDirection: 'row',
  borderWidth: 1,
  borderColor: color.borderColor,
  borderRadius: 8
}
const DISABLE_INPUT_PLACEHOLDER: TextStyle = {
  fontWeight: 'bold',
  color: '#8F9BB3',
  fontSize: 14,
  lineHeight: 20,
  paddingVertical: 10,
  paddingLeft: 20
}
const DISABLE_INPUT_ACCOUNT: TextStyle = {
  ...DISABLE_INPUT_PLACEHOLDER,
  fontWeight: '400',
  paddingLeft: 8
}
const FOOTER_ACTIONS: ViewStyle = {
  height: 70,
  marginTop: spacing[4],
  flexDirection: "row",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.16,
}
const BUTTON_WRAPPER: ViewStyle = {
  justifyContent: 'space-between', flexDirection: 'row',
  flex: 1,
}
const BUTTON_CANCEL: ViewStyle = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: color.palette.offWhite,
  borderRadius: 8,
  marginRight: 8,
  flex: 1,
  height: 40
}
const BUTTON_CANCEL_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 2,
  color: color.primary
}
const BUTTON_SAVE: ViewStyle = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: color.primary,
  borderRadius: 8,
  marginLeft: 8,
  flex: 1,
  height: 40
}
const BUTTON_SAVE_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 2,
  color: color.palette.white
}
const MAX_BADGE: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 0,
  paddingHorizontal: spacing[2],
  paddingVertical: spacing[1] - 2,
  position: "absolute",
  right: 10,
  top: 10,
  borderRadius: 8
}
const BADGE_TEXT: TextStyle = {
  fontSize: 10,
  lineHeight: 16,
  color: '#57627B'
}

const MODAL_SUCCESS: ViewStyle = {
  marginHorizontal: 20,
  marginVertical: 40,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center'
}

const MODAL_CONTAINER: ViewStyle = {
  width: 336,
  borderRadius: 16,
  flexDirection: "column",
  backgroundColor: color.palette.white,
  paddingHorizontal: 20,
  paddingVertical: 22,
  display: "flex"
}

const MODAL_HEADER: ViewStyle = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  flexDirection: "row",
  backgroundColor: "#FFF",
  paddingHorizontal: 20,
  borderBottomColor: color.borderColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const MODAL_TITLE: TextStyle = { color: color.textDark,
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: 28,
}

const MODAL_BODY: ViewStyle = {
  display: "flex",
  marginVertical: 24,
}
const MODAL_CONTENT: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  color: color.textDark,
  textAlign: 'left',
}
const MODAL_FOOTER: ViewStyle = {
}
const BUTTON_OK: ViewStyle = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: color.primary,
  borderRadius: 8,
  height: 40,
}

export const SendAssetsScreen = observer(function SendAssetsScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const {accountStore} = useStores()
  const {myProfile, allAssets} = accountStore
  const requiredMessage = translate("errors.requiredField")
  const initialData = { account: myProfile.accountNumberHiding} as any
  const [modalVisible, setModalVisible] = useState(false)
  const [maxAmount, setMaxAmount] = useState(0)
  const [thankMessage, setThankMessage] = useState(translate('sendAssetsScreen.saveSuccessfullyMessage', {sign: ''}))
  const validationSchema = Yup.object()
  .shape({
    to: Yup.string().required(requiredMessage),
    asset: Yup.object().required(requiredMessage),
    amount: Yup.number().max(maxAmount).required(requiredMessage),
  })

  const handleSave = (values) => {
    accountStore.updateAsset(values)
    setThankMessage(translate('sendAssetsScreen.saveSuccessfullyMessage', {sign: values?.asset?.sign}))
    setModalVisible(true)
  }

  const handleCancel = () => {
    navigation.navigate(Screens.home)
  }

  const handleOK = () => {
    setModalVisible(false)
    navigation.navigate(Screens.home)
  }

  const maxBadge = <View style={MAX_BADGE}><Text tx="sendAssetsScreen.max" style={BADGE_TEXT}/></View>

  return (
    <View testID="SendAssetsScreen" style={FULL}>
      <Wallpaper/>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="sendAssetsScreen.title"
          leftIcon="chevronLeft"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={FORM_WRAPPER}>
          <Formik
            initialValues={initialData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSave(values)
            }}
          >
            {(props) => {
              let {values, handleSubmit} = props
              let hint = translate('sendAssetsScreen.availableAmount', {amount: values?.asset?.amount || 0})
              setThankMessage(translate('sendAssetsScreen.saveSuccessfullyMessage', {sign: values?.asset?.sign || ''}))
              return (
                <Form style={{flex: 1}}>
                  <ScrollView>
                    <FormControl label="sendAssetsScreen.from" >
                      <View style={DISABLE_INPUT}>
                        <Text tx="sendAssetsScreen.myWallet" style={DISABLE_INPUT_PLACEHOLDER}/>
                        <Text text={initialData.account} style={DISABLE_INPUT_ACCOUNT}/>
                      </View>
                    </FormControl>
                    <FormInput label="sendAssetsScreen.to" name="to"/>
                    <FormSelect label="sendAssetsScreen.asset" name="asset"
                                modalTitle="sendAssetsScreen.assets" options={allAssets}
                                onChangeFieldValue={(value) => setMaxAmount(value.amount || 0)}
                    />
                    <FormInput label="sendAssetsScreen.amount" name="amount" hint={hint}
                               keyboardType="numeric" suffixComponent={maxBadge}/>
                  </ScrollView>
                  <SafeAreaView style={FOOTER_ACTIONS}>
                    <View style={BUTTON_WRAPPER}>
                      <Button
                        style={BUTTON_CANCEL}
                        textStyle={BUTTON_CANCEL_TEXT}
                        tx="sendAssetsScreen.btnCancel"
                        onPress={handleCancel}
                      />
                      <Button
                        style={BUTTON_SAVE}
                        textStyle={BUTTON_SAVE_TEXT}
                        tx="sendAssetsScreen.btnSend"
                        onPress={handleSubmit}
                      />
                    </View>
                  </SafeAreaView>
                </Form>
              )
            }}
          </Formik>
        </View>
      </Screen>
      <Modal
        style={MODAL_SUCCESS}
        isVisible={modalVisible}
        swipeDirection="down"
        scrollOffsetMax={400 - 300}
      >
        <View style={MODAL_CONTAINER}>
          <View style={MODAL_HEADER}>
            <Text style={MODAL_TITLE} tx='sendAssetsScreen.saveSuccessfully'/>
          </View>
          <View style={MODAL_BODY}>
            <Text style={MODAL_CONTENT} text={thankMessage}/>
            <Text style={MODAL_CONTENT} tx='sendAssetsScreen.saveSuccessfullyThankMessage'/>
          </View>
          <View style={MODAL_FOOTER}>
            <Button
              style={BUTTON_OK}
              textStyle={BUTTON_SAVE_TEXT}
              tx="sendAssetsScreen.btnOK"
              onPress={handleOK}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
})
