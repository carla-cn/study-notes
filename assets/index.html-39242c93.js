import{_ as s,o as a,c as t,e as o}from"./app-27e24db2.js";const p={};function e(l,n){return a(),t("div",null,n[0]||(n[0]=[o(`<h2 id="基础教程" tabindex="-1"><a class="header-anchor" href="#基础教程" aria-hidden="true">#</a> 基础教程</h2><h3 id="overleaf" tabindex="-1"><a class="header-anchor" href="#overleaf" aria-hidden="true">#</a> overleaf</h3><p>提供了一个 30 分钟教程可大致了解语法</p><h3 id="本地环境搭建" tabindex="-1"><a class="header-anchor" href="#本地环境搭建" aria-hidden="true">#</a> 本地环境搭建</h3><p>下载 TeX Live</p><p>VS Code 加入插件 LaTeX Workshop，配置如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 设置是否自动编译</span>
  <span class="token property">&quot;latex-workshop.latex.autoBuild.run&quot;</span><span class="token operator">:</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">//右键菜单</span>
  <span class="token property">&quot;latex-workshop.showContextMenu&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">//从使用的包中自动补全命令和环境</span>
  <span class="token property">&quot;latex-workshop.intellisense.package.enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">//编译出错时设置是否弹出气泡设置</span>
  <span class="token comment">// &quot;latex-workshop.message.error.show&quot;: false,</span>
  <span class="token comment">// &quot;latex-workshop.message.warning.show&quot;: false,</span>
  <span class="token comment">// 编译工具和命令</span>
  <span class="token property">&quot;latex-workshop.latex.tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;-synctex=1&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-interaction=nonstopmode&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-file-line-error&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;%DOCFILE%&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;-synctex=1&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-interaction=nonstopmode&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-file-line-error&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;%DOCFILE%&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latexmk&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latexmk&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;-synctex=1&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-interaction=nonstopmode&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-file-line-error&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-pdf&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;-outdir=%OUTDIR%&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;%DOCFILE%&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;%DOCFILE%&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 用于配置编译链</span>
  <span class="token property">&quot;latex-workshop.latex.recipes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;XeLaTeX&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PDFLaTeX&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;BibTeX&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;LaTeXmk&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;latexmk&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex -&gt; bibtex -&gt; xelatex*2&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex -&gt; bibtex -&gt; pdflatex*2&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">//文件清理。此属性必须是字符串数组</span>
  <span class="token property">&quot;latex-workshop.latex.clean.fileTypes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;*.aux&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.bbl&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.blg&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.idx&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.ind&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.lof&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.lot&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.out&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.toc&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.acn&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.acr&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.alg&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.glg&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.glo&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.gls&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.ist&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.fls&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.log&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;*.fdb_latexmk&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">//设置为onFaild 在构建失败后清除辅助文件</span>
  <span class="token property">&quot;latex-workshop.latex.autoClean.run&quot;</span><span class="token operator">:</span> <span class="token string">&quot;onFailed&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用上次的recipe编译组合</span>
  <span class="token property">&quot;latex-workshop.latex.recipe.default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lastUsed&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 用于反向同步的内部查看器的键绑定。ctrl/cmd +点击(默认)或双击</span>
  <span class="token property">&quot;latex-workshop.view.pdf.internal.synctex.keybinding&quot;</span><span class="token operator">:</span> <span class="token string">&quot;double-click&quot;</span><span class="token punctuation">,</span>

  <span class="token property">&quot;[latex]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;James-Yu.latex-workshop&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;latex-workshop.formatting.latex&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latexindent&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>VS Code 加入插件，LTeX+ – grammar/spell checking using LanguageTool，用来检查语法错误（未加配置，目前不太好用，禁用了）</p>`,8)]))}const u=s(p,[["render",e],["__file","index.html.vue"]]);export{u as default};
