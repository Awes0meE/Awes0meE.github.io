code 文件夹中是程序源代码，更改的地方除了 Seamly2D_addon 文件夹中的文件之外，还对 Seamly2D.pro 和 seamly2d.pro 这两个 qmake 构建文件进行了一些更改以进行编译。

Seamly2D__Release 文件夹中是 Release 成功编译出来以后使用 windeployqt 收集到的所有依赖，该文件夹移植到任意一个电脑上都可以运行里面的 seamly2d.exe 程序。

Seamly2D_addon 文件夹中的 .cpp 与 .h 文件全是新增到项目中的文件，其中 auth_utils 和 password_utils 的文件添加到了 code\Seamly2D\src\app\seamly2d\auth 中，其余所有添加的源文件和头文件都添加到了 code\Seamly2D\src\app\seamly2d\dialogs 中。

sm2d样例文件 文件夹中是从 seamly2d 官方论坛上找来的一个衣服样板文件，可以用于研究 sm2d 的数据格式。

code\Seamly2D\build 文件夹中保留了两个现成的构建好的程序 Develop 分支，一个是用 debug 的编译配置跑的，一个是用 release 的配置跑的，经实测两者都可以直接导入 Qt Creator 运行。

使用 Qt Creator 首次导入之前，因开发环境不同，可能需要删除 code\Seamly2D 路径下的 Seamly2D.pro.user 文件才能成功读取项目，此外，如果 code\Seamly2D 文件夹中有 git 相关的文件夹也有可能导致读取项目卡死。
