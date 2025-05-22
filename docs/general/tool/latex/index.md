---
title: LaTeX
---

## 基础教程

### overleaf

提供了一个 30 分钟教程可大致了解语法

### 本地环境搭建

下载 TeX Live

VS Code 加入插件 LaTeX Workshop，配置如下：

```json
{
  // 设置是否自动编译
  "latex-workshop.latex.autoBuild.run": "never",
  //右键菜单
  "latex-workshop.showContextMenu": true,
  //从使用的包中自动补全命令和环境
  "latex-workshop.intellisense.package.enabled": true,
  //编译出错时设置是否弹出气泡设置
  // "latex-workshop.message.error.show": false,
  // "latex-workshop.message.warning.show": false,
  // 编译工具和命令
  "latex-workshop.latex.tools": [
    {
      "name": "xelatex",
      "command": "xelatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOCFILE%"
      ]
    },
    {
      "name": "pdflatex",
      "command": "pdflatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOCFILE%"
      ]
    },
    {
      "name": "latexmk",
      "command": "latexmk",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "-pdf",
        "-outdir=%OUTDIR%",
        "%DOCFILE%"
      ]
    },
    {
      "name": "bibtex",
      "command": "bibtex",
      "args": ["%DOCFILE%"]
    }
  ],
  // 用于配置编译链
  "latex-workshop.latex.recipes": [
    {
      "name": "XeLaTeX",
      "tools": ["xelatex"]
    },
    {
      "name": "PDFLaTeX",
      "tools": ["pdflatex"]
    },
    {
      "name": "BibTeX",
      "tools": ["bibtex"]
    },
    {
      "name": "LaTeXmk",
      "tools": ["latexmk"]
    },
    {
      "name": "xelatex -> bibtex -> xelatex*2",
      "tools": ["xelatex", "bibtex", "xelatex", "xelatex"]
    },
    {
      "name": "pdflatex -> bibtex -> pdflatex*2",
      "tools": ["pdflatex", "bibtex", "pdflatex", "pdflatex"]
    }
  ],
  //文件清理。此属性必须是字符串数组
  "latex-workshop.latex.clean.fileTypes": [
    "*.aux",
    "*.bbl",
    "*.blg",
    "*.idx",
    "*.ind",
    "*.lof",
    "*.lot",
    "*.out",
    "*.toc",
    "*.acn",
    "*.acr",
    "*.alg",
    "*.glg",
    "*.glo",
    "*.gls",
    "*.ist",
    "*.fls",
    "*.log",
    "*.fdb_latexmk"
  ],
  //设置为onFaild 在构建失败后清除辅助文件
  "latex-workshop.latex.autoClean.run": "onFailed",
  // 使用上次的recipe编译组合
  "latex-workshop.latex.recipe.default": "lastUsed",
  // 用于反向同步的内部查看器的键绑定。ctrl/cmd +点击(默认)或双击
  "latex-workshop.view.pdf.internal.synctex.keybinding": "double-click",

  "[latex]": {
    "editor.defaultFormatter": "James-Yu.latex-workshop"
  },
  "latex-workshop.formatting.latex": "latexindent"
}
```

VS Code 加入插件，LTeX+ – grammar/spell checking using LanguageTool，用来检查语法错误（未加配置，目前不太好用，禁用了）

## 实践

### 视频笔记

[视频地址](https://www.bilibili.com/video/BV15x411j7k6?spm_id_from=333.788.videopod.episodes&vd_source=7a09a41552812deea9905288036d8512)

```latex
% 导言区
% 10pt 11pt 12pt
% report book letter
\documentclass[12pt]{article}
% \documentclass{ctexart} %  ctexrep、ctexbook 和 ctexbeamer

\usepackage{ctex} % 显示中文
% 下面三个宏包用于显示 \TeX 标志符号
\usepackage{xltxtra}
\usepackage{texnames}
\usepackage{mflogo}
% 插入图片
% 语法：\includegraphics[options]{文件名}
% 格式：EPS，PDF，PNG，JPEG，BMP
\usepackage{graphicx}
\graphicspath{{imgs/}, {pics/}} % 指定图片的位置
\usepackage{amsmath}
\usepackage{amssymb}

\newcommand{\degree}{^\circ}
\newcommand{\myfont}{\textit{\textbf{\textsf{我的自定义字体内容 Fancy Text}}}}
% 向左的省略号
\newcommand{\adots}{\mathinner{\mkern2mu%
        \raisebox{0.1em}{.}\mkern2mu\raisebox{0.4em}{.}%
        \mkern2mu\raisebox{0.7em}{.}\mkern1mu}}

\title{\heiti LaTeX 入门}
\author{\kaishu 瓢儿白}
\date{\today}
% 指定参考文献的排版样式
\bibliographystyle{plain}

% 正文区（文稿区）
\begin{document}
% \tableofcontents % book 格式中生成目录
\maketitle
\section{基础}
texdoc ctex 命令可在 cmd 中查看 ctex 宏包

texdoc lshort-zh 命令可在 cmd 中查看 latex 中文教程

\subsection{简单公式}

% \degree
勾股定理符号语言：设直角三角形 $ABC$，其中 $\angle C = 90\degree$，则有
\begin{equation}
    AB^2 = BC^2 + AC^2
\end{equation}

% 数学公式
$f(x) = 3x^2 + x - 1$
$$f(x) = 3x^2 + x - 1$$

\subsection{字体}

在 LaTeX 中，一个字体有 5 种属性：
\begin{itemize}
    \item 字体编码
          \subitem 正文字体编码：OT1、T1、EU1 等
          \subitem 数学字体编码：OML、OMS、OMX 等
    \item 字体族
          \subitem 罗马字体：笔画起始处有装饰
          \subitem 无衬线字体：笔画起始处无装饰
          \subitem 打字机字体：每个字符宽度相同，又称等宽字体
    \item 字体系列
          \subitem 粗细
          \subitem 宽度
    \item 字体形状
          \subitem 直立
          \subitem 斜体
          \subitem 伪斜体
          \subitem 小型大写
    \item 字体大小
\end{itemize}

\subsubsection{字体族设置（罗马字体、无衬线字体、打字机字体）}

\textrm{Roman Family} \textsf{Sans Serif Family} \texttt{Typewriter Family}

{\rmfamily Roman Family} {\sffamily Sans Serif Family} {\ttfamily Typewriter Family}

\subsubsection{字体系列设置（粗细、宽度）}

\textmd{Medium Series} \textbf{Boldface Series}

{\mdseries Medium Series} {\bfseries Boldface Series}

\subsubsection{字体形状设置（直立、斜体、伪斜体、小型大写）}

\textup{Upright Shape} \textit{Italic Shape} \textsl{Slanted Shape} \textsc{Small Caps Shape}

{\upshape Upright Shape} {\itshape Italic Shape} {\slshape Slanted Shape} {\scshape Small Caps Shape}

\subsubsection{中文字体}

{\songti 宋体} \quad {\heiti 黑体} \quad {\fangsong 仿宋} \quad {\kaishu 楷书}

中文的\textbf{粗体}与\textit{斜体}

\subsubsection{字体大小}

{\tiny Hello}\\
{\scriptsize Hello}\\
{\footnotesize Hello}\\
{\small Hello}\\
{\normalsize Hello}\\
{\large Hello}\\
{\Large Hello}\\
{\LARGE Hello}\\
{\huge Hello}\\
{\Huge Hello}

中文字号设置命令

% -0 表示小初号
\zihao{-0} 你好 \zihao{5} 你好

\myfont

\section{特殊字符}

\subsection{空白符号}
空行分段，多个空行等同一个

自动缩进，绝对不能使用空格代替

英文中多个空格处理为一个空格，中文中空格将被忽略

汉字与其他字符的间距会自动有 XeLaTeX 处理

禁止使用中文全角空格

1em(当前字体中 M 的宽度)\quad 的空白

2em\qquad 的空白

约为 1/6 个 em\, 的空白，或者使用\thinspace 产生

0.5 个 em\enspace 的空白

空格\  产生空白

硬空格a~b

产生指定宽度的空白：
% 1pc = 12pt = 4.218mm
a \kern 1pc b

a\kern -1em b

a\hskip 1em b

a\hspace{35pt} b

占位宽度 a\hphantom{xyz}b

弹性长度 a\hfill b

\subsection{\LaTeX 控制符}
\# \$ \% \{\} \~{} \_{} \^{} \textbackslash \&

\subsection{排版符号}
\S \P \dag \ddag \copyright \pounds

\subsection{\TeX 标志符号}
\TeX{} \LaTeX{} \LaTeXe{}

% xltxtra 宏包提供
\XeLaTeX

% texnames 宏包提供
\AmSTeX{} \BibTeX{} \LuaTeX{}

% mflogo 宏包提供
\METAFONT{} \MF{} \MP{}

\subsection{引号}
`'\quad ``''
\subsection{连字符}
- -- ---
\subsection{非英文字符}
\oe \OE \ae \AE \aa \AA \o \O \l \L \ss \SS !` ?`

\subsection{重音符号（以 o 为例）}
\`o \'o \^o \''o \~o \=o \.o \u{o} \v{o} \H{o} \r{o} \t{o} \b{o} \c{o} \d{o}

\section{插入图片}
% \includegraphics{kenan} % Overfull \hbox (122.24353pt too wide)
% \includegraphics{xiaolan}

\includegraphics[scale = 0.3]{kenan}
\includegraphics[width = 2cm]{kenan}
\includegraphics[height = 2cm]{kenan}

\includegraphics[width = 0.1\textwidth]{kenan}
\includegraphics[height = 0.1\textheight]{kenan}

\includegraphics[angle = -45, width = 0.1\textwidth]{kenan}

\section{表格}

% 以下宏包有更多的表格
texdoc booktab

texdoc longtab

texdoc tabu

\begin{tabular}{l || c | c | c | p{1.5cm}}
    \hline
    姓名 & 语文 & 数学  & 外语 & 备注     \\
    \hline\hline
    张三 & 87 & 100 & 93 & 优秀     \\
    \hline
    李四 & 75 & 64  & 52 & 补考另行通知 \\
    \hline
    王二 & 80 & 82  & 78          \\
    \hline
\end{tabular}

\section{浮动体环境}

标题控制（caption、bicaption 等宏包）

并排与子图表（subcaption、subfig、floatrow 等宏包）

绕排（picinpar、wrapfig 等宏包）

\begin{itemize}
    \item 实现灵活分页（避免无法分割的内容产生的页面留白）
    \item 给图标添加标题
    \item 交叉引用
    \item 设置允许位置
          \subitem h，此处。代码所在上下文位置
          \subitem t，页顶。代码所在页面或者之后页面的顶部
          \subitem b，页底。代码所在页面或者之后页面的底部
          \subitem p，独立一页。浮动页面
\end{itemize}


\LaTeX{}中的插图见图\ref{fig-kenan}：
\begin{figure}[htbp]
    \centering
    \includegraphics[scale = 0.3]{kenan}
    \caption{柯南}\label{fig-kenan} % label必须和 caption在一行
\end{figure}

在\LaTeX{}中的表格\ref{tab-score}：
\begin{table}[htbp]
    \centering
    \caption{考试成绩单}\label{tab-score}
    \begin{tabular}{l || c | c | c | p{1.5cm}}
        \hline
        姓名 & 语文 & 数学  & 外语 & 备注     \\
        \hline\hline
        张三 & 87 & 100 & 93 & 优秀     \\
        \hline
        李四 & 75 & 64  & 52 & 补考另行通知 \\
        \hline
        王二 & 80 & 82  & 78          \\
        \hline
    \end{tabular}
\end{table}

\section{数学公式}

\LaTeX{} 将文本内容分为文本模式和数学模式

行内公式

交换律 $a+b=b+a$ \(a+b=b+a\) 如左边

math 环境
\begin{math}
    a + b = b + a
\end{math} 如左边

行间公式

交换律是 $$ a + b = b + a $$ 如上，同理 \[ a + b = b + a \] 如上，还有
\begin{displaymath}
    a + b = b + a
\end{displaymath}

自动编号的公式，见\ref{eq:commutative}
\begin{equation}
    a + b = b + a \label{eq:commutative}
\end{equation}

不编号的 equation 环境，见\ref{eq:commutative2}，这个需要 amsmath 宏包
\begin{equation*}
    a + b = b + a \label{eq:commutative2}
\end{equation*}

\section{矩阵}

% 需要 amsmath 宏包，需要放在数学模式中

\[
    \begin{matrix}
        0 & 1 \\
        1 & 0
    \end{matrix}
    % 加小括号
    \begin{pmatrix}
        0 & 1 \\
        1 & 0
    \end{pmatrix}
    % 加中括号
    \begin{bmatrix}
        0 & 1 \\
        1 & 0
    \end{bmatrix}
    % 加大括号
    \begin{Bmatrix}
        0 & 1 \\
        1 & 0
    \end{Bmatrix}
    % 加单竖线
    \begin{vmatrix}
        0 & 1 \\
        1 & 0
    \end{vmatrix}
    % 加双竖线
    \begin{Vmatrix}
        0 & 1 \\
        1 & 0
    \end{Vmatrix}
\]

% 可以使用上下标
\[
    A = \begin{pmatrix}
        a_{11}^2 & a_{12}^2 & a_{13}^2 \\
        0        & a_{22}^2 & a_{23}^2 \\
        0        & 0        & a_{33}^2
    \end{pmatrix}
\]

% 常用省略号  \dots、\vdots、\ddots
\[
    B = \begin{bmatrix}
        a_{11} & \dots  & a_{1n} \\
        \adots & \ddots & \vdots \\
        0      &        & a_{nn}
    \end{bmatrix}_{n \times n}
\]

% 矩阵嵌套 - 分块矩阵，其中 \text{} 用于在数学模式中临时切换到文本模式
\[
    \begin{pmatrix}
        \begin{matrix}
            1 & 0 \\
            0 & 1
        \end{matrix}
         &
        \text{\Large 0} \\
        \text{\Large 0}
         &
        \begin{matrix}
            1 & 0  \\
            0 & -1
        \end{matrix}
    \end{pmatrix}
\]

% 三角矩阵
% \multicolumn{n}{cols}{text} 用来合并多列
% \raisebox{} 用来调整高度
\[
    \begin{pmatrix}
        a_{11} & a_{12} & \cdots & a_{1n} \\
               & a_{22} & \cdots & a_{2n} \\
               &        & \ddots & \vdots \\
        \multicolumn{2}{c}{\raisebox{1.3ex}[0pt]{\Huge 0}}
               &        & a_{nn}
    \end{pmatrix}
\]

% 跨列省略号：\hdotsfor{columns}
\[
    \begin{pmatrix}
        1 & \frac 12 & \dots & \frac 1n \\
        \hdotsfor{4}                    \\
        m & \frac m2 & \dots & \frac mn
    \end{pmatrix}
\]

% 行内小矩阵
复数 $z = (x, y)$ 也可用矩阵 \begin{math}
    \left ( % 需要手动加上左括号
    \begin{smallmatrix}
        x & -y \\
        y & x
    \end{smallmatrix}
    \right ) % 需要手动加上右括号
\end{math}来表示

% array 环境（类似表格环境 tabular）
\[
    \begin{array}{r|r}
        \frac 12 & 0          \\
        \hline
        0        & -\frac abc \\
    \end{array}
\]

% 用 array 环境构造复杂矩阵
\[
    % @{<内容>}-添加任意内容，不占表项计数
    % 此处添加一个负值空白，表示向左移 -5pt 的距离
    \begin{array}{c@{\hspace{-5pt}}l}
        % 第一行，第一列
        \left(
        \begin{array}{ccc|ccc}
                a & \cdots & a      & b      & \cdots & b      \\
                  & \ddots & \vdots & \vdots & \adots          \\
                  & \ddots & \vdots & \vdots & \adots          \\
                  &        & a      & b                        \\ \hline
                  &        &        & c      & \cdots & c      \\
                  &        &        & \vdots &        & \vdots \\
                \multicolumn{3}{c|}{\raisebox{2ex}[0pt]{\Huge 0}}
                  & c      & \cdots & c
            \end{array}
        \right)                                  &
        % 第一行，第二列
        \begin{array}{l}
            % \left.仅表示与\right\}配对，什么都不输出
            \left.\rule{0mm}{7mm}\right\}p \\
            \\
            \left.\rule{0mm}{7mm}\right\}q
        \end{array}
        \\[-5pt]
        % 第二行第一列
        \begin{array}{cc}
            \underbrace{\rule{17mm}{0mm}}_m &
            \underbrace{\rule{17mm}{0mm}}_m
        \end{array} &    % 第二行第二列
    \end{array}
\]

\section{数学公式的多行公式}
% 涉及 amsmath 和 amssymb 宏包
% 带编号
\begin{gather}
    a + b = b + a \\ % 使用 \\ 换行
    ab ba
\end{gather}
% 不带编号
\begin{gather*}
    3 + 5 = 5 + 3 = 8 \\
    3 \times 5 = 5 \times 3
\end{gather*}
% 在 \\ 使用 \notag 阻止编号
\begin{gather}
    3^2 + 4^2 = 5^2 \notag \\
    5^2 + 12^2 = 13^2 \notag \\
    a^2 + b^2 = c^2
\end{gather}
% align 和 align* 环境（用 & 进行对齐）
% 带编号
\begin{align}
    x & = t + \cos t + 1 \\
    y & = 2 \sin t
\end{align}
% 不带编号
\begin{align*}
    x & = t & x & = \cos t      & x & = t      \\
    y & =2t & y & = \sin(t + 1) & y & = \sin t
\end{align*}
% split 环境，对齐同 align 环境，编号在中间
\begin{equation}
    \begin{split}
        \cos 2x & = \cos^2 x - \sin^2 x \\
                & = 2 \cos^2 x - 1
    \end{split}
\end{equation}
% cases 环境
% 每行公式中用 & 分隔为两部分
% 通常表示值和后面的条件
\begin{equation}
    D(x) = \begin{cases}
        1, & \text{如果 } x \in \mathbb{Q}; \\
        0, & \text{如果 } x \in
        \mathbb{R}\setminus\mathbb{Q} % \mathbb{字母}输出花体，amssymb 支持
    \end{cases}
\end{equation}

\section{参考文献}
\subsection{参考文献 BibTex}
% 一次管理，一次使用
% 参考文献格式：
% \begin{thebibliography}{编号样本}
%     \bibitem[记号]{引用标志}文献条目1
%     \bibitem[记号]{引用标志}文献条目2
%     ……
% \end{thebibliography}
% 其中文献条目包括：作者，题目，出版社，年代，版本，页码等。
% 引用时可以采用：\cite{引用标志1，引用标志2，...}
% 引用一篇文章 \cite{article1}，引用一本书 \cite{book1}
\begin{thebibliography}{99}

    \bibitem{article1}
    陈立辉，苏伟，蔡川，陈晓云.
    \emph{基于LaTeX的Web教学公式提取方法研究}[J].
    计算机科学，2014(06).

    \bibitem{book1}
    William H. Press, Saul A. Teukolsky, William T. Vetterling, Brian P. Flannery.
    \emph{Numerical Recipes 3rd Edition: The Art of Scientific Computing}.
    Cambridge University Press, New York, 2007.

    \bibitem{latexGuide}
    Kopka Helmut, W. Daly Patrick.
    \emph{Guide to \LaTeX}, $4^{\text{th}}$ Edition.
    Available at \texttt{http://www.amazon.com}.

    \bibitem{latexMath}
    Graetzer George.
    \emph{Math Into \LaTeX},
    Birkhäuser Boston; 3rd edition (June 22, 2000).

\end{thebibliography}

% 一次管理，多次使用
% 导言区使用 \bibliographystyle{plain} 指定参考文献样式
\bibliography{test}
% 有待补充参考文献的使用
\end{document}
```
