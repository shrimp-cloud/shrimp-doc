# OCR

## Tesseract OCR


## Rocky Linux 9 安装

```bash
dnf update -y
dnf install -y epel-release
dnf config-manager --set-enabled crb
dnf install -y tesseract tesseract-langpack-chi-sim tesseract-langpack-eng

```

- tesseract-langpack-chi-sim: 安装失败，提示不存在
- 语言包位置：/usr/share/tesseract/tessdata
- 手动下载: wget https://github.com/tesseract-ocr/tessdata/raw/main/chi_sim.traineddata


## 使用

- OCR 识别

```shell
tesseract image.png output -l chi-sim

```


## 基础镜像

- Dockerfile

```shell
FROM rockylinux:9
MAINTAINER shrimp
WORKDIR /apps

RUN dnf makecache && \
    dnf update -y && dnf install -y epel-release zsh vim less openssh-clients net-tools numactl fontconfig zip unzip wget telnet bind-utils && \
    dnf install -y tesseract tesseract-langpack-chi-sim tesseract-langpack-eng && \
    dnf config-manager --set-enabled crb && \\
    dnf clean all && \
    ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    fc-cache -fv && \
    echo "alias ll='ls -l'" >> ~/.bashrc

VOLUME [ "/sys/fs/cgroup" ]

# JDK & arthas
ADD jdk21 jdk21
ADD arthas arthas
ADD simsun.ttf /usr/share/fonts/zh/simsun.ttf

# Tesseract OCR 【中文模型，需要自行提前下载】
ADD chi_sim.traineddata /usr/share/tesseract/tessdata/chi_sim.traineddata


# 环境变量
ENV TZ=Asia/Shanghai
ENV JAVA_HOME=/apps/jdk21
ENV PATH=/apps/jdk21/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ENV LANG=en_US.utf8

```

- 打包，推送，使用
