import Cookies from 'js-cookie'

const TokenKey = 'token'
const shopId = 'shop_id'
const roleId = 'role_id'
const rootOrgType = 'root_org_type'

//Token操作
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getOrgType() {
  return Cookies.get(rootOrgType)
}
export function setOrgtype(root_org_type) {
  return Cookies.set(rootOrgType, root_org_type)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//shop_id操作
export function getShopId() {
  return Cookies.get(shopId)
}

export function setShopId(shop_id) {
  return Cookies.set(shopId, shop_id)
}

export function removeShopId() {
  return Cookies.remove(shopId)
}

//role_id操作
export function getRoleId() {
return Cookies.get(roleId)
}

export function setRoleId(role_id) {
return Cookies.set(roleId, role_id)
}

export function removeRoleId() {
return Cookies.remove(roleId)
}
