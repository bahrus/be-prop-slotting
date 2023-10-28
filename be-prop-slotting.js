import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BePropSlotting extends BE {
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async onCamelized(self) {
        const { of, Of } = self;
        let propSlotRules = [];
        if ((of || Of) !== undefined) {
            const { prsOf } = await import('./prsOf.js');
            propSlotRules = prsOf(self);
        }
        return {
            propSlotRules
        };
    }
    hydrate(self) {
        const { enhancedElement } = self;
        return [{},
            { getProps: { on: 'slotchange', of: enhancedElement, doInit: true } }
        ];
    }
    getProps(self) {
        const { propSlotRules, enhancedElement } = self;
        const assignedNodes = enhancedElement.assignedNodes();
        for (const assignedNode of assignedNodes) {
            for (const deslotRule of propSlotRules) {
            }
        }
        return { resolved: true };
    }
}
const tagName = 'be-prop-slotting';
const ifWantsToBe = 'prop-slotting';
const upgrade = 'slot';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of']
            },
            hydrate: 'propSlotRules'
        }
    },
    superclass: BePropSlotting
});
register(ifWantsToBe, upgrade, tagName);
