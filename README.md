# Slider block

Created with `npx @wordpress/create-block cta-button-block`

## Edit.js

-   not very ortodox
-   The slides are not innerblocks, but an array
-   in `block.json` they are defined as `array` instead of query (therefore they are stored as a comment, not as content)

TODO in Edit

-   add description AND title separated
-   add a preview mode to see the carousel working in the backend, or at least a fixed slide

block.json

-   note
    `"script": "file:../src/vendor/mijs.js", `
    `"viewScript": "file:./vendor/mijs.js",`
    which uses `import Splide from ... `
-   that is not probably the perfect way. I don't undestand why I need to use script. Only viewScript should be enough, but it isnt. I need script to bundle the mijs.js into build, and viewScript to call it.

## Save.js
