import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, PropSlotRule} from './types';
import {register} from 'be-hive/register.js';
import {getRemoteEl} from 'be-linked/getRemoteEl.js';
import {getSignalVal} from 'be-linked/getSignalVal.js';
import {getRemoteProp, getLocalSignal} from 'be-linked/defaults.js';

export class BePropSlotting extends BE<AP, Actions, HTMLSlotElement> implements Actions{
    #hydrated: WeakSet<Element> = new WeakSet();
    #abortControllers: Array<AbortController>  = [];
    detach(detachedElement: Element): void {
        for(const ac of this.#abortControllers){
            ac.abort();
        }
    }
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    async noAttrs(self: this): ProPAP {
        return {
            propSlotRules: []
        };
    }

    async onCamelized(self: this) {
        const {of, Of} = self;
        let propSlotRules: Array<PropSlotRule> = [];
        if((of || Of) !== undefined){
            const {prsOf} = await import('./prsOf.js');
            propSlotRules = prsOf(self);
        }
        return {
            propSlotRules
        }
    }

    hydrate(self: this): POA{
        const {enhancedElement} = self;
        return [{},
            {getProps: {on: 'slotchange', of: enhancedElement, doInit: true}}
        ]
            
    }

    async getProps(self: this, e?: Event){
        const {propSlotRules, enhancedElement} = self;
        const assignedElements = enhancedElement.assignedElements();
        
        console.log({assignedElements, e});
        for(const assignedElement of assignedElements){
            if(this.#hydrated.has(assignedElement)) continue;
            this.#hydrated.add(assignedElement);
            const remoteProp = getRemoteProp(assignedElement);
            const remoteEl = await getRemoteEl(enhancedElement, '/', remoteProp);
            const lightChildSignal = await getLocalSignal(assignedElement, true);
            const {signal, type} = lightChildSignal;
            const fn = () => {
                //TODO:  this is creating a difficult to garbage collect reference to remoteEl, eventTarget
                const srcVal = getSignalVal(signal);
                (<any>remoteEl)[remoteProp] = srcVal;
            }
            const ab = new AbortController();
            this.#abortControllers.push(ab);
            signal.addEventListener(type, e => {
                fn();
            }, {signal: ab.signal});
            fn();
        }
        return {resolved: true};
    }
}

export interface BePropSlotting extends AllProps{}

const tagName = 'be-prop-slotting';
const ifWantsToBe = 'prop-slotting';
const upgrade = 'slot';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        isEnh: true,
        propDefaults:{
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

