##  一、Jann Lee|李强的个人博客

### 简介

这是一个开源的个人博客项目，目的是打造成一个高并发，高性能，高可用的个人开源项目。由于本人技术水平有限，可能存在很多问题，希望各位大佬能提出宝贵意见。喜欢就请star吧，给与我动力！

#### 1.完整的服务器环境搭建

#### 2.网站使用插件

### 首页

​      UI是基于欲思主题改造的。在页面上花费了很多时间，为了增强用户体验，引用了很多花里胡哨的插件，同时有专门的文件服务器用来存储图片和js/css文件，大大提高了网站的响应速度度。同时后台也采用了Tomcat集群与Redis分布式来提高网站的性能。当然好的项目都不是一蹴而就的，本项目仍然有很多问题，我会继续努力完善。

![](http://p34qzbztu.bkt.clouddn.com/201802030200_161.jpg?imageView1/JannLee/md/01)

##  二、技术选型与系统架构

> *后端技术：

|        技术         |          名称          |      版本      |                    官网                    |
| :---------------: | :------------------: | :----------: | :--------------------------------------: |
| Spring Framework  |        web容器         | 4.0.3Release | http://projects.spring.io/spring-framework/ |
|     SpringMVC     |        MVC框架         |    4.0.0     | http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#mvc |
|   SpringSession   |     分布式Session管理     |   `4.0.0`    | http://projects.spring.io/spring-session/ |
|      MyBatis      |        ORM框架         |    3.4.1     | http://www.mybatis.org/mybatis-3/zh/index.html |
| MyBatis-Generator | mapper.xml以及pojo代码生成 |    1.3.2     | http://www.mybatis.org/generator/index.html |
|    PageHelper     |     MyBatis分页插件      |    4.1.0     | http://git.oschina.net/free/Mybatis_PageHelper |
|       Redis       |       分布式数据缓存        |     2.8      |            https://redis.io/             |
|       MySql       |         数据库          |   5.1/5.5    |          https://www.mysql.com/          |
|       Maven       |        项目构建管理        |    3.0.5     |         http://maven.apache.org/         |
|      Logback      |         日志系统         |    1.1.2     |         https://logback.qos.ch/          |
|       Nginx       |         反向代理         |    1.10.2    |            http://nginx.org/             |
|      lombok       |        代码简化工具        |   1.16.18    |        https://projectlombok.org/        |
|      Vsftpd       |        文件服务器         |    2.2.2     |         http://www.rpmfind.net/          |
|        Git        |        版本控制工具        |     2.8      |           https://git-scm.com/           |

> *前端技术：

|      技术      |       名称        |                 官网                  |
| :----------: | :-------------: | :---------------------------------: |
|    jQuery    |       函数库       |          http://jquery.com          |
| Font-awesome |      字体图标       |       http://fontawesome.io/        |
|  Editor.md   | 在线Markdown文本编辑器 | https://github.com/pandao/editor.md |

> *环境配置

CentOS6.8 + JDK1.7+MySQL5.1+Maven3.0.5+Nginx1.10.2+Git2.8+Tomcat7+Redis2.8+Vsftpd2.2.2

##  三、系统架构

 ![](http://p34qzbztu.bkt.clouddn.com/201802030202_361.jpg?imageView1/JannLee/md/01)

## 四、更新日志

1.准备前端静态页面:使用Internet Download Manager 抓去网站页面，并修改！--2018/1/18  

2.修改标签云，项目结构设计，设计数据库表，修改后台管理页面，后台环境搭建，初始化--2018/1/19  

3.编写成后台最基本的功能(博客(以及对应的标签，分类,)添加，修改，删除，列表)2018/1/20

4.编写后台基本功能，优化，修改后台管理页面，引入Editor.md插件    2018/1/21

5.修改后台页面（博客上传页面已完成），editor.md的调整，配置，文件上传和后接口完善。2018/1/22

6.博客首页数据交互完成，页面修改优化。2018/1/23

7.新增插件，天气，网易云音乐，标签云，wowslider.2018/1/24

8.博客剩余数据交互完成，网页布局修改。2018/1/25

9.前端分页js实现，页面优化，基本功能数据交互完成。2018/1/26

10.页面优化，引入社会化评论系统畅言。2018/1/27

11.点赞，浏览量功能设计，bug调试2018/1/28

12.Redis引入，对标签，分类进行存储。2018/1/30

13.点赞，浏览量功能实现。2018/1/31

14.点赞，浏览量功能优化 。2018/2/1

15.升级为分布式Redis。2018/2/2

持续更新中。。。