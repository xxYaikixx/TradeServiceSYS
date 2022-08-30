## はじめに

docker-composeを利用してシンプルなlaravel環境を構築する. Windows(WSL2)/macOS(M1)/Linuxに対応.

## 使用方法

1. 以下をクローンする 
[リンク](https://github.com/ucan-lab/docker-laravel/generate)
2. ディレクトリを変更し、以下のコマンドを実行
3. Execute the following command

```bash
$ make create-project # Install the latest Laravel project
$ make install-recommend-packages # Optional
```

http://localhost

## Tips

- Read this [Makefile](https://github.com/ucan-lab/docker-laravel/blob/main/Makefile).
- Read this [Wiki](https://github.com/ucan-lab/docker-laravel/wiki).

## Container structures

```bash
├── app
├── web
└── db
```

### app container

- Base image
  - [php](https://hub.docker.com/_/php):8.1-fpm-bullseye
  - [composer](https://hub.docker.com/_/composer):2.2

### web container

- Base image
  - [nginx](https://hub.docker.com/_/nginx):1.22

### db container

- Base image
  - [mysql/mysql-server](https://hub.docker.com/r/mysql/mysql-server):8.0

### mailhog container

- Base image
  - [mailhog/mailhog](https://hub.docker.com/r/mailhog/mailhog)
