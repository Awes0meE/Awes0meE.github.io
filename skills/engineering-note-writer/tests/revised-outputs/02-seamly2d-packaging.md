---
trial: revised
input: 02-seamly2d-packaging.md
skill_revision: final redesign snapshot
trial_agent: final_snapshot_02
---

## A Release Folder Is Not Yet a Release / Release 目录还不等于 Release

During a 2025 internship in Nanjing, I worked with Seamly2D, Qt, and C++. The application was already running inside Qt Creator, but the release folder could not yet run independently. That gap was small on screen and rather large in practice: the executable was only the visible part of the program. Its build environment and runtime dependencies had followed it quietly, right up until I tried to make the folder stand on its own.

2025 年在南京实习时，我接触了 Seamly2D、Qt 和 C++。程序在 Qt Creator 里已经能跑，整理出来的 Release 目录却还不能独立运行。屏幕上看只是换了个启动位置，实际差得有点远：可执行文件只是程序露在外面的那一部分，构建环境和运行依赖一直安静地跟在后面，直到我真的要求这个目录自己站起来。

## MSVC, CMake, Ninja, and the Selected Kit Had to Agree / MSVC、CMake、Ninja 和 Kit 得说同一种话

Compiler-version conflicts on Windows forced me to revisit how the toolchain fitted together. MSVC determined the compiler environment; CMake had to discover the intended Qt package; Ninja executed the generated build; and the selected Qt Creator Kit tied those choices together. A mismatch at any one of those points could survive long enough to look like an application problem, even though the disagreement had started before Seamly2D itself ran.

Windows 上的编译器版本冲突，逼着我重新把整条工具链的关系捋了一遍：MSVC 决定编译环境，CMake 要找到预期的 Qt 包，Ninja 负责执行生成出来的构建任务，Qt Creator 里选中的 Kit 再把这些选择绑在一起。任何一处没对齐，都可能一路伪装成“程序有问题”，其实 Seamly2D 还没真正开始运行，工具链内部就已经各说各话了。

## `windeployqt` Also Belonged to a Particular Qt / `windeployqt` 也有自己的 Qt

`windeployqt` collected the Qt dependencies, but the command itself was not interchangeable. It had to come from the Qt installation that matched the build. Using whichever `windeployqt` happened to be convenient could produce a directory full of convincing-looking files and still leave an application that failed on another machine. A crowded DLL folder can look extremely productive; unfortunately, the number of files is not a deployment test.

`windeployqt` 能收集 Qt 依赖，但这个命令并不是从哪里拿一个都一样。它必须来自与当前构建匹配的 Qt 安装。随手调用一个“离得近”的 `windeployqt`，完全可能得到一个文件堆得很满、看起来很像那么回事的目录，换台机器却照样打不开。DLL 铺满文件夹时确实很有劳动成果的气氛，可惜文件数量不是部署测试。

## A Missing DLL Became a Repeatable Check / 缺失 DLL 变成了一项固定检查

The missing-DLL failures changed packaging from a final button click into a repeatable check. After dependency collection, the useful question was no longer “did the command finish?” but “can this release folder launch without Qt Creator carrying the environment for it?” Each missing dependency exposed another assumption that the development machine had been hiding. The folder only counted as progress when the check could be run again after the next build.

缺失 DLL 的报错，把打包从最后点一下按钮，变成了一项可以重复执行的检查。收集完依赖以后，真正有用的问题不再是“命令有没有跑完”，而是“没有 Qt Creator 在背后替它托着环境，这个 Release 目录还能不能启动”。每缺一个依赖，开发机原本藏起来的一层假设就露出来一点。下一次构建后还能重新做同样的检查，这个目录才算真的往 Release 靠近了。

## Inno Setup Wrapped the Folder; the Certificate Defined Its Limit / Inno Setup 包住了目录，证书也划出了边界

On Windows, I studied code signing, created a self-signed certificate, and used Inno Setup to turn the release directory into an installer. That connected the files I had collected with an installation flow and a signature check, but the self-signed certificate remained a learning setup. It did not turn the installer into a publicly trusted or publicly distributed release.

在 Windows 上，我学习了代码签名，创建了自签名证书，又用 Inno Setup 把 Release 目录做成安装包。这样，前面收集好的文件终于接上了安装流程和签名检查；不过自签名证书的边界也很清楚，它跑通的是学习环境里的流程，并不等于安装包已经获得公开信任，更不代表它被正式对外发布。

## Homebrew Qt and the Official Installer Used Different Maps / Homebrew Qt 和官方 Qt 不在一张地图上

The same packaging idea reached macOS through a different layout. Homebrew Qt and the official Qt installer used different paths and could carry different architecture assumptions, so copying the Windows mental model across was not enough. `macdeployqt` produced an `.app`, and I could create a self-signed certificate, but formal Apple distribution signing and notarization were not completed. The `.app` was a packaging result, not evidence that the full Apple release path had finished.

到了 macOS，同一个打包目标换了一套地形。Homebrew Qt 和官方 Qt 安装器的路径不同，背后还可能带着不同的架构假设，所以把 Windows 那套思路原样搬过去并不够。`macdeployqt` 生成了 `.app`，自签名证书也可以创建，但 Apple 正式分发所需的签名与 notarization 并没有完成。这个 `.app` 说明打包走到了这里，不能替后面的正式发布流程提前交卷。

## The Scripts Preserved the Order, Not the Environment / 脚本保住的是顺序，不是环境本身

I later wrote shell scripts to connect building, packaging, dependency collection, and signature checks as far as the available environment allowed. The scripts did not make Qt installations or architectures interchangeable. What they preserved was the order of operations and the places where a mismatch should become visible. That was already useful: the next packaging attempt no longer had to depend entirely on remembering which command belonged to which environment.

后来我写了 shell 脚本，在现有环境允许的范围内，把构建、打包、依赖收集和签名检查串起来。脚本不会把不同的 Qt 安装或不同架构变得可以随意互换，它保住的是操作顺序，以及环境不匹配时应该暴露问题的位置。这已经足够有用：下一次打包不必再全靠脑子记住“这条命令到底属于哪套环境”。

Related records: [source packaging log](SOURCE_LOG_LINK_PLACEHOLDER), [build and packaging script](BUILD_PACKAGING_SCRIPT_LINK_PLACEHOLDER), and [signature-check script](SIGNATURE_CHECK_SCRIPT_LINK_PLACEHOLDER).

相关记录：[打包源日志](SOURCE_LOG_LINK_PLACEHOLDER)、[构建与打包脚本](BUILD_PACKAGING_SCRIPT_LINK_PLACEHOLDER)、[签名检查脚本](SIGNATURE_CHECK_SCRIPT_LINK_PLACEHOLDER)。

Qt Creator's green Run button still mattered, but I stopped treating it as the finish line. For this project, packaging was not something done after the program; it was part of what made the program runnable at all.

Qt Creator 里的绿色运行按钮当然还是重要，只是我不再把它当作终点。对这个项目来说，打包不是程序写完以后顺手补上的动作，它本来就是“程序到底能不能运行”的一部分。
