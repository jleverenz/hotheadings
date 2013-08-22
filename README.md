Hot Headings lets you scroll to html document headings (h1,h2,etc) via keyboard
shortcuts.  It was developed for use when html documents are used for
presentations (vs slide decks).  Instead of clicking through slides, one can
easily scroll focus to the next heading, moving it to the top of the display.

It consists of two primary pieces:

  1. A traditional hotkey to enable/disable Hot Headings.
  2. When enabled, single key actions to navigate an html document by headings
     (e.g. space bar to move to next heading).


DEVELOPMENT

Test against a sample page:

   cfx run --binary-args '-url "file:example.html"'

Overload JS modules integrated w/ FF with those from SDK.  Use this if you're
hacking on the SDK modules:

   cfx run -o --binary-args '-url "file:example.html"'
