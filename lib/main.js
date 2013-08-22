/* Hot Headings has two primary components:
 *
 *   1. A single hotkey (default: accel-shift-h) to enable/disable HH mode.
 *   2. When enabled, multiple key mappings (some without modifiers) to heading
 *      navigation (e.g. space bar to advance to the next heding.
 */

var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var hotkeys = require("sdk/hotkeys"); // for the main toggle hotkey
var warmkeys = require("./warmkeys"); // for the single key touches in HH mode


var hhHotkeys = []
var hhEnabled = false;

var widget = widgets.Widget({
    id: "hot-headings",
    label: "Hot Headings",
    contentURL: data.url("HotHeadings.ico"),
});

/* This class is used to store the single-key mappings when in HH mode -- the
 * 'combo' key/combo and it's 'action' event listener are stored together.  */
function HHKey(combo, action) {
    this.combo = combo;
    this.action = action;
    this.enable = function() {
        warmkeys.register(this.combo, this.action);
    }
    this.disable = function() {
        warmkeys.unregister(this.combo, this.action);
    }
};


function addHHModeKey(combo, action) {
    var key = new HHKey(combo, function() {
        for(var i = 0; i < workers.length; i++) {
            if( workers[i].tab == tabs.activeTab ) {
                workers[i].port.emit(action);
            }
        }
    });
    hhHotkeys.push(key);
}

// Setup the HH mode keys
addHHModeKey("h", "next-header");
addHHModeKey("down", "next-header");
addHHModeKey("shift-h", "prev-header");
addHHModeKey("up", "prev-header");

function enableHotKeys() {
    for(var i = 0; i < hhHotkeys.length; i++) {
        hhHotkeys[i].enable();
    }
}

function disableHotKeys() {
    for(var i = 0; i < hhHotkeys.length; i++) {
        hhHotkeys[i].disable();
    }
}


var hhModeHotkey = hotkeys.Hotkey({
    combo: "accel-shift-h",
    onPress: function() {
        if( hhEnabled ) {
            console.log("DISABLING");
            disableHotKeys();
        }
        else {
            console.log("ENABLING");
            enableHotKeys();
        }
        hhEnabled = !hhEnabled;
    }
});

var workers = []

pageMod.PageMod({
    include: ["*", "file://*"],
    contentScriptFile: [data.url("jquery-1.10.2.min.js"),
                        data.url("my-script.js")],
    onAttach: function(worker) {
        workers.push(worker);
    }
});
