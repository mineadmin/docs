# 上传配置

## 前端配置
与0.x版本不同，新版前端在日常使用下不需要调用 `viewImage` 函数了

只需要在 `src/config/upload.js` 配置域名即可

```js
export default {
  storage: {
    LOCAL: 'http://127.0.0.1:9501',
    OSS: '',
    COS: '',
    QINIU: ''
  }
}
```
文件大小配置在 src/components/ma-upload/index.vue里面.
搜索size,修改参数.

```
size: { type: Number, default: 4 * 1024 * 1024 }
```


## 后端配置

### 配置上传大小
在 `config/autoload/serve.php` 文件，修改下面参数，可设置允许最大上传文件大小
```php
Constant::OPTION_PACKAGE_MAX_LENGTH      => 4 * 1024 * 1024
```

### 存储方式配置
在 `config/autoload/file.php` 文件里配置上传存储服务
:::tip
具体启用哪个上传服务是在后台`系统设置`里配置
:::

```php
<?php
return [
    'default' => 'local',
    'storage' => [
        'local' => [
            'driver' => \Hyperf\Filesystem\Adapter\LocalAdapterFactory::class,
            'root' => __DIR__ . '/../../public/uploadfile',
        ],
        'oss' => [
            'driver' => \Hyperf\Filesystem\Adapter\AliyunOssAdapterFactory::class,
            'accessId' => '',
            'accessSecret' => '',
            'bucket' => '',
            'endpoint' => '',
            'domain' => '',
            'schema' => 'http://',
            ...
        ],
        'qiniu' => [
            'driver' => \Hyperf\Filesystem\Adapter\QiniuAdapterFactory::class,
            'accessKey' => '',
            'secretKey' => '',
            'bucket' => '',
            'domain' => '',
            'schema' => 'http://',
            ...
        ],
        'cos' => [
            'driver' => \Hyperf\Filesystem\Adapter\CosAdapterFactory::class,
            'region' => '',
            'domain' => '',
            'schema' => 'http://',
            ...
        ],
?>
```