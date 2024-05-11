import{_ as n,o as s,c as a,e as t}from"./app-9506ba88.js";const p="/study-notes/assets/linked-list-890353c2.png",o={},e=t(`<h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2><h3 id="js-语法" tabindex="-1"><a class="header-anchor" href="#js-语法" aria-hidden="true">#</a> JS 语法</h3><h4 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h4><p>创建一个长度确定、同时每一个元素的值也都确定的数组</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>增加/删除元素的三种方法</p><ul><li>push / pop</li><li>unshift / shift</li><li>splice</li></ul><div class="custom-container warning"><p class="custom-container-title">注意</p><ol><li>从性能上看，for 循环遍历起来是最快的</li><li>当你给 fill 传递一个入参时，如果这个入参的类型是引用类型，那么 fill 在填充坑位时填充的其实就是入参的引用</li><li>在算法题目中，见到“矩阵”时，要立刻反射出它说的是二维数组</li></ol></div><h3 id="常见数据结构" tabindex="-1"><a class="header-anchor" href="#常见数据结构" aria-hidden="true">#</a> 常见数据结构</h3><ul><li>数组 <ul><li>访问效率较高，而插入/删除效率较低</li></ul></li><li>栈 <ul><li>只用 pop 和 push 完成增删的“数组”</li></ul></li><li>队列 <ul><li>只用 push 和 shift 完成增删的“数组”</li></ul></li><li>链表 <ul><li><img src="`+p+`" alt="handler"></li><li>插入/删除效率较高，而访问效率较低</li></ul></li><li>树（二叉树）</li></ul><h3 id="二叉树的递归遍历" tabindex="-1"><a class="header-anchor" href="#二叉树的递归遍历" aria-hidden="true">#</a> 二叉树的递归遍历</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">preorder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;当前遍历的节点是：&quot;</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">preorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">preorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">inorder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token function">inorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;当前遍历的节点是：&quot;</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">inorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">postorder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token function">postorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">postorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;当前遍历的节点是：&quot;</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="评价算法能力" tabindex="-1"><a class="header-anchor" href="#评价算法能力" aria-hidden="true">#</a> 评价算法能力</h3><p>时间复杂度（常见的如下）：反映算法对应的执行总次数的一个变化趋势</p><ul><li>常数时间 <code>O(1)</code></li><li>对数时间 <code>O(logn)</code></li><li>线性时间 <code>O(n)</code></li><li>线性对数时间 <code>O(nlogn)</code></li><li>二次时间 <code>O(n^2)</code></li><li>三次时间 <code>O(n^3)</code></li><li>指数时间 <code>O(2^n)</code></li></ul><p>空间复杂度（常见的如下）：对一个算法在运行过程中临时占用存储空间大小的量度，反映内存增长的趋势</p><ul><li>O(1)</li><li>O(n)</li><li>O(n^2)</li></ul>`,17),c=[e];function l(i,u){return s(),a("div",null,c)}const d=n(o,[["render",l],["__file","01.html.vue"]]);export{d as default};
