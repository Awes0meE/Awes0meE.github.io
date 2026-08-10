---
trial: baseline
input: 02-seamly2d-packaging.md
skill_revision: pre-redesign working tree
---

---
title: "Packaging Seamly2D Beyond Qt Creator"
titleZh: "让 Seamly2D 离开 Qt Creator：跨平台打包记录"
summary: "A 2025 internship note about turning a working Seamly2D build into standalone Windows and macOS packages, including toolchain matching, dependency collection, signing experiments, and repeatable packaging scripts."
summaryZh: "2025 年实习期间把 Seamly2D 从 Qt Creator 内运行推进到 Windows 与 macOS 独立打包的记录，涉及工具链匹配、依赖收集、签名尝试和可重复执行的打包脚本。"
date: "2025"
tags: ["Seamly2D", "Qt", "C++", "CMake", "Packaging", "Inno Setup"]
visibility: public
projectSlug: "nanjing-turing-qt-embedded-learning"
---

## The Gap After Qt Creator Turned Green / Qt Creator 跑通以后还有一段距离

Seamly2D was already running inside Qt Creator, but the first Release folder could not yet run independently. The IDE’s green Run button proved that the source, compiler, Qt installation, and development environment could cooperate on that machine. A folder containing `seamly2d.exe` still had to find every runtime dependency without help from Qt Creator.

Seamly2D 当时已经能在 Qt Creator 里运行，但最初整理出的 Release 文件夹还不能独立启动。IDE 里的绿色运行按钮只能说明源码、编译器、Qt 安装和开发环境在这台机器上能够配合。把 `seamly2d.exe` 单独放进一个目录以后，它还要在没有 Qt Creator 帮忙的情况下找到全部运行时依赖。

That gap was the start of the packaging work. A package that behaved perfectly on the development machine and immediately complained elsewhere was frustrating, and also a little funny: the folder could look finished long before it was actually portable.

打包工作就是从这段距离开始的。一个目录在开发机上表现正常，换个环境马上开始报错，确实让人有点抓狂，也有点好笑：它看起来已经很像成品了，离真正可移植却还差不少东西。

## Where MSVC, CMake, Ninja, and the Qt Kit Met / MSVC、CMake、Ninja 和 Qt Kit 对上的地方

Compiler-version conflicts on Windows forced me to revisit the whole build chain. MSVC selected the compiler and runtime family; CMake generated the build configuration; Ninja executed that configuration; Qt package discovery decided which Qt installation the project found; and the selected Kit in Qt Creator brought those choices together.

Windows 上的编译器版本冲突逼着我重新看了一遍整条构建链。MSVC 决定编译器和运行库体系，CMake 生成构建配置，Ninja 执行这些配置，Qt 包发现过程决定项目找到哪套 Qt，Qt Creator 里选中的 Kit 再把这些选择接到一起。

A mismatch anywhere in that chain could leave the project pointing at a different compiler or Qt installation from the one I thought I was using. Packaging therefore began before dependency collection: the Release build itself had to come from a consistent toolchain.

这条链里只要有一处版本或路径对不上，项目就可能指向另一套编译器或 Qt 安装，和界面里看起来使用的环境并不一致。所以打包其实在收集 DLL 之前就已经开始了，Release 构建本身必须来自一套前后一致的工具链。

## A Convincing DLL Folder Could Still Be Wrong / DLL 看起来很齐也可能打错包

On Windows, `windeployqt` collected the Qt dependencies around the Release executable. The important detail was where that command came from. It had to belong to the Qt installation that matched the build.

Windows 侧使用 `windeployqt` 给 Release 可执行文件收集 Qt 依赖。这里最关键的细节是命令究竟来自哪套 Qt 安装，它必须和实际构建使用的 Qt 环境匹配。

Using a convenient `windeployqt` executable from another environment could still produce a busy-looking directory full of DLLs and plugins. That appearance was misleading: the collected files could belong to the wrong Qt build, leaving the package unable to run on another machine.

随手调用另一套环境里的 `windeployqt`，同样可能生成一个塞满 DLL 和插件的目录。这个目录看起来很像那么回事，收进去的文件却可能来自错误的 Qt 构建，换到另一台机器后依然无法运行。

Missing DLLs turned deployment into a repeatable check. I started treating each package as a loop: prepare the Release directory, collect dependencies, launch it outside the IDE, record what was still missing, correct the source of the dependency, and test again. Dependency collection stopped feeling like the final button click.

缺失 DLL 以后，部署变成了一轮轮可以重复的检查：整理 Release 目录、收集依赖、离开 IDE 启动、记录还缺什么、修正依赖来源，再重新测试。依赖收集从一个“点完就结束”的动作，变成了打包流程里需要反复验证的一环。

## From a Release Directory to a Windows Installer / 从 Release 目录到 Windows 安装包

After the application directory could be assembled, I studied Windows code signing and created a self-signed certificate. This let me work through certificate creation and signature checks within the available environment. The certificate did not provide the trust of a publicly issued commercial signing certificate, and this work did not represent a public software distribution.

Release 目录能够整理出来以后，我继续学习 Windows 代码签名，并创建了自签名证书。它让我在现有环境里走通证书创建和签名检查。自签名证书没有公开商业证书的信任能力，这段工作也没有进行公开软件分发。

I then used Inno Setup to turn the prepared Release directory into a Windows installer. At that point, the installer was only as reliable as the directory placed inside it. If dependency collection had used the wrong Qt environment, wrapping the folder in an installation wizard would preserve the same problem.

随后用 Inno Setup 把整理好的 Release 目录做成 Windows 安装程序。安装向导本身不会修正前面的依赖错误，安装包是否可靠，仍然取决于放进去的 Release 目录。如果依赖来自错误的 Qt 环境，换成安装程序以后，这个问题还是会被原样带进去。

## The Same Packaging Question on macOS / 同一个打包问题换到 macOS

The macOS work exposed a similar problem through different paths. Qt installed through Homebrew and Qt installed through the official installer lived in different locations, and they could carry different architecture assumptions. Build and packaging scripts therefore had to know which Qt they were discovering instead of assuming that every `Qt` command referred to the same installation.

macOS 上遇到的是同一类问题，只是表现成了不同的路径。Homebrew 安装的 Qt 和官方安装器提供的 Qt 位于不同位置，也可能带着不同的架构假设。构建和打包脚本必须明确自己找到的是哪套 Qt，不能默认系统里出现的每个 `Qt` 命令都指向同一个环境。

`macdeployqt` collected the required frameworks and produced an `.app`. I also created a self-signed certificate and explored the available signing checks. Formal Apple distribution signing and notarization were left unfinished, so the result should be read as a local packaging and signing experiment rather than a completed public macOS release.

`macdeployqt` 收集所需 framework，并生成了 `.app`。我也创建了自签名证书，尝试了现有环境能够完成的签名检查。正式的 Apple 分发签名和 notarization 没有完成，因此这里留下的是本地打包与签名实验，不能当成已经完成的 macOS 公开发行版本。

## Connecting the Repeated Steps with Scripts / 用脚本接起重复步骤

Later shell scripts connected building, packaging, dependency collection, and signature checks as far as the available Windows and macOS environments allowed. Their useful part was the order they preserved: select the intended toolchain, build the Release target, run the matching deployment utility, and inspect the resulting package.

后来写下的 shell 脚本把构建、打包、依赖收集和签名检查尽量接了起来，范围以当时 Windows 和 macOS 环境实际能完成的步骤为准。脚本最有用的地方是保留了执行顺序：确认目标工具链、构建 Release、调用匹配的部署工具，再检查生成的包。

The scripts did not remove platform prerequisites or finish Apple’s distribution process automatically. They made the steps easier to repeat and made environment mistakes more visible when the packaging path had to be run again.

这些脚本不会消除平台本身的前置条件，也没有自动补完 Apple 的正式分发流程。它们让打包步骤更容易重跑，也让环境选错时留下的差异更容易被发现。

- [Packaging source log / 打包源记录](REPLACE_WITH_SOURCE_LOG_URL)
- [Build and packaging script / 构建与打包脚本](REPLACE_WITH_BUILD_SCRIPT_URL)
- [Signature-check script / 签名检查脚本](REPLACE_WITH_SIGNING_CHECK_SCRIPT_URL)

## Packaging Was Part of the Program / 打包也是程序的一部分

Looking back, this work changed how I judged whether a desktop application was “working.” Running from Qt Creator showed that development could continue. A usable Release also depended on the selected compiler, Qt installation, runtime libraries, deployment utility, package structure, and signature state staying consistent outside the IDE.

现在回头看，这段经历改变了我判断桌面程序“能不能工作”的方式。在 Qt Creator 里跑起来，说明开发可以继续。一个真正可用的 Release 还依赖编译器、Qt 安装、运行时库、部署工具、目录结构和签名状态在离开 IDE 后继续保持一致。

The final executable was only one part of the program that reached another machine. The packaging process carried the rest of its environment with it. That was the point where deployment stopped looking like work done after programming and became part of the engineering of the program itself.

最终到达另一台机器的程序里，可执行文件只占一部分，打包流程还要把它依赖的环境一起带过去。到这里，部署不再像写完程序以后顺手补的一步，它已经成了程序工程本身的一部分。
