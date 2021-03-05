# pocsuite3-goby: 远程漏洞测试框架

## 0x01 部署 pocsuite3
还请按照本文档的方式来部署 pocsuite3，避免出现不必要的环境问题

```bash
# 直接使用pip安装
pip3 install pocsuite3
# 随后可以使用pip命令查看包的安装位置来放置插件
pip show pocsuite3
# poc批量检测使用的是如下命令
# 加载poc目录下所有poc,并将结果保存为html
pocsuite -u http://example.com --plugins poc_from_pocs,html_report 
```

PS:
```bash
# kali linux 上面安装 pocsuite3
sudo apt update && sudo apt install python3-pip
sudo su # 切换进入root权限
pip install pocsuite3
```

插件目前在 macOS 和 Kali Linux 通过了测试

## 0x02 pocsuite3 插件
刚开始进入的话你可以在插件设置里面配置一下`pocsuite`的命令执行路径。
PS:
```bash
# 不知道pocsuite路径的可以执行如下命令进行查看
which pocsuite
```
![image](https://i.loli.net/2021/03/04/rfEcACXBdQsN9ZJ.png)


插件接口在两个地方，一个是在goby的右侧任务栏的"Web检测"中
![image](https://i.loli.net/2021/03/04/U1rupONxs4dehtW.png)
另外一个是点击对应资产的IP查看各个接口详情的是时候
![image](https://i.loli.net/2021/03/04/dWiJNuVf5eXUb93.png)

点击 pocsuite 便可进行扫描，再次点击查看扫描结果，目前插件版本 0.1.0 ，对应的 html 格式的结果pocsuite会输出到指定的目录，扫描完成界面上会有显示  
![image](https://i.loli.net/2021/03/04/dRqHpQbiMUjEJse.png)
![image](https://i.loli.net/2021/03/04/PWK8rx2YLwoBmbQ.png)

## 0x03 功能建议或 bug 反馈
goby pocsuite3 插件建议和反馈请前往 [https://github.com/zer0yu/pocsuite3-goby/issues](https://github.com/zer0yu/pocsuite3-goby/issues)  
pocsuite3 建议和反馈请前往 [https://github.com/knownsec/pocsuite3/issues](https://github.com/knownsec/pocsuite3/issues)  

## 0x04 后续开发计划
- [ ] 漏洞利用功能
- [ ] 指定poc检测
- [ ] 指定插件扫描

