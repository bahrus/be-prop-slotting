import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, PropSlotRule} from './types';
import {register} from 'be-hive/register.js';

export class BePropSlotting extends BE<AP, Actions, HTMLSlotElement> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
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

    getProps(self: this){
        const {propSlotRules, enhancedElement} = self;
        const assignedNodes = enhancedElement.assignedNodes();
        for(const assignedNode of assignedNodes){
            for(const deslotRule of propSlotRules!){
                
            }
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

