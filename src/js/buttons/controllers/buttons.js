/**
 * Controller for buttons in the iframe
 */

// @ngInject
function ButtonsCtrl(Message, C, SourceId, $q) {
  var self = this;

  self.showCollapseButton = true;
  self.isReady = false;
  self.isCollapsed = false;

  self.onCopySourceClick = onCopySourceClick;
  self.onSelectSourceClick = onSelectSourceClick;
  self.onToggleCollapseClick = onToggleCollapseClick;

  Message.send('Source.Call', {
    message: C.MESSAGE_DISPLAY_COLLAPSE,
    id: SourceId.get()
  }).then(function(displayCollapse) {
    self.showCollapseButton = displayCollapse;
    self.isReady = true;
  });

  function onCopySourceClick() {
    Message.send('Source.Call', {
      message: C.MESSAGE_GET_SOURCE_TEXT,
      id: SourceId.get()
    }).then(function(sourceText) {
      if (sourceText != null) {
        return Message.send('Clipboard.Write', sourceText);
      }
      return $q.reject('Source text is null');
    });
  }

  function onSelectSourceClick() {
    Message.send('Source.Call', {
      message: C.MESSAGE_SELECT_SOURCE_TEXT,
      id: SourceId.get()
    }).then(function(response) {});
  }

  function onToggleCollapseClick() {
    self.isCollapsed = !self.isCollapsed;
    Message.send('Source.Call', {
      message: C.MESSAGE_TOGGLE_SOURCE_COLLAPSE,
      id: SourceId.get(),
      isCollapsed: self.isCollapsed
    }).then(function(sourceText) {});
  }

}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];