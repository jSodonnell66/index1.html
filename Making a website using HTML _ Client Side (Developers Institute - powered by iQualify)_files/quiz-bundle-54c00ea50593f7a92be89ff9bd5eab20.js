!function(){"use strict";var e=angular.module("iqfy");e.factory("$iqQuizConfigAPI",["$resource","iqfy",function(e,t){return e("/api/v1"+(t.buildMode?"/build/":"/")+"quiz/:offeringid/:pageid/config")}]),e.factory("$iqQuizAPI",["$resource","iqfy","QuizConfig",function(e,t,i){var n={offeringid:"@offeringid",pageid:"@pageid",quizid:"@quizid",type:"@type",action:"@action"},u=t.buildMode?"/build":"";return function(t){return function(t){return e(u+"/user/:type/:offeringid/:pageid/:quizid/:action",n,{get:{method:"GET",ignoreLoadingBar:t||!1}})}}}]),e.factory("$iqInstanceQuizAPI",["quizService","$iqQuizAPI",function(e,t){return t({offeringid:e.offeringId,pageid:e.pageId,quizid:e.quizId})}]),e.factory("$iqQuizTimeRemainingAPI",["$iqInstanceQuizAPI",function(e){return e(!0)}]),e.factory("$iqQuizStartAPI",["$iqInstanceQuizAPI",function(e){return e(!0)}]),e.factory("$iqQuizAttemptDetailAPI",["$iqInstanceQuizAPI",function(e){return e()}]),e.factory("$iqQuizSubmissionAPI",["$resource","iqfy","QuizConfig",function(e,t,i){var n={offeringid:"@offeringid",pageid:"@pageid",quizid:"@quizid",type:"@type",attemptid:"@attemptid"};return e((t.buildMode?"/build":"")+"/user/:type/:offeringid/:pageid/:quizid/:attemptid/attempt",n)}]),e.factory("$iqQuizResultAPI",["$resource","iqfy","QuizConfig",function(e,t,i){var n={offeringid:"@offeringid",pageid:"@pageid",quizid:"@quizid",type:"@type",attemptid:"@attemptid"};return e((t.buildMode?"/build":"")+"/user/:type/:offeringid/:pageid/:quizid/:attemptid/result",n)}])}(),function(){"use strict";angular.module("iqfy").factory("QuizQuestionsAPI",["$resource","iqfyVars","QuizConfig",function(e,t,i){var n={offeringid:"@offeringid",type:"@type",pageid:"@pageid"};return e((t.buildMode?"/build":"")+"/user/:type/:offeringid/:pageid/:quizid/:attemptid/progress/:questionid",n,{save:{method:"POST",ignoreLoadingBar:!0}})}]).factory("QuizQuestionScoreAPI",["$resource","iqfyVars","QuizConfig",function(e,t,i){var n={offeringid:"@offeringid",type:"@type",pageid:"@pageid",quizid:"@quizid",attemptid:"@attemptid",questionid:"@questionid"};return e((t.buildMode?"/build":"")+"/user/:type/:offeringid/:pageid/:quizid/:attemptid/score-question/:questionid",n,{save:{method:"POST",ignoreLoadingBar:!1}})}])}(),function(){"use strict";angular.module("iqfy").factory("$iqQuizRouteHelper",["quizService","QuizConfig","$location","$window","$routeParams",function(e,t,i,n,u){function s(){return u.pageid||n.iqfy.pageId}function o(){var n=s(),u={main:"/page/"+n+"/quiz",start:"/page/"+n+"/quiz/start",questions:"/page/"+n+"/quiz/questions",review:"/page/"+n+"/quiz/review"};if(i.path().indexOf(u.start)>-1){if("boolean"!=typeof e.attemptStarted())return void("undefined"!=typeof rg4js&&rg4js("send",{error:new Error("The quizService was unavailable on quiz start page"),customData:t.get()}));e.attemptStarted()&&("practice_quiz"==t.get().quiz.type?(e.showQuestions=!0,i.path(u.questions)):i.path(u.review))}i.path().indexOf(u.questions)>-1&&("practice_quiz"===t.get().quiz.type||e.showQuestions||r(),e.timeIsUp&&r())}function r(){n.location.href=n.location.pathname+"#/page/"+s()}return{enforceRules:o,reloadApp:r}}])}(),function(){"use strict";var e=angular.module("iqfy");e.service("QuizConfig",["$iqQuizConfigAPI","ContentService","offering","$routeParams","$q","$window","$location","toastr","keywordHighlighter","$i18next",function(e,t,i,n,u,s,o,r,a,d){var c={},p=i.url&&0===i.url.indexOf("/build");return c.store={},c.init=function(e){var u=n.pageid||s.iqfy.pageId;this.isConfigured()?e():(this.fetch().then(e,function(){r.error(d.t("ErrorLoadingTryAgain"))}),p||t.getPage(i.id,u).then(function(){t.currentPage=t.pages[u]}))},c.isConfigured=function(){var e=n.pageid||s.iqfy.pageId;return c.store[e]&&c.store[e].quiz&&c.store[e].quiz.__uid},c.get=function(){var e=n.pageid||s.iqfy.pageId;return c.store[e]},c.reset=function(){var e=n.pageid||s.iqfy.pageId;c.store[e]={quiz:{},quizMetadata:{}}},c.fetch=function(){var t=u.defer(),r=i.id,p=n.pageid||s.iqfy.pageId;return e.get({offeringid:r,pageid:p}).$promise.then(function(e){if(e&&e.quiz&&e.quizMetadata){var n=o.search().keywords;if(n&&n.length){var u=n.split("|");e.quiz=a.highlight(u,e.quiz)}var s;s=e.quizMetadata.maxAttempts?e.quizMetadata.maxAttempts-e.quizMetadata.usedAttempts:1/0,c.store[p]={quiz:e.quiz,offeringId:i.id,pageId:p,totalNumberOfQuestions:e.questionLength,quizMetadata:e.quizMetadata,remainingAttempts:s,quizStatus:"practice_quiz"==e.quiz.type?"open":e.quizMetadata.quizStatus,noAttemptsLeft:e.quizMetadata.noAttemptsLeft,hasAttempted:!!e.quizMetadata.usedAttempts,quizOpens:e.quizMetadata.dateTimeOpen,quizCloses:e.quizMetadata.dateTimeClosed,durationFormated:d.t(e.quizMetadata.durationMinutes?"MinuteWithCount_plural":"NotTimed",{count:e.quizMetadata.durationMinutes})}}else t.reject();t.resolve()},function(e){t.reject(e)}),t.promise},c}]),e.service("quizService",["QuizConfig","$iqQuizSubmissionAPI","_",function(e,t,i){return{init:function(){this.offeringId=e.get().offeringId,this.pageId=e.get().pageId,this.quizId=e.get().quiz.__uid,this.attemptStatus=e.get().quizMetadata.latestAttemptStatus,e.get().quizMetadata.userQuizAttemptId&&(this.attemptId=e.get().quizMetadata.userQuizAttemptId)},setSelectedAnswer:function(e,t){this.selectedAnswers=this.selectedAnswers||{},this.selectedAnswers[e]=t},attemptStarted:function(){return"started"===this.attemptStatus},quizStatus:function(){return"complete"===this.attemptStatus?"read-only":"questions"!==this.previousStep||this.timeIsUp?this.timeIsUp?"read-only":"continue":"confirm"},getAnswersForQuestion:function(e){return(this.selectedAnswers||{})[e]},createAnswersBodyForQuestion:function(e){var t={attemptId:this.attemptId,quiz:{}},n=this;return i.each(e,function(e,u){i.each(n.questions,function(s){if(s.__uid==u)switch(n.getQuestionType(s)){case"matcher":i.each(e.left,function(i,n){t.quiz[u]=t.quiz[u]||{},t.quiz[u][i]=e.right[n]});break;case"single":default:t.quiz[u]=e}})}),t},hasAnsweredQuestion:function(e){var t=this.getAnswersForQuestion(e);return 0===t||!!t&&((!i.isArray(t)||!i.isEmpty(t))&&!!t)},getQuestionType:function(e){var t=e.item_data.answerArea,i=e.item_data.question;if(i.widgets&&i.widgets.matcher1)return"matcher";if(t){if("radio"===t.type&&!t.options.multipleSelect)return"single";if(t.options.multipleSelect)return"multi"}},sanitizeMultiSelectAnswers:function(e){return i.each(e,function(t,i){!0===t&&(e[i]=i)}),i.omitBy(e,i.isUndefined)},submitAnswers:function(i,n){var u=this.createAnswersBodyForQuestion(this.selectedAnswers),s={offeringid:this.offeringId,pageid:this.pageId,quizid:this.quizId,attemptid:this.attemptId,type:e.get().quiz.type};t.save(s,u,i,n),this.selectedAnswers={}},hashCode:function(e){for(var t=0,i=0,n=e.length;i<n;)t=(t<<5)-t+e.charCodeAt(i++)<<0;return t}}}])}(),function(){"use strict";angular.module("iqfy").service("$iqQuizTimerService",["$interval","$iqQuizTimeRemainingAPI","quizService","QuizConfig",function(e,t,i,n){function u(){if(n.get()&&n.get().quiz&&n.get().quiz.type){var u={offeringid:i.offeringId,pageid:i.pageId,quizid:n.get().quiz.__uid,type:n.get().quiz.type,action:"time-remaining"};t.get(u,function(t){(t.notTimed||t.timeIsUp)&&e.cancel(s),"function"==typeof o&&o(t)},function(t){t.data&&"attemptCompleted"===t.data.status&&(e.cancel(s),"function"==typeof r&&r(t))})}}var s,o,r;return n.get()&&n.get().quiz&&"practice_quiz"!==n.get().quiz.type&&u(),{start:function(){s||(s=e(u,25e3))},stop:function(){s&&(e.cancel(s),s=null)},on:function(e,t){"update"===e&&(o=t),"error"===e&&(r=t)}}}])}(),function(){"use strict";angular.module("iqfy").controller("QuizIndexController",["$scope","$location","$window","quizService","QuizConfig","$iqQuizStartAPI","$iqQuizAttemptDetailAPI","$iqQuizRouteHelper","$iqQuizResultAPI","offering","$routeParams","iqfy","SideNavService","toastr","$i18next",function(e,t,i,n,u,s,o,r,a,d,c,p,f,g,l){e.quizService=n,e.hasPublishedVersions=!!i.iqfy&&Boolean(i.iqfy.hasPublishedVersions),e.QuizConfig=u,e.offering=d,e.pageId=c.pageid||i.iqfy.pageId,e.ctrlName="QuizIndexController",e.toggle={searchPanel:!1,socialNotesPanel:!1},e.loading=!0,e.timezone="Pacific/Auckland",e.sideNavService=f,e.sideNavService.currentNavItem="content",e.subscription=e.sideNavService.toggleSocialNotesPanel$.subscribe(function(){e.toggle.socialNotesPanel=!e.toggle.socialNotesPanel}),e.$on("$destroy",function(){e.subscription.unsubscribe()}),p&&p.orgSettings&&p.orgSettings.timezone&&(e.timezone=p.orgSettings.timezone),e.buildMode=!!i.iqfy&&i.iqfy.buildMode,u.init(function(){n.init(),r.enforceRules(),e.loading=!1}),e.startQuiz=function(){e.startingQuiz=!0;var i={offeringid:n.offeringId,pageid:n.pageId,quizid:u.get().quiz.__uid,type:u.get().quiz.type,action:"start"};s.save(i,function(s){s&&"ok"==s.status&&(i.action=s.attemptId,o.get(i,function(i){e.startingQuiz=!1,n.timeIsUp=!1,n.attemptId=s.attemptId,u.get().quizMetadata.userQuizAttemptId=s.attemptId,n.attemptStatus=s.attemptStatus,u.get().quizMetadata.latestAttemptStatus=s.attemptStatus,n.quizQuestionsHTML=i.html,n.showQuestions=!e.showQuestions,n.questions=i.questions,t.path("/page/"+e.pageId+"/quiz/questions")},function(t){e.startingQuiz=!1,g.error(l.t("SomethingWentWrongTryAgain")),window.location.reload(!0)}))},function(){r.reloadApp()})},e.viewResults=function(){e.fetchingResults=!0,a.get({attemptid:n.attemptId,offeringid:n.offeringId,pageid:n.pageId,quizid:n.quizId,type:u.get().quiz.type},function(i){n.attemptResult=i.scoreObj,n.attemptResult.result=i.scoreObj.score,n.attemptResult.questionCount=i.scoreObj.questionsAskedCount,n.questions=i.questions,e.fetchingResults=!1,t.path("/page/"+e.pageId+"/quiz/results/")})},e.isNumber=function(e){return angular.isNumber(e)},e.getLearnerQuestions=function(){var e,t=u.get();return t&&t.quiz?(void 0===t.quiz.number_of_questions?t.quiz.themes&&(e=(t.quiz.themes[0]||{}).number_of_questions):e=t.quiz.number_of_questions,"practice_quiz"!==t.quiz.type||e?t.quiz.themes?t.quiz.themes.reduce(function(e,t){return e+=t.number_of_questions},0):0:t.quiz.totalQuestions):0}}])}(),function(){"use strict";angular.module("iqfy").controller("QuizQuestionsController",["$scope","$location","toastr","$routeParams","$timeout","_","QuizConfig","quizService","$iqQuizTimerService","$iqQuizRouteHelper","$iqQuizAttemptDetailAPI","iqfyVars","$window","QuizQuestionScoreAPI","offlineService","$i18next","SideNavService",function(e,t,i,n,u,s,o,r,a,d,c,p,f,g,l,q,m){e.ctrlName="QuizQuestionsController",e.QuizConfig=o,e.timeIsUp=!1,e.submitted=!1,e.viewResults=!1,e.previewMode="<b>"+q.t("PreviewMode")+"</b>",e.toggle={searchPanel:!1,socialNotesPanel:!1},e.sideNavService=m,e.sideNavService.currentNavItem="content",e.subscription=e.sideNavService.toggleSocialNotesPanel$.subscribe(function(){e.toggle.socialNotesPanel=!e.toggle.socialNotesPanel}),e.$on("$destroy",function(){e.subscription.unsubscribe()}),e.getQuestions=function(t){return e.displayQuestion[t]},e.getAnswersForCurrentQuestion=function(){var t=e.currentQuestion;return e.quizService.getAnswersForQuestion(t)},e.hasAnsweredCurrentQuestion=function(){var t=e.currentQuestion;return e.quizService.hasAnsweredQuestion(t)},e.submitSingleQuestion=function(){e.submittingSingleQuestion=!0;var t={offeringid:r.offeringId,pageid:r.pageId,questionid:e.currentQuestion,quizid:o.get().quiz.__uid,type:o.get().quiz.type,attemptid:r.attemptId},n=e.getAnswersForCurrentQuestion(),u={};"object"==typeof n&&(n=r.sanitizeMultiSelectAnswers(angular.copy(n))),u[e.currentQuestion]=n;var s=r.createAnswersBodyForQuestion(u);g.save(t,{quizAnswers:s.quiz},function(t){e.submittingSingleQuestion=!1,e.submitted=!0,t.scoreObj&&void 0!==t.scoreObj.score&&(e.questionFeedback=1===t.scoreObj.score)},function(){e.submittingSingleQuestion=!1,i.error(q.t("UnableSubmitQuestion"))})},e.next=function(){e.submitted=!1;var t,i;if(e.currentQuestion){if(-1===(t=e.questionIds.indexOf(e.currentQuestion)))throw new Error("Question not found in list");i=e.questionIds[t+1]}else i=e.questionIds[0];i?(e.currentQuestion=i,e.displayQuestion={},e.displayQuestion[i]=!0):e.viewResults=!0},e.renderQuestionByQuestionQuiz=function(){e.questionByQuestion?(e.questionIds=s.keys(e.questions),e.next()):e.viewResults=!0},e.getSubmitBtnLabel=function(){return"practice_quiz"==o.get().quiz.type?q.t("SeeResults"):q.t("ReviewMyAnswers")},e.submit=function(){e.submittingQuiz=!0,"practice_quiz"==o.get().quiz.type||e.buildMode?r.submitAnswers(function(i){e.submittingQuiz=!1,r.attemptResult=i,t.path("/page/"+r.pageId+"/quiz/results/")},function(){e.submittingQuiz=!1,f.location.reload(!0)}):(e.loadingQuestionsNextStep=!0,$(".modal").modal("hide"),u(function(){t.path("/page/"+r.pageId+"/quiz/review/")},200))},e.isInputDisabled=function(){return!!l.isQuizOffline||e.submitted},e.isReviewButtonVisible=function(){return!l.isQuizOffline&&!e.buildMode&&e.viewResults},o.init(function(){r.init(),e.quizService=r,d.enforceRules(),e.buildMode=p.buildMode,e.showQuestions=r.showQuestions,e.quizQuestionsHTML=r.quizQuestionsHTML,e.questions=r.questions,e.practiceQuiz="practice_quiz"===o.get().quiz.type,e.practiceQuiz&&!e.buildMode&&(r.questionByQuestion=!0,e.questionByQuestion=!0,e.currentQuestion=null,e.displayQuestion={},e.questions=null),e.questionByQuestion||(e.viewResults=!0);var t=e.showQuestions&&e.questions;if(t&&e.renderQuestionByQuestionQuiz(),!t&&r.attemptId&&"practice_quiz"==o.get().quiz.type){var i={offeringid:r.offeringId,pageid:r.pageId,quizid:o.get().quiz.__uid,type:o.get().quiz.type,action:r.attemptId};r.quizQuestionsHTML=!1,c.get(i,function(t){e.quizQuestionsHTML=t.html,e.showQuestions=!0,e.questions=t.questions,r.questions=t.questions,r.showQuestions=!0,e.renderQuestionByQuestionQuiz(),u(function(){"undefined"!=typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub,"courseContent"])},1e3)})}n.id&&u(function(){var e=n.id,t=angular.element(document.getElementById(e)),i=angular.element(document.body);t.length&&i.animate({scrollTop:t.offset().top})},1e3),u(function(){"undefined"!=typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub,"courseContent"])},1e3),"practice_quiz"!==o.get().quiz.type&&(a.start(),a.on("update",function(t){t.timed&&(e.timed=t.timed,e.timeRemaining=t.timeRemaining,e.percentLeft=t.percentLeft,e.timeIsUp=t.timeIsUp,t.timeIsUp&&(r.timeIsUp=!0,e.submit()))}))})}])}(),function(){"use strict";angular.module("iqfy").controller("QuizResultsController",["$scope","$window","$location","quizService","QuizConfig","$i18next","SideNavService",function(e,t,i,n,u,s,o){e.ctrlName="QuizResultsController",e.quizService=n,e.QuizConfig=u,e.toggle={searchPanel:!1,socialNotesPanel:!1},e.sideNavService=o,e.sideNavService.currentNavItem="content",e.subscription=e.sideNavService.toggleSocialNotesPanel$.subscribe(function(){e.toggle.socialNotesPanel=!e.toggle.socialNotesPanel}),e.$on("$destroy",function(){e.subscription.unsubscribe()}),e.getThemeScore=function(e){if(n.attemptResult&&n.attemptResult.perTheme&&n.attemptResult.perTheme[e.filter]){var t=_.filter(n.questions,function(t){return t.tags.indexOf(e.filter)>-1}).length;return t>0?Math.round(n.attemptResult.perTheme[e.filter]/t*100):0}return 0},e.getNextPage=function(){var e=angular.element(".playlist-item.next");return e.length?{nextBtnHref:e.attr("href"),nextBtnTitle:s.t("ContinueCourse")}:{nextBtnHref:t.offeringURL,nextBtnTitle:s.t("CourseHome")}},e.loading=!0,u.init(function(){if(e.loading=!1,n.init(),"practice_quiz"==u.get().quiz.type&&(n.showQuestions=!1,n.attemptStatus="complete",u.get().quizMetadata.latestAttemptStatus=n.attemptStatus),n.attemptResult=n.attemptResult||{},void 0===n.attemptResult.result)return void i.path("/page/"+n.pageId+"/quiz/start");e.attemptResult=!0,e.attemptAgainBtnHref=t.location.pathname+"#/page/"+n.pageId+"/quiz/start",e.score=(n.attemptResult.result||0)+"/"+n.attemptResult.questionCount,e.isProgressiveAttempts=n.isProgressiveAttempts,e.canAttemptAgain="true"===n.canAttemptAgain&&parseInt(n.maxAttempts)!==parseInt(n.usedAttempts||0)+1})}])}(),function(){"use strict";angular.module("iqfy").controller("QuizReviewController",["$scope","$window","$location","_","$base64","$timeout","quizService","QuizConfig","$iqQuizAttemptDetailAPI","$iqQuizTimerService","$iqQuizSubmissionAPI","iqfyVars","offlineService","$i18next","SideNavService","toastr",function(e,t,i,n,u,s,o,r,a,d,c,p,f,g,l,q){e.ctrlName="QuizReviewController",e.quizService=o,e.QuizConfig=r,e.unansweredQuestions=[],e.answeredQuestions=[],e.toggle={searchPanel:!1,socialNotesPanel:!1},e.sideNavService=l,e.sideNavService.currentNavItem="content",e.subscription=e.sideNavService.toggleSocialNotesPanel$.subscribe(function(){e.toggle.socialNotesPanel=!e.toggle.socialNotesPanel}),e.$on("$destroy",function(){e.subscription.unsubscribe()}),e.unansweredQuestionsCount=function(){return e.unansweredQuestions.length},e.answeredQuestionsCount=function(){return e.answeredQuestions.length},e.isNotReadOnly=function(){return!f.isQuizOffline&&"read-only"!==e.quizStatus},e.title=function(){var t="";if(r.get())switch(t=r.get().quiz.title,e.quizStatus){case"confirm":t=g.t("QuizTitleConfirmation",{quizTitle:t});break;case"continue":t=g.t("ContinueQuizTitle",{quizTitle:t});break;case"read-only":t=g.t("QuizTitleConfirmation",{quizTitle:t})}return t},e.populateUnansweredQuestions=function(){o.questions&&n.each(o.questions,function(t){o.progressQuestions[t.__uid]||e.unansweredQuestions.push(t)})},e.populateAnsweredQuestions=function(){o.questions&&n.each(o.questions,function(t){if(o.progressQuestions&&o.progressQuestions[t.__uid]){var i=[];switch(t.type=o.getQuestionType(t),t.type){case"matcher":n.each(o.progressQuestions[t.__uid].left,function(e,n){var s=o.progressQuestions[t.__uid].right[n];i.push({content:u.decode(s)})});break;case"single":i.push(t.item_data.answerArea.options.choices[o.progressQuestions[t.__uid]]);break;case"multi":n.each(o.progressQuestions[t.__uid],function(e){i.push(t.item_data.answerArea.options.choices[e])})}o.setSelectedAnswer(t.__uid,o.progressQuestions[t.__uid]),t.answers=i,e.answeredQuestions.push(t)}})},e.submit=function(){e.submittingQuiz=!0,d.stop(),o.submitAnswers(function(t){e.submittingQuiz=!1,o.attemptResult=t,r.reset(),o.attemptStatus="complete",i.path("page/"+o.pageId+"/quiz/results/")},function(){e.submittingQuiz=!1,t.location.reload(!0)})},e.manuallyHideModal=function(){s(function(){$(".modal-backdrop").length&&$(".modal-backdrop").is(":visible")&&($(".modal").modal("hide"),$(".modal-backdrop").hide(),$("body").removeClass("modal-open"),"undefined"!=typeof rg4js&&rg4js("send",new Error("The quiz review modal needed to be manually hidden")))},3e3)},r.init(function(){if(o.init(),e.answeredQuestions=[],e.unansweredQuestions=[],e.unansweredQuestionsCount=0,o.attemptId){var t={offeringid:o.offeringId,pageid:o.pageId,quizid:r.get().quiz.__uid,type:r.get().quiz.type,action:o.attemptId};a.get(t,function(t){o.quizQuestionsHTML=t.html,o.showQuestions=!e.showQuestions,o.questions=t.questions,o.progressQuestions=t.progressQuestions||[],e.populateUnansweredQuestions(),e.populateAnsweredQuestions(),e.attemptFetched=!0,e.quizStatus=o.quizStatus(),e.manuallyHideModal(),s(function(){"undefined"!=typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub,"courseContent"])},1e3)},function(t){e.attemptFetched=!0,e.manuallyHideModal(),"undefined"!=typeof rg4js&&rg4js("send",{error:new Error("Quiz review modal - issue while loading attempt data"),customData:t}),q.error(g.t("SomethingBadHappenedPleaseTryAgainLater"))})}else i.path("/page/"+o.pageId+"/quiz/start/");"practice_quiz"!==r.get().quiz.type&&(d.start(),d.on("update",function(t){t.timed&&(e.timed=t.timed,e.timeRemaining=t.timeRemaining,e.percentLeft=t.percentLeft,e.timeIsUp=t.timeIsUp,o.attemptId=t.attemptId,o.timeIsUp=t.timeIsUp,o.attemptStatus=t.attemptStatus,e.timeIsUp&&(o.timeIsUp=!0))}),d.on("error",function(e){q.info(g.t("ReturningQuizStartPage")),i.path("/page/"+o.pageId+"/quiz/start/")}))})}])}();