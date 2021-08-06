import { flow, getEnv, types, applySnapshot } from "mobx-state-tree"
import authService from "../../services/api/authService"
import assetService from "../../services/api/assetService"
import { values } from "mobx"


const ProfileModel = types.model({
  id: types.optional(types.number, 0),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  password: types.optional(types.string, ""),
  fullName: types.optional(types.string, ""),
  accountNumber: types.optional(types.string, ""),
  accountNumberHiding: types.optional(types.string, ""),
}).actions((self) => ({
  map: (data) => {
    Object.keys(self).forEach(key => {
      self[key] = data[key]
    })
  },
}))

const BalanceInfo = types.model({
  country: types.optional(types.string, ""),
  sign: types.optional(types.string, ""),
  amount: types.optional(types.number, 0),
  exchangeRate: types.optional(types.number, 1),
})

export const AccountStore = types.model("AccountStore", {
  isLoading: false,
  myProfile: types.optional(ProfileModel, {}),
  mainAsset: types.optional(BalanceInfo, {}),
  assets: types.array(BalanceInfo),
  allAssets: types.array(BalanceInfo),
}).views(self => ({
  get filter() {
    return getEnv(self).fetch
  },
})).actions(self => {
  function markLoading(loading) {
    self.isLoading = loading
  }

  const login = flow(function* login(data) {
    try {
      markLoading(true)
      let res = yield authService.login(data)
      if (res) {
        self.myProfile.map(res.userInfo || {})
      }
      markLoading(false)
    } catch (err) {
      console.log("Failed to load: ", err)
    }
  })

  const getAssets = flow(function* getAssets(params) {
    try {
      markLoading(true)
      const data = yield assetService.getAssets(params)
      if (data && data.length) {
        /// NOTE: just simulate the first result as default balance base on country
        const [mainAsset, ...assets] = data
        self.mainAsset = mainAsset
        self.assets = assets
        self.allAssets = data
      }
      markLoading(false)
    } catch (err) {
      console.log("Failed to load: ", err)
    }
  })
  const updateAsset = flow(function* updateAsset(data) {
    try {

      const { allAssets } = self;
      (allAssets || []).forEach(item => {
        if (data.asset?.country === item.country) {
          item.amount -= data.amount
        }
      })
      const [mainAsset] = allAssets;
      applySnapshot(self.mainAsset, mainAsset)
      applySnapshot(self.allAssets, [...(values(allAssets || [])).map(item => ({...item}))])
      markLoading(false)
    } catch (err) {
      console.log("Failed to load: ", err)
    }
  })
  return { login, getAssets, updateAsset }
})
