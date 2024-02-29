# Block dependencies

The modules in this section are blocks which can be used in your AEM repository. Different to some other approaches seen in AEM they _not_ simply copied to your code base but will keep the dependency to its source and therefore can be updated later. To achieve this blocks are copied to `/libs/blocks/` instead of `/blocks/`. For enabling the blocks for authors a proxy needs to be created. The possible approaches for this are documented below.

## Usage

in your `/blocks` folder create a new block with a css and a js file (the name can be the same or different that the block you want to use)

### JS file: There Are 2 ways to use a block from the Block Collection

#### Option 1 
Use an already existing block with no possibility to extend the js or use a custom block developed using a js class Not extending the js class

You need to import the defaultDecorate function form the `libs/blocks` block you want to use.
And export the async function decorate to get your code executed when the block is in place.
```javascript
import defaultDecorate from '/libs/blocks/<original-block-name>/<original-block-name>.js';

export default async function decorate(block) {
    // Custom decoration can be done here
  await defaultDecorate(block);
}
```

#### Option 2
Use a custom block developed using a js class extending the js class

You need to import the defaultDecorate and the OriginalBlockName (the class with the block functionality) form the `libs/blocks` block you want to use.
And export the async function decorate to get your code executed when the block is in place.
If we are extending the class we need to pass the extended class as a param in the defaultDecorate function

```javascript
import { defaultDecorate, OriginalBlockName } from '/libs/blocks/<original-block-name>/<original-block-name>.js';

class BlockName extends OriginalBlockName {
  constructor(block) {
    super(block);
  }
    // Code here
}

export default async function decorate(block) {
  // Custom decoration can be done here
  await defaultDecorate(block, BlockName); // Note that you need to pass the extended class to the defaultDeaorate
}
```
### CSS file:
You need to import the CSS file form the `libs/blocks` block you want to use.
And then you can add as much extra CSS you want.

```css
@import "/libs/blocks/<original-block-name>/<original-block-name>.css";

/* you can add custom css here */ 
```
