## 角色管理平台 接口文档
## 接口概述
1. Authorization 类型为 Basic-Auth

```javascript
// 以Axios为例，每次请求(除登录、登出外)携带要访问的 系统名称和系统密码，只能访问匹配的系统
Axios({
      url: '/role-manage/xxxx',
      data: that.form,
      method: 'post',
      auth: {
        username: SYSTEM_NAME, // 系统名称
        password: SYSTEM_PASSWORD, //  系统密码
      },
    }).then...
```
2. 非特别说明，所有列出了参数均为必填
2. 接口返会数据类型： JSON/String
3. 通用格式说明：/

```javascript
// 成功返回数据
{
  code: 1,
  data: [...{}],
  msg: '返回说明' 
}
// 失败
{
  code: 0,
  msg: '返回的失败信息'
}
// 权限
'无权限跨系统访问!'
```
### 1、登录接口 
**Method:**
> POST

**URL:**
> /role-manage/login

**Body:**
```javascript
{ username } : string // 用户名 或 UM账号
{ password } : string  // 密码 或 UM密码
```
### 2、登出接口 
**Method:**
> GET

**URL:**
> /role-manage/logout

**No Params**

### 3、查看登录状态 
**Method:**
> GET

**URL:**
> /role-manage/logstate

**No Params**

### 4、新建系统 
**Method:**
> POST

**URL:**
> /role-manage/system

**Body**
```javascript
{ system_name } : string // 系统名称
{ encrypted_password } : string // 明文密码
{ created_by } : string // 创建者的 user_id
```
### 5、获取系统全部列表 
**Method:**
> GET

**URL:**
> /role-manage/system

**No Params**

### 6、获取单个系统 
返回系统全部自身信息，以及系统下关联的角色和资源。
**Method:**
> GET

**URL:**
> /role-manage/system:system_id

**Params**
```javascript
{system_id} // 系统ID
```
### 7、更新系统
**Method:**
> PUT

**URL:**
> /role-manage/system

**Body**
```javascript
/**
 * 修改系统名称：system_name必填 , oldPassword/newPassword 可选
 * 修改系统密码：oldPassword/newPassword 必填，system_name 可选
 */
{ system_id } : number // 系统ID
{ system_name } : string // 选填，系统名称
{ old_password } : string // 选填，原密码
{ new_password } : string // 选填，新密码
```

### 8、删除系统
删除系统，同时与之关联的全部资源角色等会被清空。危险操作，暂不对外提供

### 9、创建角色
**Method:**
> POST

**URL:**
> /role-manage/role

**Body**
```javascript
{ role_name } : string // 角色名称
{ created_by } : string // 创建者 user_id
```

### 10、 获取角色列表
**Method:**
> GET

**URL:**
> /role-manage/role

**No Params**

### 11、 获取单个角色详情
**Method:**
> GET

**URL:**
> /role-manage/role:role_id

**Params**
```javascript
{ role_id } // 角色ID
```

### 12、 删除角色
**Method:**
> DELETE

**URL:**
> /role-manage/role:role_id

**Params**
```javascript
{ role_id } // 角色ID
```

### 13、 更新角色
**Method:**
> POST

**URL:**
> /role-manage/role

**Body**
```javascript
{ role_id } : number // 角色ID
{ role_name } : string // 角色名称
```

### 14、 创建资源
**Method:**
> POST

**URL:**
> /role-manage/resource

**Body**
```javascript
{ resource_name } : string // 资源名称
{ resource_type } : string // 资源类型
{ value } : string // 资源内容
{ created_by } : string // 创建人 user_id 
```

### 15、 获取资源列表
**Method:**
> GET

**URL:**
> /role-manage/resource

**No Params**

### 16、 获取资源详情
**Method:**
> GET

**URL:**
> /role-manage/resource:resource_id

**Param**
```javascript
{ resource_id } : string // 资源ID
```

### 17、 删除资源
**Method:**
> DELETE

**URL:**
> /role-manage/resource:resource_id

**Param**
```javascript
{ resource_id } : string // 资源ID
```

### 18、 更新资源
**Method:**
> PUT

**URL:**
> /role-manage/resource

**Body**
```javascript
/**
 * resource_type、resource_name、value 不能同时为空
 */
{ resource_id } : number // 资源ID
{ resource_type } : string // 选填，资源类型
{ resource_name } : string // 选填，资源名称
{ value } : string // 选填，资源内容
```

### 19、 创建用户-角色关系
**Method:**
> POST

**URL:**
> /role-manage/userrole

**Body**
```javascript
/**
 * 创建 一个角色管关联个用户 的关系
 */
{ user_id } : Array // 用户ID的数组
{ role_id } : number // 角色ID
{ created_by } : string // 创建者
```

### 20、 通过用户查找对应角色
**Method:**
> GET

**URL:**
> /role-manage/userrole/user/:user_id

**params**
```javascript
{ user_id } : string // 用户ID
```

### 21、 通过角色查找对应用户
**Method:**
> GET

**URL:**
> /role-manage/userrole/role/:role_id

**params**
```javascript
{ role_id } : string // 角色ID
```

### 22、 删除用户-角色关系
**Method:**
> DELETE

**URL:**
> /role-manage/userrole

**Body**
```javascript
{ user_id } : string // 用户ID
{ role_id } : number // 角色ID
```
---

### 23、 创建资源-角色关系
**Method:**
> POST

**URL:**
> /role-manage/resourcerole/resource

**Body**
```javascript
/**
 * 批量创建单个资源对多个角色的关系
 */
{ resource_id } : string // 资源ID
{ role_id } : Array // 角色ID的数组
{ created_by } : string // 创建者
```

### 24、 创建资源-角色关系
**Method:**
> POST

**URL:**
> /role-manage/resourcerole/role

**Body**
```javascript
/**
 * 批量创建单个角色对多个资源的关系
 */
{ resource_id } : Array // 资源ID的数组
{ role_id } : string // 角色ID
{ created_by } : string // 创建者
```

### 25、 通过角色查找对应资源
**Method:**
> GET

**URL:**
> /role-manage/resourcerole/role/:rold_id

**params**
```javascript
{ rold_id } : string // 角色ID
```

### 26、 通过角色查找对应资源
**Method:**
> GET

**URL:**
> /role-manage/resourcerole/resource/:resource_id

**params**
```javascript
{ resource_id } : string // 资源ID 
```

### 27、 删除资源-角色关系
**Method:**
> DELETE

**URL:**
> /role-manage/resourcerole/resource

**params**
```javascript
{ resource_id } : string // 资源ID 
{ role_id } : string // 角色ID 
```





       

