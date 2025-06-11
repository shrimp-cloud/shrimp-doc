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
