(window.LearnosityAmd=window.LearnosityAmd||[]).push([[66],{334:function(e,t,n){"use strict";var r=n(0),o=n.n(r),i=n(35),a=n(10);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var n,r=_getPrototypeOf(e);if(t){var o=_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var s=["exactMatch","partialMatch","partialMatchV2"],l=function isEmptyValidResponse(e){var t=o.a.getNested(e,"valid_response.value");return o.a.isEmpty(t)},c=function(e){!function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}(McqScorer,e);var t=_createSuper(McqScorer);function McqScorer(){return _classCallCheck(this,McqScorer),t.apply(this,arguments)}return function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(McqScorer,[{key:"getScoringData",value:function getScoringData(){return JSON.parse(JSON.stringify(this.scoringData))}},{key:"reset",value:function reset(e){var t=JSON.stringify(e);if(this.serializedData!==t){try{this.scoringData=function getScoringData(e){var t=e.question.validation,n=[];if(!function canValidateResponse(e){return!1!==o.a.getNested(e,"validation.automarkable")&&(e.valid_responses||e.validation&&(!l(e.validation)||!o.a.isEmpty(e.validation.alt_responses)))}(e.question))return{automarkable:!1};if(e.response=e.response||{},t&&t.scoring_type){if(!o.a.contains(s,t.scoring_type))throw new a.a.InvalidScoringTypeException(e.question.type,t.scoring_type);return t.valid_response&&n.push(t.valid_response),t.alt_responses&&(n=n.concat(t.alt_responses)),function processResponsesCurrentScoringFormat(e,t){var n={score:1,penaltyScore:0};return a.a.scoreArray(e,t,n,{ignoreOrder:!0})}(e,n)}return function processLegacyResponsesPre2140(e){var t,n=e.question.valid_responses,r=e.response&&e.response.value,i=(Math.abs(o.a.isNumber(e.question.penalty_score)?e.question.penalty_score:0),!0===e.question.multiple_responses),a=!0,s=[];r?(o.a.isArray(r)||(r=[r]),o.a.each(r,(function(e){var t,r=!1;for(t=0;t<n.length&&(n[t].value!=e||(r=!0,i));t++);r?s.push(!0):(s.push(!1),a=!1)})),i?(t=s.length===n.length&&o.a.all(s)?1:0,a=1===t):t=o.a.all(s)?1:0):a=null;return{score:t,responsesValid:s,maxScore:1,isValid:a}}(e=a.a.normalizeParameters(e))}(JSON.parse(JSON.stringify(e))),a.a.normalizeScores(this.scoringData,e)}catch(e){this.scoringData={error:e}}this.serializedData=t}return this}}]),McqScorer}(i.a);t.a=c},87:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(52),a=n(18),s=n.n(a),l=n(334),c=n(157),u=i.a.extend({richTextAttributes:["metadata.distractor_rationale_response_level[*]","options[*].label","options[*].value"],initialize:function initialize(){i.a.prototype.initialize.apply(this,arguments),this.shuffleService=new c.a(this,{key:"options"})},getOrderedOptions:function getOrderedOptions(){return this.shuffleService.get("options")},validateStartup:function validateStartup(){i.a.prototype.validateStartup.call(this),this.get("question").valid_responses&&o.a.each(this.get("question").valid_responses,(function(e){e.value&&(e.value=s.a.sanitizeHTML(e.value))}))},processResponseValue:function processResponseValue(e){this.hasResponse()||this.set({response:{value:[],type:this.RESPONSE_TYPE.ARRAY}},{silent:!0}),this.get("response").type===this.RESPONSE_TYPE.STRING&&(this.get("response").type=this.RESPONSE_TYPE.ARRAY),this.get("response").value=e},mapValidationMetadataToResponseState:function mapValidationMetadataToResponseState(e){var t,n,r,i,a,s="unattempted"===e.targetState,l=this.shuffleService.mapValueBasedOnOptionOrder(e.metadata);return s?r=this.getUnattemptedValues():(t="correct"===e.targetState,n=this.getResponseValidDetailed().partial,i=this.getMappableResponses(),r=o.a.filter(i,(function(e,r){return n[r]===t}))),a=this.getIndexesForResponseValues(r),o.a.map(a,(function(e,t){return{metadata:l[e],value:s?null:r[t],index:e}}))},getUnattemptedValues:function getUnattemptedValues(){return o.a.chain(this.get("question").options).pluck("value").difference(this.getMappableResponses()).value()},getIndexesForResponseValues:function getIndexesForResponseValues(e){var t=o.a.pluck(this.getOrderedOptions(),"value");return o.a.map(e,(function(e){return o.a.indexOf(t,e)}))},getScorerClass:function getScorerClass(){return l.a},validateResponse:function validateResponse(){return this.getScorer().validateIndividualResponses()},allowsMultipleResponses:function allowsMultipleResponses(){var e=this.get("question");return e.hasOwnProperty("multiple_responses")&&e.multiple_responses}}),p=n(177),f=n(127),d=n.n(f),y=n(129),h=n(128),b=n(130),v=n.n(b),m=n(178),_=n(171),g=n(21),S=n(23),O={MCQ_SELECT_OPTION:"mcq:selectOption",MCQ_UPDATE_SELECTED_OPTIONS:"mcq:updateSelectedOptions"};var R={actionTypes:O,selectOption:function selectOption(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(n,r){n(S.a.clearValidationUI()),n({type:O.MCQ_SELECT_OPTION,payload:{option:e,allowsMultipleResponses:t}});var i=o.a.map(r().mcq.selectedOptions,(function(e){return e.value}));n(g.a.updateResponseValue(i))}},updateSelectedOptions:function updateSelectedOptions(e){return{type:O.MCQ_UPDATE_SELECTED_OPTIONS,payload:{options:e}}}},P=n(138);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var n,r=_getPrototypeOf(e);if(t){var o=_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var C=function(e){!function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}(OptionInput,e);var t=_createSuper(OptionInput);function OptionInput(){return _classCallCheck(this,OptionInput),t.apply(this,arguments)}return function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(OptionInput,[{key:"componentDidUpdate",value:function componentDidUpdate(){this.props.shouldFocus?this.input.focus():this.input.blur()}},{key:"isAriaHidden",value:function isAriaHidden(){var e=this.props.inMaskingState,t=this.input&&-1===this.input.tabIndex;return e||t}},{key:"render",value:function render(){var e=this,t=this.props,n=t.responseId,r=t.isSelected,o=t.allowsMultipleResponses,i=t.value,a=t.index,s=t.readOnly,l=t.onChange,c=t.onKeyDown,u=t.onInputFocus,p=o?"checkbox":"radio",f="".concat(n,"_").concat(a);return d.a.createElement("input",{id:f,className:"lrn-input",type:p,value:i,disabled:s,onChange:l,checked:r,onKeyDown:c,onFocus:function onFocus(){return u(a)},ref:function ref(t){return e.input=t},"aria-hidden":this.isAriaHidden()})}}]),OptionInput}(d.a.Component),w=n(135);function optionLabel_typeof(e){return(optionLabel_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function optionLabel_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function optionLabel_defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function optionLabel_setPrototypeOf(e,t){return(optionLabel_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(e,t){return e.__proto__=t,e})(e,t)}function optionLabel_createSuper(e){var t=function optionLabel_isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var n,r=optionLabel_getPrototypeOf(e);if(t){var o=optionLabel_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return optionLabel_possibleConstructorReturn(this,n)}}function optionLabel_possibleConstructorReturn(e,t){if(t&&("object"===optionLabel_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return optionLabel_assertThisInitialized(e)}function optionLabel_assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function optionLabel_getPrototypeOf(e){return(optionLabel_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T=function(e){!function optionLabel_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&optionLabel_setPrototypeOf(e,t)}(OptionLabel,e);var t=optionLabel_createSuper(OptionLabel);function OptionLabel(){var e;optionLabel_classCallCheck(this,OptionLabel);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return _defineProperty(optionLabel_assertThisInitialized(e=t.call.apply(t,[this].concat(r))),"state",{screenReaderElement:null}),e}return function optionLabel_createClass(e,t,n){return t&&optionLabel_defineProperties(e.prototype,t),n&&optionLabel_defineProperties(e,n),e}(OptionLabel,[{key:"componentDidMount",value:function componentDidMount(){var e=this.getScreenReaderElement();this.setState({screenReaderElement:e})}},{key:"getScreenReaderElement",value:function getScreenReaderElement(){var e=this.props,t=w.a.getAriaLabelFromAllElements(e.label);return w.a.getText(t,!0,e.disableSpokenmathDistractors)}},{key:"render",value:function render(){var e=this,t=this.props,n=t.ariaHidden,r=t.choiceLabel,o=t.displayType,i=t.index,a=t.label,s=t.disabled,l=!!r&&"block"===o,c=!(a.indexOf("learnosity-feature")>-1);return d.a.createElement("div",{className:"lrn-possible-answer","aria-hidden":n},function buildLabel(){return l?d.a.createElement("span",{className:"lrn_choiceLabel"},Object(P.a)(r,i)):null}(),function buildContent(){var e=v()({lrn_singleRow:l,"lrn-label-disabled":s},"lrn_contentWrapper");return(d.a.createElement("div",{className:e,"aria-hidden":c,dangerouslySetInnerHTML:{__html:a}}))}(),c&&function buildSROnly(){var t=e.state.screenReaderElement;return(d.a.createElement("div",{className:"sr-only"},t))}())}}]),OptionLabel}(d.a.Component),E=n(207),k=n(14),q=n(182),M=n(133),L=n(276),x=n.n(L);function mcq_typeof(e){return(mcq_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function mcq_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function mcq_defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function mcq_setPrototypeOf(e,t){return(mcq_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(e,t){return e.__proto__=t,e})(e,t)}function mcq_createSuper(e){var t=function mcq_isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var n,r=mcq_getPrototypeOf(e);if(t){var o=mcq_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return mcq_possibleConstructorReturn(this,n)}}function mcq_possibleConstructorReturn(e,t){if(t&&("object"===mcq_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return mcq_assertThisInitialized(e)}function mcq_assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function mcq_getPrototypeOf(e){return(mcq_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function mcq_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function getOptionValidationClassName(e,t,n,r){var i=t.CORRECT,a=t.INCORRECT,s=t.VALID,l=e.validatedResponses,c=e.suggestedResponses,u=c&&c.value,p=!o.a.isEmpty(l)&&null!==l[r],f=u&&c.value.indexOf(n)>=0;return p?l[r]?i:a:e.isShowingCorrectAnswers&&f?s:""}function getResponseAccessibilityState(e,t){var n=t.CORRECT,r=t.INCORRECT,o=t.VALID,i=w.a.STATES;return e===n?i.CORRECT:e===r?i.INCORRECT:e===o?i.VALID:void 0}function getWrapperStyle(e){var t=e.columns,n=100;return t>0&&(n=100/t),{width:"".concat(n,"%")}}var I={indexToFocus:null,isMinSelectionWarningVisible:!1,isMaxSelectionWarningVisible:!1},D=function(e){!function mcq_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&mcq_setPrototypeOf(e,t)}(MCQ,e);var t=mcq_createSuper(MCQ);function MCQ(){var e,n,r;mcq_classCallCheck(this,MCQ);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return mcq_defineProperty(mcq_assertThisInitialized(e=t.call.apply(t,[this].concat(a))),"CLASSNAMES",{SELECTED:"lrn_selected",CORRECT:"lrn_correct",INCORRECT:"lrn_incorrect",VALID:"lrn_valid"}),mcq_defineProperty(mcq_assertThisInitialized(e),"state",I),mcq_defineProperty(mcq_assertThisInitialized(e),"maskedOptions",(n={},r=e.props.mcq.options,o.a.each(r,(function(e,t){return n[t]=!1})),n)),mcq_defineProperty(mcq_assertThisInitialized(e),"shouldUpdateOptionOnKeyEvent",!e.props.mcq.allowsMultipleResponses),mcq_defineProperty(mcq_assertThisInitialized(e),"focusedIndex",null),mcq_defineProperty(mcq_assertThisInitialized(e),"buildOption",(function(t,n){var r,i=e.props,a=e.CLASSNAMES,s=i.mcq,l=i.validatable,c=i.base,u=s.uiStyle,p=s.minSelection,f=s.maxSelection,y=u.inputBelowLabel,h=a.SELECTED,b=o.a.contains(s.selectedOptions,t),m=e.state,_=m.isMaxSelectionWarningVisible,g=m.isMinSelectionWarningVisible,S=getOptionValidationClassName(l,a,t,n),O=c.i18n.labels.ariaLiveText,R=c.disableSpokenmathDistractors,P=w.a.getResponseAccessibility({validationState:l.ariaGlobal.label,isMath:c.isMath,value:t.label,state:getResponseAccessibilityState(S,a),ariaLiveLabels:O,isMaxSelectionWarningVisible:_,isMinSelectionWarningVisible:g,minSelection:p,maxSelection:f,disableSpokenmathDistractors:R}),C=e.makeValidationStemNumerationLabel(t),T=e.makeInput(t,b),E=e.makeLabel(t,P,b),k=v()("lrn-mcq-option",S,(mcq_defineProperty(r={},h,!0===b),mcq_defineProperty(r,"has_stem_numeration",!o.a.isNull(C)),r));return y?d.a.createElement("li",{key:n,style:getWrapperStyle(u),className:k},C,E,T):d.a.createElement("li",{key:n,style:getWrapperStyle(u),className:k},C,T,E)})),mcq_defineProperty(mcq_assertThisInitialized(e),"onKeyDown",(function(t){var n=mcq_assertThisInitialized(e).focusedIndex,r=e.props.mcq.options,o=t.keyCode;40===o||39===o?(t.preventDefault(),n=n<r.length-1?n+1:0,e.applyFocus(n,!0)):38!==o&&37!==o||(t.preventDefault(),n=n<1?r.length-1:n-1,e.applyFocus(n,!1))})),mcq_defineProperty(mcq_assertThisInitialized(e),"onInputFocus",(function(t){e.focusedIndex=t})),e}return function mcq_createClass(e,t,n){return t&&mcq_defineProperties(e.prototype,t),n&&mcq_defineProperties(e,n),e}(MCQ,[{key:"reset",value:function reset(){this.setState(I)}},{key:"makeValidationStemNumerationLabel",value:function makeValidationStemNumerationLabel(e){var t=this.props.mcq.uiStyle,n=t.choiceLabel,r=t.type,o=this.props.validatable,i=o.responseLevelDistractorRationale,a=o.showDistractorRationale,s=o.validationState,l=o.validationStemNumeration,c=Object(k.h)(i,a.perResponse);if(n&&"block"===r||!s||0===c.length)return null;var u=Object(P.a)(l,e.defaultIndex);return(d.a.createElement("span",{className:"lrn-validation-stem-numeration"},u))}},{key:"makeInput",value:function makeInput(e,t){var n=this,r=e.defaultIndex,o=this.props,i=o.base,a=o.mcq,s=this.state.indexToFocus,l=i.inMaskingState,c=i.responseId,u=i.readOnly,p=i.disabled,f=a.uiStyle,y=a.allowsMultipleResponses,h=l||u||p||!0===this.maskedOptions[r],b=s===r;return d.a.createElement(C,{index:r,allowsMultipleResponses:y,responseId:c,readOnly:h,displayType:f.type,value:e.value,isSelected:t,onChange:function onChange(){return n.toggleOptionSelection(e,r)},shouldFocus:b,onInputFocus:this.onInputFocus,onKeyDown:this.onKeyDown,inMaskingState:l})}},{key:"makeLabel",value:function makeLabel(e,t,n){var r=this,i=e.defaultIndex,a=this.props,s=a.base,l=a.mcq,c=s.disableSpokenmathDistractors,u=s.responseId,p=s.inMaskingState,f=l.uiStyle,y=l.selectedOptions,h=l.maxSelection,b="".concat(u,"_").concat(i),v=this.makeAriaText(t),m=p||t.visible,_=o.a.findWhere(y,e),g=h===y.length&&!_;return d.a.createElement(d.a.Fragment,null,d.a.createElement("label",{className:"lrn-label",htmlFor:b},v,d.a.createElement(T,{index:i,disableSpokenmathDistractors:c,label:e.label,displayType:f.type,choiceLabel:f.choiceLabel,ariaHidden:m,disabled:g})),d.a.createElement(E.a,{hidden:n,onChange:function onChange(e){return r.maskedOptions[i]=e},ariaLabel:e.maskableAriaLabel}))}},{key:"makeAriaText",value:function makeAriaText(e){return d.a.createElement(_.a.ScreenReaderAriaText,{data:e})}},{key:"toggleOptionSelection",value:function toggleOptionSelection(e,t){var n=this.props,r=n.mcqActions,i=n.mcq,a=i.allowsMultipleResponses,s=i.minSelection,l=i.maxSelection,c=i.selectedOptions,u=o.a.findWhere(c,e);l!==c.length||u?(r.selectOption(e,a),a&&s&&this.setState({isMinSelectionWarningVisible:s>c.length}),this.setState({indexToFocus:t,isMaxSelectionWarningVisible:!1})):this.setState({indexToFocus:t,isMaxSelectionWarningVisible:!0})}},{key:"applyFocus",value:function applyFocus(e,t){var n=function getNextFocusableIndex(e,t,n){if(e[t]){var r=[];if(o.a.each(e,(function(e,o){e||(n&&o>t||!n&&o<t)&&r.push(parseInt(o,10))})),n||r.reverse(),!r.length)return!1;t=r[0]}return t}(this.maskedOptions,e,t);if(!1!==n)if(this.focusedIndex=n,this.shouldUpdateOptionOnKeyEvent){var r=this.props.mcq.options[n];this.toggleOptionSelection(r,r.defaultIndex)}else this.setState({indexToFocus:n})}},{key:"componentDidMount",value:function componentDidMount(){var e=this.props,t=e.mcq,n=e.base,r=t.options,i=n.isMath,a=n.disableSpokenmathDistractors;o.a.each(r,(function(e){e.maskableAriaLabel=w.a.getText(e.label,i,a)}))}},{key:"UNSAFE_componentWillReceiveProps",value:function UNSAFE_componentWillReceiveProps(e){var t=e.base,n=e.validatable,r=e.mcq,o=t.isResumeState,i=t.isReviewState,a=t.isAttempted,s=r.minSelection,l=r.selectedOptions;n.validatedResponses&&null!==this.focusedIndex&&(this.focusedIndex=null,this.setState({indexToFocus:null})),(o||i)&&this.setState({isMinSelectionWarningVisible:a&&s>l.length})}},{key:"messageTypeHelper",value:function messageTypeHelper(){var e=this.state,t=e.isMaxSelectionWarningVisible,n=e.isMinSelectionWarningVisible;return t?this.messageType="warning":n&&(this.messageType="info"),this.messageType}},{key:"getWarningMessage",value:function getWarningMessage(){var e=this.state,t=e.isMaxSelectionWarningVisible,n=e.isMinSelectionWarningVisible,r=this.props.mcq,o=r.maxSelection,i=r.minSelection,a=this.props.base.i18n.labels,s=a.minResponseMessage,l=a.minResponsesMessage,c=a.maxResponseMessage,u=a.maxResponsesMessage;return t?o>1?Object(M.a)(u,{maxSelection:o}):c:n?i>1?Object(M.a)(l,{minSelection:i}):s:null}},{key:"render",value:function render(){var e=this.props,t=e.base,n=e.mcq,r=t.responseId,i=t.i18n,a=n.uiStyle,s=n.options,l=this.getValidatableStateClassName(),c=v()({"lds-message--horizontal-centered":"horizontal-input-bottom"===a.type}),u=this.getWarningMessage(),p="group-".concat(r);return d.a.createElement(m.a.ValidatableQuestion,null,d.a.createElement("div",{role:"group","aria-labelledby":"".concat(p," stimulus-").concat(r)},d.a.createElement("div",{id:p,"aria-hidden":"true",className:"sr-only"},i.labels.ariaLabel.mcq.responses),d.a.createElement("ul",{className:"lrn-response-validate-wrapper lrn_mcqgroup lrn_mcqgroup-".concat(a.type," ").concat(l),role:"presentation"},o.a.map(s,this.buildOption))),d.a.createElement("span",{className:"sr-only","aria-live":"assertive"},u),d.a.createElement(x.a,{className:c,type:this.messageTypeHelper(),iconClassMapping:{info:"lrn-icon-info",warning:"lrn-icon-warning"},animation:{enter:q.a,leave:q.b},visibility:null!==u,ariaHidden:!0},u))}},{key:"getValidatableStateClassName",value:function getValidatableStateClassName(){var e=this.props,t=e.base,n=e.validatable;if(!t.isAttempted||!n.canShowGlobalValidationUI)return"";var r=n.validationState;return"correct"===r?"lrn_correct":"incorrect"===r?"lrn_incorrect":""}}]),MCQ}(d.a.Component),N=D=h.b((function(e){return{base:e.base,validatable:e.validatable,mcq:e.mcq}}),(function(e){return{mcqActions:y.b(R,e)}}),null,{forwardRef:!0})(D);function dataService_typeof(e){return(dataService_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function dataService_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function dataService_defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _get(e,t,n){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function _get(e,t,n){var r=function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=dataService_getPrototypeOf(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function dataService_setPrototypeOf(e,t){return(dataService_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(e,t){return e.__proto__=t,e})(e,t)}function dataService_createSuper(e){var t=function dataService_isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var n,r=dataService_getPrototypeOf(e);if(t){var o=dataService_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return dataService_possibleConstructorReturn(this,n)}}function dataService_possibleConstructorReturn(e,t){if(t&&("object"===dataService_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function dataService_assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function dataService_getPrototypeOf(e){return(dataService_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var V,j=function(e){!function dataService_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&dataService_setPrototypeOf(e,t)}(MCQDataService,e);var t=dataService_createSuper(MCQDataService);function MCQDataService(){return dataService_classCallCheck(this,MCQDataService),t.apply(this,arguments)}return function dataService_createClass(e,t,n){return t&&dataService_defineProperties(e.prototype,t),n&&dataService_defineProperties(e,n),e}(MCQDataService,[{key:"getInitialState",value:function getInitialState(){var e=_get(dataService_getPrototypeOf(MCQDataService.prototype),"getInitialState",this).call(this),t=e.validatable;return t=o.a.extend(t,{ariaGlobal:{visible:this.isReviewState,label:this.getValidatableAriaLabel()}}),"block"===this.displayType&&this.choiceLabel&&(t.validationStemNumeration=this.choiceLabel),o.a.extend(e,{mcq:{selectedOptions:this.selectedOptions,options:this.options,allowsMultipleResponses:this.allowsMultipleResponses,uiStyle:{choiceLabel:this.choiceLabel,type:this.displayType,orientation:this.orientation,columns:this.columns,inputBelowLabel:"horizontal-input-bottom"===this.displayType},minSelection:this.minSelection,maxSelection:this.maxSelection},validatable:t})}},{key:"getValidatableAriaLabel",value:function getValidatableAriaLabel(){if(this.isReviewState){var e=this.VALIDATION_STATES,t=e.CORRECT,n=e.INCORRECT;return this.isResponseValid()?t:n}}},{key:"getValidatedResponses",value:function getValidatedResponses(){var e=this.getResponse();if(e){var t=e.value||[],n=this.validateResponse(),r=this.options;if(!n)return;return o.a.map(r,(function(e){var r=t.indexOf(e.value);return r>=0?n[r]:null}))}}},{key:"getMappedValidatedResponsesData",value:function getMappedValidatedResponsesData(e){var t=this.options;return o.a.map(e,(function(e,n){return{validatedValue:e,text:t[n].plainText}}))}},{key:"getMappedSuggestedResponsesData",value:function getMappedSuggestedResponsesData(e){var t=[];return o.a.each(e,(function(e){o.a.isUndefined(e)||t.push({text:e.plainText})})),t}},{key:"getSuggestedResponses",value:function getSuggestedResponses(){var e=_get(dataService_getPrototypeOf(MCQDataService.prototype),"getSuggestedResponses",this).call(this),t=this.options;return{value:o.a.map(e.value,(function(e){return o.a.findWhere(t,{value:e})}))}}},{key:"canShowGlobalValidationUI",get:function get(){var e=o.a.getNested(this.question,"validation.scoring_type");return(!e||"exactMatch"===e)&&_get(dataService_getPrototypeOf(MCQDataService.prototype),"canShowGlobalValidationUI",this)}},{key:"selectedOptions",get:function get(){var e=o.a.getNested(this.getResponse(),"value")||[],t=this.options;return o.a.chain(e).map((function(e){return o.a.findWhere(t,{value:e})})).compact().value()}},{key:"options",get:function get(){if(o.a.isUndefined(this.data.options)){var e=this.model.getOrderedOptions(),t=this.orientation,n=this.columns;o.a.each(e,(function(e,t){return e.defaultIndex=t})),n>1&&"vertical"===t&&(e=this._prepareLabelColumns(e,n)),this.data.options=o.a.map(e,(function(e){var t=e.value,n=e.label;return{value:t,label:n,plainText:w.a.getAriaLabelFromAllElements(n),defaultIndex:e.defaultIndex}}))}return this.data.options}},{key:"choiceLabel",get:function get(){if(o.a.isUndefined(this.data.choiceLabel)){var e=this.question,t=o.a.getNested(e,"ui_style.choice_label");o.a.contains(["number","lower-alpha","upper-alpha"],t)&&(this.data.choiceLabel=t)}return this.data.choiceLabel}},{key:"displayType",get:function get(){return o.a.getNested(this.question,"ui_style.type")||"vertical"}},{key:"allowsMultipleResponses",get:function get(){return!!this.question.multiple_responses}},{key:"orientation",get:function get(){if(o.a.isUndefined(this.data.orientation)){var e=o.a.getNested(this.question,"ui_style.orientation");this.data.orientation=o.a.contains(["horizontal","vertical"],e)?e:"vertical"}return this.data.orientation}},{key:"_prepareLabelColumns",value:function _prepareLabelColumns(e,t){for(var n=[],r=e.length,o=0;o<t;o++)for(var i=o;i<r;i+=t)n[i]=e.shift();return n}},{key:"columns",get:function get(){var e=o.a.getNested(this.question,"ui_style.columns");return parseInt(e,10)}},{key:"minSelection",get:function get(){var e=this.question.min_selection;return e||0}},{key:"maxSelection",get:function get(){var e=this.question.max_selection;return e||1/0}}]),MCQDataService}(n(56).a),A=n(25);function reducer_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var F=R.actionTypes,z=(reducer_defineProperty(V={},F.MCQ_SELECT_OPTION,(function(e,t){var n=t.option,r=t.allowsMultipleResponses,o=e.selectedOptions;if(r){var i=o.indexOf(n);i>=0?o.splice(i,1):o.push(n)}else o=[n];return{selectedOptions:o}})),reducer_defineProperty(V,F.MCQ_UPDATE_SELECTED_OPTIONS,(function(e,t){return{selectedOptions:t.options}})),V),W=Object(A.a)(z,{selectedOptions:[]}),Q=p.a.extend({maskable:!0,ViewComponent:N,DataService:j,forwardRef:!0,getReducers:function getReducers(){var e=p.a.prototype.getReducers.apply(this,arguments);return o.a.extend(e,{mcq:W})},addFacadeMethods:function addFacadeMethods(e){var t,n=this.getDataService();e.getProcessedOptions=function(){if(o.a.isUndefined(t)){var e=n.options,r=n.choiceLabel;t=o.a.map(e,(function(e,t){return{label:e.label,value:e.value,choice_label:Object(P.a)(r,t)}}))}return t},e.isValid=o.a.wrap(e.isValid,(function(t,r){var i=t.call(e,r);if(i&&r){var a=o.a.getNested(n.getResponse(),"value")||[],s=i.partial;i.partial=o.a.map(n.options,(function(e){var t=a.indexOf(e.value);return s&&t>=0?s[t]:null}))}return i}))}});t.default={View:Q,Model:u}}}]);