#!/usr/bin/env node
/*! ****************************************************************************
             COPYRIGHT 2014-2021 Ling Zhang, ALL RIGHTS RESERVED
***************************************************************************** */
"use strict"
;const t=require("path"),e=require("typescript"),s=require("chalk"),i=require("fs"),n=require("zlib"),r=require("semver"),o=require("os"),c=require("rollup"),a=require("magic-string"),u=require("rollup-plugin-terser"),l=require("prettier"),h=require("sharp")
;function p(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}const d=p(s),f=p(a),g=p(h);
/*! Copyright 2016-2021 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */
class MemberKinds{}function m(t,e,s,i){return"function"!=typeof t.beforeDecorate||t.beforeDecorate(e,s,i)}
MemberKinds.None=0,MemberKinds.Static=1,MemberKinds.Class=2,MemberKinds.Property=4,MemberKinds.Parameter=8,
MemberKinds.StaticClass=3,MemberKinds.StaticProperty=5,MemberKinds.ClassParameter=10,
MemberKinds.StaticClassParameter=11,MemberKinds.PropertyParameter=12,MemberKinds.StaticPropertyParameter=13,
MemberKinds.Any=65535;class Annotation{constructor(){this.v=0}}class Property extends Annotation{constructor(t,e){
super(),this.target=t,e&&(this.descriptor=e)}}function y(t,e,s){const i=t.properties||(t.properties=new Map)
;let n=i.get(e);return n?s&&!n.descriptor&&(n.descriptor=s):(n=new Property(t.target,s),i.set(e,n),t.prototype[e]=n),n}
class Parameter extends Annotation{}function v(t,e){const s=t.parameters||(t.parameters=new Map);let i=s.get(e)
;return i||s.set(e,i=new Parameter),i}function S(t,e){(t.a||(t.a=[])).push(e)}function w(t){t.v++}function b(t,e,s){
return Reflect.defineProperty(t,e,{value:s}),s}function P(t,e,s){(t.m||(t.m=new Map)).set(e,s)}
class Type extends Property{constructor(t,e){super(t),this.target=t,this.prototype=e}}
function x({target:t,prototype:e}){const s="constructor",i=Reflect.getOwnPropertyDescriptor(e,s);let n
;return i?n=i.value:e[s]=n=new Property(t),n}class Knowledge$1 extends WeakMap{get id(){return"agentframework"}
get version(){return"2.0.1"}get timestamp(){return"2021-11-02T00:00:00.001Z"}constructor(t,e){super()
;const s=t,i=s[e]&&s[e].bind(s),n=this;let r;r=i?function(t,e){return function(s,r,o){let c
;return c=r?y(n.add(s),r,o):x(n.add(s.prototype)),P(c,t,e),i(t,e)(s,r,o)}}:function(t,e){return function(s,i,r){let o
;o=i?y(n.add(s),i,r):x(n.add(s.prototype)),P(o,t,e)}},r.now=Date.now(),b(s,e,r),n.set(n,new Map)}add(t){
const e=super.get(t);if(e)return e;if(t===Function.prototype){const e=new Type(t,Object.create(null))
;return this.set(t,e),e}const s=Reflect.getPrototypeOf(t),i=new Type(t,Object.create(s&&this.add(s).prototype))
;return this.set(t,i),i}}let D=class Knowledge{static has(t){}static get(t){}static set(t,e){}static add(t){}};var I
;function j(t,e,s,i){const n=D.add(e),r=y(n,s,i);S(r,t),w(r),w(n)}function O(t,e,s,i){const n=D.add(e),r=y(n,s),o=v(r,i)
;S(o,t),w(o),w(r),w(n)}function k(t,e){const s=x(D.add(e));S(s,t),w(s)}function M(t,e,s){const i=x(D.add(e)),n=v(i,s)
;S(n,t),w(n),w(i)}function T(t){return D.get(t)}function E(t){const e=D.get(t);if(!e)return
;const s=Reflect.getOwnPropertyDescriptor(e.prototype,"constructor");return s?s.value:void 0}function F(t,e,s,i){
null===i&&(i=Reflect.getOwnPropertyDescriptor(e,s));let n=i;for(let r=t.length-1;r>=0;r--)n=t[r](e,s,n||i)
;n&&Reflect.defineProperty(e,s,n)}function B(t,e){for(let s=t.length-1;s>=0;s--)e=t[s](e)||e;return e}function C(t,e){
return function(s,i,n){let r;r=i?y(D.add(s),i,n):x(D.add(s.prototype)),P(r,t,e)}}D=B([(I=Reflect,function(){let t
;return t=Symbol.for("metadata"),I[t]||b(I,t,I.construct(Knowledge$1,[I,"metadata"]))})],D)
;class AgentFrameworkError extends Error{}function R(t){return(e,s,i)=>{
m(t,e,s,i)&&("number"==typeof i?null!=s?O(t,e,s,i):M(t,e.prototype,i):j(t,e,s,i))}}function $(t,e,s){
return Reflect.defineProperty(t,e,s),t}function A(t,e,s){return void 0!==s&&$(t,e,{value:s}),s}function N(t,e,s,i){
const n=D.get(D),r=t+"."+String(s);let o=n.get(r);return void 0===o&&(o=i(),n.set(r,o)),$(e,s,{value:o}),o}
class CustomInterceptors{static get v1(){return N("CustomInterceptors",this,"v1",(()=>new WeakMap))}}function _(t){
return!!Reflect.has(t,"interceptor")||CustomInterceptors.v1.has(t.constructor)}function q(t,e,s){
let i=Reflect.get(t,"version"),n=s();return $(t,e,{get(){const e=Reflect.get(t,"version");return i!==e&&(n=s(),i=e),n}
}),n}class OnDemandMemberInfo{constructor(t){this.target=t}get name(){return A(this,"name",this.getName())}
getDeclaringType(){return"object"==typeof this.target?this.target.constructor:this.target}get declaringType(){
return A(this,"declaringType",this.getDeclaringType())}get kind(){return A(this,"kind",this.getKind())}get annotation(){
return A(this,"annotation",this.getAnnotation())}get version(){const t=this.annotation;return t?t.v:0}get type(){
return A(this,"type",this.getType())}get ownAttributes(){const t=this.annotation
;if(t)return q(this,"ownAttributes",(()=>t.a))}get ownInterceptors(){const t=this.annotation
;if(t)return q(this,"ownInterceptors",(()=>{const e=t.a;if(e){const t=e.filter(_);if(t.length)return t}}))}
hasOwnAttribute(t){const e=this.ownAttributes;return!!e&&(t?e.some((e=>e instanceof t)):e.length>0)}getOwnAttribute(t){
const e=this.ownAttributes;if(e)for(const s of e)if(s instanceof t)return s}getOwnAttributes(t){
const e=this.ownAttributes;return e?t?e.filter((e=>e instanceof t)):e.slice(0):[]}findOwnAttributes(t,e){
const s=this.ownAttributes;return s?s.filter((s=>t(s,e))):[]}hasOwnInterceptor(){return void 0!==this.ownInterceptors}}
class OnDemandParameterInfo extends OnDemandMemberInfo{constructor(t,e,s,i){super(t),this.key=e,this.index=s,
this.parent=i}addAttribute(t){"constructor"===this.key?M(t,this.target,this.index):O(t,this.target,this.key,this.index)}
getAnnotation(){const t=this.parent.annotation;return t&&t.parameters&&t.parameters.get(this.index)}getName(){
return this.index.toString()}getKind(){let t=MemberKinds.Parameter
;return this.target===this.declaringType&&(t|=MemberKinds.Static),"constructor"===this.key&&(t|=MemberKinds.Class),t}
getType(){const t=this.parent.parameterTypes;if(Array.isArray(t))return t[this.index]}}
class OnDemandPropertyInfo extends OnDemandMemberInfo{constructor(t,e,s){super(t),this.key=e,this.parent=s,
this.parameters=new Map}getAnnotation(){if("constructor"===this.key)return E(this.target);const t=T(this.target)
;return t&&t.properties&&t.properties.get(this.key)}getName(){return this.key.toString()}get descriptor(){
const t=this.annotation;return t&&t.descriptor}getKind(){
return this.target===this.declaringType?MemberKinds.StaticProperty:MemberKinds.Property}getType(){
return this.hasOwnMetadata("design:returntype")?this.getOwnMetadata("design:returntype"):this.getOwnMetadata("design:type")
}hasInterceptor(){const t=this.annotation;if(!t)return!1;if(this.ownInterceptors)return!0;const e=t.parameters
;if(e)for(const t of e.keys())if(this.parameter(t).ownInterceptors)return!0;return!1}get intercepted(){
return q(this,"intercepted",(()=>this.hasInterceptor()))}parameter(t){let e=this.parameters.get(t)
;return e||(e=new OnDemandParameterInfo(this.target,this.key,t,this),this.parameters.set(t,e)),e}hasParameter(){
const t=this.annotation;return!(!t||!t.parameters)}getParameter(t){const e=this.annotation
;if(e&&e.parameters&&e.parameters.has(t))return this.parameter(t)}getParameterTypes(){
return this.getOwnMetadata("design:paramtypes")}get parameterTypes(){
return A(this,"parameterTypes",this.getParameterTypes())}getParameters(){
const t=new Array,e=this.annotation,s=e&&e.parameters;if(s)for(const e of s.keys())t.unshift(this.parameter(e));return t
}addAttribute(t){"constructor"===this.key?k(t,this.target):j(t,this.target,this.key)}hasOwnMetadata(t){
const e=this.annotation;return!(!e||!e.m)&&e.m.has(t)}getOwnMetadata(t){const e=this.annotation
;return e&&e.m?e.m.get(t):Reflect.getOwnMetadata?Reflect.getOwnMetadata(t,this.declaringType.prototype,this.key):void 0}
}class Agents{static get v1(){return N("Agents",this,"v1",(()=>new WeakMap))}}function U(t){return Agents.v1.has(t)}
class TypeInfos{static get v1(){return N("TypeInfos",this,"v1",(()=>new WeakMap))}}
class OnDemandTypeInfo extends OnDemandPropertyInfo{constructor(t){super(t,"constructor"),this.properties=new Map}
static find(t){const e=TypeInfos.v1.get(t);if(e)return e;const s=new OnDemandTypeInfo(t);return TypeInfos.v1.set(t,s),s}
get static(){return OnDemandTypeInfo.find(this.declaringType)}get prototype(){
return A(this,"prototype",OnDemandTypeInfo.find(this.declaringType.prototype))}getType(){return this.declaringType}
getName(){return this.declaringType.name}getKind(){
return this.target===this.declaringType?MemberKinds.StaticClass:MemberKinds.Class}getBase(){
const t=Reflect.getPrototypeOf(this.target);let e
;return e=t?t===Function.prototype||t===Object.prototype||U(t)?null:OnDemandTypeInfo.find(t):null,e}getTypes(){
const t=[];let e=this;do{t.unshift(e),e=e.base}while(e);return t}getAnnotation(){return E(this.target)}
getTypeAnnotation(){return T(this.target)}get annotation(){return A(this,"annotation",this.getAnnotation())}
get typeAnnotation(){return A(this,"typeAnnotation",this.getTypeAnnotation())}get version(){const t=this.typeAnnotation
;return t?t.v:0}get descriptor(){return Reflect.getOwnPropertyDescriptor(this.declaringType.prototype,this.key)}
get base(){return A(this,"base",this.getBase())}get types(){return A(this,"types",this.getTypes())}property(t){
let e=this.properties.get(t);return e||(e=new OnDemandPropertyInfo(this.target,t,this),this.properties.set(t,e)),e}
hasOwnProperties(){const t=this.typeAnnotation;return void 0!==t&&void 0!==t.properties}getOwnProperty(t){
const e=this.typeAnnotation;if(e&&e.properties&&e.properties.has(t))return this.property(t)}getProperty(t){
const e=function(t,e){const s=D.add(t),i=Reflect.get(s.prototype,e);if(i)return i}(this.target,t)
;if(e)return e.target===this.target?this.getOwnProperty(t):OnDemandTypeInfo.find(e.target).getOwnProperty(t)}
getOwnProperties(){const t=new Array,e=this.typeAnnotation
;if(e&&e.properties)for(const s of e.properties.keys())t.push(this.property(s));return t}findOwnProperties(t,e){
const s=new Array,i=this.typeAnnotation;if(i&&i.properties)for(const n of i.properties.keys()){const i=this.property(n)
;t(i,e)&&s.push(i)}return s}findProperties(t,e){const s=new Map;for(const i of this.types){
const n=i.findOwnProperties(t,e);n.length&&s.set(i,n)}return s}findTypes(t,e){if(!t)return this.types.slice(0)
;const s=new Array;for(const i of this.types)t(i,e)&&s.push(i);return s}addAttribute(t){k(t,this.target)}}class Types{
static get v1(){return N("Types",this,"v1",(()=>new WeakMap))}}function K(t,e){Types.v1.set(t,e),
Types.v1.set(t.prototype,e.prototype)}class ClassTypeInvocation{constructor(t,e){this.target=t,this.design=e}
invoke(t,e){return Reflect.construct(this.target,t,e)}}class OnDemandInterceptorInvocation{constructor(t,e){this.next=t,
this.attribute=e}get design(){return this.next.design}invoke(t,e){
const s=this.interceptor||(this.interceptor=function(t){const e=CustomInterceptors.v1.get(t.constructor)
;if(e)return Reflect.construct(e[0],[t,e[1]]);const s=Reflect.get(t,"interceptor")
;return s&&"object"==typeof s&&"function"==typeof s.intercept?s:void 0}(this.attribute))
;if(s)return s.intercept(this.next,t,e)
;const i=this.next.invoke(t,e),n=Reflect.getOwnPropertyDescriptor(this.next,"invoke");return $(this,"invoke",{
value:n?n.value:this.next.invoke.bind(this.next)}),i}}class OnDemandInterceptorFactory{static addInterceptors(t,e){
if(e)for(const s of e)t=new OnDemandInterceptorInvocation(t,s);return t}static addInterceptor(t,e){
return new OnDemandInterceptorInvocation(t,e)}}class MethodParameterInvocation{constructor(t){this.design=t}invoke(t,e){
return t[this.design.index]}}class OnDemandParameterInterceptor{constructor(t){this.design=t}get interceptor(){
if(this.invocations)return this}get invocations(){const t=new Map;for(const e of this.design.getParameters()){
const s=e.index,i=e.ownInterceptors;if(i){const n=new MethodParameterInvocation(e)
;t.set(s,OnDemandInterceptorFactory.addInterceptors(n,i))}}return A(this,"invocations",t.size?t:void 0)}
intercept(t,e,s){const i=Array.prototype.slice.call(e,0);for(const[t,n]of this.invocations.entries())i[t]=n.invoke(e,s)
;return t.invoke(i,s)}}class GetterSetterInvocation{constructor(t,e){this.design=t,this.cache=e}invoke(t,e){
const s=this.design.key;if(null==e)throw new AgentFrameworkError("InvalidReceiver")
;if(t.length)return this.cache.set(e,t[0]),t[0];{if(this.cache.has(e))return this.cache.get(e)
;const t=this.design.declaringType.prototype;return Reflect.has(t,s)?Reflect.get(t,s):void 0}}}class MethodInvocation{
constructor(t,e){this.target=t,this.design=e}invoke(t,e){return Reflect.apply(this.target,e,t)}}
class AgentTypeInvocation{constructor(t,e){this.target=t,this.design=e}invoke([t],e){
const s=$(class extends e{},"name",{value:`${t}$`});return K(s,this.target),s}}class OnDemandInvocationFactory{
static createAgentInvocation(t,e,s){let i=new AgentTypeInvocation(t,e);i=OnDemandInterceptorFactory.addInterceptor(i,s)
;const n=e.property("constructor")
;return n.version&&(i=OnDemandInterceptorFactory.addInterceptors(i,n.ownInterceptors)),i}
static createConstructorInvocation(t,e,s){let i=new ClassTypeInvocation(t,e)
;return s.hasParameter()&&(i=OnDemandInterceptorFactory.addInterceptor(i,new OnDemandParameterInterceptor(s))),
i=OnDemandInterceptorFactory.addInterceptors(i,s.ownInterceptors),{invocation:i,version:s.version}}
static createFieldInvocation(t,e){let s=new GetterSetterInvocation(t,e)
;return OnDemandInterceptorFactory.addInterceptors(s,t.ownInterceptors)}static createPropertyInvocation(t,e){
let s=new MethodInvocation(t,e)
;return e.hasParameter()&&(s=OnDemandInterceptorFactory.addInterceptor(s,new OnDemandParameterInterceptor(e))),
OnDemandInterceptorFactory.addInterceptors(s,e.ownInterceptors)}}class OnDemandAgentCompiler{static makeField(t,e){
const s=new WeakMap,i={configurable:!0,get:function(){const n=OnDemandInvocationFactory.createFieldInvocation(t,s)
;return i.get=function(){return n.invoke([],this)},i.set=function(){return n.invoke(arguments,this)},
$(e,n.design.key,i),n.invoke([],this)},set:function(){const n=OnDemandInvocationFactory.createFieldInvocation(t,s)
;return i.get=function(){return n.invoke([],this)},i.set=function(){return n.invoke(arguments,this)},
$(e,n.design.key,i),n.invoke(arguments,this)}};return i}static makeProperty(t,e,s){const i=t.key;let n=Object.create(e)
;n.configurable=!0;const r=e.value,o=e.get,c=e.set;return"function"==typeof o?"function"==typeof c?(n.get=function(){
const e=OnDemandInvocationFactory.createPropertyInvocation(o,t);n.get=function(){return e.invoke([],this)}
;const r=OnDemandInvocationFactory.createPropertyInvocation(c,t);return n.set=function(){r.invoke(arguments,this)},
$(s,i,n),e.invoke([],this)},n.set=function(){const e=OnDemandInvocationFactory.createPropertyInvocation(o,t)
;n.get=function(){return e.invoke([],this)};const r=OnDemandInvocationFactory.createPropertyInvocation(c,t)
;return n.set=function(){r.invoke(arguments,this)},$(s,i,n),r.invoke(arguments,this)}):n.get=function(){
const e=OnDemandInvocationFactory.createPropertyInvocation(o,t);return n.get=function(){return e.invoke([],this)},
$(s,i,n),e.invoke([],this)}:"function"==typeof c?n.set=function(){
const e=OnDemandInvocationFactory.createPropertyInvocation(c,t);return n.set=function(){return e.invoke(arguments,this)
},$(s,i,n),e.invoke(arguments,this)}:"function"==typeof r?n.value=function(){
let e=OnDemandInvocationFactory.createPropertyInvocation(r,t);return n.value=function(){return e.invoke(arguments,this)
},$(s,i,n),e.invoke(arguments,this)}:n=this.makeField(t,s),n}}class ClassConstructors{static get v1(){
return N("ClassConstructors",this,"v1",(()=>new WeakMap))}}class ClassMembers{static get v1(){
return N("ClassMembers",this,"v1",(()=>new WeakMap))}}class AgentAttribute{get interceptor(){return this}
intercept(t,e,s){const[,i,n]=e;if(n.version){const r=n.target=Reflect.construct(i,[s,n]);return K(r,s),
n.receiver=t.invoke(e,r)}return n.receiver=t.invoke(e,s)}construct(t,e,s){const i=this.target,n=this.type,r=n.version
;if(r){const e=ClassMembers.v1.get(i);if(!e||e.version!==r){
const o=e&&e.members||new Map,c=o.size?n.findOwnProperties((t=>t.intercepted&&o.get(t.key)!==t.version)):n.findOwnProperties((t=>t.intercepted))
;if(c.length){const e=function(t,e){const s=t.prototype;let i=e.prototype;const n=[]
;for(;i;)if(n.unshift(i.constructor),i=Reflect.getPrototypeOf(i),i===s)return n;return[]}(this.receiver,s)
;!function(t,e,s,i,n){for(const r of i){if(t.set(r.key,r.version),n&&Reflect.getOwnPropertyDescriptor(s,r.key)){
Reflect.deleteProperty(n,r.key);continue}const i=Reflect.getOwnPropertyDescriptor(e,r.key);let o
;o=i?OnDemandAgentCompiler.makeProperty(r,i,n||s):OnDemandAgentCompiler.makeField(r,n||s),
Reflect.defineProperty(s,r.key,o)}}(o,t.prototype,this.receiver.prototype,c,e[0]&&e[0].prototype)}
ClassMembers.v1.set(i,{version:r,members:o})}}const o=this.property,c=o.version;if(c){
let n,r=ClassConstructors.v1.get(i)
;r&&r.version===c||(r=OnDemandInvocationFactory.createConstructorInvocation(t,this.type,o),
ClassConstructors.v1.set(i,r)),n=r.invocation;const a=n.invoke(e,s)
;if(null===a||"object"!=typeof a)throw new AgentFrameworkError("ConstructorReturnNonObject");return a}
return Reflect.construct(t,e,s)}}function Y(t,e,s){const i=Object.create(e||Reflect.construct(AgentAttribute,[t]))
;if(!m(i,t))throw new AgentFrameworkError("NoCreateAgentPermission");const n=function(t){return Types.v1.get(t)
}(t)||t,r=OnDemandTypeInfo.find(n),o=i.type=r.prototype,c=i.property=o.property("constructor")
;i.version=o.version+c.version+(s||0)
;const a=OnDemandInvocationFactory.createAgentInvocation(n,r,i).invoke([n.name,Proxy,i],n);return function(t,e){
Agents.v1.set(e,t),Agents.v1.set(e.prototype,t.prototype)}(n,a),a}function L(){return Y}class Singletons{
static get v1(){return N("Singletons",this,"v1",(()=>new WeakMap))}}class SingletonAttribute{constructor(t){this.type=t}
get interceptor(){return this}intercept(t,e,s){const i=this.type,n=t.design&&t.design.type,r=i||n
;if(!r)throw new AgentFrameworkError("UnknownSingletonType")
;const o=i&&Singletons.v1.get(i.prototype)||n&&Singletons.v1.get(n.prototype);if(void 0===o){let i;i=U(r)?r:Y(r)
;const n=Reflect.construct(i,e);return Singletons.v1.set(r.prototype,n),t.invoke([n],s)}return t.invoke([o],s)}}
function J(t){return R(new SingletonAttribute(t))}
const G="tslib",W=["assert","async_hooks","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","http2","https","inspector","module","net","os","path","perf_hooks","process","punycode","querystring","readline","repl","stream","string_decoder","timers","tls","trace_events","tty","url","util","v8","vm","zlib"]
;function z(...t){return d.default.red(t.join(" "))}function H(...t){return d.default.yellow(t.join(" "))}
function V(...t){return d.default.green(t.join(" "))}function Z(...t){return d.default.white(t.join(" "))}
function Q(t,e){
return`(${t} → ${e}) ${s=Math.floor(e/t*100),s>150?z(String(s)+"%"):s>100?H(String(s)+"%"):s>80?Z(String(s)+"%"):s>0?V(String(s)+"%"):""}`
;var s}function X(s){const i=e.findConfigFile(s,e.sys.fileExists,"package.json");if(i)return t.dirname(i)}
class Environment{constructor(){this.workingDir=e.sys.getCurrentDirectory();const t=X(this.workingDir)
;if(!t)return console.log(z("Please run this command inside node.js project directory")),void process.exit(1)
;this.homeDir=t;const s=X(function(t=2){const{stackTraceLimit:e}=Error;Error.stackTraceLimit=t;const s={}
;if(Error.captureStackTrace(s),
Error.stackTraceLimit=e,"string"!=typeof s.stack)throw new Error("Unexpected stacktrace format:"+typeof s.stack)
;const i=s.stack.split("\n"),n=i[i.length-1],r=n.indexOf("("),o=n.lastIndexOf(")");let c
;c=r>0&&o>0?n.slice(r+1,o):n.slice(n.indexOf("at")+3);const a=c.lastIndexOf(":"),u=c.lastIndexOf(":",a-1)
;return c.slice(0,u)}());if(!s)return console.log(z("Please reinstall tsb")),void process.exit(2);this.baseDir=s}}
class TypeScript{constructor(){const s=function(s){
const i=e.findConfigFile(s,e.sys.fileExists,t.join("node_modules","typescript","package.json"));if(!i)return
;const n=require(i);return n.path=i,n}(this.env.baseDir);if(!s)throw new Error("Unable to locate typescript module")
;this.info=s,this.runtime=function(s){
if(!s.main)throw new Error("Package main not find: "+t.join(s.path,"package.json"))
;const i=t.resolve(t.dirname(s.path),s.main);if(!e.sys.fileExists(i))throw new Error("File not find: "+i)
;return require(i)}(s);const i=this.runtime.sys;this.formatDiagnosticsHost={getCanonicalFileName:t=>t,
getCurrentDirectory:i.getCurrentDirectory,getNewLine:()=>i.newLine}}get ScriptTarget(){return this.runtime.ScriptTarget}
get ModuleKind(){return this.runtime.ModuleKind}get version(){return this.info.version}readFile(t){
return this.runtime.readConfigFile(t,this.runtime.sys.readFile)}resolve(e,s){return t.resolve(e,s)}formatDiagnostics(t){
return this.runtime.formatDiagnosticsWithColorAndContext(t,this.formatDiagnosticsHost)}}
F([J(),C("design:type",Environment)],TypeScript.prototype,"env",void 0);class CliService{get name(){return"tsb"}
get version(){return"1.0.2"}get timestamp(){return"2022-03-31T04:21:51.102Z"}}function tt(e){const s=[];let i=e
;for(;i;){s.push(i);const e=t.dirname(i);if(e===i)break;i=e}return s.reverse()}class TypeScriptFileSystem{constructor(){
this.runtime=this.ts.runtime,this.sys=this.runtime.sys}get args(){return this.sys.args}get newLine(){
return this.sys.newLine}get useCaseSensitiveFileNames(){return this.sys.useCaseSensitiveFileNames}mkdir(t){const e=tt(t)
;for(const t of e)this.directoryExists(t)||this.createDirectory(t)}copy(e,s){this.mkdir(t.dirname(s)),
i.copyFileSync(e,s)}exists(t,...e){if(e.length){const s=this.resolvePath(t,...e)
;return this.sys.fileExists(s)||this.sys.directoryExists(s)}return this.sys.fileExists(t)||this.sys.directoryExists(t)}
rename(t,e){i.renameSync(t,e)}chmod(t,e){i.chmodSync(t,e)}prependLine(t,e){let s=this.sys.readFile(t)
;this.sys.writeFile(t,e+this.sys.newLine+s)}appendLine(t,e){let s=this.sys.readFile(t)
;this.sys.writeFile(t,s+this.sys.newLine+e)}name(e){return e.slice(0,-t.extname(e).length)}canCompress(t){
return!t.endsWith(".gz")&&!t.endsWith(".br")&&!t.endsWith(".webp")}compressGzip(t){
const e=t+".gz",s=n.createGzip(),r=i.createReadStream(t),o=i.createWriteStream(e);return r.pipe(s).pipe(o),
Promise.resolve()}compressBrotli(t){
const e=t+".br",s=n.createBrotliCompress(),r=i.createReadStream(t),o=i.createWriteStream(e);return r.pipe(s).pipe(o),
Promise.resolve()}createDirectory(t){this.sys.createDirectory(t)}directoryExists(t,...e){
return e.length?this.sys.directoryExists(this.resolvePath(t,...e)):this.sys.directoryExists(this.resolvePath(t))}
exit(t){this.sys.exit(t)}fileExists(t,...e){
return e.length?this.sys.fileExists(this.resolvePath(t,...e)):this.sys.fileExists(this.resolvePath(t))}
getCurrentDirectory(){return this.sys.getCurrentDirectory()}getDirectories(t){return this.sys.getDirectories(t)}
getExecutingFilePath(){return this.sys.getExecutingFilePath()}readDirectory(t,e,s,i,n){
return this.sys.readDirectory(t,e,s,i,n)}joinPath(e,s,...i){return t.join(e,s,...i)}resolvePath(e,...s){
if(!t.isAbsolute(e))throw new Error('Please use "joinPath" for relative pathname: '+e)
;return s.length?this.sys.resolvePath(t.join(e,...s)):this.sys.resolvePath(e)}resolvePathUp(e,s,...i){
if(!t.isAbsolute(e))throw new Error('Please use "joinPath" for relative pathname: '+e)
;return i.length?this.runtime.findConfigFile(e,this.exists.bind(this),t.join(s,...i)):this.runtime.findConfigFile(e,this.exists.bind(this),s)
}readFile(t,e){return this.sys.readFile(t,e)}write(t){this.sys.write(t)}writeFile(t,e,s){this.sys.writeFile(t,e,s)}}
F([J(),C("design:type",TypeScript)],TypeScriptFileSystem.prototype,"ts",void 0);let et=class Service{}
;F([J(),C("design:type",Environment)],et.prototype,"env",void 0),
F([J(),C("design:type",TypeScript)],et.prototype,"ts",void 0),
F([J(),C("design:type",TypeScriptFileSystem)],et.prototype,"fs",void 0),
F([J(),C("design:type",CliService)],et.prototype,"cli",void 0),et=B([L()],et);class PackageInfoParser{read(t){
const e=this.ts.readFile(t);if(e.error&&console.log(this.ts.formatDiagnostics([e.error])),e.config){const s=e.config
;return s.path=t,s}}write(t,e){this.fs.writeFile(t,JSON.stringify(e))}}
F([J(),C("design:type",TypeScript)],PackageInfoParser.prototype,"ts",void 0),
F([J(),C("design:type",TypeScriptFileSystem)],PackageInfoParser.prototype,"fs",void 0);class IniFileParser{read(t){
const e=this.fs.readFile(t,"utf-8");if(e)return require("ini").parse(e)}write(t,e){
this.fs.writeFile(t,require("ini").stringify(e))}}
F([J(),C("design:type",TypeScriptFileSystem)],IniFileParser.prototype,"fs",void 0);let st=class Repository extends et{
constructor(t){if(super(),!t||!this.fs.fileExists(t,"HEAD"))throw new Error("Invalid repository path");this.path=t}
getType(){return"git"}getHead(){const t=this.fs.readFile(this.fs.resolvePath(this.path,"HEAD"))
;if(t&&t.length>4)return t.slice(4).trim()}getReferenceTime(t){if(t){const e=this.fs.resolvePath(this.path,t)
;return i.statSync(e).ctime}}getCommit(t){if(t){const e=this.fs.readFile(this.fs.resolvePath(this.path,t))
;if(e&&e.length>4)return e.trim()}}getURL(){var t;const e=this.ini.read(this.fs.resolvePath(this.path,"config"))
;if(e)return null===(t=e['remote "origin"'])||void 0===t?void 0:t.url}}
;F([J(),C("design:type",IniFileParser)],st.prototype,"ini",void 0),st=B([L(),C("design:paramtypes",[String])],st)
;let it=class ModuleService extends et{getModuleByNameDirectory(e,s){let i=this.searchPackageJsonByDirectory(e,s);if(i){
const e=this.parser.read(i);if(e)return{info:e,path:t.dirname(i)}}}searchPackageJsonByDirectory(t,e){
return this.ts.runtime.findConfigFile(e,this.ts.runtime.sys.fileExists,this.fs.joinPath("node_modules",t,"package.json"))
}};F([J(),C("design:type",PackageInfoParser)],it.prototype,"parser",void 0),it=B([L()],it)
;class CachedModuleService extends it{constructor(){super(...arguments),this.cache=new Map}resolveModule(t,e){
if(this.cache.has(t))return this.cache.get(t);const s=this.getModuleByNameDirectory(t,e);if(s){const e={id:s.info.name,
version:s.info.version,path:s.path,sideEffect:s.info.sideEffects,type:s.info.type};if(s.info.main){
const t=this.fs.resolvePath(s.path,s.info.main);this.fs.fileExists(t)&&(e.main=t)}if(s.info.module){
const t=this.fs.resolvePath(s.path,s.info.module);this.fs.fileExists(t)&&(e.module=t)}
const i=s.info.typings||s.info.types;if(i){const t=this.fs.resolvePath(s.path,i);this.fs.fileExists(t)&&(e.types=t)}
return this.cache.set(t,e),this.cache.set(e.id,e),e}}resolveSideEffectsFreeModule(t,e){const s=this.resolveModule(t,e)
;if(s&&!1===s.sideEffect)return s}}let nt=class Project extends et{constructor(t,e){if(super(),
!t)throw new Error("Invalid project path");if(this.path=t,!e)throw new Error("Invalid project info");this.packageInfo=e
;const s=this.dependentModules=new Set;if(e.dependencies)for(const t of Object.keys(e.dependencies))s.add(t)
;const i=this.devDependentModules=new Set;if(e.devDependencies)for(const t of Object.keys(e.devDependencies))i.add(t)
;const n=this.getExternalPackageNames();this.importModuleNames=[...W,...n],this.inlineModuleNames=new Map
;const r=this.getDevelopmentPackageNames();for(const t of r){const e=this.cachedModuleService.resolveModule(t,this.path)
;e&&!1===e.sideEffect&&("module"===e.type&&e.main?this.inlineModuleNames.set(t,e.main):e.module&&this.inlineModuleNames.set(t,e.module))
}this.importTypeModuleNames=[]}get repository(){return this.t||(this.t=this.repositoryService.findRepository(this.path))
}isDevelopmentModule(t){return this.devDependentModules.has(t)}find(t,e){
return this.fs.readDirectory(this.ts.resolve(this.path,t),e,void 0,void 0,1)}findBinFiles(e){
const{bin:s}=this.packageInfo;if(s){const t=this.path;return Object.keys(s).map((e=>{const i=s[e]
;return[this.fs.name(i),this.fs.resolvePath(t,i),e]}))}
return this.find(e,["ts"]).filter((t=>!t.endsWith(".d.ts"))).map((s=>{const i=t.basename(s).slice(0,-3)
;return[this.fs.joinPath(e,i),s,i]}))}findLibraryFiles(e){
return this.find(e,["ts"]).filter((t=>!t.endsWith(".d.ts"))).map((s=>[this.fs.joinPath(e,t.basename(s).slice(0,-3)),s]))
}findMainFile(){if(this.packageInfo.main){
const e=this.packageInfo.main.slice(0,0-t.extname(this.packageInfo.main).length),s=this.fs.resolvePath(this.path,this.packageInfo.main)
;if(this.fs.fileExists(s))return[e,this.fs.resolvePath(this.path,this.packageInfo.main)]
;throw new Error("File not exists: "+s)}console.log("no main, check index")
;const e=this.fs.resolvePath(this.path,"index.ts");if(this.fs.fileExists(e))return["index",e]
;const s=this.fs.resolvePath(this.path,"lib","index.ts")
;return this.fs.fileExists(s)?[this.fs.joinPath("lib","index"),s]:void 0}getExternalPackageNames(){const t=[]
;for(const e of this.dependentModules.keys())t.push(e);return t}getDevelopmentPackageNames(){const t=[]
;for(const e of this.devDependentModules.keys())t.push(e);return t}getHeader(){
let t=this.fs.readFile(this.fs.resolvePath(this.path,"NOTICE"));if(!t){const e=new Date
;t="/* "+this.packageInfo.name+" v"+this.packageInfo.version+" generated by tsb@"+this.cli.version+" at "+e.toISOString()+" */"
}const e=this.fs.newLine;return t.endsWith(e)||(t+=e),t}getConfigFileName(t){
const e=this.fs.resolvePath(this.path,`tsconfig.${t}.json`),s=this.fs.resolvePath(this.path,"tsconfig.json");let i
;return i=this.fs.fileExists(e)?e:this.fs.fileExists(s)?s:"",i}}
;F([J(),C("design:type",class RepositoryService extends et{findRepository(e){const s=this.fs.resolvePathUp(e,".git")
;if(s){if(this.fs.directoryExists(s))return new st(s);if(this.fs.fileExists(s)){const e=this.fs.readFile(s)
;if(e&&e.startsWith("gitdir:")){const i=e.slice(7).trim(),n=this.fs.resolvePath(t.dirname(s),i);return new st(n)}}}}
})],nt.prototype,"repositoryService",void 0),
F([J(),C("design:type",CachedModuleService)],nt.prototype,"cachedModuleService",void 0),
nt=B([L(),C("design:paramtypes",[String,Object])],nt);class ProjectService extends et{load(t){
const e=this.packageInfoParser.read(this.fs.resolvePath(t,"package.json"));if(e)return new nt(t,e)}}
F([J(),C("design:type",PackageInfoParser)],ProjectService.prototype,"packageInfoParser",void 0)
;let rt=class BuildContext extends et{constructor(e){super(),this.options=e,this.cacheDirName=".cache",
this.binaryDirName="bin",this.libraryDirName="lib",this.artifactDirName="public",this.configDirName="conf",
this.settingsFileName="settings.js",this.outputPackageJsonFileName="package.json",
this.defaultPackageFileNames=["Dockerfile","CHANGELOG.md","COPYRIGHT","LICENSE","NOTICE","README.md"],
this.defaultEntryPathNames=[".","lib"],this.defaultEntryName="index",this.defaultPrettierConfig={parser:"babel",
printWidth:80,singleQuote:!0},this.tsCompilerOptions={},e.prod||e.rc||e.insiders||e.dev?(this.beautify=!1,
this.mangle=!0,this.compress=!0,this.inline=!0,this.configuration="production"):(this.beautify=e.beautify,
this.mangle=e.mangle,
this.compress=e.compress,this.inline=e.inline,this.options.configuration?this.configuration=String.prototype.toLowerCase.apply(e.configuration):this.configuration="development")
;const{in:s,out:i,target:n,beautify:o,rc:c,dev:a,insiders:u,release:l}=this.options;o&&(this.beautify=o),
this.target=n?n.toLowerCase():"es2018",
s?t.isAbsolute(s)?this.inputDir=s:this.inputDir=t.join(this.workingDir,s):this.inputDir=this.env.homeDir,
i?t.isAbsolute(i)?this.outputDir=i:this.outputDir=t.join(this.workingDir,i):this.outputDir=t.join(this.inputDir,"release"),
this.inputPackageJsonFileName=`package.${this.configuration}.json`,this.files=[]
;const h=this.projectService.load(this.inputDir);if(!h)throw new Error("ERROR: Project not found in "+this.inputDir)
;this.project=h,this.timestamp=new Date;let p="",d="";c?(p="rc","string"==typeof c&&(d=c)):a?(p="dev",
d="string"==typeof a?a:this.date):u?(p="insiders",d="string"==typeof u?u:this.date):l&&(p=l,d=this.date),
p?(this.version=r.coerce(h.packageInfo.version)+"-"+p,
d&&(this.version=this.version+"."+d)):this.version=h.packageInfo.version,
Reflect.has(e,"metadata")&&Reflect.set(this.tsCompilerOptions,"emitDecoratorMetadata",e.metadata),
Reflect.has(e,"decorator")&&Reflect.set(this.tsCompilerOptions,"emitDecoratorMetadata",e.decorator)}get shouldInline(){
return this.inline}get shouldBeautify(){return this.beautify}get shouldMangle(){return this.mangle}get shouldCompress(){
return this.compress}get cliDir(){return this.env.baseDir}get workingDir(){return this.env.workingDir}get date(){
const t=this.timestamp
;return t.getUTCFullYear()+String(t.getUTCMonth()+1).padStart(2,"0")+String(t.getUTCDate()).padStart(2,"0")}}
;F([J(),C("design:type",ProjectService)],rt.prototype,"projectService",void 0),
rt=B([L(),C("design:paramtypes",[Object])],rt);class JsonParser{read(t){
const e=this.ts.runtime.readConfigFile(t,this.ts.runtime.sys.readFile)
;return e.error&&(console.log(this.ts.formatDiagnostics([e.error])),process.exit(1)),e.config}write(t,e,s){
s?this.fs.writeFile(t,JSON.stringify(e,null,s)):this.fs.writeFile(t,JSON.stringify(e))}}
F([J(),C("design:type",TypeScript)],JsonParser.prototype,"ts",void 0),
F([J(),C("design:type",TypeScriptFileSystem)],JsonParser.prototype,"fs",void 0);class JavaScriptParser{read(t){
const e=this.ts.runtime.readConfigFile(t,this.ts.runtime.sys.readFile)
;return e.error&&(console.log(this.ts.formatDiagnostics([e.error])),process.exit(1)),e.config}write(t,e){
throw new Error("Not Supported")}}function ot(t,e){return t=>n=>e.visitNode(n,(e=>i(0,e,t)||s(n,e,t)))
;function s(t,n,r){return e.visitEachChild(n,(e=>i(0,e,r)||s(t,e,r)),r)}function i(s,i,n){if(e.isReturnStatement(i)){
const s=i.expression;if(s&&(e.isStringLiteral(s)||e.isNoSubstitutionTemplateLiteral(s))){const e=s.getFullText().trim()
;if(e.startsWith("/* replace::release.version */")){const e=n.factory.createStringLiteral(t.version)
;return n.factory.createReturnStatement(e)}if(e.startsWith("/* replace::release.name */")){
const e=n.factory.createStringLiteral(t.project.packageInfo.name);return n.factory.createReturnStatement(e)}
if(e.startsWith("/* replace::release.timestamp */")){const e=n.factory.createStringLiteral(t.timestamp.toISOString())
;return n.factory.createReturnStatement(e)}}}}}
F([J(),C("design:type",TypeScript)],JavaScriptParser.prototype,"ts",void 0)
;const ct=new Set(["__decorate","__metadata","__param"]);function at(t,e){return t=>s=>{const i=new WeakSet,n=new Map
;return e.visitNode(s,(e=>o(0,e,t)||r(s,e,t)));function r(t,s,i){return e.visitEachChild(s,(e=>o(0,e,i)||r(t,e,i)),i)}
function o(t,s,n){if(e.isImportDeclaration(s)){const t=s.moduleSpecifier;if(e.isStringLiteral(t)&&t.text===G){
const{importClause:t}=s;if(t){const{namedBindings:i}=t;if(i&&e.isNamedImports(i)){const t=[],r=[]
;if(i.elements.forEach((s=>{e.isIdentifier(s.name)&&(ct.has(s.name.text)?r.push(s):t.push(s))})),
i.elements.length===t.length)return;const o=[],a=n.factory
;return t.length&&o.push(a.createImportDeclaration(s.decorators,s.modifiers,a.createImportClause(!1,void 0,a.createNamedImports(a.createNodeArray(t))),a.createStringLiteral(G))),
r.length&&(r.push(a.createImportSpecifier(void 0,c("__agent"))),
o.push(a.createImportDeclaration(s.decorators,s.modifiers,a.createImportClause(!1,void 0,a.createNamedImports(a.createNodeArray(r))),a.createStringLiteral("agentframework")))),
o.length>1?o:1===o.length?o[0]:void 0}}}}else if(e.isCallExpression(s)){if(2===s.arguments.length){const t=s.expression
;t&&(e.isIdentifier(t)?"__decorate"===t.text&&i.add(t):e.isPropertyAccessExpression(t)&&"__decorate"===t.name.text&&i.add(t))
}}else if(i.has(s))return c("__agent")}function c(e){let s=n.get(e);return s||(s=t.factory.createIdentifier(e),
n.set(e,s)),s}}}class TypeScriptCompiler extends et{constructor(){super(...arguments),this.artifacts=new Map,
this.codes=new Map,this.types=new Map,this.maps=new Map}async build(t){
const{inputDir:e,outputDir:s,configuration:i,target:n}=t,r=t.fs.resolvePath(s,t.cacheDirName),o=t.project.getConfigFileName(i)
;if(!o)throw new Error("tsconfig.json not found");this.runtime=t.ts.runtime
;const{ScriptTarget:c,ModuleKind:a}=t.ts.runtime;let u,l;switch(n){case"es2015":u=c.ES2015,l=a.ES2015;break
;case"es2016":u=c.ES2016,l=a.ES2015;break;case"es2017":u=c.ES2017,l=a.ES2015;break;case"es2018":u=c.ES2018,l=a.ES2015
;break;case"es2019":u=c.ES2019,l=a.ES2015;break;case"es2020":u=c.ES2020,l=a.ES2020;break;case"esnext":u=c.ESNext,
l=a.ESNext;default:return console.log(z("Build target only support es2015 or later")),void process.exit(1)}
this.scriptTarget=u,this.moduleKind=l,console.log(H("Start compile project targeting",n,"with config",o))
;const h=t.project.findBinFiles(t.binaryDirName),p=t.project.findLibraryFiles(t.libraryDirName),d=t.project.findMainFile(),f=[...h,...p].map((t=>t[1]))
;if(d){const[t,e]=d;f.push(e)}const g={target:u,module:l,importHelpers:!0,noEmit:!1,sourceMap:!0,inlineSourceMap:!1,
declaration:!!d,declarationMap:!1,removeComments:!0,incremental:!0,tsBuildInfoFile:t.fs.resolvePath(r,"buildinfo.json")
},m=this.createProgram(t,f,o,Object.assign(g,t.tsCompilerOptions));this.typeChecker=m.getTypeChecker(),
this.cache=t.ts.runtime.createModuleResolutionCache(e,(t=>t),this.compilerOptions);let y=0,v=0,S=0;const w={}
;w.before=[ot(t,this.runtime)],w.after=[at(0,this.runtime)],d&&(w.afterDeclarations=[])
;let b=t.ts.runtime.getPreEmitDiagnostics(m)
;b.length&&(b=b.filter((t=>!(1===t.category&&2354===t.code&&"string"==typeof t.messageText&&t.messageText.indexOf("tslib")>=0)))),
b.length&&(console.log(H("Pre Emit Diagnostics")),console.log(t.ts.formatDiagnostics(b)))
;const P=m.emit(void 0,((t,e)=>{if(this.artifacts.set(t,e),t.endsWith(".js")){
const s=t.slice(0,-3)+".ts",i=m.getSourceFile(s);if(i){const t=i.getFullText(),n=t.length;S++,y+=n,v+=e.length,
console.log("Building",s,Q(n,e.length)),this.artifacts.set(s,t),this.codes.set(s,e)}}else if(t.endsWith(".js.map")){
const s=t.slice(0,-7)+".ts";this.maps.set(s,JSON.parse(e))}else if(t.endsWith(".d.ts")){const s=t.slice(0,-5)+".ts"
;this.types.set(s,e)}}),void 0,!1,w);P.diagnostics.length&&(console.log("Emit Diagnostics"),
console.log(t.ts.formatDiagnostics(P.diagnostics)));const x=b.length+P.diagnostics.length
;P.emitSkipped?(console.log(H("Build stopped")),process.exit(1)):x&&console.log(H("Continue build with emit error")),
console.log(`Built ${S} files`,Q(y,v))}resolveModuleName(t,e){if(this.compilerOptions&&this.cache&&e&&this.cache){
let s=this.ts.runtime.resolveModuleNameFromCache(t,e,this.cache);if(s&&s.resolvedModule)return s.resolvedModule
;if(this.compilerHost){const s=this.ts.runtime.resolveModuleName(t,e,this.compilerOptions,this.compilerHost,this.cache)
;if(s&&s.resolvedModule)return s.resolvedModule
;const i=this.ts.runtime.resolveModuleName(t,this.env.baseDir,this.compilerOptions,this.compilerHost,this.cache)
;if(i&&i.resolvedModule)return console.log("Resolve from CLI path",t),i.resolvedModule}}}getSourceFile(t){var e
;return null===(e=this.program)||void 0===e?void 0:e.getSourceFile(t)}getSourceMap(t){return this.maps.get(t)}
createSourceFile(t,e,s){
return this.ts.runtime.createSourceFile(t,e,s||this.scriptTarget||this.ts.runtime.ScriptTarget.ESNext,!0)}getCode(t){
return this.codes.get(t)}getTyping(t){return this.types.get(t)}hasArtifact(t){return this.artifacts.has(t)}
getArtifact(t){return this.artifacts.get(t)}createProgram(t,e,s,i){const n=t.ts,r=[],o=Object.assign({},n.runtime.sys,{
onUnRecoverableConfigFileDiagnostic(t){r.push(t)}}),c=n.runtime.getParsedCommandLineOfConfigFile(s,i,o);let a
;c&&c.options&&(a=c.options),a&&!r.length||(console.log(n.formatDiagnostics(r)),process.exit(1)),this.compilerOptions=a
;const u=this.compilerHost=n.runtime.createCompilerHost(a)
;return console.log(Z("create a program with entries"),e.join(", ")),
this.program=n.runtime.createProgram(e,a,u,void 0,r||void 0)}}
F([J(),C("design:type",ProjectService)],TypeScriptCompiler.prototype,"project",void 0);class TypeScriptParser{read(t){
const e=this.compiler.program,s=this.ts.runtime.sys.readFile(t);if(!e||!s)return{}
;const i=this.compiler.getSourceFile(t)||this.compiler.createSourceFile(t,s);return console.log("return emit",i),{OKOK:1
}}write(t,e){throw new Error("Not Supported")}}
F([J(),C("design:type",TypeScript)],TypeScriptParser.prototype,"ts",void 0),
F([J(),C("design:type",TypeScriptCompiler)],TypeScriptParser.prototype,"compiler",void 0);class PropertyFileParser{
read(t){const e=this.fs.readFile(t,"utf-8");if(e)return this.parseText(e)}write(t,e){
this.fs.writeFile(t,require("js-yaml").dump(e))}parseValue(t){try{return JSON.parse(t)}catch(e){return t}}parseText(t){
const e=t.match(/[^\r\n]+/g),s={};if(e)for(const t of e){const e=t.trim();if(e.startsWith("#"))continue
;const i=e.indexOf("=");if(i>0){const e=t.slice(0,i).trim();let n=t.slice(i+1).trim()
;n="true"===n||"false"!==n&&("null"===n?null:this.parseValue(n)),s[e]=n}}return s}}
F([J(),C("design:type",TypeScriptFileSystem)],PropertyFileParser.prototype,"fs",void 0);class YamlFileParser{read(t){
const e=this.fs.readFile(t,"utf-8");if(e)return require("js-yaml").load(e)}write(t,e){
this.fs.writeFile(t,require("js-yaml").dump(e))}}
F([J(),C("design:type",TypeScriptFileSystem)],YamlFileParser.prototype,"fs",void 0);class SettingsLoader{
applySettings(t,e,s){if("object"!=typeof e)throw new Error(`Invalid settings file: ${t}`);const i=[]
;for(const t of Object.keys(e))"function"!=typeof e[t]&&(s[t]=e[t],i.push(t))
;1===i.length?console.log(Z(`Applied a key from '${t}'`)):i.length?console.log(Z(`Applied ${i.length} keys from '${t}'`)):console.log(Z(`No config key in '${t}'`))
}getFile(e,s,i){const n=t.resolve(e,s+"."+i);if(this.fs.fileExists(n))return n
;console.log(`Settings file '${n}' is not found, ignoring...`)}applyJsonFileSettings(t,e,s){
const i=this.getFile(t,e,"json");return!!i&&(this.applySettings(i,this.json.read(i),s),!0)}applyJsFileSettings(t,e,s){
const i=this.getFile(t,e,"js");return!!i&&(this.applySettings(i,this.js.read(i),s),!0)}
applyPropertiesFileSettings(t,e,s){const i=this.getFile(t,e,"properties")
;return!!i&&(this.applySettings(i,this.properties.read(i),s),!0)}applyYamlFileSettings(t,e,s){
const i=this.getFile(t,e,"yaml")||this.getFile(t,e,"yml");return!!i&&(this.applySettings(i,this.yaml.read(i),s),!0)}
applyIniFileSettings(t,e,s){const i=this.getFile(t,e,"ini");return!!i&&(this.applySettings(i,this.ini.read(i),s),!0)}
applyJSON5FileSettings(t,e,s){const i=this.getFile(t,e,"json5");return!!i&&(this.applySettings(i,this.json.read(i),s),
!0)}applyFileSettingsInSequence(t,e,s){this.applyJsFileSettings(t,e,s),this.applyJsonFileSettings(t,e,s),
this.applyYamlFileSettings(t,e,s),this.applyJSON5FileSettings(t,e,s),this.applyIniFileSettings(t,e,s),
this.applyPropertiesFileSettings(t,e,s)}}
F([J(),C("design:type",TypeScriptFileSystem)],SettingsLoader.prototype,"fs",void 0),
F([J(),C("design:type",JavaScriptParser)],SettingsLoader.prototype,"js",void 0),
F([J(),C("design:type",JsonParser)],SettingsLoader.prototype,"json",void 0),
F([J(),C("design:type",YamlFileParser)],SettingsLoader.prototype,"yaml",void 0),
F([J(),C("design:type",IniFileParser)],SettingsLoader.prototype,"ini",void 0),
F([J(),C("design:type",PropertyFileParser)],SettingsLoader.prototype,"properties",void 0),
F([J(),C("design:type",TypeScriptParser)],SettingsLoader.prototype,"ts",void 0);class SettingsWriter{write(t,e,s){
let i=[s,"'use strict';","","Object.defineProperty(exports, '__esModule', { value: true });"],n=null
;const r=Object.keys(e).sort();for(const t of r){let s="";t[0]!==n&&(n=t[0],s="\n"),
t.indexOf(".")>=0?s+=`exports["${t}"] = ${JSON.stringify(e[t])};`:s+=`exports.${t} = ${JSON.stringify(e[t])};`,i.push(s)
}const o=i.join("\n");return this.fs.writeFile(t,o),o}}
F([J(),C("design:type",ProjectService)],SettingsWriter.prototype,"project",void 0),
F([J(),C("design:type",TypeScriptFileSystem)],SettingsWriter.prototype,"fs",void 0);class ConfigurationBuilder{
async build(t){const e=this.fs.resolvePath(t.inputDir,t.configDirName)
;if(!this.fs.directoryExists(e))return void console.log(H("Ignore settings because config dir not exits",e))
;const s=this.fs.resolvePath(t.outputDir,t.configDirName),i=this.fs.resolvePath(s,t.settingsFileName)
;console.log(H("Reading settings from",e));const n={};this.settings.applyFileSettingsInSequence(e,"settings",n),
this.settings.applyFileSettingsInSequence(e,"settings.local",n),
this.settings.applyFileSettingsInSequence(e,t.configuration,n),
this.settings.applyFileSettingsInSequence(e,t.configuration+".local",n),n.NAME=t.project.packageInfo.name,
n.VERSION=t.project.packageInfo.version;const r=t.project.repository;if(r){n.BUILD_REPOSITORY_TYPE=r.getType(),
n.BUILD_REPOSITORY=r.getURL();const t=r.getHead();t&&(n.BUILD_BRANCH=t,n.BUILD_COMMIT=r.getCommit(t))}
n.BUILD_TIME=(new Date).toISOString(),
n.BUILD_CLI_VERSION=this.cli.version,n.BUILD_NODE_VERSION=process.version.slice(1),n.BUILD_TS_VERSION=this.ts.version,
n.BUILD_HOST=o.hostname(),console.log(H(`Writing ${Object.keys(n).length} setting keys to`,i)),
this.settingsWriter.write(i,n,t.project.getHeader())}}
F([J(),C("design:type",TypeScript)],ConfigurationBuilder.prototype,"ts",void 0),
F([J(),C("design:type",TypeScriptFileSystem)],ConfigurationBuilder.prototype,"fs",void 0),
F([J(),C("design:type",SettingsLoader)],ConfigurationBuilder.prototype,"settings",void 0),
F([J(),C("design:type",SettingsWriter)],ConfigurationBuilder.prototype,"settingsWriter",void 0),
F([J(),C("design:type",ProjectService)],ConfigurationBuilder.prototype,"project",void 0),
F([J(),C("design:type",CliService)],ConfigurationBuilder.prototype,"cli",void 0);class ArtifactBuilder{async build(t){
const{outputDir:e}=t,s=this.fs.resolvePath(t.inputDir,t.artifactDirName)
;if(!this.fs.directoryExists(s))return void console.log(H("Ignore artifacts because dir not exits",s))
;console.log("Building artifacts")
;const i=s.length,n=this.fs.resolvePath(e,t.artifactDirName),r=this.fs.readDirectory(s)
;console.log(H(`Start copying ${r.length} from`,s));for(const t of r){const e=t.slice(i),s=this.fs.joinPath(n,e)
;this.fs.copy(t,s)}console.log(H(`Complete copy ${r.length} files`))}}
F([J(),C("design:type",TypeScriptFileSystem)],ArtifactBuilder.prototype,"fs",void 0);class PackageBuilder{
async build(t){const{outputDir:e,inputDir:s}=t,i=new Set,n=t.defaultPackageFileNames
;console.log(H("Start copy project files"));let r=0;for(const t of n)this.fs.fileExists(s,t)&&i.add(t)
;const o=t.project.packageInfo.files;if(o&&o.length)for(const t of o)this.fs.fileExists(s,t)&&i.add(t)
;if(i.size)for(const n of i){const i=this.fs.resolvePath(s,n),o=this.fs.resolvePath(e,n);this.fs.copy(i,o),
t.files.push(n),r++}console.log(H(`Complete copy ${r} files`))}}function ut(t){if(!t.size)return;const e={}
;for(const[s,i]of t.entries())e[s]=i;return e}function lt(e){let s=e,i=t.dirname(s);if("."===i)return i;for(s=i;s;){
const e=t.dirname(s);if(e===s)return e;if("."===e)return s;s=e}return s}
F([J(),C("design:type",TypeScriptFileSystem)],PackageBuilder.prototype,"fs",void 0);class PackageFileBuilder{
async build(e){
const{outputDir:s}=e,i=this.fs.resolvePath(e.inputDir,e.inputPackageJsonFileName),n=this.fs.resolvePath(e.outputDir,e.outputPackageJsonFileName)
;if(this.fs.fileExists(i)){const t=this.json.read(i);t.version=e.project.packageInfo.version,this.json.write(n,t),
console.log(V("Generate package.json from template"))}else{
const i=e.project.packageInfo,r=new Map,o=i.sideEffects,c=new Set(i.files||[]),a=e.project.findBinFiles(e.binaryDirName)
;if(a.length)for(const t of a)t[2]&&r.set(t[2],t[0]+".js");r.size&&c.add(e.binaryDirName)
;const u=this.fs.resolvePath(s,e.configDirName)
;this.fs.directoryExists(u)&&this.fs.readDirectory(u).length&&c.add(e.configDirName)
;const l=this.fs.resolvePath(s,e.libraryDirName)
;this.fs.directoryExists(l)&&this.fs.readDirectory(l).length&&c.add(e.libraryDirName)
;const h=this.fs.resolvePath(s,e.artifactDirName);let p,d,f,g
;if(this.fs.directoryExists(h)&&this.fs.readDirectory(h).length&&c.add(e.artifactDirName),i.main){
const e=i.main.slice(0,0-t.extname(i.main).length);p=e+".js",d=e+".mjs",f=e+".d.ts",
console.log(Z(`Found main entry in package.json: ${e}`))}else{const t=e.defaultEntryPathNames,i=e.defaultEntryName
;for(const e of t){const t=this.fs.joinPath(e,i+".js"),n=this.fs.joinPath(e,i+".mjs"),r=this.fs.joinPath(e,i+".d.ts")
;if(this.fs.fileExists(s,t)&&(p=t),this.fs.fileExists(s,n)&&(d=n),this.fs.fileExists(s,r)&&(f=r),p||d||f){
console.log(Z(`Found entry from ${e}: lib: ${p}, module: ${d}, type: ${f}`));break}}}p&&c.add(p),d&&c.add(d),f&&c.add(f)
;for(const t of e.files)c.add(t);if(i.dependencies){g={};for(const t of Object.keys(i.dependencies)){
const s=i.dependencies[t];if(s&&s.startsWith("github:"))g[t]=s;else{
const i=this.fs.resolvePath(e.project.path,"node_modules",t,"package.json");if(this.fs.fileExists(i)){
const e=require(i).version;g[t]=e}else g[t]=s}}}else g=void 0;const m={name:i.name,version:e.version,engines:i.engines,
sideEffects:o,bin:ut(r),description:i.description,author:i.author,license:i.license,repository:i.repository,bugs:i.bugs,
homepage:i.homepage,keywords:i.keywords,type:p?"commonjs":d?"module":void 0,main:p||d,module:d,"jsnext:main":d,types:f,
typings:f,files:this.generateFiles(e,c),dependencies:g,imports:i.imports,exports:i.exports}
;d&&p&&f&&!m.exports&&(m.exports={".":{import:"./"+d,require:"./"+p,types:"./"+f}}),this.json.write(n,m,2),
console.log("Generated package.json")}}generateFiles(t,e){const s=new Set;for(const i of e){const e=lt(i)
;"."===e?this.fs.exists(t.outputDir,i)&&s.add(i):this.fs.directoryExists(t.outputDir,e)&&s.add(e)}return function(t){
if(!t.size)return;const e=[];for(const s of t.keys())e.push(s);return e.sort()}(s)}}
F([J(),C("design:type",TypeScriptFileSystem)],PackageFileBuilder.prototype,"fs",void 0),
F([J(),C("design:type",JsonParser)],PackageFileBuilder.prototype,"json",void 0),
F([J(),C("design:type",ProjectService)],PackageFileBuilder.prototype,"project",void 0)
;class TypeScriptLibrary extends et{constructor(){super();let t=this.cms.resolveModule(G,this.env.baseDir)
;if(t||(t=this.cms.resolveModule(G,this.env.homeDir)),t||(t=this.cms.resolveModule(G,this.env.workingDir)),
!t)return console.log(z("tslib is not found, exit program")),void process.exit(1);this.desc=t}get entryModulePath(){
return this.desc.module}get entryTypingPath(){return this.desc.types}}
F([J(),C("design:type",CachedModuleService)],TypeScriptLibrary.prototype,"cms",void 0);class RollupPluginScriptBundler{
createPlugin(t){
const e=this.compiler,s=this.tslib.entryModulePath,i=t.shouldInline?t.project.inlineModuleNames:void 0,n=new Set(t.project.importModuleNames)
;return{name:"rollup-plugin-ts-bundler",resolveId(t,r){if(!r)return t;if(t===G)return s?{id:s,moduleSideEffects:!1}:{
id:G,external:!0};if(i){const e=i.get(t);if(e)return{id:e}}if(n.has(t))return{id:t,external:!0}
;const o=e.resolveModuleName(t,r)
;return o?o.packageId?(console.log(H(`Import ${o.packageId.name} as external module from ${r}`)),{id:o.packageId.name,
external:!0}):{id:o.resolvedFileName}:null},load:t=>e.getCode(t),transform:(t,s)=>t?{code:t,map:e.getSourceMap(s)}:null}
}}F([J(),C("design:type",TypeScriptCompiler)],RollupPluginScriptBundler.prototype,"compiler",void 0),
F([J(),C("design:type",TypeScriptLibrary)],RollupPluginScriptBundler.prototype,"tslib",void 0)
;class UnsupportedSyntaxError extends Error{constructor(t,e){super(e)}}class NamespaceFixer{constructor(t,e){
this.sourceFile=t,this.tsc=e}findNamespaces(){const t=[],e={};for(const s of this.sourceFile.statements){const i={
start:s.getStart(),end:s.getEnd()};if(this.tsc.isEmptyStatement(s)){t.unshift({name:"",exports:[],location:i});continue}
if((this.tsc.isImportDeclaration(s)||this.tsc.isExportDeclaration(s))&&s.moduleSpecifier&&this.tsc.isStringLiteral(s.moduleSpecifier)){
let{text:e}=s.moduleSpecifier;if(e.startsWith(".")&&e.endsWith(".d.ts")){let e=s.moduleSpecifier.getEnd()-1;t.unshift({
name:"",exports:[],location:{start:e-5,end:e}})}}if(this.tsc.isClassDeclaration(s)?e[s.name.getText()]={type:"class",
generics:s.typeParameters&&s.typeParameters.length}:this.tsc.isFunctionDeclaration(s)?e[s.name.getText()]={
type:"function"}:this.tsc.isInterfaceDeclaration(s)?e[s.name.getText()]={type:"interface",
generics:s.typeParameters&&s.typeParameters.length}:this.tsc.isTypeAliasDeclaration(s)?e[s.name.getText()]={type:"type",
generics:s.typeParameters&&s.typeParameters.length
}:this.tsc.isModuleDeclaration(s)&&this.tsc.isIdentifier(s.name)?e[s.name.getText()]={type:"namespace"
}:this.tsc.isEnumDeclaration(s)&&(e[s.name.getText()]={type:"enum"}),!this.tsc.isVariableStatement(s))continue
;const{declarations:n}=s.declarationList;if(1!==n.length)continue;const r=n[0],o=r.name.getText()
;if(!r.initializer||!this.tsc.isCallExpression(r.initializer)){e[o]={type:"var"};continue}
const c=r.initializer.arguments[0]
;if(!r.initializer.expression.getFullText().includes("/*#__PURE__*/Object.freeze")||!this.tsc.isObjectLiteralExpression(c))continue
;const a=[];for(const t of c.properties){
if(!this.tsc.isPropertyAssignment(t)||!this.tsc.isIdentifier(t.name)&&!this.tsc.isStringLiteral(t.name)||"__proto__"!==t.name.text&&!this.tsc.isIdentifier(t.initializer))throw new UnsupportedSyntaxError(t,"Expected a property assignment")
;"__proto__"!==t.name.text&&a.push({exportedName:t.name.text,localName:t.initializer.getText()})}t.unshift({name:o,
exports:a,location:i})}return{namespaces:t,itemTypes:e}}fix(){let t=this.sourceFile.getFullText()
;const{namespaces:e,itemTypes:s}=this.findNamespaces();for(const i of e){const e=t.slice(i.location.end)
;t=t.slice(0,i.location.start);for(const{exportedName:e,localName:n}of i.exports)if(e===n){
const{type:r,generics:o}=s[n]||{};if("interface"===r||"type"===r){const s=ht(o)
;t+=`type ${i.name}_${e}${s} = ${n}${s};\n`}else if("enum"===r||"class"===r){const s=ht(o)
;t+=`type ${i.name}_${e}${s} = ${n}${s};\n`,t+=`declare const ${i.name}_${e}: typeof ${n};\n`
}else t+=`declare const ${i.name}_${e}: typeof ${n};\n`}if(i.name){t+=`declare namespace ${i.name} {\n`,
t+="  export {\n"
;for(const{exportedName:e,localName:s}of i.exports)t+=e===s?`    ${i.name}_${e} as ${e},\n`:`    ${s} as ${e},\n`
;t+="  };\n",t+="}"}t+=e}return t}}function ht(t){return t?`<${Array.from({length:t},((t,e)=>`_${e}`)).join(", ")}>`:""}
function pt(t,e,s){var i;let n=!1
;const r=s.isClassDeclaration(e)||s.isFunctionDeclaration(e)||s.isModuleDeclaration(e)||s.isVariableStatement(e)
;for(const r of null!==(i=e.modifiers)&&void 0!==i?i:[])switch(r.kind){case s.SyntaxKind.ExportKeyword:
case s.SyntaxKind.DefaultKeyword:t.remove(r.getStart(),r.getEnd()+1);break;case s.SyntaxKind.DeclareKeyword:n=!0}
r&&!n&&t.appendRight(e.getStart(),"declare ")}function dt(t){const e=t.getFullStart();return e+(gt(t,e)?1:0)}
function ft(t){const e=t.getEnd();return e+(gt(t,e)?1:0)}function gt(t,e){return"\n"==t.getSourceFile().getFullText()[e]
}let mt=1;function yt(t,e){let s="start"in e?e:{start:e.getStart(),end:e.getEnd()};return Object.assign(t,s)}
function vt(t){const e=t.getText();if(!e)throw new Error("Not support create identity without name");return yt({
type:"Identifier",name:e},t)}class AstHelper{constructor(t){this.tsc=t}createDeclaration(t,e){return yt({
type:"FunctionDeclaration",id:yt({type:"Identifier",name:this.tsc.idText(t)},t),params:[],body:{type:"BlockStatement",
body:[]}},e)}convertExpression(t){if(this.tsc.isLiteralExpression(t))return{type:"Literal",value:t.text}
;if(this.tsc.isPropertyAccessExpression(t)){
if(this.tsc.isPrivateIdentifier(t.name))throw new UnsupportedSyntaxError(t.name);return yt({type:"MemberExpression",
computed:!1,optional:!1,object:this.convertExpression(t.expression),property:this.convertExpression(t.name)},{
start:t.expression.getStart(),end:t.name.getEnd()})}if(this.tsc.isIdentifier(t))return vt(t)
;throw console.log("unknown node kind = ",t.kind),new UnsupportedSyntaxError(t)}convertCallExpression(t){return yt({
type:"CallExpression",callee:this.convertExpression(t.expression),
arguments:t.arguments.map((t=>this.convertExpression(t))),optional:!1},t)}convertNewExpression(t){return yt({
type:"NewExpression",callee:this.convertExpression(t.expression),
arguments:t.arguments?t.arguments.map((t=>this.convertExpression(t))):[],optional:!1},t)}convertClassExpression(t){
return yt({type:"ClassExpression",id:t.name?vt(t.name):null,body:this.convertClassBody(t.members)},t)}
convertClassBody(t){return{type:"ClassBody",body:[]}}matchesModifier(t,e){
return(this.tsc.getCombinedModifierFlags(t)&e)===e}}class DeclarationScope{constructor({id:t,range:e,helper:s}){
if(this.scopes=[],this.tsc=s.tsc,this.helper=s,t)this.declaration=s.createDeclaration(t,e);else{
const{iife:t,fn:s}=function(t){const e=yt({type:"FunctionExpression",id:null,params:[],body:{type:"BlockStatement",
body:[]}},t);return{fn:e,iife:yt({type:"ExpressionStatement",expression:{type:"CallExpression",callee:{
type:"Identifier",name:String(mt++)},arguments:[e],optional:!1}},t)}}(e);this.iife=t,this.declaration=s}
this.IGNORE_TYPENODES=new Set([this.tsc.SyntaxKind.LiteralType,this.tsc.SyntaxKind.VoidKeyword,this.tsc.SyntaxKind.UnknownKeyword,this.tsc.SyntaxKind.AnyKeyword,this.tsc.SyntaxKind.BooleanKeyword,this.tsc.SyntaxKind.NumberKeyword,this.tsc.SyntaxKind.StringKeyword,this.tsc.SyntaxKind.ObjectKeyword,this.tsc.SyntaxKind.NullKeyword,this.tsc.SyntaxKind.UndefinedKeyword,this.tsc.SyntaxKind.SymbolKeyword,this.tsc.SyntaxKind.NeverKeyword,this.tsc.SyntaxKind.ThisKeyword,this.tsc.SyntaxKind.ThisType,this.tsc.SyntaxKind.BigIntKeyword])
}pushScope(){this.scopes.push(new Set)}popScope(t=1){for(let e=0;e<t;e++)this.scopes.pop()}pushTypeVariable(t){var e
;const s=t.getText();null===(e=this.scopes[this.scopes.length-1])||void 0===e||e.add(s)}pushRaw(t){
this.declaration.params.push(t)}pushReference(t){let e
;if("Identifier"===t.type?e=t.name:"MemberExpression"===t.type&&"Identifier"===t.object.type&&(e=t.object.name),
e)for(const t of this.scopes)if(t.has(e))return;this.pushRaw(function(t){return{type:"AssignmentPattern",left:{
type:"Identifier",name:String(mt++)},right:t}}(t))}pushIdentifierReference(t){this.pushReference(vt(t))}
convertEntityName(t){return this.tsc.isIdentifier(t)?vt(t):yt({type:"MemberExpression",computed:!1,optional:!1,
object:this.convertEntityName(t.left),property:vt(t.right)},t)}convertPropertyAccess(t){
if(!this.tsc.isIdentifier(t.expression)&&!this.tsc.isPropertyAccessExpression(t.expression))throw new UnsupportedSyntaxError(t.expression)
;if(this.tsc.isPrivateIdentifier(t.name))throw new UnsupportedSyntaxError(t.name);return yt({type:"MemberExpression",
computed:!1,optional:!1,
object:this.tsc.isIdentifier(t.expression)?vt(t.expression):this.convertPropertyAccess(t.expression),property:vt(t.name)
},t)}convertComputedPropertyName(t){if(!t.name||!this.tsc.isComputedPropertyName(t.name))return
;const{expression:e}=t.name;if(!this.tsc.isLiteralExpression(e)){
if(this.tsc.isIdentifier(e))return this.pushReference(vt(e))
;if(this.tsc.isPropertyAccessExpression(e))return this.pushReference(this.convertPropertyAccess(e))
;throw new UnsupportedSyntaxError(e)}}convertParametersAndType(t){this.convertComputedPropertyName(t)
;const e=this.convertTypeParameters(t.typeParameters);for(const e of t.parameters)this.convertTypeNode(e.type)
;this.convertTypeNode(t.type),this.popScope(e)}convertHeritageClauses(t){
for(const e of t.heritageClauses||[])for(const t of e.types)this.pushReference(this.helper.convertExpression(t.expression)),
this.convertTypeArguments(t)}convertTypeArguments(t){
if(t.typeArguments)for(const e of t.typeArguments)this.convertTypeNode(e)}convertMembers(t){
for(const e of t)if(this.tsc.isPropertyDeclaration(e)||this.tsc.isPropertySignature(e)||this.tsc.isIndexSignatureDeclaration(e))this.convertComputedPropertyName(e),
this.convertTypeNode(e.type);else{
if(!(this.tsc.isMethodDeclaration(e)||this.tsc.isMethodSignature(e)||this.tsc.isConstructorDeclaration(e)||this.tsc.isConstructSignatureDeclaration(e)||this.tsc.isCallSignatureDeclaration(e)||this.tsc.isGetAccessorDeclaration(e)||this.tsc.isSetAccessorDeclaration(e)))throw new UnsupportedSyntaxError(e)
;this.convertParametersAndType(e)}}convertTypeParameters(t){if(!t)return 0
;for(const e of t)this.convertTypeNode(e.constraint),this.convertTypeNode(e.default),this.pushScope(),
this.pushTypeVariable(e.name);return t.length}convertTypeNode(t){if(t&&!this.IGNORE_TYPENODES.has(t.kind)){
if(this.tsc.isTypeReferenceNode(t))return this.pushReference(this.convertEntityName(t.typeName)),
void this.convertTypeArguments(t);if(this.tsc.isTypeLiteralNode(t))return this.convertMembers(t.members)
;if(this.tsc.isArrayTypeNode(t))return this.convertTypeNode(t.elementType)
;if(this.tsc.isTupleTypeNode(t))for(const e of t.elements)this.convertTypeNode(e);else{
if(this.tsc.isNamedTupleMember(t)||this.tsc.isParenthesizedTypeNode(t)||this.tsc.isTypeOperatorNode(t)||this.tsc.isTypePredicateNode(t))return this.convertTypeNode(t.type)
;if(this.tsc.isUnionTypeNode(t)||this.tsc.isIntersectionTypeNode(t))for(const e of t.types)this.convertTypeNode(e);else{
if(this.tsc.isMappedTypeNode(t)){const{typeParameter:e,type:s,nameType:i}=t;return this.convertTypeNode(e.constraint),
this.pushScope(),this.pushTypeVariable(e.name),this.convertTypeNode(s),i&&this.convertTypeNode(i),void this.popScope()}
if(this.tsc.isConditionalTypeNode(t))return this.convertTypeNode(t.checkType),this.pushScope(),
this.convertTypeNode(t.extendsType),this.convertTypeNode(t.trueType),this.convertTypeNode(t.falseType),
void this.popScope();if(this.tsc.isIndexedAccessTypeNode(t))return this.convertTypeNode(t.objectType),
void this.convertTypeNode(t.indexType)
;if(this.tsc.isFunctionOrConstructorTypeNode(t))this.convertParametersAndType(t);else if(this.tsc.isTypeQueryNode(t))this.pushReference(this.convertEntityName(t.exprName));else if(this.tsc.isRestTypeNode(t))this.convertTypeNode(t.type);else if(this.tsc.isOptionalTypeNode(t))this.convertTypeNode(t.type);else if(this.tsc.isTemplateLiteralTypeNode(t))for(const e of t.templateSpans)this.convertTypeNode(e.type);else{
if(!this.tsc.isInferTypeNode(t))throw new UnsupportedSyntaxError(t);this.pushTypeVariable(t.typeParameter.name)}}}}}
convertNamespace(t){
if(this.pushScope(),!t.body||!this.tsc.isModuleBlock(t.body))throw new UnsupportedSyntaxError(t,'namespace must have a "ModuleBlock" body.')
;const{statements:e}=t.body
;for(const t of e)if(this.tsc.isEnumDeclaration(t)||this.tsc.isFunctionDeclaration(t)||this.tsc.isClassDeclaration(t)||this.tsc.isInterfaceDeclaration(t)||this.tsc.isTypeAliasDeclaration(t)||this.tsc.isModuleDeclaration(t)){
if(!t.name||!this.tsc.isIdentifier(t.name))throw new UnsupportedSyntaxError(t,"non-Identifier name not supported")
;this.pushTypeVariable(t.name)}else if(this.tsc.isVariableStatement(t))for(const e of t.declarationList.declarations){
if(!this.tsc.isIdentifier(e.name))throw new UnsupportedSyntaxError(e,"non-Identifier name not supported")
;this.pushTypeVariable(e.name)
}else if(!this.tsc.isExportDeclaration(t))throw new UnsupportedSyntaxError(t,"namespace child (hoisting) not supported yet")
;for(const t of e)if(this.tsc.isVariableStatement(t))for(const e of t.declarationList.declarations)e.type&&this.convertTypeNode(e.type);else if(this.tsc.isFunctionDeclaration(t))this.convertParametersAndType(t);else if(this.tsc.isInterfaceDeclaration(t)||this.tsc.isClassDeclaration(t)){
const e=this.convertTypeParameters(t.typeParameters);this.convertHeritageClauses(t),this.convertMembers(t.members),
this.popScope(e)}else if(this.tsc.isTypeAliasDeclaration(t)){const e=this.convertTypeParameters(t.typeParameters)
;this.convertTypeNode(t.type),this.popScope(e)
}else if(this.tsc.isModuleDeclaration(t))this.convertNamespace(t);else if(!this.tsc.isEnumDeclaration(t)){
if(!this.tsc.isExportDeclaration(t))throw new UnsupportedSyntaxError(t,"namespace child (walking) not supported yet")
;if(t.exportClause){if(this.tsc.isNamespaceExport(t.exportClause))throw new UnsupportedSyntaxError(t.exportClause)
;for(const e of t.exportClause.elements){const t=e.propertyName||e.name;this.pushIdentifierReference(t)}}}
this.popScope()}}class Transformer{constructor(t,e){var s;this.sourceFile=t,this.helper=e,this.declarations=new Map,
this.tsc=e.tsc,this.ast=yt({type:"Program",sourceType:"module",body:[]},{start:(s=t).getFullStart(),end:s.getEnd()})
;for(const e of t.statements)this.convertStatement(e)}transform(){return{ast:this.ast}}pushStatement(t){
this.ast.body.push(t)}createDeclaration(t,e){const s={start:t.getFullStart(),end:t.getEnd()};if(!e){
const t=new DeclarationScope({range:s,helper:this.helper});return this.pushStatement(t.iife),t}
const i=e.getText(this.sourceFile),n=new DeclarationScope({id:e,range:s,helper:this.helper}),r=this.declarations.get(i)
;if(r){r.pushIdentifierReference(e),r.declaration.end=s.end;let t=this.ast.body.findIndex((t=>t==r.declaration))
;for(let e=t+1;e<this.ast.body.length;e++){const t=this.ast.body[e];t.start=t.end=s.end}
}else this.pushStatement(n.declaration),this.declarations.set(i,n);return r||n}convertStatement(t){
if(this.tsc.isEnumDeclaration(t))return this.convertEnumDeclaration(t)
;if(this.tsc.isFunctionDeclaration(t))return this.convertFunctionDeclaration(t)
;if(this.tsc.isInterfaceDeclaration(t)||this.tsc.isClassDeclaration(t))return this.convertClassOrInterfaceDeclaration(t)
;if(this.tsc.isTypeAliasDeclaration(t))return this.convertTypeAliasDeclaration(t)
;if(this.tsc.isVariableStatement(t))return this.convertVariableStatement(t)
;if(this.tsc.isExportDeclaration(t)||this.tsc.isExportAssignment(t))return this.convertExportDeclaration(t)
;if(this.tsc.isModuleDeclaration(t))return this.convertNamespaceDeclaration(t)
;if(t.kind==this.tsc.SyntaxKind.NamespaceExportDeclaration)return this.removeStatement(t)
;if(this.tsc.isImportDeclaration(t)||this.tsc.isImportEqualsDeclaration(t))return this.convertImportDeclaration(t)
;throw new UnsupportedSyntaxError(t)}removeStatement(t){this.pushStatement(yt({type:"ExpressionStatement",expression:{
type:"Literal",value:"pls remove me"}},t))}convertNamespaceDeclaration(t){
if(t.flags&this.tsc.NodeFlags.GlobalAugmentation||!this.tsc.isIdentifier(t.name))return void this.createDeclaration(t).convertNamespace(t)
;const e=this.createDeclaration(t,t.name);e.pushIdentifierReference(t.name),e.convertNamespace(t)}
convertEnumDeclaration(t){this.createDeclaration(t,t.name).pushIdentifierReference(t.name)}
convertFunctionDeclaration(t){if(!t.name)throw new UnsupportedSyntaxError(t,"FunctionDeclaration should have a name")
;const e=this.createDeclaration(t,t.name);e.pushIdentifierReference(t.name),e.convertParametersAndType(t)}
convertClassOrInterfaceDeclaration(t){
if(!t.name)throw new UnsupportedSyntaxError(t,"ClassDeclaration / InterfaceDeclaration should have a name")
;const e=this.createDeclaration(t,t.name),s=e.convertTypeParameters(t.typeParameters);e.convertHeritageClauses(t),
e.convertMembers(t.members),e.popScope(s)}convertTypeAliasDeclaration(t){
const e=this.createDeclaration(t,t.name),s=e.convertTypeParameters(t.typeParameters);e.convertTypeNode(t.type),
e.popScope(s)}convertVariableStatement(t){const{declarations:e}=t.declarationList
;if(1!==e.length)throw new UnsupportedSyntaxError(t,"VariableStatement with more than one declaration not yet supported")
;for(const s of e){
if(!this.tsc.isIdentifier(s.name))throw new UnsupportedSyntaxError(t,"VariableDeclaration must have a name")
;this.createDeclaration(t,s.name).convertTypeNode(s.type)}}convertExportDeclaration(t){
if(this.tsc.isExportAssignment(t)&&t.expression)return void this.pushStatement(yt({type:"ExportDefaultDeclaration",
declaration:this.helper.convertExpression(t.expression)},t))
;const e=t,s=e.moduleSpecifier?this.helper.convertExpression(e.moduleSpecifier):void 0
;if(e.exportClause)if(this.tsc.isNamespaceExport(e.exportClause))this.pushStatement(yt({type:"ExportAllDeclaration",
source:s,exported:vt(e.exportClause.name)},e));else{const t=[]
;for(const s of e.exportClause.elements)t.push(this.convertExportSpecifier(s));this.pushStatement(yt({
type:"ExportNamedDeclaration",declaration:null,specifiers:t,source:s},e))}else this.pushStatement(yt({
type:"ExportAllDeclaration",source:s,exported:null},e))}convertImportDeclaration(t){
if(this.tsc.isImportEqualsDeclaration(t)){
if(!this.tsc.isExternalModuleReference(t.moduleReference))throw new UnsupportedSyntaxError(t,"ImportEquals should have a literal source.")
;return void this.pushStatement(yt({type:"ImportDeclaration",specifiers:[{type:"ImportDefaultSpecifier",local:vt(t.name)
}],source:this.helper.convertExpression(t.moduleReference.expression)},t))}
const e=this.helper.convertExpression(t.moduleSpecifier),s=t.importClause&&t.importClause.namedBindings?this.convertNamedImportBindings(t.importClause.namedBindings):[]
;t.importClause&&t.importClause.name&&s.push({type:"ImportDefaultSpecifier",local:vt(t.importClause.name)}),
this.pushStatement(yt({type:"ImportDeclaration",specifiers:s,source:e},t))}convertNamedImportBindings(t){
return this.tsc.isNamedImports(t)?t.elements.map((t=>{const e=vt(t.name);return{type:"ImportSpecifier",local:e,
imported:t.propertyName?vt(t.propertyName):e}})):[{type:"ImportNamespaceSpecifier",local:vt(t.name)}]}
convertExportSpecifier(t){const e=vt(t.name);return{type:"ExportSpecifier",exported:e,
local:t.propertyName?vt(t.propertyName):e}}}function St(e){const s=t.extname(e),i=s.length
;return i?".ts"===s.toLowerCase()?e.length>5&&".d.ts"==e.slice(-5).toLowerCase()?t.resolve(e):t.resolve(String(e.slice(0,-3))+".d.ts"):t.resolve(String(e.slice(0,-i))+".d.ts"):t.resolve(e+".d.ts")
}class RollupPluginDefinitionBundler{createPlugin(t){
const e=t.ts.runtime,s=this.compiler,i=this.module,n=new AstHelper(e),r=new Map,o=t.project.inlineModuleNames,c=new Set(t.project.importModuleNames),a=this.tslib.entryTypingPath
;return{name:"rollup-plugin-dts-bundler",resolveId(t,e){if(!e)return t;if(t===G)return c.has(G)||!a?{id:G,external:!0}:{
id:a};if(o&&o.has(t)){const s=i.resolveSideEffectsFreeModule(t,e);if(s&&s.types)return{id:s.types}
;console.log(z(`Can not find inline module "${t}" from ${e}`))}if(c.has(t))return{id:t,external:!0}
;const n=s.resolveModuleName(t,e)
;return n?n.packageId?(console.log(H(`Import external definition "${n.packageId.name}" from ${e}`)),{
id:n.packageId.name,external:!0}):{id:St(n.resolvedFileName)}:null},load:t=>s.getArtifact(t),transform(t,e){
const i=s.createSourceFile(e,t),o=function({sourceFile:t,helper:e}){
const s=e.tsc,i=new f.default(t.getFullText()),n=new Set,r=new Set;let o="";const c=new Map,a=new Map
;for(const c of t.statements)if(s.isEmptyStatement(c))i.remove(c.getStart(),c.getEnd());else if(s.isEnumDeclaration(c)||s.isFunctionDeclaration(c)||s.isInterfaceDeclaration(c)||s.isClassDeclaration(c)||s.isTypeAliasDeclaration(c)||s.isModuleDeclaration(c)){
if(c.name){const t=c.name.getText()
;n.add(t),e.matchesModifier(c,s.ModifierFlags.ExportDefault)?o=t:e.matchesModifier(c,s.ModifierFlags.Export)&&r.add(t),
c.flags&s.NodeFlags.GlobalAugmentation||d(t,[dt(c),ft(c)])}pt(i,c,s)}else if(s.isVariableStatement(c)){
const{declarations:t}=c.declarationList,o=e.matchesModifier(c,s.ModifierFlags.Export)
;for(const t of c.declarationList.declarations)if(s.isIdentifier(t.name)){const e=t.name.getText();n.add(e),o&&r.add(e)}
if(pt(i,c,s),1==t.length){const e=t[0];s.isIdentifier(e.name)&&d(e.name.getText(),[dt(c),ft(c)])}else{
const e=t.slice(),i=e.shift();d(i.name.getText(),[dt(c),i.getEnd()])
;for(const t of e)s.isIdentifier(t.name)&&d(t.name.getText(),[t.getFullStart(),t.getEnd()])}
const{flags:a}=c.declarationList,u=`declare ${a&s.NodeFlags.Let?"let":a&s.NodeFlags.Const?"const":"var"} `,l=c.declarationList.getChildren().find((t=>t.kind===s.SyntaxKind.SyntaxList)).getChildren()
;let h=0;for(const t of l)if(t.kind===s.SyntaxKind.CommaToken)h=t.getStart(),i.remove(h,t.getEnd());else if(h){
i.appendLeft(h,";\n");const e=t.getFullStart(),s=i.slice(e,t.getStart());let n=s.length-s.trimStart().length
;n?i.overwrite(e,e+n,u):i.appendLeft(e,u)}}
for(const n of t.statements)if(h(n),e.matchesModifier(n,s.ModifierFlags.ExportDefault)&&(s.isFunctionDeclaration(n)||s.isClassDeclaration(n))){
if(n.name)continue;o||(o=p("export_default"))
;const t=n.getChildren(),e=t.findIndex((t=>t.kind===s.SyntaxKind.ClassKeyword||t.kind===s.SyntaxKind.FunctionKeyword)),r=t[e],c=t[e+1]
;c.kind>=s.SyntaxKind.FirstPunctuation&&c.kind<=s.SyntaxKind.LastPunctuation?i.appendLeft(c.getStart(),o):i.appendRight(r.getEnd(),` ${o}`)
}for(const t of a.values()){const e=t.pop()[0];for(const s of t)i.move(s[0],s[1],e)}
o&&i.append(`\nexport default ${o};\n`),r.size&&i.append(`\nexport { ${[...r].join(", ")} };\n`)
;for(const[t,e]of c.entries())i.prepend(`import * as ${e} from "${t}";\n`);const u=new Set,l=t.getLineStarts()
;for(const e of t.typeReferenceDirectives){u.add(e.fileName);const{line:s}=t.getLineAndCharacterOfPosition(e.pos),n=l[s]
;let r=t.getLineEndOfPosition(e.pos);"\n"==i.slice(r,r+1)&&(r+=1),i.remove(n,r)}return{code:i,typeReferences:u}
;function h(t){if(s.forEachChild(t,h),s.isImportTypeNode(t)){
if(!s.isLiteralTypeNode(t.argument)||!s.isStringLiteral(t.argument.literal))throw new UnsupportedSyntaxError(t,"inline imports should have a literal argument")
;const e=t.argument.literal.text,n=t.getChildren(),r=n.find((t=>t.kind===s.SyntaxKind.ImportKeyword)).getStart()
;let o=t.getEnd();const a=n.find((t=>t.kind===s.SyntaxKind.DotToken||t.kind===s.SyntaxKind.LessThanToken))
;a&&(o=a.getStart());const u=function(t){let e=c.get(t);return e||(e=p(t.replace(/[^a-zA-Z0-9_$]/g,(()=>"_"))),
c.set(t,e)),e}(e);i.overwrite(r,o,u)}}function p(t){let e=t;for(;n.has(e);)e=`_${e}`;return n.add(e),e}function d(t,e){
let s=a.get(t);if(s){const t=s[s.length-1];t[1]===e[0]?t[1]=e[1]:s.push(e)}else s=[e],a.set(t,s)}}({sourceFile:i,
helper:n});r.set(i.fileName,o.typeReferences)
;const c=o.code.toString(),a=s.createSourceFile(e,c),u=new Transformer(a,n).transform()
;return process.env.DTS_DUMP_AST&&(console.log(e),console.log(c),console.log(JSON.stringify(u.ast.body,void 0,2))),{
code:c,ast:u.ast,map:o.code.generateMap()}},renderChunk(t,i){
const n=s.createSourceFile(i.fileName,t),o=new NamespaceFixer(n,e),c=new Set
;for(const t of Object.keys(i.modules))for(const e of r.get(t.split("\\").join("/"))||[])c.add(e)
;return t=(a=Array.from(c,(t=>`/// <reference types="${t}" />`))).length?a.join("\n")+"\n":"",{code:t+=o.fix(),map:{
mappings:""}};var a}}}}
F([J(),C("design:type",TypeScriptFileSystem)],RollupPluginDefinitionBundler.prototype,"fs",void 0),
F([J(),C("design:type",TypeScriptCompiler)],RollupPluginDefinitionBundler.prototype,"compiler",void 0),
F([J(),C("design:type",ProjectService)],RollupPluginDefinitionBundler.prototype,"project",void 0),
F([J(),C("design:type",CachedModuleService)],RollupPluginDefinitionBundler.prototype,"module",void 0),
F([J(),C("design:type",TypeScriptLibrary)],RollupPluginDefinitionBundler.prototype,"tslib",void 0)
;class RollupService extends et{bundleScripts(t,e,s){const i=[];i.push(this.scriptBundler.createPlugin(t)),
(t.shouldMangle||t.shouldCompress)&&i.push(this.terser.createPlugin(t,s)),
t.shouldBeautify&&i.push(this.prettier.createPlugin(t));const n={input:e,external:t.project.importModuleNames||[],
plugins:i},r=s?".mjs":".js",o=s?"esm":"cjs",a={banner:t.project.getHeader(),preferConst:!0,entryFileNames:"[name]"+r,
chunkFileNames:this.fs.joinPath(t.libraryDirName,"[hash].chunk"+r),dir:t.outputDir,format:o}
;return c.rollup(n).then((e=>e.write(a).then((e=>{if(!s)return this.findAndFixBinaryFiles(t,e)}))))}bundleTypes(t,e){
const{outputDir:s}=t,i={input:e,external:t.project.importModuleNames||[],
plugins:[this.definitionBundler.createPlugin(t)]},n={banner:t.project.getHeader(),preferConst:!0,
entryFileNames:"[name].d.ts",chunkFileNames:this.fs.joinPath(t.libraryDirName,"[hash].chunk.d.ts"),dir:s,format:"es"}
;return c.rollup(i).then((t=>t.write(n).then((()=>{}))))}findAndFixBinaryFiles(t,e){
for(const[e]of t.project.findBinFiles(t.binaryDirName)){const s=this.fs.resolvePath(t.outputDir,e+".js")
;this.fs.fileExists(s)&&(this.fs.prependLine(s,"#!/usr/bin/env node"),this.fs.chmod(s,"755"))}}}
F([J(),C("design:type",ProjectService)],RollupService.prototype,"project",void 0),
F([J(),C("design:type",TypeScriptCompiler)],RollupService.prototype,"compiler",void 0),
F([J(),C("design:type",RollupPluginScriptBundler)],RollupService.prototype,"scriptBundler",void 0),
F([J(),C("design:type",RollupPluginDefinitionBundler)],RollupService.prototype,"definitionBundler",void 0),
F([J(),C("design:type",class RollupPluginPrettier{createPlugin(t){const e=t.project.packageInfo.prettier
;let s=t.defaultPrettierConfig;return e&&(s=Object.assign(s,e)),{name:"rollup-plugin-prettier",
renderChunk:t=>l.format(t,s)}}
})],RollupService.prototype,"prettier",void 0),F([J(),C("design:type",class RollupPluginTerser{createPlugin(t,e=!1){
let s;switch(t.target){case"es2015":s=2015;break;case"es2016":s=2016;break;case"es2017":s=2017;break;case"es2018":s=2018
;break;case"es2019":s=2019;break;case"es2020":case"esnext":s=2020;break;default:
console.log(z("Build target only support ES2015 or later (e.g. 2015,2016,2017,2018,2019,2020)")),process.exit(1)}
const i={ecma:s,compress:!1,mangle:!1,format:{ascii_only:!1,max_line_len:120}};return t.shouldMangle&&(i.mangle={
keep_classnames:!0,keep_fnames:!1,properties:{builtins:!1,debug:!1,keep_quoted:!0,regex:/^_/,
reserved:["__agent","__decorate","__metadata","__param"]},module:e}),t.shouldCompress&&(i.compress={keep_classnames:!0,
keep_fnames:!1,keep_fargs:!1,keep_infinity:!0,module:e,passes:2}),u.terser(i)}
})],RollupService.prototype,"terser",void 0);class BundleBuilder{async build(t){
const e={},s={},i={},n={},r=t.project.findBinFiles(t.binaryDirName),o=t.project.findLibraryFiles(t.libraryDirName),c=t.project.findMainFile()
;if(r.map((([t,s])=>{e[t]=s})),o.map((([t,i])=>{e[t]=i,s[t]=i})),c){const[t,r]=c;e[t]=r,s[t]=r,n[t]=r,i[t]=St(r)}
console.log("Start bundle es modules..."),Object.keys(s).length?(console.time("Bundle es modules"),
await this.rollup.bundleScripts(t,s,!0),console.timeEnd("Bundle es modules")):console.log("skip build es modules"),
console.log("Start bundle scripts..."),Object.keys(e).length?(console.time("Bundle scripts"),
await this.rollup.bundleScripts(t,e,!1),console.timeEnd("Bundle scripts")):console.log("skip build scripts"),
console.log("Start bundle types..."),Object.keys(i).length?(console.time("Bundle types"),
await this.rollup.bundleTypes(t,i),console.timeEnd("Bundle types")):console.log("skip build types")}}
F([J(),C("design:type",TypeScriptFileSystem)],BundleBuilder.prototype,"fs",void 0),
F([J(),C("design:type",TypeScriptCompiler)],BundleBuilder.prototype,"compiler",void 0),
F([J(),C("design:type",JsonParser)],BundleBuilder.prototype,"json",void 0),
F([J(),C("design:type",RollupService)],BundleBuilder.prototype,"rollup",void 0);class OptimizorBuilder{async build(e){
const s=this.fs.resolvePath(e.outputDir,e.artifactDirName),i=this.find(s)
;for(const e of i)t.basename(e).startsWith(".")||(this.image.canCompress(e)?(console.log("Compressing image",e),
await this.image.compress(e)):this.fs.canCompress(e)&&(console.log("Compressing file",e),await this.fs.compressGzip(e),
await this.fs.compressBrotli(e)))}find(t,e){return this.fs.readDirectory(t,e,void 0,void 0,1)}}
F([J(),C("design:type",class ImageService{canCompress(t){
return t.endsWith(".jpg")||t.endsWith(".jpeg")||t.endsWith(".png")}compress(t){let e
;if(t.endsWith(".jpg")||t.endsWith(".png"))e=t.slice(0,-4)+".webp";else{if(!t.endsWith(".jpeg"))return Promise.resolve()
;e=t.slice(0,-5)+".webp"}return g.default(t).webp({lossless:!0,force:!0,reductionEffort:6}).toFile(e)}
})],OptimizorBuilder.prototype,"image",void 0),
F([J(),C("design:type",TypeScriptFileSystem)],OptimizorBuilder.prototype,"fs",void 0),
F([J(),C("design:type",TypeScript)],OptimizorBuilder.prototype,"ts",void 0);class NodeProjectBuilder{async build(t){
return await this.compiler.build(t),await this.configurationBuilder.build(t),await this.artifactBuilder.build(t),
await this.packageBuilder.build(t),await this.bundleBuilder.build(t),await this.packageFileBuilder.build(t),
t.shouldCompress&&await this.optimizor.build(t),t}}function wt(){
r.lt(process.version,"12.0.0")?console.log(z("ERROR")):(console.log(),
console.log(z("███████╗ ██████╗  ██████╗   ██████╗  ██████╗")),
console.log(z("██╔════╝ ██╔══██╗ ██╔══██╗ ██╔═══██╗ ██╔══██╗")),
console.log(z("█████╗   ██████╔╝ ██████╔╝ ██║   ██║ ██████╔╝")),
console.log(z("██╔══╝   ██╔══██╗ ██╔══██╗ ██║   ██║ ██╔══██╗")),
console.log(z("███████╗ ██║  ██║ ██║  ██║ ╚██████╔╝ ██║  ██║")),
console.log(z("╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═╝")),console.log())}function bt(t,e=new Date){
const s=(e.getTime()-t.getTime())/1e3
;return s<5?"just now":s<60?`${Math.floor(s)} seconds ago`:s<3600?`${Math.floor(s/60)} minutes ago`:`${(s/3600).toFixed(2)} hours ago`
}F([J(),C("design:type",ConfigurationBuilder)],NodeProjectBuilder.prototype,"configurationBuilder",void 0),
F([J(),C("design:type",ArtifactBuilder)],NodeProjectBuilder.prototype,"artifactBuilder",void 0),
F([J(),C("design:type",PackageBuilder)],NodeProjectBuilder.prototype,"packageBuilder",void 0),
F([J(),C("design:type",PackageFileBuilder)],NodeProjectBuilder.prototype,"packageFileBuilder",void 0),
F([J(),C("design:type",BundleBuilder)],NodeProjectBuilder.prototype,"bundleBuilder",void 0),
F([J(),C("design:type",TypeScriptCompiler)],NodeProjectBuilder.prototype,"compiler",void 0),
F([J(),C("design:type",OptimizorBuilder)],NodeProjectBuilder.prototype,"optimizor",void 0)
;class BuildService extends et{async info(t){const e=[];!function(t){
r.lt(process.version,"12.0.0")?console.log(Z("TSB@"+t)):(console.log(),console.log(Z("████████╗ ███████╗ ██████╗ ")),
console.log(Z("╚══██╔══╝ ██╔════╝ ██╔══██╗")),console.log(Z("   ██║    ███████╗ ██████╔╝")),
console.log(Z("   ██║    ╚════██║ ██╔══██╗")),console.log(Z("   ██║    ███████║ ██████╔╝")),
console.log(Z("   ╚═╝    ╚══════╝ ╚═════╝ "),Z("@"+t)),console.log())}(this.cli.version)
;const s=r.coerce(process.version).version;e.push(["Time",t.timestamp.toISOString()]);const i=t.project,n=i.packageInfo
;e.push(["Package",n.name]);let o=n.version;t.version!==n.version&&(o+=` → ${Z(t.version)}`),e.push(["Version",o])
;const c=this.ts.version;let a="",u=""
;n.dependencies&&n.dependencies.typescript?u=n.dependencies.typescript:n.devDependencies&&n.devDependencies.typescript?u=n.devDependencies.typescript:n.engines&&n.engines.typescript&&(u=n.engines.typescript),
u&&(a=`${c} (require ${u})`,r.satisfies(c,u)||(a=H(a))),e.push(["TypeScript Version",a||c]);let l=""
;if(i.packageInfo.engines){const t=i.packageInfo.engines.node;t&&(l=`${s} (require ${t})`,r.satisfies(s,t)||(l=H(l)))}
e.push(["Node.JS Version",l||s]),e.push(["Configuration",t.configuration]),e.push(["Target",t.target]),
e.push(["Working Path",t.workingDir]),e.push(["Input Path",t.inputDir]),e.push(["Output Path",t.outputDir])
;const h=i.repository,p=null==h?void 0:h.getHead(),d=h?h.getCommit(p):"",f=null==h?void 0:h.getReferenceTime(p)
;if(e.push(["Git Path",h?h.path:""]),
e.push(["Git Branch",h?h.getHead():""]),e.push(["Git Branch Update",f?f.toISOString()+" ("+bt(f,t.timestamp)+")":""]),
e.push(["Git Commit",d||""]),e.push(["Git Commit Short",d?d.slice(-7):""]),e.push(["Git Repository",h?h.getURL():""]),
t.inputDir==t.outputDir)throw new Error("Output dir can not be the same with input dir")
;Reflect.ownKeys(t.tsCompilerOptions)&&e.push(["Compiler Options",t.tsCompilerOptions])
;const g=e.reduce(((t,[e])=>e.length>t?e.length:t),20)
;for(const[t,s]of e)console.log((t.toUpperCase()+" ").padEnd(g+3,"౼"),s)}async printOutputFile(t){
console.log("Generated files....");const e=t.outputDir.length+1,s=this.fs.readDirectory(t.outputDir);for(const t of s){
const s=t.slice(e);console.log("+",s)}}async build(t){return await this.info(t),await this.projectBuilder.build(t),
await this.printOutputFile(t),t}}F([J(),C("design:type",ProjectService)],BuildService.prototype,"project",void 0),
F([J(),C("design:type",NodeProjectBuilder)],BuildService.prototype,"projectBuilder",void 0)
;let Pt=class TypeScriptBundler{async main(){const t=this.cli,e=require("commander")
;e.version(t.version,"-v, --version","Print version information and quit").usage("[options] COMMAND").description("A typescript bundler"),
e.command("info").description("Return information of current project").option("--prod","Sets the build configuration as mangle:1, beautify:1, compress:1, inline:1, configuration:production, target:es2018").option("--rc [rel]",'Same as --prod but add suffix "rc" to release version').option("--dev [rel]",'Same as --prod but add suffix "dev.YYYYMMDD" to release version').option("--insiders [rel]",'Same as --prod but add suffix "insiders.YYYYMMDD" to release version').option("-m, --mangle","Mangle output. default is no").option("-b, --beautify","Beautify output. default is no").option("-c, --compress","Compress output. default is no").option("-i, --inline","Inline devDependencies if requires. default is no").option("--configuration <name>","Sets the build configuration to the giving target. default is development").option("--target <target>","Sets ECMAScript version to build, e.g. es2015, es2016, es2017, es2018, es2019, es2020, es2021. default is es2018").option("--release <rel>","Add suffix -[rel].YYYYMMDD to package version. default no suffix").option("--decorator","Generate decorator. Overwrites settings in tsconfig.json").option("--no-decorator","Do not generate decorator. Overwrites settings in tsconfig.json").option("--metadata","Generate metadata. Overwrites settings in tsconfig.json").option("--no-metadata","Do not generate metadata. Overwrites settings in tsconfig.json").option("--in <input>","Sets the input folder. default is current directory").option("--out <output>","Sets the output folder. default is release").action((async t=>this.build.info(new rt(t)))),
e.command("build",{isDefault:!0
}).description("Build and bundle typescript project").option("--prod","Sets the build configuration as mangle:1, beautify:1, compress:1, inline:1, configuration:production, target:es2018").option("--rc [rel]",'Same as --prod but add suffix "rc" to release version').option("--dev [rel]",'Same as --prod but add suffix "dev.YYYYMMDD" to release version').option("--insiders [rel]",'Same as --prod but add suffix "insiders.YYYYMMDD" to release version').option("-m, --mangle","Mangle output. default is no").option("-b, --beautify","Beautify output. default is no").option("-c, --compress","Compress output. default is no").option("-i, --inline","Inline devDependencies if requires. default is no").option("--configuration <name>","Sets the build configuration to the giving target. default is development").option("--target <target>","Sets ECMAScript version to build, e.g. es2015, es2016, es2017, es2018, es2019, es2020, es2021. default is es2018").option("--release <rel>","Add suffix -[rel].YYYYMMDD to package version. default no suffix").option("--decorator","Generate decorator. Overwrites settings in tsconfig.json").option("--no-decorator","Do not generate decorator. Overwrites settings in tsconfig.json").option("--metadata","Generate metadata. Overwrites settings in tsconfig.json").option("--no-metadata","Do not generate metadata. Overwrites settings in tsconfig.json").option("--in <input>","Sets the input folder. default is current directory").option("--out <output>","Sets the output folder. default is release").action((async t=>this.build.build(new rt(t)).then((t=>{
const e=Date.now()-t.timestamp.getTime();var s
;s=String(e/1e3)+"s",r.lt(process.version,"12.0.0")?console.log(V("OK"),V(s)):(console.log(),
console.log(V(" ██████╗   ██╗  ██╗")),console.log(V("██╔═══██╗  ██║ ██╔╝")),console.log(V("██║   ██║  █████╔╝")),
console.log(V("██║   ██║  ██╔═██╗")),console.log(V("╚██████╔╝  ██║  ██╗")),console.log(V(" ╚═════╝   ╚═╝  ╚═╝"),V(s)),
console.log())})))),e.arguments("<command>").action((t=>{e.outputHelp(),console.log("  "+z(`Unknown command ${H(t)}.`)),
console.log()})),e.on("--help",(()=>{console.log(),console.log(`  Run '${function(...t){
return d.default.cyan(t.join(" "))}("tsb COMMAND --help")}' for more information on a command.`),console.log()})),
e.commands.forEach((t=>t.on("--help",(()=>console.log()))));const s=(t,s)=>{e.Command.prototype[t]=function(...e){
"unknownOption"===t&&this.i||(this.outputHelp(),console.log("  "+z(s(...e))),console.log(),process.exit(1))}}
;s("missingArgument",(t=>`Missing required argument ${H(`<${t}>`)}.`)),
s("unknownOption",(t=>`Unknown option ${H(t)}.`)),
s("optionMissingArgument",((t,e)=>`Missing required argument for option ${H(t.flags)}`+(e?`, got ${H(e)}`:"")));try{
e.parseAsync().catch((function(t){wt(),console.log(z("Build was interrupted")),console.log(z(t.stack||t.message))}))
}catch(t){wt(),console.log(z("Program error")),console.log(z(t.stack||t.message))}}}
;F([J(),C("design:type",Environment)],Pt.prototype,"env",void 0),
F([J(),C("design:type",TypeScript)],Pt.prototype,"ts",void 0),
F([J(),C("design:type",CliService)],Pt.prototype,"cli",void 0),
F([J(),C("design:type",BuildService)],Pt.prototype,"build",void 0),Pt=B([L()],Pt),(new Pt).main();
