"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[4021],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),d=s(r),f=o,h=d["".concat(c,".").concat(f)]||d[f]||p[f]||a;return r?n.createElement(h,i(i({ref:t},l),{},{components:r})):n.createElement(h,i({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},87015:function(e,t,r){r.r(t),r.d(t,{assets:function(){return l},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return u},metadata:function(){return s},toc:function(){return p}});var n=r(87462),o=r(63366),a=(r(67294),r(3905)),i=["components"],u={},c="Add a Source",s={unversionedId:"quickstart/add-a-source",id:"quickstart/add-a-source",title:"Add a Source",description:"You can either follow this tutorial from the onboarding or through the UI, where you can first navigate to the Sources tab on the left bar.",source:"@site/../docs/quickstart/add-a-source.md",sourceDirName:"quickstart",slug:"/quickstart/add-a-source",permalink:"/quickstart/add-a-source",editUrl:"https://github.com/airbytehq/airbyte/docs/../docs/quickstart/add-a-source.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Deploy Airbyte",permalink:"/quickstart/deploy-airbyte"},next:{title:"Add a Destination",permalink:"/quickstart/add-a-destination"}},l={},p=[],d={toc:p};function f(e){var t=e.components,u=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},d,u,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"add-a-source"},"Add a Source"),(0,a.kt)("p",null,"You can either follow this tutorial from the onboarding or through the UI, where you can first navigate to the ",(0,a.kt)("inlineCode",{parentName:"p"},"Sources")," tab on the left bar."),(0,a.kt)("p",null,"Our demo source will pull data from an external API, which will pull down the information on one specified Pok\xe9mon."),(0,a.kt)("p",null,"To set it up, just follow the instructions on the screenshot below."),(0,a.kt)("p",null,'{% hint style="info" %}\nYou might have to wait ~30 seconds before the fields show up because it is the first time you\'re using Airbyte.\n{% endhint %}'),(0,a.kt)("p",null,(0,a.kt)("img",{src:r(93245).Z,width:"1688",height:"856"})),(0,a.kt)("p",null,"Can't find the connectors that you want? Try your hand at easily building one yourself using our ",(0,a.kt)("a",{parentName:"p",href:"../connector-development/cdk-python/"},"Python CDK for HTTP API sources!")))}f.isMDXComponent=!0},93245:function(e,t,r){t.Z=r.p+"assets/images/getting-started-source-39b30f0a8adef664dcf4056731f599d4.png"}}]);