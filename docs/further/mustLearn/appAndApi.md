# 应用与接口

:::tip 说明
MineAdmin提供了一套对外部授权的API应用系统

- 实现了最高基于 OAuth2.0 协议授权
- 实现了文档自动化生成
- 提供了应用分组、接口分组管理
:::

:::warning 注意
这套API应用系统并不建议在系统内部本身使用，若使用反而会造成业务上的繁琐，使得变的更加复杂。
:::

## 应用
:::tip
创建应用前，请先创建应用分组
:::

创建应用会生成一个 `appId` 和 `appSecret`。这两个参数是授权给外部访问接口的重要凭证

<img src="https://s1.ax1x.com/2022/09/28/xmVa5R.png" />

:::warning 注意
编辑应用时，刷新 `appId` 和 `appSecret` 操作会导致正常使用应用接口的访问全部失效。
:::

## 接口
<img src="https://s1.ax1x.com/2022/09/28/xmZSMT.png" />

### 说明
- 接口名称：一般填入该接口的主要作用，比如 `获取用户列表`
- 访问名称：接口的真实访问地址，接口都是以 `http://xxx.com/api/v1/{访问名称}` 形式访问
- 请求模式：支持 `所有、POST、GET、DELETE、PUT` 等形式。
- 类名称：填入类的命名空间地址，例如：`Api\InterfaceApi\v1\DemoApi`
- 方法名称：填入类里的方法名称，例如：`getUserList`

:::tip 访问名称定义小技巧
访问名称不支持 `/` ，但可以用 `.` 来区分层级。

比如，我们对外授权以路由划分功能模块，有 `新增用户` 接口 和 `获取用户列表` 接口，那么可以用下面的方式来定义：
- user.add
- user.list

外部访问实际地址就是：
- http://xxx.com/api/v1/user.add
- http://xxx.com/api/v1/user.list
:::

## 注解定义方式
:::tip <a-badge text="1.3.0+" />
在 `1.3.0` 新增注解定义API的方式，省去了后台添加数据的繁杂步骤。 注解定义方式由 [netyum](https://github.com/netyum) 贡献，大家给予掌声和鲜花。
:::

### 访问接口定义注解

#### 注解名
- **#[MApi]**

#### 使用范围
<a-table
    style="margin-top: 20px;"
    size="small"
    :data="[{ class: 'x', method:'√'}]"
    :pagination="false"
    :columns="[
        { title: '类', dataIndex: 'class' },
        { title: '方法', dataIndex: 'method' },
    ]"
/>

#### 注解参数

<a-table
    style="margin-top: 20px;"
    size="small"
    :data="[
        { p: 'name', rm:'接口名称，一般显示在文档上面', dv: '-'},
        { p: 'accessName', rm:'接口的真实访问地址', dv: '-'},
        { p: 'description', rm:'接口描述', dv: '-'},
        { p: 'appId', rm:'绑定所属的App应用，需指定APP ID字段', dv: '-'},
        { p: 'groupId', rm:'绑定所在接口分组，需指定分组id字段', dv: '-'},
        { p: 'authMode', rm:'验证模式，1:简单模式，2:复杂模式', dv: 1},
        { p: 'requestMode', rm:'请求方式，A:所有，P:POST，G:GET，U:UPDATE，D:DELETE', dv: 'A'},
    ]"
    :pagination="false"
    :columns="[
        { title: '参数名', width: 200, dataIndex: 'p' },
        { title: '说明', dataIndex: 'rm' },
        { title: '默认值', width: 150, dataIndex: 'dv' },
    ]"
/>

### 请求入参注解

- 注解暂时仅仅用于生成文档

#### 注解名
- **#[MApiRequestParam]**

#### 使用范围
<a-table
    style="margin-top: 20px;"
    size="small"
    :data="[{ class: 'x', method:'√'}]"
    :pagination="false"
    :columns="[
        { title: '类', dataIndex: 'class' },
        { title: '方法', dataIndex: 'method' },
    ]"
/>

#### 注解参数

<a-table
    style="margin-top: 20px;"
    size="small"
    :data="[
        { p: 'name', rm:'参数名称', dv: '-'},
        { p: 'description', rm:'参数描述', dv: '-'},
        { p: 'dataType', rm:'参数类型 String, Integer, Array, Float, Boolean, Enum, Object, File', dv: 'String'},
        { p: 'defaultValue', rm:'参数默认值', dv: '-'},
        { p: 'isRequired', rm:'是否必须，1：非必填，2：必填', dv: 1},
    ]"
    :pagination="false"
    :columns="[
        { title: '参数名', width: 200, dataIndex: 'p' },
        { title: '说明', dataIndex: 'rm' },
        { title: '默认值', width: 150, dataIndex: 'dv' },
    ]"
/>

### 响应出参注解

- 注解暂时仅仅用于生成文档

#### 注解名
- **#[MApiResponseParam]**

#### 使用范围
<a-table
    style="margin-top: 20px;"
    size="small"
    :data="[{ class: 'x', method:'√'}]"
    :pagination="false"
    :columns="[
        { title: '类', dataIndex: 'class' },
        { title: '方法', dataIndex: 'method' },
    ]"
/>

#### 注解参数

<a-table
    style="margin-top: 20px;"
    size="small"
    :data="[
        { p: 'name', rm:'参数名称', dv: '-'},
        { p: 'description', rm:'参数描述', dv: '-'},
        { p: 'dataType', rm:'参数类型 String, Integer, Array, Float, Boolean, Enum, Object, File', dv: 'String'},
        { p: 'defaultValue', rm:'参数默认值', dv: '-'},
    ]"
    :pagination="false"
    :columns="[
        { title: '参数名', width: 200, dataIndex: 'p' },
        { title: '说明', dataIndex: 'rm' },
        { title: '默认值', width: 150, dataIndex: 'dv' },
    ]"
/>

### 示例代码
```php
class DemoApi
{
    /**
     * @var SystemUserMapper
     */
    protected SystemUserMapper $user;

    protected MineResponse $response;

    /**
     * DemoApi constructor.
     * @param SystemUserMapper $user
     * @param SystemDeptMapper $dept
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function __construct(SystemUserMapper $user, SystemDeptMapper $dept)
    {
        $this->response = container()->get(MineResponse::class);
        $this->user = $user;
    }

    /**
     * 获取用户信息
     * @return ResponseInterface
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    # appId 换成自己的 groupId 换成自己的 (前端更新，这两个必须有，后台才能看到文档
    #[MApi(accessName: "getUserInfo", name: "获取用户信息", description: "获取用户信息", appId: "a7ccdef6d7", groupId: 3)]
    # 请求入参 以下注解暂时仅仅用于生成文档 仅仅作为示例，可以没有
    #[MApiRequestParam(name: 'id', description: "用户id", dataType: 'Integer')]
    # 响应出参 以下注解暂时仅仅用于生成文档
    #[MApiResponseParam(name: 'info', description: "用户信息", dataType: 'Object')]
    public function getUserInfo(UserInfoRequest $userInfoRequest): ResponseInterface
    {
        // 标准formRequest
        $data = $userInfoRequest->validated();
        $info = $this->user->get(function($query) use ($data) {
            $query->where('id', $data['id']);
        });

        return $this->response->success('请求成功', [
            'info' => $info
        ]);
    }
}
```

## 文档

### 如何进入文档
通过 `应用管理` 列表的 `操作栏` 进入应用接口文档

<img src="https://s1.ax1x.com/2022/09/28/xmmqde.png" />

### 文档界面介绍

<img src="https://s1.ax1x.com/2022/10/02/xMYGee.png" />

<img src="https://s1.ax1x.com/2022/10/02/xMYNFA.png" />