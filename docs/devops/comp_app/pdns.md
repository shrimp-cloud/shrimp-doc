# PowerDNS


## 安装 PowerDNS

```shell
yum install pdns pdns-backend-sqlite3 -y

mkdir -p /opt/pdns/
# 此步骤失败了
sqlite3 /opt/pdns/pdns.db < /usr/share/doc/pdns-backend-sqlite3/schema.sqlite3.sql

sudo chown pdns:pdns /opt/pdns/pdns.d
sudo chmod 640 /opt/pdns/pdns.d

# vim /etc/pdns/pdns.conf

launch=gsqlite3
gsqlite3-database=/opt/pdns/pdns.db

systemctl start pdns
systemctl enable pdns
systemctl status pdns

firewall-cmd --add-service=dns --permanent
firewall-cmd --reload

```


## 添加 DNS 记录


## 安装 PowerDNS Admin
