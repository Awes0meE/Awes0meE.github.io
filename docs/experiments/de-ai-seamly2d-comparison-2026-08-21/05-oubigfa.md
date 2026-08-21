# 绿色三角退回起点

2025 年 8 月，我刚在南京结束全国大学生电子设计竞赛，第二周便进了研究院，早上八点到，下午五点走，连续做了三周全职实习。带教工程师每天给任务，我做完去汇报；这样的节奏很像一份正经工作，我的底子却只有学校里学过的一点 C/C++ 语法，Qt 没碰过，大型开源仓库也没进过。第一天要装 Git、MSVC v142、Windows SDK、CDB、Qt Creator 和 Qt Kit，清单虽然长，照着点总能走下去，偏偏 Qt 在线安装器连着海外服务器，三个小时只挪到大约 10%。我以为大软件就该这样，守着进度条耗掉大半天。第二天工程师告诉我换清华镜像，剩下的内容一个多小时便装完了。后来再看 TUNA 的 [Qt 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/qt/)，`--mirror` 参数明明写在那里，只是当时的我连该搜什么都不知道。

那一天没有写出一行界面代码，却很像后面三周的缩影。一个结果看起来是否正常，常常取决于我是否已经知道它背后还有别的条件；不知道的时候，连等待都显得合情合理。

## qmake 的一句成功

环境齐了，我第一次 clone Seamly2D，查看上游分支，把源码拉到公司给实习生准备的开发线上。最初使用 Qt 5.15.2，安装和 Kit 看起来都完整，工程却先被 `core5compat` 拦住；我把模块改成条件加载，清理项目，重新执行 qmake，终于看见 `qmake_all finished successfully`。这句话的效力很短，完整构建随后冒出三十多个错误，`QStringConverter`、Qt 6 头文件和 Qt 6 风格调用已经散在源码里。qmake 只处理了 `.pro` 并生成构建规则，它并没有替后面的 C++ 代码许诺 Qt 5 兼容。

继续沿 Qt 5 修补，意味着在许多文件里增加条件编译，我那时既没有足够的 Qt 经验，也没有理由在三周任务里逆着当前源码走。于是改装 Qt 6.5.3 MSVC2019 64-bit 与 Qt 5 Compatibility Module，选回 v142 编译器，删掉旧 build 目录和 `Seamly2D.pro.user`，重新配置 Kit。再次 qmake、完整构建以后，源码和工具链才接上。[Qt6 首跑原始记录](/notes/turing-qt-seamly2d-first-run)留下了当时的修改；Qt 6.5 的[支持配置](https://doc.qt.io/qt-6.5/windows.html)则把 Windows、x86-64 与 MSVC 2019列在同一组条件中。版本、编译器、架构原先只是安装界面里的三个名称，到这里才成为同一份二进制约定。

## 账户功能先被输入框绊住

第一周后半段，我在 Seamly2D 主界面前接入本地注册和登录。第一版用 `QSettings` 保存用户信息，密码也是明文存储后直接比较，后来才改为哈希值存储与校验，密码框设为遮蔽显示，已有用户、缺失用户和密码错误也各自给出提示。真正试用时，权限判断尚未碰到多少困难，输入框倒先出了几件怪事：回车默认触发取消，用户名栏会弹联想，密码栏在中文输入法状态下还发生过闪退。程序入口若在这里消失，后面的角色规则写得再严密，也没有机会执行。

我逐项修正这些行为，又在 `main()` 附近理顺注册、登录和进入主程序的顺序。这里的 [`QSettings`](https://doc.qt.io/qt-6.5/qsettings.html)只是跨平台的本机设置持久化工具，项目没有数据库、服务器或在线认证，三周内验证的范围，就是给现有 C++ 桌面程序加上一层能实际使用的本地入口。第二周，入口后面又长出角色：首次注册名必须是 `admin`，用户分普通用户和管理员，只有管理员能看见用户管理；删除要再次确认，删除和升级都只针对普通用户，降级仅由 `admin` 执行，免得其他管理员互相降级。周日志把它们写成查看、删除、升级、降级几项功能，代码面对的却是当前用户、目标用户、目标角色以及下一状态能否被允许。界面把状态摆出来，权限真正约束的是状态怎样变化。

[公开角色摘录](/uploads/projects/nanjing-turing/auth-role-snippet.cpp)只留下 `Role::User`、`Role::Admin` 和本地角色查询，完整账户源码没有公开；[第二周原始日志](/uploads/projects/nanjing-turing/week-2-development-log.txt)保留了当时那组约束。它们能说明我做过什么，也同时划出了公开材料到哪里为止。

## `windeployqt` 在硬盘里

第三周从 Develop 转到 Release。带账户入口的程序已经能在 Qt Creator 里启动，我自然把下一步理解成导出；`windeployqt` 却卡了大约三天，部署步骤说找不到命令，可执行文件明明躺在 Qt 安装目录。其间重装过，也查过路径和配置，我现在已记不清每次尝试的先后，只记得那几天很烦。好在同期文档保存了最后可用的办法：Qt Creator 的 Build Environment 必须能看到 Qt 的 `bin`，两个 `.pro` 文件中的 post-link 规则改为经 `QT_INSTALL_BINS` 定位 `windeployqt`，并且只在 Release 配置下执行。文件在硬盘上的位置，和启动构建的进程能否找到它，是两件需要分别证明的事。

Qt 6.5 的 [Windows 部署文档](https://doc.qt.io/qt-6.5/windows-deployment.html)说明，`windeployqt` 会扫描 `.exe`，收集 Qt 库、插件、翻译和运行时文件，额外的第三方库仍需另行处理。因此，部署目录里已经铺满 DLL，应用仍然报告缺少 `xerces-c_3_2.dll`，并不矛盾；Seamly2D 以 XML 保存纸样数据，Xerces-C++ 是它单独依赖的解析库，我最后手动把 DLL 补了进去。此前读过的 `.sm2d`、`.smis` 样例也在此时有了更实在的位置，纸样点、线、曲线和量体变量终究要经过解析器，才能成为软件里的数据。[XML 样例笔记](/notes/turing-sm2d-xml-data-format)记录这些结构；[CMake 与编译逻辑笔记](/notes/turing-cmake-build-logic)记录我同期用来分辨编译器、链接器、生成器、Ninja、Qt 包发现与运行时依赖的学习。Seamly2D 的构建始终是 qmake，我没有把它迁到 CMake。

## 一台电脑跑通，只说明一台电脑

依赖补齐以后，我创建 Windows 自签名证书，用 Inno Setup 把部署目录做成安装程序，再给应用和安装包签名。Release 构建、依赖收集、签名、打包、安装、启动，这条流程在实习开发机上完整走通，带教工程师也在正式验收中逐项查看账户功能和 Windows 部署结果。可是当时手头没有另一台既无 Visual Studio、也无 Qt 的 Windows 电脑，[打包流程文档](/notes/turing-release-packaging-cross-platform)只能证明同机安装成功；README 那句“移植到任意电脑都可以运行”，比已有验证多走了一步。

实习结束约半个月后，我在家里一台新装的 Windows 台式机补了这项测试。机器没有 Qt，也没有 Visual Studio，我运行 Inno Setup 安装程序，打开修改后的应用，再实际操作注册、登录和角色功能。这是我亲手做过的换机验证，却发生在旧文档完成之后，既没有补回原记录，也没有再送到公司复验，所以它不能被并入正式验收。时间顺序把两项结论分得很清楚：公司验收覆盖开发机，后来那台干净电脑只属于我的后补测试。

Windows 之后，我又把同一份源码搬到自己的 Mac。Homebrew Qt 和官方 Qt 的路径、架构不同，Windows Kit 当然也不会跟着仓库过去；我重新跑通 Debug、Release，用 `macdeployqt` 收集 framework 与插件，应用实际启动，无签名 DMG 也生成并在这台 Mac 上打开，带教工程师现场看过演示。下一步却没有跑通。我建了自签名证书，写了一份包含 `codesign`、`spctl` 和 DMG 生成顺序的脚本，应用签名仍未完成，notarization 更没有开始，也没有 Developer ID。Qt 的 [`macdeployqt` 文档](https://doc.qt.io/qt-6.5/macos-deployment.html)关心应用包里的 framework 与插件，Apple 的 [Developer ID 说明](https://developer.apple.com/support/developer-id/)关心分发者身份和公证检查，二者之间那段距离不会因为 DMG 文件已经存在而消失。[无签名打包脚本](/uploads/projects/nanjing-turing/macos-build-package.sh)记录跑通的路线，[签名尝试脚本](/uploads/projects/nanjing-turing/macos-build-package-sign.sh)记录没有完成的路线，各自只证明各自的结果。

## `develop` 之后没有结论

这三周也是我第一次把 Git 用作协作工具。clone、查看和切换上游分支、建立开发分支、commit、push、merge、pull request、fork、tag，都不再是教程里的名词；最终源码改动、日志和交接材料提交到公司为实习生维护的 `develop` 分支。离开以后，公司是否继续采用或把它做进产品，我没有消息，记录因此停在交接，不能替后来的人写出一个结果。

正式验收从注册登录、角色管理看到 Windows 安装和 Mac 演示。带教工程师说，我从三周前完全不知道 Qt，走到能把一个大型项目推进到这里，进步很大；他夸了很久，我也确实兴奋。那份兴奋没有把我变成 Qt 专家，只给了我一次很具体的确认：陌生代码并非只能站在外面看，沿着报错、分支和依赖进去，改动最后可以交到另一个人手里。

实习以前，命令行程序给出预期输出，我便会说它能跑。三周结束时，这句话已经带上分支、Qt 包、编译器、角色、构建、机器和平台信任。Qt Creator 里的绿色三角仍然有用，只是退回了起点。
