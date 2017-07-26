# 验证身份证

> 身份证严格验证和获取基本信息：15位和18位内地身份证包括地区、生日、校验码；获取性别，年龄，出生日期，城市名称

## 从NPM下载包

``` npm
npm i id-card-validator
```

## 使用实例

### 第一种方式引入一个对象

``` js
import { validator } from 'id-card-validator'
//地区码对象，不引入将不对地区做验证
import area from 'id-card-validator/lib/areaNumber'
validator.validate(id, area)
```

#### 直接调用验证方法传入身份证号

``` js
/*
 * id: 身份证号
 * area： 是地区码对象，如果不传将不对
 * 地区的正确性验证
*/

validator.validate(id, area)

// 或者

validator.validate(id)
```

### 第二种方式引入一个类

``` js
import validator from 'id-card-validator'
import area from 'id-card-validator/lib/areaNumber'
```

#### 创建对象然后调用方法传入身份证号

``` js
//area 不传将不验证地区的正确性
const validator = new validator()
validator.validate(id, area)

//或者

const validator = new validator(area)
validator.validate(id)
```

### 获取信息

``` js
/*
 * 获取信息前必须先调用validate()方法
 * 通过验证才能获取正确的信息
 */

 //验证省份证号
 validator.validate(id, area)

 /*
  *获取信息 info 是一个对象
  *{sex, birthday, age, address}
  */
  
 validator.info


```

## 构建

``` bash
# 安装依赖
npm install

# 打包
npm run build

# 单元测试
npm unit
```
