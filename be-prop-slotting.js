import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
//import {getDefaultRemoteRule, getDefaultSignalInfo} from 'be-linked/getDefaultSignalInfo.js';
import { getRemoteEl } from 'be-linked/getRemoteEl.js';
import { getSignalVal } from 'be-linked/getSignalVal.js';
import { getRemoteProp, getLocalSignal } from 'be-linked/defaults.js';
//import { RemoteRule } from './be-linked/types';
export class BePropSlotting extends BE {
    #hydrated = new WeakSet();
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async noAttrs(self) {
        return {
            propSlotRules: []
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
    async getProps(self, e) {
        const { propSlotRules, enhancedElement } = self;
        const assignedElements = enhancedElement.assignedElements();
        console.log({ assignedElements, e });
        for (const assignedElement of assignedElements) {
            if (this.#hydrated.has(assignedElement))
                continue;
            this.#hydrated.add(assignedElement);
            // const remoteRule : RemoteRule = {
            //     remoteProp: getRemoteProp(assignedElement),
            //     remoteType: '/'
            // };// = getDefaultRemoteRule(assignedElement);
            //const {remoteProp, remoteType} = remoteRule;
            const remoteProp = getRemoteProp(assignedElement);
            const remoteEl = await getRemoteEl(enhancedElement, '/', remoteProp);
            const lightChildSignal = await getLocalSignal(assignedElement);
            const { signal, type } = lightChildSignal;
            const fn = () => {
                //TODO:  this is creating a difficult to garbage collect reference to remoteEl, eventTarget
                const srcVal = getSignalVal(signal);
                remoteEl[remoteProp] = srcVal;
            };
            signal.addEventListener(type, e => {
                fn();
            });
            fn();
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
            noAttrs: {
                ifAllOf: ['isParsed'],
                ifNoneOf: ['of', 'Of']
            },
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
