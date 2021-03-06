/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * @toc {Invoke} Query Response
 * @namespace An object generated by a successful invocation query. It contains information about a set of targets that can be invoked with the specified action.
 * @property {String} action The action that is supported for the specified query. All targets in the targets array property can be invoked using this action.
 * @property {String} icon The path of the icon file that may be used to represent the action.
 * @property {String} label The label that can be used to represent the action.
 * @property {String} [default] The name of the target that should be considered as the default provider for the action. If the attribute is omitted then there is no default.
 * @property {QueryResponseTarget[]} targets An array of objects containing information about targets that correspond to the action.
 */
QueryResponse = {};

/**
 * @toc {Invoke} Query Response Target
 * @namespace An object generated as part of the QueryResponse Object. It contains information about a specific target.
 * @property {String} key An identifier of target that supports the invocation.
 * @property {String} icon The path of the icon that may be used to represent the target.
 * @property {String} [splash] The path of the icon that may be used to represent the viewer while loading. This field is present if the type property is VIEWER and is otherwise omitted.
 * @property {String} label The label that may be used to represent the target.
 * @property {String} type Indication of the type of the invocation target. Possible values are "APPLICATION", "VIEWER" or "SERVICE".
 */
QueryResponseTarget = {};

/**
 * @beta
 * @namespace The Invoke object contains methods that interact with other applications.
 * <p/>
 * On BlackBerry OS 5.0+ and BlackBerry PlayBook 1.0+, the {@link blackberry.invoke.invoke^2} method on the invoke object allows you to pass arguments to the target application. </br>The types of arguments can be one of: {@link blackberry.invoke.AddressBookArguments}, {@link blackberry.invoke.BrowserArguments},
 {@link blackberry.invoke.CalendarArguments}, {@link blackberry.invoke.CameraArguments}, {@link blackberry.invoke.JavaArguments}, {@link blackberry.invoke.MapsArguments}, {@link blackberry.invoke.MemoArguments}, {@link blackberry.invoke.MessageArguments},
 {@link blackberry.invoke.PhoneArguments}, {@link blackberry.invoke.SearchArguments}, and {@link blackberry.invoke.TaskArguments}.
 * <p/>
 * On BlackBerry 10, the {@link blackberry.invoke.invoke} method will take arguments in the form of JavaScript object literal.
 * @toc {Invoke} Invoke
 * @featureID blackberry.invoke
 */
blackberry.invoke = {


        /**
         * @description Queries device for list of invokable applications.
         * @param {Object} request An object containing a query to be performed on applications on the device.
         * @param {String} [request.action] An identifier of the action to be performed by the target. Omitting action implies the query should apply to any action supported for the specified type or that the target should infer the action.
         * @param {String} [request.type] The MIME type of data to be acted on. It must be provided if the uri attribute is not provided.
         * @param {String} [request.uri] Used to infer the MIME type of the data. It must be provided if type is not specified.
         * @param {String[]} request.target_type Mandatory. An array that contains a set of target types that the query should return. Possible target types are "VIEWER" or "APPLICATION".
         * @param {String} [request.action_type] Indicates the type of actions to be returned. Possible values are "MENU" or "ALL". Menu actions specify addtional icon and label properties.
         * @param {String} [request.receiver_capabilites] The list of capabilities that must be granted to the target in order for it to be considered a candidate.
         * @callback {function} onSuccess The callback function that will be triggerd if the query is successful.
         * @param {QueryResponse[]} onSuccess.response An array which contains the result of the query.
         * @callback {function} onError The callback function that will be triggered if there was an error processing the query.
         * @param {String} [onError.error] A String that contains an error message.
         * @RIPPLE
         * @BB10X
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         *  function onSuccess(response) {
         *      alert("response: " + JSON.stringify(response, null, 2);
         *  }
         *
         *  function onError(error) {
         *      alert("error: " + error);
         *  }
         *
         *  function findAllTargetsThatCanOpenJPEGImages() {
         *      var request = {
         *              "action": "bb.action.OPEN",
         *              "type": "image/jpeg",
         *              "uri": "file://",
         *              "target_type": ["APPLICATION", "VIEWER"],
         *              "action_type": "ALL"
         *          };
         *
         *      blackberry.invoke.query(request, onSuccess, onError);
         *  }
         *
         *  function findViewersThatCanViewPDFDocs()
         *      var request = {
         *              "action": "bb.action.VIEW",
         *              "type": "application/pdf",
         *              "uri": "file://",
         *              "target_type": ["VIEWERS"],
         *              "action_type": "ALL"
         *          };
         *
         *      blackberry.invoke.query(request, onSuccess, onError);
         *  }
         *
         *  function findApplicationsThatCanOpenAudioFiles()
         *      var request = {
         *              "action": "bb.action.OPEN",
         *              "type": "audio/*",
         *              "uri": "file://",
         *              "target_type": ["APPLICATION"],
         *              "action_type": "ALL"
         *          };
         *
         *      blackberry.invoke.query(request, onSuccess, onError);
         *  }
         *
         *  function findAllTargetsThatCanHandleAllVideoFiles()
         *      var request = {
         *              "type": "video/*",
         *              "uri": "file://",
         *              "target_type": ["APPLICATION", "VIEWER"],
         *              "action_type": "ALL"
         *          };
         *
         *      blackberry.invoke.query(request, onSuccess, onError);
         *  }
         *
         * &lt;/script&gt;
         */
        query : function(request, onSuccess, onError){},

       /**
         * @description Invokes another application
         * @param {Object} request Object literal that specifies what to invoke. None of the fields are required. Refer to the example code for more information.
         * @param {String} [request.target] The id that identifies the component to invoke. If target is omitted, the invocation framework would perform brokering based on the specified action, type, URI or data to locate an appropriate target to invoke.
         * @param {String} [request.action] The action to be performed by the target.
         * @param {String} [request.type] MIME type of data to be acted on. If the MIME type is not specified then the mime type would be inferred from the given URI. If the MIME type cannot be inferred or URI field is empty then invocation will be rejected.
         * @param {String} [request.uri] URI pointing to invocation data. If no URI is provided then this implies that the invocation data is provided in-band in the data field of the invocation request.
         * @param {String|Blob} [request.data] Data (String or Blob) to be acted upon encoded based on the specified type.<br/>NOTE: If a String is passed, make sure that it does not contain unicode characters or invocation will fail.
         * @param {String} [request.file_transfer_mode] An optional string that represents the file transfer mode that can be one of {@link blackberry.invoke.FILE_TRANSFER_PRESERVE}, {@link blackberry.invoke.FILE_TRANSFER_COPY_RO}, {@link blackberry.invoke.FILE_TRANSFER_COPY_RW}, {@link blackberry.invoke.FILE_TRANSFER_LINK}. If omitted, it a sensible default of {@link blackberry.invoke.FILE_TRANSFER_COPY_RO} will be used.
         * @callback {function} onSuccess Callback function that will be triggered when the invocation is successful. Expected signature: function onSuccess().
         * @callback {function} onError Callback function that will be triggered when invocation is not successful, or if request's data field cannot be encoded (e.g. when it contains unicode characters). Expected signature: function onError(error).
         * @callback {String} [onError.error] A String that describes the error.
         * @BB10X
         * @RIPPLE
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         * function onInvokeSuccess() {
         *     alert("Invocation successful!");
         * }
         *
         * function onInvokeError(error) {
         *     alert("Invocation failed, error: " + error);
         * }
         *
         * function openWebLink() {
         *     // open web link - allows the system to choose an appropriate target that handles http://
         *     blackberry.invoke.invoke({
         *         uri: "http://www.blackberry.com"
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function openWebLinkInBrowser() {
         *     // open web link in browser
         *     blackberry.invoke.invoke({
         *         target: "sys.browser",
         *         uri: "http://www.blackberry.com"
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function openMP3File() {
         *     // open mp3 file - allows the system to choose an appropriate target that handles audio/mpeg3
         *     blackberry.invoke.invoke({
         *         type: "audio/mpeg3",
         *         uri: &lt;path to mp3 file&gt;
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function viewPicture() {
         *     // view picture
         *     blackberry.invoke.invoke({
         *         uri: &lt;path to jpg file&gt;,
         *         action: bb.action.VIEW
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function openAnotherApp() {
         *     // open another application that understands custom data
         *     blackberry.invoke.invoke({
         *         target: "another.app.that.handles.custom.json.data",
         *         type: "text/plain",
         *         data: "{'myData': 'A string I pass to another app'}"
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function openAnotherAppWithUnicodeData(unicodeStr) {
         *     // convert unicode string before calling invoke, the receiver app will have to
         *     // call decodeURIComponent(escape(str)) to get the unicode string back
         *     var convertedStr = unescape(encodeURIComponent(unicodeStr));
         *
         *     // open another application that understands custom data
         *     blackberry.invoke.invoke({
         *         target: "another.app.that.handles.unicode.data",
         *         data: convertedStr
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function invokeCard() {
         *     // invoking Card is the same as invoking an application, except the target specified should point to the "Card" target entry point
         *     blackberry.invoke.invoke({
         *         target: "an.app.that.supports.card", // The target should point to the "Card" target entry point of an application
         *         type: "text/plain",
         *         data: "{'myData': 'Some data'}"
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function invokePictureViewer() {
         *     // invoking Card is the same as invoking an application, except the target specified should point to the "Card" target entry point
         *     blackberry.invoke.invoke({
         *         action: "bb.action.VIEW",
         *         uri : "local:///img/image.jpg",
         *         file_transfer_mode : blackberry.invoke.FILE_TRANSFER_COPY_RO
         *     }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function invokeAudoPlayer() {
         *      blackberry.invoke.invoke({
         *          action: "bb.action.VIEW",
         *          uri : "local:///audio/test.mp3",
         *          file_transfer_mode : blackberry.invoke.FILE_TRANSFER_COPY_RO
         *       }, onInvokeSuccess, onInvokeError);
         * }
         *
         * function invokeAudioWithoutTrasnsfer() {
         *      blackberry.invoke.invoke({
         *          action: "bb.action.VIEW",
         *          uri : "local:///audio/test.mp3",
         *       }, onInvokeSuccess, onInvokeError);
         * }
         *
         *
         * &lt;/script&gt;
         */
        invoke : function(request, onSuccess, onError){},

        /**
         * @type String
         * @constant
         * @BB10X
         * @description Describes the file transfer mode where the file will be copied to the invoked application with read only privileges
         */
        FILE_TRANSFER_COPY_RO : 'COPY_RO',

         /**
         * @type String
         * @constant
         * @BB10X
         * @description Describes the file transfer mode where the file will be copied to the invoked application with read and write privileges
         */
        FILE_TRANSFER_COPY_RW : 'COPY_RW',

         /**
         * @type String
         * @constant
         * @BB10X
         * @description Describes the file transfer mode where the invoked application will receive a link to the file path provided. The permissions of the original file MUST include o+r. It o+w the sender must be the owner of the file.
         */
        FILE_TRANSFER_LINK : 'LINK',

         /**
         * @type String
         * @constant
         * @BB10X
         * @description Describes the file transfer mode where the provided URI is preserved as is. No box-2-box logic is applied
         */
        FILE_TRANSFER_PRESERVE : 'PRESERVE',

        /**
         * @type Function
         * @description Registers a function that is triggered during invocation as an interrupter. Allows developers to interrupt the invocation, and perform any action they please.
         *              Developers are passed the invocation object, and can perform any modifications to it they like. The modifications should be returned from the function
         * @param {function} onInvoke function that is triggered on invoke
         * @returns {object} modified request from the user to the system to be run on invocation
         * @BB10X
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         *  function registerForInvokeInterrupter() {
         *      blackberry.invoke.interrupter = function (request) {
         *          if(confirm("System would like to invoke: " + request + " would you like to continue?")) {
         *              return request;
         *          } else {
         *              alert("User canceled invocation");
         *          }
         *      };
         *  }
         *
         *  function clearInterrupter () {
         *      blackberry.invoke.interrupter = null;
         *  }
         *
         *  registerForInvokeInterrupter();
         *  clearInterrupter();
         *  &lt;/script&gt;
         */
        interrupter : Function,


        /**
         * @name blackberry.invoke.invoke^2
         * @function
         * @description Invokes another application on the BlackBerry PlayBook or Blackberry OS 5.0+.
         * @param {Number} appType an integer value representing the type of application to launch. Must be one of the 'APP_*' constants.
         * @param {Object} [args] An arguments object specifying information for the application being invoked.
         * @throws {Exception} If values supplied are not correct.
         * @BB50+
         * @PB10+
         * @RIPPLE
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         *  function startCameraApp() {
         *      var args = new blackberry.invoke.CameraArguments();
         *      args.view = blackberry.invoke.CameraArguments.VIEW_RECORDER;
         *
         *      blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA, args);
         *  }
         *
         *  startCameraApp();
         *  &lt;/script&gt;
         */
        invoke : function(appType, args){},

        /**
         * @description As a parent, close the child Card
         * @returns {void}
         * @BB10X
         * @RIPPLE
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         * function closeChildCard() {
         *     // Close the child Card for some reason
         *     blackberry.invoke.closeChildCard();
         * }
         *
         * &lt;/script&gt;
         */
        closeChildCard : function() {
        },

        /**#@+
         * @noSignature
         * @event
         * @BB10X
         * @description This event is fired by the system. If you want to listen to the event you can do so using the {@link blackberry.event.addEventListener} function and remove the listener using the {@link blackberry.event.removeEventListener} function. <br /><br />
         */

        /**
         * @description The <b>onChildCardStartPeek</b> event is fired by the navigator to notify the parent that it is being peeked at and describe the type of peek being performed
         * @callback {function} yourCallbackFunction The callback function that will be invoked on the onChildCardStartPeek event
         * @callback {String} yourCallbackFunction.peekType Describes the type of peek to be performed as a peek to the content of the parent or a peek to the content of the root. The value is either "content" or "root".
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         * function onChildCardStartPeekHandler(peekType) {
         *    // The Card started peeking
         *    console.log("The card started peeking.");
         *    if (peekType == "root") {
         *        updateContent(true);
         *    }
         * }
         *
         * blackberry.event.addEventListener("onChildCardStartPeek", onChildCardStartPeekHandler);
         *
         * &lt;/script&gt;
         */
        onChildCardStartPeek : function() {
        },

        /**
         * @description The <b>onChildCardEndPeek</b> event is fired by the navigator to notify the parent that it is no longer being peeked at.
         * @callback {function} yourCallbackFunction The callback function that will be invoked on the onChildCardEndPeek event
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         * function onChildCardEndPeekHandler() {
         *    // The Card stopped peeking
         *    console.log("I am no longer being peeked at.");
         * }
         *
         * blackberry.event.addEventListener("onChildCardEndPeek", onChildCardEndPeekHandler);
         *
         * &lt;/script&gt;
         */
        onChildCardEndPeek : function() {
        },

        /**
         * @description The <b>onChildCardClosed</b> event is fired by the navigator to notify the parent that a card is closed. The event includes any response data sent by the card (if the card requested its own closure).
         * @callback {function} yourCallbackFunction The callback function that will be invoked on the onChildCardClosed event
         * @callback {Object} yourCallbackFunction.request An object that includes any response data sent by the card (if the card requested closure).
         * @callback {String} yourCallbackFunction.request.reason Describes application level description of why the card was closed. In the case that the close was due to a navigation Navigator will insert the value "navigation"
         * @callback {String} yourCallbackFunction.request.type Describes the type and encoding of the value in the data attributes
         * @callback {String} yourCallbackFunction.request.data Describes the data that will be returned to the parent
         * @example
         * &lt;script type="text/javascript"&gt;
         *
         * function onChildCardClosedHandler(request) {
         *    // The child Card is closed and reason is "OK", process the closure data;
         *    // otherwise do nothing.
         *    if (request.reason == "OK") {
         *        processCardClosureData(request.type, request.data);
         *    }
         * }
         *
         * blackberry.event.addEventListener("onChildCardClosed", onChildCardClosedHandler);
         *
         * &lt;/script&gt;
         */
        onChildCardClosed : function() {
        },

        /**
         * @default 0
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Address Book.
         */

         APP_ADDRESSBOOK : 0,
        /**
         * @default 1
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Bluetooth Configuration.
         */

         APP_BLUETOOTH_CONFIG : 1,
        /**
         * @default 2
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Calculator.
         */

         APP_CALCULATOR : 2,
        /**
         * @default 3
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Calendar.
         */

         APP_CALENDAR : 3,
        /**
         * @default 4
         * @type Number
         * @constant
         * @BB50+
         * @PB10+
         * @RIPPLE
         * @description Camera.
         */

         APP_CAMERA : 4,
        /**
         * @default 5
         * @type Number
         * @constant
         * @BB50+
         * @PB10+
         * @RIPPLE
         * @description Maps.
         */
        APP_MAPS : 5,
        /**
         * @default 6
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Memopad.
         */

         APP_MEMOPAD : 6,
        /**
         * @default 7
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Messages Application.
         */

         APP_MESSAGES : 7,
        /**
         * @default 8
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Phone.
         */

         APP_PHONE : 8,
        /**
         * @default 9
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Search.
         */

         APP_SEARCH : 9,
        /**
         * @default 10
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke the Tasks.
         */
        APP_TASKS : 10,
        /**
         * @default 11
         * @type Number
         * @constant
         * @BB50+
         * @PB10+
         * @RIPPLE
         * @description Browser.
         */
        APP_BROWSER : 11,
        /**
         * @default 12
         * @type Number
         * @constant
         * @BB50+
         * @RIPPLE
         * @description Constant used to invoke a Java Application.
         */
        APP_JAVA : 12,
        /**
         * @default 13
         * @type Number
         * @constant
         * @PB10+
         * @RIPPLE
         * @description Music Application.
         */
        APP_MUSIC : 13,
        /**
         * @default 14
         * @type Number
         * @constant
         * @PB10+
         * @RIPPLE
         * @description Photos Application.
         */
        APP_PHOTOS : 14,
        /**
         * @default 15
         * @type Number
         * @constant
         * @PB10+
         * @RIPPLE
         * @description Videos Application.
         */
        APP_VIDEOS : 15,
        /**
         * @default 16
         * @type Number
         * @constant
         * @PB10+
         * @RIPPLE
         * @description App World Application.
         */
        APP_APPWORLD : 16
};

