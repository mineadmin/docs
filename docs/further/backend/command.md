# 命令介绍

## 系统命令列表

```sh
# 命令
php bin/hyperf.php mine

# 结果
/---------------------- welcome to use -----------------------\
|               _                ___       __          _      |
|    ____ ___  (_)___  _____    /   | ____/ /___ ___  (_)___  |
|   / __ `__ \/ / __ \/ ___/   / /| |/ __  / __ `__ \/ / __ \ |
|  / / / / / / / / / / /__/   / ___ / /_/ / / / / / / / / / / |
| /_/ /_/ /_/_/_/ /_/\___/   /_/  |_\__,_/_/ /_/ /_/_/_/ /_/  |
|                                                             |
\_____________  Copyright MineAdmin 2021 ~ 2022  _____________|

mine
  mine:install        MineAdmin system install command
  mine:jwt-gen        MineAdmin system gen jwt command
  mine:migrate-gen    Generate a new MineAdmin module migration file
  mine:migrate-run    The run migrate class of MineAdmin module
  mine:model-gen      Generate model to module according to data table
  mine:module         install command of module MineAdmin
  mine:request-gen    Generate validate form request class file
  mine:seeder-gen     Generate a new MineAdmin module seeder class
  mine:seeder-run     The run seeder class of MineAdmin module
  mine:update         MineAdmin system update command

```

## 安装命令
:::tip
用于第一次安装系统，按照提示步骤一步步安装即可
:::
```sh
php bin/hyperf.php mine:install
```

## 更新命令
:::tip
用于系统更新后升级SQL的命令
:::
```sh
php bin/hyperf.php mine:update
```

## 模块命令
:::tip
用于查看本地模块列表以及模块的安装和卸载
:::

```sh
# 查看本地模块列表
php bin/hyperf.php mine:module

# 安装模块
php bin/hyperf.php mine:module --option=install --name=模块名

# 卸载模块
php bin/hyperf.php mine:module --option=uninstall --name=模块名
```

## 生成模块数据表迁移命令
:::tip
用于生成一个空的数据表迁移骨架文件
:::
```sh
php bin/hyperf.php mine:migrate-gen --module=模块名 数据表名称(不用带表前缀)
```

## 运行模块数据表迁移命令
:::tip
用于安装模块sql
:::
```sh
php bin/hyperf.php mine:migrate-run 模块名
```

## 生成模块数据表填充命令
:::tip
用于生成一个空的数据表填充骨架文件
:::
```sh
php bin/hyperf.php mine:seeder-gen --module=模块名 数据表名称(不用带表前缀)
```

## 运行模块数据表填充命令
:::tip
用于填充数据表数据
:::
```sh
php bin/hyperf.php mine:seeder-run 模块名
```

## 生成模块表模型类
:::tip
按模块下的数据表生成模型类，不带 `--table` 参数则生成该模块所有数据表模型
:::
```sh
php bin/hyperf.php mine:model-run --module=模块名 --table=表名称
```

## 生成JWT场景密钥
:::tip
用于jwt场景生成新的密钥
:::
```sh
php bin/hyperf.php mine:jwt-gen --jwtSecret=场景名
```