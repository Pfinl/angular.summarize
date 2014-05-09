angular.summarize
=================

Similar to <a href="https://github.com/Pfinl/jQuery.summarize">jQuery.summarize</a>, but redesigned for angular, and with no dependency on jQuery.

Required attribute:

<b>ng-model</b>: the model value that will be summarized.


Optional attributes:

<b>pf-max-length</b>: max character count to display in the summarized content. The content will stop at a space, so it may be a little more or less than the length specified. <i>default is 250</i>

<b>pf-end-string</b>: the string that gets added to the end of summarized content to denote more content exists. <i>default is "..."</i>


Remember, ng-model is required!

example: &lt;div pf-summarize ng-model="item"&gt;&lt;/div&gt;
