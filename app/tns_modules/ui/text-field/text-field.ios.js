var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/text-field/text-field-common");
var textBase = require("ui/text-base");
var enums = require("ui/enums");
function onHintPropertyChanged(data) {
    var textField = data.object;
    textField.ios.placeholder = data.newValue;
}
common.hintProperty.metadata.onSetNativeValue = onHintPropertyChanged;
function onSecurePropertyChanged(data) {
    var textField = data.object;
    textField.ios.secureTextEntry = data.newValue;
}
common.secureProperty.metadata.onSetNativeValue = onSecurePropertyChanged;
require("utils/module-merge").merge(common, exports);
var UITextFieldDelegateImpl = (function (_super) {
    __extends(UITextFieldDelegateImpl, _super);
    function UITextFieldDelegateImpl() {
        _super.apply(this, arguments);
    }
    UITextFieldDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UITextFieldDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldBeginEditing = function (textField) {
        return this._owner.editable;
    };
    UITextFieldDelegateImpl.prototype.textFieldDidEndEditing = function (textField) {
        if (this._owner.updateTextTrigger === enums.UpdateTextTrigger.focusLost) {
            this._owner._onPropertyChangedFromNative(textBase.textProperty, textField.text);
        }
        this._owner.dismissSoftInput();
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldReturn = function (textField) {
        this._owner.dismissSoftInput();
        return true;
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldChangeCharactersInRangeReplacementString = function (textField, range, replacementString) {
        if (this._owner.updateTextTrigger === enums.UpdateTextTrigger.textChanged) {
            this._owner._onPropertyChangedFromNative(textBase.textProperty, textField.text);
        }
        return true;
    };
    UITextFieldDelegateImpl.ObjCProtocols = [UITextFieldDelegate];
    return UITextFieldDelegateImpl;
})(NSObject);
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.call(this);
        this._ios = new UITextField();
        this._delegate = UITextFieldDelegateImpl.new().initWithOwner(this);
        this._ios.delegate = this._delegate;
    }
    Object.defineProperty(TextField.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return TextField;
})(common.TextField);
exports.TextField = TextField;
