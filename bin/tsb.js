#!/usr/bin/env node
/*! ****************************************************************************
             COPYRIGHT 2014-2021 Ling Zhang, ALL RIGHTS RESERVED
***************************************************************************** */
"use strict"
;const t=require("path"),e=require("typescript"),i=require("chalk"),n=require("fs"),s=require("zlib"),r=require("semver"),o=require("os"),c=require("rollup"),a=require("magic-string"),u=require("rollup-plugin-terser"),l=require("prettier"),h=require("sharp")
;function p(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}const f=p(i),d=p(a),m=p(h);
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
class AgentFrameworkError extends Error{}class MemberKinds{}function g(t,e,i,n){
return"function"!=typeof t.beforeDecorate||t.beforeDecorate(e,i,n)}MemberKinds.None=0,MemberKinds.Class=1,
MemberKinds.Static=2,MemberKinds.Property=4,MemberKinds.Parameter=8,MemberKinds.All=65535;class Annotation extends Map{
constructor(){super(),this.attributes=[]}}class Parameter extends Annotation{constructor(t){super(),this.index=t}}
class Property extends Annotation{constructor(t,e,i){super(),this.target=t,this.key=e,i&&(this.descriptor=i)}}
function y(t,e,i,n){const s=Reflect.getOwnPropertyDescriptor(t,i);let r;return s?r=s.value:t[i]=r=new Property(e,i,n),r}
class AgentFramework extends WeakMap{get name(){return"agentframework"}get version(){return"2.0.0-rc.20210814"}
get timestamp(){return"2021-08-14T07:08:10.063Z"}constructor(){super()
;const t=Reflect,e="metadata",i=t[e]&&t[e].bind(t),n=this;t.set(t,e,(function(t,e){return function(s,r,o){let c,a
;return 1===arguments.length?(c=s.prototype,a="constructor"):(c=s,a=r),y(n.add(c),c,a,o).set(t,e),i&&i(t,e)(s,r,o)}})),
t[e].now=Date.now(),this.set(this,new Map)}[Symbol.for("Deno.symbols.customInspect")](){
return this.name+"@"+this.version}[Symbol.for("nodejs.util.inspect.custom")](){return this.name+"@"+this.version}
set(t,e){return super.set(t,e),e}add(t){const e=this.get(t);if(e)return e
;if(t===Function.prototype)return this.set(t,Object.create(null));const i=Reflect.getPrototypeOf(t)
;return this.set(t,Object.create(i&&this.add(i)))}}
const v=Function("_","return ((_,__)=>this[_]||(this[_]=new __()))(Symbol.for(_.name),_)")(AgentFramework)
;function w(t,e,i,n){null===n&&(n=Reflect.getOwnPropertyDescriptor(e,i));let s=n
;for(let r=t.length-1;r>=0;r--)s=t[r](e,i,s||n);s&&Reflect.defineProperty(e,i,s)}function S(t,e){
for(let i=t.length-1;i>=0;i--)e=t[i](e)||e;return e}function b(t,e){return function(i,n,s){n||(i=i.prototype,
n="constructor"),y(v.add(i),i,n,s).set(t,e)}}function P(t,e){y(v.add(e),e,"constructor").attributes.push(t)}
function D(t,e,i,n){y(v.add(e),e,i,n).attributes.push(t)}function I(t){return(e,i,n)=>{g(t,e,i,n)&&D(t,e,i,n)}}
function x(t,e,i){Reflect.defineProperty(t,e,i)}function j(t,e,i){let n=v.get(v);const s=t.name+"."+e;let r=n.get(s)
;return r||n.set(s,r=Reflect.construct(i||WeakMap,[])),x(t,e,{value:r}),r}class Types{static get v1(){
return j(this,"v1",Map)}}class Invocations{static get v1(){return j(this,"v1",Map)}}class Interceptors{static get v1(){
return j(this,"v1",Map)}}function M(t){const e=t.interceptor
;if(e&&"object"==typeof e&&"function"==typeof e.intercept)return e;const i=Interceptors.v1.get(t.constructor)
;return i?Reflect.construct(i[0],[t,i[1]]):void 0}function k(t){
return!!Reflect.has(t,"interceptor")||Interceptors.v1.has(t.constructor)}class OnDemandMemberInfo{constructor(t,e){
this.target=t,this.key=e}get name(){return this.key.toString()}get declaringType(){
return"object"==typeof this.target?this.target.constructor:this.target}get propertyAnnotationOrUndefined(){
const t=v.get(this.target);if(!t)return;const e=Reflect.getOwnPropertyDescriptor(t,this.key);return e?e.value:void 0}
hasOwnAttribute(t){const e=this.annotation;if(e){const i=e.attributes;if(i.length)return!t||i.some((e=>e instanceof t))}
return!1}getOwnAttribute(t){const e=this.annotation;if(e){const i=e.attributes
;if(i.length)return i.filter((e=>e instanceof t))[0]}}getOwnAttributes(t){const e=this.annotation;if(e){
const i=e.attributes;if(i.length)return t?i.filter((e=>e instanceof t)):i.slice(0)}return[]}findOwnAttributes(t,e){
const i=this.annotation,n=[];if(i){const s=i.attributes;if(s.length)for(const i of s)t(i,e)&&n.push(i)}return n}
hasOwnInterceptor(){const t=this.annotation;if(t){const e=t.attributes;if(e&&e.length)return e.some(k)}return!1}
getOwnMetadata(t){const e=this.annotation
;return e&&e.has(t)?e.get(t):Reflect.getOwnMetadata?Reflect.getOwnMetadata(t,this.declaringType.prototype,this.key):void 0
}}class OnDemandParameterInfo extends OnDemandMemberInfo{constructor(t,e,i,n){super(t,e),this.index=i,this.parent=n}
get name(){return this.index.toString()}get kind(){
return"function"==typeof this.target?MemberKinds.Static|MemberKinds.Parameter:MemberKinds.Parameter}get type(){
const t=this.parent.getParameterTypes();if(Array.isArray(t)&&t.length)return t[this.index]}addAttribute(t){
!function(t,e,i,n){(function(t,e){const i=t.parameters||(t.parameters=new Map);let n=i.get(e)
;return n||i.set(e,n=new Parameter(e)),n})(y(v.add(e),e,i),n).attributes.push(t)}(t,this.target,this.key,this.index)}
get annotation(){const t=this.propertyAnnotationOrUndefined;return t&&t.parameters&&t.parameters.get(this.index)}}
class OnDemandPropertyInfo extends OnDemandMemberInfo{get descriptor(){let t;const e=this.annotation
;return e&&(Reflect.has(e,"descriptor")?t=e.descriptor:(t=Reflect.getOwnPropertyDescriptor(this.declaringType.prototype,this.key),
e.descriptor=t)),t}get kind(){
return"function"==typeof this.target?MemberKinds.Static|MemberKinds.Property:MemberKinds.Property}get type(){
const t=this.getOwnMetadata("design:type")
;return t&&t.prototype===Function.prototype&&this.descriptor?this.getOwnMetadata("design:returntype"):t}
get annotation(){return this.propertyAnnotationOrUndefined}hasInterceptor(){const t=this.annotation;if(!t)return!1
;if(t.attributes&&t.attributes.length&&t.attributes.some(k))return!0
;if(t.parameters&&t.parameters.size)for(const e of t.parameters.values()){const t=e.attributes
;for(const e of t)if(k(e))return!0}return!1}parameter(t){this.parameters||(this.parameters=new Map)
;let e=this.parameters.get(t);return e||(e=new OnDemandParameterInfo(this.target,this.key,t,this),
this.parameters.set(t,e)),e}getParameter(t){const e=this.annotation
;if(e&&e.parameters&&e.parameters.has(t))return this.parameter(t)}getParameterTypes(){
return this.getOwnMetadata("design:paramtypes")}getParameters(){const t=new Array,e=this.annotation
;if(e&&e.parameters&&e.parameters.size){const i=[];for(const t of e.parameters.keys())i.push(t)
;for(const e of i.sort())t.push(this.parameter(e))}return t}addAttribute(t){D(t,this.target,this.key)}}function C(t,e){
Types.v1.set(t,e),Types.v1.set(t.prototype,e.prototype)}function F(t){return Types.v1.get(t)}class TypeInfos{
static get v1(){return j(this,"v1",Map)}}class OnDemandTypeInfo extends OnDemandPropertyInfo{static find(t){
const e=F(t)||t,i=TypeInfos.v1.get(e);if(i)return i;const n=new OnDemandTypeInfo(e);return TypeInfos.v1.set(e,n),n}
constructor(t){super(t,"constructor")}get static(){return OnDemandTypeInfo.find(this.declaringType)}get prototype(){
return OnDemandTypeInfo.find(this.declaringType.prototype)}get type(){return this.declaringType}get name(){
return this.type.name}get kind(){
return"function"==typeof this.target?MemberKinds.Static|MemberKinds.Class:MemberKinds.Class}get descriptor(){
return Reflect.getOwnPropertyDescriptor(this.declaringType.prototype,this.key)}get base(){
const t=Reflect.getPrototypeOf(this.target);if(t&&t!==Function.prototype&&t!==Object.prototype&&!function(t){
const e=Types.v1.get(t);return!!e&&e!==t}(t))return OnDemandTypeInfo.find(t)}get types(){const t=[];let e=this;do{
t.push(e),e=e.base}while(e);return t}property(t){return new OnDemandPropertyInfo(this.target,t)}hasOwnProperties(){
const t=this.typeAnnotationOrUndefined;if(!t)return!1;for(const e of Reflect.ownKeys(t))if("constructor"!==e)return!0
;return!1}getOwnProperties(){const t=new Array,e=this.typeAnnotationOrUndefined;if(!e)return t
;for(const i of Reflect.ownKeys(e))"constructor"!==i&&t.push(this.property(i));return t}getOwnProperty(t){
const e=this.typeAnnotationOrUndefined;if(e)return Reflect.getOwnPropertyDescriptor(e,t)?this.property(t):void 0}
getProperty(t){const e=Reflect.get(this.typeAnnotation,t)
;if(e)return e.target===this.target?this.getOwnProperty(t):OnDemandTypeInfo.find(e.target).getOwnProperty(t)}
findOwnProperties(t,e){const i=new Array;for(const n of this.getOwnProperties())t(n,e)&&i.push(n);return i}
findProperties(t,e){const i=new Map;for(const n of this.types){const s=n.findOwnProperties(t,e);s.length&&i.set(n,s)}
return i}findTypes(t,e){if(!t)return this.types.slice(0);const i=new Array;for(const n of this.types)t(n,e)&&i.push(n)
;return i}addAttribute(t){P(t,this.target)}get typeAnnotation(){return v.add(this.target)}
get typeAnnotationOrUndefined(){return v.get(this.target)}getOwnMetadata(t){const e=this.annotation
;return e&&e.has(t)?e.get(t):Reflect.getOwnMetadata?Reflect.getOwnMetadata(t,this.declaringType):void 0}}
class InterceptorInvocation{constructor(t,e){this.t=t,this.o=e}get design(){return this.t.design}invoke(t,e){
return this.o.intercept(this.t,t,e)}}class ConstructorInvocation{constructor(t,e){this.target=t,this.i=e}get design(){
return this.i}invoke(t,e){return Reflect.construct(this.target,t,e)}}class ChainFactory{
static chainInterceptorAttributes(t,e){if(e.length)for(const i of e){const e=M(i);e&&(t=new InterceptorInvocation(t,e))}
return t}}class DirectMethodInvocation{constructor(t,e){this.design=t,this.target=e}invoke(t,e){
return Reflect.apply(this.target,e,t)}}class DirectParameterInvocation{constructor(t){this.design=t}invoke(t,e){
return t[this.design.index]}}class ParameterInterceptor{constructor(t){this.property=t}get invocations(){
const t=new Map,e=this.property.getParameters();for(const i of e){const e=i.index,n=i.findOwnAttributes(k);if(n.length){
const s=new DirectParameterInvocation(i);t.set(e,ChainFactory.chainInterceptorAttributes(s,n))}}const i=t.size?t:void 0
;return x(this,"invocations",{value:i}),i}intercept(t,e,i){const n=this.invocations;if(n){
const s=Array.prototype.slice.call(e,0);for(const[t,r]of n.entries())s[t]=r.invoke(e,i);return t.invoke(s,i)}
return t.invoke(e,i)}}class GetterSetterInvocation{constructor(t){this.design=t}invoke(t,e){if(t.length){
if(null==e)throw new AgentFrameworkError("InvalidReceiver");const i=t[0];return x(e,this.design.key,{value:i,
writable:!0,configurable:!0}),i}return t[0]}}class OnDemandClassCompiler{static findPropertyInterceptors(t){
return t.findOwnAttributes(k)}static createConstructorInterceptor(t){
const e=t.design,i=e.findTypes().map((t=>t.findOwnAttributes(k))),n=[].concat(...i),s=ChainFactory.chainInterceptorAttributes(t,n)
;return new InterceptorInvocation(s,new ParameterInterceptor(e))}static makeField(t,e){const i=t.key;return{get(){
const n=new GetterSetterInvocation(t),s=OnDemandClassCompiler.findPropertyInterceptors(t),r=ChainFactory.chainInterceptorAttributes(n,s),o={
get(){return r.invoke([],this)},set(){o.set=function(){r.invoke(arguments,this)},x(e.prototype,i,o),
r.invoke(arguments,this)},configurable:!0};return x(e.prototype,i,o),r.invoke([],this)},set(n){
const s=new GetterSetterInvocation(t),r=OnDemandClassCompiler.findPropertyInterceptors(t),o=ChainFactory.chainInterceptorAttributes(s,r),c={
get(){return c.get=function(){return o.invoke([],this)},x(e.prototype,i,c),o.invoke([],this)},set(){
return o.invoke(arguments,this)},configurable:!0};return x(e.prototype,i,c),o.invoke(arguments,this)},configurable:!0}}
static makeProperty(t,e,i){const n=t.key,s=Object.create(e);s.configurable=!0;const r=e.value,o=e.get,c=e.set
;if(null!=r)s.value=function(){
const e=new DirectMethodInvocation(t,r),o=OnDemandClassCompiler.findPropertyInterceptors(t),c=new InterceptorInvocation(ChainFactory.chainInterceptorAttributes(e,o),new ParameterInterceptor(t))
;return s.value=function(){return c.invoke(arguments,this)},x(i.prototype,n,s),c.invoke(arguments,this)
};else if(null!=o)null!=c?(s.get=function(){
const e=new DirectMethodInvocation(t,o),s=OnDemandClassCompiler.findPropertyInterceptors(t),r=ChainFactory.chainInterceptorAttributes(e,s),a={
get(){return r.invoke([void 0],this)},set(e){
const s=new DirectMethodInvocation(t,c),r=OnDemandClassCompiler.findPropertyInterceptors(t),o=ChainFactory.chainInterceptorAttributes(s,r)
;a.set=function(){o.invoke(arguments,this)},x(i.prototype,n,a),o.invoke(arguments,this)},configurable:!0}
;return x(i.prototype,n,a),r.invoke([void 0],this)},s.set=function(){
const e=new DirectMethodInvocation(t,c),s=OnDemandClassCompiler.findPropertyInterceptors(t),r=ChainFactory.chainInterceptorAttributes(e,s),a={
get(){
const e=new DirectMethodInvocation(t,o),s=OnDemandClassCompiler.findPropertyInterceptors(t),r=ChainFactory.chainInterceptorAttributes(e,s)
;return a.get=function(){return r.invoke([void 0],this)},x(i.prototype,n,a),r.invoke([void 0],this)},set(){
return r.invoke(arguments,this)},configurable:!0};return x(i.prototype,n,a),r.invoke(arguments,this)}):s.get=function(){
const e=new DirectMethodInvocation(t,o),r=OnDemandClassCompiler.findPropertyInterceptors(t),c=ChainFactory.chainInterceptorAttributes(e,r)
;return s.get=function(){return c.invoke([void 0],this)},x(i.prototype,n,s),c.invoke([void 0],this)};else{
if(null==c)throw new AgentFrameworkError("InvalidEmptyProperty: "+t.declaringType.name+"."+n.toString())
;s.set=function(){
const e=new DirectMethodInvocation(t,c),r=OnDemandClassCompiler.findPropertyInterceptors(t),o=ChainFactory.chainInterceptorAttributes(e,r)
;return s.set=function(){return o.invoke(arguments,this)},x(i.prototype,n,s),o.invoke(arguments,this)}}return s}
static upgrade(t,e,i,n){const s={};for(const t of e){const e=t.descriptor
;s[t.key]=e?OnDemandClassCompiler.makeProperty(t,e,n||i):OnDemandClassCompiler.makeField(t,n||i)}
return Object.defineProperties(t,s),s}}class AgentAttribute{get interceptor(){return this}intercept(t,[e,i,n],s){
const r=`return class ${i}$ extends ${i}`,o=new Proxy(s,n);C(o,s);const c=t.invoke([Function,i,r,"agent code"],o)
;return C(c,s),c}construct(t,e,i){let n=Invocations.v1.get(t);if(!n){const e=function(t){
if("function"==typeof t)return OnDemandTypeInfo.find(t.prototype)
;if(null==t)throw new AgentFrameworkError("NotSupported: Reflector(null) is not supported");if("object"==typeof t){
if(Reflect.getOwnPropertyDescriptor(t,"constructor"))return OnDemandTypeInfo.find(t)
;throw new AgentFrameworkError(`NotImplemented: Reflector(${t.constructor.name} {}) is not implemented yet`)}
throw new AgentFrameworkError(`NotSupported: Reflector(${typeof t}) is not supported`)
}(t),s=e.findProperties((t=>t.hasInterceptor())),r=[];if(s.size)for(const t of s.values())r.push(...t);if(r.length){
if(t===i)throw new AgentFrameworkError("InvalidTarget");const e=function(t,e){const i=t.prototype;let n=e.prototype
;const s=[];for(;n;)if(s.unshift(n.constructor),n=Reflect.getPrototypeOf(n),n===i)return s;return[]}(t,i)
;OnDemandClassCompiler.upgrade(e[0].prototype,r,e[0],e[1])}const o=new ConstructorInvocation(t,e)
;n=OnDemandClassCompiler.createConstructorInterceptor(o),Invocations.v1.set(t,n)}return n.invoke(e,i)}}
class AgentInvocation{constructor(t){this.design=t}invoke([t,e,i,n],s){
return"string"!=typeof i?s:Reflect.construct(t,[e,i+` { /* [${n}] */ }`])(s)}}class Agents{static get v1(){
return j(this,"v1",Map)}}class Domains{static get v1(){return j(this,"v1",Map)}}class DomainAgents{static get v1(){
return j(this,"v1",Map)}}class Initializers{static get v1(){return j(this,"v1",Map)}}function E(t,e){Domains.v1.set(t,e)
}class Domain{constructor(){E(this,this)}static construct(t,e){return Reflect.construct(t,e)}}function A(t){
return Domains.v1.get(t)}function O(t){return t instanceof Promise}function B(t){return"function"==typeof t}
function T(t){return"object"==typeof t&&!!t&&B(t.lift)&&B(t.subscribe)}
class DomainAgentAttribute extends AgentAttribute{intercept(t,e,i){const n=e[1];let s=(r=i,Agents.v1.get(r));var r
;s||(s=super.intercept(t,e,i),function(t,e){Agents.v1.set(t,e)}(i,s));const o=`return class ${s.name} extends ${n}`
;return t.invoke([Function,n,o,"domain agent code"],s)}}function R(t,e,i){let n=DomainAgents.v1.get(e);n||(n=new Map,
DomainAgents.v1.set(e,n)),n.set(t,i)}
const $=Symbol.for("AgentFramework.Initializer"),_=Symbol.for("AgentFramework.ClassInitializer");function N(t,e,i){
const n=A(i)||i&&A(i.constructor);if(n)return n}function U(t){const e=Initializers.v1,i=e.get(t);if(i)return i
;const n=[];let s=t.prototype;for(;s&&s.constructor!==Object;){const t=Reflect.getOwnPropertyDescriptor(s,$)
;t&&"function"==typeof t.value&&n.unshift([t.value,s.constructor]),s=Reflect.getPrototypeOf(s)}if(n.length){
const t=new Array;for(const i of n){const n=i[1];t.push(i),e.has(n)||e.set(n,t.slice())}}return e.set(t,n),n}
class InitializableAttribute{get interceptor(){return this}intercept(t,e,i){let n;const s=t.design.declaringType,r=s[_]
;if(r){if("function"!=typeof r)throw new AgentFrameworkError("ClassInitializerMustFunction");{const o=N(0,0,i),c={
get design(){return t.design},invoke(e,i){const n=t.invoke(e,i),r=U(s)
;if(r.length)for(const t of r)Reflect.apply(t[0],n,e);return n}};n=Reflect.apply(r,s,[o,c,e,i])}}else{n=t.invoke(e,i)
;const r=U(s);for(const t of r)Reflect.apply(t[0],n,e)}return n}}function q(t,e,i){const n=A(e)
;if(n&&t!==n)throw new AgentFrameworkError("NotSupportCreateAgentForOtherDomain")
;(e[_]||e.prototype[$])&&P(new InitializableAttribute,e.prototype);const s=function(t,e){const i=F(t)||t
;if(!i.name)throw new AgentFrameworkError("InvalidClassName")
;const n=e||Reflect.construct(AgentAttribute,[t]),s=OnDemandTypeInfo.find(i);let r=new AgentInvocation(s)
;if(s.hasOwnInterceptor()){const t=s.findOwnAttributes(k);r=ChainFactory.chainInterceptorAttributes(r,t)}
const o=function(t,e,i){let n=t;if(g(e,i)){const t=M(e);t&&(n=new InterceptorInvocation(n,t))}return n
}(r,n,i).invoke([Function,i.name,n],i);return C(o,i),o
}(e,i||t.getAgent(DomainAgentAttribute)||Reflect.construct(t.getType(DomainAgentAttribute)||DomainAgentAttribute,[t]))
;return E(s,t),E(s.prototype,t),R(t,e,s),R(t,s,s),s}function Y(t,e){const i=DomainAgents.v1.get(e)
;return i?i.get(t):void 0}class InMemory{static types(t){let e=this.u.get(t);return e||(e=new Map,this.u.set(t,e)),e}
static agents(t){let e=this.h.get(t);return e||(e=new Map,this.h.set(t,e)),e}static incomingAgents(t){
let e=this.l.get(t);return e||(e=new Map,this.l.set(t,e)),e}}InMemory.u=new WeakMap,InMemory.h=new WeakMap,
InMemory.l=new WeakMap;class InMemoryDomain extends Domain{get name(){return this.constructor.name}getAgent(t){
return InMemory.agents(this).get(t)}getType(t){return InMemory.types(this).get(t)}construct(t,e,i){const n=!i;if(n){
const e=this.getAgent(t);if(void 0!==e)return e}
const s=this.getType(t)||t,r=Y(this,s)||q(this,s),o=Reflect.construct(r,e||[])
;if(O(o))throw new AgentFrameworkError("NotAllowConstructPromiseObject")
;if(T(o))throw new AgentFrameworkError("NotAllowConstructObservableObject");return n&&this.addAgent(s,o),o}
resolve(t,e,i){try{const n=InMemory.incomingAgents(this),s=!i;if(s){const e=this.getAgent(t)
;if(void 0!==e)return Promise.resolve(e);const i=n.get(t);if(i)return i}
const r=this.getType(t)||t,o=Y(this,r)||q(this,r),c=Reflect.construct(o,e||[]);if(O(c))return s&&n.set(r,c),
c.then((t=>(s&&(this.addAgent(r,t),n.delete(r)),t)),(t=>{throw i||n.delete(r),t}))
;if(T(c))throw new AgentFrameworkError("NotSupportResolveObservableObject");return i||this.addAgent(r,c),
Promise.resolve(c)}catch(t){return Promise.reject(t)}}addType(t){let e=t;const i=InMemory.types(this)
;for(;e&&!i.has(e)&&Function.prototype!==e;)i.set(e,t),e=Reflect.getPrototypeOf(e)}addAgent(t,e){
const i=InMemory.agents(this);if("function"==typeof t){let n=t;for(;n&&!i.has(n)&&Function.prototype!==n;)i.set(n,e),
n=Reflect.getPrototypeOf(n)}else i.set(t,e)}setType(t,e){InMemory.types(this).set(t,e)}setAgent(t,e){
InMemory.agents(this).set(t,e)}removeType(t){InMemory.types(this).delete(t)}removeAgent(t,e){
const i=InMemory.agents(this);return!(!i.has(t)||i.get(t)!==e||(i.delete(t),0))}dispose(){if(this.disposed)return
;const t=InMemory.incomingAgents(this),e=InMemory.agents(this);this.disposing=!0;for(const e of t.values())e.then((t=>{
"object"==typeof t&&null!=t&&"function"==typeof t.dispose&&t.dispose()}))
;for(const t of e.values())"object"==typeof t&&null!=t&&"function"==typeof t.dispose&&t.dispose();t.clear(),e.clear(),
InMemory.types(this).clear(),this.disposed=!0}}class SingletonAttribute{constructor(t){this.type=t}get interceptor(){
return this}intercept(t,e,i){const n=this.type,s=t.design&&t.design.type,r=n||s
;if(!r)throw new AgentFrameworkError("UnknownSingletonType");const o=N(0,0,i)
;if(!o)throw new AgentFrameworkError("NoDomainFoundForSingletonInjection")
;const c=n&&o.getAgent(n)||s&&o.getAgent(s)||o.construct(r,e);return t.invoke([c],i)}}function L(t){
return I(new SingletonAttribute(t))}class RegisterDomainAgentAttribute{constructor(t){this.domain=t}get interceptor(){
return this}intercept(t,e,i){const n=t.invoke(e,i);return this.domain.addAgent(i,n),n}}function J(){return t=>{
const e=function(){const t=Domains.v1,e=t.get(t);if(e)return e;const i=Reflect.construct(InMemoryDomain,[])
;return Reflect.defineProperty(i,"name",{value:"SystemDomain"}),t.set(t,i),i}(),i=e.getType(t)||t
;return Y(e,i)||(P(new RegisterDomainAgentAttribute(e),i.prototype),e.addType(i),q(e,i))}}
const z="tslib",K=["assert","async_hooks","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","http2","https","inspector","module","net","os","path","perf_hooks","process","punycode","querystring","readline","repl","stream","string_decoder","timers","tls","trace_events","tty","url","util","v8","vm","zlib"]
;function G(i,n){const s=e.findConfigFile(i,e.sys.fileExists,t.join("node_modules",n,"package.json"));if(!s)return
;const r=require(s);return r.path=s,r}function W(...t){return f.default.red(t.join(" "))}function V(...t){
return f.default.yellow(t.join(" "))}function H(...t){return f.default.green(t.join(" "))}function Z(...t){
return f.default.white(t.join(" "))}function Q(t,e){return`(${t} → ${e}) ${i=Math.floor(e/t*100),
i>150?W(String(i)+"%"):i>100?V(String(i)+"%"):i>80?Z(String(i)+"%"):i>0?H(String(i)+"%"):""}`;var i}function X(i){
const n=e.findConfigFile(i,e.sys.fileExists,"package.json");if(n)return t.dirname(n)}class Environment{constructor(){
this.workingDir=e.sys.getCurrentDirectory();const t=X(this.workingDir)
;if(!t)return console.log(W("Please run this command inside node.js project directory")),void process.exit(1)
;this.homeDir=t;const i=X(function(t=2){const{stackTraceLimit:e}=Error;Error.stackTraceLimit=t;const i={}
;if(Error.captureStackTrace(i),
Error.stackTraceLimit=e,"string"!=typeof i.stack)throw new Error("Unexpected stacktrace format:"+typeof i.stack)
;const n=i.stack.split("\n"),s=n[n.length-1],r=s.indexOf("("),o=s.lastIndexOf(")");let c
;c=r>0&&o>0?s.slice(r+1,o):s.slice(s.indexOf("at")+3);const a=c.lastIndexOf(":"),u=c.lastIndexOf(":",a-1)
;return c.slice(0,u)}());if(!i)return console.log(W("Please reinstall tsb")),void process.exit(2);this.baseDir=i}}
class TypeScript{constructor(i){this.info=i,this.runtime=function(i){
if(!i.main)throw new Error("Package main not find: "+t.join(i.path,"package.json"))
;const n=t.resolve(t.dirname(i.path),i.main);if(!e.sys.fileExists(n))throw new Error("File not find: "+n)
;return require(n)}(i);const n=this.runtime.sys;this.formatDiagnosticsHost={getCanonicalFileName:t=>t,
getCurrentDirectory:n.getCurrentDirectory,getNewLine:()=>n.newLine}}get ScriptTarget(){return this.runtime.ScriptTarget}
get ModuleKind(){return this.runtime.ModuleKind}get version(){return this.info.version}static[_](t,e,i,n){
const s=G(t.construct(Environment).baseDir,"typescript");if(!s)throw new Error("Unable to locate typescript module")
;return e.invoke([s],n)}readFile(t){return this.runtime.readConfigFile(t,this.runtime.sys.readFile)}resolve(e,i){
return t.resolve(e,i)}formatDiagnostics(t){
return this.runtime.formatDiagnosticsWithColorAndContext(t,this.formatDiagnosticsHost)}}class CliService{get name(){
return"typescript-bundler"}get version(){return"1.0.0-rc.5"}get timestamp(){return"2021-08-17T01:10:01.491Z"}}
function tt(e){const i=[];let n=e;for(;n;){i.push(n);const e=t.dirname(n);if(e===n)break;n=e}return i.reverse()}
class TypeScriptFileSystem{constructor(t){this.sys=t.sys,this.runtime=t}static[_](t,e,i,n){
const s=t.construct(TypeScript);return e.invoke([s.runtime],n)}get args(){return this.sys.args}get newLine(){
return this.sys.newLine}get useCaseSensitiveFileNames(){return this.sys.useCaseSensitiveFileNames}mkdir(t){const e=tt(t)
;for(const t of e)this.directoryExists(t)||this.createDirectory(t)}copy(e,i){this.mkdir(t.dirname(i)),
n.copyFileSync(e,i)}exists(t,...e){if(e.length){const i=this.resolvePath(t,...e)
;return this.sys.fileExists(i)||this.sys.directoryExists(i)}return this.sys.fileExists(t)||this.sys.directoryExists(t)}
rename(t,e){n.renameSync(t,e)}chmod(t,e){n.chmodSync(t,e)}prependLine(t,e){let i=this.sys.readFile(t)
;this.sys.writeFile(t,e+this.sys.newLine+i)}appendLine(t,e){let i=this.sys.readFile(t)
;this.sys.writeFile(t,i+this.sys.newLine+e)}name(e){return e.slice(0,-t.extname(e).length)}canCompress(t){
return!t.endsWith(".gz")&&!t.endsWith(".br")&&!t.endsWith(".webp")}compressGzip(t){
const e=t+".gz",i=s.createGzip(),r=n.createReadStream(t),o=n.createWriteStream(e);return r.pipe(i).pipe(o),
Promise.resolve()}compressBrotli(t){
const e=t+".br",i=s.createBrotliCompress(),r=n.createReadStream(t),o=n.createWriteStream(e);return r.pipe(i).pipe(o),
Promise.resolve()}createDirectory(t){this.sys.createDirectory(t)}directoryExists(t,...e){
return e.length?this.sys.directoryExists(this.resolvePath(t,...e)):this.sys.directoryExists(this.resolvePath(t))}
exit(t){this.sys.exit(t)}fileExists(t,...e){
return e.length?this.sys.fileExists(this.resolvePath(t,...e)):this.sys.fileExists(this.resolvePath(t))}
getCurrentDirectory(){return this.sys.getCurrentDirectory()}getDirectories(t){return this.sys.getDirectories(t)}
getExecutingFilePath(){return this.sys.getExecutingFilePath()}readDirectory(t,e,i,n,s){
return this.sys.readDirectory(t,e,i,n,s)}joinPath(e,i,...n){return t.join(e,i,...n)}resolvePath(e,...i){
if(!t.isAbsolute(e))throw new Error('Please use "joinPath" for relative pathname: '+e)
;return i.length?this.sys.resolvePath(t.join(e,...i)):this.sys.resolvePath(e)}resolvePathUp(e,i,...n){
if(!t.isAbsolute(e))throw new Error('Please use "joinPath" for relative pathname: '+e)
;return n.length?this.runtime.findConfigFile(e,this.exists.bind(this),t.join(i,...n)):this.runtime.findConfigFile(e,this.exists.bind(this),i)
}readFile(t,e){return this.sys.readFile(t,e)}write(t){this.sys.write(t)}writeFile(t,e,i){this.sys.writeFile(t,e,i)}}
class Service{construct(t,e,i){const n=A(this.constructor);if(!n)throw new Error("Domain not found")
;return n.construct(t,e,!0)}}w([L(),b("design:type",Environment)],Service.prototype,"env",void 0),
w([L(),b("design:type",TypeScript)],Service.prototype,"ts",void 0),
w([L(),b("design:type",TypeScriptFileSystem)],Service.prototype,"fs",void 0),
w([L(),b("design:type",CliService)],Service.prototype,"cli",void 0),
w([L(),b("design:type",Domain)],Service.prototype,"domain",void 0);class PackageInfoParser{read(t){
const e=this.ts.readFile(t);if(e.error&&console.log(this.ts.formatDiagnostics([e.error])),e.config){const i=e.config
;return i.path=t,i}}write(t,e){this.fs.writeFile(t,JSON.stringify(e))}}
w([L(),b("design:type",TypeScript)],PackageInfoParser.prototype,"ts",void 0),
w([L(),b("design:type",TypeScriptFileSystem)],PackageInfoParser.prototype,"fs",void 0);class IniFileParser{read(t){
const e=this.fs.readFile(t,"utf-8");if(e)return require("ini").parse(e)}write(t,e){
this.fs.writeFile(t,require("ini").stringify(e))}}
w([L(),b("design:type",TypeScriptFileSystem)],IniFileParser.prototype,"fs",void 0)
;let et=class Repository extends Service{constructor(t){
if(super(),!t||!this.fs.fileExists(t,"HEAD"))throw new Error("Invalid repository path");this.path=t}getType(){
return"git"}getBranch(){const t=this.fs.readFile(this.fs.resolvePath(this.path,"HEAD"))
;if(t&&t.length>4)return t.slice(4).trim()}getCommit(t){if(t){const e=this.fs.readFile(this.fs.resolvePath(this.path,t))
;if(e&&e.length>4)return e.trim()}}getURL(){var t;const e=this.ini.read(this.fs.resolvePath(this.path,"config"))
;if(e)return null===(t=e['remote "origin"'])||void 0===t?void 0:t.url}}
;w([L(),b("design:type",IniFileParser)],et.prototype,"ini",void 0),et=S([J(),b("design:paramtypes",[String])],et)
;class ModuleService extends Service{getModuleByNameDirectory(e,i){let n=this.searchPackageJsonByDirectory(e,i);if(n){
const e=this.parser.read(n);if(e)return{info:e,path:t.dirname(n)}}}searchPackageJsonByDirectory(t,e){
return this.ts.runtime.findConfigFile(e,this.ts.runtime.sys.fileExists,this.fs.joinPath("node_modules",t,"package.json"))
}}w([L(),b("design:type",PackageInfoParser)],ModuleService.prototype,"parser",void 0)
;class CachedModuleService extends ModuleService{constructor(){super(...arguments),this.cache=new Map}
resolveModule(t,e){if(this.cache.has(t))return this.cache.get(t);const i=this.getModuleByNameDirectory(t,e);if(i){
const e={id:i.info.name,version:i.info.version,path:i.path,sideEffect:i.info.sideEffects,type:i.info.type}
;if(i.info.main){const t=this.fs.resolvePath(i.path,i.info.main);this.fs.fileExists(t)&&(e.main=t)}if(i.info.module){
const t=this.fs.resolvePath(i.path,i.info.module);this.fs.fileExists(t)&&(e.module=t)}
const n=i.info.typings||i.info.types;if(n){const t=this.fs.resolvePath(i.path,n);this.fs.fileExists(t)&&(e.types=t)}
return this.cache.set(t,e),this.cache.set(e.id,e),e}}resolveSideEffectsFreeModule(t,e){const i=this.resolveModule(t,e)
;if(i&&!1===i.sideEffect)return i}}let it=class Project extends Service{constructor(t,e){if(super(),
!t)throw new Error("Invalid project path");if(this.path=t,!e)throw new Error("Invalid project info");this.packageInfo=e
;const i=this.dependentModules=new Set;if(e.dependencies)for(const t of Object.keys(e.dependencies))i.add(t)
;const n=this.devDependentModules=new Set;if(e.devDependencies)for(const t of Object.keys(e.devDependencies))n.add(t)
;const s=this.getExternalPackageNames();this.importModuleNames=[...K,...s],this.inlineModuleNames=new Map
;const r=this.getDevelopmentPackageNames();for(const t of r){const e=this.cachedModuleService.resolveModule(t,this.path)
;e&&!1===e.sideEffect&&("module"===e.type&&e.main?this.inlineModuleNames.set(t,e.main):e.module&&this.inlineModuleNames.set(t,e.module))
}this.importTypeModuleNames=[]}get repository(){return this.p||(this.p=this.repositoryService.findRepository(this.path))
}isDevelopmentModule(t){return this.devDependentModules.has(t)}find(t,e){
return this.fs.readDirectory(this.ts.resolve(this.path,t),e,void 0,void 0,1)}findBinFiles(e){
const{bin:i}=this.packageInfo;if(i){const t=this.path;return Object.keys(i).map((e=>{const n=i[e]
;return[this.fs.name(n),this.fs.resolvePath(t,n),e]}))}
return this.find(e,["ts"]).filter((t=>!t.endsWith(".d.ts"))).map((i=>{const n=t.basename(i).slice(0,-3)
;return[this.fs.joinPath(e,n),i,n]}))}findLibraryFiles(e){
return this.find(e,["ts"]).filter((t=>!t.endsWith(".d.ts"))).map((i=>[this.fs.joinPath(e,t.basename(i).slice(0,-3)),i]))
}findMainFile(){if(this.packageInfo.main){
const e=this.packageInfo.main.slice(0,0-t.extname(this.packageInfo.main).length),i=this.fs.resolvePath(this.path,this.packageInfo.main)
;if(this.fs.fileExists(i))return[e,this.fs.resolvePath(this.path,this.packageInfo.main)]
;throw new Error("File not exists: "+i)}console.log("no main, check index")
;const e=this.fs.resolvePath(this.path,"index.ts");if(this.fs.fileExists(e))return["index",e]
;const i=this.fs.resolvePath(this.path,"lib","index.ts")
;return this.fs.fileExists(i)?[this.fs.joinPath("lib","index"),i]:void 0}getExternalPackageNames(){const t=[]
;for(const e of this.dependentModules.keys())t.push(e);return t}getDevelopmentPackageNames(){const t=[]
;for(const e of this.devDependentModules.keys())t.push(e);return t}getHeader(){
let t=this.fs.readFile(this.fs.resolvePath(this.path,"NOTICE"));if(!t){const e=new Date
;t="/* "+this.packageInfo.name+" v"+this.packageInfo.version+" generated by tsb@"+this.cli.version+" at "+e.toISOString()+" */"
}const e=this.fs.newLine;return t.endsWith(e)||(t+=e),t}getConfigFileName(t){
const e=this.fs.resolvePath(this.path,`tsconfig.${t}.json`),i=this.fs.resolvePath(this.path,"tsconfig.json");let n
;return n=this.fs.fileExists(e)?e:this.fs.fileExists(i)?i:"",n}}
;w([L(),b("design:type",class RepositoryService extends Service{findRepository(e){
const i=this.fs.resolvePathUp(e,".git");if(i){if(this.fs.directoryExists(i))return new et(i);if(this.fs.fileExists(i)){
const e=this.fs.readFile(i);if(e&&e.startsWith("gitdir:")){
const n=e.slice(7).trim(),s=this.fs.resolvePath(t.dirname(i),n);return new et(s)}}}}
})],it.prototype,"repositoryService",void 0),
w([L(),b("design:type",CachedModuleService)],it.prototype,"cachedModuleService",void 0),
it=S([J(),b("design:paramtypes",[String,Object])],it);class ProjectService extends Service{load(t){
const e=this.packageInfoParser.read(this.fs.resolvePath(t,"package.json"));if(e)return new it(t,e)}}
w([L(),b("design:type",PackageInfoParser)],ProjectService.prototype,"packageInfoParser",void 0)
;let nt=class BuildContext extends Service{constructor(e){super(),this.options=e,this.cacheDirName=".cache",
this.binaryDirName="bin",this.libraryDirName="lib",this.artifactDirName="public",this.configDirName="conf",
this.settingsFileName="settings.js",this.outputPackageJsonFileName="package.json",
this.defaultPackageFileNames=["Dockerfile","CHANGELOG.md","COPYRIGHT","LICENSE","NOTICE","README.md"],
this.defaultEntryPathNames=[".","lib"],this.defaultEntryName="index",this.tsCompilerOptions={},
e.prod||e.rc||e.insiders||e.dev?(this.beautify=!1,this.mangle=!0,this.compress=!0,this.inline=!0,
this.configuration="production"):(this.beautify=e.beautify,this.mangle=e.mangle,this.compress=e.compress,
this.inline=e.inline,
this.options.configuration?this.configuration=String.prototype.toLowerCase.apply(e.configuration):this.configuration="development")
;const{in:i,out:n,target:s,beautify:o,rc:c,dev:a,insiders:u,release:l}=this.options;o&&(this.beautify=o),
this.target=s?s.toLowerCase():"es2018",
i?t.isAbsolute(i)?this.inputDir=i:this.inputDir=t.join(this.workingDir,i):this.inputDir=this.env.homeDir,
n?t.isAbsolute(n)?this.outputDir=n:this.outputDir=t.join(this.workingDir,n):this.outputDir=t.join(this.inputDir,"release"),
this.inputPackageJsonFileName=`package.${this.configuration}.json`,this.files=[]
;const h=this.projectService.load(this.inputDir);if(!h)throw new Error("ERROR: Project not found in "+this.inputDir)
;this.project=h,this.timestamp=new Date;let p="",f="";c?(p="rc","string"==typeof c&&(f=c)):a?(p="dev",
f="string"==typeof a?a:this.date):u?(p="insiders",f="string"==typeof u?u:this.date):l&&(p=l,f=this.date),
p?(this.version=r.coerce(h.packageInfo.version)+"-"+p,
f&&(this.version=this.version+"."+f)):this.version=h.packageInfo.version,
Reflect.has(e,"metadata")&&Reflect.set(this.tsCompilerOptions,"emitDecoratorMetadata",e.metadata),
Reflect.has(e,"decorator")&&Reflect.set(this.tsCompilerOptions,"emitDecoratorMetadata",e.decorator)}get shouldInline(){
return this.inline}get shouldBeautify(){return this.beautify}get shouldMangle(){return this.mangle}get shouldCompress(){
return this.compress}get cliDir(){return this.env.baseDir}get workingDir(){return this.env.workingDir}get date(){
const t=this.timestamp
;return t.getUTCFullYear()+String(t.getUTCMonth()+1).padStart(2,"0")+String(t.getUTCDate()).padStart(2,"0")}}
;w([L(),b("design:type",ProjectService)],nt.prototype,"projectService",void 0),
nt=S([J(),b("design:paramtypes",[Object])],nt);class JsonParser{read(t){
const e=this.ts.runtime.readConfigFile(t,this.ts.runtime.sys.readFile)
;return e.error&&(console.log(this.ts.formatDiagnostics([e.error])),process.exit(1)),e.config}write(t,e,i){
i?this.fs.writeFile(t,JSON.stringify(e,null,i)):this.fs.writeFile(t,JSON.stringify(e))}}
w([L(),b("design:type",TypeScript)],JsonParser.prototype,"ts",void 0),
w([L(),b("design:type",TypeScriptFileSystem)],JsonParser.prototype,"fs",void 0);class JavaScriptParser{read(t){
const e=this.ts.runtime.readConfigFile(t,this.ts.runtime.sys.readFile)
;return e.error&&(console.log(this.ts.formatDiagnostics([e.error])),process.exit(1)),e.config}write(t,e){
throw new Error("Not Supported")}}function st(t,e){return t=>s=>e.visitNode(s,(e=>n(0,e,t)||i(s,e,t)))
;function i(t,s,r){return e.visitEachChild(s,(e=>n(0,e,r)||i(t,e,r)),r)}function n(i,n,s){if(e.isReturnStatement(n)){
const i=n.expression;if(i&&(e.isStringLiteral(i)||e.isNoSubstitutionTemplateLiteral(i))){const e=i.getFullText().trim()
;if(e.startsWith("/* replace::release.version */")){const e=s.factory.createStringLiteral(t.version)
;return s.factory.createReturnStatement(e)}if(e.startsWith("/* replace::release.name */")){
const e=s.factory.createStringLiteral(t.project.packageInfo.name);return s.factory.createReturnStatement(e)}
if(e.startsWith("/* replace::release.timestamp */")){const e=s.factory.createStringLiteral(t.timestamp.toISOString())
;return s.factory.createReturnStatement(e)}}}}}
w([L(),b("design:type",TypeScript)],JavaScriptParser.prototype,"ts",void 0)
;const rt=new Set(["__decorate","__metadata","__param"]);function ot(t,e){return t=>i=>{const n=new WeakSet,s=new Map
;return e.visitNode(i,(e=>o(0,e,t)||r(i,e,t)));function r(t,i,n){return e.visitEachChild(i,(e=>o(0,e,n)||r(t,e,n)),n)}
function o(t,i,s){if(e.isImportDeclaration(i)){const t=i.moduleSpecifier;if(e.isStringLiteral(t)&&t.text===z){
const{importClause:t}=i;if(t){const{namedBindings:n}=t;if(n&&e.isNamedImports(n)){const t=[],r=[]
;if(n.elements.forEach((i=>{e.isIdentifier(i.name)&&(rt.has(i.name.text)?r.push(i):t.push(i))})),
n.elements.length===t.length)return;const o=[],a=s.factory
;return t.length&&o.push(a.createImportDeclaration(i.decorators,i.modifiers,a.createImportClause(!1,void 0,a.createNamedImports(a.createNodeArray(t))),a.createStringLiteral(z))),
r.length&&(r.push(a.createImportSpecifier(void 0,c("__agent"))),
o.push(a.createImportDeclaration(i.decorators,i.modifiers,a.createImportClause(!1,void 0,a.createNamedImports(a.createNodeArray(r))),a.createStringLiteral("agentframework")))),
o.length>1?o:1===o.length?o[0]:void 0}}}}else if(e.isCallExpression(i)){if(2===i.arguments.length){const t=i.expression
;t&&(e.isIdentifier(t)?"__decorate"===t.text&&n.add(t):e.isPropertyAccessExpression(t)&&"__decorate"===t.name.text&&n.add(t))
}}else if(n.has(i))return c("__agent")}function c(e){let i=s.get(e);return i||(i=t.factory.createIdentifier(e),
s.set(e,i)),i}}}class TypeScriptCompiler extends Service{constructor(){super(...arguments),this.artifacts=new Map,
this.codes=new Map,this.types=new Map,this.maps=new Map}async build(t){
const{inputDir:e,outputDir:i,configuration:n,target:s}=t,r=t.fs.resolvePath(i,t.cacheDirName),o=t.project.getConfigFileName(n)
;if(!o)throw new Error("tsconfig.json not found");this.runtime=t.ts.runtime
;const{ScriptTarget:c,ModuleKind:a}=t.ts.runtime;let u,l;switch(s){case"es2015":u=c.ES2015,l=a.ES2015;break
;case"es2016":u=c.ES2016,l=a.ES2015;break;case"es2017":u=c.ES2017,l=a.ES2015;break;case"es2018":u=c.ES2018,l=a.ES2015
;break;case"es2019":u=c.ES2019,l=a.ES2015;break;case"es2020":u=c.ES2020,l=a.ES2020;break;case"esnext":u=c.ESNext,
l=a.ESNext;default:return console.log(W("Build target only support es2015 or later")),void process.exit(1)}
this.scriptTarget=u,this.moduleKind=l,console.log(V("Start compile project targeting",s,"with config",o))
;const h=t.project.findBinFiles(t.binaryDirName),p=t.project.findLibraryFiles(t.libraryDirName),f=t.project.findMainFile(),d=[...h,...p].map((t=>t[1]))
;if(f){const[t,e]=f;d.push(e)}const m={target:u,module:l,importHelpers:!0,noEmit:!1,sourceMap:!0,inlineSourceMap:!1,
declaration:!!f,declarationMap:!1,removeComments:!0,incremental:!0,tsBuildInfoFile:t.fs.resolvePath(r,"buildinfo.json")
},g=this.createProgram(t,d,o,Object.assign(m,t.tsCompilerOptions));this.typeChecker=g.getTypeChecker(),
this.cache=t.ts.runtime.createModuleResolutionCache(e,(t=>t),this.compilerOptions);let y=0,v=0,w=0;const S={}
;S.before=[st(t,this.runtime)],S.after=[ot(0,this.runtime)],f&&(S.afterDeclarations=[])
;let b=t.ts.runtime.getPreEmitDiagnostics(g)
;b.length&&(b=b.filter((t=>!(1===t.category&&2354===t.code&&"string"==typeof t.messageText&&t.messageText.indexOf("tslib")>=0)))),
b.length&&(console.log(V("Pre Emit Diagnostics")),console.log(t.ts.formatDiagnostics(b)))
;const P=g.emit(void 0,((t,e)=>{if(this.artifacts.set(t,e),t.endsWith(".js")){
const i=t.slice(0,-3)+".ts",n=g.getSourceFile(i);if(n){const t=n.getFullText(),s=t.length;w++,y+=s,v+=e.length,
console.log("Building",i,Q(s,e.length)),this.artifacts.set(i,t),this.codes.set(i,e)}}else if(t.endsWith(".js.map")){
const i=t.slice(0,-7)+".ts";this.maps.set(i,JSON.parse(e))}else if(t.endsWith(".d.ts")){const i=t.slice(0,-5)+".ts"
;this.types.set(i,e)}}),void 0,!1,S);P.diagnostics.length&&(console.log("Emit Diagnostics"),
console.log(t.ts.formatDiagnostics(P.diagnostics)));const D=b.length+P.diagnostics.length
;P.emitSkipped?(console.log(V("Build stopped")),process.exit(1)):D&&console.log(V("Continue build with emit error")),
console.log(`Built ${w} files`,Q(y,v))}resolveModuleName(t,e){if(this.compilerOptions&&this.cache&&e&&this.cache){
let i=this.ts.runtime.resolveModuleNameFromCache(t,e,this.cache);if(i&&i.resolvedModule)return i.resolvedModule
;if(this.compilerHost){const i=this.ts.runtime.resolveModuleName(t,e,this.compilerOptions,this.compilerHost,this.cache)
;if(i&&i.resolvedModule)return i.resolvedModule
;const n=this.ts.runtime.resolveModuleName(t,this.env.baseDir,this.compilerOptions,this.compilerHost,this.cache)
;if(n&&n.resolvedModule)return console.log("Resolve from CLI path",t),n.resolvedModule}}}getSourceFile(t){var e
;return null===(e=this.program)||void 0===e?void 0:e.getSourceFile(t)}getSourceMap(t){return this.maps.get(t)}
createSourceFile(t,e,i){
return this.ts.runtime.createSourceFile(t,e,i||this.scriptTarget||this.ts.runtime.ScriptTarget.ESNext,!0)}getCode(t){
return this.codes.get(t)}getTyping(t){return this.types.get(t)}hasArtifact(t){return this.artifacts.has(t)}
getArtifact(t){return this.artifacts.get(t)}createProgram(t,e,i,n){const s=t.ts,r=[],o=Object.assign({},s.runtime.sys,{
onUnRecoverableConfigFileDiagnostic(t){r.push(t)}}),c=s.runtime.getParsedCommandLineOfConfigFile(i,n,o);let a
;c&&c.options&&(a=c.options),a&&!r.length||(console.log(s.formatDiagnostics(r)),process.exit(1)),this.compilerOptions=a
;const u=this.compilerHost=s.runtime.createCompilerHost(a)
;return console.log(Z("create a program with entries"),e.join(", ")),
this.program=s.runtime.createProgram(e,a,u,void 0,r||void 0)}}
w([L(),b("design:type",ProjectService)],TypeScriptCompiler.prototype,"project",void 0);class TypeScriptParser{read(t){
const e=this.compiler.program,i=this.ts.runtime.sys.readFile(t);if(!e||!i)return{}
;const n=this.compiler.getSourceFile(t)||this.compiler.createSourceFile(t,i);return console.log("return emit",n),{OKOK:1
}}write(t,e){throw new Error("Not Supported")}}
w([L(),b("design:type",TypeScript)],TypeScriptParser.prototype,"ts",void 0),
w([L(),b("design:type",TypeScriptCompiler)],TypeScriptParser.prototype,"compiler",void 0);class PropertyFileParser{
read(t){const e=this.fs.readFile(t,"utf-8");if(e)return this.parseText(e)}write(t,e){
this.fs.writeFile(t,require("js-yaml").dump(e))}parseValue(t){try{return JSON.parse(t)}catch(e){return t}}parseText(t){
const e=t.match(/[^\r\n]+/g),i={};if(e)for(const t of e){const e=t.trim();if(e.startsWith("#"))continue
;const n=e.indexOf("=");if(n>0){const e=t.slice(0,n).trim();let s=t.slice(n+1).trim()
;s="true"===s||"false"!==s&&("null"===s?null:this.parseValue(s)),i[e]=s}}return i}}
w([L(),b("design:type",TypeScriptFileSystem)],PropertyFileParser.prototype,"fs",void 0);class YamlFileParser{read(t){
const e=this.fs.readFile(t,"utf-8");if(e)return require("js-yaml").load(e)}write(t,e){
this.fs.writeFile(t,require("js-yaml").dump(e))}}
w([L(),b("design:type",TypeScriptFileSystem)],YamlFileParser.prototype,"fs",void 0);class SettingsLoader{
applySettings(t,e,i){if("object"!=typeof e)throw new Error(`Invalid settings file: ${t}`);const n=[]
;for(const t of Object.keys(e))"function"!=typeof e[t]&&(i[t]=e[t],n.push(t))
;1===n.length?console.log(Z(`Applied a key from '${t}'`)):n.length?console.log(Z(`Applied ${n.length} keys from '${t}'`)):console.log(Z(`No config key in '${t}'`))
}getFile(e,i,n){const s=t.resolve(e,i+"."+n);if(this.fs.fileExists(s))return s
;console.log(`Settings file '${s}' is not found, ignoring...`)}applyJsonFileSettings(t,e,i){
const n=this.getFile(t,e,"json");return!!n&&(this.applySettings(n,this.json.read(n),i),!0)}applyJsFileSettings(t,e,i){
const n=this.getFile(t,e,"js");return!!n&&(this.applySettings(n,this.js.read(n),i),!0)}
applyPropertiesFileSettings(t,e,i){const n=this.getFile(t,e,"properties")
;return!!n&&(this.applySettings(n,this.properties.read(n),i),!0)}applyYamlFileSettings(t,e,i){
const n=this.getFile(t,e,"yaml")||this.getFile(t,e,"yml");return!!n&&(this.applySettings(n,this.yaml.read(n),i),!0)}
applyIniFileSettings(t,e,i){const n=this.getFile(t,e,"ini");return!!n&&(this.applySettings(n,this.ini.read(n),i),!0)}
applyJSON5FileSettings(t,e,i){const n=this.getFile(t,e,"json5");return!!n&&(this.applySettings(n,this.json.read(n),i),
!0)}applyFileSettingsInSequence(t,e,i){this.applyJsFileSettings(t,e,i),this.applyJsonFileSettings(t,e,i),
this.applyYamlFileSettings(t,e,i),this.applyJSON5FileSettings(t,e,i),this.applyIniFileSettings(t,e,i),
this.applyPropertiesFileSettings(t,e,i)}}
w([L(),b("design:type",TypeScriptFileSystem)],SettingsLoader.prototype,"fs",void 0),
w([L(),b("design:type",JavaScriptParser)],SettingsLoader.prototype,"js",void 0),
w([L(),b("design:type",JsonParser)],SettingsLoader.prototype,"json",void 0),
w([L(),b("design:type",YamlFileParser)],SettingsLoader.prototype,"yaml",void 0),
w([L(),b("design:type",IniFileParser)],SettingsLoader.prototype,"ini",void 0),
w([L(),b("design:type",PropertyFileParser)],SettingsLoader.prototype,"properties",void 0),
w([L(),b("design:type",TypeScriptParser)],SettingsLoader.prototype,"ts",void 0);class SettingsWriter{write(t,e,i){
let n=[i,"'use strict';","","Object.defineProperty(exports, '__esModule', { value: true });"],s=null
;const r=Object.keys(e).sort();for(const t of r){let i="";t[0]!==s&&(s=t[0],i="\n"),
t.indexOf(".")>=0?i+=`exports["${t}"] = ${JSON.stringify(e[t])};`:i+=`exports.${t} = ${JSON.stringify(e[t])};`,n.push(i)
}const o=n.join("\n");return this.fs.writeFile(t,o),o}}
w([L(),b("design:type",ProjectService)],SettingsWriter.prototype,"project",void 0),
w([L(),b("design:type",TypeScriptFileSystem)],SettingsWriter.prototype,"fs",void 0);class ConfigurationBuilder{
async build(t){const e=this.fs.resolvePath(t.inputDir,t.configDirName)
;if(!this.fs.directoryExists(e))return void console.log(V("Ignore settings because config dir not exits",e))
;const i=this.fs.resolvePath(t.outputDir,t.configDirName),n=this.fs.resolvePath(i,t.settingsFileName)
;console.log(V("Reading settings from",e));const s={};this.settings.applyFileSettingsInSequence(e,"settings",s),
this.settings.applyFileSettingsInSequence(e,"settings.local",s),
this.settings.applyFileSettingsInSequence(e,t.configuration,s),
this.settings.applyFileSettingsInSequence(e,t.configuration+".local",s),s.NAME=t.project.packageInfo.name,
s.VERSION=t.project.packageInfo.version;const r=t.project.repository;if(r){s.BUILD_REPOSITORY_TYPE=r.getType(),
s.BUILD_REPOSITORY=r.getURL();const t=r.getBranch();t&&(s.BUILD_BRANCH=t,s.BUILD_COMMIT=r.getCommit(t))}
s.BUILD_TIME=(new Date).toISOString(),
s.BUILD_CLI_VERSION=this.cli.version,s.BUILD_NODE_VERSION=process.version.slice(1),s.BUILD_TS_VERSION=this.ts.version,
s.BUILD_HOST=o.hostname(),console.log(V(`Writing ${Object.keys(s).length} setting keys to`,n)),
this.settingsWriter.write(n,s,t.project.getHeader())}}
w([L(),b("design:type",TypeScript)],ConfigurationBuilder.prototype,"ts",void 0),
w([L(),b("design:type",TypeScriptFileSystem)],ConfigurationBuilder.prototype,"fs",void 0),
w([L(),b("design:type",SettingsLoader)],ConfigurationBuilder.prototype,"settings",void 0),
w([L(),b("design:type",SettingsWriter)],ConfigurationBuilder.prototype,"settingsWriter",void 0),
w([L(),b("design:type",ProjectService)],ConfigurationBuilder.prototype,"project",void 0),
w([L(),b("design:type",CliService)],ConfigurationBuilder.prototype,"cli",void 0);class ArtifactBuilder{async build(t){
const{outputDir:e}=t,i=this.fs.resolvePath(t.inputDir,t.artifactDirName)
;if(!this.fs.directoryExists(i))return void console.log(V("Ignore artifacts because dir not exits",i))
;console.log("Building artifacts")
;const n=i.length,s=this.fs.resolvePath(e,t.artifactDirName),r=this.fs.readDirectory(i)
;console.log(V(`Start copying ${r.length} from`,i));for(const t of r){const e=t.slice(n),i=this.fs.joinPath(s,e)
;this.fs.copy(t,i)}console.log(V(`Complete copy ${r.length} files`))}}
w([L(),b("design:type",TypeScriptFileSystem)],ArtifactBuilder.prototype,"fs",void 0);class PackageBuilder{
async build(t){const{outputDir:e,inputDir:i}=t,n=new Set,s=t.defaultPackageFileNames
;console.log(V("Start copy project files"));let r=0;for(const t of s)this.fs.fileExists(i,t)&&n.add(t)
;const o=t.project.packageInfo.files;if(o&&o.length)for(const t of o)this.fs.fileExists(i,t)&&n.add(t)
;if(n.size)for(const s of n){const n=this.fs.resolvePath(i,s),o=this.fs.resolvePath(e,s);this.fs.copy(n,o),
t.files.push(s),r++}console.log(V(`Complete copy ${r} files`))}}function ct(t){if(!t.size)return;const e={}
;for(const[i,n]of t.entries())e[i]=n;return e}function at(e){let i=e,n=t.dirname(i);if("."===n)return n;for(i=n;i;){
const e=t.dirname(i);if(e===i)return e;if("."===e)return i;i=e}return i}
w([L(),b("design:type",TypeScriptFileSystem)],PackageBuilder.prototype,"fs",void 0);class PackageFileBuilder{
async build(e){
const{outputDir:i}=e,n=this.fs.resolvePath(e.inputDir,e.inputPackageJsonFileName),s=this.fs.resolvePath(e.outputDir,e.outputPackageJsonFileName)
;if(this.fs.fileExists(n)){const t=this.json.read(n);t.version=e.project.packageInfo.version,this.json.write(s,t),
console.log(H("Generate package.json from template"))}else{
const n=e.project.packageInfo,r=new Map,o=n.sideEffects,c=new Set(n.files||[]),a=e.project.findBinFiles(e.binaryDirName)
;if(a.length)for(const t of a)t[2]&&r.set(t[2],t[0]+".js");r.size&&c.add(e.binaryDirName)
;const u=this.fs.resolvePath(i,e.configDirName)
;this.fs.directoryExists(u)&&this.fs.readDirectory(u).length&&c.add(e.configDirName)
;const l=this.fs.resolvePath(i,e.libraryDirName)
;this.fs.directoryExists(l)&&this.fs.readDirectory(l).length&&c.add(e.libraryDirName)
;const h=this.fs.resolvePath(i,e.artifactDirName);let p,f,d,m
;if(this.fs.directoryExists(h)&&this.fs.readDirectory(h).length&&c.add(e.artifactDirName),n.main){
const e=n.main.slice(0,0-t.extname(n.main).length);p=e+".js",f=e+".mjs",d=e+".d.ts",
console.log(Z(`Found main entry in package.json: ${e}`))}else{const t=e.defaultEntryPathNames,n=e.defaultEntryName
;for(const e of t){const t=this.fs.joinPath(e,n+".js"),s=this.fs.joinPath(e,n+".mjs"),r=this.fs.joinPath(e,n+".d.ts")
;if(this.fs.fileExists(i,t)&&(p=t),this.fs.fileExists(i,s)&&(f=s),this.fs.fileExists(i,r)&&(d=r),p||f||d){
console.log(Z(`Found entry from ${e}: lib: ${p}, module: ${f}, type: ${d}`));break}}}p&&c.add(p),f&&c.add(f),d&&c.add(d)
;for(const t of e.files)c.add(t);if(n.dependencies){m={};for(const t of Object.keys(n.dependencies)){
const i=n.dependencies[t];if(i&&i.startsWith("github:"))m[t]=i;else{
const n=this.fs.resolvePath(e.project.path,"node_modules",t,"package.json");if(this.fs.fileExists(n)){
const e=require(n).version;m[t]=e}else m[t]=i}}}else m=void 0;const g={name:n.name,version:e.version,engines:n.engines,
sideEffects:o,bin:ct(r),description:n.description,author:n.author,license:n.license,repository:n.repository,bugs:n.bugs,
homepage:n.homepage,keywords:n.keywords,type:p?"commonjs":f?"module":void 0,main:p||f,module:f,"jsnext:main":f,types:d,
typings:d,files:this.generateFiles(e,c),dependencies:m,imports:n.imports,exports:n.exports};this.json.write(s,g,2),
console.log("Generated package.json")}}generateFiles(t,e){const i=new Set;for(const n of e){const e=at(n)
;"."===e?this.fs.exists(t.outputDir,n)&&i.add(n):this.fs.directoryExists(t.outputDir,e)&&i.add(e)}return function(t){
if(!t.size)return;const e=[];for(const i of t.keys())e.push(i);return e.sort()}(i)}}
w([L(),b("design:type",TypeScriptFileSystem)],PackageFileBuilder.prototype,"fs",void 0),
w([L(),b("design:type",JsonParser)],PackageFileBuilder.prototype,"json",void 0),
w([L(),b("design:type",ProjectService)],PackageFileBuilder.prototype,"project",void 0)
;class TypeScriptLibrary extends Service{constructor(t){super(),this.desc=t}get entryModulePath(){
return this.desc.module}get entryTypingPath(){return this.desc.types}static[_](t,e,i,n){
const s=t.construct(CachedModuleService),r=t.construct(Environment),o=s.resolveModule(z,r.baseDir)
;return o?e.invoke([o],n):(console.log(W("tslib is not found, exit program")),void process.exit(1))}}
class RollupPluginScriptBundler{createPlugin(t){
const e=this.compiler,i=this.tslib.entryModulePath,n=t.shouldInline?t.project.inlineModuleNames:void 0,s=new Set(t.project.importModuleNames)
;return{name:"rollup-plugin-ts-bundler",resolveId(t,r){if(!r)return t;if(t===z)return i?{id:i,moduleSideEffects:!1}:{
id:z,external:!0};if(n){const e=n.get(t);if(e)return{id:e}}if(s.has(t))return{id:t,external:!0}
;const o=e.resolveModuleName(t,r)
;return o?o.packageId?(console.log(V(`Import ${o.packageId.name} as external module from ${r}`)),{id:o.packageId.name,
external:!0}):{id:o.resolvedFileName}:null},load:t=>e.getCode(t),transform:(t,i)=>t?{code:t,map:e.getSourceMap(i)}:null}
}}w([L(),b("design:type",TypeScriptCompiler)],RollupPluginScriptBundler.prototype,"compiler",void 0),
w([L(),b("design:type",TypeScriptLibrary)],RollupPluginScriptBundler.prototype,"tslib",void 0)
;class UnsupportedSyntaxError extends Error{constructor(t,e){super(e)}}class NamespaceFixer{constructor(t,e){
this.sourceFile=t,this.tsc=e}findNamespaces(){const t=[],e={};for(const i of this.sourceFile.statements){const n={
start:i.getStart(),end:i.getEnd()};if(this.tsc.isEmptyStatement(i)){t.unshift({name:"",exports:[],location:n});continue}
if((this.tsc.isImportDeclaration(i)||this.tsc.isExportDeclaration(i))&&i.moduleSpecifier&&this.tsc.isStringLiteral(i.moduleSpecifier)){
let{text:e}=i.moduleSpecifier;if(e.startsWith(".")&&e.endsWith(".d.ts")){let e=i.moduleSpecifier.getEnd()-1;t.unshift({
name:"",exports:[],location:{start:e-5,end:e}})}}if(this.tsc.isClassDeclaration(i)?e[i.name.getText()]={type:"class",
generics:i.typeParameters&&i.typeParameters.length}:this.tsc.isFunctionDeclaration(i)?e[i.name.getText()]={
type:"function"}:this.tsc.isInterfaceDeclaration(i)?e[i.name.getText()]={type:"interface",
generics:i.typeParameters&&i.typeParameters.length}:this.tsc.isTypeAliasDeclaration(i)?e[i.name.getText()]={type:"type",
generics:i.typeParameters&&i.typeParameters.length
}:this.tsc.isModuleDeclaration(i)&&this.tsc.isIdentifier(i.name)?e[i.name.getText()]={type:"namespace"
}:this.tsc.isEnumDeclaration(i)&&(e[i.name.getText()]={type:"enum"}),!this.tsc.isVariableStatement(i))continue
;const{declarations:s}=i.declarationList;if(1!==s.length)continue;const r=s[0],o=r.name.getText()
;if(!r.initializer||!this.tsc.isCallExpression(r.initializer)){e[o]={type:"var"};continue}
const c=r.initializer.arguments[0]
;if(!r.initializer.expression.getFullText().includes("/*#__PURE__*/Object.freeze")||!this.tsc.isObjectLiteralExpression(c))continue
;const a=[];for(const t of c.properties){
if(!this.tsc.isPropertyAssignment(t)||!this.tsc.isIdentifier(t.name)&&!this.tsc.isStringLiteral(t.name)||"__proto__"!==t.name.text&&!this.tsc.isIdentifier(t.initializer))throw new UnsupportedSyntaxError(t,"Expected a property assignment")
;"__proto__"!==t.name.text&&a.push({exportedName:t.name.text,localName:t.initializer.getText()})}t.unshift({name:o,
exports:a,location:n})}return{namespaces:t,itemTypes:e}}fix(){let t=this.sourceFile.getFullText()
;const{namespaces:e,itemTypes:i}=this.findNamespaces();for(const n of e){const e=t.slice(n.location.end)
;t=t.slice(0,n.location.start);for(const{exportedName:e,localName:s}of n.exports)if(e===s){
const{type:r,generics:o}=i[s]||{};if("interface"===r||"type"===r){const i=ut(o)
;t+=`type ${n.name}_${e}${i} = ${s}${i};\n`}else if("enum"===r||"class"===r){const i=ut(o)
;t+=`type ${n.name}_${e}${i} = ${s}${i};\n`,t+=`declare const ${n.name}_${e}: typeof ${s};\n`
}else t+=`declare const ${n.name}_${e}: typeof ${s};\n`}if(n.name){t+=`declare namespace ${n.name} {\n`,
t+="  export {\n"
;for(const{exportedName:e,localName:i}of n.exports)t+=e===i?`    ${n.name}_${e} as ${e},\n`:`    ${i} as ${e},\n`
;t+="  };\n",t+="}"}t+=e}return t}}function ut(t){return t?`<${Array.from({length:t},((t,e)=>`_${e}`)).join(", ")}>`:""}
function lt(t,e,i){var n;let s=!1
;const r=i.isClassDeclaration(e)||i.isFunctionDeclaration(e)||i.isModuleDeclaration(e)||i.isVariableStatement(e)
;for(const r of null!==(n=e.modifiers)&&void 0!==n?n:[])switch(r.kind){case i.SyntaxKind.ExportKeyword:
case i.SyntaxKind.DefaultKeyword:t.remove(r.getStart(),r.getEnd()+1);break;case i.SyntaxKind.DeclareKeyword:s=!0}
r&&!s&&t.appendRight(e.getStart(),"declare ")}function ht(t){const e=t.getFullStart();return e+(ft(t,e)?1:0)}
function pt(t){const e=t.getEnd();return e+(ft(t,e)?1:0)}function ft(t,e){return"\n"==t.getSourceFile().getFullText()[e]
}let dt=1;function mt(t,e){let i="start"in e?e:{start:e.getStart(),end:e.getEnd()};return Object.assign(t,i)}
function gt(t){const e=t.getText();if(!e)throw new Error("Not support create identity without name");return mt({
type:"Identifier",name:e},t)}class AstHelper{constructor(t){this.tsc=t}createDeclaration(t,e){return mt({
type:"FunctionDeclaration",id:mt({type:"Identifier",name:this.tsc.idText(t)},t),params:[],body:{type:"BlockStatement",
body:[]}},e)}convertExpression(t){if(this.tsc.isLiteralExpression(t))return{type:"Literal",value:t.text}
;if(this.tsc.isPropertyAccessExpression(t)){
if(this.tsc.isPrivateIdentifier(t.name))throw new UnsupportedSyntaxError(t.name);return mt({type:"MemberExpression",
computed:!1,optional:!1,object:this.convertExpression(t.expression),property:this.convertExpression(t.name)},{
start:t.expression.getStart(),end:t.name.getEnd()})}if(this.tsc.isIdentifier(t))return gt(t)
;throw console.log("unknown node kind = ",t.kind),new UnsupportedSyntaxError(t)}convertCallExpression(t){return mt({
type:"CallExpression",callee:this.convertExpression(t.expression),
arguments:t.arguments.map((t=>this.convertExpression(t))),optional:!1},t)}convertNewExpression(t){return mt({
type:"NewExpression",callee:this.convertExpression(t.expression),
arguments:t.arguments?t.arguments.map((t=>this.convertExpression(t))):[],optional:!1},t)}convertClassExpression(t){
return mt({type:"ClassExpression",id:t.name?gt(t.name):null,body:this.convertClassBody(t.members)},t)}
convertClassBody(t){return{type:"ClassBody",body:[]}}matchesModifier(t,e){
return(this.tsc.getCombinedModifierFlags(t)&e)===e}}class DeclarationScope{constructor({id:t,range:e,helper:i}){
if(this.scopes=[],this.tsc=i.tsc,this.helper=i,t)this.declaration=i.createDeclaration(t,e);else{
const{iife:t,fn:i}=function(t){const e=mt({type:"FunctionExpression",id:null,params:[],body:{type:"BlockStatement",
body:[]}},t);return{fn:e,iife:mt({type:"ExpressionStatement",expression:{type:"CallExpression",callee:{
type:"Identifier",name:String(dt++)},arguments:[e],optional:!1}},t)}}(e);this.iife=t,this.declaration=i}
this.IGNORE_TYPENODES=new Set([this.tsc.SyntaxKind.LiteralType,this.tsc.SyntaxKind.VoidKeyword,this.tsc.SyntaxKind.UnknownKeyword,this.tsc.SyntaxKind.AnyKeyword,this.tsc.SyntaxKind.BooleanKeyword,this.tsc.SyntaxKind.NumberKeyword,this.tsc.SyntaxKind.StringKeyword,this.tsc.SyntaxKind.ObjectKeyword,this.tsc.SyntaxKind.NullKeyword,this.tsc.SyntaxKind.UndefinedKeyword,this.tsc.SyntaxKind.SymbolKeyword,this.tsc.SyntaxKind.NeverKeyword,this.tsc.SyntaxKind.ThisKeyword,this.tsc.SyntaxKind.ThisType,this.tsc.SyntaxKind.BigIntKeyword])
}pushScope(){this.scopes.push(new Set)}popScope(t=1){for(let e=0;e<t;e++)this.scopes.pop()}pushTypeVariable(t){var e
;const i=t.getText();null===(e=this.scopes[this.scopes.length-1])||void 0===e||e.add(i)}pushRaw(t){
this.declaration.params.push(t)}pushReference(t){let e
;if("Identifier"===t.type?e=t.name:"MemberExpression"===t.type&&"Identifier"===t.object.type&&(e=t.object.name),
e)for(const t of this.scopes)if(t.has(e))return;this.pushRaw(function(t){return{type:"AssignmentPattern",left:{
type:"Identifier",name:String(dt++)},right:t}}(t))}pushIdentifierReference(t){this.pushReference(gt(t))}
convertEntityName(t){return this.tsc.isIdentifier(t)?gt(t):mt({type:"MemberExpression",computed:!1,optional:!1,
object:this.convertEntityName(t.left),property:gt(t.right)},t)}convertPropertyAccess(t){
if(!this.tsc.isIdentifier(t.expression)&&!this.tsc.isPropertyAccessExpression(t.expression))throw new UnsupportedSyntaxError(t.expression)
;if(this.tsc.isPrivateIdentifier(t.name))throw new UnsupportedSyntaxError(t.name);return mt({type:"MemberExpression",
computed:!1,optional:!1,
object:this.tsc.isIdentifier(t.expression)?gt(t.expression):this.convertPropertyAccess(t.expression),property:gt(t.name)
},t)}convertComputedPropertyName(t){if(!t.name||!this.tsc.isComputedPropertyName(t.name))return
;const{expression:e}=t.name;if(!this.tsc.isLiteralExpression(e)){
if(this.tsc.isIdentifier(e))return this.pushReference(gt(e))
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
if(this.tsc.isMappedTypeNode(t)){const{typeParameter:e,type:i,nameType:n}=t;return this.convertTypeNode(e.constraint),
this.pushScope(),this.pushTypeVariable(e.name),this.convertTypeNode(i),n&&this.convertTypeNode(n),void this.popScope()}
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
this.popScope()}}class Transformer{constructor(t,e){var i;this.sourceFile=t,this.helper=e,this.declarations=new Map,
this.tsc=e.tsc,this.ast=mt({type:"Program",sourceType:"module",body:[]},{start:(i=t).getFullStart(),end:i.getEnd()})
;for(const e of t.statements)this.convertStatement(e)}transform(){return{ast:this.ast}}pushStatement(t){
this.ast.body.push(t)}createDeclaration(t,e){const i={start:t.getFullStart(),end:t.getEnd()};if(!e){
const t=new DeclarationScope({range:i,helper:this.helper});return this.pushStatement(t.iife),t}
const n=e.getText(this.sourceFile),s=new DeclarationScope({id:e,range:i,helper:this.helper}),r=this.declarations.get(n)
;if(r){r.pushIdentifierReference(e),r.declaration.end=i.end
;for(let t=this.ast.body.findIndex((t=>t==r.declaration))+1;t<this.ast.body.length;t++){const e=this.ast.body[t]
;e.start=e.end=i.end}}else this.pushStatement(s.declaration),this.declarations.set(n,s);return r||s}convertStatement(t){
if(this.tsc.isEnumDeclaration(t))return this.convertEnumDeclaration(t)
;if(this.tsc.isFunctionDeclaration(t))return this.convertFunctionDeclaration(t)
;if(this.tsc.isInterfaceDeclaration(t)||this.tsc.isClassDeclaration(t))return this.convertClassOrInterfaceDeclaration(t)
;if(this.tsc.isTypeAliasDeclaration(t))return this.convertTypeAliasDeclaration(t)
;if(this.tsc.isVariableStatement(t))return this.convertVariableStatement(t)
;if(this.tsc.isExportDeclaration(t)||this.tsc.isExportAssignment(t))return this.convertExportDeclaration(t)
;if(this.tsc.isModuleDeclaration(t))return this.convertNamespaceDeclaration(t)
;if(t.kind==this.tsc.SyntaxKind.NamespaceExportDeclaration)return this.removeStatement(t)
;if(this.tsc.isImportDeclaration(t)||this.tsc.isImportEqualsDeclaration(t))return this.convertImportDeclaration(t)
;throw new UnsupportedSyntaxError(t)}removeStatement(t){this.pushStatement(mt({type:"ExpressionStatement",expression:{
type:"Literal",value:"pls remove me"}},t))}convertNamespaceDeclaration(t){
if(t.flags&this.tsc.NodeFlags.GlobalAugmentation||!this.tsc.isIdentifier(t.name))return void this.createDeclaration(t).convertNamespace(t)
;const e=this.createDeclaration(t,t.name);e.pushIdentifierReference(t.name),e.convertNamespace(t)}
convertEnumDeclaration(t){this.createDeclaration(t,t.name).pushIdentifierReference(t.name)}
convertFunctionDeclaration(t){if(!t.name)throw new UnsupportedSyntaxError(t,"FunctionDeclaration should have a name")
;const e=this.createDeclaration(t,t.name);e.pushIdentifierReference(t.name),e.convertParametersAndType(t)}
convertClassOrInterfaceDeclaration(t){
if(!t.name)throw new UnsupportedSyntaxError(t,"ClassDeclaration / InterfaceDeclaration should have a name")
;const e=this.createDeclaration(t,t.name),i=e.convertTypeParameters(t.typeParameters);e.convertHeritageClauses(t),
e.convertMembers(t.members),e.popScope(i)}convertTypeAliasDeclaration(t){
const e=this.createDeclaration(t,t.name),i=e.convertTypeParameters(t.typeParameters);e.convertTypeNode(t.type),
e.popScope(i)}convertVariableStatement(t){const{declarations:e}=t.declarationList
;if(1!==e.length)throw new UnsupportedSyntaxError(t,"VariableStatement with more than one declaration not yet supported")
;for(const i of e){
if(!this.tsc.isIdentifier(i.name))throw new UnsupportedSyntaxError(t,"VariableDeclaration must have a name")
;this.createDeclaration(t,i.name).convertTypeNode(i.type)}}convertExportDeclaration(t){
if(this.tsc.isExportAssignment(t)&&t.expression)return void this.pushStatement(mt({type:"ExportDefaultDeclaration",
declaration:this.helper.convertExpression(t.expression)},t))
;const e=t,i=e.moduleSpecifier?this.helper.convertExpression(e.moduleSpecifier):void 0
;if(e.exportClause)if(this.tsc.isNamespaceExport(e.exportClause))this.pushStatement(mt({type:"ExportAllDeclaration",
source:i,exported:gt(e.exportClause.name)},e));else{const t=[]
;for(const i of e.exportClause.elements)t.push(this.convertExportSpecifier(i));this.pushStatement(mt({
type:"ExportNamedDeclaration",declaration:null,specifiers:t,source:i},e))}else this.pushStatement(mt({
type:"ExportAllDeclaration",source:i,exported:null},e))}convertImportDeclaration(t){
if(this.tsc.isImportEqualsDeclaration(t)){
if(!this.tsc.isExternalModuleReference(t.moduleReference))throw new UnsupportedSyntaxError(t,"ImportEquals should have a literal source.")
;return void this.pushStatement(mt({type:"ImportDeclaration",specifiers:[{type:"ImportDefaultSpecifier",local:gt(t.name)
}],source:this.helper.convertExpression(t.moduleReference.expression)},t))}
const e=this.helper.convertExpression(t.moduleSpecifier),i=t.importClause&&t.importClause.namedBindings?this.convertNamedImportBindings(t.importClause.namedBindings):[]
;t.importClause&&t.importClause.name&&i.push({type:"ImportDefaultSpecifier",local:gt(t.importClause.name)}),
this.pushStatement(mt({type:"ImportDeclaration",specifiers:i,source:e},t))}convertNamedImportBindings(t){
return this.tsc.isNamedImports(t)?t.elements.map((t=>{const e=gt(t.name);return{type:"ImportSpecifier",local:e,
imported:t.propertyName?gt(t.propertyName):e}})):[{type:"ImportNamespaceSpecifier",local:gt(t.name)}]}
convertExportSpecifier(t){const e=gt(t.name);return{type:"ExportSpecifier",exported:e,
local:t.propertyName?gt(t.propertyName):e}}}function yt(e){const i=t.extname(e),n=i.length
;return n?".ts"===i.toLowerCase()?e.length>5&&".d.ts"==e.slice(-5).toLowerCase()?t.resolve(e):t.resolve(String(e.slice(0,-3))+".d.ts"):t.resolve(String(e.slice(0,-n))+".d.ts"):t.resolve(e+".d.ts")
}class RollupPluginDefinitionBundler{createPlugin(t){
const e=t.ts.runtime,i=this.compiler,n=this.module,s=new AstHelper(e),r=new Map,o=t.project.inlineModuleNames,c=new Set(t.project.importModuleNames),a=this.tslib.entryTypingPath
;return{name:"rollup-plugin-dts-bundler",resolveId(t,e){if(!e)return t;if(t===z)return c.has(z)||!a?{id:z,external:!0}:{
id:a};if(o&&o.has(t)){const i=n.resolveSideEffectsFreeModule(t,e);if(i&&i.types)return{id:i.types}
;console.log(W(`Can not find inline module "${t}" from ${e}`))}if(c.has(t))return{id:t,external:!0}
;const s=i.resolveModuleName(t,e)
;return s?s.packageId?(console.log(V(`Import external definition "${s.packageId.name}" from ${e}`)),{
id:s.packageId.name,external:!0}):{id:yt(s.resolvedFileName)}:null},load:t=>i.getArtifact(t),transform(t,e){
const n=i.createSourceFile(e,t),o=function({sourceFile:t,helper:e}){
const i=e.tsc,n=new d.default(t.getFullText()),s=new Set,r=new Set;let o="";const c=new Map,a=new Map
;for(const c of t.statements)if(i.isEmptyStatement(c))n.remove(c.getStart(),c.getEnd());else if(i.isEnumDeclaration(c)||i.isFunctionDeclaration(c)||i.isInterfaceDeclaration(c)||i.isClassDeclaration(c)||i.isTypeAliasDeclaration(c)||i.isModuleDeclaration(c)){
if(c.name){const t=c.name.getText()
;s.add(t),e.matchesModifier(c,i.ModifierFlags.ExportDefault)?o=t:e.matchesModifier(c,i.ModifierFlags.Export)&&r.add(t),
c.flags&i.NodeFlags.GlobalAugmentation||f(t,[ht(c),pt(c)])}lt(n,c,i)}else if(i.isVariableStatement(c)){
const{declarations:t}=c.declarationList,o=e.matchesModifier(c,i.ModifierFlags.Export)
;for(const t of c.declarationList.declarations)if(i.isIdentifier(t.name)){const e=t.name.getText();s.add(e),o&&r.add(e)}
if(lt(n,c,i),1==t.length){const e=t[0];i.isIdentifier(e.name)&&f(e.name.getText(),[ht(c),pt(c)])}else{
const e=t.slice(),n=e.shift();f(n.name.getText(),[ht(c),n.getEnd()])
;for(const t of e)i.isIdentifier(t.name)&&f(t.name.getText(),[t.getFullStart(),t.getEnd()])}
const{flags:a}=c.declarationList,u=`declare ${a&i.NodeFlags.Let?"let":a&i.NodeFlags.Const?"const":"var"} `,l=c.declarationList.getChildren().find((t=>t.kind===i.SyntaxKind.SyntaxList)).getChildren()
;let h=0;for(const t of l)if(t.kind===i.SyntaxKind.CommaToken)h=t.getStart(),n.remove(h,t.getEnd());else if(h){
n.appendLeft(h,";\n");const e=t.getFullStart(),i=n.slice(e,t.getStart());let s=i.length-i.trimStart().length
;s?n.overwrite(e,e+s,u):n.appendLeft(e,u)}}
for(const s of t.statements)if(h(s),e.matchesModifier(s,i.ModifierFlags.ExportDefault)&&(i.isFunctionDeclaration(s)||i.isClassDeclaration(s))){
if(s.name)continue;o||(o=p("export_default"))
;const t=s.getChildren(),e=t.findIndex((t=>t.kind===i.SyntaxKind.ClassKeyword||t.kind===i.SyntaxKind.FunctionKeyword)),r=t[e],c=t[e+1]
;c.kind>=i.SyntaxKind.FirstPunctuation&&c.kind<=i.SyntaxKind.LastPunctuation?n.appendLeft(c.getStart(),o):n.appendRight(r.getEnd(),` ${o}`)
}for(const t of a.values()){const e=t.pop()[0];for(const i of t)n.move(i[0],i[1],e)}
o&&n.append(`\nexport default ${o};\n`),r.size&&n.append(`\nexport { ${[...r].join(", ")} };\n`)
;for(const[t,e]of c.entries())n.prepend(`import * as ${e} from "${t}";\n`);const u=new Set,l=t.getLineStarts()
;for(const e of t.typeReferenceDirectives){u.add(e.fileName);const{line:i}=t.getLineAndCharacterOfPosition(e.pos),s=l[i]
;let r=t.getLineEndOfPosition(e.pos);"\n"==n.slice(r,r+1)&&(r+=1),n.remove(s,r)}return{code:n,typeReferences:u}
;function h(t){if(i.forEachChild(t,h),i.isImportTypeNode(t)){
if(!i.isLiteralTypeNode(t.argument)||!i.isStringLiteral(t.argument.literal))throw new UnsupportedSyntaxError(t,"inline imports should have a literal argument")
;const e=t.argument.literal.text,s=t.getChildren(),r=s.find((t=>t.kind===i.SyntaxKind.ImportKeyword)).getStart()
;let o=t.getEnd();const a=s.find((t=>t.kind===i.SyntaxKind.DotToken||t.kind===i.SyntaxKind.LessThanToken))
;a&&(o=a.getStart());const u=function(t){let e=c.get(t);return e||(e=p(t.replace(/[^a-zA-Z0-9_$]/g,(()=>"_"))),
c.set(t,e)),e}(e);n.overwrite(r,o,u)}}function p(t){let e=t;for(;s.has(e);)e=`_${e}`;return s.add(e),e}function f(t,e){
let i=a.get(t);if(i){const t=i[i.length-1];t[1]===e[0]?t[1]=e[1]:i.push(e)}else i=[e],a.set(t,i)}}({sourceFile:n,
helper:s});r.set(n.fileName,o.typeReferences)
;const c=o.code.toString(),a=i.createSourceFile(e,c),u=new Transformer(a,s).transform()
;return process.env.DTS_DUMP_AST&&(console.log(e),console.log(c),console.log(JSON.stringify(u.ast.body,void 0,2))),{
code:c,ast:u.ast,map:o.code.generateMap()}},renderChunk(t,n){
const s=i.createSourceFile(n.fileName,t),o=new NamespaceFixer(s,e),c=new Set
;for(const t of Object.keys(n.modules))for(const e of r.get(t.split("\\").join("/"))||[])c.add(e)
;return t=(a=Array.from(c,(t=>`/// <reference types="${t}" />`))).length?a.join("\n")+"\n":"",{code:t+=o.fix(),map:{
mappings:""}};var a}}}}
w([L(),b("design:type",TypeScriptFileSystem)],RollupPluginDefinitionBundler.prototype,"fs",void 0),
w([L(),b("design:type",TypeScriptCompiler)],RollupPluginDefinitionBundler.prototype,"compiler",void 0),
w([L(),b("design:type",ProjectService)],RollupPluginDefinitionBundler.prototype,"project",void 0),
w([L(),b("design:type",CachedModuleService)],RollupPluginDefinitionBundler.prototype,"module",void 0),
w([L(),b("design:type",TypeScriptLibrary)],RollupPluginDefinitionBundler.prototype,"tslib",void 0)
;class RollupService extends Service{bundleScripts(t,e,i){const n=[];n.push(this.scriptBundler.createPlugin(t)),
(t.shouldMangle||t.shouldCompress)&&n.push(this.terser.createPlugin(t,i)),
t.shouldBeautify&&n.push(this.prettier.createPlugin(t));const s={input:e,external:t.project.importModuleNames||[],
plugins:n},r=i?".mjs":".js",o=i?"esm":"cjs",a={banner:t.project.getHeader(),preferConst:!0,entryFileNames:"[name]"+r,
chunkFileNames:this.fs.joinPath(t.libraryDirName,"[hash].chunk"+r),dir:t.outputDir,format:o}
;return c.rollup(s).then((e=>e.write(a).then((e=>{if(!i)return this.findAndFixBinaryFiles(t,e)}))))}bundleTypes(t,e){
const{outputDir:i}=t,n={input:e,external:t.project.importModuleNames||[],
plugins:[this.definitionBundler.createPlugin(t)]},s={banner:t.project.getHeader(),preferConst:!0,
entryFileNames:"[name].d.ts",chunkFileNames:this.fs.joinPath(t.libraryDirName,"[hash].chunk.d.ts"),dir:i,format:"es"}
;return c.rollup(n).then((t=>t.write(s).then((()=>{}))))}findAndFixCommonJSFiles(t,e,i,n){console.log("exce",i)
;for(const s of t.output)if(!s.fileName.startsWith(i)){const t=this.fs.joinPath(n,s.fileName);this.fs.rename(t,t+e)}}
findAndFixBinaryFiles(t,e){for(const[e]of t.project.findBinFiles(t.binaryDirName)){
const i=this.fs.resolvePath(t.outputDir,e+".js");this.fs.fileExists(i)&&(this.fs.prependLine(i,"#!/usr/bin/env node"),
this.fs.chmod(i,"755"))}}}w([L(),b("design:type",ProjectService)],RollupService.prototype,"project",void 0),
w([L(),b("design:type",TypeScriptCompiler)],RollupService.prototype,"compiler",void 0),
w([L(),b("design:type",RollupPluginScriptBundler)],RollupService.prototype,"scriptBundler",void 0),
w([L(),b("design:type",RollupPluginDefinitionBundler)],RollupService.prototype,"definitionBundler",void 0),
w([L(),b("design:type",class RollupPluginPrettier{createPlugin(t){return{name:"rollup-plugin-prettier",
renderChunk:t=>l.format(t,{parser:"babel",printWidth:80,singleQuote:!0})}}
})],RollupService.prototype,"prettier",void 0),w([L(),b("design:type",class RollupPluginTerser{createPlugin(t,e=!1){
let i;switch(t.target){case"es2015":i=2015;break;case"es2016":i=2016;break;case"es2017":i=2017;break;case"es2018":i=2018
;break;case"es2019":i=2019;break;case"es2020":case"esnext":i=2020;break;default:
console.log(W("Build target only support ES2015 or later (e.g. 2015,2016,2017,2018,2019,2020)")),process.exit(1)}
const n={ecma:i,compress:!1,mangle:!1,format:{ascii_only:!1,max_line_len:120}};return t.shouldMangle&&(n.mangle={
keep_classnames:!0,keep_fnames:!1,properties:{builtins:!1,debug:!1,keep_quoted:!0,regex:/^_/,
reserved:["__agent","__decorate","__metadata","__param"]},module:e}),t.shouldCompress&&(n.compress={keep_classnames:!0,
keep_fnames:!1,keep_fargs:!1,keep_infinity:!0,module:e,passes:2}),u.terser(n)}
})],RollupService.prototype,"terser",void 0);class BundleBuilder{async build(t){
const e={},i={},n={},s={},r=t.project.findBinFiles(t.binaryDirName),o=t.project.findLibraryFiles(t.libraryDirName),c=t.project.findMainFile()
;if(r.map((([t,i])=>{e[t]=i})),o.map((([t,n])=>{e[t]=n,i[t]=n})),c){const[t,r]=c;e[t]=r,i[t]=r,s[t]=r,n[t]=yt(r)}
console.log("Start bundle es modules..."),Object.keys(i).length?(console.time("Bundle es modules"),
await this.rollup.bundleScripts(t,i,!0),console.timeEnd("Bundle es modules")):console.log("skip build es modules"),
console.log("Start bundle scripts..."),Object.keys(e).length?(console.time("Bundle scripts"),
await this.rollup.bundleScripts(t,e,!1),console.timeEnd("Bundle scripts")):console.log("skip build scripts"),
console.log("Start bundle types..."),Object.keys(n).length?(console.time("Bundle types"),
await this.rollup.bundleTypes(t,n),console.timeEnd("Bundle types")):console.log("skip build types")}}
w([L(),b("design:type",TypeScriptFileSystem)],BundleBuilder.prototype,"fs",void 0),
w([L(),b("design:type",TypeScriptCompiler)],BundleBuilder.prototype,"compiler",void 0),
w([L(),b("design:type",JsonParser)],BundleBuilder.prototype,"json",void 0),
w([L(),b("design:type",RollupService)],BundleBuilder.prototype,"rollup",void 0);class OptimizorBuilder{async build(e){
const i=this.fs.resolvePath(e.outputDir,e.artifactDirName),n=this.find(i)
;for(const e of n)t.basename(e).startsWith(".")||(this.image.canCompress(e)?(console.log("Compressing image",e),
await this.image.compress(e)):this.fs.canCompress(e)&&(console.log("Compressing file",e),await this.fs.compressGzip(e),
await this.fs.compressBrotli(e)))}find(t,e){return this.fs.readDirectory(t,e,void 0,void 0,1)}}
w([L(),b("design:type",class ImageService{canCompress(t){
return t.endsWith(".jpg")||t.endsWith(".jpeg")||t.endsWith(".png")}compress(t){let e
;if(t.endsWith(".jpg")||t.endsWith(".png"))e=t.slice(0,-4)+".webp";else{if(!t.endsWith(".jpeg"))return Promise.resolve()
;e=t.slice(0,-5)+".webp"}return m.default(t).webp({lossless:!0,force:!0,reductionEffort:6}).toFile(e)}
})],OptimizorBuilder.prototype,"image",void 0),
w([L(),b("design:type",TypeScriptFileSystem)],OptimizorBuilder.prototype,"fs",void 0),
w([L(),b("design:type",TypeScript)],OptimizorBuilder.prototype,"ts",void 0);class NodeProjectBuilder{async build(t){
return await this.compiler.build(t),await this.configurationBuilder.build(t),await this.artifactBuilder.build(t),
await this.packageBuilder.build(t),await this.bundleBuilder.build(t),await this.packageFileBuilder.build(t),
t.shouldCompress&&await this.optimizor.build(t),t}}function vt(){
console.log(),console.log(W("███████╗ ██████╗  ██████╗   ██████╗  ██████╗")),
console.log(W("██╔════╝ ██╔══██╗ ██╔══██╗ ██╔═══██╗ ██╔══██╗")),
console.log(W("█████╗   ██████╔╝ ██████╔╝ ██║   ██║ ██████╔╝")),
console.log(W("██╔══╝   ██╔══██╗ ██╔══██╗ ██║   ██║ ██╔══██╗")),
console.log(W("███████╗ ██║  ██║ ██║  ██║ ╚██████╔╝ ██║  ██║")),
console.log(W("╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═╝")),console.log()}
w([L(),b("design:type",ConfigurationBuilder)],NodeProjectBuilder.prototype,"configurationBuilder",void 0),
w([L(),b("design:type",ArtifactBuilder)],NodeProjectBuilder.prototype,"artifactBuilder",void 0),
w([L(),b("design:type",PackageBuilder)],NodeProjectBuilder.prototype,"packageBuilder",void 0),
w([L(),b("design:type",PackageFileBuilder)],NodeProjectBuilder.prototype,"packageFileBuilder",void 0),
w([L(),b("design:type",BundleBuilder)],NodeProjectBuilder.prototype,"bundleBuilder",void 0),
w([L(),b("design:type",TypeScriptCompiler)],NodeProjectBuilder.prototype,"compiler",void 0),
w([L(),b("design:type",OptimizorBuilder)],NodeProjectBuilder.prototype,"optimizor",void 0)
;class BuildService extends Service{async info(e){const i=[];var n;n=this.cli.version,console.log(),
console.log(Z("████████╗ ███████╗ ██████╗ ")),console.log(Z("╚══██╔══╝ ██╔════╝ ██╔══██╗")),
console.log(Z("   ██║    ███████╗ ██████╔╝")),console.log(Z("   ██║    ╚════██║ ██╔══██╗")),
console.log(Z("   ██║    ███████║ ██████╔╝")),console.log(Z("   ╚═╝    ╚══════╝ ╚═════╝ "),Z("@"+n)),console.log(),
i.push(["TypeScript",this.ts.version]),i.push(["Node.JS",process.version]),i.push(["DATE",e.timestamp.toISOString()])
;const s=e.project
;i.push(["Project Name",s.packageInfo.name]),e.version!==s.packageInfo.version?i.push(["Project Version",`${s.packageInfo.version} → ${Z(e.version)}`]):i.push(["Project Version",s.packageInfo.version])
;const o=G(this.env.homeDir,"typescript")
;o?r.lt(this.ts.version,o.version)?i.push(["Project TS Version",V(o.version+` (>${this.ts.version})`)]):this.ts.version!==o.version?i.push(["Project TS Version",o.version+` (<${this.ts.version})`]):i.push(["Project TS Version",o.version]):i.push(["Project TS Version","n/a"]),
i.push(["Project Node Version","n/a"]),i.push(["Configuration",e.configuration]),i.push(["Target",e.target]),
i.push(["Working Path",e.workingDir]),i.push(["Input Path",e.inputDir]),i.push(["Output Path",e.outputDir])
;const c=s.repository,a=c?c.getCommit(c.getBranch()):"";if(i.push(["Git Path",c?t.dirname(c.path):""]),
i.push(["Git Branch",c?c.getBranch():""]),i.push(["Git Commit",a?`${a.slice(0,-7)}${Z(a.slice(-7))}`:""]),
i.push(["Git Repository",c?c.getURL():""]),
e.inputDir==e.outputDir)throw new Error("Output dir can not be the same with input dir")
;Reflect.ownKeys(e.tsCompilerOptions)&&i.push(["Compiler Options",e.tsCompilerOptions]);let u=20
;for(const[t]of i)t.length>u&&(u=t.length);for(const[t,e]of i)console.log((t.toUpperCase()+" ").padEnd(u+3,"౼"),e)}
async build(t){return await this.info(t),this.projectBuilder.build(t)}}
w([L(),b("design:type",ProjectService)],BuildService.prototype,"project",void 0),
w([L(),b("design:type",NodeProjectBuilder)],BuildService.prototype,"projectBuilder",void 0)
;let wt=class TypeScriptBundler{async main(){const t=this.cli,e=require("commander")
;e.version(t.version,"-v, --version","Print version information and quit").usage("[options] COMMAND").description("A typescript bundler"),
e.command("info").description("Return information of current project").option("--prod","Sets the build configuration as mangle:1, beautify:1, compress:1, inline:1, configuration:production, target:es2018").option("--rc [rel]",'Same as --prod but add suffix "rc" to release version').option("--dev [rel]",'Same as --prod but add suffix "dev.YYYYMMDD" to release version').option("--insiders [rel]",'Same as --prod but add suffix "insiders.YYYYMMDD" to release version').option("-m, --mangle","Mangle output. default is no").option("-b, --beautify","Beautify output. default is no").option("-c, --compress","Compress output. default is no").option("-i, --inline","Inline devDependencies if requires. default is no").option("--configuration <name>","Sets the build configuration to the giving target. default is development").option("--target <target>","Sets ECMAScript version to build, e.g. es2015, es2016, es2017, es2018, es2019, es2020, es2021. default is es2018").option("--release <rel>","Add suffix -[rel].YYYYMMDD to package version. default no suffix").option("--decorator","Generate decorator. Overwrites settings in tsconfig.json").option("--no-decorator","Do not generate decorator. Overwrites settings in tsconfig.json").option("--metadata","Generate metadata. Overwrites settings in tsconfig.json").option("--no-metadata","Do not generate metadata. Overwrites settings in tsconfig.json").option("--in <input>","Sets the input folder. default is current directory").option("--out <output>","Sets the output folder. default is release").action((async t=>this.build.info(new nt(t)))),
e.command("build",{isDefault:!0
}).description("Build and bundle typescript project").option("--prod","Sets the build configuration as mangle:1, beautify:1, compress:1, inline:1, configuration:production, target:es2018").option("--rc [rel]",'Same as --prod but add suffix "rc" to release version').option("--dev [rel]",'Same as --prod but add suffix "dev.YYYYMMDD" to release version').option("--insiders [rel]",'Same as --prod but add suffix "insiders.YYYYMMDD" to release version').option("-m, --mangle","Mangle output. default is no").option("-b, --beautify","Beautify output. default is no").option("-c, --compress","Compress output. default is no").option("-i, --inline","Inline devDependencies if requires. default is no").option("--configuration <name>","Sets the build configuration to the giving target. default is development").option("--target <target>","Sets ECMAScript version to build, e.g. es2015, es2016, es2017, es2018, es2019, es2020, es2021. default is es2018").option("--release <rel>","Add suffix -[rel].YYYYMMDD to package version. default no suffix").option("--decorator","Generate decorator. Overwrites settings in tsconfig.json").option("--no-decorator","Do not generate decorator. Overwrites settings in tsconfig.json").option("--metadata","Generate metadata. Overwrites settings in tsconfig.json").option("--no-metadata","Do not generate metadata. Overwrites settings in tsconfig.json").option("--in <input>","Sets the input folder. default is current directory").option("--out <output>","Sets the output folder. default is release").action((async t=>this.build.build(new nt(t)).then((t=>{
const e=Date.now()-t.timestamp.getTime();var i;i=String(e/1e3)+"s",console.log(),console.log(H(" ██████╗   ██╗  ██╗")),
console.log(H("██╔═══██╗  ██║ ██╔╝")),console.log(H("██║   ██║  █████╔╝")),console.log(H("██║   ██║  ██╔═██╗")),
console.log(H("╚██████╔╝  ██║  ██╗")),console.log(H(" ╚═════╝   ╚═╝  ╚═╝"),H(i)),console.log()})))),
e.arguments("<command>").action((t=>{e.outputHelp(),console.log("  "+W(`Unknown command ${V(t)}.`)),console.log()})),
e.on("--help",(()=>{console.log(),console.log(`  Run '${function(...t){return f.default.cyan(t.join(" "))
}("tsb COMMAND --help")}' for more information on a command.`),console.log()})),
e.commands.forEach((t=>t.on("--help",(()=>console.log()))));const i=(t,i)=>{e.Command.prototype[t]=function(...e){
"unknownOption"===t&&this.m||(this.outputHelp(),console.log("  "+W(i(...e))),console.log(),process.exit(1))}}
;i("missingArgument",(t=>`Missing required argument ${V(`<${t}>`)}.`)),
i("unknownOption",(t=>`Unknown option ${V(t)}.`)),
i("optionMissingArgument",((t,e)=>`Missing required argument for option ${V(t.flags)}`+(e?`, got ${V(e)}`:"")));try{
e.parseAsync().catch((function(t){vt(),console.log(W("Build was interrupted")),console.log(W(t.stack||t.message))}))
}catch(t){vt(),console.log(W("Program error")),console.log(W(t.stack||t.message))}}}
;w([L(),b("design:type",Environment)],wt.prototype,"env",void 0),
w([L(),b("design:type",TypeScript)],wt.prototype,"ts",void 0),
w([L(),b("design:type",CliService)],wt.prototype,"cli",void 0),
w([L(),b("design:type",BuildService)],wt.prototype,"build",void 0),wt=S([J()],wt),(new wt).main();
